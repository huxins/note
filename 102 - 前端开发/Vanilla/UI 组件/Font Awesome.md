# Font Awesome

[Font Awesome](https://fontawesome.com/) 是互联网上广泛使用的图标库和工具包，被数百万设计师、开发人员和内容创作者使用。

## 一、快速安装

### 通过 CDN 引入

自己下载和托管 [Font Awseome](https://docs.fontawesome.com/v5/web/setup/host-font-awesome-yourself) 是很好的选择。

```html
<!-- CSS 版本 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/css/all.css">

<!-- JavaScript 版本（包含所有功能） -->
<script defer src="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/js/all.js"></script>
```

### 包管理器安装

```sh
# npm
npm install @fortawesome/fontawesome-free

# yarn
yarn add @fortawesome/fontawesome-free
```

## 二、使用指南

### 基础用法

```html
<!-- 使用 solid 样式图标 -->
<i class="fas fa-camera"></i>

<!-- 使用 regular 样式图标 -->
<i class="far fa-address-book"></i>

<!-- 使用品牌图标 -->
<i class="fab fa-github"></i>
```

### 框架集成

- **React**：使用 [`@fortawesome/react-fontawesome`](https://docs.fontawesome.com/v5/web/use-with/react) 包
- **Vue**：推荐使用 [`vue-fontawesome`](https://docs.fontawesome.com/v5/web/use-with/vue) 组件
- **Angular**：官方提供 [`angular-fontawesome`](https://docs.fontawesome.com/v5/web/use-with/angular) 包

## Reference

- [Versions of Font Awesome](https://fontawesome.com/versions)
  - [Font Awesome 4](https://fontawesome.com/v4/)
  - [Font Awesome Docs Version 5](https://docs.fontawesome.com/v5)
- [Font Awesome 5 中文文档](https://fa5.dashgame.com/)

