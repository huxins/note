# Dnsmasq

dnsmasq 是一个轻量级的 DHCP 和缓存 DNS 服务器。

当接受到一个 DNS 请求时，dnsmasq 首先会查找 */etc/hosts*，然后查找 */etc/resolv.conf* 中定义的外部 DNS。

## 安装

- RHEL

```sh
$ yum install dnsmasq
```

## 配置

所有的配置都在一个文件中完成，默认是 */etc/dnsmasq.conf*。默认情况下 *dnsmasq.conf* 中只开启了最后的 *include* 项，可以在 */etc/dnsmasq.d* 中创建任意名字的配置文件。

### 配置项

- **--port**=*port*

指定 DNS 端口，默认为 *53*。设置为零将完全禁用 DNS 功能，仅保留 DHCP。

- **--domain-needed**

不向上游转发格式错误的域名。

- **--bogus-priv**

不向上游转发私有 IP 反向查找。

- **--resolv-file**

指定上游 DNS 服务器文件，默认是 */etc/resolv.conf*。

- **--strict-order**

强制 dnsmasq 严格按照 */etc/resolv.conf* 中出现的顺序对每个服务器尝试每个查询。

- **--no-resolv**

仅从命令行或 dnsmasq 配置文件获取上游服务器。

- **--no-poll**

不要轮询 */etc/resolv.conf*。

- **--no-hosts**

不要读取 */etc/hosts* 中的主机名。

- **--addn-hosts**

附加主机文件。

- **--server**

直接指定上游服务器的 IP 地址。

```
server=/fooxample.com/192.168.0.1
server=208.67.222.222
server=208.67.222.222@eth1
```

设置一个反向解析，所有 192.168.3.0/24 的地址都到 10.1.2.3 去解析：

```
server=/3.168.192.in-addr.arpa/10.1.2.3
```

- **--local**

和 **--server** 作用相似，可以回答来自 */etc/hosts* 或 DHCP 的查询，但不将该域上的查询转发到任何上游服务器。

- **--address**

指定要为给定域中的任何主机返回的 IP 地址。

```
address=/mehxample.com/192.168.0.5
```

- **--ipset**

将一个或多个域的查询解析的 IP 地址放在指定的 Netfilter IP 集中。

```
ipset=/yahoo.com/google.com/vpn,search
```

- **--interface**

仅在指定的接口上侦听。

- **--listen-address**

仅在指定的 IP 上侦听。

- **--no-dhcp-interface**

不在指定接口上提供 DHCP，但提供 DNS 服务。

- **--expand-hosts**

将自定义域添加到 */etc/hosts*。

- **--domain**

指定 DHCP 服务器的 DNS 域。

- **--dhcp-range**

DHCP 分发 IP 的范围，以及每个 IP 的租约时间。

```
dhcp-range=192.168.0.50,192.168.0.150,12h
dhcp-range=192.168.0.50,192.168.0.150,255.255.255.0,12h
```

- **--cache-size**

设置 dnsmasq 的缓存大小。

## 参考文献

- [利用 Dnsmasq 部署 DNS 服务 - 奇妙的 Linux 世界](https://www.hi-linux.com/posts/30947.html)
- [dnsmasq-china-list - GitHub](https://github.com/felixonmars/dnsmasq-china-list)
- [DHCP Parameters - IANA](https://www.iana.org/assignments/bootp-dhcp-parameters/bootp-dhcp-parameters.txt)

## 参见

- [DNSMASQ](https://thekelleys.org.uk/dnsmasq/docs/dnsmasq-man.html)

