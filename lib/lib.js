// Node.js built-in:

const path = require('path');

// External imports:

// default execa object
const execaDefault = require('execa');

// default fs object
const fsExtra = require('fs-extra');

// Internal imports:

const normalizedOptions = require('./normalized-options');

// Imports from templates
const templates = require('../templates');
const exampleTemplates = require('../templates/example');

const DEFAULT_PACKAGE_IDENTIFIER = 'com.sdcx';
const DEFAULT_PLATFORMS = ['android', 'ios'];
const DEFAULT_GITHUB_ACCOUNT = 'listenzz';
const DEFAULT_AUTHOR_NAME = 'listen';
const DEFAULT_AUTHOR_EMAIL = 'listenzz@163.com';
const DEFAULT_LICENSE = 'MIT';

const renderTemplateIfValid = (fs, root, template, templateArgs) => {
  // avoid throwing an exception in case there is no valid template.name member
  const name = !!template.name && template.name(templateArgs);
  if (!name) return Promise.resolve();

  const filename = path.join(root, name);
  const [baseDir] = filename.split(path.basename(filename));

  return fs.ensureDir(baseDir).then(() => fs.outputFile(filename, template.content(templateArgs)));
};

const generateWithNormalizedOptions = (
  {
    name,
    prefix,
    moduleName,
    className,
    modulePrefix,
    packageIdentifier = DEFAULT_PACKAGE_IDENTIFIER,
    namespace,
    platforms = DEFAULT_PLATFORMS,
    githubAccount = DEFAULT_GITHUB_ACCOUNT,
    authorName = DEFAULT_AUTHOR_NAME,
    authorEmail = DEFAULT_AUTHOR_EMAIL,
    license = DEFAULT_LICENSE,
    view = false,
  },
  {
    fs = fsExtra, // (this can be mocked out for testing purposes)
    execa = execaDefault, // (this can be mocked out for testing purposes)
  },
) => {
  if (packageIdentifier === DEFAULT_PACKAGE_IDENTIFIER) {
    console.warn(`While \`{DEFAULT_PACKAGE_IDENTIFIER}\` is the default package
      identifier, it is recommended to customize the package identifier.`);
  }

  // Note that the some of these console log messages are done as
  // console.info instead of verbose since they are needed to help
  // make sense of the console output from the third-party tools.

  console.info(
    `CREATE new React Native module with the following options:

  root moduleName: ${moduleName}
  name: ${name}
  prefix: ${prefix}
  modulePrefix: ${modulePrefix}
  packageIdentifier: ${packageIdentifier}
  platforms: ${platforms}
  githubAccount: ${githubAccount}
  authorName: ${authorName}
  authorEmail: ${authorEmail}
  license: ${license}
  view: ${view}
  `,
  );

  console.info('CREATE: Generating the React Native library module');

  const generateLibraryModule = () => {
    return fs.ensureDir(moduleName).then(() => {
      return Promise.all(
        templates
          .filter(template => {
            if (template.platform) {
              return platforms.indexOf(template.platform) >= 0;
            }

            return true;
          })
          .map(template => {
            const templateArgs = {
              name: className,
              moduleName,
              packageIdentifier,
              namespace,
              platforms,
              githubAccount,
              authorName,
              authorEmail,
              license,
              view,
            };

            return renderTemplateIfValid(fs, moduleName, template, templateArgs);
          }),
      );
    });
  };
  const commandSync = execa.commandSync;

  // This separate promise makes it easier to generate
  // multiple test or sample apps in the future.
  const generateExampleApp = () => {
    const exampleReactNativeInitCommand = `react-native init playground`;

    console.info(`CREATE playground app with the following command: ${exampleReactNativeInitCommand}`);

    const execOptions = { cwd: `./${moduleName}`, stdio: 'inherit' };

    // (with the work done in a promise chain)
    return Promise.resolve()
      .then(() => {
        // We use synchronous execSync / commandSync call here
        // which is able to output its stdout to stdout in this process.
        // Note that any exception would be properly handled since this
        // call is executed within a Promise.resolve().then() callback.
        commandSync(exampleReactNativeInitCommand, execOptions);
      })
      .then(() => {
        const files = fs.readdirSync(path.join(moduleName, 'playground'));
        return Promise.all(
          files
            .filter(file => !platforms.includes(file))
            .map(file => {
              return fs.remove(path.join(moduleName, 'playground', file));
            })
            .concat([
              fs.remove(path.join(moduleName, 'playground/ios/Pods')),
              fs.remove(path.join(moduleName, 'playground/ios/Podfile.lock')),
              fs.remove(path.join(moduleName, 'playground/ios/playgroundTests')),
              fs.remove(path.join(moduleName, 'playground/ios/playground-tvOS')),
              fs.remove(path.join(moduleName, 'playground/ios/playground-tvOSTests')),
              fs.remove(path.join(moduleName, 'playground/android/app/src/main/java/com/playground')),
            ]),
        );
      })
      .then(() => {
        // Render the example template
        const templateArgs = {
          name: className,
          moduleName,
          packageIdentifier,
          view,
        };

        return Promise.all(
          exampleTemplates.map(template => {
            return renderTemplateIfValid(fs, path.join(moduleName, 'playground'), template, templateArgs);
          }),
        );
      });
  };

  return generateLibraryModule().then(() => {
    return generateExampleApp();
  });
};

// lib function that acccepts options argument and optionally
// a hidden ioImports object argument which is
// mockable, unstable, and not documented
module.exports = function lib(options) {
  // get hidden ioImports object argument if available
  const ioImports = arguments.length > 1 ? arguments[1] : {};

  return generateWithNormalizedOptions(normalizedOptions(options), ioImports);
};
