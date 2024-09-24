# JavaScript

[JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript) 是一种具有函数优先特性的轻量级、解释型的编程语言。

## 一、语句和声明

### let

[`let`](https://tc39.es/ecma262/multipage/ecmascript-language-statements-and-declarations.html#sec-let-and-const-declarations) 允许声明一个作用域被限制在块作用域中的局部变量。[`let`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let) 声明的变量不会在作用域中被提升。

```javascript
let x = 1;

if (x === 1) {
  let x = 2;
  console.log(x); // 2
}

console.log(x); // 1
```

### var

[`var`](https://tc39.es/ecma262/multipage/ecmascript-language-statements-and-declarations.html#sec-variable-statement) 语句用于声明一个函数范围或全局范围的变量。

```javascript
var x = 1;

if (x === 1) {
  var x = 2;
  console.log(x); // 2
}

console.log(x); // 2
```

无论在何处声明变量，都会在执行任何代码之前进行处理。这被称为变量提升。这些变量的初始值为 `undefined`。

```javascript
console.log(x);

var x = 1;

console.log(x);
```

### const

[`const`](https://tc39.es/ecma262/multipage/ecmascript-language-statements-and-declarations.html#sec-let-and-const-declarations) 声明的变量称为常量。常量是块级范围的，非常类似用 `let` 语句定义的变量。但常量的值无法改变，也不能被重新声明。

```javascript
const number = 42;

try {
  number = 99;
} catch (err) {
  console.log(err);
}

console.log(number);
```

## 二、词法分析

### 字面量

#### String

[字符串字面量](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Lexical_grammar#%E5%AD%97%E7%AC%A6%E4%B8%B2%E5%AD%97%E9%9D%A2%E9%87%8F)是由双引号或单引号括起来的零个或多个字符。

```javascript
"A string primitive";
'Also a string primitive';
```

### 表达式

#### 模板字面量

在 ES2015 中，还提供了一种[模板字面量](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Template_literals)，模板字符串提供了一些语法糖来构造字符串。这与 Perl、Python 还有其他语言中的字符串插值的特性非常相似。

```javascript
var name = "Bob";
var time = "today";
`Hello ${name}, how are you ${time}?`
```

#### 对象初始化

[对象初始化器](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Object_initializer)是一个用大括号括起来的以逗号分隔的列表，包含了一个对象的零个或多个属性名称和相关值。

```javascript
o = {
  a: "foo",
  b: 42,
}
```

`foo: foo` 形式的属性赋值可以简写。

```javascript
let foo = '我的世界';

o = {
  a: 18,
  foo
}
```

对象属性也可以是一个函数、getter 或 setter 方法。

```javascript
const o = {
  property() {
    return '我的世界'
  },
};
```

[展开语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)可以在构造字面量对象时，将对象表达式按 *key-value* 的方式展开。

```javascript
const item = { id: "123", name: "zh" };
const new_item = { ...item, value: item.id, label: item.name };
```

## 三、严格模式

ES5 规范增加了新的语言特性并且修改了一些已经存在的特性。为了保证旧的功能能够使用，大部分修改是默认不生效的。需要一个特殊的指令 `use strict` 来明确地激活这些特性。

### 启用严格模式

#### 脚本

为脚本开启严格模式。

```javascript
"use strict";
var v = "Hi!  I'm a strict mode script!";
```

#### 函数

为函数开启严格模式。

```javascript
function strict() {
  'use strict';
  function nested() {
    return "And so am I!";
  }
  return "Hi!  I'm a strict mode function!  " + nested();
}
```

### 严格模式特性

#### 八进制语法

严格模式禁止八进制数字语法。ECMAScript 并不包含八进制语法，但所有的浏览器都支持这种以零开头的八进制语法：`0644 === 420`。在 ECMAScript 6 中支持为一个数字加 `0o` 的前缀来表示八进制数。

```javascript
"use strict";
console.log(0644 === 420);
```

#### 声明全局变量

非严格模式下，如果在函数内部使用未声明的变量，JavaScript 会自动将其创建为全局变量；但是在严格模式下，这种行为是被禁止的。

```javascript
"use strict";
function myFunction() {
  x = 10;
}

myFunction();
console.log(x);
```

## 四、数据类型

最新的 ECMAScript 标准定义了 8 种[数据类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Grammar_and_types#%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B)：

- **undefined**：表示变量未赋值时的属性。

- **null**：代表无、空或值未知的特殊值。

- **Boolean**：仅包含两个值，`true` 和 `false`。

- **Number**：代表整数和浮点数，是一种基于 IEEE 754 标准的双精度 64 位二进制格式的值。

- **BigInt**：表示任意大小的整数。通过将 `n` 附加到整数末尾或调用 `BigInt()` 函数来创建。

- **String**：表示文本值的字符序列。内部将其编码为 `UTF-16` 的整数值序列，字符串的长度是其中的 `UTF-16` 代码单元的数量，这可能与 Unicode 字符的实际数量不符。

- **Symbol**：用于创建对象的唯一标识符。

- **Object**：用于储存数据集合和更复杂的实体。是一个特殊的类型，其他所有的数据类型都被称为原始类型，因为它们的值只包含一个单独的内容。

## 五、函数

[函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Functions)是 JavaScript 中的基本组件之一。

### 函数声明

[函数声明](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Functions#%E5%87%BD%E6%95%B0%E5%A3%B0%E6%98%8E)定义一个具有指定参数的函数。

```javascript
function add(a, b) {
  console.log(a + b)
}
```

### 函数表达式

函数也可以由[函数表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/function)创建，`function` 关键字用来在一个表达式中定义一个函数。

```javascript
var add = function (a, b) {
  console.log(a + b)
}
```

### 箭头函数

[箭头函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Functions#%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0)表达式的语法比函数表达式更简洁，并且没有自己的 `this`，`arguments`，`super` 或 `new.target`。箭头函数表达式更适用于那些本来需要匿名函数的地方，并且它不能用作构造函数。

```javascript
(param1, param2, ..., paramN) => { statements }
(param1, param2, ..., paramN) => expression
// 相当于：(param1, param2, ..., paramN) => { return expression; }

// 当只有一个参数时，圆括号是可选的
(singleParam) => { statements }
singleParam => { statements }

// 没有参数的函数应该写成一对圆括号
() => { statements }
```

### 构造函数

构造函数是用于创建对象的模板。

```javascript
function Person(name) {
  this.name = name;
}
```

在构造函数的原型上添加方法。

```javascript
Person.prototype.sayHello = function() {
  console.log(`Hello, my name is ${this.name}.`);
};
```

### 方法定义

从 ECMAScript 2015 开始，在[对象初始器](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Object_initializer)中引入了一种更简短定义方法的语法，这是一种把方法名直接赋给函数的简写方式。

```javascript
const obj = {
  foo() {
    return 'bar';
  },
};
```

#### getter

[`get`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/get) 语法将对象属性绑定到查询该属性时将被调用的函数。

```javascript
const obj = {
  log: ['a', 'b', 'c'],
  get latest() {
    return this.log;
  },
};
```

#### setter

[`set`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/set) 语法将对象属性绑定到设置该属性时将被调用的函数。

```javascript
const language = {
  set current(name) {
    this.log.push(name);
  },
  log: [],
};
```

### 原型链

JavaScript 只有对象这一种结构。每个对象都有一个私有属性指向另一个名为[原型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)的对象。原型对象也有一个自己的原型，层层向上直到一个对象的原型为 `null`。根据定义，`null` 没有原型，并作为这个原型链中的最后一个环节。

- **prototype**

  是函数对象特有的属性，每个函数都有一个 `prototype` 属性，它指向一个对象，这个对象就是该函数的原型。

  在构造函数创建对象时，对象会继承构造函数的 `prototype` 上的属性和方法。这意味着通过构造函数创建的所有实例都共享同一个 `prototype` 对象上的方法。

- **\_\_proto__**

  是每个对象都具有的属性，它指向对象的构造函数的原型。它用于实现对象之间的原型链。

  当访问一个对象的属性或方法时，如果对象本身没有这个属性或方法，JavaScript 引擎会沿着对象的 `__proto__` 链向上查找，直到找到为止。

原型、原型链遵循以下两个准则。

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

let person = new Person('小明', 18);

Person.prototype.constructor === Person;
person.__proto__ === Person.prototype;
```

根据以上两个准则，原型链查找逻辑如下。

```javascript
person.__proto__ === Person.prototype;
Person.prototype.__proto__ === Object.prototype;
Object.prototype.__proto__ === null;

Person.__proto__ === Function.prototype;
Function.prototype.__proto__ === Object.prototype;
Object.prototype.__proto__ === null;

Object.__proto__ === Function.prototype;    // Object 本质也是函数
Function.__proto__ === Function.prototype;
```

## 六、类

[类](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes)是用于创建对象的模板。实际上，类是特殊的函数，是构造函数的一种更现代、更清晰的语法糖。

### 类声明

定义类的一种方法是使用类声明。要声明一个类，可以使用带有 `class` 关键字的类名。

```javascript
class Car {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```

### 类表达式

类表达式是定义类的另一种方法。类表达式可以命名或不命名。

```javascript
let Car = class {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
```

### 构造函数

`constructor` 方法是一个特殊的方法，这种方法用于创建和初始化一个由 `class` 创建的对象。

一个构造函数可以使用 `super` 关键字来调用一个父类的构造函数。

### 原型方法

原型方法是在构造函数的原型对象上定义的方法，只能通过实例对象来访问。

```javascript
let Car = class {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  get area() {
    return this.calcArea();
  }

  calcArea() {
    return this.height * this.width;
  }
};
```

### 静态方法

静态方法是直接在构造函数本身上定义的方法。它们并不属于构造函数的实例，而是属于构造函数本身。

```javascript
class Point {
  static displayName = "Point";

  static distance(a, b) {
    return Math.max(a, b);
  }
}
```

