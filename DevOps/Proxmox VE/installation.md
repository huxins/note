# Installation

## 刻录映像

使用 `UltraISO` 打开映像，启动写入硬盘映像，写入方式选择 RAW。

## LVM 配置选项

安装程序会创建一个名为 `pve` 的 Volume Group，以及名为 `root`、`data` 和 `swap` 的 Logical Volumes。要控制这些卷的大小，请使用：

- **hdsize**

定义要使用的总硬盘大小。通过这种方式，可以在硬盘上保留可用空间以进行进一步分区。

- **swapsize**

定义 `swap` 卷的大小。默认为已安装内存的大小，最小 4 GB，最大 8 GB。结果值不能大于 `hdsize/8`。

- **maxroot**

定义存储操作系统的 `root` 卷的最大大小。`root` 卷大小的最大限制是 `hdsize/4`。

- **maxvz**

定义 `data` 卷的最大大小。`data` 卷的实际大小为：

`datasize` = `hdsize` - `rootsize` - `swapsize` - `minfree`

- **minfree**

定义 LVM volume group `pve` 中剩余的可用空间量。如果可用存储空间超过 128 GB，则默认为 16 GB，否则将使用 `hdsize/8`。

## 模板镜像

ISO Images 存储于 `/var/lib/vz/template/iso`。

CT Templates 存储于 `/var/lib/vz/template/cache`。

使用软件源镜像：

```sh
# Bullseye
$ sed -i 's/ftp.debian.org/mirrors.sjtug.sjtu.edu.cn/g' /etc/apt/sources.list
$ sed -i 's/security.debian.org/mirrors.sjtug.sjtu.edu.cn\/debian-security/g' /etc/apt/sources.list
# Proxmox
$ rm -f /etc/apt/sources.list.d/pve-enterprise.list
$ echo "deb https://mirrors.tuna.tsinghua.edu.cn/proxmox/debian bullseye pve-no-subscription" > /etc/apt/sources.list.d/pve-no-subscription.list
# CT Templates
$ sed -i 's/download.proxmox.com/mirrors.tuna.tsinghua.edu.cn\/proxmox/g' /usr/share/perl5/PVE/APLInfo.pm
$ sed -i '/mirrors/s/http/https/g' /usr/share/perl5/PVE/APLInfo.pm
```

## 参见

- [Installation - Proxmox VE](https://pve.proxmox.com/wiki/Installation)
