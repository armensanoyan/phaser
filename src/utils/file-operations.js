import fs from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { downloadDir } from '../config.js'

export async function clearFolder (folderPath) {
  try {
    console.log('Clearing folder:', folderPath)
    const entries = await fs.readdir(folderPath, { withFileTypes: true })

    await Promise.all(entries.map(async (entry) => {
      const fullPath = path.join(folderPath, entry.name)
      if (entry.isDirectory()) {
        await fs.rm(fullPath, { recursive: true, force: true })
      } else {
        await fs.unlink(fullPath)
      }
    }))

    console.log('Folder cleared successfully.')
  } catch (error) {
    console.error('Error while clearing folder:', error)
  }
}

export const ensureDir = async (dirPath) => {
  return fs.mkdir(dirPath, { recursive: true })
}

export const getFilesDirectory = async () => {
  const uuid = uuidv4()
  const chunkIndex = 0
  const downloadPath = path.resolve(downloadDir, '..', `media/${uuid}/${chunkIndex}/`)
  await ensureDir(downloadPath)
  return downloadPath
}
