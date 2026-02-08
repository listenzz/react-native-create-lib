# react-native-create-lib

一行命令创建原生模块/组件库，支持 Monorepo 模式。已迁移到 ReactNative 新架构。

> 如何支持 Monorepo 模式？请参考 [Monorepo 使用说明](#monorepo-使用说明)

## 基本用法

创建基础库（默认创建原生模块）：
```bash
$ npx react-native-create-lib MyLib
```

创建自定义包名的库：
```bash
$ react-native-create-lib --module-name @sdcx/wechat --repo-name react-native-wechat wechat
```

创建原生组件库：
```bash
$ react-native-create-lib --module-type components ImageCrop
```

创建同时包含模块和组件的库：
```bash
$ react-native-create-lib --module-type all MyLib
```

创建完成后，在新创建的库目录中安装依赖：

```bash
$ cd MyLib
$ npm install
```

## 参数说明

### 必需参数

- **`<name>`**: 库的名称（必需），将用于生成类名和默认包名

### 可选参数

#### `--module-type <moduleType>`
指定要生成的原生代码类型。

- **可选值**: `modules` | `components` | `all`
- **默认值**: `modules`
- **说明**:
  - `modules`: 创建原生模块（TurboModule），用于提供原生功能接口
  - `components`: 创建原生组件（NativeComponent），用于渲染原生 UI 组件
  - `all`: 同时创建原生模块和原生组件

**示例**:
```bash
# 创建原生模块（默认）
$ react-native-create-lib MyModule

# 创建原生组件
$ react-native-create-lib --module-type components ImageCrop

# 同时创建模块和组件
$ react-native-create-lib --module-type all MyLib
```

#### `--module-name <moduleName>`
指定 npm 包名，将写入 `package.json` 的 `name` 字段。

- **默认值**: `react-native-{name}` (name 转换为 param-case)
- **示例**: 
  ```bash
  $ react-native-create-lib --module-name @sdcx/wechat wechat
  # 生成的 package.json 中 name 为 "@sdcx/wechat"
  ```

#### `--repo-name <repoName>`
指定仓库名称，用于生成 GitHub 链接和目录名。

- **默认值**: `react-native-{name}` (name 转换为 param-case)
- **示例**:
  ```bash
  $ react-native-create-lib --repo-name my-custom-repo MyLib
  # 将创建 my-custom-repo 目录
  ```

#### `--prefix <prefix>`
指定类名前缀，用于生成原生代码中的类名。

- **默认值**: `RN`
- **示例**:
  ```bash
  $ react-native-create-lib --prefix SDCX MyLib
  # 生成的类名将为 SDCXMyLib 而不是 RNMyLib
  ```

#### `--package-identifier <packageIdentifier>`
指定 Android 的 Java 包标识符。

- **默认值**: `com.reactnative.{name}` (name 转换为小写)
- **示例**:
  ```bash
  $ react-native-create-lib --package-identifier com.mycompany.mylib MyLib
  # Android 代码将使用 com.mycompany.mylib 作为包名
  ```

#### `--platforms <platforms>`
指定要生成的平台，多个平台用逗号分隔。

- **默认值**: `ios,android`
- **可选值**: `ios` | `android` | `ios,android`
- **示例**:
  ```bash
  # 只生成 iOS 平台
  $ react-native-create-lib --platforms ios MyLib
  
  # 只生成 Android 平台
  $ react-native-create-lib --platforms android MyLib
  ```

#### `--github-account <githubAccount>`
指定 GitHub 账户名，用于生成仓库链接。

- **默认值**: `github-account`
- **示例**:
  ```bash
  $ react-native-create-lib --github-account myusername MyLib
  # 生成的链接为 https://github.com/myusername/react-native-mylib
  ```

#### `--author-name <authorName>`
指定作者名称，将写入 `package.json` 和 `LICENSE`。

- **默认值**: `author-name`
- **示例**:
  ```bash
  $ react-native-create-lib --author-name "John Doe" MyLib
  ```

#### `--author-email <authorEmail>`
指定作者邮箱，将写入 `package.json` 和 `LICENSE`。

- **默认值**: `author-email@gmail.com`
- **示例**:
  ```bash
  $ react-native-create-lib --author-email john@example.com MyLib
  ```

#### `--license <license>`
指定许可证类型，将写入 `package.json` 和 `LICENSE` 文件。

- **默认值**: `MIT`
- **示例**:
  ```bash
  $ react-native-create-lib --license Apache-2.0 MyLib
  ```

### 其他选项

- **`-V, --version`**: 显示版本号
- **`-h, --help`**: 显示帮助信息

## 完整示例

创建一个完整的自定义库：

```bash
$ react-native-create-lib \
  --module-name @mycompany/image-crop \
  --repo-name react-native-image-crop \
  --module-type components \
  --prefix MyCompany \
  --package-identifier com.mycompany.imagecrop \
  --github-account mycompany \
  --author-name "Jane Doe" \
  --author-email jane@mycompany.com \
  --license MIT \
  image-crop
```

## Monorepo 使用说明

在 Monorepo 中，建议先用官方命令创建主 React Native 工程，再通过 **Yarn Workspaces** 或 **pnpm Workspaces** 在 `packages/` 下管理多个原生库，主工程通过 workspace 依赖和路径配置感知这些库。

### 1. 创建主工程

使用 React Native 官方 CLI 创建主项目（不要用本库创建整个项目）：

```bash
npx @react-native-community/cli init MyApp
cd MyApp
```

### 2. 启用 Workspace

在项目根目录的 `package.json` 中声明 workspaces，使主工程能识别 `packages/` 下的包。

**Yarn：**

```json
{
  "name": "my-app",
  "private": true,
  "workspaces": [
    "packages/*"
  ]
}
```

**pnpm：**

```json
{
  "name": "my-app",
  "private": true,
  "packageManager": "pnpm@9.0.0",
  "pnpm": {
    "overrides": {}
  }
}
```

并在项目根创建 `pnpm-workspace.yaml`：

```yaml
packages:
  - 'packages/*'
```

然后执行 `yarn install` 或 `pnpm install` 以链接 workspace 包。

### 3. 添加模块包

在 `packages/` 目录下使用本库创建新的原生模块/组件库（`--repo-name` 可省略 `react-native-` 前缀以保持简短）：

```bash
cd packages/
# 原生模块（如 wechat）
npx react-native-create-lib --module-name @sdcx/wechat --repo-name wechat --prefix RN --package-identifier com.sdcx.wechat wechat
# 原生组件（如 image-crop）
npx react-native-create-lib --module-name @sdcx/image-crop --repo-name image-crop --module-type components --prefix RN --package-identifier com.sdcx.imagecrop image-crop
```

创建完成后，在对应库目录中安装依赖（若使用 workspace，根目录执行一次 `yarn` / `pnpm install` 即可）。

### 4. 主工程感知 lib：配置 tsconfig

在主工程根目录的 `tsconfig.json` 中配置 `paths`，让 TypeScript 能解析 workspace 包源码：

```json
{
  "compilerOptions": {
    "paths": {
      "@sdcx/wechat": ["./packages/wechat/src"],
      "@sdcx/image-crop": ["./packages/image-crop/src"],
      "@sdcx/*": ["app/sdcx/*"]
    }
  }
}
```

按实际包名与路径增减或修改 `paths` 条目。

### 5. 主工程感知 lib：配置 Babel alias

在主工程的 `babel.config.js` 中为 `module-resolver` 配置与 `paths` 一致的 alias，保证运行时和打包能正确解析：

```js
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ts', '.tsx', '.ios.js', '.android.js', '.js', '.json'],
        alias: {
          '@sdcx/wechat': './packages/wechat/src',
          '@sdcx/image-crop': './packages/image-crop/src',
          '@sdcx/*': 'app/sdcx/*',
        },
      },
    ],
  ],
};
```

若尚未安装 `babel-plugin-module-resolver`，需先安装：

```bash
yarn add -D babel-plugin-module-resolver
# 或
pnpm add -D babel-plugin-module-resolver
```

### 6. 主工程依赖 workspace 包

在主工程根目录的 `package.json` 中，将 lib 作为 workspace 依赖加入：

```json
{
  "dependencies": {
    "@sdcx/wechat": "*",
    "@sdcx/image-crop": "*"
  }
}
```

使用 `*` 表示使用当前 workspace 内的版本；也可写为 `"workspace:*"`（Yarn 3+ / pnpm）明确指定 workspace 协议。配置完成后执行 `yarn install` 或 `pnpm install`，即可在业务代码中 `import` 并使用这些包。

## License

[MIT](./LICENSE)
