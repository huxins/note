# Vite

[Vite](https://github.com/vitejs/vite) 是面向现代浏览器的极速开发工具，基于原生 ES 模块实现秒级启动和热更新，支持框架无关和按需编译。

## 一、架构

### 开发环境

```mermaid
graph LR
  A[源码] --> B[esbuild]
  B --> C[预构建依赖]
  C --> D[原生ESM加载]
  D --> E[浏览器执行]
```

### 生产环境

```mermaid
graph LR
  A[源码] --> B[Rollup]
  B --> C[代码分割]
  C --> D[Tree-Shaking]
  D --> E[优化产物]
```

## Reference

- [环境变量和模式](https://cn.vite.dev/guide/env-and-mode.html)

