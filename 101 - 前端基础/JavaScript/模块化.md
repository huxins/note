# JavaScript 模块化

## 一、CommonJS 规范

- 主要应用于服务器端（如 Node.js）
- 同步加载模块
- 每个文件即模块

### 导出模块

一个模块可以通过 `module.exports` 或 `exports` 来导出其内部的变量、函数或对象，使其他模块能够访问这些导出内容。

```javascript
// hello.js
function Hello() {
  console.log('Hello');
}

// 方式一：exports 简写
exports.Hello = Hello;

// 方式二：完整导出
module.exports = Hello;
```

### 导入模块

在其他模块中，可以使用 `require` 函数来导入另一个模块的导出内容。导入的模块会被加载并执行，然后返回其导出内容。

```javascript
// 解构导入
const { Hello } = require('./hello');

// 基本导入
const Hello = require('./hello');
```

### 浏览器支持

模块名的解析是基于 Node.js 的模块系统，在浏览器环境下是不支持的。

在前端开发中，通常需要使用工具（如 Browserify、Webpack 等）来转换和处理模块名的导入。

以 Browserify 为例：

```sh
browserify ./index.js -o ./bundle.js
```

## 二、AMD 规范

所有依赖必须在模块定义时提前声明，并通过异步回调使用。

- **依赖前置声明**：模块定义时需明确列出所有依赖，加载器会提前并行加载。
- **模块提前执行**：依赖加载完成后，模块会立即执行。

```javascript
// AMD（RequireJS）
define(['./a', './b'], function(a, b) {
  a.doSomething(); // 所有依赖已提前加载并执行
  b.doSomethingElse();
});
```

## 三、CMD 规范

CMD 是通用模块加载，要解决的问题与 AMD 一样，只不过是对依赖模块的执行时机不同，推崇就近依赖。

- **就近依赖**：依赖在模块内部按需声明，通常在使用到的地方通过 `require` 同步引入。
- **延迟执行**：模块整体加载后不会立即执行，而是在遇到 `require` 语句时才会执行依赖模块。

```javascript
// CMD（Sea.js）
define(function(require, exports, module) {
  var a = require('./a'); // 依赖就近声明
  a.doSomething();

  if (condition) {
    var b = require('./b'); // 按需加载依赖
    b.doSomethingElse();
  }
});
```

**AMD 和 CMD 的核心区别**：

| 特性           | CMD（就近依赖）            | AMD（依赖前置）                |
| -------------- | -------------------------- | ------------------------------ |
| **依赖声明**   | 代码内部就近声明，可条件化 | 模块顶部提前声明，静态化       |
| **加载时机**   | 执行到 `require` 时加载    | 定义时并行加载所有依赖         |
| **执行时机**   | 延迟执行（按需执行）       | 提前执行（加载完立即执行）     |
| **适用场景**   | 适合需要按需加载的复杂逻辑 | 适合依赖明确且需快速执行的场景 |
| **代码灵活性** | 高（依赖可动态引入）       | 低（依赖必须静态声明）         |

### 模块定义

Sea.js 是 CMD 规范的一个实现。

定义模块使用全局函数 `define()`，接收一个 `factory` 参数，可以是一个函数，也可以是一个对象或字符串。

**`factory` 是函数时有三个参数**：

  - **require**：用来获取其他模块提供的接口。
  - **exports**：用来向外提供本模块接口。
  - **module**：存储了与当前模块相关联的属性和方法。

```javascript
// 函数式定义
define(function (require, exports, module) {
  // 同步引入
  const mod = require('./module');
  
  // 异步引入
  require.async('./module', mod => {
    // 回调处理
  });
});

// 简单值定义
define({ foo: 'bar' });
```

```javascript
define(function (require, exports, module) {
  function Hello() {
    console.log('Hello');
  };
  // 导出
  module.exports = { Hello };
});
```

### 入口文件

在 `index.html` 中引入 `sea.js`，并调用 `main.js` 入口主模块。

```html
<script src="https://cdn.bootcdn.net/ajax/libs/seajs/3.0.3/sea.js"></script>
<script>
  seajs.use('./main.js');
</script>
```

## 四、ES Modules

ES6 模块的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出变量。

- 静态编译时加载
- 浏览器原生支持
- 支持 Tree Shaking

```javascript
// ES6 Module（静态导入）
import a from './a';
a.doSomething();

// 动态按需加载（类似CMD思想）
if (condition) {
  const b = await import('./b');
  b.doSomethingElse();
}
```

### 导出方式

- **命名导出**

  使用命名导出时，可以将模块中的多个变量、函数或类分别导出，以便其他模块可以通过相应的名称进行导入。
  
  ```javascript
  // 行内导出
  export const add = (a, b) => a + b;
  
  // 批量导出
  export { add, subtract };
  ```

- **默认导出**

  默认导出用于导出模块的主要内容，一个模块只能有一个默认导出。在导入时，可以选择为默认导出指定任何名称。
  
  ```javascript
  const myFunction = (a, b) => a + b;
  export default myFunction;
  ```
  
- **全量导出**

  `export * from 'fs'` 用于将另一个模块的所有导出内容重新在当前模块导出。

  在这个特定的例子中，它会将 Node.js 的内置模块 `fs` 的所有导出内容重新在当前模块导出。
  
  ```javascript
  // myModule.js
  export * from 'fs';
  ```

  然后，可以在其他模块中来访问这些导出的内容。
  
  ```javascript
  // 在其他模块中导入
  import { readFile, writeFile } from './myModule.js';
  ```

### 导入方式

- **命名导入**

  ```javascript
  import { add, subtract } from './math.js';
  ```

- **默认导入**

  ```javascript
  import Calculator from './math.js';
  ```

- **混合导入**

  ```javascript
  import React, { Component } from 'react';
  ```

- **全量导入**

  ```javascript
  import * as fs from 'fs'
  import { default as fs } from 'fs'
  ```

### 浏览器支持

```html
<script type="module">
  import { add } from './math.js';
</script>
```

