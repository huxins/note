# Babel

[Babel](https://github.com/babel/babel) 是一个 JavaScript 编译器工具链，主要用于：

- 将 ECMAScript 2015+ 代码转换为向后兼容的 JS 语法
- 通过 Polyfill 方式提供目标环境缺失的特性支持
- 源码转换（如 JSX、TypeScript 等语法）

## 一、环境安装

通过 `npm` 安装核心组件：

```sh
npm install --save-dev @babel/core   # 核心编译库
npm install --save-dev @babel/cli    # 命令行工具
npm install --save-dev @babel/preset-env  # 智能预设
```

## 二、配置文件

在项目根目录创建 [`babel.config.json`](https://babel.dev/docs/configuration#babelconfigjson)：

```json
{
  "presets": [
    [
      "@babel/preset-env",  // 自动根据目标环境转换语法
      {
        "targets": {        // 可选浏览器兼容配置
          "chrome": "58",
          "ie": "11"
        }
      }
    ]
  ],
  "plugins": []            // 可添加其他插件
}
```

## 三、执行编译

通过 [CLI](https://babel.dev/docs/babel-cli) 编译单个文件：

```sh
npx babel main.js -o compiled.js
```

## 四、运行示例

完整工作流演示：

```sh
# 创建测试文件
echo "const fn = () => console.log('Hello Babel')" > main.js

# 执行编译
npx babel main.js -o compiled.js

# 查看转换结果
cat compiled.js
```

## Reference

- [Babel 中文文档](https://www.babeljs.cn/)
- [Babel 教程 - *姜瑞涛*](https://www.jiangruitao.com/babel/)

