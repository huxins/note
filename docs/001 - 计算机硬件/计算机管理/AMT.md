# AMT

带外管理（OOBM）使 IT 管理员更灵活地管理其 PC 和设备机组。

利用面向 Windows 操作系统的英特尔 vPro 企业平台上特有的英特尔[主动管理技术](https://www.intel.cn/content/www/cn/zh/architecture-and-technology/vpro/vpro-manageability/overview.html)（AMT），即使发生设备断电或操作系统无反应，IT 管理员仍然可以远程管理和修复 PC。

CPU 的 vPro 支持一共有三个类别：

> Intel **vPro Platform** 是 12 代之前英特尔的叫法。无论是什么 CPU，只要支持 vPro 就一定支持全功能的 vPro Platform。
>
> 在 12 代及以后，英特尔把 Intel vPro Platform 拆成了两个部分，分别为 Intel **vPro Enterprise** 和 Intel **vPro Essentials**。
>
> 其中，Enterprise 是针对大企业推出的完整版功能的 vPro，与原来的 Platform 是一样的，仅仅只是名字上的区别。
>
> 而 Essentials 则是针对于中小企业推出的轻量版 vPro，功能上会少一些高级远程管理功能。

- [Platform](https://www.intel.cn/content/www/cn/zh/products/sku/129937/intel-core-i58600-processor-9m-cache-up-to-4-30-ghz/specifications.html)
- [Enterprise](https://www.intel.cn/content/www/cn/zh/products/sku/236793/intel-core-i9-processor-14900-36m-cache-up-to-5-80-ghz/specifications.html)
- [Essentials](https://www.intel.cn/content/www/cn/zh/products/sku/232147/intel-core-i513500h-processor-18m-cache-up-to-4-70-ghz/specifications.html)

## AMT 配置

Intel vPro 即 AMT 配置，开机 Logo 时按 `Enter`，然后按 `Ctrl + P` 进入 AMT 配置页面。

默认密码是 `admin`，修改密码，打开所有配置，设置好 IP 地址。

选择 `Activate Network Access` 以允许通过网络访问 AMT。

> 进入操作系统，打开设备管理器，展开系统设备一栏，如果能看到 `Intel Management Engine Interface` 说明启用 AMT 成功。

## AMT 控制

- [HTTP](http://192.168.9.50:16992/)

## Reference

- [免费无线带外远程管理方案：iAMT/vPro 进阶实战（上）](https://mp.weixin.qq.com/s/vruWavQsKoUzaV_HA-MODA)
- [英特尔 vPro-AMT 远程管理教程](https://www.bilibili.com/opus/951760079923707912)
- [MeshCommander](https://www.meshcommander.com/meshcommander)

