# PDF

PDF（Portable Document Format）是一种用独立于应用程序、硬件、操作系统的方式呈现文档的文件格式。

## 一、坐标

PDF 的尺寸单位是 `points`，简称 `pt`（1 `inch` = 72 `pt`）。

PDF 需要做到设备无关，也就是在不同的显示器或打印机上，显示的长度都一致，所以不能采用像素做单位。

需要通过对应比例将 `pt` 转化为 `px`，常用显示器的转换比例：

| 尺寸 | 规格        | PPI  | 比例    |
| ---- | ----------- | ---- | ------- |
| 24   | 1920 * 1080 | 92   | 92 / 72 |

PDF 默认使用左下角为原点的坐标系，X 轴沿着水平方向从左往右递增，Y 轴沿着竖直方向，从下往上递增。

**数电发票**：标准高度为 `396`。

- 发票号码

  ```javascript
  {
      x: 480,     // 从左边缘开始的 pt 数
      y: 355,     // 从下边缘开始的 pt 数
      width: 100, // 区域宽度
      height: 10  // 区域高度
  }
  ```

- 开票日期

  ```javascript
  {
      x: 480,     // 从左边缘开始的 pt 数
      y: 335,     // 从下边缘开始的 pt 数
      width: 70,  // 区域宽度
      height: 10  // 区域高度
  }
  ```

## Reference

- [PDF Explained（译作《PDF 解析》）](https://zxyle.github.io/PDF-Explained/)
- [屏幕密度计算器](https://gongju.world/ppi/)
- [DPI / PPI 计算](https://www.zelyo.cn/tools/Pixelcal/Pixelcal.html)
- [获取 XY 坐标定位 - *e签宝*](https://open.esign.cn/doc/opendoc/saasapi-std/slg8r2)

