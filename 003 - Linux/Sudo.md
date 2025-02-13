# Sudo

[`sudo`](https://www.sudo.ws/docs/man/sudo.man/) 是一个允许用户以其他用户（通常是超级用户 `root`）的身份执行命令的工具。它是权限管理的关键工具之一，广泛用于系统管理任务。

## 一、功能

- 临时提升普通用户的权限以执行特权操作，而无需切换到 `root` 用户。
- 提供日志记录功能，可跟踪用户的权限使用情况。
- 支持精细化权限控制，通过配置文件限制用户能运行的命令。

## 二、选项

- [-**l**](https://www.sudo.ws/docs/man/sudo.man/#l)：列出当前用户可以通过 `sudo` 执行的命令。
- [-**v**](https://www.sudo.ws/docs/man/sudo.man/#v)：重新验证用户（刷新 `sudo` 的超时时间）。
- [-**k**](https://www.sudo.ws/docs/man/sudo.man/#k)：清除 `sudo` 的缓存（要求用户下次再次输入密码）。
- [-**u**](https://www.sudo.ws/docs/man/sudo.man/#u) *user*：以指定用户的身份运行命令（默认是 `root`）。

## 三、配置文件

`sudo` 有如下[配置文件](https://www.sudo.ws/docs/man/visudo.man/#FILES)：

- `/etc/sudo.conf`：Sudo 前端配置。
- `/etc/sudoers`：定义哪些用户可以执行哪些命令。
- `/etc/sudoers.tmp`：`visudo` 使用的默认临时文件。

`sudo` 的行为由 `/etc/sudoers` 文件控制，该文件定义了哪些用户可以执行哪些命令。

**编辑 `sudoers` 文件**：使用专用命令 `visudo` 编辑。

```sh
sudo visudo
```

**典型语法：**

```
用户名 主机名=(运行身份) 命令
```

示例：

```
root    ALL=(ALL:ALL) ALL
%sudo   ALL=(ALL:ALL) ALL
alice   ALL=(ALL) ALL
```

**常见配置示例：**

例如，只允许运行某些命令。

```
alice   ALL=(ALL) /bin/ls, /usr/bin/apt
```

例如，无需输入密码。

```
alice   ALL=(ALL) NOPASSWD: ALL
```

