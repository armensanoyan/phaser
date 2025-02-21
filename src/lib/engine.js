const path = require('path');
const puppeteer = require('puppeteer');
const fs = require('fs');
const process = require('process');
const { exec } = require('child_process');
const util = require('util');
const { concatenateVideos } = require('./concat-videos.js');
const execPromise = util.promisify(exec);
const {outputRelativePath} = require('../config')
const { job24Sec } = require('../constants')

async function runPhaserGame() {
  console.time('runPhaserGame')
  console.time('runPuppeteer')
  let browser;
    browser = await puppeteer.launch({
      headless: false, // Set to true to run headlessly
      devtools: true,
      protocolTimeout: 600000, // Disable protocol timeout
      defaultViewport: null,
    });
    console.timeEnd('runPuppeteer')

    const page = await browser.newPage();
    await page.setDefaultTimeout(0); // Disable navigation timeout

    // page.on('console', async (msg) => {
    //   const text = msg.text();
    //   console.log({console: text});
    // });

    // Load the Phaser game
    await page.goto(`http://localhost:3000/index.html`);

    const url = 'http://localhost:3000/e.mp4'
    try {
    // Split the evaluation into smaller steps
    const result = await page.evaluate(async ({url, job24Sec}) => {
        // Step 1: Fetch video
        // const response = await fetch(url);
        // if (!response.ok) {
        //   throw new Error(`Failed to fetch video: ${response.status}`);
        // }
        
        // Step 2: Get buffer
        // const buffer = await response.arrayBuffer();
        
        // Step 3: Prepare job data
        const job = job24Sec;
        job.videoURL = url;
        console.log('url', url)
        // const videoData = {
        //   buffer,
        //   mimeType: 'video/mp4'
        // };
        console.log('startJob')
        // Step 4: Run job
        const ee = await window.startJob(job);
        console.log('finished the job')
        console.log('ee', ee)
        // if (!ee || !Array.isArray(ee)) {
        //   throw new Error('Invalid response from startJob');
        // }
          return ee
        // // Step 5: Process results
    }, {url, job24Sec});
    console.log({result});
    console.timeEnd('runPhaserGame');
    await browser.close();
    return result;
    } catch (error) {
      console.log('Error in page evaluation:', error);
    }

  }

// Execute with proper error handling
(async () => {
  try {
    await runPhaserGame();
  } catch (error) {
    console.error('Failed to run Phaser game:', error);
    // process.exit(1);
  }
})();

module.exports = {
  runPhaserGame
}