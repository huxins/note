# Vue CLI

[Vue CLI](https://cli.vuejs.org/zh/) 现已处于维护模式。

## 一、核心功能

### 项目脚手架

- vue [**create**](https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create)

  创建新项目，支持预设配置和交互式选项。

  ```sh
  # 创建新项目（需要交互式配置）
  vue create my-project
  
  # 使用预设配置创建
  vue create my-project --preset preset-name
  ```

### 配置检查

- vue [**inspect**](https://cli.vuejs.org/zh/guide/webpack.html#%E5%AE%A1%E6%9F%A5%E9%A1%B9%E7%9B%AE%E7%9A%84-webpack-%E9%85%8D%E7%BD%AE)

  输出 webpack 最终配置，便于调试和验证。

  ```sh
  # 输出完整配置
  vue inspect > webpack.config.log
  
  # 查看特定规则
  vue inspect module.rules
  ```

## 二、开发工作流

### 本地开发

```sh
# 启动开发服务器
npm run serve

# 构建生产版本
npm run build

# 执行代码检查
npm run lint
```

