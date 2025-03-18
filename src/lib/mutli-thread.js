import { Worker } from 'worker_threads'
import { concatVideos, getVideoDuration, sliceVideoIntoChunks } from '../utils/ffmpeg-operations.js'
import { getOrderedFiles } from '../utils/file-operations.js'
import { downloadDir } from '../config.js'
import path from 'path'

const sliceVideo = async (videoUrl, threadCount) => {
  const videoDuration = await getVideoDuration(videoUrl)
  console.log('videoDuration', videoDuration)
  const sliceDuration = videoDuration / threadCount
  console.log('sliceDuration', sliceDuration)
  const slicesDir = path.resolve(downloadDir, './slices')
  await sliceVideoIntoChunks(videoUrl, sliceDuration, slicesDir)
  return getOrderedFiles(slicesDir)
}

export function processChunk (videoDir) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./src/lib/engine.js', {
      workerData: { videoDir }
    })

    // Handle different types of messages from the worker
    worker.on('message', (message) => {
      switch (message.type) {
      case 'progress':
        console.log(`Progress from worker: ${message.message}`)
        break
      case 'success':
        console.log(`Worker processed chunk successfully: ${videoDir}`)
        console.log('Generated paths:', message.data)
        break
      case 'complete':
        console.log(`Worker completed processing: ${videoDir}`)
        console.log('message.data', message.data)
        resolve(videoDir)
        break
      case 'error':
        console.error(`Worker error: ${message.error}`)
        reject(new Error(message.error))
        break
      default:
        console.log('Unknown message from worker:', message)
      }
    })

    worker.on('error', (error) => {
      console.error(`Worker error for ${videoDir}:`, error)
      reject(error)
    })

    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`))
      }
    })
  })
}

export const supportMultiThread = async (videoUrl, threadCount) => {
  try {
    console.log(`Starting multi-threaded processing with ${threadCount} threads`)
    const videosDirs = await sliceVideo(videoUrl, threadCount)
    console.log(`Video sliced into ${videosDirs.length} chunks`)
  
    const results = await Promise.all(videosDirs.map(processChunk))
    console.log('All chunks processed successfully')
    const outputPath = path.resolve(downloadDir, './slices')
    console.log({ outputPath, results })
    await concatVideos(results.flat(), outputPath)
    console.log('Videos concatenated successfully')
    return outputPath
  } catch (error) {
    console.error('Error in multi-threaded processing:', error)
    throw error
  }
}

// Example usage
console.time('supportMultiThread')
supportMultiThread('./public/e.mp4', 1)
  .then(outputPath => {
    console.timeEnd('supportMultiThread')
    console.log('Processing completed. Output at:', outputPath)
    process.exit(1)
  })
  .catch(error => {
    console.error('Processing failed:', error)
    console.timeEnd('supportMultiThread')
    process.exit(1)
  })
