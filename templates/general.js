module.exports = [
  {
    name: () => 'README.md',
    content: ({ classNameWithPrefix }) => {
      return `# ${classNameWithPrefix}`
    },
  },
  {
    name: () => 'package.json',
    content: ({ classNameWithPrefix, repoName, moduleName, githubAccount, authorName, authorEmail, license }) => `{
  "name": "${moduleName}",
  "description": "TODO",
  "version": "1.0.0",
  "main": "./lib/index.js",
  "typings": "./lib/index.d.ts",
  "react-native": "src/index",
  "nativePackage": true,
  "files": [
    "src",
    "lib",
    "android",
    "ios",
    "${classNameWithPrefix}.podspec",
    "!android/build",
    "!ios/build",
    "!**/__tests__"
  ],
  "repository": "https://github.com/${githubAccount}/${repoName}",
  "homepage": "https://github.com/${githubAccount}/${repoName}#readme",
  "author": "${authorName} <${authorEmail}> (https://github.com/${githubAccount})",
  "license": "${license}",
  "keywords": [
    "react-native"
  ],
  "scripts": {
    "build": "rm -rf ./lib && tsc -p tsconfig.build.json",
    "prepare": "npm run build",
    "tsc": "tsc",
    "start": "react-native start --reset-cache",
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "test": "jest",
    "lint": "eslint . --fix --ext .js,.jsx,.ts,.tsx"
  },
  "peerDependencies": {
    "react": ">=16.8",
    "react-native": ">=0.60"
  },
  "devDependencies": {
    "@babel/core": "^7.13.10",
    "@babel/runtime": "^7.13.10",
    "@react-native-community/eslint-config": "^3.0.0",
    "@types/jest": "^27.0.1",
    "@types/react": "^17.0.2",
    "@types/react-native": "^0.67.0",
    "@types/react-test-renderer": "17.0.2",
    "babel-jest": "^27.0.6",
    "hybrid-navigation": "^2.9.0",
    "jest": "^27.0.6",
    "metro-react-native-babel-preset": "^0.66.2",
    "react": "17.0.2",
    "react-native": "^0.67.4",
    "react-test-renderer": "17.0.2",
    "eslint": "^7.32.0",
    "typescript": "^4.6.4"
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
  }
}
`,
  },
  {
    name: () => 'src/index.ts',
    content: ({ classNameWithPrefix }) =>
      `import { NativeModules } from 'react-native'

const { ${classNameWithPrefix} } = NativeModules

export default ${classNameWithPrefix}

export function lib(a: number, b: number) {
  return a + b + 2
}
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
IDEWorkspaceChecks.plist

# Android/IntelliJ
#
build/
.idea
.gradle
local.properties
*.iml
.project
.settings/

# node.js
#
node_modules/
npm-debug.log
yarn-error.log

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
Pods/

# lib
lib/

`,
  },
  {
    name: () => '.gitattributes',
    content: ({ platforms }) => {
      if (platforms.indexOf('ios') >= 0) {
        return '*.pbxproj -text\n'
      }

      return ''
    },
  },
  {
    name: () => 'LICENSE',
    content: ({ authorName, authorEmail }) => {
      return `MIT License

Copyright (c) 2023 ${authorName} ${authorEmail}

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
`
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
  rules: {
    'no-shadow': 0,
    'no-bitwise': 0,
    'react-native/no-inline-styles': 0,
  },
  globals: {
    JSX: 'readonly',
  },
}
`,
  },
  {
    name: () => '.eslintignore',
    content: () => `ios/
android/
builds/
*/build/
lib/
`,
  },
  {
    name: () => '.prettierrc.js',
    content: () => `module.exports = {
  semi: false,
  trailingComma: 'all',
  jsxBracketSameLine: true,
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2,
  arrowParens: 'avoid'
}`,
  },
  {
    name: () => 'babel.config.js',
    content: ({ moduleName }) => {
      return `module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
}
`
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
`
    },
  },
  {
    name: () => 'tsconfig.json',
    content: ({ moduleName }) => `{
  "compilerOptions": {
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "target": "esnext",
    "module": "esnext",
    "lib": ["esnext"],
    "jsx": "react-native",
    "moduleResolution": "node",
    "declaration": true,
    "outDir": "./lib",
    "noEmit": true,
    "strict": true,
    "noImplicitAny": true,
    "baseUrl": "./",
    "paths": {
      "${moduleName}": ["src/index"]
    },
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "useUnknownInCatchVariables": false
  },
  "include": ["./src/**/*", "./example/**/*"]
}
`,
  },
  {
    name: () => 'tsconfig.build.json',
    content: () => `{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "noEmit": false
  },
  "exclude": ["./example/**/*"]
}
`,
  },
  {
    name: () => 'react-native.config.js',
    content: ({ classNameWithPrefix }) => `module.exports = {
  project: {
    ios: {
      project: './example/ios/${classNameWithPrefix}.xcworkspace',
    },
    android: {
      sourceDir: './example/android/',
    },
  },
}
`,
  },
]
