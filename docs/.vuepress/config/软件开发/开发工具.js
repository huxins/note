const 编辑器 = [
  "IntelliJ IDEA",
  "Sublime Text 3",
  "Visual Studio Code",
  "Visual Studio",
];

const 办公套件 = ["Microsoft Excel"];

const 开发工具 = [
  {
    title: "编辑器",
    children: 编辑器,
  },
  {
    title: "办公套件",
    children: 办公套件,
  },
];

module.exports = 开发工具;
