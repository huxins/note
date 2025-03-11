# Bootstrap

## 一、介绍

Bootstrap 的样式表：

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css">
```

大多数组件需要依赖 Javascript 来实现功能。

Bootstrap 需要 [jQuery](https://jquery.com/)，[Popper.js](https://popper.js.org/) 以及 Bootstrap 自带的 JS 来实现功能。

请将以下代码添加到 `body` 标签最后。

```html
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js"></script>
```

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

## 二、布局

### 容器

容器是 Bootstrap 中最基本的布局基础。如果要使用栅格系统来进行布局，容器会根据屏幕大小来选择合适的宽度，这是全自动的。

虽然容器可以嵌套，但大多数布局不需要嵌套容器。

```html
<div class="container">
  <!-- Content here -->
</div>
```

对于全宽容器，使用 `.container-fluid`，跨越 `viewport` 的整个宽度。

```html
<div class="container-fluid">
  <!-- Content here -->
</div>
```

### 栅格系统

Bootstrap 的栅格系统使用一系列容器，行和列来布局和对齐内容。它是用 `flexbox` 构建的，并且完全响应。

```html
<div class="container">
  <div class="row bg-info">
    <div class="col-sm">One of three columns</div>
    <div class="col-sm">One of three columns</div>
    <div class="col-sm">One of three columns</div>
  </div>
</div>
```

#### 选项

虽然 Bootstrap 使用 `em` 或 `rem` 来定义大多数大小，但 `px` 用于栅格断点和容器宽度。这是因为 `viewport` 宽度以像素为单位，并且不随字体大小而变化。

通过 [Grid options](https://getbootstrap.com/docs/4.3/layout/grid/#grid-options) 了解 Bootstrap 栅格系统的各个方面如何跨多个设备工作：

|              | Extra small | Small      | Medium     | Large      | Extra large |
| ------------ | ----------- | ---------- | ---------- | ---------- | ----------- |
| Class prefix | `.col-`     | `.col-sm-` | `.col-md-` | `.col-lg-` | `.col-xl-`  |

#### 列的自动布局

- **等宽**

  ```html
  <div class="container bg-info">
    <div class="row">
      <div class="col">1 of 2</div>
      <div class="col">2 of 2</div>
    </div>
    <div class="row">
      <div class="col">1 of 3</div>
      <div class="col">2 of 3</div>
      <div class="col">3 of 3</div>
    </div>
  </div>
  ```

  - 等宽列可以分成多行

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

- **设置列宽**

  `flexbox` 栅格列的自动布局还可以设置一列的宽度，并让兄弟列自动调整其大小。

  ```html
  <div class="container bg-info">
    <div class="row">
      <div class="col">1 of 3</div>
      <div class="col-6">2 of 3 (wider)</div>
      <div class="col">3 of 3</div>
    </div>
    <div class="row">
      <div class="col">1 of 3</div>
      <div class="col-5">2 of 3 (wider)</div>
      <div class="col">3 of 3</div>
    </div>
  </div>
  ```

  - 可变宽度内容

    使用 `col-{breakpoint}-auto` 类根据内容的自然宽度调整列的大小。

    ```html
    <div class="container bg-info">
      <div class="row justify-content-md-center">
        <div class="col col-lg-2">1 of 3</div>
        <div class="col-md-auto">Variable width content</div>
        <div class="col col-lg-2">3 of 3</div>
      </div>
      <div class="row">
        <div class="col">1 of 3</div>
        <div class="col-md-auto">Variable width content</div>
        <div class="col col-lg-2">3 of 3</div>
      </div>
    </div>
    ```

- **响应式设计**

  Bootstrap 的栅格包括五层预定义类，用于构建复杂的响应式布局。根据你认为合适的额外小型，小型，中型，大型或超大型设备自定义列的大小。

  - 所有断点

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

- **对齐**

  使用 `flexbox` 对齐工具垂直和水平对齐列。

  - 垂直对齐

    列组在行中的垂直对齐方式：

    - `align-items-start`
    - `align-items-center`
    - `align-items-end`

    ```html
    <div class="container">
      <div class="row align-items-center bg-info" style="height: 150px">
        <div class="col">One of three columns</div>
        <div class="col">One of three columns</div>
        <div class="col">One of three columns</div>
      </div>
    </div>
    ```

    单列在行中的垂直对齐方式：

    - `align-self-start`
    - `align-self-center`
    - `align-self-end`

    ```html
    <div class="container">
      <div class="row bg-info" style="height: 150px">
        <div class="col align-self-start">One of three columns</div>
      </div>
    </div>
    ```

  - 水平对齐

    列组在行中的水平对齐方式：

    - `justify-content-start`
    - `justify-content-center`
    - `justify-content-end`
    - `justify-content-around`
    - `justify-content-between`

    ```html
    <div class="container">
      <div class="row justify-content-start bg-info">
        <div class="col-4">One of two columns</div>
        <div class="col-4">One of two columns</div>
      </div>
    </div>
    ```

## 三、组件

### 表单

Bootstrap 的表单控件通过类扩展了表单样式。使用这些类来选择自定义显示，以在浏览器和设备之间实现更一致的呈现。

请务必在所有 `input` 上使用适当的 `type` 属性，以利用较新的输入控件，如电子邮件验证、号码选择等。

这是一个演示 Bootstrap 表单样式的示例：

```html
<form>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
  <div class="form-group form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

