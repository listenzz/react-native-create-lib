module.exports = [
  {
    name: () => 'README.md',
    content: ({ moduleName, packageIdentifier, className, platforms }) => {
      return `# ${moduleName} 使用说明书`;
    },
  },
  {
    name: () => 'package.json',
    content: ({ moduleName, packageIdentifier, githubAccount, authorName, authorEmail, license }) => {
      return `{
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
    "@babel/core": "^7.6.2",
    "@babel/runtime": "^7.6.2",
    "@react-native-community/eslint-config": "^0.0.5",
    "@types/jest": "^24.0.18",
    "@types/react-native": "^0.60.21",
    "@types/react-test-renderer": "16.9.0",
    "babel-jest": "^24.9.0",
    "jest": "^24.9.0",
    "metro-react-native-babel-preset": "^0.56.0",
    "react": "16.9.0",
    "react-native": "0.61.3",
    "react-native-navigation-hybrid": "^0.17.17",
    "react-test-renderer": "16.9.0",
    "typescript": "^3.6.3"
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
`;
    },
  },
  {
    name: () => 'src/index.ts',
    content: ({ className }) =>
      `import { NativeModules } from 'react-native';

const { ${className}Module } = NativeModules;

export default ${className}Module;
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
    content: () => {
      return `module.exports = {
  root: true,
  extends: '@react-native-community',
};`;
    },
  },
  {
    name: () => '.prettierrc.js',
    content: () => {
      return `module.exports = {
  bracketSpacing: false,
  jsxBracketSameLine: true,
  singleQuote: true,
  trailingComma: 'all',
};`;
    },
  },
  {
    name: () => 'babel.config.js',
    content: () => {
      return `module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
};`;
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
};`;
    },
  },
  {
    name: () => 'tsconfig.json',
    content: () => {
      return `{
  "extends": "./tsconfig-strict.json",
  "compilerOptions": {
    "outDir": "./lib",
    "allowJs": false,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "jsx": "react-native",
    "lib": ["es6"],
    "moduleResolution": "node",
    "declaration": true,
    "target": "esnext"
  },
  "include": ["src"]
}`;
    },
  },
  {
    name: () => 'tsconfig-strict.json',
    content: () => {
      return `{
  "$schema": "http://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "allowSyntheticDefaultImports": false,
    "allowUnreachableCode": false,
    "allowUnusedLabels": false,
    "diagnostics": true,
    "forceConsistentCasingInFileNames": true,
    "noEmitOnError": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "pretty": true,
    "strict": true,
    "strictFunctionTypes": true,
    "strictNullChecks": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noImplicitAny": true
  }
}`;
    },
  },
];
