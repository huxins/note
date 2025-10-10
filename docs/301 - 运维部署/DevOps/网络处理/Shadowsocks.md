# Shadowsocks

[Shadowsocks](https://shadowsocks.org/) 是一款开源的加密代理工具，主要用于在受限制的网络环境中安全地传输数据，帮助用户绕过网络审查或访问被封锁的资源。

## Shadowsocks-windows

[Shadowsocks for Windows](https://github.com/shadowsocks/shadowsocks-windows) 在 [4.4.0.0](https://github.com/shadowsocks/shadowsocks-windows/releases/tag/4.4.0.0) 版本中不再支持流密码（Stream cipher），最后支持版本为 [4.3.3.0](https://github.com/shadowsocks/shadowsocks-windows/releases/tag/4.3.3.0)。

**链接格式**：

在 Base64 编码之前，`ss` 链接的格式如下：

```
ss://method:password@server:port/#remarks_urlencode
```

再对 `method:password` 进行 Base64 编码，即为 `ss` 链接。

**链接示例**：

```
ss://cmM0LW1kNToxMjM0NTY@example.com:10000/#%E9%9F%A9%E5%9B%BD%E5%95%86%E5%AE%BD
```

## ShadowsocksR

**链接格式**：

在 Base64 编码之前，`ssr` 链接的格式如下：

```
ssr://server:port:protocol:method:obfs:password_base64/?params_base64
```

`params_base64` 是协议参数、混淆参数、备注及 Group 对应的参数值被 Base64 编码后拼接而成的字符串。

```
obfsparam=obfsparam_base64&protoparam=protoparam_base64&remarks=remarks_base64&group=group_base64
```

**字段示例**：

```
ssr://example.com:10000:origin:rc4-md5:http_simple:MTIzNDU2/?obfsparam=ZG93bmxvYWQud2luZG93c3VwZGF0ZS5jb20&protoparam=&remarks=5pel5pys6Jma5ouf5LiT55So572R&group=5LqR
```

再对链接进行 Base64 编码，即为 `ssr` 链接。

```
ssr://ZXhhbXBsZS5jb206MTAwMDA6b3JpZ2luOnJjNC1tZDU6aHR0cF9zaW1wbGU6TVRJek5EVTIvP29iZnNwYXJhbT1aRzkzYm14dllXUXVkMmx1Wkc5M2MzVndaR0YwWlM1amIyMCZwcm90b3BhcmFtPSZyZW1hcmtzPTVwZWw1cHlzNkptYTVvdWY1TGlUNTVTbzU3MlImZ3JvdXA9NUxxUg
```

解码时，如果字符串包含 `-` 和 `_`，应先分别替换为 `+` 和 `/`。

