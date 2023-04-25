# JavaScript

## 13. 表达式

### 13.2. 初级表达

#### 13.2.8. 模板文字

*模板字面量*是允许嵌入表达式的字符串字面量。你可以使用多行字符串和字符串插值功能。它们在 ES2015 规范的先前版本中被称为*模板字符串*。

##### 13.2.8.1. 语法

```
`string text`

`string text line 1
 string text line 2`

`string text ${expression} string text`

tag `string text ${expression} string text`
```

## 15. 函数和类

### 15.2. 函数

`function` 关键字可以用来在一个表达式中定义一个函数。

使用 `Function` 构造函数和一个 `function expression` 定义函数。

```javascript
let function_expression = function [name]([param1[, param2[, ..., paramN]]]) {
    statements
};
```

你也可以使用 `Function` 构造函数和一个函数声明来定义函数。

```javascript
function name([param,[, param,[..., param]]]) {
    statements
}
```

### 15.3. 箭头函数

箭头函数表达式的语法比函数表达式更简洁，并且没有自己的 `this`，`arguments`，`super` 或 `new.target`。箭头函数表达式更适用于那些本来需要匿名函数的地方，并且它不能用作构造函数。

#### 15.3.1. 语法

```
(param1, param2, …, paramN) => { statements }
(param1, param2, …, paramN) => expression
// 相当于：(param1, param2, …, paramN) => { return expression; }

// 当只有一个参数时，圆括号是可选的
(singleParam) => { statements }
singleParam => { statements }

// 没有参数的函数应该写成一对圆括号
() => { statements }
```

## 20. 基本对象

### 20.2. Function 对象

每个 JavaScript 函数实际上都是一个 `Function` 对象。运行 `(function(){}).constructor === Function` 便可以得到这个结论。

## 22. 文本处理

### 22.1. String 对象

#### 22.1.3. 方法

- String.prototype.**replace**()

  `replace()` 方法返回一个由替换值替换部分或所有的模式匹配项后的新字符串。模式可以是一个字符串或者一个正则表达式，替换值可以是一个字符串或者一个每次匹配都要调用的回调函数。如果 pattern 是字符串，则仅替换第一个匹配项。
  
  ```javascript
  str.replace(regexp|substr, newSubStr|function)
  ```
  
  - 字符串 Camel case 转 Snake case：
  
    ```javascript
    const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    ```

