# Systemd

## 一、命令

### systemctl

`systemctl` 是 *Systemd* 的主命令，用于管理系统。

- systemctl **reboot**：重启系统。

- systemctl **poweroff**：关闭系统，切断电源。

- systemctl **halt**：CPU 停止工作。

- systemctl **suspend**：暂停系统。

- systemctl **hibernate**：让系统进入冬眠状态。

- systemctl **hybrid-sleep**：让系统进入交互式休眠状态。

- systemctl **rescue**：启动进入救援状态。

- systemctl **get-default**：查看默认的启动 Target。

- systemctl **daemon-reload**：重新加载配置文件。

- systemctl **list-units**：列出 *systemd* 当前在内存中的单元。

  ```sh
  systemctl list-units --type=service | grep postgresql
  ```
  
- systemctl **list-dependencies**：查看服务依赖。

  ```sh
  systemctl list-dependencies graphical.target
  ```
  
- systemctl **enable**：开机启动服务。

  ```sh
  # Created symlink from /etc/systemd/system/multi-user.target.wants/sshd.service to /usr/lib/systemd/system/sshd.service.
  systemctl enable sshd
  ```

### systemd-analyze

`systemd-analyze` 命令用于查看启动耗时。

- systemd-analyze：查看启动耗时。

- systemd-analyze **blame**：查看每个服务的启动耗时。

- systemd-analyze **critical-chain**：显示瀑布状的启动过程流。

  ```sh
  systemd-analyze critical-chain atd.service
  ```

### hostnamectl

`hostnamectl` 命令用于查看当前主机的信息。

- hostnamectl：显示当前主机的信息。

- hostnamectl **set-hostname**：设置主机名。

  ```sh
  hostnamectl set-hostname rhel7
  ```

### localectl

`localectl` 命令用于查看本地化设置。

通过 `locale` 查看系统当前语言包，通过 `locale -a` 查看系统拥有的语言包。

- localectl：查看本地化设置。

- localectl **set-locale**：设置本地化区域。

  ```sh
  localectl set-locale LANG=en_GB.utf8
  localectl set-locale LANG=en_US.utf8
  localectl set-locale LANG=zh_CN.UTF8
  ```

- localectl **set-keymap**：设置本地化键盘布局。

  ```sh
  localectl set-keymap en_GB
  ```

### timedatectl

`timedatectl` 命令用于控制系统时间和日期。

- timedatectl：查看当前时区设置。

- timedatectl **list-timezones**：显示所有可用的时区。

- timedatectl **set-timezone**：设置当前时区。

  ```sh
  timedatectl set-timezone America/New_York
  timedatectl set-timezone Asia/Shanghai
  ```

### loginctl

`loginctl` 命令用于查看当前登录的用户。

- loginctl **list-sessions**：列出当前 *session*。

- loginctl **list-users**：列出当前登录用户。

- loginctl **show-user**：显示指定用户的信息。

  ```sh
  loginctl show-user root
  ```

## 二、Unit

Systemd 可以管理所有系统资源。不同的资源统称为 Unit。

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

### 2.1. 状态

`systemctl status` 命令用于查看系统状态和单个 Unit 的状态。

```sh
# 显示系统状态
systemctl status

# 显示单个 Unit 的状态
systemctl status mysqld.service
```

除了 `status` 命令，`systemctl` 还提供了三个查询状态的简单方法，主要供脚本内部的判断语句使用。

```sh
# 显示某个 Unit 是否正在运行
systemctl is-active mysqld.service

# 显示某个 Unit 是否处于启动失败状态
systemctl is-failed mysqld.service

# 显示某个 Unit 服务是否建立了启动链接
systemctl is-enabled mysqld.service
```

### 2.2. 管理

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

### 2.3. 依赖关系

Unit 之间存在依赖关系：A 依赖于 B，就意味着 *Systemd* 在启动 A 的时候，同时会去启动 B。

`systemctl list-dependencies` 命令列出一个 Unit 的所有依赖。

```sh
systemctl list-dependencies mysqld.service
```

### 2.4. 配置文件

每一个 Unit 都有一个配置文件，告诉 *Systemd* 怎么启动这个 Unit。

System Unit 从[多个目录](https://www.freedesktop.org/software/systemd/man/latest/systemd.unit.html#System%20Unit%20Search%20Path)读取配置文件。

```
/etc/systemd/system/*
/usr/lib/systemd/system/*
```

`systemctl list-unit-files` 命令用于列出所有配置文件。

```sh
# 列出所有配置文件
systemctl list-unit-files

# 列出指定类型的配置文件
systemctl list-unit-files --type=service
```

`systemctl cat` 命令可以查看配置文件的内容。

```sh
systemctl cat mysqld.service
```

以 *sshd.service* 为例。

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

*Unit* 区块通常是配置文件的第一个区块，用来定义 *Unit* 的元数据，以及配置与其他 *Unit* 的关系。

- **Requires**

  当前 *Unit* 依赖的其他 *Unit*，如果它们没有运行，当前 *Unit* 会启动失败。强依赖关系。

- **Wants**

  与当前 *Unit* 配合的其他 *Unit*，如果它们没有运行，当前 *Unit* 不会启动失败。弱依赖关系。

- **After**

  如果该字段指定的 *Unit* 也要启动，那么必须在当前 *Unit* 之前启动。
  
#### Install

*Install* 通常是配置文件的最后一个区块，用来定义如何启动，以及是否开机启动。

- **WantedBy**

  它的值是一个或多个 *Target*，当前 *Unit* `enable` 时符号链接会放入 */etc/systemd/system* 目录下面以 *Target* 名 + *.wants* 后缀构成的子目录中。

#### Service

*Service* 区块用来描述 *Service* 的配置，只有 *Service* 类型的 *Unit* 才有这个区块。

- **Type**

  - **simple**：默认值，执行 *ExecStart* 指定的命令，启动主进程。
- **ExecStart**：启动当前服务的命令。
- **RestartSec**：重启当前服务间隔的秒数。
- **Restart**：定义何种情况 *Systemd* 会自动重启当前服务，可能的值包括 `always`、`no`。
- **Environment**：指定环境变量。

## 三、Target

启动计算机的时候，需要启动大量的 *Unit*。如果每一次启动，都要一一写明本次启动需要哪些 *Unit*，显然非常不方便。*Systemd* 的解决方案就是 *Target*。

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

## 四、日志管理

*Systemd* 统一管理所有 *Unit* 的启动日志。带来的好处就是，可以只用 `journalctl` 一个命令，查看所有日志。日志的配置文件是 */etc/systemd/journald.conf*。

- -**x**：显示日志的详细信息，包括每行的字段。
- -**e**：从日志的最后一行开始显示。
- -**u** *UNIT*：显示指定 *UNIT* 匹配的日志。
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