由于 Bootstrap 将 `display: block` 和 `width: 100%` 应用于几乎所有的表单控件，默认情况下表单将垂直堆叠。可以使用其他类在每个表单的基础上改变此布局。

- **表单组**

  `.form-group` 类是向表单添加一些结构的最简单方法。它提供了一个灵活的类，鼓励对标签、控件、可选的帮助文本和表单验证消息进行适当的分组。默认情况下，它只应用 `margin-bottom`，但它会根据需要在 `.form-inline` 中选择其他样式。将它与 `fieldset`、`div` 或几乎任何其他元素一起使用。

  ```html
  <form>
    <div class="form-group">
      <label for="formGroupExampleInput">Example label</label>
      <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input">
    </div>
    <div class="form-group">
      <label for="formGroupExampleInput2">Another label</label>
      <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input">
    </div>
  </form>
  ```

- **表单栅格**

  可以使用栅格系统构建更复杂的表单。将这些用于需要多列、不同宽度和其他对齐选项的表单布局。

  ```html
  <form>
    <div class="row">
      <div class="col">
        <input type="text" class="form-control" placeholder="First name">
      </div>
      <div class="col">
        <input type="text" class="form-control" placeholder="Last name">
      </div>
    </div>
  </form>
  ```

  - **Form row**

    也可以将 `.row` 换成 `.form-row`，这是标准网格行的一种变体，它会覆盖默认的列间距，以获得更紧凑的布局。

    ```html
    <form>
      <div class="form-row">
        <div class="col">
          <input type="text" class="form-control" placeholder="First name">
        </div>
        <div class="col">
          <input type="text" class="form-control" placeholder="Last name">
        </div>
      </div>
    </form>
    ```

    还可以使用网格系统创建更复杂的布局。

    ```html
    <form>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputEmail4">Email</label>
          <input type="email" class="form-control" id="inputEmail4" placeholder="Email">
        </div>
        <div class="form-group col-md-6">
          <label for="inputPassword4">Password</label>
          <input type="password" class="form-control" id="inputPassword4" placeholder="Password">
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Sign in</button>
    </form>
    ```

  - **水平表单**

    通过添加 `.row` 类来形成组并使用 `.col-*-*` 类来指定标签和控件的宽度，使用网格创建水平表单。请务必将 `.col-form-label` 添加到您的 `label` 中，以便它们与关联的表单控件垂直居中。

    有时，您可能需要使用 `margin` 或 `padding` 工具来创建所需的完美对齐。例如，我们移除了堆叠单选输入标签上的 `padding-top` 以更好地对齐文本基线。

    ```html
    <form>
      <div class="form-group row">
        <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">
          <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
        </div>
      </div>
      <div class="form-group row">
        <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
        <div class="col-sm-10">
          <input type="password" class="form-control" id="inputPassword3" placeholder="Password">
        </div>
      </div>
      <fieldset class="form-group">
        <div class="row">
          <legend class="col-form-label col-sm-2 pt-0">Radios</legend>
          <div class="col-sm-10">
            <div class="form-check">
              <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked>
              <label class="form-check-label" for="gridRadios1">
                First radio
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2">
              <label class="form-check-label" for="gridRadios2">
                Second radio
              </label>
            </div>
            <div class="form-check disabled">
              <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3" disabled>
              <label class="form-check-label" for="gridRadios3">
                Third disabled radio
              </label>
            </div>
          </div>
        </div>
      </fieldset>
      <div class="form-group row">
        <div class="col-sm-2">Checkbox</div>
        <div class="col-sm-10">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="gridCheck1">
            <label class="form-check-label" for="gridCheck1">
              Example checkbox
            </label>
          </div>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-sm-10">
          <button type="submit" class="btn btn-primary">Sign in</button>
        </div>
      </div>
    </form>
    ```

