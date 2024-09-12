# JavaScript 内置对象

JavaScript 中所有的[标准内置对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects)、以及它们的方法和属性。

## 一、基本对象

### Function

[`Function`](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-function-objects) 对象提供了用于处理函数的方法。在 JavaScript 中，每个函数实际上都是一个 `Function` 对象。

**原型方法**：

- Function.prototype.[**call**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)()

  使用一个指定的 `this` 值和单独给出的一个或多个参数来调用一个函数。
  
  ```javascript
  call(thisArg, arg1, arg2, /* ..., */ argN)
  ```
  
  示例如下。
  
  ```javascript
  function Product(name, price) {
    this.name = name;
    this.price = price;
  }
  
  function Food(name, price) {
    Product.call(this, name, price);
    this.category = 'food';
  }
  
  console.log(new Food('cheese', 5).name);
  ```

### Object

[`Object`](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object-objects) 是 JavaScript 的一种数据类型。它用于存储各种键值集合和更复杂的实体。

**静态方法**：

- Object.[**fromEntries**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)()

  将键值对列表转换为一个对象。
  
  ```javascript
  Object.fromEntries(iterable)
  ```
  
  例如，将 `Map` 转为 `Object`。
  
  ```javascript
  const entries = new Map([
    ['foo', 'bar'],
    ['baz', 42],
  ]);
  
  const obj = Object.fromEntries(entries);
  ```

- Object.[**defineProperty**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)()

  直接在一个对象上定义一个新属性，或修改其现有属性，并返回此对象。
  
  ```javascript
  Object.defineProperty(obj, prop, descriptor)
  ```
  
  例如，在对象上，添加一个不可枚举属性。
  
  ```javascript
  const obj = {car: 'mazda'}
  
  Object.defineProperty(obj, 'year', {
    value: 2020
  })
  ```
  
  例如，在对象上，添加一个属性，采用数据代理的方式。
  
  ```javascript
  const obj = { car: 'mazda' };
  var number = 18;
  
  Object.defineProperty(obj, 'year', {
    get() {
      return number;
    },
  });
  ```

## 二、字符串

### String

[`String`](https://tc39.es/ecma262/multipage/text-processing.html#sec-string-objects) 对象用于表示和操作字符序列。

**原型方法**：

- String.prototype.[**replace**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace)()

  返回一个新字符串，其中一个、多个或所有匹配的 `pattern` 被替换为 `replacement`。`pattern` 可以是字符串或 `RegExp`，`replacement` 可以是字符串或一个在每次匹配时调用的函数。如果 `pattern` 是字符串，则仅替换第一个匹配项。
  
  ```javascript
  replace(pattern, replacement)
  ```
  
  例如，替换单个字符串。
  
  ```javascript
  '你的唯一'.replace('你', '我');
  ```
  
  例如，Camel case 转 Snake case。
  
  ```javascript
  const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  ```

- String.prototype.[**slice**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/slice)()

  提取字符串的一部分，并将其作为新字符串返回，而不修改原始字符串。
  
  ```javascript
  slice(indexStart)
  slice(indexStart, indexEnd)
  ```

  `slice()` 方法提取直到但不包括 `indexEnd` 的文本。如果 `indexEnd` 被省略，则 `slice()` 提取到字符串的末尾。

  如果 `indexStart` 为负数，则索引从字符串末尾开始计数，即从 `str.length + indexStart` 开始。
  
- String.prototype.[**charAt**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/charAt)()

  返回一个指定索引处的单个 UTF-16 码元构成的新字符串。

  ```javascript
  const sentence = 'The quick brown fox jumps over the lazy dog.';
  
  const index = 4;
  
  console.log(`The character at index ${index} is ${sentence.charAt(index)}`);
  ```

- String.prototype.[**charCodeAt**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt)()

  返回给定索引处的 UTF-16 代码单元，其值介于 0 和 65535 之间。

  ```javascript
  const sentence = 'The quick brown fox jumps over the lazy dog.';
  
  const index = 4;
  
  console.log(
    `Character code ${sentence.charCodeAt(index)} is equal to ${sentence.charAt(
      index,
    )}`,
  );
  ```

- String.prototype.[**codePointAt**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt)()

  返回一个 Unicode 编码点值的非负整数。
  
  ```javascript
  const icons = '😄';
  
  console.log(icons.codePointAt(0));
  // Expected output: "128516"
  ```

## 三、索引集合

### Array

[`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array) 对象支持在单个变量名下存储多个元素，并具有执行常见数组操作的成员。

**原型方法**：

- Array.prototype.[**join**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/join)()

  将一个数组的所有元素连接成一个字符串并返回这个字符串，用逗号或指定的分隔符字符串分隔。
  
  ```javascript
  join()
  join(separator)
  ```

  例如，数组拼接成字符串。
  
  ```javascript
  $("input[name='checkList']:checked")
    .map(function() {
      return $(this).val();
    })
    .get()
    .join();
  ```

- Array.prototype.[**slice**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)()

  返回一个新的数组对象，这一对象是一个由 `[start, end)` 决定的原数组的浅拷贝。
  
  ```javascript
  slice()
  slice(start)
  slice(start, end)
  ```

  例如，使用原型方法调用。
  
  ```javascript
  const array = [1, 2, 3, 4, 5];
  const slice = Array.prototype.slice.call(array, 1, 3);
  ```

- Array.prototype.[**filter**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)()

  创建给定数组一部分的浅拷贝，其包含通过指定函数的测试的所有元素。
  
  ```javascript
  filter(callbackFn)
  filter(callbackFn, thisArg)
  ```
  
  示例如下。
  
  ```javascript
  const words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];
  const result = words.filter(word => word.length > 6);
  ```

**静态方法**：

- Array.[**from**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)()

  从可迭代或类数组对象，创建一个新的浅拷贝的数组实例。

### TypedArray

一个 [`TypedArray`](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-typedarray-objects) 对象描述了底层二进制数据缓冲区的类数组视图。没有称为 `TypedArray` 的全局属性，也没有直接可用的 `TypedArray` 构造函数。

#### Uint8Array

[`Uint8Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) 数组类型表示一个 8 位无符号整型数组，创建时内容被初始化为 0。创建完后，可以以对象的方式或使用数组下标索引的方式引用数组中的元素。

