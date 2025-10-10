# Bootstrap

[Bootstrap](https://getbootstrap.com/) 是一个开源的前端框架，提供响应式布局系统和预构建组件。

## 一、快速入门

### 环境准备

Bootstrap 需要 [jQuery](https://jquery.com/)、[Popper.js](https://popper.js.org/docs/v2/) 以及 Bootstrap 自带的 JS 来实现功能。

```html
<!-- CSS 引入 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css">

<!-- 依赖项（需放在 body 末尾） -->
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js"></script>
```

### 基础模板

一个简单的 Bootstrap 模板：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css">

    <title>Hello, world!</title>
  </head>
  <body>
    <h1>Hello, world!</h1>

    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js"></script>
  </body>
</html>
```

## 二、布局系统

### 容器类型

[容器](https://getbootstrap.com/docs/4.3/layout/overview/#containers)是 Bootstrap 中最基本的布局基础。

- **固定宽度容器**

  ```html
  <div class="container">...</div>
  ```

- **全屏容器**

  对于全宽容器，使用 `.container-fluid`，跨越 `viewport` 的整个宽度。

  ```html
  <div class="container-fluid">...</div>
  ```

### 栅格系统

Bootstrap 的[栅格系统](https://getbootstrap.com/docs/4.3/layout/grid/)基于容器、行、列的三层结构，通过 Flexbox 布局技术实现响应式内容对齐与排版，具备全响应式特性。

```html
<div class="container">
  <div class="row bg-info">
    <div class="col">列1</div>
    <div class="col">列2</div>
  </div>
</div>
```

#### 响应式断点

Bootstrap 虽主要采用 `em`/`rem` 定义常规尺寸，但其栅格系统的[断点阈值与容器宽度](https://getbootstrap.com/docs/4.3/layout/grid/#grid-options)仍基于 `px` 单位，因视口宽度以像素计量且与字体尺寸无关联。此设计确保响应式布局在不同设备间的精确适配。

| 设备类型 | 类前缀   | 适用宽度 |
| -------- | -------- | -------- |
| 超大屏幕 | .col-xl- | ≥1200px  |
| 大屏幕   | .col-lg- | ≥992px   |
| 中等屏幕 | .col-md- | ≥768px   |
| 小屏幕   | .col-sm- | ≥576px   |
| 超小屏幕 | .col-    | <576px   |

#### 列布局模式

- **等宽布局**

  ```html
  <div class="row bg-info">
    <div class="col">等宽列</div>
    <div class="col">等宽列</div>
  </div>
  
  <!-- 等宽列可以分成多行 -->
  <div class="container bg-info">
    <div class="row">
      <div class="col">Column</div>
      <div class="col">Column</div>
      <div class="w-100"></div>
      <div class="col">Column</div>
      <div class="col">Column</div>
    </div>
  </div>
  ```

- [**指定列宽**](https://getbootstrap.com/docs/4.3/layout/grid/#setting-one-column-width)

  ```html
  <div class="row">
    <div class="col-8">主内容</div>
    <div class="col-4">侧边栏</div>
  </div>
  ```

#### 对齐方式

- [垂直对齐](https://getbootstrap.com/docs/4.3/layout/grid/#vertical-alignment)：`align-items-[start/center/end]`

  ```html
  <div class="container">
    <div class="row align-items-center bg-info" style="height: 150px">
      <div class="col">One of three columns</div>
      <div class="col">One of three columns</div>
      <div class="col">One of three columns</div>
    </div>
  </div>
  
  <!-- 单列在行中的垂直对齐方式 -->
  <div class="container">
    <div class="row bg-info" style="height: 150px">
      <div class="col align-self-start">One of three columns</div>
    </div>
  </div>
  ```

- [水平对齐](https://getbootstrap.com/docs/4.3/layout/grid/#horizontal-alignment)：`justify-content-[start/center/end/between/around]`

  ```html
  <div class="container">
    <div class="row justify-content-start bg-info">
      <div class="col-4">One of two columns</div>
      <div class="col-4">One of two columns</div>
    </div>
  </div>
  ```

## 三、核心组件

### 表单系统

Bootstrap 通过[表单控件样式类](https://getbootstrap.com/docs/4.3/components/forms/)实现标准化渲染，开发者可通过选择性应用类名进行视觉定制，确保跨平台显示一致性。须注意为每个 `<input>` 元素声明语义化 `type` 属性，以激活浏览器原生验证及设备专属输入功能。

```html
<form>
  <div class="form-group">
    <label>邮箱</label>
    <input type="email" class="form-control">
  </div>
</form>
```

Bootstrap 通过[全局样式定义](https://getbootstrap.com/docs/4.3/components/forms/#layout)为表单元素强制设定 `display: block` 及 `width: 100%`，形成标准化垂直排列体系。开发者可通过应用[布局类](https://getbootstrap.com/docs/4.3/components/forms/#layout)实现水平排列等个性化需求。

- [**行内表单**](https://getbootstrap.com/docs/4.3/components/forms/#inline-forms)

  ```html
  <form class="form-inline">...</form>
  ```

- [**网格布局**](https://getbootstrap.com/docs/4.3/components/forms/#form-row)

  ```html
  <div class="form-row">
    <div class="col">
      <input type="text" class="form-control">
    </div>
  </div>
  ```

- [**水平表单**](https://getbootstrap.com/docs/4.3/components/forms/#horizontal-form)

  ```html
  <div class="form-group row">
    <label class="col-sm-2 col-form-label">密码</label>
    <div class="col-sm-10">
      <input type="password" class="form-control">
    </div>
  </div>
  ```

### 模态框

Bootstrap 通过原生 JavaScript [模态插件](https://getbootstrap.com/docs/4.3/components/modal/)实现动态弹层系统，支持灯箱提示、系统通知及自定义内容模块的灵活集成。开发者可通过 API 精确控制弹层行为，构建符合 WCAG 标准的无障碍交互组件。

```html
<div class="modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">标题</div>
      <div class="modal-body">内容</div>
      <div class="modal-footer">操作按钮</div>
    </div>
  </div>
</div>
```

模态插件通过数据属性或 JavaScript 按需切换隐藏内容：

- [**数据属性触发**](https://getbootstrap.com/docs/4.3/components/modal/#via-data-attributes)

  无需编写 JavaScript 即可激活模态。

  ```html
  <button type="button" data-toggle="modal" data-target="#myModal">Launch modal</button>
  ```

- [**JavaScript 控制**](https://getbootstrap.com/docs/4.3/components/modal/#via-javascript)

  ```javascript
  $('#myModal').modal('show');
  ```

## Reference

- [Bootstrap 中文网](https://www.bootcss.com/)
- [Bootstrap V4 中文镜像](https://code.z01.com/v4/)
- [Bootstrap Expo](https://expo.getbootstrap.com/)