- **水平 forms**

  使用 `.form-inline` 类在单个水平行上显示一系列标签、表单控件和按钮。内联表单中的表单控件与其默认状态略有不同。

### 模态框

使用 Bootstrap 的 JavaScript 模态插件将对话框添加到您的站点以获取灯箱、用户通知或完全自定义的内容。

- 模态组件是用 HTML、CSS 和 JavaScript 构建的。它们位于文档中的所有其他内容之上，并从 `body` 中删除滚动，以便模态内容滚动。
- 单击模态框背景将自动关闭模态。
- Bootstrap 一次只支持一个模态窗口。不支持嵌套模式，因为我们认为它们是糟糕的用户体验。
- Modals 使用 `position: fixed`，有时它的渲染有点特别。只要有可能，将模态 HTML 放在顶级位置，以避免受到其他元素的潜在干扰。在另一个固定元素中嵌套 `.modal` 时，您可能会遇到问题。
- 再一次，由于 `position: fixed`，在移动设备上使用模态框有一些注意事项。
- 由于 HTML5 定义其语义的方式，`autofocus` HTML 属性在 Bootstrap 模态中无效。

下面是一个静态模态示例。包括模态页眉、模态主体和模态页脚。我们要求您尽可能在模态标题中包含关闭操作，或者提供另一个明确的关闭操作。

```html
<div class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
```

模态插件通过数据属性或 JavaScript 按需切换隐藏内容。它还将 `.modal-open` 添加到 `body` 以覆盖默认滚动行为，并生成一个 `.modal-backdrop` 以提供点击区域，以便在点击模态外时关闭显示的模态。

- 数据属性

  无需编写 JavaScript 即可激活模态。在控制器元素上设置 `data-toggle="modal"` 以及 `data-target="#foo"` 或 `href="#foo"` 以针对要切换的特定模态。

  ```html
  <button type="button" data-toggle="modal" data-target="#myModal">Launch modal</button>
  ```

- JavaScript

  使用一行 JavaScript 调用 ID 为 `myModal` 的模态：

  ```javascript
  $('#myModal').modal(options);
  ```

- 方法

  - `.modal(options)`

    激活模态框。接受一个可选的选项对象。

    ```javascript
    $('#myModal').modal({
        backdrop: 'static',
        keyboard: true
    });
    ```

  - `.modal('show')`

    手动打开模态。在模态实际显示之前返回给调用者。

    ```javascript
    $('#myModal').modal('show');
    ```

  - `.modal('hide')`

    手动隐藏模态。在模态实际上被隐藏之前返回给调用者。

    ```javascript
    $('#myModal').modal('hide');
    ```

