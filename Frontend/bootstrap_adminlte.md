# AdminLTE

## 入门

### 快速开始

#### CSS

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/admin-lte@3.2/dist/css/adminlte.min.css">
```

#### JS

```html
<script src="https://cdn.jsdelivr.net/npm/admin-lte@3.2/dist/js/adminlte.min.js"></script>
```

## 布局

布局包括 4 个主要部分：

- 包装器 `.wrapper`。包含整个网站的 div。
- 主标题 `.main-header`。包含 LOGO 和导航栏。
- 主侧边栏 `.main-sidebar`。包含侧边栏用户面板，搜索表单和菜单。
- 内容 `.content-wrapper`。包含页面标题和内容。

### 预载器

```html
<div class="wrapper">
    <div class="preloader flex-column justify-content-center align-items-center">
        <img class="animation__shake" src="imgextra.svg" alt="AdminLTELogo" height="60" width="60">
    </div>
</div>
```

## 组件

### 主标题

主标题包含导航栏。导航栏结构与 Bootstrap 略有不同，因为它有 Bootstrap 不提供的组件。导航栏可以通过两种方式创建。

这是常规导航栏的示例：

```html
<div class="wrapper">
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        ...
    </nav>
</div>
```

左侧导航栏：

```html
<ul class="navbar-nav">
    <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
    </li>
    <li class="nav-item d-none d-sm-inline-block">
        <a href="index.html" class="nav-link">主页</a>
    </li>
    <li class="nav-item d-none d-sm-inline-block">
        <a href="#" class="nav-link">联系</a>
    </li>
</ul>
```

右侧导航栏：

```html
<ul class="navbar-nav ml-auto">
    <li class="nav-item">
        <a class="nav-link" data-widget="fullscreen" href="#" role="button">
            <i class="fas fa-expand-arrows-alt"></i>
        </a>
    </li>
    <li class="nav-item">
        <a class="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
            <i class="fas fa-th-large"></i>
        </a>
    </li>
</ul>
```

### 主侧边栏

主侧边栏容器：

```html
<div class="wrapper">
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
        ...
    </aside>
</div>
```

品牌 Logo：

```html
<div class="brand-link d-flex justify-content-center align-items-center">
    <a class="brand-link" href="index.html">
        <span class="brand-text font-weight-light">AdminLTE 3</span>
    </a>
</div>
```

侧边栏菜单：

```html
<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <div class="sidebar">
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li class="nav-item">
                    <a href="#" class="nav-link">
                        <i class="nav-icon fas fa-th"></i>
                        <p>简单的链接</p>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</aside>
```

### 页面内容

页面内容容器：

```html
<div class="content-wrapper">
    ...
</div>
```

页面标题：

```html
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">起始页</h1>
            </div>
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="#">主页</a></li>
                    <li class="breadcrumb-item active">起始页</li>
                </ol>
            </div>
        </div>
    </div>
</div>
```

主体内容：

```html
<div class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">卡片标题</h5>
                        <p class="card-text">
                            简要内容在标题上填写，
                            余下的内容在主体部分填写。
                        </p>
                        <a href="#" class="card-link">卡片链接</a>
                        <a href="#" class="card-link">另一个链接</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
```

### 卡片

默认卡片：

```html
<div class="card">
    <div class="card-header">
        <h3 class="card-title">默认卡片示例</h3>
    </div>
    <div class="card-body">
        这里是卡片内容
    </div>
    <div class="card-footer">
        这里是卡片底部
    </div>
</div>
```

卡片工具：

```html
<div class="card-header">
    <h3 class="card-title">默认卡片示例</h3>
    <div class="card-tools">
        <button type="button" class="btn btn-tool" data-card-widget="maximize"><i class="fas fa-expand"></i></button>
        <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i></button>
        <button type="button" class="btn btn-tool" data-card-widget="remove"><i class="fas fa-times"></i></button>
    </div>
</div>
```

## 参考文献

- [wangyouworld/AdminLTE_CN](https://github.com/wangyouworld/AdminLTE_CN)

