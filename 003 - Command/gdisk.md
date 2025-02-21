# GPT fdisk

[`gdisk`](https://www.rodsbooks.com/gdisk/) 是一个交互式 GUID 分区表操纵器。

## 一、选项

- -**l**：列出指定设备的分区表，然后退出。

## 二、用法

查看系统现有的块存储。

```sh
lsblk
```

[`gdisk`](https://www.rodsbooks.com/gdisk/gdisk.html) 通过在命令提示符下键入 `gdisk device` 来启动。

```sh
gdisk /dev/vdb
```

- 输入 **`p`** 打印分区表。
- 输入 **`n`** 创建一个新分区：选择分区号、起始扇区和结束扇区（`+5G`）。
- 输入 **`c`** 更改分区名称。
- 输入 **`w`** 写入新的分区表并退出。
- 输入 **`d`** 删除分区。
- 输入 **`t`** 更改[分区类型](https://zh.wikipedia.org/wiki/%E5%88%86%E5%8C%BA%E7%B1%BB%E5%9E%8B)。
- 输入 **`q`** 退出而不保存更改。

