# HTTP

## 一、HTTP Headers

### 1.1. Content-Disposition

`Content-Disposition` Header 指示响应内容是直接在浏览器中预览，还是以附件的形式下载并保存到本地。

```
Content-Disposition: inline
Content-Disposition: attachment
Content-Disposition: attachment; filename="filename.jpg"
```

如果附件名为中文，则需要经过 URL 编码。

```
Content-Disposition: attachment; filename*=UTF-8''%E6%96%87%E4%BB%B6.txt
```

### 1.2. Content-MD5

RFC 1864 中定义的请求体内容的 128 位二进制 MD5 哈希值的 Base64 编码形式。

```
Content-MD5: ti4QvKtVqIJAvZxDbP/c+Q==
```

