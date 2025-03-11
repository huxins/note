# npm

[npm](https://docs.npmjs.com/about-npm) 是 Node.js 的包管理工具，全称为 Node Package Manager。它是一个命令行工具，用于安装、更新、卸载和管理 Node.js 项目中的依赖包。

[npm](https://www.npmjs.com/) 也是一个在线的包仓库，开发者可以在上面发布和分享自己的 Node.js 模块。

## 一、命令

### npm config

[`npm config`](https://docs.npmjs.com/cli/v10/commands/npm-config) 命令用于更新和编辑用户和全局 [*npmrc*](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc) 文件的内容。

获取指定项的[配置](https://docs.npmjs.com/cli/v10/using-npm/config)信息。

```sh
npm config get registry
```

配置指定项的信息。

```sh
npm config set registry https://registry.npmmirror.com/
```

### npm install

[`npm install`](https://docs.npmjs.com/cli/v10/commands/npm-install) 命令安装一个包及其依赖的任何包。

在包目录中使用 `npm install`，且没有参数时，会将依赖项安装到本地 *node_modules* 文件夹中。

在全局模式下（即，将 `-g` 或 `--global` 附加到命令中），会将当前包上下文（即当前工作目录）安装为全局包。

### npm link

在依赖包目录中执行没有参数的 `npm link`，将在全局文件夹中创建一个符号链接。

在其他位置，执行 `npm link package-name` 将在当前文件夹下的 *node_modules/* 目录下，创建一个符号链接，链接到全局安装的 *package-name*。

## 二、配置

`npm` 从以下[来源](https://docs.npmjs.com/cli/v10/using-npm/config#description)获取其配置值，按优先级排序：

- 命令行标志
- 环境变量
- *npmrc* 文件

### 配置项

#### registry

[*registry*](https://docs.npmjs.com/cli/v10/using-npm/config#registry) 是 npm 仓库的 base URL。

配置镜像。

```sh
npm config set registry https://registry.npmmirror.com/
```

#### prefix

在全局模式下，安装可执行文件的文件夹。

```sh
npm config get prefix
```

### 配置文件

`npm` 从命令行、环境变量和 [*npmrc*](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc) 文件中获取其配置设置。

`npm config` 命令用于更新和编辑用户和全局 *npmrc* 文件的内容。

四个相关文件是：

- 项目配置文件：*/path/to/my/project/.npmrc*
- 用户配置文件：*~/.npmrc*
- 全局配置文件：*$PREFIX/etc/npmrc*
- npm 内置配置文件：*/path/to/npm/npmrc*

