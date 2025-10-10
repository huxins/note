const UI_组件 = [
  "./UI 组件/AdminLTE",
  "./UI 组件/Bootstrap",
  "./UI 组件/DataTables",
  "./UI 组件/Font Awesome",
];

const 工程化 = [
  "./工程化/Babel",
  "./工程化/Parcel",
  "./工程化/RequireJS",
  "./工程化/Vite",
];

const 通用组件 = [
  "./通用组件/CryptoJS",
  "./通用组件/jQuery",
  "./通用组件/PDF.js",
];

const Vanilla = [
  "代码质量",
  "前端组件化",
  "网页渲染模式",
  {
    title: "UI 组件",
    children: UI_组件,
  },
  {
    title: "工程化",
    children: 工程化,
  },
  {
    title: "通用组件",
    children: 通用组件,
  },
];

module.exports = Vanilla;
