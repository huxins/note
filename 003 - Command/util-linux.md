# util-linux

[util-linux](https://packages.debian.org/sid/util-linux) 提供了许多重要的工具，大部分面向系统维护。这些工具能查看内核信息、创建新的文件系统、查看块设备信息以及提供与实时时钟交互的接口等等。

## 一、存储

### lsblk

[`lsblk`](https://manpages.debian.org/bookworm/util-linux/lsblk.8.en.html) 列出有关所有可用或指定块设备的信息。

```sh
lsblk
```

查看 [Udev](https://wiki.debian.org/udev) 生成的[符号链接](https://wiki.debian.org/Persistent_disk_names)目录。

- `/dev/disk/by-id/`：设备的 ID 可能基于硬件序列号（如 `wwn-`）、制造商信息、连接接口（如 `usb-`），适用于唯一标识物理设备。
- `/dev/disk/by-uuid/`：设备的 UUID 是文件系统级别的唯一标识，每次格式化时都会重新生成，适用于唯一标识文件系统。
- `/dev/disk/by-partlabel/`：基于分区标签（Partition Label）生成的符号链接，它的作用是为磁盘分区提供一个更具可读性的名称。

```sh
ls -l /dev/disk/by-id/ | column -t
ls -l /dev/disk/by-uuid/ | column -t
ls -l /dev/disk/by-partlabel/ | column -t
```

查看磁盘虚拟化驱动。

```sh
lsmod | grep -oE 'virtio_scsi|virtio_blk' | head -1
```

### fdisk

[`fdisk`](https://man7.org/linux/man-pages/man8/fdisk.8.html) 提供了为定义文件系统准备的磁盘分区功能。

**命令行选项**：

- -**b** *sectorsize*：指定磁盘的扇区大小。有效值为 `512`、`1024`、`2048` 或 `4096`。
- -**C** *cyls*：指定磁盘的柱面数。
- -**H** *heads*：指定磁盘的磁头数。
- -**S** *sects*：指定磁盘每个磁道的扇区数。
- -**c**：关闭 DOS 兼容模式。
- -**l**：列出指定设备的分区表。如果没有给出设备，则使用 `/proc/partitions` 中提到的那些。
- -**u**：列出分区表时，以扇区而不是柱面给出大小。

**用法**：

[`fdisk`](https://tldp.org/HOWTO/html_single/Partition/#fdisk_partitioning) 通过在命令提示符下键入 `fdisk device` 来启动。

```sh
fdisk /dev/vdb
```

- 输入 **`p`** 打印分区表。
- 输入 **`n`** 创建一个新分区。
- 输入 **`w`** 写入新的分区表并退出。
- 输入 **`d`** 删除分区。
- 输入 **`t`** 更改分区类型。
- 输入 **`q`** 退出而不保存更改。

### mkfs

[`mkfs`](https://man7.org/linux/man-pages/man8/mkfs.8.html) 是用于格式化具有特定文件系统的块存储设备的命令。

`mkfs` 是一个通用命令，用于创建文件系统。它是一个前端工具，可以调用具体的文件系统创建程序。

**命令行选项**：

- -**t** *type*：指定要构建的文件系统的类型。如果未指定，则使用默认文件系统类型（当前为 `ext2`）。

例如，创建一个 `ext4` 文件系统，实际调用的程序可能是 `mke2fs`。

```sh
mkfs -t ext4 /dev/vdb1
```

`mkfs.ext4`、`mkfs.ext3`、`mkfs.ext2` 实际上是 `mke2fs` 的不同调用方式。

```sh
mke2fs -t ext4 /dev/vdb1
```

