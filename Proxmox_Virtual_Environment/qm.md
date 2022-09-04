# Qemu/KVM Virtual Machine Manager

## 语法

### importdisk

将外部磁盘映像导入为 VM 中未使用的磁盘。

```
qm importdisk <vmid> <source> <storage> [OPTIONS]
```

使用 `local-lvm` 存储将磁盘映像添加到 VM：

```sh
$ qm importdisk 100 openwrt.qcow2 local-lvm
```

### unlock

解锁虚拟机。

```
qm unlock <vmid>
```

### stop

停止虚拟机。*qemu* 进程将立即退出。这类似于拔掉正在运行的计算机的电源插头，可能会损坏 VM 数据。

```
qm stop <vmid> [OPTIONS]
```

### status

显示虚拟机状态。

```
qm status <vmid> [OPTIONS]
```

## 参见

- [Qemu/KVM Virtual Machine Manager - Proxmox VE](https://pve.proxmox.com/pve-docs/qm.1.html)

