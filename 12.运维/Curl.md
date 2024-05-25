# Curl

## 一、文件下载

- `-O`：将输出写入一个本地文件。

  ```sh
  $ curl -O https://postman-echo.com/get
  ```

- `-o` *file*：将输出写入到 *file*。

  ```sh
  $ curl -o echo.txt https://postman-echo.com/get
  ```

- `--limit-rate` *speed*：限制最大传输速率，用于下载和上传。

  ```sh
  $ curl -O --limit-rate 1024K https://ftp.yz.yamagata-u.ac.jp/pub/linux/centos/7/isos/x86_64/CentOS-7-x86_64-Minimal-2009.iso
  ```

## 二、请求方法

请求默认为 `GET` 方法。

```sh
$ curl https://postman-echo.com/get?data=xxx
```

- `-I`：HEAD 请求。

  ```sh
  $ curl -I https://postman-echo.com/get
  ```

- `-X` *method*：指定 HTTP 请求的方法。

  ```sh
  $ curl -X POST https://postman-echo.com/post
  ```

- `-d` *data*：在 POST 请求中将指定的数据发送到 HTTP 服务器。

  该请求会自动加上 header `content-type: application/x-www-form-urlencoded`。

  ```sh
  $ curl -d "data=xxx" https://postman-echo.com/post
  ```

## 三、网络调试

- `-v`：输出通信的整个过程，用于调试。

  ```sh
  $ curl -v https://postman-echo.com/get
  ```

- `-i`：在输出中包含 HTTP 响应头。

  ```sh
  $ curl -i https://postman-echo.com/get
  ```

## 四、Request header

- `-u` *user:password*：指定用于服务器身份验证的用户名和密码。

  ```sh
  $ curl -u magina:123456 https://postman-echo.com/get
  ```

- `-H` *header*：添加 HTTP 请求标头。

  ```sh
  $ curl -H 'Accept-Language: en-US' https://postman-echo.com/get
  ```

## 五、Response header

- `-L`：3XX 响应代码跳转。

  ```sh
  $ curl -I -L "https://httpbin.org/redirect-to?url=https%3A%2F%2Fwww.baidu.com%2F&status_code=302"
  ```

## 六、代理

- `--connect-to` *HOST1:PORT1:HOST2:PORT2*：对于 *HOST1:PORT1* 的请求，连接到 *HOST2:PORT2*。Added in version 7.49.0.

  用于在请求时将连接重定向到另一个主机和端口，主要用于代理和端口映射的场景。

  ```sh
  $ curl -v --connect-to v2ex.com:443:104.24.24.24:443 https://v2ex.com/cdn-cgi/trace
  ```

- `--resolve` *host:port:addr*：为特定主机和端口提供自定义地址。

  用于在请求时显式指定 IP 地址，可以模拟不同的主机名解析。

  ```sh
  $ curl -v --resolve v2ex.com:443:104.24.24.24 https://v2ex.com/cdn-cgi/trace
  ```

