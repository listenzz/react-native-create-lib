const path = require('path')
const fs = require('fs')

const TEMPLATES_DIR = __dirname

function replacePlaceholders(str, args) {
  if (typeof str !== 'string') return str
  return str.replace(/\{\{(\w+)\}\}/g, (_, key) =>
    args[key] !== undefined ? String(args[key]) : ''
  )
}

function readTemplate(relativePath) {
  return fs.readFileSync(path.join(TEMPLATES_DIR, relativePath), 'utf8')
}

function fileTemplate(relativePath, extraArgsFn) {
  const raw = readTemplate(relativePath)
  return (args) => {
    const merged = extraArgsFn ? { ...args, ...extraArgsFn(args) } : args
    return replacePlaceholders(raw, merged)
  }
}

// Package.java needs dynamic packageImports, nativeModulesCode, viewManagersCode
function packageJavaContent(args) {
  const { moduleType, className } = args
  const isModule = moduleType === 'modules' || moduleType === 'all'
  const isComponent = moduleType === 'components' || moduleType === 'all'

  let packageImports = 'import java.util.Collections;\nimport java.util.List;'
  let nativeModulesCode = 'return Collections.emptyList();'
  let viewManagersCode = 'return Collections.emptyList();'

  if (isComponent) {
    packageImports =
      'import java.util.Arrays;\nimport java.util.Collections;\nimport java.util.List;'
  }
  if (isModule) {
    nativeModulesCode = `return Collections.singletonList(new ${className}Module(reactContext, reactNativeHost));`
  }
  if (isComponent) {
    viewManagersCode = `return Arrays.asList(new ${className}ViewManager());`
  }

  const raw = readTemplate(path.join('android', 'Package.java'))
  return replacePlaceholders(raw, {
    ...args,
    packageImports,
    nativeModulesCode,
    viewManagersCode,
  })
}

// package.json & react-native.config.js have complex conditionals - keep as functions
function packageJsonContent(args) {
  const {
    classNameWithPrefix,
    className,
    repoName,
    moduleName,
    githubAccount,
    authorName,
    authorEmail,
    license,
    packageIdentifier,
    moduleType,
    name,
    codegenName,
  } = args
  const isModule = moduleType === 'modules' || moduleType === 'all'
  const isComponent = moduleType === 'components' || moduleType === 'all'

  let codegenConfig = ''
  if (isModule && !isComponent) {
    codegenConfig = `  "codegenConfig": {
    "name": "${codegenName}",
    "type": "modules",
    "jsSrcsDir": "src",
    "android": {
      "javaPackageName": "${packageIdentifier}"
    },
    "ios": {
      "modulesProvider": {
        "${classNameWithPrefix}": "${classNameWithPrefix}Module"
      }
    }
  },`
  } else if (isComponent && !isModule) {
    codegenConfig = `  "codegenConfig": {
    "name": "${codegenName}",
    "type": "components",
    "jsSrcsDir": "src",
    "android": {
      "javaPackageName": "${packageIdentifier}"
    },
    "ios": {
      "componentProvider": {
        "${className}View": "${classNameWithPrefix}View"
      }
    }
  },`
  } else {
    codegenConfig = `  "codegenConfig": {
    "name": "${codegenName}",
    "type": "all",
    "jsSrcsDir": "src",
    "android": {
      "javaPackageName": "${packageIdentifier}"
    },
    "ios": {
      "modulesProvider": {
        "${classNameWithPrefix}": "${classNameWithPrefix}Module"
      },
      "componentProvider": {
        "${className}View": "${classNameWithPrefix}View"
      }
    }
  },`
  }

  return `{
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
    "react-native.config.js",
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
${codegenConfig}
  "peerDependencies": {
    "react": ">=19.2.3",
    "react-native": ">=0.83.1"
  },
  "devDependencies": {}
}
`
}

function reactNativeConfigContent(args) {
  const { className, moduleType, name } = args
  const isModule = moduleType === 'modules' || moduleType === 'all'
  const isComponent = moduleType === 'components' || moduleType === 'all'
  const codegenName =
    isComponent ? name.toLowerCase().replace(/-/g, '') : null

  let androidConfig = ''
  if (isModule && !isComponent) {
    androidConfig = `			android: {
				packageInstance: 'new ${className}Package(getReactNativeHost())',
			},`
  } else if (isComponent && !isModule) {
    androidConfig = `			android: {
				libraryName: '${codegenName}',
				componentDescriptors: ['${className}ViewComponentDescriptor'],
			},`
  } else {
    androidConfig = `			android: {
				packageInstance: 'new ${className}Package(getReactNativeHost())',
				libraryName: '${codegenName}',
				componentDescriptors: ['${className}ViewComponentDescriptor'],
			},`
  }

  return `module.exports = {
	dependency: {
		platforms: {
${androidConfig}
		},
	},
};
`
}

