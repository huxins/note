# RAID

- **JBOD**
  - Unraid
  - LVM

## 数据完整性

为避免静默数据损坏（URE），应定期后台巡检。

URE 已在文件系统层面解决：

- [Btrfs](https://www.synology.cn/zh-cn/dsm/Btrfs)
- ZFS

Raid 5 可能因为 URE 而重建失败。

