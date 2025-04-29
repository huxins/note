# HAProxy

[HAProxy](https://www.haproxy.org/) 是高性能的开源负载均衡器和代理服务器，专注于优化 TCP/HTTP 应用流量分发，提升系统的高可用性和可扩展性。

## 一、安装

```sh
# CentOS 7
yum install haproxy
```

## 二、配置

在 Shell 中测试配置。

```sh
haproxy -f /etc/haproxy/haproxy.cfg -c
```

配置示例如下：

```
defaults
    log global
    mode tcp
    option tcplog
    option dontlognull
    option http-server-close
    retries 2
    option redispatch
    option abortonclose
    maxconn 3200
    timeout connect 5000
    timeout client  50000
    timeout server  50000
    timeout http-request 10s
    timeout queue 1m
    timeout http-keep-alive 10s
    timeout check 10s

listen ssr_cloud
    bind 0.0.0.0:1181
    mode tcp
    balance roundrobin
    server test.org:65521 test.org:65521 weight 5 check inter 1500 rise 1 fall 3
    server hk02.clashcloud.org:65521 hk02.clashcloud.org:65521 weight 5 check inter 1500 rise 1 fall 3  backup

listen  admin_status
    bind 0.0.0.0:1188
    mode http
    stats refresh 30s
    stats uri  /
    stats realm Haproxy
    stats auth admin:password
    stats hide-version
    stats admin if TRUE
```

## 三、Proxies

代理配置可以位于一组 `sections` 中：

- **defaults** *\<name>*
- **frontend** *\<name>*
- **backend** *\<name>*
- **listen** *\<name>*

`defaults` 部分为声明后的所有其他部分设置默认参数。`name` 是可选的，但鼓励使用它以提高可读性。

`frontend` 部分描述了一组接受客户端连接的侦听套接字。

`backend` 部分描述了代理将连接到的一组服务器，以转发传入连接。

`listen` 部分定义了一个完整的代理，其前端和后端部分组合在一个部分中。它通常只适用于 TCP 通信。

所有代理名称必须由大、小写字母、数字、`-`、`_`、`.` 和 `:` 组成。

## Reference

- [HAProxy Configuration Manual 1.5](https://cbonte.github.io/haproxy-dconv/1.5/configuration.html)

