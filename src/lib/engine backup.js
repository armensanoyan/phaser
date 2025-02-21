const path = require('path');
const puppeteer = require('puppeteer');
const fs = require('fs');
const process = require('process');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const {JOB} = require('../constants')
const binary = require('bops')

async function concatenateVideos(files, outputPath) {
  // Create a temporary file list for FFmpeg
  const fileList = files
    .sort((a, b) => parseInt(a.replace('.mp4', '')) - parseInt(b.replace('.mp4', ''))) // Sort numerically by index
    .map(file => `file '${path.resolve(__dirname, '../media/output', file)}'`)
    .join('\n');
  console.log({fileList})
  const listPath = path.resolve(__dirname, '../media/output/files.txt');
  fs.writeFileSync(listPath, fileList);

  try {
    // Use FFmpeg to concatenate the files
    await execPromise(
      `ffmpeg -f concat -safe 0 -i "${listPath}" -c copy "${outputPath}"`
    );
    
    // Clean up the temporary file list
    // fs.unlinkSync(listPath);
    
    // Optionally clean up individual segment files
    files.forEach(file => {
      // fs.unlinkSync(path.resolve(__dirname, '../media/output', file));
    });
  } catch (error) {
    console.error('Error concatenating videos:', error);
    throw error;
  }
}

async function runPhaserGame() {
  console.time('runPhaserGame')
    const browser = await puppeteer.launch({
        headless: false, // Set to true to run headlessly
        devtools: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();

    page.on('console', async (msg) => {
      const text = msg.text();
      console.log({console: text});
  });

    // Load the Phaser game
    await page.goto(`http://localhost:3000/index.html`);
    const url = 'http://localhost:3000/bg.mp4'
    const videoBuffer = new Uint8Array(fs.readFileSync(path.join(__dirname, '../../public/bg.mp4')))
    // const videoBufferArray = Buffer.from(videoBuffer.buffer,0,videoBuffer.buffer.length);

    // console.log({videoBufferArray: videoBuffer.instanceof(Buffer)})
    
    const result = await page.evaluate(async ({url, JOB, videoBuffer}) => {
      const response = await fetch(url)
      const buffer = await response.arrayBuffer();
      // const arrayBuffer = new ArrayBuffer(videoBuffer.length);

      // Create a new Uint8Array view of the ArrayBuffer
      // const browserUint8Array = new Uint8Array(arrayBuffer);

      // Copy the data from the Node.js Uint8Array to the browser Uint8Array
      // browserUint8Array.set(videoBuffer);
      // console.log({videoBuffer})
      // console.log({browserUint8Array})
      
      try {
      const job = JOB
      const videoData = {
        buffer, 
        mimeType: 'video/mp4'
      }
      const fonts = [
      ]
      const ee = await window.startJob(job, videoData, fonts)
      const bb = ee.map((d) => {
        d.parsedBuffer  = Array.from(new Uint8Array(d.buffer))
        return d
      })
      
      return bb
      
      } catch (error) {
        console.error(error)
        return error
      }
    }, {url, JOB, videoBuffer})

    // result.map(r => {
    //   const currentFilePath = path.resolve(__dirname, `../media/output/${r.index}.mp4`)
    //   fs.writeFileSync(currentFilePath, Buffer.from(r.parsedBuffer))
    // })
    console.timeEnd('runPhaserGame')
    // console.log({result})
    // Wait for the game to complete rendering and the image to be sent
    // await page.waitForSelector('canvas');
    // await page.waitForTimeout(10000);
    // Close the browser

    // const files = fs.readdirSync(path.resolve(__dirname, '../media/output'))
    
    // console.log({files})

    // // Concatenate the video files
    // const finalOutputPath = path.resolve(__dirname, '../media/output/final.mp4');
    // await concatenateVideos(files, finalOutputPath);

    // await browser.close(); 
    // process.exit(0)
}



runPhaserGame()
module.exports = {
}