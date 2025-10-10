# Intel NIC

> - [Intel NIC e1000e 硬件单元卡死 - *Reddit*](https://www.reddit.com/r/Proxmox/comments/1drs89s/intel_nic_e1000e_hardware_unit_hang/?tl=zh-hans)
> - [e1000e eno1: Detected Hardware Unit Hang - *Proxmox*](https://forum.proxmox.com/threads/e1000e-eno1-detected-hardware-unit-hang.59928/)
> - [解决 PVE 下 eno1 Detected Hardware Unit Hang 的问题 - *Pakro*](https://blog.pakro.top/2020/solve_the_problem_of_eno1_Detected_Hardware_Unit_Hang_under_PVE/)
> - [Performance with Intel i218/i219 NIC - *Hetzner*](https://docs.hetzner.com/robot/dedicated-server/troubleshooting/performance-intel-i218-nic/)
> - [什么是 TCP 分段卸载 - *Broadcom*](https://techdocs.broadcom.com/cn/zh-cn/vmware-cis/vsphere/vsphere/8-0/vsphere-networking-8-0/managing-network-resources/enabling-tso.html)
> - [适用于 Intel 千兆位以太网网络连接的 Linux 基础驱动程序 - *Intel*](https://www.intel.cn/content/www/cn/zh/support/articles/000005480/ethernet-products.html)
> - [Proxmox 主机与虚拟机全部断网问题排查与解决记录 - *黑风风*](https://blog.csdn.net/kaka_buka/article/details/148107029)

`e1000e` 是 Intel 板载网卡常用的驱动之一，如 HP 800 G4 DM 的板载网卡为 `I219-LM`，驱动为 `e1000e`。

```
e1000e 0000:00:1f.6 eno1: Detected Hardware Unit Hang
```

如出现以上日志，表示网卡在发送数据过程中，硬件 DMA 通道或描述符环发生了死锁/卡顿，系统层无法恢复，导致网卡功能彻底丧失。

```sh
# 查看网卡型号
lspci | grep Ethernet
# 查看网卡驱动
ethtool -i eno1
# 列出每个网口的详细信息
lshw -c network
# 查看网卡状态
dmesg | grep e1000e
dmesg | grep eno1
# 关闭网卡 TCP 分段卸载
ethtool -K eno1 tso off gso off
```

