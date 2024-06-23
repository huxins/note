# Sysctl

[sysctl](https://man7.org/linux/man-pages/man8/sysctl.8.html) 用于在运行时修改内核参数。可使用的参数列在 */proc/sys/* 下。

## 一、配置场景

### 禁用 IPv6

```sh
sysctl -w net.ipv6.conf.all.disable_ipv6=1 >> /etc/sysctl.d/disable-ipv6.conf
sysctl -w net.ipv6.conf.default.disable_ipv6=1 >> /etc/sysctl.d/disable-ipv6.conf
sysctl -w net.ipv6.conf.lo.disable_ipv6=1 >> /etc/sysctl.d/disable-ipv6.conf
sysctl -w net.ipv6.conf.eth0.disable_ipv6=1 >> /etc/sysctl.d/disable-ipv6.conf
sysctl -p /etc/sysctl.d/disable-ipv6.conf
```

如果使用 `ip a` 命令，在输出中没有发现 IPv6 地址，则说明成功关闭了 IPv6 功能。

