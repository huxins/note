# GPT fdisk

`gdisk` 是一个交互式 GUID 分区表操纵器。

## 语法

```
gdisk [ -l ] device
```

## 命令行选项

- **-l**

列出指定设备的分区表，然后退出。

## 用法

`gdisk` 通过在命令提示符下键入 `gdisk device` 来启动。

输入 **`p`** 打印分区表。

输入 **`d`** 删除分区。

输入 **`t`** 更改分区类型。

输入 **`c`** 更改分区名称。

输入 **`n`** 创建一个新分区。

输入 **`q`** 退出而不保存更改。

输入 **`w`** 写入新的分区表并退出。

## 参考文献

- [Partition type GUIDs - Wikipedia](https://en.wikipedia.org/wiki/GUID_Partition_Table#Partition_type_GUIDs)

## 参见

- [GDISK](https://www.rodsbooks.com/gdisk/gdisk.html)

