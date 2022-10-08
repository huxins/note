# Master boot record

MBR 是一种特殊类型的引导扇区，位于已分区的计算机大容量存储设备的最开始。

它由三个部分组成，引导代码区、硬盘分区表和硬盘有效标志。*Bootstrap code area* 占 446 字节，它负责从活动分区中装载，并运行系统引导程序；第二部分是 *[Partition table](https://en.wikipedia.org/wiki/Master_boot_record#Partition_table_entries)*，占 64 字节；第三部分是 *Magic number*，占 2 字节。

## 引导代码区

引导代码区是一小段代码，用于加载其他分区上更大的启动加载器。如果你安装了 Windows，Windows 启动加载器的初始信息就放在这个区域里，如果 MBR 的信息被覆盖导致 Windows 不能启动，你就需要使用 Windows 的 MBR 修复功能来使其恢复正常。如果你安装了 Linux，则位于 MBR 里的通常会是 GRUB 加载器。

## 分区表

*Partition table* 由 4 个 *Partition entry* 组成，以 *Partition entry* 为例：

**80 01 01 00, 0B FE BF FC, 3F 00 00 00, 7E 86 BB 00**

*80* 是一个分区的激活标志，表示系统可引导；*01 01 00* 表示分区开始的磁头号为 *01*，开始的扇区号为 *01*，开始的柱面号为 *00*。

*0B* 表示该分区的系统类型是 FAT32，*FE BF FC* 表示分区结束的磁头号为 *254*，分区结束的扇区号为 *63*、分区结束的柱面号为 *764*。

*3F 00 00 00* 为 *little-endian*，表示首扇区的相对扇区号为 63。

*7E 86 BB 00* 为 *little-endian*，表示总扇区数为 12289662。

以 *01 01 00* 为例，计算磁头号、扇区号和柱面号：

磁头号为第一个字节 *01*；

扇区号为第二个字节 *01* 的二进制低 6 位，即 *000001*；

柱面号为第三个字节 *00*，并在高位前添加第二个字节的最高两位。

## 参见

- [Master boot record - Wikipedia](https://en.wikipedia.org/wiki/Master_boot_record)

