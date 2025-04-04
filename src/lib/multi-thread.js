import { Worker } from 'worker_threads'
import { concatVideos, sliceVideo } from '../utils/ffmpeg-operations.js'
import { downloadDir } from '../config.js'
import path from 'path'
import { getOptimalThreadCount } from '../utils/util.js'
import { cleanMediaDir } from '../utils/file-operations.js'

const processChunkWithTimeout = (videoDir, timeoutMs = 30000) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./src/lib/engine.js', {
      workerData: { videoDir }
      // Resource limits for each worker
      // resourceLimits: {}
    })

    const timeout = setTimeout(() => {
      worker.terminate()
      reject(new Error(`Processing timeout for ${videoDir}`))
    }, timeoutMs)

    worker.on('message', (message) => {
      console.log(message)
      if (message.message === 'complete') {
        clearTimeout(timeout)
        resolve(message.result)
      }
    })

    worker.on('error', (error) => {
      clearTimeout(timeout)
      console.error(`Worker error for ${videoDir}:`, error)
      reject(error)
      worker.terminate()
    })

    worker.on('exit', (code) => {
      if (code !== 0) {
        clearTimeout(timeout)
        reject(new Error(`Worker stopped with exit code ${code}`))
      }
    })
  })
}

const _sendMessage = (lastMessageTime) => (meta) => {
  const currentTime = Date.now()
  console.log({
    'main thread': true,
    ...meta,
    timeSinceLastMessage: currentTime - lastMessageTime
  })
  lastMessageTime = currentTime
}

export const runPhaserMultiThread = async (videoUrl, requestedThreadCount) => {
  try {
    let lastMessageTime = Date.now()
    const threadCount = getOptimalThreadCount(requestedThreadCount)
    const sendMessage = _sendMessage(lastMessageTime)

    await cleanMediaDir()

    sendMessage({ message: `Starting multi-threaded processing with ${threadCount} threads` })
    
    const videosDirs = await sliceVideo(videoUrl, threadCount)
    sendMessage({ 
      message: 'video sliced', 
      videosDirsCount: videosDirs.length 
    })

    // Process chunks in batches to prevent memory overload
    const batchSize = Math.min(threadCount, 2)
    const results = []
    
    for (let i = 0; i < videosDirs.length; i += batchSize) {
      const batch = videosDirs.slice(i, i + batchSize)
      sendMessage({ message: `processing batch ${i / batchSize + 1}` })
      
      const batchResults = await Promise.all(
        batch.map(videoDir => processChunkWithTimeout(videoDir, '' + process.pid + i))
      )
      results.push(...batchResults)
    }

    sendMessage({ message: 'all chunks processed successfully' })
    
    const outputPath = path.resolve(downloadDir, './new-slices')
    sendMessage({ 
      message: 'concatenating videos', 
      outputPath, 
      results 
    })
    
    await concatVideos(results.flat(), outputPath)
    sendMessage({ message: 'videos concatenated successfully' })
    
    return outputPath
  } catch (error) {
    console.error('Error in multi-threaded processing:', error)
    throw error
  }
}

console.time('runPhaserMultiThread')
runPhaserMultiThread('./public/e.mp4', 1)
  .then(outputPath => {
    console.timeEnd('runPhaserMultiThread')
    console.log('Processing completed. Output at:', outputPath)
    process.exit(1)
  })
  .catch(error => {
    console.error('Processing failed:', error)
    console.timeEnd('runPhaserMultiThread')
    process.exit(1)
  })