```javascript
const uint8 = new Uint8Array(5);
console.log(uint8); // 输出: Uint8Array(5) [ 0, 0, 0, 0, 0 ]

// Uint8Array 的值范围是 0 - 255
uint8[0] = 10;
uint8[1] = 20;
uint8[2] = 30;
uint8[3] = 255;
uint8[4] = 256; // 超出范围的值会被模 256 操作 (256 % 256 = 0)
console.log(uint8); // 输出: Uint8Array(5) [ 10, 20, 30, 255, 0 ]
```

例如，通过其他数组或值初始化 `Uint8Array`。

```javascript
const arr = [5, 10, 15, 20, 25];
const uint8FromArr = new Uint8Array(arr);
console.log(uint8FromArr); // 输出: Uint8Array(5) [ 5, 10, 15, 20, 25 ]
```

例如，`Uint8Array` 可以与 `ArrayBuffer` 一起使用，用于更灵活地操作二进制数据。

```javascript
const buffer = new ArrayBuffer(8);
const uint8FromBuffer = new Uint8Array(buffer);


uint8FromBuffer[0] = 100;
uint8FromBuffer[1] = 200;

console.log(uint8FromBuffer); // 输出: Uint8Array(8) [ 100, 200, 0, 0, 0, 0, 0, 0 ]

// 查看底层的 ArrayBuffer
console.log(uint8FromBuffer.buffer); // 输出: ArrayBuffer(8)
```

## 四、结构化数据

### ArrayBuffer

[`ArrayBuffer`](https://tc39.es/ecma262/multipage/structured-data.html#sec-arraybuffer-objects) 对象用来表示通用的、固定长度的原始二进制数据缓冲区。

它是一个字节数组，通常在其他语言中称为 `byte array`。不能直接操作 `ArrayBuffer` 中的内容；而是要通过 `TypedArray` 或 `DataView` 对象来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。

```javascript
let buffer = new ArrayBuffer(8);
let uint8View = new Uint8Array(buffer);

uint8View[0] = 255;  // 最大的 8 位无符号整数
uint8View[1] = 128;  // 中间值
uint8View[2] = 64;   // 较小的值

console.log('Uint8Array:', uint8View);
```

## 五、数字和日期

*用来表示数字、日期和执行数学计算。*

### Date

当没有提供参数时，新创建的 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象代表当前的日期和时间。

```javascript
new Date().toLocaleString();
```

**原型方法**：

- Date.prototype.[**toLocaleString**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString)()

  返回该日期对象的字符串，该字符串格式因不同语言而不同。
  
  ```javascript
  toLocaleString()
  toLocaleString(locales)
  toLocaleString(locales, options)
  ```
  
  示例如下。
  
  ```javascript
  const date = new Date();
  const str = date.toLocaleString("zh-CN", { timeZone: 'Asia/Shanghai' });
  ```

- Date.prototype.[**toLocaleDateString**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString)()

  返回指定日期对象日期部分的字符串，该字符串格式因不同语言而不同。
  
  ```javascript
  toLocaleDateString()
  toLocaleDateString(locales)
  toLocaleDateString(locales, options)
  ```
  
  示例如下。
  
  ```javascript
  const date = new Date()
  const str = date.toLocaleDateString("zh-CN", { timeZone: 'Asia/Shanghai' })
  ```

## 六、反射

### Proxy

[`Proxy`](https://tc39.es/ecma262/multipage/reflection.html#sec-proxy-objects) 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义。

```javascript
const p = new Proxy(target, handler)
```

例如，当对象中不存在属性名时，默认返回值为 `37`。

```javascript
const handler = {
  get: function (obj, prop) {
    return prop in obj ? obj[prop] : 37;
  },
};

const p = new Proxy({}, handler);
p.a = 1;
p.b = undefined;

console.log(p.a, p.b); // 1, undefined
console.log("c" in p, p.c); // false, 37
```

### Reflect

[`Reflect`](https://tc39.es/ecma262/multipage/reflection.html#sec-reflect-object) 是一个内置的对象，它提供拦截 JavaScript 操作的方法。

**静态方法**：

- Reflect.[**get**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/get)()

  此方法与从对象中读取属性类似，但它是通过一个函数执行来操作的。

  ```javascript
  Reflect.get(target, propertyKey[, receiver])
  ```

  示例如下。

  ```javascript
  var obj = { x: 1, y: 2 };
  Reflect.get(obj, "x"); // 1
  ```

