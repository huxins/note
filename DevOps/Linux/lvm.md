# Logical Volume Manager

在 Linux 中，逻辑卷管理器 (LVM) 是一个设备映射器框架，它为 Linux 内核提供逻辑卷管理。

## 基本术语

- **Physical Volume**：物理卷是 LVM 使用的常规物理磁盘分区的另一个名称。
- **Volume Group**：卷组，创建在 PV 上，由一个或多个 PV 组成，可以在 VG 上创建一个或多个 LV，功能类似非 LVM 系统的物理硬盘。
- **Logical Volume**：每个逻辑卷都可以单独格式化，功能类似非 LVM 系统的磁盘分区。
- **Physical Extent**：物理卷中可以分配的最小存储单元称为 PE，PE 的大小是可以指定的。
- **Logical Extent**：逻辑卷中可以分配的最小存储单元称为 LE，在同一个卷组中，LE 的大小和 PE 的大小是一样的，并且一一对应。

## 物理卷

使用分区工具 `fdisk` 创建分区，更改分区类型为 *Linux LVM*。

创建物理卷：

```sh
$ pvcreate /dev/sdb1
```

删除物理卷：

```sh
$ pvremove /dev/sdb1
```

## 卷组

创建卷组：

```sh
$ vgcreate vg01 /dev/sdb1
```

删除卷组：

```sh
$ vgremove /dev/vg01
```

扩展卷组：

```sh
$ vgextend vg01 /dev/sdb2
```

## 逻辑卷

创建逻辑卷：

```sh
$ lvcreate -L 100M -n lvData vg01
```

格式化逻辑卷：

```sh
$ mkfs -t ext4 /dev/vg01/lvData
```

挂载格式化后的逻辑卷：

```sh
$ mount -t ext4 /dev/vg01/lvData /media/data
```

删除逻辑卷：

```sh
$ lvremove /dev/vg01/lvData
```

扩展逻辑卷：

```sh
$ lvextend -L 200M /dev/vg01/lvData
```

在线调整大小：

```sh
$ resize2fs /dev/vg01/lvData
```

