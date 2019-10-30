# create-react-create-lib

一行命令创建组件库

本库 fork 自 [create-react-native-module](https://github.com/brodybits/create-react-native-module)

## Installation

需要最新的 react-native-cli

使用以下命令卸载旧的 cli

```
npm uninstall -g react-native-cli

```

使用以下命令安装新的 cli

```
npm i -g @react-native-community/cli
```

安装本库:

首先 clone 本库：

```
$ git clone git@git.shundaojia.com:ReactNative/react-native-create-lib.git
```

cd 到本库根目录

```
$ npm install -g .
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
  --module-prefix <modulePrefix>            The module prefix for the library module, ignored if --module-name is specified (Default: `react-native`)
  --package-identifier <packageIdentifier>  [Android] The Java package identifier used by the Android module (Default: `com.reactlibrary`)
  --platforms <platforms>                   Platforms the library module will be created for - comma separated (Default: `ios,android`)
  --github-account <githubAccount>          The github account where the library module is hosted (Default: `github_account`)
  --author-name <authorName>                The author's name (Default: `Your Name`)
  --author-email <authorEmail>              The author's email (Default: `yourname@email.com`)
  --license <license>                       The license type (Default: `MIT`)
  --view                                    Generate the module as a very simple native view component
  -h, --help                                output usage information
```

## License

[MIT](./LICENSE)