// src/index.ts: pick one of index-module.ts, index-component.ts, index-all.ts
function srcIndexContent(args) {
  const { moduleType } = args
  const isModule = moduleType === 'modules' || moduleType === 'all'
  const isComponent = moduleType === 'components' || moduleType === 'all'
  let file = 'index-all.ts'
  if (isComponent && !isModule) file = 'index-component.ts'
  else if (isModule && !isComponent) file = 'index-module.ts'
  const raw = readTemplate(path.join('src', file))
  return replacePlaceholders(raw, args)
}

// Output path for Android Java files (suffix e.g. 'Module', 'Package', 'View', or for OnEvent pass suffix like 'OnEvent' and className for the middle part)
function androidJavaPath(packageIdentifier, className, suffix) {
  const packagePath = packageIdentifier.split('.').join('/')
  if (suffix === 'OnEvent' && className) {
    return `android/src/main/java/${packagePath}/On${className}Event.java`
  }
  return `android/src/main/java/${packagePath}/${className}${suffix}.java`
}

const updatePlatformInFile = (platform) => (t) => ({ ...t, platform })

// Template definitions: { name: (args)=>string|null, content: (args)=>string, platform? }
const rootTemplates = [
  {
    name: () => 'README.md',
    content: fileTemplate('README.md'),
  },
  {
    name: () => 'package.json',
    content: packageJsonContent,
  },
  {
    name: () => 'LICENSE',
    content: fileTemplate('LICENSE'),
  },
  {
    name: () => 'tsconfig.json',
    content: fileTemplate('tsconfig.json'),
  },
  {
    name: () => 'react-native.config.js',
    content: reactNativeConfigContent,
  },
  {
    name: (args) => `${args.classNameWithPrefix}.podspec`,
    content: fileTemplate('ios/ClassNameWithPrefix.podspec'),
  },
  {
    name: () => 'src/index.ts',
    content: srcIndexContent,
  },
  {
    name: (args) =>
      args.moduleType === 'modules' || args.moduleType === 'all'
        ? `src/Native${args.className}.ts`
        : null,
    content: fileTemplate('src/NativeModule.ts'),
  },
  {
    name: (args) =>
      args.moduleType === 'components' || args.moduleType === 'all'
        ? `src/${args.className}NativeComponent.ts`
        : null,
    content: fileTemplate('src/NativeComponent.ts'),
  },
  {
    name: (args) =>
      args.moduleType === 'components' || args.moduleType === 'all'
        ? `src/${args.className}View.tsx`
        : null,
    content: fileTemplate('src/ClassNameView.tsx'),
  },
]

const iosTemplates = [
  {
    name: (args) =>
      args.moduleType === 'modules' || args.moduleType === 'all'
        ? `ios/${args.classNameWithPrefix}Module.h`
        : null,
    content: fileTemplate('ios/ClassNameWithPrefixModule.h'),
  },
  {
    name: (args) =>
      args.moduleType === 'modules' || args.moduleType === 'all'
        ? `ios/${args.classNameWithPrefix}Module.mm`
        : null,
    content: fileTemplate('ios/ClassNameWithPrefixModule.mm'),
  },
  {
    name: (args) =>
      args.moduleType === 'components' || args.moduleType === 'all'
        ? `ios/${args.classNameWithPrefix}View.h`
        : null,
    content: fileTemplate('ios/ClassNameWithPrefixView.h'),
  },
  {
    name: (args) =>
      args.moduleType === 'components' || args.moduleType === 'all'
        ? `ios/${args.classNameWithPrefix}View.mm`
        : null,
    content: fileTemplate('ios/ClassNameWithPrefixView.mm'),
  },
]

const androidTemplates = [
  {
    name: () => 'android/build.gradle',
    content: fileTemplate('android/build.gradle'),
  },
  {
    name: () => 'android/proguard-rules.pro',
    content: fileTemplate('android/proguard-rules.pro'),
  },
  {
    name: () => 'android/src/main/AndroidManifest.xml',
    content: fileTemplate('android/AndroidManifest.xml'),
  },
  {
    name: (args) =>
      args.moduleType === 'modules' || args.moduleType === 'all'
        ? androidJavaPath(args.packageIdentifier, args.className, 'Module')
        : null,
    content: fileTemplate('android/Module.java'),
  },
  {
    name: (args) =>
      androidJavaPath(args.packageIdentifier, args.className, 'Package'),
    content: packageJavaContent,
  },
  {
    name: (args) =>
      args.moduleType === 'components' || args.moduleType === 'all'
        ? androidJavaPath(args.packageIdentifier, args.className, 'ViewManager')
        : null,
    content: fileTemplate('android/ViewManager.java'),
  },
  {
    name: (args) =>
      args.moduleType === 'components' || args.moduleType === 'all'
        ? androidJavaPath(args.packageIdentifier, args.className, 'View')
        : null,
    content: fileTemplate('android/View.java'),
  },
  {
    name: (args) =>
      args.moduleType === 'components' || args.moduleType === 'all'
        ? androidJavaPath(args.packageIdentifier, args.className, 'OnEvent')
        : null,
    content: fileTemplate('android/OnEvent.java'),
  },
]

module.exports = [].concat(
  rootTemplates,
  iosTemplates.map(updatePlatformInFile('ios')),
  androidTemplates.map(updatePlatformInFile('android'))
)
