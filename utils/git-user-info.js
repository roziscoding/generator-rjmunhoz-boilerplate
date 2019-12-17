const parse = require('parse-git-config')
const gitconfig = require('git-config-path')

module.exports = () => {
  const gc = gitconfig({type: 'global'})
  const config = parse.sync({cwd: '/', path: gc}) || {}
  return config.user || {}
}
