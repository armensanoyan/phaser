import Koa from 'koa'
import path from 'path'
import http2 from 'http2'
import fs from 'fs'
import _ from 'koa-route'
import serve from 'koa-static'

// import { runPhaserMultiThread } from './src/lib/multi-thread.js'
// import { sharedPuppeteer } from './src/lib/shared-puppeteer.js'
import { runPhaserSingleThread } from './src/lib/engine-single.js'

const __dirname = import.meta.dirname
const app = new Koa()
const PORT = 3000

app.use(serve(path.join(__dirname, 'public')))

app.use(_.get('/get', async (ctx, next) => {
  console.log('Received request:', ctx.request.url)
  ctx.body = 'Serving using HTTP2!'
  await next()
}))

const options = {
  key: fs.readFileSync(path.join(__dirname, 'local.renderforest.com.key')),
  cert: fs.readFileSync(path.join(__dirname, 'local.renderforest.com.crt'))
}

const server = http2.createSecureServer(options, app.callback())

server.listen(PORT, () => {
  console.log(`HTTP/2 Server is running onhttps://armen.local.renderforest.com:${PORT}`)
})

server.on('error', console.log)
server.on('listening', console.log)


