export const logPuppeteerLogs = async msg => {
  const text = msg.text()
  console.log({ console: text })
}