# Command





## 七、Linux


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

