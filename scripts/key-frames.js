import { execSync } from 'child_process'
import fs from 'fs'
const videoPath = process.argv[2]

if (!videoPath) {
  console.error('Please provide a video path as an argument')
  process.exit(1)
}

console.time('key-frames')
const command = `ffmpeg -i ${videoPath} -vf "select='eq(pict_type\,I)',showinfo" -vsync vfr -an -f null /dev/null 2>&1 | grep "pts_time"`
const result = execSync(command)
const keyFrames = result.toString()
fs.writeFileSync('key-frames.txt', keyFrames)
console.timeEnd('key-frames')
