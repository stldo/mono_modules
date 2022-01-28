const { resolve } = require('path')

const packageJson = require(resolve('package.json'))

const getBaseDir = require('./get-base-dir')

function getMonoModulesFromDependencies (dependencies, persistent = false) {
  const versionDir = `file:${getBaseDir(persistent).join('/')}/`
  const modules = []

  for (const dependency in dependencies) {
    const version = dependencies[dependency]

    if (version.startsWith(versionDir)) {
      const parts = version.substr(versionDir.length).split('/')

      modules.push({
        repository: parts.slice(0, 2),
        directory: parts.slice(2)
      })
    }
  }

  return modules
}

module.exports = function getMonoModules (persistent) {
  const { dependencies = [], devDependencies = [] } = packageJson

  return [
    ...getMonoModulesFromDependencies(dependencies, persistent),
    ...getMonoModulesFromDependencies(devDependencies, persistent)
  ]
}
