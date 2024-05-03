module.exports = [
  {
    name: () => 'README.md',
    content: ({ classNameWithPrefix }) => {
      return `# ${classNameWithPrefix}`
    },
  },
  {
    name: () => 'package.json',
    content: ({
      classNameWithPrefix,
      repoName,
      moduleName,
      githubAccount,
      authorName,
      authorEmail,
      license,
    }) => `{
  "name": "${moduleName}",
  "description": "TODO",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "typings": "./dist/index.d.ts",
  "react-native": "src/index",
  "nativePackage": true,
  "files": [
    "src",
    "dist",
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
    "build": "rm -rf ./dist && tsc -p tsconfig.json",
    "prepare": "npm run build",
    "tsc": "tsc",
    "test": "jest",
    "lint": "eslint . --fix --ext .js,.jsx,.ts,.tsx"
  },
  "peerDependencies": {
    "react": ">=16.8",
    "react-native": ">=0.60"
  },
  "devDependencies": {}
}
`,
  },
  {
    name: () => 'src/index.ts',
    content: ({ classNameWithPrefix }) =>
      `import { NativeModule, NativeModules } from 'react-native'

type Callback = (err: Error | null, result: string) => void

interface ${classNameWithPrefix}Static extends NativeModule {
  sampleMethod: (str: string, num: number, callback: Callback) => void
}

const ${classNameWithPrefix}: ${classNameWithPrefix}Static = NativeModules.${classNameWithPrefix}

export default ${classNameWithPrefix}

export function lib(a: number, b: number) {
  return a + b + 2
}
`,
  },
  {
    name: () => 'LICENSE',
    content: ({ authorName, authorEmail }) => {
      return `MIT License

Copyright (c) 2025 ldrobot.com

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
    name: () => 'tsconfig.json',
    content: () => `{
  "extends": "@react-native/typescript-config/tsconfig.json",
  "compilerOptions": {
    "declaration": true,
    "outDir": "./dist",
    "noEmit": false,
    "strict": true,
    "noImplicitAny": true,
    "allowImportingTsExtensions": false,
    "baseUrl": "./"
  },
  "include": ["./src/**/*"]
}
`,
  },
  {
    name: () => 'react-native.config.js',
    content: ({ classNameWithPrefix }) => `module.exports = {}
`,
  },
]
