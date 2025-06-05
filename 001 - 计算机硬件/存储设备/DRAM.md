# DRAM

[DRAM](https://zh.wikipedia.org/wiki/%E5%8A%A8%E6%80%81%E9%9A%8F%E6%9C%BA%E5%AD%98%E5%82%A8%E5%99%A8) 是一种半导体存储器，通常被用作主存储器，用于存储运行中的程序和数据。

DRAM 拥有非常高的密度，单位体积的容量较高，成本也较低。但相反的，DRAM 也有访问速度较慢，耗电量较大的缺点。为了进一步提高速度，开发了 SDRAM，操作与外部时钟同步，以实现高速运行。如今，DRAM 一般都指 SDRAM。

- [**DDR SDRAM**](https://zh.wikipedia.org/wiki/DDR_SDRAM)：双倍数据率同步动态随机存储器（Double Data Rate Synchronous Dynamic Random Access Memory）
- [DDR4 SDRAM](https://zh.wikipedia.org/wiki/DDR4_SDRAM)
- [DDR5 SDRAM](https://zh.wikipedia.org/wiki/DDR5_SDRAM)
- **DIMM**：双列直插式存储器模块（Dual In-line Memory Module）
- **SO-DIMM**：小外形双列直插式内存模块（Small Outline Dual In-line Memory Module）

## 内存颗粒

目前市场上，主流内存颗粒生产商是三星、海力士、镁光。

- [颗粒天梯图 - *寒哥评测室*](https://www.bilibili.com/video/BV15exPe4E1Q?t=330.8)

目前单根容量大于 24GB 的内存，基本是双面颗粒，其温度、延迟、超频性能都不如单面颗粒的内存。

## 内存频率

```
读写速度 = 内存频率 * 64 * 通道数 / 8
```

内存工作频率受到内存控制器的制约，从 11 代酷睿处理器开始，Intel 就紧跟 AMD 锐龙的步伐，引入「内存分频机制」。

Intel 12 和 13 代 Non-K CPU 会锁 SA 电压，使用 D4 内存频率超过 3200Mhz，大概率会进入 Gear 2 分频模式；使用 D5 内存频率推荐 6400MHz。K CPU 使用 D4 内存，可上到 4000 Mhz；D5 内存根据主板的不同，可上到 7000 甚至是 8000+MHz。

## 内存时序

内存时序是描述内存条性能的一种参数，一般存储在内存条的 SPD 中。

- [内存时序 - *英睿达*](https://www.crucial.cn/articles/about-memory/what-is-the-memory-timing-sequence)

|   缩写   |             全称              |                             说明                             |           影响性能的关键点           |
| :------: | :---------------------------: | :----------------------------------------------------------: | :----------------------------------: |
|  **CL**  | CAS Latency (列地址访问延迟)  | 从发送读指令到收到第一个数据的时间周期数。**数值越低，数据响应越快**。 | **直接决定内存延迟**，对性能最敏感。 |
| **tRCD** | RAS to CAS Delay (行到列延迟) | 激活行地址后，需等待多久才能访问列地址的周期数。**影响内存切换存储行的效率**。 |   过高会降低多任务处理的响应速度。   |
| **tRP**  | RAS Precharge (行预充电时间)  | 关闭当前行地址后，需等待多久才能激活新行地址的周期数。**影响内存切换存储行的速度**。 |      过高会导致行切换延迟增加。      |
| **tRAS** | Row Active Time (行激活时间)  | 行地址激活后必须保持开启的最短周期数。**需满足：tRAS ≥ CL + tRCD + 2**（否则会不稳定）。 | 过低导致数据错误，过高拖累带宽效率。 |

同频率下，CL 值越小内存条性能越好。从 DDR1 - DDR4 随着内存条的频率越来越高，CL 值也越来越大，但是其真实的 CL 延迟时间几乎没有什么变化。

> 乘 2 的原因是 DDR 内存一个时钟周期内传输两次数据，可以看做基数是 2

```
DDR-400 3-3-3-8：3*2/400 = 15 ns
DDR2-800 6-6-6-18：6*2/800 = 15 ns
DDR3-1333 9-9-9-24：9*2/1333 = 13.5 ns
DDR4-2133 15-15-15-35：15*2/2133 = 14 ns
DDR4-2400 17-17-17-39：17*2/2400 = 14 ns
DDR4-3200 22-22-22-52：22*2/3200 = 13.7 ns
```

## 内存超频

- [XMP](https://www.intel.cn/content/www/cn/zh/gaming/extreme-memory-profile-xmp.html)
- [EXPO](https://www.amd.com/zh-cn/products/processors/technologies/expo.html)

## 内存品牌

- 宜鼎/Innodisk

