# npm

[npm](https://docs.npmjs.com/about-npm) 是 Node.js 的包管理工具，全称为 Node Package Manager。它既是命令行工具用于管理项目依赖，也是[在线仓库](https://www.npmjs.com/)供开发者共享模块。

## 一、常用命令

### 配置管理

- **npm config**

  [`npm config`](https://docs.npmjs.com/cli/v10/commands/npm-config) 命令用于更新和编辑用户和全局 [`.npmrc`](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc) 文件的内容，也可以获取指定项的[配置](https://docs.npmjs.com/cli/v10/using-npm/config)信息。

  ```sh
  # 查看当前 registry 配置
  npm config get registry
  
  # 设置镜像源（推荐中国用户使用）
  npm config set registry https://registry.npmmirror.com/
  
  # 查看全局安装路径
  npm config get prefix
  ```

### 依赖管理

- **npm install**

  [`npm install`](https://docs.npmjs.com/cli/v10/commands/npm-install) 命令安装一个包及其依赖的任何包。

  ```sh
  # 安装项目依赖（根据 package.json）
  npm install
  
  # 安装指定包并写入 dependencies
  npm install <package-name>
  
  # 安装指定包并写入 devDependencies
  npm install -D <package-name>
  npm install --save-dev <package-name>
  
  # 全局安装（需管理员权限）
  sudo npm install -g <package-name>
  ```

- **npm link**

  在依赖包目录中执行没有参数的 [`npm link`](https://docs.npmjs.com/cli/v10/commands/npm-link)，将在全局文件夹中创建一个符号链接。

  在其他位置，执行 `npm link package-name` 将在当前文件夹下的 *node_modules/* 目录下，创建一个符号链接，链接到全局安装的 *package-name*。
  
  ```sh
  # 在包目录创建全局软链接（开发调试常用）
  cd /your-package
  npm link
  
  # 在其他项目链接该包
  cd /your-project
  npm link your-package
  ```

## 二、配置管理

### 配置优先级

`npm` 按以下顺序加载[配置](https://docs.npmjs.com/cli/v10/using-npm/config#description)（后者覆盖前者）：

- **内置默认配置**：`/path/to/npm/npmrc`
- **全局配置**：`$PREFIX/etc/npmrc`
- **用户级配置**：`~/.npmrc`
- **项目级配置**：`./.npmrc`
- **环境变量**：以 `npm_config_` 开头的变量
- **命令行参数**：如 `--registry=https://registry.npmmirror.com/`

### 关键配置项

| 配置项                                                       | 作用描述             | 典型值示例                      |
| ------------------------------------------------------------ | -------------------- | ------------------------------- |
| [registry](https://docs.npmjs.com/cli/v10/using-npm/config#registry) | 包仓库地址           | https://registry.npmmirror.com/ |
| [prefix](https://docs.npmjs.com/cli/v10/using-npm/config#prefix) | 全局安装路径         | /usr/local（Unix）              |
| [save-exact](https://docs.npmjs.com/cli/v10/using-npm/config#save-exact) | 安装时锁定精确版本号 | true                            |

### 配置文件示例

[**~/.npmrc**](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc)（用户级配置）：

```ini
registry=https://registry.npmmirror.com/
prefix=/home/user/.npm-global
engine-strict=true
```

