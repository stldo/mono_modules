const { Command } = require('commander')

const createRepository = require('./lib/create-repository')
const getMonoModules = require('./lib/get-mono-modules')
const removeGitDir = require('./lib/remove-git-dir')
const removePersistentDir = require('./lib/remove-persistent-dir')
const updateRepository = require('./lib/update-repository')
const updateSparseCheckout = require('./lib/update-sparse-checkout')

function updatePersistentRepositories () {
  const monoModules = getMonoModules(true)
  const repositories = new Map()

  removePersistentDir()

  for (const { repository, directory } of monoModules) {
    const path = repository.join('/')

    if (!repositories.has(path)) {
      repositories.set(path, repository)
      createRepository(repository, true)
    }

    updateSparseCheckout(repository, directory, true)
  }

  for (const repository of repositories.values()) {
    updateRepository(repository, true)
    removeGitDir(repository)
  }
}

function updateRepositories () {
  const monoModules = getMonoModules()
  const updatedRepositories = new Set()

  for (const { repository } of monoModules) {
    const path = repository.join('/')

    if (!updatedRepositories.has(path)) {
      updatedRepositories.add(path)
      updateRepository(repository)
    }
  }
}

module.exports = new Command('update')
  .description('update installed repositories')
  .action(() => {
    updatePersistentRepositories()
    updateRepositories()
  })
