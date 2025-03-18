import { job24Sec, job24Sec1 } from '../constants.js'
import { getFilesDirectory } from '../utils/file-operations.js'
import { Puppeteer } from './puppeteer.js'
import { pageLink } from '../config.js'
import { workerData, parentPort } from 'worker_threads'
import { concatVideos, getVideoDuration, getVideoFPS } from '../utils/ffmpeg-operations.js'
import path from 'path'

export async function runPhaserGame () {
  try {
    // const { videoDir } = workerData
    // const videoDir = '/Users/user/Documents/renderforest/phaser/public/slices/000.mp4'
    // console.log('videoDir', videoDir)
    const videoDir = '/Users/user/Documents/renderforest/phaser/public/e.mp4'
    const duration = await getVideoDuration(videoDir) * 1000
    const fps = await getVideoFPS(videoDir)
    const downloadPath = await getFilesDirectory()
    const puppeteer = new Puppeteer()
    const job = job24Sec1({ duration, fps, videoName: videoDir.split('/').pop() })
    console.log('job', job)
    // Send progress message to parent
    parentPort.postMessage({ type: 'progress', message: 'Starting Puppeteer evaluation' })
    
    const result = await puppeteer.openThePageAndEvaluateThePage(job, downloadPath, pageLink)
    const paths = result.map(item => path.resolve(downloadPath, item))
    
    // Send success message with results
    parentPort.postMessage({ type: 'success', data: paths })
    
    setTimeout(() => {
      puppeteer.close()
      // Send completion message
      parentPort.postMessage({ type: 'complete' })
    }, 5000)
    
    return concatVideos(paths, downloadPath)
  } catch (error) {
    // Send error message to parent
    parentPort.postMessage({ type: 'error', error: error.message })
    console.error('Error in page evaluation:', error)
    process.exit(1)
  }
}

// Only run if this is the main thread
if (parentPort) {
  (async () => {
    try {
      console.time('runPhaserGame')
      await runPhaserGame()
      console.timeEnd('runPhaserGame')
    } catch (error) {
      parentPort.postMessage({ type: 'error', error: error.message })
      process.exit(1)
    }
  })()
}