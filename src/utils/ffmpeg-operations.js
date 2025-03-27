import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { getOrderedFiles } from './file-operations.js'
import { downloadDir } from '../config.js'

export const getVideoDuration = async (videoPath) => {
  const command = `ffprobe -i ${videoPath} -show_entries format=duration -v quiet -of csv="p=0"`
  const result = execSync(command)
  return result.toString()
}

export const sliceVideoIntoChunks = (videoPath, sliceDuration, slicesDir) => {
  if (!fs.existsSync(slicesDir)) {
    fs.mkdirSync(slicesDir, { recursive: true })
  } else {
    fs.rmSync(slicesDir, { recursive: true, force: true })
    fs.mkdirSync(slicesDir, { recursive: true })
  }

  const command = `ffmpeg -loglevel error  -i ${videoPath} -c copy -f segment -segment_time ${sliceDuration} -reset_timestamps 1 ${slicesDir}/%03d.mp4 -y`
  const result = execSync(command)
  return result.toString()
}

export const concatVideos = async (files, outputDir) => {
  // Ensure we have valid files to process
  if (!files || !files.length) {
    throw new Error(`No files provided for concatenation files: ${files} outputDir: ${outputDir}`)
  }

  // Normalize and validate all paths
  const validFiles = files.filter(file => fs.existsSync(file))
  if (validFiles.length === 0) {
    throw new Error(`No valid files found for concatenation files: ${files} outputDir: ${outputDir}`)
  }

  // Create the file list with absolute paths and proper escaping
  const filePaths = validFiles
    .map(file => {
      const absolutePath = path.resolve(file)
      // Escape single quotes in the path and wrap the path in single quotes
      return `file '${absolutePath.replace(/'/g, "'\\''")}'`
    })
    .join('\n')

  const listPath = path.resolve(outputDir, 'files.txt')
  fs.writeFileSync(listPath, filePaths, 'utf8')

  // Verify the file list was created
  if (!fs.existsSync(listPath)) {
    throw new Error(`Failed to create concat file list files: ${files} outputDir: ${outputDir}`)
  }

  const outputFilePath = path.join(outputDir, 'output.mp4')
  
  try {
    // Use absolute paths and add error checking flags
    const command = `ffmpeg -loglevel error -f concat -safe 0 -i "${listPath}" -c copy "${outputFilePath}" -y`
    execSync(command)
    
    // Verify the output file was created
    if (!fs.existsSync(outputFilePath)) {
      throw new Error('FFmpeg completed but output file not found')
    }

    return outputFilePath
  } catch (error) {
    console.error('FFmpeg concat error:', error.message)
    // Log the contents of the file list for debugging
    console.error('Contents of files.txt:', fs.readFileSync(listPath, 'utf8'))
    throw error
  } 
}

export const getVideoFPS = (videoPath) => {
  const command = `ffprobe -i ${videoPath} -v quiet -select_streams v:0 -show_entries stream=r_frame_rate -of default=noprint_wrappers=1:nokey=1`
  const result = execSync(command)
  return parseInt(result.toString().split('/')[0])
}

export async function getVideoDimensions (inputVideoPath) {
  const result = execSync(`ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of default=nw=1:nk=1  ${inputVideoPath}`)
  return {
    width: parseInt(result.toString().split('\n')[0]),
    height: parseInt(result.toString().split('\n')[1])
  }
}

export const sliceVideo = async (videoUrl, threadCount) => {
  const videoDuration = await getVideoDuration(videoUrl)
  const sliceDuration = videoDuration / threadCount
  const slicesDir = path.resolve(downloadDir, './slices')
  await sliceVideoIntoChunks(videoUrl, sliceDuration, slicesDir)
  return getOrderedFiles(slicesDir)
}

export const generateImagesFromVideoAndGetCount = async (videoUrl, outputDir, fps = 0) => {
  if (!fps) {
    fps = await getVideoFPS(videoUrl)
  }
  try {
    execSync(`rm ${outputDir}/*.jpg`)
  } catch {
    console.log('images not found')
  }

  const command = `ffmpeg -loglevel error -i ${videoUrl} -vf "fps=${fps}" -start_number 0 ${outputDir}/frame_%08d.jpg`
  execSync(command)
  const files = await getOrderedFiles(outputDir)
  
  return files
}

export const generateVideoFromImages = async (imageDir, outputFile) => {
  execSync(`ffmpeg -loglevel error -framerate 24 -pattern_type glob -i "${imageDir}/*.jpg" -c:v libx264 -pix_fmt yuv420p ${outputFile} -y`)
}
