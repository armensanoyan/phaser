import puppeteer from 'puppeteer'
import { concatVideos } from './concat-videos.js'
import {
  puppeteerConfig
} from '../config.js'
import { job24Sec } from '../constants.js'
import { getFilesDirectory } from '../utils/file-operations.js'

const openThePageInBrowser = async (downloadPath) => {
  const browser = await puppeteer.launch(puppeteerConfig)
  const page = await browser.newPage()
  await page._client().send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath
  })
  await page.setDefaultTimeout(0)
  await page.goto('http://localhost:3000/index.html')
  
  return page
}

const evaluateThePage = async (downloadPath) => {
  const page = await openThePageInBrowser(downloadPath)
    
  console.time('evaluateJob')
  // eslint-disable-next-line no-undef
  const result = await page.evaluate((job) => window.startJob(job), job24Sec)
  console.timeEnd('evaluateJob')

  return result
}

export async function runPhaserGame () {
  try {
    const downloadPath = await getFilesDirectory()
    const result = await evaluateThePage(downloadPath)

    await concatVideos(result, downloadPath)
    // eslint-disable-next-line no-undef
    setTimeout(() => browser.close(), 5000)
  } catch (error) {
    console.log('Error in page evaluation:', error)
  }


}

(async () => {
  try {
    await runPhaserGame()
    // return process.exit(1);
  } catch (error) {
    console.error('Failed to run Phaser game:', error)
    process.exit(1)
  }
})()