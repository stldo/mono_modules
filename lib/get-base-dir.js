const BASE_DIR = ['node_modules', '.mono_modules']
const PERSISTENT_BASE_DIR = ['mono_modules']

module.exports = function getBaseDir (persistent = false) {
  return persistent ? PERSISTENT_BASE_DIR : BASE_DIR
}
