# bsd-mailx

[`bsd-mailx`](https://packages.debian.org/bookworm/bsd-mailx) 是一个命令行邮件客户端工具，通常简称为 `mailx`。它允许用户通过命令行发送电子邮件，或者在某些情况下也可以用来查看和管理邮件。`bsd-mailx` 是 `mailx` 的一个具体实现，继承自 BSD 系统中的邮件工具。

- 在 Debian 12 上进行安装

  ```sh
  apt install bsd-mailx
  ```

## 一、SMTP

### msmtp

[`msmtp`](https://packages.debian.org/bookworm/msmtp) 是一个轻量级的 SMTP 客户端，主要用于发送电子邮件。它的设计目标是替代系统中的 `sendmail` 命令，以便通过远程 SMTP 服务器发送邮件，而不需要在本地运行完整的邮件传输代理（MTA），如 `sendmail` 或 `postfix`。这使得 `msmtp` 特别适合那些需要通过外部 SMTP 服务器发送邮件的场景，比如使用 Gmail SMTP 服务器发送邮件。

```sh
apt install msmtp
```

`msmtp` 和 `bsd-mailx` 可以协同工作，但它们的关系并不是直接的替代或依赖关系。通常情况下，`bsd-mailx` 用于提供邮件的用户界面（如发送命令），而 `msmtp` 则负责实际的邮件传输。可以将 `msmtp` 配置为 `bsd-mailx` 的邮件发送程序，从而通过 `bsd-mailx` 使用 `msmtp` 来发送邮件。

**配置 `msmtp`**，创建或编辑 `~/.msmtprc` 文件：

```
defaults
tls on
tls_trust_file /etc/ssl/certs/ca-certificates.crt
logfile ~/.msmtp.log

account default
host smtp.example.com
port 587
auth on
user your-email@example.com
password your-email-password
from your-email@example.com
```

配置 `bsd-mailx` 使用 `msmtp`，创建或编辑 `~/.mailrc` 文件，添加以下内容：

```sh
set sendmail="/usr/bin/msmtp"
```

## 二、发送邮件

发送简单的邮件。

```sh
echo "邮件正文内容" | mailx -s "邮件主题" recipient@example.com
echo "This is the body of the email." | mailx -s "Subject of the Email" recipient@example.com
```

使用 `-v` 参数，可以显示发送过程，使用 `-a` 可以发送附件。

