const path = require('path');
// const puppeteer = require('puppeteer');

// async function runPhaserGame() {
//     const browser = await puppeteer.launch({
//         headless: true, // Set to false to see the game running
//         defaultViewport: null, // Match the game resolution
//         args: ['--start-maximized'], // Optional: Launch in full-screen
//     });

//     const page = await browser.newPage();

//     // Load the Phaser game
//     await page.goto(`file://${path.join(__dirname,'../', '/html/test1.html')}`);

//     console.log('Phaser 3 game is running...');
    
//     await page.screenshot({ path: 'screenshot.png' });

//     // Close the browser (optional)
//     await browser.close();
// }

// runPhaserGame().catch((error) => {
//     console.error('Error:', error);
// });


const puppeteer = require('puppeteer');
const fs = require('fs');

async function runPhaserGame() {
    const browser = await puppeteer.launch({
        headless: false, // Set to true to run headlessly
        defaultViewport: null,
    });

    const page = await browser.newPage();

    page.on('console', async (msg) => {
      const text = msg.text();
      console.log({text});
      
  });
    // Expose a function to handle the image data
    await page.exposeFunction('sendImageToNode', async (imageBase64) => {
        console.log('Received imageBase64 data.');

        // Save the base64 data to a file
        const base64Data = imageBase64.replace(/^data:image\/png;base64,/, '');
        fs.writeFileSync('output.png', Buffer.from(base64Data, 'base64'));
        console.log('Image saved as output.png');
    });

    // Load the Phaser game
    await page.goto(`file://${path.join(__dirname,'../', '/html/canvas.html')}`);

    // Wait for the game to complete rendering and the image to be sent
    // await page.waitForSelector('canvas');
    await page.waitForTimeout(10000);
    // Close the browser
    await browser.close();
}

runPhaserGame().catch((error) => {
    console.error('Error:', error);
});


// Promise.all([runPhaserGame()]).catch((err) => {
//     console.log('All games have finished', err);
// });
