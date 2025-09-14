# QEMU disk image utility

[`qemu-img`](https://www.qemu.org/docs/master/tools/qemu-img.html) 允许离线创建、转换和修改图像。它可以处理 QEMU 支持的所有图像格式。

## 语法

```
qemu-img [standard options] command [command options]
```

## 命令

### Check

对磁盘映像 *FILENAME* 执行一致性检查。

```sh
qemu-img check openwrt.qcow2
```

### Convert

将磁盘映像 *FILENAME* 或快照 *SNAPSHOT_PARAM* 转换为 *OUTPUT_FMT* 格式的磁盘映像 *OUTPUT_FILENAME*。

- -**f**：源磁盘映像格式。
- -**O**：目标磁盘映像格式。

将 VMware `.vmdk` 磁盘映像转换为 KVM `.qcow2` 磁盘映像。

```sh
qemu-img convert -f vmdk -O qcow2 path/to/file/foo.vmdk path/to/file/foo.qcow2
```

