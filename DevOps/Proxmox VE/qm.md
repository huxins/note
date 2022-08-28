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

## 参见

- [Qemu/KVM Virtual Machine Manager - Proxmox VE](https://pve.proxmox.com/pve-docs/qm.1.html)

