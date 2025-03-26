import express from 'express'
import path from 'path'
import fs from 'fs'
import spdy from 'spdy'


// import { runPhaserMultiThread } from './src/lib/multi-thread.js'
import { runPhaserSingleThread } from './src/lib/engine-single.js'

const __dirname = import.meta.dirname
const app = express()
const PORT = 3000

app.use(express.static(path.join(__dirname, 'public'), { acceptRanges: false }))

const options = {
  key: fs.readFileSync(path.join(__dirname, 'local.renderforest.com.key')),
  cert: fs.readFileSync(path.join(__dirname, 'local.renderforest.com.crt'))
}

const server = spdy.createServer(options, app)

server.listen(PORT, () => {
  console.log(`HTTP/2 Server is running onhttps://armen.local.renderforest.com:${PORT}`)
})

server.on('error', console.log)
server.on('listening', console.log)


