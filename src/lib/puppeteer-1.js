/* eslint-disable no-undef */
const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')

// Store the current working directory
let currentDir = process.cwd()

/**
 * Expose file system functions to the browser
 */
async function run () {
  // Launch the browser
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--window-size=1024,768']
  })

  // Create a new page
  const page = await browser.newPage()




  await page.exposeFunction('readFiles', (relativePathList) => {
    try {
      const filePathList = relativePathList.map((relativePath) => path.resolve(currentDir, relativePath))
      return filePathList.map((filePath) => fs.readFile(filePath, 'utf8'))
    } catch (error) {
      throw new Error(`Failed to read file: ${error.message}`)
    }
  })

  await page.exposeFunction('writeFiles', (files) => {
    try {
      return files.map((file) => {
        const filePath = path.resolve(currentDir, file.path)
        return fs.writeFile(filePath, file.content, 'utf8')
      })
    } catch (error) {
      throw new Error(`Failed to write file: ${error.message}`)
    }
  })

  // Function to read binary files as Uint8Array
  await page.exposeFunction('readBinaryFile', (relativePath) => {
    try {
      const filePath = path.resolve(currentDir, relativePath)
      // Read file as buffer
      const buffer = fs.readFileSync(filePath)
      // Return buffer as Uint8Array and the MIME type
      return {
        data: [...new Uint8Array(buffer)],
        mimeType: getMimeType(filePath)
      }
    } catch (error) {
      throw new Error(`Failed to read binary file: ${error.message}`)
    }
  })

  // Function to write binary files from Uint8Array
  await page.exposeFunction('writeBinaryFile', (relativePath, dataArray) => {
    try {
      const filePath = path.resolve(currentDir, relativePath)
      // Convert array to Buffer
      const buffer = Buffer.from(dataArray)
      // Write buffer to file
      fs.writeFileSync(filePath, buffer)
      return true
    } catch (error) {
      throw new Error(`Failed to write binary file: ${error.message}`)
    }
  })

  // Make the functions accessible through window.exposed
  await page.evaluateOnNewDocument(() => {
    window.exposed = {
      readFiles: window.readFiles,
      writeFiles: window.writeFiles,
      readBinaryFile: window.readBinaryFile,
      writeBinaryFile: window.writeBinaryFile
    }
  })

  // Load the local HTML file
  await page.goto(`file://${path.resolve(__dirname, 'index.html')}`)

  console.log('Puppeteer is running. Press Ctrl+C to exit.')

  // Keep the browser open until the process is terminated
  process.on('SIGINT', async () => {
    console.log('Closing browser...')
    await browser.close()
    process.exit()
  })
}

// Start the application
run().catch((error) => {
  console.error('An error occurred:', error)
  process.exit(1)
})