# HTML

## 介绍

### HTML 的快速介绍

一个基本的 HTML 文档如下所示：

```html
<!DOCTYPE html>
<html lang="en">
 <head>
  <meta charset="utf-8">
  <title>Sample page</title>
 </head>
 <body>
  <h1>Sample page</h1>
  <p>This is a <a href="demo.html">simple</a> sample.</p>
  <img src="https://placekitten.com/200/300" alt="My test image">
  <!-- this is a comment -->
 </body>
</html>
```

## 通用基础设施

### 常见的微语法

HTML 中有很多地方可以接受特定的数据类型，例如日期或数字。本节描述了这些格式的内容的一致性标准是什么，以及如何解析它们。

#### 布尔属性

许多属性是布尔属性。元素上存在布尔属性表示真值，不存在该属性表示假值。

如果存在该属性，则其值必须是空字符串或与属性的规范名称匹配的不区分大小写的 ASCII 值，并且没有前导或尾随空格。

布尔属性不允许使用值 `true` 和 `false`。要表示假值，必须完全省略该属性。

例如 `disabled` 属性，他们可以标记表单输入使之变为不可用，此时用户不能向他们输入任何数据：

```html
<input type="text" disabled="disabled">
```

方便起见，我们完全可以将其写成以下形式：

```html
<input type="text" disabled>
```

## HTML 文档的语义、结构和 API

### Elements

#### Element definitions

规范中的每个元素都有一个包含以下信息的定义：

- ***Categories***

元素所属的类别列表。这些在为每个元素定义内容模型时使用。

- ***Content model***

对必须包含哪些内容作为元素的子元素和后代元素的规范性描述。

- ***Tag omission in text/html***

在 text/html 语法中是否可以省略开始和结束标记的非规范性描述。

#### Content models

规范中定义的每个元素都有一个内容模型：对元素预期内容的描述。HTML 元素的内容必须符合元素内容模型中描述的要求。元素的内容是它在 DOM 中的子元素。

元素之间始终允许使用 ASCII 空格。User agents 将源标记中元素之间的这些字符表示为 DOM 中的文本节点。空文本节点和仅由这些字符序列组成的文本节点被视为元素间空白。

在确定元素的内容是否与元素的内容模型匹配时，必须忽略元素间的空白、注释节点和处理指令节点，并且在遵循定义文档和元素语义的算法时必须忽略。

##### "nothing" 内容模型

当元素的内容模型为 ***nothing*** 时，该元素必须不包含文本节点（除了元素间空白）和元素节点。

##### Kinds of content

HTML 中的每个元素都属于零个或多个类别，这些类别将具有相似特征的元素组合在一起。

###### 块级元素

块级元素占据其父元素的整个水平空间，垂直空间等于其内容高度，因此创建了一个*块*。

默认情况下，块级元素会新起一行。一般块级元素可以包含行内元素和其他块级元素。这种结构上的包含继承区别可以使块级元素创建比行内元素更*大型*的结构。

