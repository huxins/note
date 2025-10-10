# wget

[`wget`](https://www.gnu.org/software/wget/manual/html_node/index.html) 用于从网络上非交互式地下载文件。它支持 HTTP、HTTPS 和 FTP 等协议，能够递归下载整个网站，适合自动化任务和脚本中使用。

## 一、选项

- [-**4**, -**6**](https://www.gnu.org/software/wget/manual/html_node/Download-Options.html#index-IPv6)：强制连接到 IPv4 或 IPv6 地址。
- -**b**：后台下载。
- -**c**：断点续传。
- --**limit-rate**=*amount*：限速下载。
- --**server-response**：显示响应头部信息。

## 二、下载文件

下载单个文件。

```sh
wget http://example.com/file.txt
```

断点续传。

```sh
wget -c http://example.com/largefile.zip
```

限制下载速度。

```sh
wget --limit-rate=200k http://example.com/file.zip
```

通过代理下载。

```sh
wget -e use_proxy=yes -e http_proxy=proxyserver:port http://example.com
```

下载文件并重命名。

```sh
wget -4 -O CentOS-7.iso https://mirrors.upr.edu/centos/7/isos/x86_64/CentOS-7-x86_64-Minimal-2009.iso
```

跳过证书验证（用于 HTTPS）。

```sh
wget --no-check-certificate https://example.com/file.txt
```

