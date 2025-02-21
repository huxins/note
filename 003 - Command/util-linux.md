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

