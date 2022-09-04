# Fdisk

`fdisk` 提供了为定义文件系统准备的磁盘分区功能。

## 语法

```
fdisk [-uc] [-b sectorsize] [-C cyls] [-H heads] [-S sects] device
fdisk -l [-u] [device...]
```

## 命令行选项

- **-b** *sectorsize*

指定磁盘的扇区大小。有效值为 512、1024、2048 或 4096。

- **-c**

关闭 DOS 兼容模式。

- **-C** *cyls*

指定磁盘的柱面数。

- **-H** *heads*

指定磁盘的磁头数。

- **-S** *sects*

指定磁盘每个磁道的扇区数。

- **-l**

列出指定设备的分区表，然后退出。如果没有给出设备，则使用 */proc/partitions*（如果存在）中提到的那些。

- **-u**

列出分区表时，以扇区而不是柱面给出大小。

## 用法

`fdisk` 通过在命令提示符下键入 `fdisk device` 来启动。

输入 **`p`** 打印分区表。

输入 **`d`** 删除分区。

输入 **`t`** 更改分区类型。

输入 **`n`** 创建一个新分区。

输入 **`q`** 退出而不保存更改。

输入 **`w`** 写入新的分区表并退出。

## 参考文献

- [Partitioning with fdisk - LDP](https://tldp.org/HOWTO/html_single/Partition/#fdisk_partitioning)
- [Partition type - Wikipedia](https://en.wikipedia.org/wiki/Partition_type)

