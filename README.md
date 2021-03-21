# react-native-create-lib

一行命令创建组件库

本库 fork 自 [create-react-native-module](https://github.com/brodybits/create-react-native-module)

## Command-line usage

Navigate into an empty directory to execute the command.

```
$npx react-native-create-lib MyLib
```

```
$ react-native-create-lib --module-name @sdcx/wechat --repo-name react-native-wechat wechat
```

This will create the folder `MyLib` in which the library will be created in.

Now install dependencies by running this command in the newly created library.

```
$ npm install
```

```
使用: react-native-create-lib [options] <name>

选项:

  -V, --version                             output the version number
  --prefix <prefix>                         The prefix for the library module (Default: `RN`)
  --module-name <moduleName>                The module library package name to be used in package.json. (Default: `react-native-(name in param-case)`)
  --package-identifier <packageIdentifier>  [Android] The Java package identifier used by the Android module (Default: `com.reactnative.(name in lower-case`)
  --repo-name [repoName]                    The repository name (Default: `react-native-(name in param-case)`)
  --platforms <platforms>                   Platforms the library module will be created for - comma separated (Default: `ios,android`)
  --github-account <githubAccount>          The github account where the library module is hosted (Default: `github-account`)
  --author-name <authorName>                The author's name (Default: `author-name`)
  --author-email <authorEmail>              The author's email (Default: `author-email@gmail.com`)
  --license <license>                       The license type (Default: `MIT`)
  -h, --help                                output usage information
```

## License

[MIT](./LICENSE)
