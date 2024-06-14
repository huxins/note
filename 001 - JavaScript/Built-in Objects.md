# 内置对象

## 一、基本对象

### Function

`Function` 对象提供了用于处理函数的方法。在 JavaScript 中，每个函数实际上都是一个 `Function` 对象。

#### 原型方法

##### Function.prototype.call()

`Function` 实例的 `call()` 方法使用一个指定的 `this` 值和单独给出的一个或多个参数来调用一个函数。

```js
call(thisArg, arg1, arg2, /* ..., */ argN)
```

示例如下。

```js
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

`Object` 是 JavaScript 的一种数据类型。它用于存储各种键值集合和更复杂的实体。

#### 静态方法

##### Object.fromEntries()

`Object.fromEntries()` 静态方法将键值对列表转换为一个对象。

```js
Object.fromEntries(iterable)
```

将 `Map` 转为 `Object`。

```js
const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42],
]);

const obj = Object.fromEntries(entries);
```

##### Object.defineProperty()

`Object.defineProperty()` 静态方法会直接在一个对象上定义一个新属性，或修改其现有属性，并返回此对象。

```js
Object.defineProperty(obj, prop, descriptor)
```

在对象上，添加一个不可枚举属性。

```js
const obj = {car: 'mazda'}

Object.defineProperty(obj, 'year', {
  value: 2020
})
```

在对象上，添加一个属性，采用数据代理的方式。

```js
const obj = { car: 'mazda' };
var number = 18;

Object.defineProperty(obj, 'year', {
  get() {
    return number;
  },
});
```

### String

#### 原型方法

##### String.prototype.replace()

`replace()` 方法返回一个新字符串，其中一个、多个或所有匹配的 `pattern` 被替换为 `replacement`。`pattern` 可以是字符串或 `RegExp`，`replacement` 可以是字符串或一个在每次匹配时调用的函数。如果 `pattern` 是字符串，则仅替换第一个匹配项。

```js
replace(pattern, replacement)
```

替换单个字符串。

```js
'你的唯一'.replace('你', '我');
```

Camel case 转 Snake case。

```js
const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
```

##### String.prototype.slice()

`slice()` 方法提取字符串的一部分，并将其作为新字符串返回，而不修改原始字符串。

```js
slice(indexStart)
slice(indexStart, indexEnd)
```

`slice()` 方法提取直到但不包括 `indexEnd` 的文本。如果 `indexEnd` 被省略，则 `slice()` 提取到字符串的末尾。

如果 `indexStart` 为负数，则索引从字符串末尾开始计数，即从 `str.length + indexStart` 开始。

## 二、集合

### Array

#### 原型方法

##### Array.prototype.join()

`join()` 方法将一个数组的所有元素连接成一个字符串并返回这个字符串，用逗号或指定的分隔符字符串分隔。

```js
join()
join(separator)
```

数组拼接成字符串。

```js
$("input[name='checkList']:checked")
  .map(function() {
    return $(this).val();
  })
  .get()
  .join();
```

##### Array.prototype.slice()

`slice()` 方法返回一个新的数组对象，这一对象是一个由 `[start, end)` 决定的原数组的浅拷贝。

```js
slice()
slice(start)
slice(start, end)
```

使用原型方法调用。

```js
const array = [1, 2, 3, 4, 5];
const slice = Array.prototype.slice.call(array, 1, 3);
```

##### Array.prototype.filter()

`filter()` 方法创建给定数组一部分的浅拷贝，其包含通过指定函数的测试的所有元素。

```js
filter(callbackFn)
filter(callbackFn, thisArg)
```

示例如下。

```js
const words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];
const result = words.filter(word => word.length > 6);
```

#### 静态方法

##### Array.from()

`Array.from()` 静态方法从可迭代或类数组对象，创建一个新的浅拷贝的数组实例。

### TypedArray

一个 `TypedArray` 对象描述了底层二进制数据缓冲区的类数组视图。没有称为 `TypedArray` 的全局属性，也没有直接可用的 `TypedArray` 构造函数。

#### Uint8Array

`Uint8Array` 数组类型表示一个 8 位无符号整型数组，创建时内容被初始化为 0。创建完后，可以以对象的方式或使用数组下标索引的方式引用数组中的元素。

## 三、结构化数据

### ArrayBuffer

`ArrayBuffer` 对象用来表示通用的、固定长度的原始二进制数据缓冲区。

它是一个字节数组，通常在其他语言中称为 `byte array`。不能直接操作 `ArrayBuffer` 中的内容；而是要通过 `TypedArray` 或 `DataView` 对象来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。

## 四、数字

### Date

#### 构造函数

当没有提供参数时，新创建的 `Date` 对象代表当前的日期和时间。

```javascript
new Date().toLocaleString();
```

#### 原型方法

##### Date.prototype.toLocaleString()

`toLocaleString()` 方法返回该日期对象的字符串，该字符串格式因不同语言而不同。

```js
toLocaleString()
toLocaleString(locales)
toLocaleString(locales, options)
```

示例如下。

```js
const date = new Date();
const str = date.toLocaleString("zh-CN", { timeZone: 'Asia/Shanghai' });
```

##### Date.prototype.toLocaleDateString()

`toLocaleDateString()` 方法返回指定日期对象日期部分的字符串，该字符串格式因不同语言而不同。

```js
toLocaleDateString()
toLocaleDateString(locales)
toLocaleDateString(locales, options)
```

示例如下。

```js
const date = new Date()
const str = date.toLocaleDateString("zh-CN", { timeZone: 'Asia/Shanghai' })
```


