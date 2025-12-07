# Proxmox VE

[Proxmox Virtual Environment](https://www.proxmox.com/en/products/proxmox-virtual-environment/overview) 是一个完整的、开源的企业虚拟化服务器管理平台。

## 一、安装

### 刻录映像

使用 `UltraISO` 打开映像，启动写入硬盘映像，写入方式选择 RAW。

### iPXE

若已安装 Linux 系统，但无法使用 iPXE 或从磁盘镜像启动，且能在启动时看到 GRUB 菜单，可通过 `grub-imageboot` 工具引导进入 [netboot.xyz](https://netboot.xyz/docs/booting/grub/)。

```sh
apt install grub-imageboot
```

下载 `netboot.xyz` ISO。

```sh
mkdir /boot/images
cd /boot/images
wget https://boot.netboot.xyz/ipxe/netboot.xyz.iso
```

更新 GRUB 菜单以包含此 ISO。

```sh
update-grub2
reboot
```

重启后，通过 VNC 进入服务器，选择启动方式，选择 `netboot.xyz` 进去。

进入 `Linux Network Installs (64-bit)` 后，再找到 PVE 安装下面的稳定版即可。

## 二、LVM

### 配置选项

安装程序会创建一个名为 `pve` 的 Volume Group，以及名为 `root`、`data` 和 `swap` 的 Logical Volumes。

通过调增下面的参数控制这些卷的大小。

- **hdsize**

  定义要使用的总硬盘大小。通过这种方式，可以在硬盘上保留可用空间以进行进一步分区。

- **swapsize**

  定义 `swap` 卷的大小。默认为已安装内存的大小，最小 4 GB，最大 8 GB。结果值不能大于 `hdsize/8`。

- **maxroot**

  定义存储操作系统的 `root` 卷的最大大小。`root` 卷大小的最大限制是 `hdsize/4`。

- **maxvz**

  定义 `data` 卷的最大大小。

  `data` 卷的实际大小为：`datasize` = `hdsize` - `rootsize` - `swapsize` - `minfree`

- **minfree**

  定义 LVM volume group `pve` 中剩余的可用空间量。如果可用存储空间超过 128 GB，则默认为 16 GB，否则将使用 `hdsize/8`。

## 三、命令工具

### 磁盘映像导入

将外部磁盘映像导入为 VM 中未使用的磁盘。

```sh
qm importdisk <vmid> <source> <storage> [OPTIONS]
```

使用 `local-lvm` 存储将磁盘映像添加到 VM。

```sh
qm importdisk 100 openwrt.qcow2 local-lvm
```

### 虚拟机控制

- **unlock**

  解锁虚拟机。
  
  ```sh
  qm unlock <vmid>
  ```
  
- **stop**

  停止虚拟机。`qemu` 进程将立即退出。

  这类似于拔掉正在运行的计算机的电源插头，可能会损坏 VM 数据。

  ```sh
  qm stop <vmid> [OPTIONS]
  ```
  
- **status**

  显示虚拟机状态。
  
  ```sh
  qm status <vmid> [OPTIONS]
  ```

