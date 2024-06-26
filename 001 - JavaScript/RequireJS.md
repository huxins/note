# RequireJS

[RequireJS](https://github.com/requirejs/requirejs) 可以加载普通的 JavaScript 文件以及定义明确的模块。它针对浏览器中的使用进行了优化，包括在 Web Worker 中的使用，但它也可以在其他 JavaScript 环境中使用。它实现了 Asynchronous Module API。

## 一、AMD

AMD 采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。

RequireJS 是目前 AMD 规范最热门的一个实现。RequireJS 推崇依赖前置，默认在声明时执行。

## 二、目录结构

如果您有一个项目，它有一个 *project.html* 页面，带有一些脚本，则目录布局可能如下所示：

```
project-directory/
  project.html
  scripts/
    main.js
    helper/
      util.js
```

将 *require.js* 添加到 *scripts* 目录中，看起来如下所示：

```
project-directory/
  project.html
  scripts/
    main.js
    require.js
    helper/
      util.js
```

为了充分利用优化工具，将所有内联脚本都排除在 HTML 之外，并且只使用 `requirejs` 调用引用 *require.js* 来加载脚本：

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

## 三、定义模块

若一个模块不依赖其他模块，可以直接定义在 `define()` 函数中。

```javascript
// math.js
define(function () {
  var add = function (x, y) {
    return x + y;
  };
  return {
    add
  };
});
```

若这个模块还依赖其他模块，那么 `define()` 函数的第一个参数，必须是一个数组，指明该模块的依赖性。当 `require()` 函数加载该模块时，就会先加载 `math.js` 模块。

```javascript
// dataService.js
define(['math'], function (math) {
  function doSomething() {
    let result = math.add(2, 9);
    console.log(result);
  }
  return {
    doSomething
  };
})
```

设置一个主模块，统一调度当前项目中所有依赖模块。

```javascript
// main.js
(function () {
  require.config({
    // baseUrl: '',
    paths: {
      math: './math',
      dataService: './dataService'
    }
  })
  require(['dataService'], function (dataService) {
    dataService.doSomething()
  });
})();
```

在 `index.html` 中引入 `require.js`，并设置 `data-main` 入口主模块。

```html
<script data-main="./main.js" src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js"></script>
```

## 四、非规范模块加载

理论上 RequireJS 加载的模块，必须是按照 AMD 规范用 `define()` 函数定义的模块。但实际上，虽然已经有一部分流行的函数库（比如 jQuery）符合 AMD 规范，更多的库并不符合。

这样的模块在用 `require()` 加载之前，要先用 `require.config()` 方法，定义它们的一些特征。例如，`underscore` 和 `backbone` 这两个库，都没有采用 AMD 规范编写。如果要加载的话，必须先定义它们的特征。

- **exports**：输出的变量名，表示这个模块外部调用时的名称。
- **deps**：数组，表示该模块的依赖项。

```javascript
require.config({
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  }
});
```

