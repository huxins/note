# JavaScript

## 一、语句和声明

### 1.1. 声明

#### 1.1.1. let

`let` 允许声明一个作用域被限制在块作用域中的局部变量。`let` 声明的变量不会在作用域中被提升。

```javascript
let x = 1;

if (x === 1) {
  let x = 2;
  console.log(x);
}

console.log(x);
```

#### 1.1.2. var

`var` 语句用于声明一个函数范围或全局范围的变量。

```javascript
var x = 1;

if (x === 1) {
  var x = 2;
  console.log(x);
}

console.log(x);
```

无论在何处声明变量，都会在执行任何代码之前进行处理。这被称为变量提升。这些变量的初始值为 `undefined`。

```javascript
console.log(x);

var x = 1;

console.log(x);
```

#### 1.1.3. const

`const` 声明的变量称为常量。常量是块级范围的，非常类似用 `let` 语句定义的变量。但常量的值无法改变，也不能被重新声明。

```javascript
const number = 42;

try {
  number = 99;
} catch (err) {
  console.log(err);
}

console.log(number);
```

## 二、词汇语法

### 2.1. 字面量

#### 2.1.1. String

字符串字面量是由双引号或单引号括起来的零个或多个字符。

```javascript
"A string primitive";
'Also a string primitive';
```

## 三、表达式

### 3.1. 基本表达式

#### 3.1.1. 模板字面量

在 ES2015 中，还提供了一种模板字面量，模板字符串提供了一些语法糖来构造字符串。这与 Perl、Python 还有其他语言中的字符串插值的特性非常相似。

```javascript
var name = "Bob";
var time = "today";
`Hello ${name}, how are you ${time}?`
```

#### 3.1.2. 对象初始化

对象初始化器是一个用大括号括起来的以逗号分隔的列表，包含了一个对象的零个或多个属性名称和相关值。

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

### 3.2. 一元运算符

#### 3.2.1. typeof

`typeof` 运算符返回一个字符串，表示操作数据的类型。

```javascript
console.log(typeof 42);
```

## 四、严格模式

ES5 规范增加了新的语言特性并且修改了一些已经存在的特性。为了保证旧的功能能够使用，大部分修改是默认不生效的。需要一个特殊的指令 `use strict` 来明确地激活这些特性。

### 4.1. 调用严格模式

#### 4.1.1. 脚本

为脚本开启严格模式。

```javascript
"use strict";
var v = "Hi!  I'm a strict mode script!";
```

#### 4.1.2. 函数

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

### 4.2. 严格模式中的变化

#### 4.2.1. 八进制语法

严格模式禁止八进制数字语法。ECMAScript 并不包含八进制语法，但所有的浏览器都支持这种以零开头的八进制语法：`0644 === 420`。在 ECMAScript 6 中支持为一个数字加 `0o` 的前缀来表示八进制数。

```javascript
"use strict";
console.log(0644 === 420);
```

#### 4.2.2. 声明全局变量

非严格模式下，如果在函数内部使用未声明的变量，JavaScript 会自动将其创建为全局变量；但是在严格模式下，这种行为是被禁止的。

```javascript
function myFunction() {
  x = 10;
}

myFunction();
console.log(x);
```

## 五、数据类型

### 5.1. 语言类型

#### 5.1.1. Undefined

表示变量未赋值时的属性。

#### 5.1.2. Null

代表 `无`、`空` 或 `值未知` 的特殊值。

#### 5.1.3. Boolean

Boolean 类型仅包含两个值：`true` 和 `false`。

#### 5.1.4. String

String 类型是一串表示文本值的字符序列。内部将其编码为 `UTF-16` 的整数值序列。字符串的长度是其中的 `UTF-16` 代码单元的数量，这可能与 Unicode 字符的实际数量不符。

