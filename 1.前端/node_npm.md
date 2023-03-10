# NPM

## npm 命令行

### CLI 命令

#### npm config

```sh
npm config set <key>=<value> [<key>=<value> ...]
npm config get [<key> [<key> ...]]
npm config delete <key> [<key> ...]
npm config list [--json]
npm config edit

alias: c
```

`npm config` 命令可用于更新和编辑用户和全局 `npmrc` 文件的内容。

#### npm install

```sh
npm install [<package-spec> ...]

aliases: add, i, in, ins, inst, insta, instal, isnt, isnta, isntal, isntall
```

- 在包目录中使用 `npm install`

将依赖项安装到本地 `node_modules` 文件夹。

在全局模式下（即，将 `-g` 或 `--global` 附加到命令中），它将当前包上下文（即当前工作目录）安装为全局包。

### 配置 npm

#### .npmrc

`npm` 从命令行、环境变量和 `npmrc` 文件中获取其配置设置。

`npm config` 命令可用于更新和编辑用户和全局 `npmrc` 文件的内容。

### 使用 npm

#### Config

`npm` 从以下来源获取其配置值，按优先级排序：

- 命令行标志
- 环境变量
- npmrc 文件

##### Config Settings

###### registry

- Default: "https://registry.npmjs.org/"
- Type: URL

npm `registry` 的 base URL。

配置镜像：

```sh
$ npm config set registry https://registry.npmmirror.com/
```

## 参见

- [npm Docs](https://docs.npmjs.com/)

