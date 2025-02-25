import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const dir = '../61e9dabb-41ad-4e6f-882c-af6467d0ffa6/'
const __dirname = import.meta.dirname

export const concatVideos = async () => {
  const files = fs.readdirSync(path.resolve(__dirname, dir + '0/'))
  const filePaths = files
    .map(file => `file '${path.resolve(__dirname, dir + '0/', file)}'`)
    .join('\n')
  const listPath = path.resolve(__dirname, `${dir}/files.txt`)
  fs.writeFileSync(listPath, filePaths)

  try {
    execSync(
      `ffmpeg -f concat -safe 0 -i "${listPath}" -c copy "${dir}/file.webm" -y`
    )
    // Clean up the temporary file list
    // fs.unlinkSync(listPath);
    
    
  } catch (error) {
    console.error('Error concatenating videos:', error)
    throw error
  }
}

// Get dirname from command line arguments
const dirFromArgs = process.argv[2]
if (!dirFromArgs) {
  console.error('Please provide a directory path as an argument')
  process.exit(1)
}
const files = fs.readdirSync(dirFromArgs)
const fileList = files
  .sort((a, b) => parseInt(a.replace('.webm', '')) - parseInt(b.replace('.webm', '')))
  .map(file => `file '${path.resolve(dirFromArgs, file)}'`)
  .join('\n')

const listPath = path.resolve(dirFromArgs, 'files.txt')
fs.writeFileSync(listPath, fileList)

try {
  execSync(
    `ffmpeg -f concat -safe 0 -i "${listPath}" -c copy "${dirFromArgs}/file.webm" -y`
  )
} catch (error) {
  console.error('Error concatenating videos:', error)
  throw error
}
