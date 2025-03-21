import { job24Sec1 } from '../constants.js'
import { getFilesDirectory } from '../utils/file-operations.js'
import { Puppeteer } from './puppeteer.js'
import fs from 'fs'
import { pageLink } from '../config.js'
// import { workerData, parentPort } from 'worker_threads'
import { concatVideos, getVideoDuration, getVideoFPS } from '../utils/ffmpeg-operations.js'
import path from 'path'

const CLEANUP_TIMEOUT = 2000// Reduced from 5000ms

export async function runPhaserSingleThread () {
  let puppeteer = null
  const videoDir = '/Users/user/Documents/renderforest/phaser/public/e.mp4'
  try {
    console.log('Processing video chunk:', videoDir)
    
    // Parallelize metadata extraction
    const [duration, fps, downloadPath] = await Promise.all([
      getVideoDuration(videoDir).then(d => Math.floor(parseFloat(d) * 1000)),
      getVideoFPS(videoDir),
      getFilesDirectory()
    ])

    puppeteer = new Puppeteer()
    const job = job24Sec1({ 
      duration,
      fps, 
      videoName: videoDir.split('/').pop(),
      endAt: duration
    })

    console.log({ type: 'progress', message: 'Starting Puppeteer evaluation', videoDir })
    
    const result = await puppeteer.openThePageAndEvaluateThePage(job, downloadPath, pageLink)
    console.log('done puppeteer')
    // Cleanup resources more quickly

    await new Promise(resolve => setTimeout(resolve, 1000))
    setTimeout(() => {
      if (puppeteer) {
        const browserProcess = puppeteer.browser.process()
        if (browserProcess) {
          browserProcess.kill('SIGKILL')
        }
        puppeteer.close()
        puppeteer = null
      }
      console.log({ type: 'complete', videoDir })

      process.exit(1)
    }, CLEANUP_TIMEOUT)

    const files = fs.readdirSync(downloadPath)
    const paths = files.map(item => path.resolve(downloadPath, item))
    console.log({ result, paths, job, files, downloadPath })
    
    
    return concatVideos(paths, downloadPath)
  } catch (error) {
    console.log({ type: 'error', error })
    if (puppeteer) {
      await puppeteer.close()
    }
  }
}

// Only run if this is the main thread
(async () => {
  console.time('runPhaserSingleThread')
  await runPhaserSingleThread()
  console.timeEnd('runPhaserSingleThread')
} )()