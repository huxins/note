# Module Bundlers

## 一、Babel

Babel 是一个工具链，主要用于将 ECMAScript 2015+ 代码转换为向后兼容的 JavaScript 版本。

```sh
$ npm install --save-dev @babel/core @babel/cli @babel/preset-env
```

在项目的根目录下创建一个名为 `babel.config.json` 的配置文件。

```json
{
  "presets": [
    [
      "@babel/preset-env"
    ]
  ],
  "plugins": []
}
```

执行下面的命令进行转码，该命令含义是把 main.js 转码生成 compiled.js 文件。

```sh
$ npx babel main.js -o compiled.js
```

