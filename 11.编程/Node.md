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

#### 1.1.3. npm link

包链接步骤。

```
1、在依赖包目录中执行没有参数的 npm link，将在全局文件夹中创建一个符号链接。
2、在其他位置，执行 npm link package-name 将在当前文件夹下的 node_modules/ 目录下，创建一个符号链接，链接到全局安装的 package-name。
```

### 1.2. NPM 配置

#### 1.2.1. npmrc

`npm` 从命令行、环境变量和 `npmrc` 文件中获取其配置设置。

`npm config` 命令可用于更新和编辑用户和全局 `npmrc` 文件的内容。

`npm` 从以下来源获取其配置值，按优先级排序：

- 命令行标志
- 环境变量
- `npmrc` 文件

配置设置选项。

- **registry**

  `npm` 仓库的 base URL。
  
  - 配置镜像。
  
  ```sh
  $ npm config set registry https://registry.npmmirror.com/
  ```

- **prefix**

  在全局模式下，安装可执行文件的文件夹。
  
  ```sh
  $ npm config get prefix
  ```

## 二、Crypto

### 2.1. Hash

计算文件的 MD5。

```javascript
import { createReadStream } from 'fs';
import { createHash } from 'crypto';

function calculateFileMd5(filePath) {
  return new Promise((resolve, reject) => {
    const stream = createReadStream(filePath);
    const hash = createHash('md5');

    stream.on('data', (data) => {
      hash.update(data);
    });

    stream.on('end', () => {
      const md5 = hash.digest('hex');
      resolve(md5);
    });

    stream.on('error', (error) => {
      reject(error);
    });
  });
}

const filePath = './file.txt';

calculateFileMd5(filePath)
  .then((md5) => {
    console.log('MD5 using Node.js crypto module:', md5);
  })
  .catch((error) => {
    console.error('Error calculating MD5:', error);
  });
```

