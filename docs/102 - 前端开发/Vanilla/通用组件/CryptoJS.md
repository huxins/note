# CryptoJS

[CryptoJS](https://github.com/brix/crypto-js) 已停止维护，建议优先使用：

- Node.js [Crypto](https://nodejs.org/docs/v20.9.0/api/crypto.html) 模块
- [Web Crypto API](https://developer.mozilla.org/zh-CN/docs/Web/API/Crypto)

**安装**：

```sh
npm install crypto-js
```

## 一、核心对象

### WordArray

[`WordArray`](https://cryptojs.gitbook.io/docs#the-hashing-input) 是 CryptoJS 的基础数据类型，表示一个由 `32` 位 `word` 组成的数组，用于二进制数据存储。

**编码转换操作**：

| 编码类型   | 字符串 → WordArray               | WordArray → 字符串               |
| ---------- | -------------------------------- | -------------------------------- |
| **UTF8**   | `CryptoJS.enc.Utf8.parse(str)`   | `.toString(CryptoJS.enc.Utf8)`   |
| **Hex**    | `CryptoJS.enc.Hex.parse(hex)`    | `.toString(CryptoJS.enc.Hex)`    |
| **Base64** | `CryptoJS.enc.Base64.parse(b64)` | `.toString(CryptoJS.enc.Base64)` |

*注：所有转换方法均有两种等效写法，如：*

`CryptoJS.enc.Hex.stringify(arr)` ≡ `arr.toString(CryptoJS.enc.Hex)`

```javascript
import CryptoJS from "crypto-js";

const wordArray = CryptoJS.enc.Utf8.parse('我的世界');
var str = wordArray.toString(CryptoJS.enc.Utf8);
```

## 二、哈希计算

### MD5

[MD5](https://cryptojs.gitbook.io/docs#the-hashing-algorithms) 是一种广泛使用的哈希函数。

- **全量计算**

  - **浏览器环境**

    ```html
    <input type="file" id="fileInput">
    
    <script src="https://lib.baomitu.com/crypto-js/4.1.1/crypto-js.min.js"></script>
    <script>
      document.getElementById('fileInput').addEventListener('change', function (e) {
        const file = e.target.files[0];
        const reader = new FileReader();
    
        reader.onload = function () {
          // 将文件内容转换为WordArray
          const wordArray = CryptoJS.lib.WordArray.create(new Uint8Array(reader.result));
          // 计算MD5哈希
          const md5Hash = CryptoJS.MD5(wordArray).toString(CryptoJS.enc.Hex);
          console.log('文件MD5:', md5Hash);
        };
    
        reader.readAsArrayBuffer(file);
      });
    </script>
    ```

  - **Node.js 环境**

    ```javascript
    import CryptoJS from 'crypto-js';
    import fs from 'fs';
    
    function calculateFileMD5(filePath) {
      try {
        // 同步读取文件内容（返回Buffer）
        const buffer = fs.readFileSync(filePath);
    
        // 将Buffer转换为WordArray
        const wordArray = CryptoJS.lib.WordArray.create(buffer);
    
        // 计算MD5并返回十六进制字符串
        return CryptoJS.MD5(wordArray).toString(CryptoJS.enc.Hex);
      } catch (error) {
        console.error('读取文件失败:', error);
        return null;
      }
    }
    
    // 使用示例
    const md5 = calculateFileMD5('/path/to/your/file');
    console.log('文件MD5:', md5);
    ```

  - **Node 内置模块**

    ```javascript
    import crypto from 'crypto';
    import fs from 'fs';
    
    function md5FileSync(path) {
      return crypto
        .createHash('md5')
        .update(fs.readFileSync(path))
        .digest('hex');
    }
    
    // 使用示例
    const md5 = md5FileSync('/path/to/your/file');
    console.log('文件MD5:', md5);
    ```

- **流式分块计算**

  ```html
  <input type="file" id="fileInput">
  
  <script src="https://lib.baomitu.com/crypto-js/4.1.1/crypto-js.min.js"></script>
  <script>
    document.getElementById('fileInput').addEventListener('change', async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
  
      try {
        const md5 = await calculateFileMd5(file);
        console.log('文件MD5:', md5);
      } catch (err) {
        console.error('MD5计算失败:', err);
      }
    });
  
    async function calculateFileMd5(file) {
      const chunkSize = 1024 * 1024; // 1MB/块
      const hash = CryptoJS.algo.MD5.create();
      let offset = 0;
  
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
  
        const loadNextChunk = () => {
          const slice = file.slice(offset, offset + chunkSize);
          reader.readAsArrayBuffer(slice);
        };
  
        reader.onload = (e) => {
          if (!e.target?.result) {
            reject(new Error('读取文件失败'));
            return;
          }
  
          try {
            const uint8Array = new Uint8Array(e.target.result);
            const chunk = CryptoJS.lib.WordArray.create(uint8Array);
  
            hash.update(chunk);
            offset += chunk.sigBytes;
  
            offset < file.size ? loadNextChunk() : resolve(hash.finalize().toString(CryptoJS.enc.Hex));
          } catch (err) {
            reject(err);
          }
        };
  
        reader.onerror = () => reject(new Error(`文件读取错误: ${reader.error?.message}`));
        loadNextChunk(); // 开始读取第一块
      });
    }
  </script>
  ```

