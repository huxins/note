# HTML

在 [HTML](https://html.spec.whatwg.org/multipage/) 中，大多数属性有两个方面：

- [内容属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes)

- [接口描述语言属性](https://developer.mozilla.org/zh-CN/docs/Glossary/IDL)

IDL 属性和方法是指在 Web API 中定义的与 DOM 接口相关的属性和方法。它们用于在浏览器中操作 HTML 元素，通过 JavaScript 访问和修改 DOM 元素的属性、行为等。IDL 属性和方法并不直接反映在 HTML 标签中，而是通过 JavaScript 来操作和使用。

## 一、基本结构

一个[基本的 HTML 文档](https://html.spec.whatwg.org/multipage/introduction.html#a-quick-introduction-to-html)如下所示。

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

### 传统块级元素

[块级元素](https://developer.mozilla.org/zh-CN/docs/Glossary/Block-level_content)占据其父元素的整个水平空间，垂直空间等于其内容高度，因此创建了一个块。默认情况下，块级元素会新起一行。

一般块级元素可以包含行内元素和其他块级元素。这种结构上的包含继承区别可以使块级元素创建比行内元素更大型的结构。

HTML 标准中块级元素和行内元素至高出现在 [4.01](https://www.w3.org/TR/html401/struct/global.html#h-7.5.3) 标准中。在 HTML5 中，这种区别被一个更复杂的 [Element content categories](https://html.spec.whatwg.org/multipage/indices.html#element-content-categories) 代替。

块级类别大致相当于 HTML5 中的 [Flow content](https://html.spec.whatwg.org/multipage/dom.html#flow-content) 类别，而行内类别相当于 HTML5 中的 [Phrasing content](https://html.spec.whatwg.org/multipage/dom.html#phrasing-content) 类别，不过除了这两个还有其他类别。

块级元素通常用于展示页面上结构化的内容，例如段落、列表、导航菜单、页脚等等。

一个以 `block` 形式展现的块级元素不会被嵌套进行内元素中，但可以嵌套在其它块级元素中。

### 传统行内元素

[行内元素](https://developer.mozilla.org/zh-CN/docs/Glossary/Inline-level_content)只占据它对应标签的边框所包含的空间。

一般情况下，行内元素只能包含数据和其他行内元素，而块级元素可以包含行内元素和其他块级元素。

默认情况下，行内元素不会以新行开始，而块级元素会新起一行。

**内联元素不会导致文本换行**：它通常出现在一堆文字之间。

- 超链接元素 [`<a>`](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element)
- 强调元素 [`<em>`](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-em-element)
- 强调元素 [`<strong>`](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-strong-element)

### 内容模型分类

规范中定义的每个元素都有一个[内容模型](https://html.spec.whatwg.org/multipage/dom.html#content-models)：对元素预期内容的描述。

HTML 元素的内容必须符合元素内容模型中描述的要求。

- 元素的内容是它在 DOM 中的子元素。

- 元素之间始终允许使用 ASCII 空格。

- *User agents* 将源标记中元素之间的这些字符表示为 DOM 中的文本节点。

- 空文本节点和仅由这些字符序列组成的文本节点被视为元素间空白。

在确定元素的内容是否与元素的内容模型匹配时，必须忽略元素间的空白、注释节点和处理指令节点，并且在遵循定义文档和元素语义的算法时必须忽略。

HTML 中的每个元素都属于零个或多个类别，这些类别将具有相似特征的元素组合在一起。

- **nothing**

  当元素的内容模型为 [`nothing`](https://html.spec.whatwg.org/multipage/dom.html#the-nothing-content-model) 时，该元素必须不包含文本节点（除了元素间空白）和元素节点。

## 二、标记语法规范

### 元素语法

规范中的每个元素都有一个定义，其中包括以下信息。

- [***Categories***](https://html.spec.whatwg.org/multipage/dom.html#concept-element-categories)

  元素所属的类别列表。为每个元素定义内容模型时使用。

- [***Content model***](https://html.spec.whatwg.org/multipage/dom.html#concept-element-content-model)

  对必须包含哪些内容作为元素的子元素和后代元素的规范性描述。

- [***Tag omission in text/html***](https://html.spec.whatwg.org/multipage/dom.html#concept-element-tag-omission)

  在 `text/html` 语法中是否可以省略开始和结束标记的非规范性描述。

### 布尔属性

元素上存在[布尔属性](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes)表示真值，不存在该属性表示假值（存在即真）。

如果存在该属性，则其值必须是空字符串或与属性的规范名称匹配的不区分大小写的 ASCII 值，并且没有前导或尾随空格。

布尔属性不允许使用值 `true` 和 `false`。

要表示假值，必须完全省略该属性。

例如 `disabled` 属性，他们可以标记表单输入使之变为不可用，此时用户不能向他们输入任何数据。

```html
<input type="text" disabled="disabled">
```

方便起见，可以将其写成以下形式。

```html
<input type="text" disabled>
```

### 转义字符

当处理用户输入或动态内容时，需对特殊字符（如 `<`, `>`, `&`, `"`, `'`）进行 [HTML 转义](https://html.spec.whatwg.org/multipage/parsing.html#escapingString)，以避免内容被解析为代码或破坏文档结构。

- **文本内容中**：将 `<` 转义为 `&lt;`，`>` 转义为 `&gt;`。
- **属性值中**：使用 `&quot;` 转义双引号，确保属性闭合正确。

HTML [实体](https://developer.mozilla.org/zh-CN/docs/Glossary/Entity)是一段以连字号（`&`）开头、以分号（`;`）结尾的文本（字符串）。

- `&` + ASCII 字符

  如 `&Acirc;`。[HTML5 参照表](https://html.spec.whatwg.org/multipage/named-characters.html#named-character-references)

- `&#` + 10 进制数字

  如 `&#67;`, `&#128522;`。参考 Unicode 十进制表

- `&#x` + 16 进制数字

  如 `&#x1F60A;`。参考 Unicode 十六进制表

## 三、DOM 编程接口

### 核心对象模型

#### HTMLElement

所有 HTML 元素的接口都从 [`HTMLElement`](https://html.spec.whatwg.org/multipage/dom.html#htmlelement) 接口继承。

**实例方法**：

- element.[**click**](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/click)()

  用来模拟鼠标左键单击一个元素。

  ```javascript
  document.getElementById("su").click();
  ```

**实例属性**：

- element.[**style**](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/style)

  只读属性 `style` 以 [`CSSStyleDeclaration`](https://drafts.csswg.org/cssom/#the-cssstyledeclaration-interface) 对象的形式返回元素的内联样式。

  该对象包含该元素的所有样式属性列表，只为元素的内联 `style` 属性中定义的属性分配值。

  该属性是只读的，不可以将 `CSSStyleDeclaration` 对象赋值给它。
  
  可以通过直接给 `style` 属性分配一个字符串来设置内联样式。在这种情况下，这个字符串被转发到 [`CSSStyleDeclaration.cssText`](https://drafts.csswg.org/cssom/#ref-for-dom-cssstyledeclaration-csstext)。
  
  以这种方式使用 `style` 将完全覆盖该元素的所有内联样式。
  
  ```javascript
  let myDiv = document.getElementById('content');
  myDiv.style = "color: red;";
  ```
  
  因此，要在不改变其他样式值的情况下为一个元素添加特定的样式，通常最好是在 `CSSStyleDeclaration` 对象上设置个别属性。
  
  ```javascript
  let myDiv = document.getElementById('content');
  myDiv.style.backgroundColor = "red";
  ```

### 存储系统

[`Storage`](https://html.spec.whatwg.org/multipage/webstorage.html#the-storage-interface) 提供了访问特定域名下的会话存储或本地存储的功能。

- *storage*.[**getItem**](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage/getItem)(*key*)

  接受一个键名作为参数，并返回对应键名的值。

- *storage*.[**setItem**](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage/setItem)(*key*, *value*)

  接受一个键名和值作为参数，将会把键名添加到给定的 `Storage` 对象中，如果键名已存在，则更新其对应的值。

- *storage*.[**removeItem**](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage/removeItem)(*key*)

  接受一个键名作为参数，会从给定的 `Storage` 对象中删除该键名。

#### localStorage

存储在 [`localStorage`](https://html.spec.whatwg.org/multipage/webstorage.html#the-localstorage-attribute) 的数据可以长期保留。

#### sessionStorage

存储在 [`sessionStorage`](https://html.spec.whatwg.org/multipage/webstorage.html#the-sessionstorage-attribute) 里面的数据在页面会话结束时会被清除。

### 用户提示

- *window*.[**alert**](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/alert)(*message*)

  显示一个带有指定消息的模态警告框，并等待用户关闭它。

## 四、事件处理体系

### 事件注册

许多对象都可以指定[事件处理程序](https://html.spec.whatwg.org/multipage/webappapis.html#event-handler-attributes)，比如 `button`、`input`、`img` 等。

这些事件处理程序针对指定的对象充当非捕获型事件监听器。

```javascript
const myButton = document.getElementById('myButton');

myButton.addEventListener('click', function () {
  console.log('Button clicked!');
});
```

#### HTML 属性方式

```html
<!-- 直接在 HTML 标签中定义事件 -->
<button onclick="handleClick()">点击我 (HTML属性)</button>

<script>
function handleClick() {
  alert("通过 HTML 属性触发事件！");
}
</script>
```

在 HTML 的属性中，必须使用函数调用。

这是浏览器解析事件属性时的核心机制决定的，具体原理如下：

```javascript
button.onclick = function(event) {
  handleClick(); // 实际执行的是函数调用
};
```

#### DOM 监听器方式

```html
<button id="domBtn">点击我 (DOM监听器)</button>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('domBtn');
  
  // 标准事件监听
  btn.addEventListener('click', function(e) {
    e.target.textContent = "已点击！";
  });

  // 附加多个监听器
  btn.addEventListener('mouseover', () => {
    btn.style.transform = "scale(1.1)";
  });

  // 键盘事件示例
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      console.log("回车键被按下");
    }
  });
});
</script>
```

#### 事件代理模式

**基础方式**：

```html
<ul id="list">
  <li>第一个项目</li>
  <li>第二个项目</li>
  <li>第三个项目</li>
</ul>

<script>
document.getElementById('list').addEventListener('click', function(e) {
  // 通过事件冒泡捕获子元素事件
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('selected');
    console.log(`点击的项目内容: ${e.target.textContent}`);
  }
});

// 动态添加元素
setTimeout(() => {
  const newItem = document.createElement('li');
  newItem.textContent = "动态新增项目";
  document.getElementById('list').appendChild(newItem);
}, 2000);
</script>

<style>
.selected { background-color: #ccffcc; }
</style>
```

**事件代理增强**：

```javascript
// 通用事件代理函数
function delegate(container, eventName, selector, handler) {
  container.addEventListener(eventName, function(e) {
    let el = e.target;
    while (el && el !== container) {
      if (el.matches(selector)) {
        handler.call(el, e);
        break;
      }
      el = el.parentElement;
    }
  });
}

// 使用示例
delegate(document.body, 'click', '.dynamic-item', function() {
  this.style.opacity = '0.5';
});
```

### 核心事件

以下是所有 HTML 元素必须支持的[事件处理程序](https://html.spec.whatwg.org/multipage/webappapis.html#event-handlers-on-elements,-document-objects,-and-window-objects)。

#### 表单事件

| 事件处理程序 | 事件类型 | 目标        | 描述                         |
| ------------ | -------- | ----------- | ---------------------------- |
| `onsubmit`   | `submit` | `form` 元素 | 提交表单时在表单元素上触发。 |

#### 交互事件

| 事件处理程序 | 事件类型 | 目标     | 描述 |
| ------------ | -------- | -------- | ---- |
| `onclick`    | `click`  | Elements |      |

## Reference

- [在 HTML 和 CSS 中转义特殊字符 - *Harttle*](https://harttle.land/2018/05/15/html-css-escape.html)

