const paramCase = require('param-case');

const pascalCase = require('pascal-case');

module.exports = options => {
  const name = options.name;
  if (typeof name !== 'string') {
    throw new TypeError("Please write your library's name");
  }

  const moduleName = options.moduleName;

  const prefix = options.prefix || '';
  // OPTIONS NOT DOCUMENTED, not supported by CLI:
  const className = options.className;
  const clsssNameWithPrefix = `${prefix}${pascalCase(name)}`;

  return Object.assign(
    { name, clsssNameWithPrefix },
    options,
    moduleName ? {} : { moduleName: `react-native-${paramCase(name)}` },
    className ? {} : { className: `${pascalCase(name)}` }
  );
};
