module.exports = [
  {
    name: () => 'README.md',
    content: ({ clsssNameWithPrefix }) => {
      return `# ${clsssNameWithPrefix} 使用说明书`;
    },
  },
  {
    name: () => 'package.json',
    content: ({ moduleName, packageIdentifier, githubAccount, authorName, authorEmail, license }) => `{
  "name": "@sdcx/${moduleName.replace('react-native-', '')}",
  "title": "${moduleName
    .split('-')
    .map(word => word[0].toUpperCase() + word.substr(1))
    .join(' ')}",
  "version": "1.0.0",
  "nativePackage": true,
  "description": "TODO",
  "main": "./lib/index.js",
  "typings": "./lib/index.d.ts",
  "scripts": {
    "build": "rm -rf ./lib && tsc",
    "prestart": "npm run build",
    "prepare": "npm run build",
    "tsc": "tsc",
    "start": "react-native start",
    "run:ios": "react-native run-ios --project-path ./example/ios",
    "start:android": "adb shell am start -n ${packageIdentifier}.example/.MainActivity",
    "run:android": "cd example/android && ./gradlew installDebug && npm run start:android",
    "test": "jest"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/${githubAccount}/${moduleName}.git",
    "baseUrl": "https://github.com/${githubAccount}/${moduleName}"
  },
  "keywords": [
    "react-native"
  ],
  "author": {
    "name": "${authorName}",
    "email": "${authorEmail}"
  },
  "license": "${license}",
  "licenseFilename": "LICENSE",
  "readmeFilename": "README.md",
  "peerDependencies": {
    "react": "^16.8.1",
    "react-native": ">=0.60.4"
  },
  "devDependencies": {
    "@babel/core": "^7.4.3",
    "@babel/runtime": "^7.4.3",
    "@react-native-community/eslint-config": "0.0.5",
    "@types/jest": "^24.0.11",
    "@types/react": "^16.8.14",
    "@types/react-native": "^0.60.21",
    "@types/react-test-renderer": "16.9.0",
    "babel-jest": "^24.9.0",
    "eslint": "^5.16.0",
    "eslint-config-prettier": "^6.5.0",
    "jest": "^24.9.0",
    "metro-react-native-babel-preset": "^0.56.0",
    "react": "16.9.0",
    "react-native": "0.61.3",
    "react-native-navigation-hybrid": "^0.17.17",
    "react-test-renderer": "16.9.0",
    "typescript": "3.5.3"
  },
  "jest": {
    "preset": "react-native",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ]
  },
  "publishConfig": {
    "registry": "https://nexus-hk.shundaojia.com/repository/npm-packages/"
  }
}
`,
  },
  {
    name: () => 'src/index.ts',
    content: ({ clsssNameWithPrefix }) =>
      `import { NativeModules } from 'react-native'

const { ${clsssNameWithPrefix} } = NativeModules

export default ${clsssNameWithPrefix}
`,
  },
  {
    name: () => '.gitignore',
    content: () => `# OSX
#
.DS_Store

# Xcode
#
build/
*.pbxuser
!default.pbxuser
*.mode1v3
!default.mode1v3
*.mode2v3
!default.mode2v3
*.perspectivev3
!default.perspectivev3
xcuserdata
*.xccheckout
*.moved-aside
DerivedData
*.hmap
*.ipa
*.xcuserstate
project.xcworkspace

# Android/IntelliJ
#
build/
.idea
.gradle
local.properties
*.iml

# Visual Studio Code
#
.vscode/

# node.js
#
node_modules/
npm-debug.log
yarn-error.log
yarn.lock

# BUCK
buck-out/
\\.buckd/
*.keystore
!debug.keystore

# fastlane
#
# It is recommended to not store the screenshots in the git repo. Instead, use fastlane to re-generate the
# screenshots whenever they are needed.
# For more information about the recommended setup visit:
# https://docs.fastlane.tools/best-practices/source-control/

*/fastlane/report.xml
*/fastlane/Preview.html
*/fastlane/screenshots

# Bundle artifact
*.jsbundle

# CocoaPods
example/ios/Pods/
Podfile.lock

# lib
lib/

`,
  },
  {
    name: () => '.gitattributes',
    content: ({ platforms }) => {
      if (platforms.indexOf('ios') >= 0) {
        return '*.pbxproj -text\n';
      }

      return '';
    },
  },
  {
    name: () => '.npmignore',
    content: () => `example/
*/build/

# OSX
#
.DS_Store

# Xcode
#
build/
*.pbxuser
!default.pbxuser
*.mode1v3
!default.mode1v3
*.mode2v3
!default.mode2v3
*.perspectivev3
!default.perspectivev3
xcuserdata
*.xccheckout
*.moved-aside
DerivedData
*.hmap
*.ipa
*.xcuserstate
project.xcworkspace

# Android/IntelliJ
#
build/
.idea
.gradle
local.properties
*.iml

# Visual Studio Code
#
.vscode/

# node.js
#
node_modules/
npm-debug.log
yarn-error.log
yarn.lock

# BUCK
buck-out/
\.buckd/
*.keystore
!debug.keystore

# fastlane
#
# It is recommended to not store the screenshots in the git repo. Instead, use fastlane to re-generate the
# screenshots whenever they are needed.
# For more information about the recommended setup visit:
# https://docs.fastlane.tools/best-practices/source-control/

*/fastlane/report.xml
*/fastlane/Preview.html
*/fastlane/screenshots

# Bundle artifact
*.jsbundle`,
  },
  {
    name: () => 'LICENSE',
    content: ({ authorName, authorEmail }) => {
      return `MIT License

Copyright (c) 2019 ${authorName} ${authorEmail}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`;
    },
  },
  {
    name: () => '.eslintrc.js',
    content: () => `module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:prettier/recommended', 'prettier/react'],
  overrides: [
    {
      files: ['jest/*'],
      env: {
        jest: true,
      },
    },
  ],
}`,
  },
  {
    name: () => '.prettierrc.js',
    content: () => `module.exports = {
  semi: false,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2,
}`,
  },
  {
    name: () => 'babel.config.js',
    content: () => {
      return `module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
}
`;
    },
  },
  {
    name: () => 'metro.config.js',
    content: () => {
      return `/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
}
`;
    },
  },
  {
    name: () => 'tsconfig.json',
    content: () => `{
"compilerOptions": {
  /* Basic Options */
  "resolveJsonModule": true,
  "skipLibCheck": true,
  "target": "esnext" /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018' or 'ESNEXT'. */,
  // "module": "commonjs"                   /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */,
  "lib": ["es6"] /* Specify library files to be included in the compilation. */,
  // "allowJs": true                        /* Allow javascript files to be compiled. */,
  // "checkJs": true,                       /* Report errors in .js files. */
  "jsx": "react-native" /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */,
  "declaration": true,                   /* Generates corresponding '.d.ts' file. */
  // "sourceMap": true,                     /* Generates corresponding '.map' file. */
  // "outFile": "./",                       /* Concatenate and emit output to single file. */
  "outDir": "./lib",                        /* Redirect output structure to the directory. */
  // "rootDir": "./",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
  // "removeComments": true,                /* Do not emit comments to output. */
  // "noEmit": true                         /* Do not emit outputs. */,
  // "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
  // "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
  // "isolatedModules": true                /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */,

  /* Strict Type-Checking Options */
  "strict": true /* Enable all strict type-checking options. */,
  // "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. */
  // "strictNullChecks": true,              /* Enable strict null checks. */
  // "strictFunctionTypes": true,           /* Enable strict checking of function types. */
  // "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
  // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
  // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */

  /* Additional Checks */
  // "noUnusedLocals": true,                /* Report errors on unused locals. */
  // "noUnusedParameters": true,            /* Report errors on unused parameters. */
  // "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. */
  // "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */

  /* Module Resolution Options */
  "moduleResolution": "node" /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */,
  "baseUrl": "./" /* Base directory to resolve non-absolute module names. */,
  // "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
  // "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
  // "typeRoots": [],                       /* List of folders to include type definitions from. */
  // "types": [],                           /* Type declaration files to be included in compilation. */
  "allowSyntheticDefaultImports": true /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */,
  "esModuleInterop": true /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
  // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */

  /* Source Map Options */
  // "sourceRoot": "./",                    /* Specify the location where debugger should locate TypeScript files instead of source locations. */
  // "mapRoot": "./",                       /* Specify the location where debugger should locate map files instead of generated locations. */
  // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
  // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */

  /* Experimental Options */
  // "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
  // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */
},
"exclude": ["node_modules", "lib", "babel.config.js", "metro.config.js", "jest.config.js"]
}`,
  },
];
