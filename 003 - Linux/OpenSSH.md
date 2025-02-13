# OpenSSH

[OpenSSH](https://www.openssh.com/manual.html) 是使用 SSH 协议进行远程登录的主要连接工具。

## 一、安装

### CentOS

```sh
yum install openssh-server
```

## 二、登录

### 口令登录

以用户名 `user`，登录远程主机 `host`。

```sh
ssh -p 22 user@host
```

口令登录的过程如下。

```
1、远程主机收到用户的登录请求，把自己的公钥发给用户。
2、用户使用这个公钥，将登录密码加密后，发送给远程主机。
3、远程主机用自己的私钥，解密登录密码，如果密码正确，就同意用户登录。
```

口令登录有中间人攻击风险，可以手动校验公钥指纹。如 [GitHub](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/githubs-ssh-key-fingerprints)。

### 公钥登录

公钥登录的过程如下。

```
1、用户将自己的公钥储存在远程主机上。
2、登录的时候，远程主机会向用户发送一段随机字符串，用户用自己的私钥加密后，再发回来。
3、远程主机用事先储存的公钥进行解密，如果成功，就证明用户是可信的，直接允许登录，不再要求密码。
```

如果没有现成的公钥，可以直接用 [`ssh-keygen`](https://man.openbsd.org/ssh-keygen) 生成一个。

```sh
ssh-keygen -t rsa -C "comment"
```

将公钥传送到远程主机 `host` 上面，保存在登录后的用户主目录的 `~/.ssh/authorized_keys` 文件中。

```sh
ssh-copy-id -p 22 user@host
```

该命令等效于。

```sh
ssh -p 22 user@host 'mkdir -p .ssh && cat >> .ssh/authorized_keys' < ~/.ssh/id_rsa.pub
```

从 `known_hosts` 文件中删除属于指定主机名的所有公钥。

```sh
ssh-keygen -R host
```

## 三、配置

### 客户端配置

[ssh](https://man.openbsd.org/ssh.1) 按以下顺序获取配置数据。

- 命令行选项。
- 用户配置文件 `~/.ssh/config`。
- 系统配置文件 `/etc/ssh/ssh_config`。

配置选项及其含义如下：

- **StrictHostKeyChecking**：严格的主机密钥检查，此选项强制用户手动添加所有新主机到 `known_hosts`。
- **UserKnownHostsFile**：指定用于用户主机密钥数据库的文件。

可以通过 `-o` 选项动态指定配置。

```sh
ssh -p 22 -o StrictHostKeyChecking=no user@host
```

### 服务端配置

[sshd](https://man.openbsd.org/sshd.8) 从 `/etc/ssh/sshd_config` 读取配置数据。

配置选项及其含义如下：

- **PasswordAuthentication**：指定是否允许密码身份验证，默认值为 `yes`。
- **PermitRootLogin**：指定 `root` 是否可以使用 `ssh` 登录。
- **PubkeyAuthentication**：指定是否允许公钥身份验证，默认值为 `yes`。
- **AuthorizedKeysFile**：指定包含用于用户身份验证的公钥数据文件，默认值为 `.ssh/authorized_keys`。
- **GatewayPorts**：指定是否允许远程主机连接到通过 SSH 隧道打开的端口，默认值为 `no`。

Xshell 登录时，如果提示找不到匹配的 *host key* 算法，是因为 OpenSSH 弃用 *rsa* 导致的，可以配置 `sshd_config` 启用 *rsa*。

```
HostKeyAlgorithms +ssh-rsa
```

## 四、代理

### 正向代理

正向代理是客户端和目标服务器之间的中介，客户端向代理服务器发送请求，然后由代理服务器转发请求到目标服务器，并将目标服务器的响应返回给客户端。

例如，在代理服务器上启动一个 `3800` 端口，映射到 `119.29.29.29:80` 上，通过 `host` 服务器中转。

```sh
ssh -L 0.0.0.0:3800:119.29.29.29:80 user@host
```

### 反向代理

反向代理是在目标服务器和客户端之间的中介，客户端向反向代理服务器发送请求，然后由代理服务器选择一个目标服务器来处理请求，最后将目标服务器的响应返回给客户端。

在本地服务器上运行以下代码，将自己可以访问的 `119.29.29.29:80` 暴露给 `host` 的指定端口。

```sh
ssh -R 0.0.0.0:3800:119.29.29.29:80 user@host
```

### SOCKS

在本地端口启动一个 SOCKS 服务，数据通过 `host` 转发给目标服务器。

```sh
ssh -D 0.0.0.0:1080 user@host
```

### 优化参数

- -**C**：压缩数据。
- -**q**：安静模式。
- -**T**：禁止远程分配终端。
- -**n**：关闭标准输入。
- -**N**：不执行远程命令。
- -**f**：后台运行。

## 五、安全

### CVE-2024-6387

- [OpenSSH 爆高危漏洞 CVE-2024-6387 - V2EX](https://v2ex.com/t/1054091)
- [CVE-2024-6387](https://www.cve.org/CVERecord?id=CVE-2024-6387)
- [Debian](https://security-tracker.debian.org/tracker/CVE-2024-6387)
- [Aliyun](https://avd.aliyun.com/detail?id=AVD-2024-6387)

