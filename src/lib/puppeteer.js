import puppeteer from 'puppeteer'
import { puppeteerConfig } from '../config.js'
import path from 'path'
import fs from 'fs/promises'


export class Puppeteer {
  constructor () {
    this.browser = null
    this.page = null
  }

  getMimeType (filePath) {
    const ext = path.extname(filePath).toLowerCase()
    const mimeTypes = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml'
    }
    return mimeTypes[ext] || 'application/octet-stream'
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

  

  async exposeFunctionNecessaryForPhaser (currentDir ) {
    // Function to read binary files as Uint8Array
    await this.page.exposeFunction('readBinaryFile', async (relativePath) => {
      try {
        const filePath = path.resolve(currentDir, relativePath)
        // Read file as buffer
        const buffer = await fs.readFile(filePath)
        // Return buffer as Uint8Array and the MIME type
        return {
          data: [...new Uint8Array(buffer)],
          mimeType: this.getMimeType(filePath)
        }
      } catch (error) {
        throw new Error(`Failed to read binary file: ${error.message}`)
      }
    })

    // Function to write binary files from Uint8Array
    await this.page.exposeFunction('writeBinaryFile', (relativePath, dataArray) => {
      try {
        const filePath = path.resolve(currentDir, relativePath)
        // Convert array to Buffer
        const buffer = Buffer.from(dataArray)
        // Write buffer to file
        return fs.writeFile(filePath, buffer)
      } catch (error) {
        throw new Error(`Failed to write binary file: ${error.message}`)
      }
    })

    await this.page.evaluateOnNewDocument(() => {
      window.fsFunctions = {
        readBinaryFile: window.readBinaryFile,
        writeBinaryFile: window.writeBinaryFile
      }
    })
  }
  
  async evaluateThePage (job) {
     
    const result = await this.page.evaluate((job) => window.processVideoSSR(job), job)
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