# Dnsmasq

[Dnsmasq](https://thekelleys.org.uk/dnsmasq/doc.html) 是一个轻量级的 DNS 缓存服务器，同时也支持 DHCP、TFTP 和 PXE 相关功能。它特别适用于小型网络（如家庭、办公室或嵌入式设备）中提供高效的本地 DNS 解析和 IP 地址管理。

当接受到一个 DNS 请求时，`dnsmasq` 首先会查找 `/etc/hosts`，然后查找 `/etc/resolv.conf` 中定义的外部 DNS。

## 一、安装

- **RHEL**

  ```sh
  yum install dnsmasq
  ```

- **Debian**

  ```sh
  apt install dnsmasq
  systemctl status dnsmasq
  ```

## 二、配置文件

所有的配置都在一个文件中完成，默认是 `/etc/dnsmasq.conf`。

**基本配置示例**：

```ini
# 指定上游 DNS 服务器
server=8.8.8.8
server=1.1.1.1

# 启用本地 DNS 解析
address=/local.lan/192.168.1.1

# 启用 DHCP 服务
dhcp-range=192.168.1.100,192.168.1.200,12h
```

也可以通过命令行配置该文件。

```sh
cat -v /etc/dnsmasq.conf  | grep -Ev "^#|^$"

tee /etc/dnsmasq.conf <<-'EOF'
listen-address=127.0.0.1
resolv-file=/etc/resolv.conf
EOF
```

测试服务是否可用。

```sh
nslookup example.com 127.0.0.1
```

## 三、配置项

- -**p**, --**port**=*port*：指定 DNS 端口，默认为 `53`。设置为零将完全禁用 DNS 功能，仅保留 DHCP。

- --**domain-needed**：不向上游转发格式错误的域名。

- --**bogus-priv**：不向上游转发私有 IP 反向查找。

- --**resolv-file**：指定上游 DNS 服务器文件，默认是 `/etc/resolv.conf`。

- --**strict-order**：强制 `dnsmasq` 严格按照 `/etc/resolv.conf` 中出现的顺序对每个服务器尝试每个查询。

- --**no-resolv**：仅从命令行或 `dnsmasq` 配置文件获取上游服务器。

- --**no-poll**：不要轮询 `/etc/resolv.conf`。

- --**no-hosts**：不要读取 `/etc/hosts` 中的主机名。

- --**addn-hosts**：附加主机文件。

- --**server**：直接指定上游服务器的 IP 地址。

  ```ini
  server=/fooxample.com/192.168.0.1
  server=208.67.222.222
  server=208.67.222.222@eth1
  ```

  设置一个反向解析，所有 192.168.3.0/24 的地址都到 10.1.2.3 去解析：
  
  ```ini
  server=/3.168.192.in-addr.arpa/10.1.2.3
  ```

- --**local**：和 `--server` 作用相似，可以回答来自 `/etc/hosts` 或 DHCP 的查询，但不将该域上的查询转发到任何上游服务器。

- --**address**：指定要为给定域中的任何主机返回的 IP 地址。

  ```ini
  address=/mehxample.com/192.168.0.5
  ```

- --**ipset**：将一个或多个域的查询解析的 IP 地址放在指定的 Netfilter IP 集中。

  ```ini
  ipset=/yahoo.com/google.com/vpn,search
  ```

- --**interface**：仅在指定的接口上侦听。

- --**listen-address**：仅在指定的 IP 上侦听。

- --**no-dhcp-interface**：不在指定接口上提供 DHCP，但提供 DNS 服务。

- --**expand-hosts**：将自定义域添加到 `/etc/hosts`。

- --**domain**：指定 DHCP 服务器的 DNS 域。

- --**dhcp-range**：DHCP 分发 IP 的范围，以及每个 IP 的租约时间。

  ```ini
  dhcp-range=192.168.0.50,192.168.0.150,12h
  dhcp-range=192.168.0.50,192.168.0.150,255.255.255.0,12h
  ```

- --**cache-size**：设置 `dnsmasq` 的缓存大小。

## Reference

- [利用 Dnsmasq 部署 DNS 服务 - *奇妙的 Linux 世界*](https://www.hi-linux.com/posts/30947.html)
- [dnsmasq-china-list - *GitHub*](https://github.com/felixonmars/dnsmasq-china-list)
- [DHCP Parameters - *IANA*](https://www.iana.org/assignments/bootp-dhcp-parameters/bootp-dhcp-parameters.txt)

