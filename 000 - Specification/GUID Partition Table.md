# GUID Partition Table

[GUID Partition Table](https://zh.wikipedia.org/wiki/GUID%E7%A3%81%E7%A2%9F%E5%88%86%E5%89%B2%E8%A1%A8) 是使用通用唯一标识符对物理计算机存储设备的分区表进行布局的标准。

## 一、硬盘地址管理

最初的寻址方式称为 **CHS**，在 LBA（Logical Block Address）概念诞生之前，由他负责管理磁盘地址。所谓 CHS 即柱面（Cylinder），磁头（Header），扇区（Sector），通过这三个变量描述磁盘地址。

**LARGE** 寻址模式仍然基于 CHS 结构，有其固有的限制。主要用于解决早期 CHS 寻址方式的容量限制问题，是 CHS 和 LBA 之间的过渡技术。

LARGE 模式通过将实际的物理柱面数除以一个固定的因子（通常是 2、4 或 8），然后相应地增加每个柱面的磁头数来实现。这样可以在不改变总扇区数的情况下，扩大可寻址的容量。

**LBA**（Logical Block Address）是一种更现代、更简单的硬盘寻址方式，它克服了传统 CHS 寻址方式的许多限制。

LBA 将硬盘上的所有扇区视为一个线性数组，每个扇区都有一个唯一的地址，从 0 开始递增。为了保持与 CHS 模式的兼容，通过逻辑变换算法，可以转换为磁头、柱面、扇区三种参数来表示。

更现代的 GPT（GUID Partition Table）分区方案完全基于 LBA，不使用 CHS。

一些分区软件仍然显示磁头、柱面和扇区（CHS）信息，可能有以下原因：

- **历史兼容性**：传统的 MBR 分区表，最初是基于 CHS 寻址设计的。
- **分区对齐**：在某些情况下，了解 CHS 值可以帮助进行更精确的分区对齐。
- **虚拟 CHS 值**：现代硬盘通常会提供虚拟的 CHS 值，这些值实际上是从 LBA 转换而来的。

## 二、GPT 结构

GPT 分区表的结构如下。

![GPT](https://upload.wikimedia.org/wikipedia/commons/0/07/GUID_Partition_Table_Scheme.svg)

每个逻辑块（LBA）为 512 字节，每个分区的记录为 128 字节。负数的 LBA 地址表示从最后的块开始倒数，-1 表示最后一个块。

## 三、UEFI

**UEFI**（Unified Extensible Firmware Interface）是 **BIOS**（Basic Input/Output System）的一种升级替代方案。

仅从系统启动原理方面来做比较，UEFI 之所以比 BIOS 强大，是因为 UEFI 本身已经相当于一个微型操作系统。

BIOS 下启动操作系统之前，必须从主引导记录中读取系统启动代码，然后从活动分区中引导启动操作系统。

UEFI 使用 **EFI** 系统分区（ESP，EFI System Partition）进行引导。

**ESP** 是一个 **FAT** 格式的分区，包含启动加载程序、设备驱动程序和系统工具。

尽管 UEFI 兼容传统的 BIOS 引导方式（称为 CSM，Compatibility Support Module），但新硬件和操作系统更倾向于使用 UEFI。

如果通过 UEFI 安装了 Windows，会发现有两个很小的隐藏分区。一个叫 **ESP**（EFI system partition），另一个叫 **MSR**（Microsoft Reserved Partition）。

ESP 对 UEFI 启动很重要，UEFI 的操作系统引导程序（后缀名为 `efi` 的文件）存放在 ESP 分区中，启动操作系统本质上就是运行 ESP 分区内的 *bootloader* 程序。

## Reference

- [基于 UEFI/GPT 的硬盘驱动器分区](https://learn.microsoft.com/zh-cn/windows-hardware/manufacture/desktop/configure-uefigpt-based-hard-drive-partitions?view=windows-11)

