# HAProxy

## 入门

### 安装

```sh
# CentOS 7
$ yum install haproxy
```

## 例子

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

