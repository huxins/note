const Core = [
  "./Core/Python 标准库",
  "./Core/Python 提案",
  "./Core/Python",
  "./Core/包和模块",
  "./Core/内置函数和类型",
  "./Core/上下文管理器",
];

const Web = ["./Web/Flask 扩展", "./Web/Flask"];

const 工程化 = ["./工程化/pip", "./工程化/Pyenv", "./工程化/Setuptools"];

const 时间日期 = [
  "./时间日期/chinese-calendar",
  "./时间日期/dateutil",
  "./时间日期/holidays",
];

const 数据操作 = [
  "./数据操作/Beautiful Soup",
  "./数据操作/Boto3",
  "./数据操作/openpyxl",
  "./数据操作/pandas",
  "./数据操作/PyMySQL",
  "./数据操作/PyYAML",
  "./数据操作/Requests",
  "./数据操作/SQLAlchemy",
  "./数据操作/XlsxWriter",
  "./数据操作/xlwings",
];

const 通用组件 = ["./通用组件/Marshmallow", "./通用组件/Pydantic"];

const Python = [
  {
    title: "Core",
    children: Core,
  },
  {
    title: "Web",
    children: Web,
  },
  {
    title: "工程化",
    children: 工程化,
  },
  {
    title: "时间日期",
    children: 时间日期,
  },
  {
    title: "数据操作",
    children: 数据操作,
  },
];

module.exports = Python;
