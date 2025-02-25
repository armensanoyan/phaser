import puppeteer from 'puppeteer'
import { puppeteerConfig } from '../config.js'

export class Puppeteer {
  constructor () {
    this.browser = null
    this.page = null
  }

  async init (downloadPath) {
    this.browser = await puppeteer.launch(puppeteerConfig)
    this.page = await this.browser.newPage()
    await this.page._client().send('Page.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath: downloadPath
    })
    await this.page.setDefaultTimeout(0)
  }

  async close () {
    await this.browser.close()
  }
  
  async evaluateThePage (job) {
    // eslint-disable-next-line no-undef
    const result = await this.page.evaluate((job) => window.startJob(job), job)
    return result
  }
  
  async openThePageAndEvaluateThePage (job, downloadPath, pageLink) {
    await this.init(downloadPath)
    await this.page.goto(pageLink)
    console.time('evaluateJob')
    const result = await this.evaluateThePage(job)
    console.timeEnd('evaluateJob')
    return result
  }
  
  
}