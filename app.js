import express from 'express'
import path from 'path'
import { runPhaserGame } from './src/lib/engine.js'

const __dirname = import.meta.dirname
const app = express()
const PORT = 3000

app.use(express.static(path.join(__dirname, 'public')))

app.get('/generate', (req, res) => {
  runPhaserGame().catch((err) => {
    console.log('Error:', err)
  })
  res.send('Phaser game started')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