HTML 标准中块级元素和行内元素的区别至高出现在 [4.01](https://www.w3.org/TR/html401/struct/global.html#h-7.5.3) 标准中。在 HTML5，这种区别被一个更复杂的[内容类别](https://html.spec.whatwg.org/multipage/indices.html#element-content-categories)代替。*块级*类别大致相当于 HTML5 中的 [Flow content](https://html.spec.whatwg.org/multipage/dom.html#flow-content) 类别，而*行内*类别相当于 HTML5 中的 [Phrasing content](https://html.spec.whatwg.org/multipage/dom.html#phrasing-content) 类别，不过除了这两个还有其他类别。

块级元素通常用于展示页面上结构化的内容，例如段落、列表、导航菜单、页脚等等。一个以 block 形式展现的块级元素不会被嵌套进行内元素中，但可以嵌套在其它块级元素中。

###### 行内元素

一个行内元素只占据它对应标签的边框所包含的空间。

一般情况下，行内元素只能包含数据和其他行内元素。而块级元素可以包含行内元素和其他块级元素。

默认情况下，行内元素不会以新行开始，而块级元素会新起一行。

内联元素不会导致文本换行：它通常出现在一堆文字之间，例如超链接元素 `<a>` 或者强调元素 `<em>` 和 `<strong>`。

## HTML 的元素

### 文档元数据

#### head 元素

`head` 元素表示 `Document` 的元数据集合。

#### title 元素

`title` 元素表示文档的标题或名称。

#### link 元素

`link` 元素允许作者将他们的文档链接到其他资源。

页面添加图标：

```html
<link rel="icon" href="favicon.ico">
```

应用 CSS：

```html
<link rel="stylesheet" href="my-css-file.css">
```

#### meta 元素

`meta` 元素表示无法使用 `title`, `base`, `link`, `style`, and `script` 元素表示的各种元数据。

`charset` 属性指定文档使用的字符编码：

```html
<meta charset="utf-8">
```

### 部分

#### h1、h2、h3、h4、h5 和 h6 元素

这些元素代表其部分的标题。

以下示例符合 HTML 片段：

```html
<h1>我是文章的标题</h1>
```

### 分组内容

#### p 元素

`p` 元素代表一个段落。

以下示例符合 HTML 片段：

```html
<p>我是一个段落，千真万确。</p>
```

#### ol 元素

`ol` 元素表示有序项目列表。

列表的项是 `ol` 元素的 `li` 元素子节点。

```html
<ol>
  <li>沿着条路走到头</li>
  <li>右转</li>
  <li>直行穿过第一个十字路口</li>
  <li>在第三个十字路口处左转</li>
  <li>继续走 300 米，学校就在你的右手边</li>
</ol>
```

#### ul 元素

`ul` 元素表示一个无序项目列表。

列表的项是 `ul` 元素的 `li` 元素子节点。

```html
<ul>
  <li>豆浆</li>
  <li>油条</li>
  <li>豆汁</li>
  <li>焦圈</li>
</ul>
```

#### dl 元素

`dl` 元素表示由零个或多个 name-value groups 组成的关联列表（描述列表）。

```html
<dl>
  <dt>内心独白</dt>
    <dd>戏剧中，某个角色对自己的内心活动或感受进行念白表演，这些台词只面向观众，而其他角色不会听到。</dd>
  <dt>语言独白</dt>
    <dd>戏剧中，某个角色把自己的想法直接进行念白表演，观众和其他角色都可以听到。</dd>
  <dt>旁白</dt>
    <dd>戏剧中，为渲染幽默或戏剧性效果而进行的场景之外的补充注释念白，只面向观众，内容一般都是角色的感受、想法、以及一些背景信息等。</dd>
</dl>
```

### 文本级语义

#### a 元素

如果 `a` 元素具有 `href` 属性，则它表示由其内容标记的超链接：

```html
<a href="https://youtu.be/tFXGhrHRLiA">星星点灯</a>
```

使用 `title` 属性添加支持信息：

```html
<a href="https://youtu.be/tFXGhrHRLiA" title="星星点灯-郑智化">星星点灯</a>
```

#### span 元素

`span` 元素本身没有任何意义。

### Forms

#### form 元素

`form` 元素表示可以通过与表单相关的元素集合来操作的超链接，其中一些可以表示可以提交给服务器进行处理的可编辑值。

```html
<form action="my-handling-form-page" method="post">

</form>
```

#### label 元素

`label` 元素表示用户界面中的标题。

#### input 元素

`input` 元素表示一个类型化的数据字段，通常带有一个表单控件以允许用户编辑数据。

#### textarea 元素

`textarea` 元素表示元素原始值的多行纯文本编辑控件。控件的内容代表控件的默认值。

### 脚本

脚本允许作者向他们的文档添加交互性。

鼓励作者尽可能使用声明性替代脚本，因为声明性机制通常更易于维护，并且许多用户禁用脚本。

#### script 元素

`script` 元素允许作者在他们的文档中包含动态脚本和数据块。该元素不代表用户的内容。

例如，应用 JavaScript：

```html
<script src="my-js-file.js" defer></script>
```

## 参见

- [HTML Living Standard](https://html.spec.whatwg.org/multipage/)
