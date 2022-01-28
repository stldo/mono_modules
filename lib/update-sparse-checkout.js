const { existsSync, readFileSync, writeFileSync } = require('fs')
const { resolve } = require('path')

const getBaseDir = require('./get-base-dir')

module.exports = function updateSparseCheckout (
  repository,
  module,
  persistent = false
) {
  const modulePath = module.join('/')
  const sparseCheckoutFile = resolve(
    ...getBaseDir(persistent),
    ...repository,
    '.git',
    'info',
    'sparse-checkout'
  )

  if (!existsSync(sparseCheckoutFile)) {
    writeFileSync(sparseCheckoutFile, `${modulePath}\n`, 'utf-8')
    return
  }

  const content = readFileSync(sparseCheckoutFile, 'utf-8')

  if (!content.split('\n').includes(modulePath)) {
    writeFileSync(sparseCheckoutFile, `${content}${modulePath}\n`, 'utf-8')
  }
}
