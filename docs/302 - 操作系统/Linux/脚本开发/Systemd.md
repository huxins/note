# Systemd

[Systemd](https://systemd.io/) 是一种系统和服务管理器。它是用于引导系统、启动和管理服务、处理系统状态的核心组件之一。

Systemd 包含许多工具和功能，例如服务管理、日志记录、设备管理、用户会话管理等。它取代了传统的 SysV init 和 Upstart 系统，成为主流 Linux 发行版的默认初始化系统。

## 一、命令

Systemd 提供了一系列命令来管理服务、日志、设备等。

### 系统管理

[`systemctl`](https://www.freedesktop.org/software/systemd/man/latest/systemctl.html) 是 Systemd 的主命令，用于管理系统和服务。

- `systemctl reboot`：重启系统。
- `systemctl poweroff`：关闭系统，切断电源。
- `systemctl halt`：CPU 停止工作。
- `systemctl suspend`：暂停系统。
- `systemctl hibernate`：让系统进入冬眠状态。
- `systemctl hybrid-sleep`：让系统进入交互式休眠状态。
- `systemctl rescue`：启动进入救援状态。
- `systemctl isolate`：切换到特定的运行目标（例如，单用户模式、多用户模式）。

### 服务管理

- `systemctl daemon-reload`：重新加载配置文件。
- `systemctl list-units`：列出所有已加载的单元（服务、设备等）。
- `systemctl list-dependencies`：查看服务依赖。
- `systemctl start`：启动服务。
- `systemctl stop`：停止服务。
- `systemctl restart`：重启服务。
- `systemctl reload`：重新加载服务配置（不重启服务）。
- `systemctl enable`：设置服务开机自启。
- `systemctl disable`：禁用服务开机自启。
- `systemctl status`：查看服务状态。

例如，查看已加载的服务。

```sh
systemctl list-units --type=service | grep postgresql
```

例如，查看服务依赖。

```sh
systemctl list-dependencies graphical.target
```

例如，设置服务开机自启。

```sh
# Created symlink from /etc/systemd/system/multi-user.target.wants/sshd.service to /usr/lib/systemd/system/sshd.service.
systemctl enable sshd
```

### 运行目标

- `systemctl get-default`：查看当前系统的默认运行目标。
- `systemctl set-default`：设置默认运行目标。
- 常见运行目标：
  - `graphical.target`：图形界面模式。
  - `multi-user.target`：多用户模式（无图形界面）。
  - `rescue.target`：救援模式。
  - `emergency.target`：紧急模式。

### 日志管理

*Systemd* 统一管理所有 *Unit* 的启动日志，可以只用 [`journalctl`](https://www.freedesktop.org/software/systemd/man/latest/journalctl.html) 一个命令，查看所有日志。日志的配置文件是 `/etc/systemd/journald.conf`。

- -**x**：显示日志的详细信息，包括每行的字段。
- -**e**：从日志的最后一行开始显示。
- -**u** *UNIT*：显示指定 *UNIT* 匹配的日志。
- -**f**：实时查看日志。
- --**vacuum-size**=*100M*：删除最旧的日志文件，直到它们使用的磁盘空间低于指定的大小。接受 `K`、`M`、`G` 和 `T` 后缀。
- --**vacuum-time**=*7d*：删除早于指定时间跨度的日志文件。接受 `s`、`m`、`h`、`days`、`weeks`、`months` 和 `years` 后缀。
- --**rotate**：归档日志文件并重命名，然后创建新的日志文件。*Added in version 227.*

查看日志。

```sh
journalctl -xeu mysqld.service
```

清除日志。

```sh
journalctl --vacuum-size=100M --vacuum-time=7d
```

较低版本清除日志。

```sh
systemctl stop systemd-journald
echo "" > /run/log/journal/7fd8464130ec492c90c5cb07a51beedb/system.journal
systemctl start systemd-journald
```

### 启动耗时

`systemd-analyze` 命令用于查看启动耗时。

- `systemd-analyze`：查看启动耗时。
- `systemd-analyze blame`：查看每个服务的启动耗时。
- `systemd-analyze critical-chain`：显示瀑布状的启动过程流。

例如，显示瀑布状的启动过程流。

```sh
systemd-analyze critical-chain atd.service
```

### 主机信息

`hostnamectl` 命令用于查看当前主机的信息。

- `hostnamectl`：显示当前主机的信息。
- `hostnamectl set-hostname`：设置主机名。

例如，设置主机名。

```sh
hostnamectl set-hostname rhel7
```

### 区域语言

`localectl` 命令用于查看本地化设置。

- `localectl`：查看本地化设置。
- `localectl set-locale`：设置本地化区域。
- `localectl set-keymap`：设置本地化键盘布局。

设置本地化区域。

```sh
localectl set-locale LANG=en_GB.utf8
localectl set-locale LANG=en_US.utf8
localectl set-locale LANG=zh_CN.UTF8
```

设置本地化键盘布局。

```sh
localectl set-keymap en_GB
```

### 日期时间

`timedatectl` 命令用于控制系统时间和日期。

- `timedatectl`：查看当前时区设置。
- `timedatectl list-timezones`：显示所有可用的时区。
- `timedatectl set-timezone`：设置当前时区。

设置当前时区。

```sh
timedatectl set-timezone America/New_York
timedatectl set-timezone Asia/Shanghai
```

### 登录用户

`loginctl` 命令用于查看当前登录的用户。

- `loginctl list-sessions`：列出当前 *session*。
- `loginctl list-users`：列出当前登录用户。
- `loginctl show-user`：显示指定用户的信息。

显示指定用户的信息。

```sh
loginctl show-user root
```

## 二、Unit

Systemd 可以管理所有系统资源，不同的资源统称为 [Unit](https://www.freedesktop.org/software/systemd/man/latest/systemd.unit.html)。

- **Service**：系统服务。
- **Target**：多个 Unit 构成的一个组。
- **Device**：硬件设备。
- **Mount**：文件系统的挂载点。
- **Automount**：自动挂载点。
- **Path**：文件或路径。
- **Scope**：不是由 Systemd 启动的外部进程。
- **Slice**：进程组。
- **Snapshot**：Systemd 快照，可以切回某个快照。
- **Socket**：进程间通信的 *socket*。
- **Swap**：*swap* 文件。
- **Timer**：定时器。

### 状态

`systemctl status` 命令用于查看系统状态和单个 Unit 的状态。

```sh
systemctl status                    # 显示系统状态
systemctl status mysqld.service     # 显示单个 Unit 的状态
```

除了 `status` 命令，`systemctl` 还提供了三个查询状态的简单方法，主要供脚本内部的判断语句使用。

```sh
systemctl is-active mysqld.service          # 显示某个 Unit 是否正在运行
systemctl is-failed mysqld.service          # 显示某个 Unit 是否处于启动失败状态
systemctl is-enabled mysqld.service         # 显示某个 Unit 服务是否建立了启动链接
```

### 管理

立即启动一个服务。

```sh
systemctl start mysqld.service
```

立即停止一个服务。

```sh
systemctl stop mysqld.service
```

重启一个服务。

```sh
systemctl restart mysqld.service
```

杀死一个服务的所有子进程。

```sh
systemctl kill mysqld.service
```

重新加载一个服务的配置文件。

```sh
systemctl reload mysqld.service
```

重载所有修改过的配置文件。

```sh
systemctl daemon-reload
```

显示某个 Unit 的所有底层参数。

```sh
systemctl show mysqld.service
```

显示某个 Unit 的指定属性的值。

```sh
systemctl show -p CPUShares mysqld.service
```

设置某个 Unit 的指定属性。

```sh
systemctl set-property mysqld.service CPUShares=500
```

### 依赖关系

Unit 之间存在依赖关系：A 依赖于 B，就意味着 *Systemd* 在启动 A 的时候，同时会去启动 B。

`systemctl list-dependencies` 命令列出一个 Unit 的所有依赖。

```sh
systemctl list-dependencies mysqld.service
```

### 配置文件

每一个 Unit 都有一个配置文件，告诉 *Systemd* 怎么启动这个 Unit。

System Unit 从[多个目录](https://www.freedesktop.org/software/systemd/man/latest/systemd.unit.html#System%20Unit%20Search%20Path)读取配置文件。

```
/etc/systemd/system/*
/usr/lib/systemd/system/*
```

`systemctl list-unit-files` 命令用于列出所有配置文件。

```sh
systemctl list-unit-files                  # 列出所有配置文件
systemctl list-unit-files --type=service   # 列出指定类型的配置文件
```

`systemctl cat` 命令可以查看配置文件的内容。

```sh
systemctl cat mysqld.service
```

以 `sshd.service` 为例。

```ini
# /usr/lib/systemd/system/sshd.service
[Unit]
Description=OpenSSH server daemon
Documentation=man:sshd(8) man:sshd_config(5)
After=network.target sshd-keygen.service
Wants=sshd-keygen.service

[Service]
Type=notify
EnvironmentFile=/etc/sysconfig/sshd
ExecStart=/usr/sbin/sshd -D $OPTIONS
ExecReload=/bin/kill -HUP $MAINPID
KillMode=process
Restart=on-failure
RestartSec=42s

[Install]
WantedBy=multi-user.target
```

#### Unit

[*Unit*](https://www.freedesktop.org/software/systemd/man/latest/systemd.unit.html#%5BUnit%5D%20Section%20Options) 区块通常是配置文件的第一个区块，用来定义 *Unit* 的元数据，以及配置与其他 *Unit* 的关系。

- [**Requires**](https://www.freedesktop.org/software/systemd/man/latest/systemd.unit.html#Requires=)：强依赖关系

  当前 *Unit* 依赖的其他 *Unit*，如果它们没有运行，当前 *Unit* 会启动失败。

- **Wants**：弱依赖关系

  与当前 *Unit* 配合的其他 *Unit*，如果它们没有运行，当前 *Unit* 不会启动失败。

- **After**

  如果该字段指定的 *Unit* 也要启动，那么必须在当前 *Unit* 之前启动。
  
#### Install

[*Install*](https://www.freedesktop.org/software/systemd/man/latest/systemd.unit.html#%5BInstall%5D%20Section%20Options) 通常是配置文件的最后一个区块，用来定义如何启动，以及是否开机启动。

- [**WantedBy**](https://www.freedesktop.org/software/systemd/man/latest/systemd.unit.html#WantedBy=)

  它的值是一个或多个 *Target*，当前 *Unit* `enable` 时符号链接会放入 */etc/systemd/system* 目录下面以 *Target* 名 + *.wants* 后缀构成的子目录中。

#### Service

[*Service*](https://www.freedesktop.org/software/systemd/man/latest/systemd.service.html#Options) 区块用来描述 *Service* 的配置，只有 *Service* 类型的 *Unit* 才有这个区块。

- [**Type**](https://www.freedesktop.org/software/systemd/man/latest/systemd.service.html#Type=)
  - **simple**：默认值，执行 *ExecStart* 指定的命令，启动主进程。
  
- [**ExecStart**](https://www.freedesktop.org/software/systemd/man/latest/systemd.service.html#ExecStart=)：启动当前服务的命令。
- [**RestartSec**](https://www.freedesktop.org/software/systemd/man/latest/systemd.service.html#RestartSec=)：重启当前服务间隔的秒数。
- [**Restart**](https://www.freedesktop.org/software/systemd/man/latest/systemd.service.html#Restart=)：定义何种情况 *Systemd* 会自动重启当前服务。值包括 `always`、`no`。
- [**Environment**](https://www.freedesktop.org/software/systemd/man/latest/systemd.exec.html#Environment=)：指定环境变量。

### 实例化单元

可以使用单个模板配置来管理服务的[多个实例](https://docs.redhat.com/zh_hans/documentation/red_hat_enterprise_linux/8/html/using_systemd_unit_files_to_customize_and_optimize_your_system/con_working-with-instantiated-units_assembly_working-with-systemd-unit-files)。可以为单元定义一个通用模板，并在运行时使用特定参数生成该单元的多个实例。

## 三、Target

启动计算机的时候，需要启动大量的 *Unit*。如果每一次启动，都要写明本次启动需要哪些 *Unit*，显然非常不方便。*Systemd* 的解决方案就是 *Target*。

简单说，*Target* 就是一个 *Unit* 组，包含许多相关的 *Unit*。启动某个 *Target* 的时候，*Systemd* 就会启动里面所有的 *Unit*。从这个意义上说，*Target* 这个概念类似于状态点，启动某个 *Target* 就好比启动到某种状态。

查看当前系统的所有 *Target*。

```sh
systemctl list-unit-files --type=target
```

查看一个 *Target* 包含的所有 *Unit*。

```sh
systemctl list-dependencies multi-user.target
```

查看启动时的默认 *Target*。

```sh
systemctl get-default
```

设置启动时的[默认](https://www.freedesktop.org/software/systemd/man/latest/bootup.html#System%20Manager%20Bootup) *Target*。

```sh
systemctl set-default multi-user.target
```

## 四、Service

### systemd-resolved

[`systemd-resolved`](https://www.freedesktop.org/software/systemd/man/latest/systemd-resolved.service.html) 主要用于管理 DNS 解析和域名解析[配置](https://www.linuxtricks.fr/wiki/systemd-la-resolution-de-nom-avec-systemd-resolved)。

```sh
resolvectl status
```

- **DNS 解析管理**：
  - 统一管理不同网络接口（如以太网、Wi-Fi、VPN）的 DNS 配置，支持按接口优先级动态切换 DNS 服务器。
  - 通过 `/etc/resolv.conf` 的符号链接（默认指向 `/run/systemd/resolve/resolv.conf` 或 `/run/systemd/resolve/stub-resolv.conf`）为应用程序提供 DNS 配置。
- **DNS 缓存**：提供本地 DNS 缓存，加速重复查询的响应速度，减少外部 DNS 服务器的请求压力。
- **高级功能支持**：
  - **DNSSEC 验证**：自动验证 DNS 记录的完整性，防止域名劫持。
  - **DNS over TLS (DoT)**：支持加密的 DNS 查询，提升隐私和安全性。
  - LLMNR（本地链路多播名称解析）和 mDNS（多播 DNS）：用于局域网内的主机名解析（类似 Avahi）。

如需使用其他 DNS 工具（如 `dnsmasq`、`unbound`），或需要手动管理 `/etc/resolv.conf`，可以关闭 `systemd-resolved`。

```sh
systemctl stop systemd-resolved.service
systemctl disable systemd-resolved.service
rm -f /etc/resolv.conf
echo "nameserver 100.100.2.136" | tee /etc/resolv.conf
```

`systemd-resolved` 不会监听标准的 `127.0.0.1:53`，而是使用 `127.0.0.53:53` 和 `127.0.0.54:53` 作为其默认监听地址。

```sh
nslookup example.com 127.0.0.53
nslookup example.com 127.0.0.54
```

