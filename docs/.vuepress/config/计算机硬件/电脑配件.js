const 鼠标 = ["./鼠标/罗技", "./鼠标/漫步者"];

const 电脑配件 = [
  "配置单",
  "显示器",
  {
    title: "鼠标",
    children: 鼠标,
  },
];

module.exports = 电脑配件;
