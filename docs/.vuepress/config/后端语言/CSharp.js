const Core = [
  "./Core/CLI",
  "./Core/CSharp",
  "./Core/Standard Library",
  "./Core/WPF",
  "./Core/XAML",
];

const UI_组件 = ["./UI 组件/Syncfusion WPF UI"];

const 数据操作 = [
  "./数据操作/Entity Framework Core",
  "./数据操作/MySQL Connector",
  "./数据操作/Syncfusion Excel Framework",
];

const CSharp = [
  {
    title: "Core",
    children: Core,
  },
  {
    title: "UI 组件",
    children: UI_组件,
  },
  {
    title: "数据操作",
    children: 数据操作,
  },
];

module.exports = CSharp;
