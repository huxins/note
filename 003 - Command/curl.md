# curl

[curl](https://curl.se/docs/manpage.html) 是一个使用 URL 从服务器传输数据或向服务器传输数据的工具。

## 一、网络请求

### GET

`curl` 的请求默认为 `GET` 方法。

```sh
curl -v https://postman-echo.com/get?data=xxx
```

### HEAD

[`-I`](https://curl.se/docs/manpage.html#-I) 选项用于发送 HEAD 请求。

```sh
curl -Iv https://postman-echo.com/get?data=xxx
```

### POST

[`-X`](https://curl.se/docs/manpage.html#-X) 选项可以指定 HTTP 请求的方法。

```sh
curl -vX POST https://postman-echo.com/post
```

[`-d`](https://curl.se/docs/manpage.html#-d) 选项在 POST 请求中将指定的数据发送到 HTTP 服务器。此选项默认使用 `content-type: application/x-www-form-urlencoded` 将数据传递给服务器。

```sh
curl -vd "data=xxx" https://postman-echo.com/post
```

也可以指定 `content-type` 为 `application/json`。

```sh
curl -X POST -H "Content-Type: application/json" -d '{"key1": "value1", "key2": "value2"}' https://postman-echo.com/post
```

### Download

[`-O`](https://curl.se/docs/manpage.html#-O) 选项将输出写入一个本地文件。

```sh
curl -O https://postman-echo.com/get
```

[`-o`](https://curl.se/docs/manpage.html#-o) 选项将输出写入到 *file*。

```sh
curl -o echo.txt https://postman-echo.com/get
```

[`--limit-rate`](https://curl.se/docs/manpage.html#--limit-rate) 选项用于限制最大传输速率，用于下载和上传。

```sh
curl -O --limit-rate 1024K https://mirrors.upr.edu/debian/ls-lR.gz
```

### Header

[`-H`](https://curl.se/docs/manpage.html#-H) 选项用于添加 HTTP 请求标头。

```sh
curl -H 'Accept-Language: en-US' https://postman-echo.com/get
```

[`-u`](https://curl.se/docs/manpage.html#-u) 选项指定用于服务器身份验证的用户名和密码。

```sh
curl -u magina:123456 https://postman-echo.com/get
```

### Response

[`-L`](https://curl.se/docs/manpage.html#-L) 选项用于处理 3XX 响应代码跳转。

```sh
curl -IL "https://httpbin.org/redirect-to?url=https%3A%2F%2Fwww.baidu.com%2F&status_code=302"
```

## 二、网络调试

[`-v`](https://curl.se/docs/manpage.html#-v) 选项输出通信的整个过程，用于调试。

```sh
curl -v https://postman-echo.com/get
```

[`-i`](https://curl.se/docs/manpage.html#-i) 选项在输出中包含 HTTP 响应头。

```sh
curl -i https://postman-echo.com/get
```

## 三、网络代理

[`--connect-to`](https://curl.se/docs/manpage.html#--connect-to) 选项用于在请求时将连接重定向到另一个主机和端口，主要用于代理和端口映射的场景。在版本 7.49.0 中添加。

```sh
--connect-to HOST1:PORT1:HOST2:PORT2
```

例如，对于 *HOST1:PORT1* 的请求，连接到 *HOST2:PORT2*。

```sh
curl -v --connect-to v2ex.com:443:104.24.24.24:443 https://v2ex.com/cdn-cgi/trace
```

[`--resolve`](https://curl.se/docs/manpage.html#--resolve) 选项用于在请求时显式指定 IP 地址，可以模拟不同的主机名解析。

```sh
--resolve host:port:addr
```

例如，为特定主机和端口提供自定义地址。

```sh
curl -v --resolve v2ex.com:443:104.24.24.24 https://v2ex.com/cdn-cgi/trace
```

