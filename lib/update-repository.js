const { execSync } = require('child_process')
const { resolve } = require('path')

const getBaseDir = require('./get-base-dir')

module.exports = function updateRepository (repository, persistent = false) {
  const repositoryDir = resolve(...getBaseDir(persistent), ...repository)

  execSync('git pull --depth=1 origin master', { cwd: repositoryDir })
  execSync('git checkout master', { cwd: repositoryDir })
}
