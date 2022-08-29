# Logical Volume Manager

在 Linux 中，逻辑卷管理器 (LVM) 是一个设备映射器框架，它为 Linux 内核提供逻辑卷管理。

## 基本术语

- **Physical Volume：**物理卷是 LVM 使用的常规物理磁盘分区的另一个名称。
- **Volume Group：**卷组，创建在 PV 上，由一个或多个 PV 组成，可以在 VG 上创建一个或多个 LV，功能类似非 LVM 系统的物理硬盘。
- **Logical Volume：**每个逻辑卷都可以单独格式化，功能类似非 LVM 系统的磁盘分区。
- **Physical Extent**：物理卷中可以分配的最小存储单元称为 PE，PE 的大小是可以指定的。
- **Logical Extent：**逻辑卷中可以分配的最小存储单元称为 LE，在同一个卷组中，LE 的大小和 PE 的大小是一样的，并且一一对应。

