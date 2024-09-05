# HTML

## 一、基本结构

一个基本的 HTML 文档如下所示。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Sample page</title>
  </head>
  <body>
    <h1>Sample page</h1>
    <p>This is a <a href="demo.html">simple</a> sample.</p>
    <img src="https://placekitten.com/200/300" alt="My test image" />
    <!-- this is a comment -->
  </body>
</html>
```

## 二、通用基础

### 2.1. 微语法

HTML 中有许多地方可以接受特定的数据类型，例如日期或数字。

#### 2.1.1. Boolean 属性

元素上存在布尔属性表示真值，不存在该属性表示假值。

如果存在该属性，则其值必须是空字符串或与属性的规范名称匹配的不区分大小写的 ASCII 值，并且没有前导或尾随空格。

布尔属性不允许使用值 `true` 和 `false`。要表示假值，必须完全省略该属性。

例如 `disabled` 属性，他们可以标记表单输入使之变为不可用，此时用户不能向他们输入任何数据。

```html
<input type="text" disabled="disabled">
```

方便起见，可以将其写成以下形式。

```html
<input type="text" disabled>
```

## 三、HTML API

### 3.1. 元素

#### 3.1.1. 元素定义

规范中的每个元素都有一个定义，其中包括以下信息。

- ***Categories***

  元素所属的类别列表。为每个元素定义内容模型时使用。

- ***Content model***

  对必须包含哪些内容作为元素的子元素和后代元素的规范性描述。

- ***Tag omission in text/html***

  在 `text/html` 语法中是否可以省略开始和结束标记的非规范性描述。

#### 3.1.2. 内容模型

规范中定义的每个元素都有一个内容模型：对元素预期内容的描述。HTML 元素的内容必须符合元素内容模型中描述的要求。元素的内容是它在 DOM 中的子元素。

元素之间始终允许使用 ASCII 空格。User agents 将源标记中元素之间的这些字符表示为 DOM 中的文本节点。空文本节点和仅由这些字符序列组成的文本节点被视为元素间空白。

在确定元素的内容是否与元素的内容模型匹配时，必须忽略元素间的空白、注释节点和处理指令节点，并且在遵循定义文档和元素语义的算法时必须忽略。

- **nothing**

  当元素的内容模型为 `nothing` 时，该元素必须不包含文本节点（除了元素间空白）和元素节点。

HTML 中的每个元素都属于零个或多个类别，这些类别将具有相似特征的元素组合在一起。

- **块级元素**

  块级元素占据其父元素的整个水平空间，垂直空间等于其内容高度，因此创建了一个块。

  默认情况下，块级元素会新起一行。一般块级元素可以包含行内元素和其他块级元素。这种结构上的包含继承区别可以使块级元素创建比行内元素更大型的结构。

  HTML 标准中块级元素和行内元素至高出现在 [4.01](https://www.w3.org/TR/html401/struct/global.html#h-7.5.3) 标准中。在 HTML5，这种区别被一个更复杂的 [Element content categories](https://html.spec.whatwg.org/multipage/indices.html#element-content-categories) 代替。块级类别大致相当于 HTML5 中的 [Flow content](https://html.spec.whatwg.org/multipage/dom.html#flow-content) 类别，而行内类别相当于 HTML5 中的 [Phrasing content](https://html.spec.whatwg.org/multipage/dom.html#phrasing-content) 类别，不过除了这两个还有其他类别。

  块级元素通常用于展示页面上结构化的内容，例如段落、列表、导航菜单、页脚等等。一个以 `block` 形式展现的块级元素不会被嵌套进行内元素中，但可以嵌套在其它块级元素中。

- 行内元素

  一个行内元素只占据它对应标签的边框所包含的空间。

  一般情况下，行内元素只能包含数据和其他行内元素。而块级元素可以包含行内元素和其他块级元素。

  默认情况下，行内元素不会以新行开始，而块级元素会新起一行。

  内联元素不会导致文本换行：它通常出现在一堆文字之间，例如超链接元素 `<a>` 或者强调元素 `<em>` 和 `<strong>`。


## 五、Web API

### 5.1. 用户提示

#### 5.1.1. 简单对话框

- *window*.**alert**(*message*)

  显示一个带有指定消息的模态警告框，并等待用户关闭它。

### 5.2. 脚本

#### 5.2.1. Events

##### 5.2.1.1. Event handlers

许多对象都可以指定事件处理程序，比如 `button`、`input`、`img` 等。这些事件处理程序针对指定的对象充当非捕获型事件监听器。

```javascript
const myButton = document.getElementById('myButton');

myButton.addEventListener('click', function () {
  console.log('Button clicked!');
});
```

##### 5.2.1.2. 事件类型

| 事件处理程序 | 事件类型 | 目标        | 描述                         |
| ------------ | -------- | ----------- | ---------------------------- |
| `onsubmit`   | `submit` | `form` 元素 | 提交表单时在表单元素上触发。 |

## 六、Web 存储

### 6.1. Storage

Storage 提供了访问特定域名下的会话存储或本地存储的功能。

- *storage*.**getItem**(*key*)

  接受一个键名作为参数，并返回对应键名的值。

- *storage*.**setItem**(*key*, *value*)

  接受一个键名和值作为参数，将会把键名添加到给定的 `Storage` 对象中，如果键名已存在，则更新其对应的值。

- *storage*.**removeItem**(*key*)

  接受一个键名作为参数，会从给定的 `Storage` 对象中删除该键名。

### 6.2. sessionStorage

存储在 `sessionStorage` 里面的数据在页面会话结束时会被清除。

### 6.3. localStorage

存储在 `localStorage` 的数据可以长期保留。

