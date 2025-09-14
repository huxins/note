# Nginx

[Nginx](https://nginx.org/) 是一个高性能的 HTTP 和反向代理服务器，广泛用于 Web 服务器、负载均衡、反向代理和 HTTP 缓存等多种场景。

## 一、安装

- **CentOS**

  ```sh
  rpm -ivh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
  yum info nginx
  yum install nginx
  ```

## 二、模块

### ngx_http_core_module

**嵌入式变量：**

- $[**http**](https://nginx.org/en/docs/http/ngx_http_core_module.html#var_http_)\_*name*：任意请求头字段；变量名的最后一部分是转换为小写的字段名，用下划线替换短划线。例如，*$http_host* 代表 *host* 请求头。

### ngx_http_ssl_module

[`ngx_http_ssl_module`](https://nginx.org/en/docs/http/ngx_http_ssl_module.html) 模块为 HTTPS 提供了必要的支持。

此模块不是默认构建的，应使用 `--with-http_ssl_module` 配置参数启用。

- [**ssl_session_cache**](https://nginx.org/en/docs/http/ngx_http_ssl_module.html#ssl_session_cache)：设置存储会话参数的缓存的类型和大小。
- [**ssl_session_timeout**](https://nginx.org/en/docs/http/ngx_http_ssl_module.html#ssl_session_timeout)：指定客户端可以重用会话参数的时间。
- [**ssl_certificate**](https://nginx.org/en/docs/http/ngx_http_ssl_module.html#ssl_certificate)：为给定的虚拟服务器指定具有 PEM 格式证书的文件。
- [**ssl_ciphers**](https://nginx.org/en/docs/http/ngx_http_ssl_module.html#ssl_ciphers)：指定启用的密码。密码以 OpenSSL 库所理解的格式指定。

```nginx
http {
    ssl_session_cache   shared:SSL:10m;
    ssl_session_timeout 10m;

    server {
        listen              443 ssl;
        server_name         www.example.com;
        
        keepalive_timeout   70;
        ssl_certificate     www.example.com.crt;
        ssl_certificate_key www.example.com.key;
        
        ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers         HIGH:!aNULL:!MD5;
    }
}
```

### ngx_http_proxy_module

[`ngx_http_proxy_module`](https://nginx.org/en/docs/http/ngx_http_proxy_module.html) 模块允许将请求传递到另一台服务器。

- [**proxy_pass**](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass)：设置代理服务器的协议和地址。
- [**proxy_set_header**](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_set_header)：允许在传递给代理服务器的请求标头中重新定义或附加字段。

```nginx
location / {
    proxy_pass https://1.0.0.1;
    proxy_set_header Host $http_host;

    proxy_ssl_name $http_host;
    proxy_ssl_server_name on;

    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

如果 `proxy_pass` 指令是用 *URI* 指定的，那么当请求传递到服务器时，请求 *URI* 中与 `location` 匹配的部分将被 `proxy_pass` 指令中指定的 *URI* 替换。

```nginx
# http://www.wandouduoduo.com/wddd/index.html

# http://127.0.0.1:8080/index.html
location /wddd/ {
    proxy_pass http://127.0.0.1:8080/;
}

# http://127.0.0.1:8080/sun/index.html
location /wddd/ {
    proxy_pass http://127.0.0.1:8080/sun/;
}

# http://127.0.0.1:8080/sunindex.html
location /wddd/ {
    proxy_pass http://127.0.0.1:8080/sun;
}
```

如果指定 `proxy_pass` 时没有 *URI*，则在处理原始请求时，请求 *URI* 将以客户端发送的相同形式传递给服务器。

```nginx
# http://www.wandouduoduo.com/wddd/index.html

# http://127.0.0.1:8080/wddd/index.html
location /wddd/ {
    proxy_pass http://127.0.0.1:8080;
}
```

