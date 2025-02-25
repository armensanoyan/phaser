import { concatVideos } from './concat-videos.js'
import { job24Sec } from '../constants.js'
import { getFilesDirectory } from '../utils/file-operations.js'
import { Puppeteer } from './puppeteer.js'
import { pageLink } from '../config.js'


export async function runPhaserGame () {
  try {
    const downloadPath = await getFilesDirectory()
    const puppeteer = new Puppeteer()
    const result = await puppeteer.openThePageAndEvaluateThePage(job24Sec, downloadPath, pageLink)

    setTimeout(() => puppeteer.close(), 5000)
    return concatVideos(result, downloadPath)
     
  } catch (error) {
    console.log('Error in page evaluation:', error)
    process.exit(1)
  }


}

(async () => {
  try {
    await runPhaserGame()
    return process.exit(1)
  } catch (error) {
    console.error('Failed to run Phaser game:', error)
    process.exit(1)
  }
})()