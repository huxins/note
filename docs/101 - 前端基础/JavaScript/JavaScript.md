# JavaScript

[JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript) 是一种具有函数优先特性的轻量级、解释型的编程语言。

## 一、语言基础

### 变量声明

- **let**

  [`let`](https://tc39.es/ecma262/multipage/ecmascript-language-statements-and-declarations.html#sec-let-and-const-declarations) 允许声明一个作用域被限制在块作用域中的局部变量（块作用域）。

  [`let`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let) 声明的变量不会在作用域中被提升。
  
  ```javascript
  let x = 1;
  
  if (x === 1) {
    let x = 2;
    console.log(x); // 2
  }
  
  console.log(x); // 1
  ```

- **var**

  [`var`](https://tc39.es/ecma262/multipage/ecmascript-language-statements-and-declarations.html#sec-variable-statement) 语句用于声明一个函数范围或全局范围的变量（函数作用域）。
  
  ```javascript
  var x = 1;
  
  if (x === 1) {
    var x = 2;
    console.log(x); // 2
  }
  
  console.log(x); // 2
  ```

  无论在何处声明变量，都会在执行任何代码之前进行处理。

  这被称为变量提升，这些变量的初始值为 `undefined`。
  
  ```javascript
  console.log(x);
  
  var x = 1;
  
  console.log(x);
  ```

- **const**

  [`const`](https://tc39.es/ecma262/multipage/ecmascript-language-statements-and-declarations.html#sec-let-and-const-declarations) 声明的变量称为常量（块作用域）。

  常量是块级范围的，非常类似用 `let` 语句定义的变量。

  但常量的值无法改变，也不能被重新声明。
  
  ```javascript
  const number = 42;
  
  try {
    number = 99;
  } catch (err) {
    console.log(err);
  }
  
  console.log(number);
  ```

### 数据类型

最新的 ECMAScript 标准定义了 `8` 种[数据类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Grammar_and_types#%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B)：

- **undefined**：表示变量未赋值时的属性。
- **null**：代表无、空或值未知的特殊值。
- **Boolean**：仅包含两个值，`true` 和 `false`。
- **Number**：代表整数和浮点数，是一种基于 IEEE 754 标准的双精度 64 位二进制格式的值。
- **BigInt**：表示任意大小的整数。通过将 `n` 附加到整数末尾或调用 `BigInt()` 函数来创建。
- **String**：表示文本值的字符序列。内部将其编码为 `UTF-16` 的整数值序列，字符串的长度是其中的 `UTF-16` 代码单元的数量，这可能与 Unicode 字符的实际数量不符。
- **Symbol**：用于创建对象的唯一标识符。
- **Object**：用于储存数据集合和更复杂的实体。是一个特殊的类型，其他所有的数据类型都被称为原始类型，因为它们的值只包含一个单独的内容。

### 严格模式

ES5 规范增加了新的语言特性并且修改了一些已经存在的特性。

为了保证旧的功能能够使用，大部分修改是默认不生效的。

需要一个特殊的指令 `use strict` 来明确地激活这些特性。

**启用方式**：

- **脚本**

  为脚本开启严格模式。
  
  ```javascript
  "use strict";
  var v = "Hi!  I'm a strict mode script!";
  ```

- **函数**

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

**主要限制**：

- **八进制语法**

  严格模式禁止八进制数字语法。
  
  ECMAScript 并不包含八进制语法，但所有的浏览器都支持这种以零开头的八进制语法：`0644 === 420`。
  
  在 ECMAScript 6 中支持为一个数字加 `0o` 的前缀来表示八进制数。
  
  ```javascript
  "use strict";
  console.log(0644 === 420);
  ```

- **声明全局变量**

  非严格模式下，如果在函数内部使用未声明的变量，JavaScript 会自动将其创建为全局变量。
  
  在严格模式下，这种行为是被禁止的。
  
  ```javascript
  "use strict";
  function myFunction() {
    x = 10;
  }
  
  myFunction();
  console.log(x);
  ```

## 二、核心语法

### 字面量

- **String**

  [字符串字面量](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Lexical_grammar#%E5%AD%97%E7%AC%A6%E4%B8%B2%E5%AD%97%E9%9D%A2%E9%87%8F)是由双引号或单引号括起来的零个或多个字符，支持使用[转义字符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Grammar_and_types#%E5%9C%A8%E5%AD%97%E7%AC%A6%E4%B8%B2%E4%B8%AD%E4%BD%BF%E7%94%A8%E7%9A%84%E7%89%B9%E6%AE%8A%E5%AD%97%E7%AC%A6)表示特殊字符。
  
  ```javascript
  // 基础字符串
  "A string primitive";
  'Also a string primitive';
  
  // 转义字符序列
  console.log("换行符：第一行\n第二行");
  console.log('路径：C:\\Users\\Name');
  
  // 十六进制转义序列
  console.log("\x43");
  
  // Unicode
  console.log("Unicode 字符：\u00A9");
  
  // 两个码元 Unicode
  console.log("\uD87E\uDC04");
  console.log("\u{2F804}");
  ```

### 表达式与运算符

#### 模板字符串

在 ES2015 中，提供了一种[模板字面量](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Template_literals)，模板字符串提供了一些语法糖来构造字符串。

这与 Perl、Python 还有其他语言中的字符串插值的特性非常相似。

```javascript
var name = "Bob";
var time = "today";
`Hello ${name}, how are you ${time}?`
```

#### 展开运算符

[展开语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)可以在函数调用或数组构造时，将数组表达式或 `string` 在语法层面展开。

```javascript
const obj1 = { name: 'Alice', age: 25 };
const obj2 = { job: 'Developer', age: 26 }; // 后者覆盖前者
const merged = { ...obj1, ...obj2 };
console.log(merged); // {name: 'Alice', age: 26, job: 'Developer'}
```

#### 解构赋值

[解构赋值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)是 JavaScript 中一种快速提取数组或对象中的值，并赋值给变量的语法。

- **数组解构**

  ```javascript
  const colors = ['red', 'green', 'blue'];
  ```

  - **基础解构**

    ```javascript
    const [first, second] = colors;
    console.log(first);  // 'red'
    console.log(second); // 'green'
    ```

  - **跳过某些值**

    ```javascript
    const [,, third] = colors;
    console.log(third);  // 'blue'
    ```

  - **结合默认值**

    ```javascript
    const [a = '默认值', b] = [null, 100];
    console.log(a);  // null（默认值仅在 undefined 时生效）
    console.log(b);  // 100
    ```

- **对象解构**

  ```javascript
  const user = { 
    name: 'Alice', 
    age: 30,
    address: { city: 'Shanghai' }
  };
  ```

  - **基础解构**

    ```javascript
    const { name, age } = user;
    console.log(name); // 'Alice'
    ```

  - **重命名变量 + 默认值**

    ```javascript
    const { age: userAge = 18, job = 'Engineer' } = user;
    console.log(userAge); // 30（已存在则不使用默认值）
    console.log(job);     // 'Engineer'（默认值）
    ```

  - **嵌套解构**

    ```javascript
    const { address: { city } } = user;
    console.log(city); // 'Shanghai'
    ```

### 对象系统

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

对象属性也可以是一个函数、`getter` 或 `setter` 方法。

```javascript
const o = {
  property() {
    return '我的世界'
  },
};

const obj = {
  log: ['a', 'b', 'c'],
  get latest() {
    return this.log;
  },
};

const language = {
  log: [],
  set current(name) {
    this.log.push(name);
  },
};
```

[展开语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)可以在构造字面量对象时，将对象表达式按 *key-value* 的方式展开。

```javascript
const item = { id: "123", name: "zh" };
const new_item = { ...item, value: item.id, label: item.name };
```

#### 属性描述符

属性描述符有两种主要类型：
- 数据描述符
- 访问器描述符

#### 原型继承机制

JavaScript 的原型继承机制是其实现对象间共享属性和方法的核心机制。

它是基于原型链的动态继承模型，与传统的类继承有本质区别。

- **构造函数（Constructor）**
  - 通过 `new` 关键字创建实例的函数
  - 拥有一个显式的 `prototype` 属性（函数独有）
  - 实例的隐式原型 `[[Prototype]]` 默认指向构造函数的 `prototype` 属性对象
  
- **原型（Prototype）**
  - 每个对象都有一个原型（`[[Prototype]]`），用于实现继承
  - 可通过 `Object.getPrototypeOf(obj)` 或 `obj.__proto__` 访问
  - `[[Prototype]]` 指向其原型对象，即该对象的构造函数的 `prototype`。
  
- **原型对象（Prototype Object）**
  - 构造函数的 `prototype` 属性，它是一个预先存在的对象。
  - 包含可被所有实例共享的属性和方法
  - 当定义一个函数时，会自动为该函数创建一个 `prototype` 属性。
  - 本质是普通对象，其自身可通过 `[[Prototype]]` 指向更高层原型（如 `Object.prototype`）
  
- **原型链（Prototype Chain）**
  - 隐式原型引用：每个对象拥有 `[[Prototype]]` 内部属性
  - 链式查找机制：访问对象属性时，若自身不存在，则递归沿 `[[Prototype]]` 链向上查找，直至 `null`
  - 实现继承和多层级属性共享的核心机制
  
- **\_\_proto__**
  - 非标准历史实现，后通过 `Object.prototype.__proto__` 被标准化
  - 提供对 `[[Prototype]]` 的读写访问（建议优先使用 `Object.getPrototypeOf()` 和 `Object.setPrototypeOf()`）

**原型关系**：

```javascript
// 构造函数、原型对象、实例的关系
function Constructor() {} 
const instance = new Constructor();

// 原型指向关系
instance.__proto__ === Constructor.prototype;              // true
Object.getPrototypeOf(instance) === Constructor.prototype; // true

// 原型链终点
Object.getPrototypeOf(Object.prototype) === null;          // true
```

以一个现有对象作为原型，创建一个新对象（`Object.create`）。

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Object.create(Person.prototype).__proto__ === Person.prototype
Object.create(Person.prototype).__proto__ === new Person().__proto__
```

**基本原型链**：

```javascript
// 父类构造函数
function Animal(name) {
  this.name = name;
}

// 在原型上添加方法（所有实例共享）
Animal.prototype.speak = function() {
  console.log(`${this.name} makes a noise.`);
};

// 子类构造函数
function Dog(name, breed) {
  Animal.call(this, name); // 调用父类构造函数
  this.breed = breed;
}

// 继承父类原型（关键步骤）
Dog.prototype = Object.create(Animal.prototype); // 实现 Dog.prototype.__proto__ === Animal.prototype
Dog.prototype.constructor = Dog; // 修复构造函数指向

// 子类扩展方法
Dog.prototype.bark = function() {
  console.log(`${this.name} (${this.breed}) barks!`);
};

// 创建实例
const myDog = new Dog('Buddy', 'Golden Retriever');
myDog.speak();  // "Buddy makes a noise."（来自父类原型）
myDog.bark();   // "Buddy (Golden Retriever) barks!"（来自子类原型）
```

**原型链验证**：

```javascript
// 验证原型关系
console.log(myDog instanceof Dog);      // true
console.log(myDog instanceof Animal);   // true
console.log(myDog.__proto__ === Dog.prototype);          // true
console.log(Dog.prototype.__proto__ === Animal.prototype); // true
console.log(Animal.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__); // null（原型链终点）
```

#### 现代继承方式

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  bark() {
    console.log(`${this.name} (${this.breed}) barks!`);
  }
}

// 功能与之前的原型继承示例完全等价
const myDog = new Dog('Buddy', 'Golden Retriever');
```

#### 原型链验证

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

### 函数体系

[函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Functions)是 JavaScript 中的基本组件之一。

#### 函数声明

[函数声明](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Functions#%E5%87%BD%E6%95%B0%E5%A3%B0%E6%98%8E)定义一个具有指定参数的函数。

```javascript
function add(a, b) {
  console.log(a + b)
}
```

#### 函数表达式

函数也可以由[函数表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/function)创建，`function` 关键字用来在一个表达式中定义一个函数。

```javascript
var add = function (a, b) {
  console.log(a + b)
}
```

#### 箭头函数

[箭头函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Functions#%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0)表达式的语法比函数表达式更简洁，并且没有自己的 `this`，`arguments`，`super` 或 `new.target`。

箭头函数表达式更适用于那些本来需要匿名函数的地方，并且它不能用作构造函数。

```javascript
(param1, param2, ..., paramN) => { statements }

// 相当于：(param1, param2, ..., paramN) => { return expression; }
(param1, param2, ..., paramN) => expression

// 当只有一个参数时，圆括号是可选的
(singleParam) => { statements }
singleParam => { statements }

// 没有参数的函数应该写成一对圆括号
() => { statements }
```

## 三、面向对象

### 构造函数

构造函数是用于创建对象的模板。

**实例属性定义：**

```javascript
function Person(name) {
  this.name = name;
}
```

**原型方法挂载**：

```javascript
Person.prototype.sayHello = function() {
  console.log(`Hello, my name is ${this.name}.`);
};
```

**静态方法实现**：

```javascript
Person.createAnonymous = function() {
  return new Person('Anonymous'); // 通过 new 调用自身构造函数
};
```

### Class 语法糖

[类](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes)是用于创建对象的模板。

实际上，类是特殊的函数，是构造函数的一种更现代、更清晰的语法糖。

#### 类声明

定义类的一种方法是使用类声明。

要声明一个类，可以使用带有 `class` 关键字的类名。

```javascript
class Car {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```

#### 类表达式

类表达式是定义类的另一种方法。

类表达式可以命名或不命名。

```javascript
let Car = class {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
```

#### 原型方法

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

#### 静态方法

静态方法是直接在构造函数本身上定义的方法。

它们并不属于构造函数的实例，而是属于构造函数本身。

```javascript
class Point {
  static displayName = "Point";

  static distance(a, b) {
    return Math.max(a, b);
  }
}
```

