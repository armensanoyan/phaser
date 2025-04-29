import path from 'path'

const __dirname = import.meta.dirname
export const outputRelativePath = path.resolve(__dirname, '../media/output')

export const dirname = __dirname // '/Users/user/Downloads'
export const downloadDir = path.resolve(dirname, '../public')

export const puppeteerConfig = {
  headless: false,
  devtools: true,
  protocolTimeout: 6000000,
  defaultViewport: null,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--ignore-certificate-errors', // Ignore SSL certificate errors
    '--ignore-certificate-errors-spki-list',
    '--ignore-certificate-errors-in-file-urls'
  ],
  handleSIGINT: false,
  handleSIGTERM: false,
  handleSIGHUP: false
}

export const pageLink = 'http://localhost:3000/index.html'