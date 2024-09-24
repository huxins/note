# HTTP

[HTTP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP) 是一个用于传输的应用层协议。它是为 Web 浏览器与 Web 服务器之间的通信而设计的，但也可以用于其他目的。

## 一、规范

HTTP 协议于 20 世纪 90 年代初期被[规范](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Resources_and_specifications)化。得益于其扩展性，该规范至今又添加了大量的补充内容。这些增补规范文档散落在网络的不同位置。

**HTTP/1.1** 由以下规范定义：

- RFC 7230：[Message Syntax and Routing](https://tools.ietf.org/html/rfc7230)
- RFC 7231：[Semantics and Content](https://tools.ietf.org/html/rfc7231)
- RFC 7232：[Conditional Requests](https://tools.ietf.org/html/rfc7232)
- RFC 7233：[Range Requests](https://tools.ietf.org/html/rfc7233)
- RFC 7234：[Caching](https://tools.ietf.org/html/rfc7234)
- RFC 7235：[Authentication](https://tools.ietf.org/html/rfc7235)

这些 RFC 共同淘汰了之前定义 HTTP 的所有 RFC，包括 [RFC 1945](https://tools.ietf.org/html/rfc1945)、[RFC 2068](https://tools.ietf.org/html/rfc2068)、[RFC 2616](https://tools.ietf.org/html/rfc2616) 和 [RFC 2617](https://tools.ietf.org/html/rfc2617)。

## 二、报文



## Reference

- [HTTP 协议各版本特性 - *Jiandong*](https://mjd507.github.io/2018/01/20/HTTP-Versions/)
- [HTTP 协议入门 - *阮一峰的网络日志*](https://www.ruanyifeng.com/blog/2016/08/http.html)
- [duoani/HTTP-RFCs.zh-cn](https://github.com/duoani/HTTP-RFCs.zh-cn)











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