`str.charAt()` 返回一个由给定索引处的单个 `UTF-16` 码元构成的新字符串；`charCodeAt()` 则返回给定索引处的 `UTF-16` 代码单元；`codePointAt()` 返回一个 Unicode 编码点值的非负整数。

#### 5.1.5. Symbol

Symbol 类型用于创建对象的唯一标识符。

#### 5.1.6. Number

Number 类型代表整数和浮点数，是一种基于 IEEE 754 标准的双精度 64 位二进制格式的值。

它能够存储 `Number.MIN_VALUE` 和 `Number.MAX_VALUE` 之间的正浮点数，以及 `-Number.MIN_VALUE` 和 `-Number.MAX_VALUE` 之间的负浮点数，但是它仅能安全地存储在 `Number.MIN_SAFE_INTEGER` 到 `Number.MAX_SAFE_INTEGER` 范围内的整数。可以使用 `Number.isSafeInteger()` 检查一个数是否在安全的整数范围内。

#### 5.1.7. BigInt

BigInt 类型可以表示任意大小的整数。

BigInt 是通过将 `n` 附加到整数末尾或调用 `BigInt()` 函数来创建的。

```javascript
const bigInt = 1234567890123456789012345678901234567890n;
```

#### 5.1.8. Object

Object 类型是一个特殊的类型。其他所有的数据类型都被称为原始类型，因为它们的值只包含一个单独的内容。相反，Object 则用于储存数据集合和更复杂的实体。

## 六、函数和类

### 6.1. 函数定义

#### 6.1.1. 函数声明

函数声明定义一个具有指定参数的函数。

```javascript
function add(a, b) {
  console.log(a + b)
}
```

#### 6.1.2. 函数表达式

`function` 关键字可以用来在一个表达式中定义一个函数。

```javascript
var add = function (a, b) {
  console.log(a + b)
}
```

#### 6.1.3. 箭头函数定义

箭头函数表达式的语法比函数表达式更简洁，并且没有自己的 `this`，`arguments`，`super` 或 `new.target`。箭头函数表达式更适用于那些本来需要匿名函数的地方，并且它不能用作构造函数。

```javascript
(param1, param2, …, paramN) => { statements }
(param1, param2, …, paramN) => expression
// 相当于：(param1, param2, …, paramN) => { return expression; }

// 当只有一个参数时，圆括号是可选的
(singleParam) => { statements }
singleParam => { statements }

// 没有参数的函数应该写成一对圆括号
() => { statements }
```

#### 6.1.4. 构造函数

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

#### 6.1.5. 原型链

- **prototype**

  是函数对象特有的属性，每个函数都有一个 `prototype` 属性，它指向一个对象，这个对象就是该函数的原型。

  在构造函数创建对象时，对象会继承构造函数的 `prototype` 上的属性和方法。这意味着通过构造函数创建的所有实例都共享同一个 `prototype` 对象上的方法。

- **\__proto__**

  是每个对象都具有的属性，它指向对象的原型。它用于实现对象之间的原型链。

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

### 6.2. 类定义

类是用于创建对象的模板。实际上，类是特殊的函数，是构造函数的一种更现代、更清晰的语法糖。

#### 6.2.1. 类声明

定义类的一种方法是使用类声明。要声明一个类，可以使用带有 `class` 关键字的类名。

```javascript
class Car {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```

#### 6.2.2. 类表达式

类表达式是定义类的另一种方法。类表达式可以命名或不命名。

```javascript
let Car = class {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
```

#### 6.2.3. 构造函数

`constructor` 方法是一个特殊的方法，这种方法用于创建和初始化一个由 `class` 创建的对象。

一个构造函数可以使用 `super` 关键字来调用一个父类的构造函数。

#### 6.2.4. 原型方法

原型方法是在构造函数的原型对象上定义的方法。原型方法只能通过实例对象来访问。

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

#### 6.2.5. 静态方法

静态方法是直接在构造函数本身上定义的方法。它们并不属于构造函数的实例，而是属于构造函数本身。

