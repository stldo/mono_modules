const { rmSync } = require('fs')
const { resolve } = require('path')

const getBaseDir = require('./get-base-dir')

module.exports = function removePersistentDir () {
  const baseDir = resolve(...getBaseDir(true))

  rmSync(baseDir, { force: true, recursive: true })
}
