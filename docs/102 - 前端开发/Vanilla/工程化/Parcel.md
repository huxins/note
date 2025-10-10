# Parcel

[Parcel](https://github.com/parcel-bundler/parcel) 是一个用于 Web 的零配置构建工具。

**安装**：

```sh
npm install --save-dev parcel
```

## 一、基础配置

### 构建目标配置

> `package.json` 配置参考：
> 
> - [PeerJS](https://github.com/peers/peerjs/blob/master/package.json)

配置完成后，可运行 [`parcel build`](https://parceljs.org/features/cli/#parcel-build-%3Centries%3E) 进行打包。

```sh
npx parcel build
```

#### 浏览器环境

```json
{
  // 非压缩版浏览器构建目标
  "browser-unminified": "dist/browser.js",
  "targets": {
    "browser-unminified": {
      "context": "browser",
      "outputFormat": "global",
      "optimize": false,
      "engines": {
        "browsers": "chrome >= 83, edge >= 83, firefox >= 80, safari >= 15"
      },
      "source": "src/index.js"
    }
  }
}
```

