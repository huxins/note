# RequireJS

[RequireJS](https://github.com/requirejs/requirejs) 支持加载普通的 JavaScript 文件以及定义明确的模块。

- 专为浏览器环境优化（支持 Web Worker）
- 实现了 AMD 异步模块规范

**AMD 规范特点**：

- 异步加载机制（不阻塞页面渲染）
- 依赖前置声明
- 模块提前执行

## 一、快速开始

### 项目初始化

#### 推荐目录结构

```text
project/
├─ index.html
└─ scripts/
   ├─ main.js       # 入口文件
   ├─ require.js    # 框架核心
   └─ modules/      # 模块目录
      ├─ math.js
      └─ dataService.js
```

#### HTML 入口配置

使用 [`require.js`](https://requirejs.org/docs/download.html#requirejs) 进行 [`requirejs`](https://requirejs.org/docs/api.html#config) 调用来加载脚本。

```html
<!DOCTYPE html>
<html>
    <head>
        <title>My Sample Project</title>
        <script data-main="scripts/main" src="scripts/require.js"></script>
    </head>
    <body>
        <h1>My Sample Project</h1>
    </body>
</html>
```

### 基础配置

设置一个[主模块](https://requirejs.org/docs/api.html#data-main)，统一调度当前项目中所有依赖模块。

- `require.config` 用于配置模块加载的路径。
- `require` 函数用于加载模块，并在加载完成后执行回调函数。

```javascript
// main.js
require.config({
  baseUrl: 'scripts',
  paths: {
    math: 'modules/math',
    dataService: 'modules/dataService'
  }
});

require(['dataService'], function(service) {
  service.doSomething();
});
```

## 二、模块开发

### 无依赖模块

如果模块没有依赖关系，可以直接定义在 [`define()`](https://requirejs.org/docs/api.html#deffunc) 函数中。

```javascript
// math.js
define(function() {
  const add = (a, b) => a + b;
  return { add };
});
```

### 有依赖模块

若这个模块还依赖其他模块，那么 [`define()`](https://requirejs.org/docs/api.html#defdep) 函数的第一个参数，必须是一个数组，指明该模块的依赖性。当 [`require()`](https://requirejs.org/docs/api.html#data-main) 函数加载该模块时，就会先加载 `math.js` 模块。

```javascript
// dataService.js
define(['math'], function(math) {
  function calculate() {
    return math.add(2, 3);
  }
  
  return { calculate };
});
```

### CommonJS 兼容写法

这是 [CommonJS](https://requirejs.org/docs/commonjs.html) 风格的示例，使用 `require` 函数在模块内部加载依赖。

```javascript
// dataService.js
define(function (require) {
  const math = require('math');

  function doSomething() {
    let result = math.add(2, 9);
  }

  return { doSomething };
})
```

## 三、高级配置

### 路径映射

- [paths](https://requirejs.org/docs/api.html#config-paths)

```javascript
paths: {
  'jquery': 'libs/jquery-3.5.min'
}
```

### 非 AMD 模块加载

理论上 RequireJS 加载的模块，必须是按照 AMD 规范用 `define()` 函数定义的模块。

实际上，虽然已经有一部分流行的函数库（比如 jQuery）符合 AMD 规范，更多的库并不符合。

这样的模块在用 `require()` 加载之前，要先用 `require.config()` 方法的 [`shim`](https://requirejs.org/docs/api.html#config-shim)，定义它们的一些特征。

- **exports**：输出的变量名，表示这个模块外部调用时的名称。
- **deps**：数组，表示该模块的依赖项。

```javascript
shim: {
  'legacyLib': {
    deps: ['jquery'],
    exports: 'LegacyLibrary'
  }
}
```

### 插件扩展

RequireJS 允许编写[加载器插件](https://requirejs.org/docs/plugins.html)，可以将不同类型的资源作为依赖项加载。

#### CSS 加载插件

[`require-css`](https://github.com/guybedford/require-css) 允许像加载 JavaScript 模块一样来加载 CSS 文件。

在 RequireJS 配置文件中添加 `require-css` 插件的路径。

```javascript
require.config({
  paths: {
    css: 'path/to/require-css/css'
  }
});
```

现在可以在模块中加载 CSS 文件了。

```javascript
define(['css!path/to/your/styles'], function() {
  // Your module code here
});
```

#### 文本文件加载

[`requirejs/text`](https://github.com/requirejs/text) 用于加载文本资源。

```javascript
define(['text!templates/main.html'], function(tpl) {
  console.log(tpl);
});
```

