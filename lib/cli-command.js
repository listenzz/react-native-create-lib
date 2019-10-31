const emoji = require('node-emoji');

const normalizedOptions = require('./normalized-options');

const createLibraryModule = require('./lib');

module.exports = {
  name: 'create-library',
  description: 'creates a React Native library module for one or more platforms',
  usage: '[options] <name>',
  func: (args, config, options) => {
    const name = args[0];

    const beforeCreation = Date.now();

    if (options.packageIdentifier === 'com.sdcx') {
      options.packageIdentifier = `${options.packageIdentifier}.${name.toLowerCase()}`;
    }

    const preNormalizedOptions = Object.assign({}, { name }, options);

    // NOTE: There is a trick where the new normalizedOptions()
    // from normalized-options.js is applied by both command.js & lib.js.
    // This is to ensure that the CLI gets the correct module name for the
    // final log message, and that the exported programmatic
    // function can be completely tested from using the CLI.

    const createOptions = normalizedOptions(preNormalizedOptions);

    const rootModuleName = createOptions.moduleName;

    return createLibraryModule(createOptions)
      .then(() => {
        console.log(`
${emoji.get('books')}  Created library module ${rootModuleName} in \`./${rootModuleName}\`.
${emoji.get('clock9')}  It took ${Date.now() - beforeCreation}ms.`);
      })
      .catch(err => {
        console.error(`Error while creating library module ${rootModuleName}`);

        if (err.stack) {
          console.error(err.stack);
        }
      });
  },
  options: [
    {
      command: '--prefix [prefix]',
      description: 'The prefix for the library module',
      default: '',
    },
    {
      command: '--module-name [moduleName]',
      description:
        'The module library package name to be used in package.json. Default: react-native-(name in param-case)',
    },
    {
      command: '--package-identifier [packageIdentifier]',
      description: '[Android] The Java package identifier used by the Android module',
      default: 'com.sdcx',
    },
    {
      command: '--platforms <platforms>',
      description: 'Platforms the library module will be created for - comma separated',
      default: 'ios,android',
    },
    {
      command: '--github-account [githubAccount]',
      description: 'The github account where the library module is hosted',
      default: 'sdcx',
    },
    {
      command: '--author-name [authorName]',
      description: "The author's name",
      default: '顺道出行',
    },
    {
      command: '--author-email [authorEmail]',
      description: "The author's email",
      default: 'sdcx@shundaojia.com',
    },
    {
      command: '--license [license]',
      description: 'The license type',
      default: 'MIT',
    },
  ],
};
