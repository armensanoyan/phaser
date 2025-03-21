import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

export const getVideoDuration = (videoPath) => {
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

  const command = `ffmpeg -i ${videoPath} -c copy -f segment -segment_time ${sliceDuration} -reset_timestamps 1 ${slicesDir}/%03d.mp4 -y`
  const result = execSync(command)
  return result.toString()
}

export const concatVideos = async (files, outputDir) => {
  const filePaths = files
    .map(file => `file '${file}'`)
    .join('\n')

  const listPath = path.resolve(outputDir, 'files.txt')
  fs.writeFileSync(listPath, filePaths)
  const outputFilePath = path.join(outputDir, 'output.mp4')
  
  const command = `ffmpeg -f concat -safe 0 -i "${listPath}" \
    -c:v copy -c:a copy \
    "${outputFilePath}" -y`
  
  return execSync(command)
}

export const getVideoFPS = (videoPath) => {
  const command = `ffprobe -i ${videoPath} -v quiet -select_streams v:0 -show_entries stream=r_frame_rate -of default=noprint_wrappers=1:nokey=1`
  const result = execSync(command)
  return parseInt(result.toString().split('/')[0])
}