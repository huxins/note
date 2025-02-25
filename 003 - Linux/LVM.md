# Logical Volume Manager

在 Linux 中，逻辑卷管理器（LVM）是一个设备映射器框架，它为 Linux 内核提供逻辑卷管理。

```sh
apt info lvm2
```

## 一、概念

- **Physical Volume（物理卷）**：常规物理磁盘分区的另一个名称，如 `sda1` 分区、`sdb` 磁盘。
- **Volume Group（卷组）**：创建在 PV 上，由一个或多个 PV 组成，可以在 VG 上创建一个或多个 LV，功能类似非 LVM 系统的物理硬盘。
- **Logical Volume（逻辑卷）**：每个逻辑卷都可以单独格式化，功能类似非 LVM 系统的磁盘分区。
- **Physical Extent（物理块）**：物理卷中可以分配的最小存储单元称为 PE，PE 的大小是可以指定的。
- **Logical Extent（逻辑块）**：逻辑卷中可以分配的最小存储单元称为 LE。在同一个卷组中，LE 的大小和 PE 的大小是一样的，并且一一对应。

![LVM](https://img2023.cnblogs.com/blog/1768648/202307/1768648-20230710112259181-1715498829.png)

## 二、物理卷

物理卷可以使用磁盘分区，也可以直接使用磁盘。

- 磁盘分区：需先把磁盘分区格式化为 `lvm` 格式的分区。
- 磁盘：不需要格式化。

**相关命令**：

- `pvcreate`
- `pvremove`
- `pvdisplay`
- `pvscan`
- `pvs`
- `pvchange`
- `pvck`
- `pvmove`
- `pvresize`

磁盘分区前，先查看当前的分区情况。

```sh
parted /dev/vdb print
```

使用分区工具 `gdisk` 创建分区，并更改分区类型为 *Linux LVM*（`8e00`）。

```sh
gdisk /dev/vdb
```

创建物理卷：基于磁盘分区来创建 LVM 物理卷。

```sh
pvcreate /dev/vdb1
```

删除物理卷：

```sh
pvremove /dev/vdb1
```

## 三、卷组

**相关命令**：

- `vgcreate`
- `vgremove`
- `vgdisplay`
- `vgscan`
- `vgs`

创建卷组：

```sh
vgcreate vg01 /dev/vdb1
```

删除卷组：

```sh
vgremove /dev/vg01
```

扩展卷组：

```sh
vgextend vg01 /dev/vdb2
```

## 四、逻辑卷

**相关命令**：

- `lvcreate`
- `lvremove`
- `lvdisplay`
- `lvscan`
- `lvs`

创建逻辑卷：

```sh
lvcreate -L 4G -n lvData vg01
```

格式化逻辑卷：

```sh
mkfs.ext4 /dev/vg01/lvData
```

挂载格式化后的逻辑卷：

```sh
mount -t ext4 /dev/vg01/lvData /media/data
```

删除逻辑卷：

```sh
lvremove /dev/vg01/lvData
```

扩展逻辑卷：

```sh
lvextend -L 5000M /dev/vg01/lvData
```

在线调整大小：

```sh
resize2fs /dev/vg01/lvData
```

