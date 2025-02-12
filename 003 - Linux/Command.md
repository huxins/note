# Command






### savelog

[savelog](https://manpages.ubuntu.com/manpages/noble/en/man8/savelog.8.html) 命令可以保存文件的旧副本，也可以压缩旧副本。

- -**c** *cycle*：日志文件的保存周期版本。
- -**n**：不要旋转空文件。
- -**t**：生成新的日志文件。

将日志文件重命名，并且只保留指定数量的历史版本。

```sh
savelog -n -t -c 2 /var/log/syslog
```

## 七、Linux

### sysctl

[sysctl](https://man7.org/linux/man-pages/man8/sysctl.8.html) 用于在运行时修改内核参数。可使用的参数列在 */proc/sys/* 下。

#### 禁用 IPv6

```sh
sysctl -w net.ipv6.conf.all.disable_ipv6=1 >> /etc/sysctl.d/disable-ipv6.conf
sysctl -w net.ipv6.conf.default.disable_ipv6=1 >> /etc/sysctl.d/disable-ipv6.conf
sysctl -w net.ipv6.conf.lo.disable_ipv6=1 >> /etc/sysctl.d/disable-ipv6.conf
sysctl -w net.ipv6.conf.eth0.disable_ipv6=1 >> /etc/sysctl.d/disable-ipv6.conf
sysctl -p /etc/sysctl.d/disable-ipv6.conf
```

如果使用 `ip a` 命令，在输出中没有发现 IPv6 地址，则说明成功关闭了 IPv6 功能。

### crontab

[crontab](https://linux.die.net/man/1/crontab) 是用于安装、移除或列出用于驱动 `cron` *daemon* 表的程序。每个用户都可以拥有自己的 `crontab`，尽管这些文件位于 */var/spool/* 目录中，但并不直接编辑它们。

- -**e**：编辑工作表。
- -**l**：列出工作表里的命令。

时间格式如下：

```
*    *    *    *    *
-    -    -    -    -
|    |    |    |    |
|    |    |    |    +----- 星期中星期几 (0 - 6) (星期天 为0)
|    |    |    +---------- 月份 (1 - 12) 
|    |    +--------------- 一个月中的第几天 (1 - 31)
|    +-------------------- 小时 (0 - 23)
+------------------------- 分钟 (0 - 59)
```

常用时间如下：

| 执行计划     | 格式        |
| ------------ | ----------- |
| 每五分钟执行 | */5 * * * * |
| 每小时执行   | 0 * * * *   |
| 每天执行     | 0 4 * * *   |
| 每周执行     | 0 0 * * 0   |
| 每月执行     | 0 0 1 * *   |
| 每年执行     | 0 0 1 1 *   |

### locale

`locale` 命令显示关于当前语言环境的信息。

查看系统当前语言包。

```sh
locale
```

查看系统拥有的语言包。

```sh
locale -a
```

#### Debian

在 Debian 系统中，*locales* 包含了系统所需的语言环境工具。

```sh
apt install locales
```

正常情况下，系统已经默认安装了 `locales`，可用查询系统是否已安装：

```sh
dpkg -s locales
```

使用 `dpkg-reconfigure` 命令来配置和生成所需的语言环境。

```sh
dpkg-reconfigure locales
```

编辑 */etc/default/locale* 文件，设置系统的默认语言环境。

```sh
LANG=zh_CN.UTF-8
```

重启系统，更改语言环境。

```sh
reboot
```