```javascript
class Point {
  static displayName = "Point";

  static distance(a, b) {
    return Math.max(a, b);
  }
}
```

### 6.3. 方法定义

#### 6.3.1. 函数简写

从 ECMAScript 2015 开始，在对象初始器中引入了一种更简短定义方法的语法，这是一种把方法名直接赋给函数的简写方式。

```javascript
const obj = {
  foo() {
    return 'bar';
  },
};
```

#### 6.3.2. getter

`get` 语法将对象属性绑定到查询该属性时将被调用的函数。

```javascript
const obj = {
  log: ['a', 'b', 'c'],
  get latest() {
    return this.log;
  },
};
```

#### 6.3.3. setter

`set` 语法将对象属性绑定到设置该属性时将被调用的函数。

```javascript
const language = {
  set current(name) {
    this.log.push(name);
  },
  log: [],
};
```

## 七、文本处理

### 7.1. String

#### 7.1.1. 方法

- String.prototype.**replace**()

  `replace()` 方法返回一个由替换值替换部分或所有的模式匹配项后的新字符串。模式可以是一个字符串或者一个正则表达式，替换值可以是一个字符串或者一个每次匹配都要调用的回调函数。如果模式是字符串，则仅替换第一个匹配项。
  
  ```
  str.replace(regexp|substr, newSubStr|function)
  ```
  
  - 替换单个字符串
  
    ```javascript
    '你的唯一'.replace('你', '我')
    ```

  - Camel case 转 Snake case
  
    ```javascript
    const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    ```

- String.prototype.**slice**()

  `slice()` 方法提取某个字符串的一部分，并返回一个新的字符串，且不会改动原字符串。
  
  ```
  str.slice(beginIndex[, endIndex])
  ```
  
  从 `beginIndex` 索引处开始提取原字符串中的字符，如果值为负数，会被当做 `strLength + beginIndex` 看待。在 `endIndex` 索引处结束提取字符串，如果省略该参数，`slice()` 会一直提取到字符串末尾。`endIndex` 不包含最后一个元素。

## 八、集合

### 8.1. Array

#### 8.1.1. 方法

- Array.prototype.**join**()

  `join()` 方法将一个数组的所有元素连接成一个字符串并返回这个字符串，用逗号或指定的分隔符字符串分隔。

  ```javascript
  join([separator])
  ```

  - 拼接数组字符串

    ```javascript
    $("input[name='checkList']:checked")
      .map(function() {
        return $(this).val();
      })
      .get()
      .join();
    ```

## 九、基本对象

### 9.1. Function

#### 9.1.1. 方法

- Function.prototype.**call**()

  `call()` 方法使用一个指定的 `this` 值和单独给出的一个或多个参数来调用一个函数。
  
  ```
  function.call(thisArg, arg1, arg2, ...)
  ```
  
### 9.2. Object

#### 9.2.1. 方法

- Object.**fromEntries**()

  `fromEntries()` 静态方法将键值对列表转换为一个对象。

  ```
  Object.fromEntries(iterable)
  ```

  - 将 Map 转为 Object

    ```javascript
    const entries = new Map([
      ['foo', 'bar'],
      ['baz', 42],
    ]);
    
    const obj = Object.fromEntries(entries);
    ```

- Object.**defineProperty**()

  `defineProperty()` 静态方法会直接在一个对象上定义一个新属性，或修改其现有属性，并返回此对象。

  ```
  Object.defineProperty(obj, prop, descriptor)
  ```

  - 在对象上，添加一个不可枚举属性。

    ```javascript
    const obj = {car: 'mazda'}
    
    Object.defineProperty(obj, 'year', {
      value: 2020
    })
    ```

  - 在对象上，添加一个属性，采用数据代理的方式。
  
    ```javascript
    const obj = { car: 'mazda' };
    var number = 18;
    
    Object.defineProperty(obj, 'year', {
      get() {
        return number;
      },
    });
    ```

