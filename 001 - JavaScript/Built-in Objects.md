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

静态方法：

- Object.**fromEntries**(*iterable*)

  `Object.fromEntries()` 静态方法将键值对列表转换为一个对象。

  将 Map 转为 Object。
  
  ```js
  const entries = new Map([
    ['foo', 'bar'],
    ['baz', 42],
  ]);
  
  const obj = Object.fromEntries(entries);
  ```
  
- Object.**defineProperty**(*obj*, *prop*, *descriptor*)

  `Object.defineProperty()` 静态方法会直接在一个对象上定义一个新属性，或修改其现有属性，并返回此对象。

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

原型方法：

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

### 9.4. Array

#### 9.4.1. 原型方法

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

- Array.prototype.**slice**()

  `slice()` 方法返回一个新的数组对象，这一对象是一个由 `[start, end)` 决定的原数组的浅拷贝。

  ```javascript
  const arrayLike = [1, 2, 3, 4, 5];
  const slice = Array.prototype.slice.call(arrayLike, 1, 3);
  ```

- Array.prototype.**filter**()

  `filter()` 方法创建给定数组一部分的浅拷贝，其中包含通过指定函数测试的所有元素。

  ```javascript
  const words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];
  const result = words.filter(word => word.length > 6);
  ```

#### 9.4.2. 静态方法

- Array.**from**()

  `Array.from()` 静态方法从可迭代或类数组对象创建一个新的浅拷贝的数组实例。

### 9.5 ArrayBuffer

`ArrayBuffer` 对象用来表示通用的、固定长度的原始二进制数据缓冲区。

它是一个字节数组，通常在其他语言中称为 `byte array`。不能直接操作 ArrayBuffer 中的内容；而是要通过 TypedArray 或 DataView 对象来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。

### 9.6. Uint8Array

Uint8Array 数组类型表示一个 8 位无符号整型数组，创建时内容被初始化为 0。创建完后，可以以对象的方式或使用数组下标索引的方式引用数组中的元素。

### 9.7. Date

#### 9.7.1. 构造函数

```javascript
new Date()
```

#### 9.7.2. 原型方法

- Date.prototype.**toLocaleString**()

  `toLocaleString()` 方法返回该日期对象的字符串，该字符串格式因不同语言而不同。

  ```javascript
  const date = new Date()
  const str = date.toLocaleString("zh-CN", { timeZone: 'Asia/Shanghai' })
  ```

- Date.prototype.**toLocaleDateString**()

  `toLocaleDateString()` 方法返回指定日期对象日期部分的字符串，该字符串格式因不同语言而不同。

  ```javascript
  const date = new Date()
  const str = date.toLocaleDateString("zh-CN", { timeZone: 'Asia/Shanghai' })
  ```