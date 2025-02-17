# Windows



## 二、命令



### diskpart

`diskpart` 可帮助管理计算机的驱动器（磁盘、分区、卷或虚拟硬盘）。

启动 `diskpart` 命令解释器，请在命令提示符下键入 `diskpart`。

显示计算机上的所有磁盘。

```powershell
list disk
```

将焦点切换到磁盘。

```powershell
select disk=<n>
```

从具有焦点的磁盘中删除所有分区或卷格式设置。

```powershell
clean
```

显示焦点磁盘的分区表。

```powershell
list partition
```

将焦点切换到分区。

```powershell
select partition=<n>
```

删除具有焦点的分区。

```powershell
delete partition
```

### fsutil

- fsutil **fsinfo**

  列出指定卷的特定于 NTFS 的卷信息。

  ```powershell
  fsutil fsinfo ntfsinfo C:
  ```

