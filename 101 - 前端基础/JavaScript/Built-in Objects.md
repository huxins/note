# JavaScript 内置对象

JavaScript 中所有的[标准内置对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects)、以及它们的方法和属性。

## 一、基础对象

### Object

[`Object`](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object-objects) 是存储键值对和复杂实体的基础数据类型。

**静态方法**：

- Object.[**fromEntries**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)(*iterable*)

  将键值对列表（如 `Map`）转换为对象。

  ```javascript
  const entries = new Map([['foo', 'bar'], ['baz', 42]]);
  const obj = Object.fromEntries(entries); // { foo: "bar", baz: 42 }
  ```

- Object.[**defineProperty**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)(*obj*, *prop*, *descriptor*)

  定义或修改对象属性（如不可枚举属性或数据代理）。
  
  ```javascript
  const obj = {car: 'mazda'}
  Object.defineProperty(obj, 'year', { value: 2020 }); // 不可枚举
  
  var number = 18;
  Object.defineProperty(obj, 'age', {  // 数据代理
    get() {
      return number;
    },
  });
  ```

### Function

所有函数均为 [`Function`](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-function-objects) 对象实例。

**原型方法**：

- Function.prototype.[**call**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)(*thisArg*, *...args*)

  指定 `this` 值和单独给出的一个或多个参数来调用函数。
  
  ```javascript
  function Product(name, price) {
    this.name = name;
    this.price = price;
  }
  
  function Food(name, price) {
    Product.call(this, name, price); // 继承属性
    this.category = 'food';
  }
  
  console.log(new Food('cheese', 5).name);
  ```

## 二、文本处理对象

### String

[`String`](https://tc39.es/ecma262/multipage/text-processing.html#sec-string-objects) 对象用于表示和操作字符序列。

**原型方法**：

- String.prototype.[**replace**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace)(*pattern*, *replacement*)

  替换匹配内容，支持字符串或正则表达式。

  - 返回一个新字符串

  - `pattern` 可以是字符串或 `RegExp`，`replacement` 可以是字符串或一个在每次匹配时调用的函数

  - 如果 `pattern` 是字符串，则仅替换第一个匹配项

  ```javascript
  '你的唯一'.replace('你', '我'); // "我的唯一"
  
  // Camel case 转 Snake case
  const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  ```

- String.prototype.[**slice**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/slice)(*indexStart*, *indexEnd*)

  提取子字符串（含头不含尾）。
  
  - 返回一个新字符串
  
  - 如果 `indexEnd` 被省略，则 `slice()` 提取到字符串的末尾
  
  - 如果 `indexStart` 为负数，则索引从字符串末尾开始计数，即从 `str.length + indexStart` 开始
  
  ```javascript
  'JavaScript'.slice(0, 4); // "Java"
  ```
  
- String.prototype.[**charAt**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/charAt)(*index*)

  提取指定索引处的单个 UTF-16 码元构成的新字符串。

  ```javascript
  const sentence = 'The quick brown fox jumps over the lazy dog.';
  const index = 4;
  console.log(`The character at index ${index} is ${sentence.charAt(index)}`);
  ```
  
- String.prototype.[**charCodeAt**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt)(*index*)

  返回给定索引处的 UTF-16 代码单元，其值介于 `0` 和 `65535` 之间。

  ```javascript
  const sentence = 'The quick brown fox jumps over the lazy dog.';
  const index = 4;
  console.log(
    `Character code ${sentence.charCodeAt(index)} is equal to ${sentence.charAt(index)}`,
  );
  ```
  
- String.prototype.[**codePointAt**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt)(*index*)

  返回一个 Unicode 编码点值的非负整数。
  
  ```javascript
  const icons = '😄';
  console.log(icons.codePointAt(0)); // Expected output: "128516"
  ```

## 三、索引集合对象

### Array

[`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array) 对象是存储有序元素的集合。

**静态方法**：

- Array.[**from**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)(*arrayLike*)

  从类数组或可迭代对象创建新数组（浅拷贝）。

**原型方法**：

- Array.prototype.[**join**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/join)(*separator*)

  将数组元素拼接为字符串，用逗号或指定的分隔符字符串分隔。

  ```javascript
  [1, 2, 3].join(' - '); // "1 - 2 - 3"
  
  $("input[name='checkList']:checked")
    .map(function() {
      return $(this).val();
    })
    .get()
    .join();
  ```

- Array.prototype.[**slice**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)(*start*, *end*)

  返回新的数组对象，由 `[start, end)` 决定的原数组的浅拷贝。
  
  ```javascript
  const array = [1, 2, 3, 4, 5];
  const slice = Array.prototype.slice.call(array, 1, 3);
  ```
  
- Array.prototype.[**filter**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)(*callbackFn*, *thisArg*)

  过滤满足条件的元素。
  
  ```javascript
  [1, 2, 3].filter(num => num > 1); // [2, 3]
  
  const words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];
  const result = words.filter(word => word.length > 6);
  ```
  
### TypedArray

[`TypedArray`](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-typedarray-objects) 对象描述了底层二进制数据缓冲区的类数组视图。没有称为 [`TypedArray`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) 的全局属性，也没有直接可用的 `TypedArray` 构造函数。

#### Uint8Array

[`Uint8Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) 数组类型表示一个 `8` 位无符号整数数组（值范围 0 - 255）。

