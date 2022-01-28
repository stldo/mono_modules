const { execSync } = require('child_process')
const { existsSync, mkdirSync } = require('fs')
const { join, resolve } = require('path')

const getBaseDir = require('./get-base-dir')

module.exports = function createRepository (repository, persistent = false) {
  const repositoryDir = resolve(...getBaseDir(persistent), ...repository)

  mkdirSync(repositoryDir, { recursive: true })

  if (!existsSync(join(repositoryDir, '.git'))) {
    execSync(
      'git init',
      { cwd: repositoryDir }
    )

    execSync(
      `git remote add origin https://github.com/${repository.join('/')}.git`,
      { cwd: repositoryDir }
    )

    execSync(
      'git config core.sparseCheckout true',
      { cwd: repositoryDir }
    )
  }
}
