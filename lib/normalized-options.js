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

  return Object.assign(
    { name, prefix },
    options,
    moduleName ? {} : { moduleName: `react-native-${paramCase(name)}` },
    className ? {} : { className: `${prefix}${pascalCase(name)}` },
  );
};
