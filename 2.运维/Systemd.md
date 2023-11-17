# Systemd

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

