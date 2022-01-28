const { Command } = require('commander')

const createRepository = require('./lib/create-repository')
const installMonoModule = require('./lib/install-mono-module')
const removeGitDir = require('./lib/remove-git-dir')
const updateRepository = require('./lib/update-repository')
const updateSparseCheckout = require('./lib/update-sparse-checkout')

function action (repository, directory, { persist }) {
  const repositoryParts = repository.split('/')
  const directoryParts = directory.split('/')

  createRepository(repositoryParts, persist)
  updateSparseCheckout(repositoryParts, directoryParts, persist)
  updateRepository(repositoryParts, persist)
  installMonoModule(repositoryParts, directoryParts, persist)

  if (persist) {
    removeGitDir(repositoryParts)
  }
}

module.exports = new Command('install')
  .argument('<repository>', 'module repository (<username>/<repository>)')
  .argument('<directory>', 'module directory')
  .description('install a module from a repository')
  .option('-p, --persist', 'store module in the repository root', false)
  .action(action)
