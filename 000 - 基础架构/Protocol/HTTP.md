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

用于 HTTP 协议交互的信息被称为 [HTTP 报文](https://tools.ietf.org/html/rfc2616#section-4)，是 HTTP 通信中的基本单位。

报文本身是由多行（用 CR+LF 作换行符）数据构成的字符串文本，通过 HTTP 通信传输时，序列化为八位组字节流。

请求端的 HTTP 报文叫做请求报文，响应端的叫做响应报文。

HTTP 报文大致可分为报文首部和报文主体两块。两者由最初出现的空行（CR+LF）来划分。通常，并不一定要有报文主体。

### 请求报文

请求报文是由请求方法、请求 URI、协议版本、可选的请求首部字段和内容实体构成的。

```http
GET /get HTTP/1.1
Host: httpbin.org
```

### 响应报文

响应报文基本上由协议版本、状态码、用以解释状态码的原因短语、可选的响应首部字段以及实体主体构成。

```http
HTTP/1.1 200 OK
Date: Thu, 19 May 2022 18:29:02 GMT
Content-Type: application/json
Content-Length: 18

{
  "code": "OK"
}
```

## 三、实体

[实体](https://tools.ietf.org/html/rfc2616#section-7)作为请求或响应的有效载荷数据（补充项）被传输，其内容由实体首部和实体主体组成。

[HTTP 报文](https://tools.ietf.org/html/rfc2616#section-4)的[主体](https://tools.ietf.org/html/rfc2616#section-4.3)用于传输请求或响应的[实体主体](https://tools.ietf.org/html/rfc2616#section-7.2)。

通常，[报文主体](https://tools.ietf.org/html/rfc2616#section-4.3)等于[实体主体](https://tools.ietf.org/html/rfc2616#section-7.2)。只有当传输中进行编码操作时，实体主体的内容发生变化，才导致它和报文主体产生差异。

### 内容编码

向待发送邮件内增加附件时，为了使邮件容量变小，我们会先用 ZIP 压缩文件之后再添加附件发送。HTTP 协议中有一种被称为[内容编码](https://tools.ietf.org/html/rfc2616#section-14.11)的功能也能进行类似的操作。

内容编码指明应用在实体内容上的编码格式，并保持实体信息原样压缩。内容编码后的实体由客户端接收并负责解码。

常用的[内容编码](https://tools.ietf.org/html/rfc2616#section-3.5)有以下几种：

- gzip
- compress
- deflate
- identity

### 传输编码

在 HTTP 通信过程中，请求的编码实体资源尚未全部传输完成之前，浏览器无法显示请求页面。

在传输大容量数据时，通过 [Transfer-Encoding](https://tools.ietf.org/html/rfc2616#section-14.41) 把数据分割成多块，能够让浏览器逐步显示页面。这种把实体主体分块的功能称为[分块传输编码](https://tools.ietf.org/html/rfc2616#section-3.6.1)（Chunked Transfer Coding）。

分块传输编码会将实体主体分成多个块，每一块都会用十六进制来标记块的大小，而实体主体的最后一块会使用 `0\r\n` 来标记。

```http
HTTP/1.1 200 OK
Transfer-Encoding: chunked

b
01234567890
5
12345
0

```

使用分块传输编码的实体主体会由接收的客户端负责解码，恢复到编码前的实体主体。

### 媒体类型

[`Content-Type`](https://tools.ietf.org/html/rfc2616#section-14.17) 头字段用于指示发送给接收者的实体主体的媒体类型，[媒体类型](https://tool.oschina.net/commons)告诉接收者如何解释和处理实体主体中的数据。

#### URL Encode

当以 `application/x-www-form-urlencoded` 格式发送请求时，数据会被编码为键值对的形式，并使用 `&` 连接多个键值对。

键和值会用 `=` 连接，并且特殊字符会被 URL Encode。

```http
POST /post HTTP/1.1
Host: httpbin.org
Content-Type: application/x-www-form-urlencoded
Content-Length: 23

key1=value1&key2=value2
```

#### Multipart

发送邮件时，我们可以在邮件里写入文字并添加多份附件。这是因为采用了 MIME（Multipurpose Internet Mail Extensions，多用途因特网邮件扩展）机制，它允许邮件处理文本、图片、视频等多个不同类型的数据。

相应地，HTTP 协议中也采纳了[多部分](https://tools.ietf.org/html/rfc2616#section-3.7.2)对象集合，发送的一份报文主体内可含有多类型实体。通常是在图片或文本文件等上传时使用。

多部分对象集合包含的对象如下：

- **multipart/form-data**：在 Web 表单文件上传时使用。
- **multipart/byteranges**：在状态码 206（Partial Content，部分内容）响应报文包含了多个范围的内容时使用。

例如，使用 `multipart/form-data` 发送多部份数据。

```http
POST /post HTTP/1.1
Host: httpbin.org
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="A"

one
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="B"

two
------WebKitFormBoundary7MA4YWxkTrZu0gW--
```

例如，使用 `multipart/byteranges` 响应多部份数据。

```http
HTTP/1.1 206 Partial Content
Date: Sat, 21 May 2022 10:12:29 GMT
Content-Type: multipart/byteranges; boundary=00000000000002794934
Content-Length: 223

--00000000000002794934
Content-Type: text/plain
Content-Range: bytes 0-10/398

689531cce9c
--00000000000002794934
Content-Type: text/plain
Content-Range: bytes 380-390/398

6_64-DVD-20
--00000000000002794934--
```

## 四、标头

在 HTTP 协议通信交互中使用到的首部字段，不限于 [RFC 2616](https://tools.ietf.org/html/rfc2616#section-14) 中定义的 47 种首部字段。还有 Cookie、Set-Cookie 和 Content-Disposition 等在其他 RFC 中定义的首部字段，它们的使用频率也很高。这些非正式的首部字段统一归纳在 [RFC 4229](https://tools.ietf.org/html/rfc4229) 中。

[RFC 2616](https://tools.ietf.org/html/rfc2616#section-4.2) 和 [RFC 7230](https://tools.ietf.org/html/rfc7230#section-3.2) 规定字段名称不区分大小写。[RFC 7540](https://tools.ietf.org/html/rfc7540#section-8.1.2) 也规定不区分大小写，但字段名称必须先转换为小写，才能使用在 HTTP/2 中编码。

HTTP 允许字段内容使用 [ISO-8859-1](https://tools.ietf.org/html/rfc7230#page-26) 字符集中的文本，并且仅通过使用 [RFC 2047](https://tools.ietf.org/html/rfc2047) 编码来支持其他字符集。在实践中，大多数 HTTP 头字段的值仅使用 ASCII 字符集。

Header Fields 大致分为 [General Header Fields](https://tools.ietf.org/html/rfc2616#section-4.5)、[Request Header Fields](https://tools.ietf.org/html/rfc2616#section-5.3)、[Response Header Fields](https://tools.ietf.org/html/rfc2616#section-6.2) 和 [Entity Header Fields](https://tools.ietf.org/html/rfc2616#section-7.1)。

标头也可以根据代理处理它们的方式进行分为 [End-to-end](https://tools.ietf.org/html/rfc2616#section-13.5.1) 和 [Hop-by-hop](https://tools.ietf.org/html/rfc2616#section-13.5.1)。

### 常规标头

[`Date`](https://tools.ietf.org/html/rfc2616#section-14.18) 通用 HTTP 标头包含了消息创建时的日期和时间，于 [RFC 2616](https://tools.ietf.org/html/rfc2616#section-3.3.1) 和 [RFC 7231](https://tools.ietf.org/html/rfc7231#section-7.1.1.1) 中定义。

### 浏览器预览

[`Content-Disposition`](https://tools.ietf.org/html/rfc2616#section-19.5.1) 响应标头指示响应内容是直接在浏览器中预览，还是以附件的形式下载并保存到本地。

```http
Content-Disposition: inline
Content-Disposition: attachment
Content-Disposition: attachment; filename="filename.jpg"
```

如果附件名为中文，则需要经过 URL 编码。

```http
Content-Disposition: attachment; filename*=UTF-8''%E6%96%87%E4%BB%B6.txt
```

### 内容校验

[`Content-MD5`](https://tools.ietf.org/html/rfc2616#section-14.15) 标头是用于验证消息内容完整性的一个字段，于 [RFC 1864](https://tools.ietf.org/html/rfc1864) 中定义。

`Content-MD5` 的值是请求体内容的 MD5 哈希值，是 128 位二进制数据，通常会以 Base64 编码的形式表示。

```http
Content-MD5: ti4QvKtVqIJAvZxDbP/c+Q==
```

## 五、安全

### 内容安全策略

内容安全策略（[CSP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)）是一个额外的安全层，用于检测并削弱某些特定类型的攻击，包括跨站脚本（XSS）和数据注入攻击等。

## Reference

- [HTTP 协议各版本特性 - *Jiandong*](https://mjd507.github.io/2018/01/20/HTTP-Versions/)
- [HTTP 协议入门 - *阮一峰的网络日志*](https://www.ruanyifeng.com/blog/2016/08/http.html)
- [duoani/HTTP-RFCs.zh-cn](https://github.com/duoani/HTTP-RFCs.zh-cn)
- [HTTP 教學 - *NotFalse*](https://notfalse.net/http-series)
- [HTTP APIs 设计/规范指南 - *linianhui*](https://linianhui.github.io/code-guide/http-api/)

