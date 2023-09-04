# Node

## 一、NPM

### 1.1. CLI 命令

#### 1.1.1. npm config

`npm config` 命令可用于更新和编辑用户和全局 `npmrc` 文件的内容。

- 获取配置信息

  ```sh
  $ npm config get registry
  ```

- 配置信息

  ```sh
  $ npm config set registry https://registry.npmmirror.com/
  ```

#### 1.1.2. npm install

`npm install` 命令安装一个包及其依赖的任何包。

- 在包目录中使用 `npm install`

  将依赖项安装到本地 `node_modules` 文件夹。

  在全局模式下（即，将 `-g` 或 `--global` 附加到命令中），它将当前包上下文（即当前工作目录）安装为全局包。

### 1.2. 配置 NPM

#### 1.2.1. npmrc

`npm` 从命令行、环境变量和 `npmrc` 文件中获取其配置设置。

`npm config` 命令可用于更新和编辑用户和全局 `npmrc` 文件的内容。

### 1.3. 使用 NPM

#### 1.3.1. 配置

`npm` 从以下来源获取其配置值，按优先级排序：

- 命令行标志
- 环境变量
- `npmrc` 文件

##### 1.3.1.1. 配置设置

- **registry**

  `npm` 仓库的 base URL。
  
  - 配置镜像。
  
  ```sh
  $ npm config set registry https://registry.npmmirror.com/
  ```

