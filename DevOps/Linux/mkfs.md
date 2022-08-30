# mkfs

`mkfs` 是用于格式化具有特定文件系统的块存储设备的命令。

## 语法

```
mkfs [options] [-t type] [fs-options] device [size]
```

## 命令行选项

- **-t ** *type*

指定要构建的文件系统的类型。如果未指定，则使用默认文件系统类型（当前为 ext2）。

