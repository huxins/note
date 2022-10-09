# Bootstrap

## 入门

### 概览

#### 快速开始

##### CSS

复制下面这行代码到 `<head>` 标签，以加载 Bootstrap 的样式表。

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css">
```

##### JS

大多数组件需要依赖 Javascript 来实现功能。Bootstrap 需要 [jQuery](https://jquery.com/), [Popper.js](https://popper.js.org/), 以及 Bootstrap 自带的 JS 来实现功能。请将以下代码添加到 `</body>` 标签之前。

```html
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js"></script>
```

#### 入门模板

```html
<!doctype html>
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

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js"></script>
  </body>
</html>
```

## 布局

### 概览

#### 容器

容器（Containers）是 Bootstrap 中最基本的布局基础。如果要使用栅格系统来进行布局时，容器会根据屏幕大小来选择合适的宽度，这是全自动的。

虽然容器可以嵌套，但大多数布局不需要嵌套容器。

```html
<div class="container">
  <!-- Content here -->
</div>
```

对于全宽容器，使用 `.container-fluid`，跨越 viewport 的整个宽度。

```html
<div class="container-fluid">
  ...
</div>
```

### 栅格系统

Bootstrap 的栅格系统使用一系列容器，行和列来布局和对齐内容。它是用 flexbox 构建的，并且完全响应。

```html
<div class="container">
  <div class="row bg-info">
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div>
  </div>
</div>
```

#### Grid options

虽然 Bootstrap 使用 `em` 或 `rem` 来定义大多数大小，但 `px` 用于栅格断点和容器宽度。这是因为 viewport 宽度以像素为单位，并且不随字体大小而变化。

通过[表格](https://getbootstrap.com/docs/4.3/layout/grid/#grid-options)了解 Bootstrap 栅格系统的各个方面如何跨多个设备工作：

|              | Extra small | Small      | Medium     | Large      | Extra large |
| ------------ | ----------- | ---------- | ---------- | ---------- | ----------- |
| Class prefix | `.col-`     | `.col-sm-` | `.col-md-` | `.col-lg-` | `.col-xl-`  |

#### 列的自动布局

##### 等宽

```html
<div class="container bg-info">
  <div class="row">
    <div class="col">
      1 of 2
    </div>
    <div class="col">
      2 of 2
    </div>
  </div>
  <div class="row">
    <div class="col">
      1 of 3
    </div>
    <div class="col">
      2 of 3
    </div>
    <div class="col">
      3 of 3
    </div>
  </div>
</div>
```

等宽列可以分成多行：

```html
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

##### 设置列宽

flexbox 栅格列的自动布局还可以设置一列的宽度，并让兄弟列自动调整其大小。

```html
<div class="container bg-info">
  <div class="row">
    <div class="col">
      1 of 3
    </div>
    <div class="col-6">
      2 of 3 (wider)
    </div>
    <div class="col">
      3 of 3
    </div>
  </div>
  <div class="row">
    <div class="col">
      1 of 3
    </div>
    <div class="col-5">
      2 of 3 (wider)
    </div>
    <div class="col">
      3 of 3
    </div>
  </div>
</div>
```

##### 可变宽度内容

使用 `col-{breakpoint}-auto` 类根据内容的自然宽度调整列的大小。

```html
<div class="container bg-info">
  <div class="row justify-content-md-center">
    <div class="col col-lg-2">
      1 of 3
    </div>
    <div class="col-md-auto">
      Variable width content
    </div>
    <div class="col col-lg-2">
      3 of 3
    </div>
  </div>
  <div class="row">
    <div class="col">
      1 of 3
    </div>
    <div class="col-md-auto">
      Variable width content
    </div>
    <div class="col col-lg-2">
      3 of 3
    </div>
  </div>
</div>
```

#### 响应式设计 CSS 类

Bootstrap 的栅格包括五层预定义类，用于构建复杂的响应式布局。根据你认为合适的额外小型，小型，中型，大型或超大型设备自定义列的大小。

##### 所有断点

对于从最小设备到最大设备相同的栅格，请使用 `.col` 和 `.col-*` 类。需要特别大小的列时，指定一个编号的类；否则，请只使用 `.col`。

```html
<div class="container bg-info">
  <div class="row">
    <div class="col">col</div>
    <div class="col">col</div>
    <div class="col">col</div>
    <div class="col">col</div>
  </div>
  <div class="row">
    <div class="col-8">col-8</div>
    <div class="col-4">col-4</div>
  </div>
</div>
```

#### 对齐

使用 flexbox 对齐工具垂直和水平对齐列。

##### 垂直对齐

列组在行中的垂直对齐方式：

- align-items-start
- align-items-center
- align-items-end

```html
<div class="container">
  <div class="row align-items-center bg-info" style="height:150px">
    <div class="col">
      One of three columns
    </div>
    <div class="col">
      One of three columns
    </div>
    <div class="col">
      One of three columns
    </div>
  </div>
</div>
```

单列在行中的垂直对齐方式：

- align-self-start
- align-self-center
- align-self-end

```html
<div class="container">
  <div class="row bg-info" style="height:150px">
    <div class="col align-self-start">
      One of three columns
    </div>
  </div>
</div>
```

##### 水平对齐

列组在行中的水平对齐方式：

- justify-content-start
- justify-content-center
- justify-content-end
- justify-content-around
- justify-content-between

```html
<div class="container">
  <div class="row justify-content-start bg-info">
    <div class="col-4">
      One of two columns
    </div>
    <div class="col-4">
      One of two columns
    </div>
  </div>
</div>
```

## 参考文献

- [tmplink/bootstrap4_chinese](https://github.com/tmplink/bootstrap4_chinese)
- [Bootstrap 4 Class Reference - W3Schools](https://www.w3schools.com/bootstrap4/bootstrap_ref_all_classes.asp)

## 参见

- [Bootstrap v4.3](https://getbootstrap.com/docs/4.3/getting-started/introduction/)

