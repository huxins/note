# AdminLTE

[AdminLTE](https://github.com/ColorlibHQ/AdminLTE) 是一个基于 Bootstrap 和 jQuery 的开源后台管理模板，提供丰富的 UI 组件和布局方案。

## 一、安装与依赖

```html
<!-- Bootstrap 4 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css">
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js"></script>

<!-- AdminLTE 核心文件 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/admin-lte@3.2/dist/css/adminlte.min.css">
<script src="https://cdn.jsdelivr.net/npm/admin-lte@3.2/dist/js/adminlte.min.js"></script>
```

## 二、布局系统

### 核心布局结构

[布局](https://adminlte.io/themes/AdminLTE/documentation/index.html#layout)包括四个主要部分：

- 包装器 `.wrapper`，包含整个网站的 `div`。
- 主标题 `.main-header`，包含 LOGO 和导航栏。
- 主侧边栏 `.main-sidebar`，包含侧边栏用户面板，搜索表单和菜单。
- 内容 `.content-wrapper`，包含页面标题和内容。

```html
<div class="wrapper">
  <!-- 预载器 -->
  <div class="preloader">...</div>
  
  <!-- 主标题 -->
  <nav class="main-header">...</nav>
  
  <!-- 主侧边栏 -->
  <aside class="main-sidebar">...</aside>
  
  <!-- 内容区域 -->
  <div class="content-wrapper">...</div>
</div>
```

### 预载器实现

```html
<div class="preloader flex-column justify-content-center align-items-center">
  <img src="imgextra.svg" alt="Loading" height="60" width="60">
</div>
```

## Reference

- [AdminLTE 中文文档](https://3vshej.cn/AdminLTE/)
- [AdminLTE 2](https://adminlte.io/themes/AdminLTE/documentation/index.html)
- [AdminLTE 3](https://adminlte.io/themes/v3/)

