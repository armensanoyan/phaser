import path from 'path'

const __dirname = import.meta.dirname
export const outputRelativePath = path.resolve(__dirname, '../media/output')

export const downloadDir = __dirname // '/Users/user/Downloads'

export const puppeteerConfig = {
  headless: true,
  devtools: true,
  protocolTimeout: 6000000,
  defaultViewport: null
}

export const pageLink = 'http://localhost:3000/index.html'