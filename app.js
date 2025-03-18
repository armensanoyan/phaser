import express from 'express'
import path from 'path'
// import { runPhaserGame } from './src/lib/engine.js'
import { supportMultiThread } from './src/lib/mutli-thread.js'

const __dirname = import.meta.dirname
const app = express()
const PORT = 3000

app.use(express.static(path.join(__dirname, 'public')))

app.get('/generate', (req, res) => {
  res.send('Phaser game started')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
