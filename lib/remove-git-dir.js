const { rmSync } = require('fs')
const { resolve } = require('path')

const getBaseDir = require('./get-base-dir')

module.exports = function removeGitDir (repository) {
  const gitDir = resolve(...getBaseDir(true), ...repository, '.git')

  rmSync(gitDir, { force: true, recursive: true })
}
