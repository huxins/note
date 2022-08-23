# Diskpart

`diskpart` 命令解释器可帮助管理计算机的驱动器 (磁盘、分区、卷或虚拟硬盘) 。

## 语法

若要启动 diskpart 命令解释器，请在命令提示符下键入：

```
diskpart <parameter>
```

## 命令示例

显示计算机上的所有磁盘：

```sh
$ list disk
```

将焦点转移到磁盘：

```sh
$ select disk=<n>
```

从具有焦点的磁盘中删除所有分区或卷格式设置。

```sh
$ clean
```

显示当前磁盘的分区表中列出的分区。

```sh
$ list partition
```

将焦点转移到分区：

```sh
$ select partition=<n>
```

删除分区。

```sh
$ delete partition
```

