module.exports = [
  {
    name: () => 'README.md',
    content: ({ moduleName, packageIdentifier, name, namespace, platforms }) => {
      let manualInstallation = '';

      if (platforms.indexOf('ios') >= 0) {
        manualInstallation += `
#### iOS

1. In XCode, in the project navigator, right click \`Libraries\` ➜ \`Add Files to [your project's name]\`
2. Go to \`node_modules\` ➜ \`${moduleName}\` and add \`${name}.xcodeproj\`
3. In XCode, in the project navigator, select your project. Add \`lib${name}.a\` to your project's \`Build Phases\` ➜ \`Link Binary With Libraries\`
4. Run your project (\`Cmd+R\`)<
`;
      }

      if (platforms.indexOf('android') >= 0) {
        manualInstallation += `
#### Android

1. Open up \`android/app/src/main/java/[...]/MainApplication.java\`
  - Add \`import ${packageIdentifier}.${name}Package;\` to the imports at the top of the file
  - Add \`new ${name}Package()\` to the list returned by the \`getPackages()\` method
2. Append the following lines to \`android/settings.gradle\`:
  	\`\`\`
  	include ':${moduleName}'
  	project(':${moduleName}').projectDir = new File(rootProject.projectDir, 	'../node_modules/${moduleName}/android')
  	\`\`\`
3. Insert the following lines inside the dependencies block in \`android/app/build.gradle\`:
  	\`\`\`
      compile project(':${moduleName}')
  	\`\`\`
`;
      }

      if (platforms.indexOf('windows') >= 0) {
        manualInstallation += `
#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the \`${name}.sln\` in \`node_modules/${moduleName}/windows/${name}.sln\` folder to their solution, reference from their app.
2. Open up your \`MainPage.cs\` app
  - Add \`using ${namespace}.${name};\` to the usings at the top of the file
  - Add \`new ${name}Package()\` to the \`List<IReactPackage>\` returned by the \`Packages\` method
`;
      }

      return `# ${moduleName}

## Getting started

\`$ npm install ${moduleName} --save\`

### Mostly automatic installation

\`$ react-native link ${moduleName}\`

### Manual installation

${manualInstallation}

## Usage
\`\`\`javascript
import ${name} from '${moduleName}';

// TODO: What to do with the module?
${name};
\`\`\`
`;
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
    "run:ios": "react-native run-ios --project-path ./playground/ios",
    "start:android": "adb shell am start -n ${packageIdentifier}.playground/.MainActivity",
    "run:android": "cd playground/android && ./gradlew installDebug && npm run start:android",
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
    // for module without view:
    name: ({ view }) => !view && 'src/index.ts',
    content: ({ name }) =>
      `import { NativeModules } from 'react-native';

const { ${name} } = NativeModules;

export default ${name};
`,
  },
  {
    // for module with view:
    name: ({ view }) => view && 'src/index.ts',
    content: ({ name }) =>
      `import { requireNativeComponent } from 'react-native';

const ${name} = requireNativeComponent('${name}', null);

export default ${name};
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
playground/ios/Pods/
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
    content: () => `playground/

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
    content: ({ moduleName, githubAccount, authorName, authorEmail, license }) => {
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
