const 显卡 = ["./显卡/迷你显卡"];

const 鼠标 = ["./鼠标/罗技", "./鼠标/漫步者"];

const USB = ["./USB/转接线"];

const SATA = ["./SATA/SATA DOM"];

const PCIe = ["./PCIe/转接卡"];

const 机架 = ["./机架/3D 打印"];

const 电脑配件 = [
  "配置单",
  "显示器",

  {
    title: "显卡",
    children: 显卡,
  },
  {
    title: "鼠标",
    children: 鼠标,
  },
  {
    title: "USB",
    children: USB,
  },
  {
    title: "SATA",
    children: SATA,
  },
  {
    title: "PCIe",
    children: PCIe,
  },
  {
    title: "机架",
    children: 机架,
  },
];

module.exports = 电脑配件;
