const Core = [
  "./Core/java_jdbc",
  "./Core/java_se",
  "./Core/java_servlet",
  "./Core/java_spec",
];

const Spring = [
  "./Spring/java_spring_ioc",
  "./Spring/java_spring_jdbc",
  "./Spring/java_spring_mvc",
  "./Spring/java_spring_utils",
];

const 通用组件 = [
  "./通用组件/java_library_alibaba_druid",
  "./通用组件/java_library_apache_commons",
  "./通用组件/java_library_cglib",
  "./通用组件/java_library_jackson",
];

const Java = [
  {
    title: "Core",
    children: Core,
  },
  {
    title: "Spring",
    children: Spring,
  },
  {
    title: "通用组件",
    children: 通用组件,
  },
];

module.exports = Java;
