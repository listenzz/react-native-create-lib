const { paramCase } = require('param-case')

const { pascalCase } = require('pascal-case')

module.exports = options => {
  const name = options.name
  if (typeof name !== 'string') {
    throw new TypeError("Please write your library's name")
  }

  const moduleName = options.moduleName || `react-native-${paramCase(name)}`
  const repoName = options.repoName || `react-native-${paramCase(name)}`

  const prefix = options.prefix || ''
  // OPTIONS NOT DOCUMENTED, not supported by CLI:
  const className = options.className || pascalCase(name)
  const classNameWithPrefix = `${prefix}${pascalCase(name)}`

  return Object.assign(options, { name, repoName, moduleName, className, classNameWithPrefix })
}
