# procps

[`procps`](https://gitlab.com/procps-ng/procps) 包含了一组用于监控和管理系统进程的命令行工具。这些工具主要从 Linux 内核的 `/proc` 文件系统中获取信息，帮助用户查看和管理系统的运行状态和资源使用情况。

## 一、进程

### ps

[`ps`](https://man7.org/linux/man-pages/man1/ps.1.html) 用于显示当前系统中运行的进程信息。

`ps` 显示的是执行该命令时的进程状态的静态快照，如果需要实时查看进程信息，通常会使用 `top` 或 `htop`。

- -**e**：显示所有进程。
- -**f**：显示完整格式的列表。
- -**a**：显示与终端相关的所有进程，但不包括会话领导进程（session leaders）和不与终端关联的进程。
- -**u**  *userlist*：按用户 ID 或名称选择。
- **a**：显示所有用户的进程。
- **u**：显示详细信息。
- **x**：显示不与终端关联的进程。

例如，显示所有进程信息。

```sh
ps -ef
ps aux
```

### kill

[`kill`](https://man7.org/linux/man-pages/man1/kill.1.html) 用于发送信号给进程。它可以用来终止、暂停、恢复或向进程发送其他信号。

- -**n**：`n` 大于 `1`。信号名称对应的数字。

```
kill [信号] [进程号]
```

- **默认信号**：如果不指定信号类型，`kill` 默认发送 `SIGTERM` 信号（信号编号 15），这是一个请求进程正常终止的信号。
- **指定信号**：可以通过信号名称或信号编号指定信号。

```sh
kill -9 1234       # 发送 SIGKILL 信号（编号 9），强制终止 PID 为 1234 的进程
kill -SIGSTOP 1234 # 发送 SIGSTOP 信号，暂停 PID 为 1234 的进程
```

除了 `kill`，还有一些相关的工具和命令可以用于管理进程和发送信号：

- **`pkill`**：通过进程名称发送信号，而不是使用 PID。

  ```sh
  pkill -9 nginx  # 强制终止所有名为 nginx 的进程
  ```

- **`killall`**：终止所有匹配指定名称的进程。

  ```sh
  killall -15 python  # 向所有 python 进程发送 SIGTERM 信号
  ```

## 二、内核

### sysctl

[`sysctl`](https://man7.org/linux/man-pages/man8/sysctl.8.html) 命令用于在运行时查看和修改内核参数。通过 `sysctl` 命令，系统管理员可以调整内核的行为，优化系统性能，或改变系统的某些特性。

`sysctl` 命令作用的参数来自于 Linux 内核的 `/proc/sys` 虚拟文件系统。这个文件系统暴露了许多内核参数，允许用户通过文件系统接口来读写这些参数。

- **查看参数**：可以使用 `sysctl -a` 来查看所有可用的内核参数及其当前值。
- **修改参数**：可以使用 `sysctl -w parameter=value` 来修改某个特定参数的值。
- **配置文件**：可以通过编辑 `/etc/sysctl.conf` 文件来永久更改参数设置，然后执行 `sysctl -p` 以应用更改。

查看所有参数及其值。

```sh
sysctl -a
```

修改某个参数，例如调整最大文件句柄数。

```sh
sysctl -w fs.file-max=100000
```

查看某个特定参数的值。

```sh
sysctl net.ipv4.ip_forward
```

- **禁用 IPv6**

  ```sh
  sysctl -w net.ipv6.conf.all.disable_ipv6=1 >> /etc/sysctl.d/disable-ipv6.conf
  sysctl -w net.ipv6.conf.default.disable_ipv6=1 >> /etc/sysctl.d/disable-ipv6.conf
  sysctl -w net.ipv6.conf.lo.disable_ipv6=1 >> /etc/sysctl.d/disable-ipv6.conf
  sysctl -w net.ipv6.conf.eth0.disable_ipv6=1 >> /etc/sysctl.d/disable-ipv6.conf
  sysctl -p /etc/sysctl.d/disable-ipv6.conf
  ```

  如果使用 `ip a` 命令，在输出中没有发现 IPv6 地址，则说明成功关闭了 IPv6 功能。

