# 文件系统

文件系统是一种存储和组织数据的方法，它通过文件和目录的逻辑概念替代硬盘和光盘等物理设备的数据块概念。用户只需记住文件的目录和文件名，而不必关心数据实际存储在硬盘的哪个数据块上。

不同的文件系统格式有不同的特性、优点和缺点，常见的文件系统格式包括：

- **NTFS**：用于 Windows 操作系统，支持大文件、文件权限、加密等高级功能。
- **FAT32**：兼容性广泛，适用于小型存储设备，但不支持大于 4GB 的文件。
- **exFAT**：适用于闪存驱动器和 SD 卡，支持大于 4GB 的文件。
- **ext4**：常用于 Linux 操作系统，支持大文件和高效的磁盘空间管理。
- **HFS+**：用于 macOS 操作系统，支持大文件和复杂的文件属性。

## 一、分区类型

分区类型是指分区在磁盘上的标识，指示该分区的用途和类型。这些标识通常由一个字节的数字表示，不同的数字代表不同的分区类型。

- **0x07**：NTFS
- **0x83**：[Linux 文件系统](https://en.wikipedia.org/wiki/File_system#Linux)（如 ext4、ext3）
- **0x82**：Linux swap
- **0x0C**：FAT32

分区类型的主要作用是让操作系统和磁盘管理工具识别分区的用途，并在适当的情况下加载和管理分区内的数据。

## 二、文件系统格式

### FAT

FAT（File Allocation Table）在存储空间最开始有个大表，记录所有的可用块的使用链，并标记空闲块和坏块。

FAT 表和备份 FAT 表固定存储在开始位置，这意味着这里会被频繁读写，从而极易损坏。

现代的 SD 卡和 NAND 闪存设备内部通常配有控制器芯片，这些芯片具备磨损均衡（Wear leveling）功能。

磨损均衡技术可以在设备的所有存储单元之间均匀分布写入操作，防止某些固定块因频繁写入而过早失效。这样，即使使用 FAT 文件系统，其潜在的频繁写入问题也能得到一定程度的缓解。

读写文件过程中经常需要更新 FAT 表，更新过程中发生意外断电等，轻则造成文件丢失，重则整个磁盘内容丢失。补救的办法就是把备份 FAT 复制到 FAT。

FAT 表的大小已被限定，因此支持的空间大小由每块的大小决定。

- **FAT16**

  一个簇最小为 512 字节，最大为 32K。

  系统为每个簇分配唯一的索引号，用一个 16 位二进制数来标识。因为 16 位二进制数最大为 65536，所以 FAT 分区所拥有的簇的数量不可能超过 65536 个。

  即最大分区为 `65536 * 32K`，即 2GB。

## 三、分区操作

- [Microsoft 支持：如何在不销毁数据的情况下重新分区？](https://support.microsoft.com/zh-cn/topic/microsoft-c3d64de0-4672-b21f-de4e-b4908fb35ae3)

### 分区收缩

如果分区的文件系统是 NTFS，可以通过下面的操作步骤收缩卷。

```
1、打开【计算机管理】，选择【存储】中的【磁盘管理】。
2、右键单击要剪切的分区，然后选择【压缩卷】。
3、在【输入压缩空间量】中调整大小，点击【压缩】即可。
```

### 分区扩容

如果分区的文件系统是 NTFS，且磁盘管理器中的驱动器号之后紧接着有未分配的空间，则此空间可以合并到该驱动器号中。

```
1、打开【计算机管理】，选择【存储】中的【磁盘管理】。
2、右键单击要扩展的分区，然后选择【扩展卷】。
3、然后调整【选择空间量】的大小。该值是默认情况下允许的最大值。
```
