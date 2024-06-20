# Nginx

## 一、安装

### CentOS

#### YUM

```sh
rpm -ivh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
yum info nginx
yum install nginx
```

## 二、基本模块

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

