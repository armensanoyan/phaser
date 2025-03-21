import express from 'express'
import path from 'path'
import { runPhaserMultiThread } from './src/lib/multi-thread.js'
// import { sharedPuppeteer } from './src/lib/shared-puppeteer.js'
// import { runPhaserSingleThread } from './src/lib/engine-single.js'

const __dirname = import.meta.dirname
const app = express()
const PORT = 3000

app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
