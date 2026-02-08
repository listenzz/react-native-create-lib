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
    }) => {
      const codegenName = name.toLowerCase().replace(/-/g, '');
      const isModule = moduleType === 'modules' || moduleType === 'all';
      const isComponent = moduleType === 'components' || moduleType === 'all';
      
      let codegenConfig = '';
      if (isModule && !isComponent) {
        // Only module
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
  },`;
      } else if (isComponent && !isModule) {
        // Only component
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
  },`;
      } else {
        // Both - use all type
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
  },`;
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
`;
    },
  },
  {
    name: ({ className, moduleType }) => {
      return `src/index.ts`;
    },
    content: ({ classNameWithPrefix, className, moduleType }) => {
      const isModule = moduleType === 'modules' || moduleType === 'all';
      const isComponent = moduleType === 'components' || moduleType === 'all';
      
      if (isComponent && !isModule) {
        // Only component - simple export from XXView.tsx
        return `export { default, type ${className}ViewProps } from './${className}View';
`;
      } else if (isModule && !isComponent) {
        // Only module - create a wrapper layer
        return `import Native${className} from './Native${className}';

// TODO: Add wrapper functions for better API design
// Example:
// function sampleMethod(str: string, num: number): Promise<string> {
//   return Native${className}.sampleMethod(str, num);
// }
// 
// export const ${className} = { sampleMethod };
// export default ${className};
`;
      } else {
        // Both
        return `import Native${className} from './Native${className}';
import ${className}View, { type ${className}ViewProps } from './${className}View';

// TODO: Add wrapper functions for better API design
// Example:
// function sampleMethod(str: string, num: number): Promise<string> {
//   return Native${className}.sampleMethod(str, num);
// }
// 
// export const ${className} = { sampleMethod };
// export default ${className};

export { ${className}View, type ${className}ViewProps };
`;
      }
    },
  },
  {
    name: ({ className, moduleType }) => {
      const isModule = moduleType === 'modules' || moduleType === 'all';
      if (isModule) {
        return `src/Native${className}.ts`;
      }
      return null; // Don't create for component-only
    },
    content: ({ classNameWithPrefix, className }) =>
      `import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  sampleMethod(str: string, num: number): Promise<string>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('${classNameWithPrefix}');
`,
  },
  {
    name: ({ className, moduleType }) => {
      const isComponent = moduleType === 'components' || moduleType === 'all';
      if (isComponent) {
        return `src/${className}NativeComponent.ts`;
      }
      return null; // Don't create for module-only
    },
    content: ({ className, classNameWithPrefix }) =>
      `import type { CodegenTypes, HostComponent, ViewProps } from 'react-native';
import { codegenNativeComponent, codegenNativeCommands } from 'react-native';

export type On${className}EventPayload = {
	// TODO: Add event payload properties
};

export interface NativeProps extends ViewProps {
	// TODO: Add your component props here
	on${className}?: CodegenTypes.DirectEventHandler<On${className}EventPayload>;
}

export interface NativeCommands {
	// TODO: Add your native commands here
	// Example: sampleMethod: (viewRef: React.ElementRef<HostComponent<NativeProps>>) => void;
}

export const Commands: NativeCommands = codegenNativeCommands<NativeCommands>({
	supportedCommands: [], // TODO: Add supported command names, e.g. ['sampleMethod']
});

export default codegenNativeComponent<NativeProps>('${className}View') as HostComponent<NativeProps>;
`,
  },
  {
    name: ({ className, moduleType }) => {
      const isComponent = moduleType === 'components' || moduleType === 'all';
      if (isComponent) {
        return `src/${className}View.tsx`;
      }
      return null; // Don't create for module-only
    },
    content: ({ className }) =>
      `import React, { useImperativeHandle, useRef } from 'react';
import ${className}NativeComponent, { Commands } from './${className}NativeComponent';
import type { On${className}EventPayload, NativeProps } from './${className}NativeComponent';
import type { NativeSyntheticEvent } from 'react-native';

export type On${className}Event = NativeSyntheticEvent<On${className}EventPayload>;

export interface ${className}ViewInstance {
	// TODO: Add methods exposed via ref
	// Example: sampleMethod: () => void;
}

export type ${className}ViewProps = NativeProps;

const ${className}View = React.forwardRef<${className}ViewInstance, ${className}ViewProps>((props, ref) => {
	const viewRef = useRef<React.ComponentRef<typeof ${className}NativeComponent>>(null);
	useImperativeHandle(ref, () => ({
		// TODO: Implement methods exposed via ref
		// Example:
		// sampleMethod: () => {
		// 	if (viewRef.current) {
		// 		Commands.sampleMethod(viewRef.current);
		// 	}
		// },
	}));
	return <${className}NativeComponent {...props} ref={viewRef} />;
});

export default ${className}View;
`,
  },
  {
    name: () => 'LICENSE',
    content: ({ authorName, authorEmail }) => {
      return `MIT License

Copyright (c) 2025 ${authorName} <${authorEmail}>

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
  "extends": "@react-native/typescript-config",
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
    content: ({ className, packageIdentifier, moduleType, name }) => {
      const isModule = moduleType === 'modules' || moduleType === 'all';
      const isComponent = moduleType === 'components' || moduleType === 'all';
      const codegenName = (moduleType === 'components' || moduleType === 'all') 
        ? name.toLowerCase().replace(/-/g, '')
        : null;
      
      let androidConfig = '';
      if (isModule && !isComponent) {
        androidConfig = `			android: {
				packageInstance: 'new ${className}Package(getReactNativeHost())',
			},`;
      } else if (isComponent && !isModule) {
        androidConfig = `			android: {
				libraryName: '${codegenName}',
				componentDescriptors: ['${className}ViewComponentDescriptor'],
			},`;
      } else {
        // Both
        androidConfig = `			android: {
				packageInstance: 'new ${className}Package(getReactNativeHost())',
				libraryName: '${codegenName}',
				componentDescriptors: ['${className}ViewComponentDescriptor'],
			},`;
      }
      
      return `module.exports = {
	dependency: {
		platforms: {
${androidConfig}
		},
	},
};
`;
    },
  },
]
