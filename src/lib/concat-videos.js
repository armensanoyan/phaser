const path = require('path');
const fs = require('fs');
const util = require('util');
const { exec } = require('child_process');
const execPromise = util.promisify(exec);

const {outputRelativePath} = require('../config')

async function concatenateVideos(files, outputPath) {
  // Create a temporary file list for FFmpeg
  const fileList = files
    .sort((a, b) => parseInt(a.replace('.mp4', '')) - parseInt(b.replace('.mp4', ''))) // Sort numerically by index
    .map(file => `file '${path.resolve(__dirname, outputRelativePath, file)}'`)
    .join('\n');
  
  const listPath = path.resolve(__dirname, `${outputRelativePath}/files.txt`);
  fs.writeFileSync(listPath, fileList);

  try {
    // Use FFmpeg to concatenate the files
    await execPromise(
      `ffmpeg -f concat -safe 0 -i "${listPath}" -c copy "${outputPath}" -y`
    );
    console.log({outputPath})
    // Clean up the temporary file list
    // fs.unlinkSync(listPath);
    
    // Optionally clean up individual segment files
    // files.forEach(file => {
      // fs.unlinkSync(path.resolve(__dirname, '../media/output', file));
    // });
    return outputPath
  } catch (error) {
    console.error('Error concatenating videos:', error);
    throw error;
  }
}

module.exports = { concatenateVideos };