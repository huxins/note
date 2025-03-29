# Web Crypto

[Web Crypto API](https://w3c.github.io/webcrypto/) 用于在 Web 应用中执行基础的密码学操作（如加密、解密、签名、密钥生成等）。它旨在为开发者提供安全、标准化的密码学功能，替代传统的不安全实现（如自行引入第三方加密库），同时确保操作在浏览器环境中安全可控。

- [**哈希**](https://developer.mozilla.org/zh-CN/docs/Web/API/SubtleCrypto/digest)：SHA-256、SHA-384 等
- **[加密](https://developer.mozilla.org/zh-CN/docs/Web/API/SubtleCrypto/encrypt)/[解密](https://developer.mozilla.org/zh-CN/docs/Web/API/SubtleCrypto/decrypt)**：AES-CBC、AES-GCM、RSA-OAEP 等
- [**数字签名**](https://developer.mozilla.org/zh-CN/docs/Web/API/SubtleCrypto/sign)：ECDSA、RSA-PSS 等
- [**密钥生成与管理**](https://developer.mozilla.org/zh-CN/docs/Web/API/SubtleCrypto/deriveKey)：HMAC、PBKDF2（密钥派生）等

## 一、Hash

- **计算 SHA-256 哈希**

  ```javascript
  // 将字符串转为 ArrayBuffer
  async function sha256(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  
  // 使用
  sha256("Hello World").then(console.log); // 输出 SHA-256 哈希值
  ```

- **直接计算小文件哈希**

  Web Crypto API 不支持流式哈希。
  
  ```html
  <input type="file" id="fileInput" />
  
  <script>
    document.getElementById('fileInput').addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
  
      // 读取文件内容为 ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
  
      // 计算哈希
      const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
      console.log('SHA-256:', hashHex);
    });
  </script>
  ```

## Reference

- [SHA-256 with Javascript and Web Crypto](https://gist.github.com/GaspardP/fffdd54f563f67be8944)

