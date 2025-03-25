import os from 'os'

export const logPuppeteerLogs = async msg => {
  const text = msg.text()
  console.log({ console: text })
}

// Get optimal thread count based on CPU cores
export const getOptimalThreadCount = (requestedThreads) => {
  const cpuCount = os.cpus().length
  // Leave some cores for system and other processes
  const maxThreads = Math.max(1, cpuCount - 2)
  return Math.min(requestedThreads, maxThreads)
}