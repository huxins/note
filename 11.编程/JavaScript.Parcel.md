# Parcel

## 一、安装

```sh
$ npm install --save-dev parcel
```

## 二、配置

`package.json` 配置如下。参考项目 [PeerJS](https://github.com/peers/peerjs/blob/master/package.json)。

```json
{
  "private": true,
  "name": "snippet",
  "version": "1.0.0",
  "description": "",
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
  },
  "scripts": {
    "build": "parcel build"
  },
  "devDependencies": {
    "parcel": "^2.10.3"
  }
}
```

