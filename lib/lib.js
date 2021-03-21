// Node.js built-in:

const path = require('path')

// External imports:

// default execa object
const execaDefault = require('execa')

// default fs object
const fsExtra = require('fs-extra')

// Internal imports:

const normalizedOptions = require('./normalized-options')

// Imports from templates
const templates = require('../templates')
const exampleTemplates = require('../templates/example')

const DEFAULT_PACKAGE_IDENTIFIER = 'com.reactnative'

const renderTemplateIfValid = (fs, repoName, template, templateArgs) => {
  // avoid throwing an exception in case there is no valid template.name member
  const name = !!template.name && template.name(templateArgs)
  if (!name) return Promise.resolve()

  const filename = path.join(repoName, name)
  const [baseDir] = filename.split(path.basename(filename))

  return fs.ensureDir(baseDir).then(() => fs.outputFile(filename, template.content(templateArgs)))
}

const generateWithNormalizedOptions = (
  {
    repoName,
    moduleName,
    className,
    classNameWithPrefix,
    exampleName,
    packageIdentifier,
    platforms,
    githubAccount,
    authorName,
    authorEmail,
    license,
  },
  {
    fs = fsExtra, // (this can be mocked out for testing purposes)
    execa = execaDefault, // (this can be mocked out for testing purposes)
  },
) => {
  if (packageIdentifier === DEFAULT_PACKAGE_IDENTIFIER) {
    console.warn(`While \`{DEFAULT_PACKAGE_IDENTIFIER}\` is the default package
      identifier, it is recommended to customize the package identifier.`)
  }

  // Note that the some of these console log messages are done as
  // console.info instead of verbose since they are needed to help
  // make sense of the console output from the third-party tools.

  console.info(
    `CREATE new React Native module with the following options:
  root: ${repoName} 
  moduleName: ${moduleName}
  classNeme: ${className}
  classNameWithPrefix: ${classNameWithPrefix}
  exampleName: ${exampleName}
  packageIdentifier: ${packageIdentifier}
  platforms: ${platforms}
  githubAccount: ${githubAccount}
  authorName: ${authorName}
  authorEmail: ${authorEmail}
  license: ${license}
  `,
  )

  console.info('CREATE: Generating the React Native library module')

  const generateLibraryModule = () => {
    return fs.ensureDir(repoName).then(() => {
      return Promise.all(
        templates
          .filter(template => {
            if (template.platform) {
              return platforms.indexOf(template.platform) >= 0
            }

            return true
          })
          .map(template => {
            const templateArgs = {
              repoName,
              moduleName,
              className,
              classNameWithPrefix,
              packageIdentifier,
              platforms,
              githubAccount,
              authorName,
              authorEmail,
              license,
            }

            return renderTemplateIfValid(fs, repoName, template, templateArgs)
          }),
      )
    })
  }
  const commandSync = execa.commandSync

  // This separate promise makes it easier to generate
  // multiple test or sample apps in the future.
  const generateExampleApp = () => {
    return Promise.resolve()
      .then(() => {
        const exampleDir = path.resolve(__dirname, '../templates/example')
        return Promise.all([
          fs.copy(path.join(exampleDir, 'android'), path.join(repoName, 'example/android')),
          fs.copy(path.join(exampleDir, 'ios'), path.join(repoName, `example/ios/${exampleName}`)),
        ])
      })
      .then(() => {
        // Render the example template
        const templateArgs = {
          repoName,
          className,
          classNameWithPrefix,
          exampleName,
          moduleName,
          packageIdentifier,
        }

        return Promise.all(
          exampleTemplates.map(template => {
            return renderTemplateIfValid(fs, path.join(repoName, 'example'), template, templateArgs)
          }),
        )
      })
      .then(() => {
        const execOptions = { cwd: `./${repoName}`, stdio: 'inherit' }
        commandSync(`yarn install`, execOptions)
      })
      .then(() => {
        const execOptions = { cwd: `./${repoName}/example/ios`, stdio: 'inherit' }
        commandSync(`pod install`, execOptions)
      })
  }

  return generateLibraryModule().then(() => {
    return generateExampleApp()
  })
}

// lib function that acccepts options argument and optionally
// a hidden ioImports object argument which is
// mockable, unstable, and not documented
module.exports = function lib(options) {
  // get hidden ioImports object argument if available
  const ioImports = arguments.length > 1 ? arguments[1] : {}

  return generateWithNormalizedOptions(normalizedOptions(options), ioImports)
}
