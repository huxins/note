# mount

挂载文件系统。

## 语法

```
mount [-fnrsvw] [-t fstype] [-o options] device mountpoint
```

## 命令行选项

- **-t** *fstype*

指示文件系统类型。

## 例子

显示所有已安装的分区：

```sh
$ mount
```

将硬盘驱动器的第一个分区挂载到现有目录：

```sh
$ mount -t ext4 /dev/sda1 /media/data
```

参考物理磁盘分区卸载：

```sh
$ umount /dev/sda1
```

参照挂载点卸载：

```sh
$ umount /media/data
```

