const { execSync } = require('child_process')
const { resolve } = require('path')

const getBaseDir = require('./get-base-dir')

module.exports = function installMonoModule (
  repository,
  directory,
  persistent = false
) {
  const monoModuleDir = resolve(
    ...getBaseDir(persistent),
    ...repository,
    ...directory
  )

  execSync(`npm install ${monoModuleDir}`)
}
