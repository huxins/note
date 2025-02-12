# 机械硬盘

[机械硬盘](https://zh.wikipedia.org/wiki/%E7%A1%AC%E7%9B%98)是电脑上使用坚硬的旋转磁性盘片为基础的非依电性存储器。

## 一、物理结构

硬盘的物理结构一般由磁头与盘片、电动机、主控芯片与排线等部件组成。

- **柱面**：从 0 开始编号。每个柱面由硬盘上的所有磁盘上的相同半径的所有磁道组成。

- **磁头**：从 0 开始编号。每个磁头对应一个磁盘面，硬盘上有多个磁盘面。

- **扇区**：从 1 开始编号。每个磁道被划分成若干扇区，扇区是硬盘读写的基本单位。

### 磁头

硬盘中一般会有多个盘片组成，每个盘片包含两个面，每个盘面都对应地有一个读写磁头。

盘片的编号自下向上从 0 开始，如最下边的盘片有 0 面和 1 面，再上一个盘片就编号为 2 面和 3 面。

![硬盘](https://ask.qcloudimg.com/http-save/yehe-2141641/hl841xd6on.png)

### 扇区

盘面中一圈圈的同心圆为一条条磁道，从圆心向外画直线，可以将磁道划分为若干个弧段，每个磁道上一个弧段被称之为一个扇区。

扇区是磁盘的最小组成单元，通常是 512 字节。由于不断提高磁盘的大小，部分厂商设定每个扇区的大小是 4096 字节。

![盘面](https://ask.qcloudimg.com/http-save/yehe-2141641/9me5eyp5tb.png)

### 柱面

硬盘通常由重叠的一组盘片构成，每个盘面都被划分为数目相等的磁道，并从外缘开始编号，具有相同编号的磁道形成一个圆柱，称之为磁盘的柱面。

磁盘的柱面数与一个盘面上的磁道数是相等的。由于每个盘面都有自己的磁头，因此，盘面数等于总的磁头数。

![柱面](https://ask.qcloudimg.com/http-save/yehe-2141641/tx1zz26zx6.png)

### 磁盘容量计算

```
存储容量 = (柱面（磁道）数 * 磁头数 * 每道扇区数 + 附加扇区数) * 每扇区字节数
```

### 磁盘读取响应时间

- **寻道时间**：磁头从开始移动到数据所在磁道所需要的时间，寻道时间越短，IO 操作越快。
- **旋转延迟**：盘片旋转将请求数据所在扇区移至读写磁头下方所需要的时间，旋转延迟取决于磁盘转速。普通硬盘一般都是 7200 RPM，慢的 5400 RPM。
- **数据传输时间**：完成传输所请求的数据所需要的时间。

## 二、逻辑结构

操作系统对硬盘进行读写时，需要用到文件系统把硬盘的扇区组合成簇，并建立文件和树形目录制度，使操作系统对其访问和查找变得容易。

块或簇是操作系统中最小的逻辑存储单位，在 Windows 下如 NTFS 等文件系统中叫做簇；在 Linux 下如 Ext4 等文件系统中叫做块。

每个簇或块可以包括 2<sup>n</sup> 个扇区。

## 三、4K 对齐

分区 4K 对齐是一种硬盘分区的方式，目的是优化磁盘的性能和寿命。

具体来说，4K 对齐是指分区的起始位置和大小是 4KB 的整数倍（通常为一个物理扇区大小）。这种对齐方式对于现代硬盘（特别是固态硬盘和高级格式硬盘）非常重要，因为它们的物理扇区大小通常为 4KB。

传统硬盘通常使用 512 字节的扇区大小。现代高级格式硬盘（Advanced Format）则使用 4KB（即 4096 字节）的扇区大小。

如果分区没有对齐，那么操作系统在读写数据时可能需要访问两个物理扇区（取决于簇大小，通常为 4096，4K 对齐后只需占用一个物理扇区），这会导致性能下降。对于固态硬盘，不对齐的读写操作会导致额外的写入放大效应，增加硬盘磨损，缩短其寿命。

