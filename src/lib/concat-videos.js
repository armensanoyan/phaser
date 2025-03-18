import path from 'path'
import fs from 'fs'
import {  execSync } from 'child_process'

import { outputRelativePath } from '../config.js'
const __dirname = import.meta.dirname

export async function concatenateVideos (files, outputPath) {
  const fileList = files
    .sort((a, b) => parseInt(a.replace('.mp4', '')) - parseInt(b.replace('.mp4', ''))) // Sort numerically by index
    .map(file => `file '${path.resolve(__dirname, outputRelativePath, file)}'`)
    .join('\n')

  const listPath = path.resolve(__dirname, `${outputRelativePath}/files.txt`)
  fs.writeFileSync(listPath, fileList)

  try {
    // Use FFmpeg to concatenate the files
    const command = `ffmpeg -f concat -safe 0 -i "${listPath}" -c copy "${outputPath}" -y`
    await execSync(command)
    // Clean up the temporary file list
    // fs.unlinkSync(listPath);

    // Optionally clean up individual segment files
    // files.forEach(file => {
    // fs.unlinkSync(path.resolve(__dirname, '../media/output', file));
    // });
    return outputPath
  } catch (error) {
    console.error('Error concatenating videos:', error)
    throw error
  }
}
