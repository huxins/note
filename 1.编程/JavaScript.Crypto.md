# Crypto

## 一、CryptoJS

CryptoJS 的积极开发已经停止。[NodeJS](https://nodejs.org/docs/v20.9.0/api/crypto.html) 和[现代浏览器](https://developer.mozilla.org/zh-CN/docs/Web/API/Crypto)都有一个原生的 `Crypto` 模块。

```sh
$ npm install crypto-js
```

### 1.1. MD5

计算文件 MD5。

```javascript
import MD5 from 'crypto-js/md5';
import CryptoJS from 'crypto-js';

const arrayBuffer = await file.arrayBuffer();
const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
const md5 = MD5(wordArray).toString(CryptoJS.enc.Hex);
```

### 1.2. WordArray

Utf8 字符串转 WordArray。

```javascript
var wordArray = CryptoJS.enc.Utf8.parse('Hello');
```

WordArray 转 Utf8 字符串。

```javascript
var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
var utf8String = wordArray.toString(CryptoJS.enc.Utf8);
```

16 进制字符串转 WordArray 对象。

```javascript
var wordArray = CryptoJS.enc.Hex.parse('48656c6c6f');
```

WordArray 对象转 16 进制字符串。

```javascript
var hexString = CryptoJS.enc.Hex.stringify(wordArray);
var hexString = wordArray.toString(CryptoJS.enc.Hex);
```

Base64 字符串转 WordArray 对象。

```javascript
var wordArray = CryptoJS.enc.Base64.parse('SGVsbG8=');
```

WordArray 对象转 Base64 字符串。

```javascript
var base64String = CryptoJS.enc.Base64.stringify(wordArray);
var base64String = wordArray.toString(CryptoJS.enc.Base64);
```

