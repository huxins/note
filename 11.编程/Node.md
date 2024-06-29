# Node



## 二、Crypto

### 2.1. Hash

计算文件的 MD5。

```javascript
import { createReadStream } from 'fs';
import { createHash } from 'crypto';

function calculateFileMd5(filePath) {
  return new Promise((resolve, reject) => {
    const stream = createReadStream(filePath);
    const hash = createHash('md5');

    stream.on('data', (data) => {
      hash.update(data);
    });

    stream.on('end', () => {
      const md5 = hash.digest('hex');
      resolve(md5);
    });

    stream.on('error', (error) => {
      reject(error);
    });
  });
}

const filePath = './file.txt';

calculateFileMd5(filePath)
  .then((md5) => {
    console.log('MD5 using Node.js crypto module:', md5);
  })
  .catch((error) => {
    console.error('Error calculating MD5:', error);
  });
```

