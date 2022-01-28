const { Command } = require('commander')

const createRepository = require('./lib/create-repository')
const getMonoModules = require('./lib/get-mono-modules')
const updateRepository = require('./lib/update-repository')
const updateSparseCheckout = require('./lib/update-sparse-checkout')

function action () {
  const monoModules = getMonoModules()
  const repositories = new Map()

  for (const { repository, directory } of monoModules) {
    const path = repository.join('/')

    if (!repositories.has(path)) {
      repositories.set(path, repository)
      createRepository(repository)
    }

    updateSparseCheckout(repository, directory)
  }

  for (const repository of repositories.values()) {
    updateRepository(repository)
  }
}

module.exports = new Command('init')
  .description('init mono_modules (use on "preinstall" script)')
  .action(action)
