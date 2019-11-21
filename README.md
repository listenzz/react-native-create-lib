# create-react-create-lib

一行命令创建组件库

本库 fork 自 [create-react-native-module](https://github.com/brodybits/create-react-native-module)

## Installation

需要社区版的 cli

卸载旧版 react-native-cli

```
npm uninstall -g react-native-cli

```

安装社区版 cli

```
npm i -g @react-native-community/cli
```

安装本库

```
$ npm install -g react-native-create-lib
```

## Command-line usage

Navigate into an empty directory to execute the command.

```
$ react-native-create-lib MyFancyLibrary
```

This will create the folder `MyFancyLibrary` in which the library will be created in.

Now install dependencies by running this command in the newly created library.

```
$ npm install
```

```
使用: react-native-create-lib [options] <name>

选项:

  -V, --version                             output the version number
  --prefix <prefix>                         The prefix for the library module (Default: ``)
  --module-name <moduleName>                The module library package name to be used in package.json. Default: react-native-(name in param-case)
  --package-identifier <packageIdentifier>  [Android] The Java package identifier used by the Android module (Default: `com.reactnative`)
  --platforms <platforms>                   Platforms the library module will be created for - comma separated (Default: `ios,android`)
  --github-account <githubAccount>          The github account where the library module is hosted (Default: `github-account`)
  --author-name <authorName>                The author's name (Default: `author-name`)
  --author-email <authorEmail>              The author's email (Default: `author-email@gmail.com`)
  --license <license>                       The license type (Default: `MIT`)
  -h, --help                                output usage information
```

## License

[MIT](./LICENSE)
