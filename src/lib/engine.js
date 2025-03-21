import { job24Sec1 } from '../constants.js'
import { getFilesDirectory } from '../utils/file-operations.js'
import { Puppeteer } from './puppeteer.js'
import { pageLink } from '../config.js'
import { readdirSync } from 'fs'
import { workerData, parentPort } from 'worker_threads'
import { concatVideos, getVideoDuration, getVideoFPS } from '../utils/ffmpeg-operations.js'
import path from 'path'

const CLEANUP_TIMEOUT = 2000

const _sendMessage = (initialMeta, lastMessageTime) => (meta) => {
  const currentTime = Date.now()
  parentPort.postMessage({
    ...initialMeta,
    ...meta,
    timeSinceLastMessage: currentTime - lastMessageTime
  })
  lastMessageTime = currentTime
}

export async function runPhaserGame () {
  const { videoDir } = workerData
  let puppeteer = new Puppeteer()
  let lastMessageTime = Date.now()
  const sendMessage = _sendMessage({ videoDir }, lastMessageTime)
  try {
    const [duration, fps, downloadPath] = await Promise.all([
      getVideoDuration(videoDir).then(d => Math.floor(parseFloat(d) * 1000)),
      getVideoFPS(videoDir),
      getFilesDirectory()
    ])
    const job = job24Sec1({ 
      duration,
      fps, 
      videoName: videoDir.split('/').pop(),
      endAt: duration
    })
    
    sendMessage({ message: 'before puppeteer', fps, duration, downloadPath })

    
    await puppeteer.openThePageAndEvaluateThePage(job, downloadPath, pageLink) 
    
    sendMessage({ message: 'after puppeteer' })
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    const files = readdirSync(downloadPath)
    const paths = files.map(item => path.resolve(downloadPath, item))
    
    sendMessage({ message: 'awaiting for files', paths })
    
    // Cleanup resources more quickly
    await new Promise(resolve => setTimeout(resolve, CLEANUP_TIMEOUT))
    await puppeteer.close()
    puppeteer = null
    
    const result = await concatVideos(paths, downloadPath)
    sendMessage({ 
      message: 'complete',
      downloadPath,
      result,
      paths
    })
    return result

  } catch (error) {
    // Send error message to parent
    await puppeteer.close()
    puppeteer = null
    
    sendMessage({ 
      message: 'error', 
      error: error.message, 
      videoDir
    })
    process.exit(1)
  }
}

// Only run if this is the main thread
(async () => {
  console.time('runPhaserGame')
  await runPhaserGame()
  console.timeEnd('runPhaserGame')
})()