**构造函数**：

使用 [`Uint8Array()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array/Uint8Array) 构造函数创建 [`Uint8Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) 对象。除非明确提供初始化数据，否则内容将初始化为 `0`。

```javascript
const uint8 = new Uint8Array(5);
console.log(uint8);                 // 输出: Uint8Array(5) [ 0, 0, 0, 0, 0 ]

uint8[0] = 10;
uint8[1] = 20;
uint8[2] = 30;
uint8[3] = 255;
uint8[4] = 256;                     // 超出范围的值会被模 256 操作 (256 % 256 = 0)
console.log(uint8);                 // 输出: Uint8Array(5) [ 10, 20, 30, 255, 0 ]
```

通过其他数组或值初始化 `Uint8Array`。

```javascript
const uint8 = new Uint8Array([255, 256]); 
console.log(uint8);                 // [255, 0]（256 溢出为 0）
```

[`Uint8Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) 可以与 [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 一起使用，用于更灵活地操作二进制数据。

```javascript
const buffer = new ArrayBuffer(8);
const uint8FromBuffer = new Uint8Array(buffer);

uint8FromBuffer[0] = 100;
uint8FromBuffer[1] = 200;

console.log(uint8FromBuffer);        // 输出: Uint8Array(8) [ 100, 200, 0, 0, 0, 0, 0, 0 ]

// 查看底层的 ArrayBuffer
console.log(uint8FromBuffer.buffer); // 输出: ArrayBuffer(8)
```

## 四、结构化数据对象

### ArrayBuffer

[`ArrayBuffer`](https://tc39.es/ecma262/multipage/structured-data.html#sec-arraybuffer-objects) 对象表示通用的、固定长度的原始二进制数据缓冲区。它是一个字节数组，通常在其他语言中称为 `byte array`。

不能直接操作 `ArrayBuffer` 中的内容，而是要通过 `TypedArray` 或 `DataView` 对象来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。

```javascript
const buffer = new ArrayBuffer(8);
const uint8View = new Uint8Array(buffer);
uint8View[0] = 255; // 操作二进制数据
```

## 五、数字与日期对象

*用来表示数字、日期和执行数学计算。*

### Date

[`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象表示日期和时间。

**构造函数**：

当没有提供参数时，新创建的 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象代表当前的日期和时间。

```javascript
new Date().toLocaleString();
```

**原型方法**：

- Date.prototype.[**toLocaleString**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString)(*locales*, *options*)

  本地化格式返回日期时间。

  ```javascript
  new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
  ```

- Date.prototype.[**toLocaleDateString**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString)(*locales*, *options*)

  仅返回日期部分。
  
  ```javascript
  new Date().toLocaleDateString("zh-CN", { timeZone: 'Asia/Shanghai' })
  ```

## 六、反射对象

### Proxy

[`Proxy`](https://tc39.es/ecma262/multipage/reflection.html#sec-proxy-objects) 对象用于创建对象代理以拦截操作。

**构造函数**：

使用 [`Proxy()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy) 构造函数创建 [`Proxy`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 对象。

```javascript
// 当对象中不存在对应属性名时，默认返回值为 37
const handler = { get: (obj, prop) => prop in obj ? obj[prop] : 37 };
const p = new Proxy({}, handler);
console.log(p.a); // 37（默认值）
```

### Reflect

[`Reflect`](https://tc39.es/ecma262/multipage/reflection.html#sec-reflect-object) 对象提供拦截 JavaScript 操作的方法。

**静态方法**：

- Reflect.[**get**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/get)(*target*, *propertyKey*[, *receiver*])

  获取对象属性值。

  ```javascript
  Reflect.get({ x: 1 }, 'x'); // 1
  ```

