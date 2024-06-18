# Systemd



```
systemctl list-units --type=service | grep postgresql
```



## 一、命令

查看默认的启动 Target。

```sh
$ systemctl get-default
```

查看服务依赖。

```sh
$ systemctl list-dependencies graphical.target
```

开机启动。

```sh
# Created symlink from /etc/systemd/system/multi-user.target.wants/sshd.service to /usr/lib/systemd/system/sshd.service.
$ systemctl enable sshd
```

重新加载配置文件。

```sh
$ systemctl daemon-reload
```

## 二、Unit

System Unit 有多个搜索路径，详见 [System Unit Search Path](https://www.freedesktop.org/software/systemd/man/latest/systemd.unit.html#System%20Unit%20Search%20Path)。

```
/etc/systemd/system/*
/usr/lib/systemd/system/*
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

- **After**

  表示如果 `network.target` 或 `sshd-keygen.service` 需要启动，那么 `sshd.service` 应该在它们之后启动。
  
  只涉及启动顺序，不涉及依赖关系。
  
- **Wants**

  表示 `sshd.service` 与 `sshd-keygen.service` 之间存在弱依赖关系，即如果 `sshd-keygen.service` 启动失败或停止运行，不影响 `sshd.service` 继续执行。

  只涉及依赖关系，与启动顺序无关，默认情况下是同时启动的。

## 三、journalctl

`journalctl` 用于打印由 `systemd-journald.service` 和 `systemd-journal-remote.service` 存储的日志条目。

```sh
$ journalctl -xeu minio.service
```

- `-x`：显示日志的详细信息，包括每行的字段。
- `-e`：从日志的最后一行开始显示。
- `-u` *UNIT*：显示指定 *UNIT* 匹配的日志。

清除日志。

```sh
$ journalctl --vacuum-size=100M --vacuum-time=7d
```

- `--vacuum-size`=*100M*：删除最旧的日志文件，直到它们使用的磁盘空间低于指定的大小。接受 `K`、`M`、`G` 和 `T` 后缀。
- `--vacuum-time`=*7d*：删除早于指定时间跨度的日志文件。接受 `s`、`m`、`h`、`days`、`weeks`、`months` 和 `years` 后缀。
- `--rotate`：归档日志文件并重命名，然后创建新的日志文件。Added in version 227.

较低版本清除日志。

```sh
$ systemctl stop systemd-journald
$ echo "" > /run/log/journal/7fd8464130ec492c90c5cb07a51beedb/system.journal
$ systemctl start systemd-journald
```

## 三、localectl

`localectl` 用于控制系统区域设置和键盘布局设置。详见 [localectl](https://www.freedesktop.org/software/systemd/man/latest/localectl.html)。

通过 `locale` 查看系统当前语言包，通过 `locale -a` 查看系统拥有的语言包。

运行以下命令更新 `locale`。

```sh
$ localectl set-locale LANG=en_US.utf8
$ localectl set-locale LANG=zh_CN.UTF8
```

## 四、timedatectl

`timedatectl` 用于控制系统时间和日期。详见 [timedatectl](https://www.freedesktop.org/software/systemd/man/latest/timedatectl.html)。

列出可用的时区。

```sh
$ timedatectl list-timezones
```

将系统时区设置为指定值。

```sh
$ timedatectl set-timezone Asia/Shanghai
```

