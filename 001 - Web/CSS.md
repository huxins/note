# CSS

Cascading Style Sheets，简称 CSS，是为网页添加样式的代码。

## 一、规范

截至 2021 年，***CSS*** 由以下规范定义。

- [CSS Syntax Module Level 3](https://www.w3.org/TR/css-syntax-3/)
- [CSS Box Model Module Level 3](https://www.w3.org/TR/css-box-3/)
- [CSS Fonts Module Level 3](https://www.w3.org/TR/css-fonts-3/)

### 1.1. CSS Levels

CSS 没有传统意义上的版本；相反，它有 ***levels***。每个 ***level*** 的 CSS 都建立在前面的基础上，改进定义并添加功能。每个较高级别的特征集是任何较低级别的超集，并且在较高级别中允许给定特征的行为是在较低级别中允许的行为的子集。因此，符合更高级别 CSS 的 user agent 也符合所有较低级别。详见 [CSS Levels](https://www.w3.org/TR/CSS/#css-levels)。

## 二、CSS Syntax

一个合格的规则以前言开始，以及一个包含一系列声明的 `{}` 包装块。

> 注意：大多数符合条件的规则都是样式规则，其中前言是选择器，块是声明列表。

一个典型的规则可能看起来像这样：

```css
p > a {
  color: blue;
  text-decoration: underline;
}
```

在上面的规则中，`p > a` 是选择器，如果源文档是 HTML，它会选择任何作为 `p` 元素的子元素的 `a` 元素。

`"color: blue"` 是一个声明，指定对于匹配选择器的元素，它们的 `color` 属性应该具有值 `blue`。同样，它们的 `text-decoration` 属性应该具有 `underline` 值。

注意其他重要的语法：

- 每个规则集（除了选择器的部分）都应该包含在成对的大括号里。
- 在每个声明里要用冒号 `:` 将属性与属性值分隔开。
- 在每个规则集里要用分号 `;` 将各个声明分隔开。

## 三、Selectors

### 3.1. Selector syntax

选择器是由一个或多个简单选择器序列组成的链，这些简单选择器序列之间由组合器分隔。一个伪元素可以附加到选择器中最后一个简单选择器序列。

### 3.2. 选择器组

一个以逗号分隔的选择器列表表示由列表中每个单独选择器所选择的所有元素的并集。

```css
h1,
h2,
h3 {
  font-family: sans-serif;
}
```

### 3.3. 简单选择器

#### 3.3.1. 类型选择器

类型选择器，也称为元素选择器，表示文档树中元素类型的一个实例。

```css
p {
  color: red;
}
```

#### 3.3.2. 属性选择器

选择器允许表示元素的属性。当选择器用作匹配元素的表达式时，如果元素具有与属性选择器表示的属性相匹配的属性，则被视为匹配该元素。

- `[att~=val]`

  表示具有 `att` 属性的元素，该属性的值是以空格分隔的单词列表，其中一个单词正好是 `val`。

  ```css
  p[class~='example'] {
    color: red;
  }
  ```

#### 3.3.3. 类选择器

使用 HTML 时，可以在表示 `class` 属性时使用句点表示法，作为 `~=` 表示法的替代。因此，对于 HTML，`div.value` 和 `div[class~=value]` 具有相同的含义。属性值必须紧跟在句号 `.` 之后。

```css
p.example {
  color: green;
}
```

#### 3.3.4. ID 选择器

文档语言可能包含声明为 ID 类型的属性。ID 类型属性的特殊之处在于，在一个符合标准的文档中，没有两个这样的属性可以具有相同的值，无论携带它们的元素的类型如何；无论使用哪种文档语言，都可以使用 ID 类型的属性来唯一标识其元素。在 HTML 中，所有 ID 属性都命名为 `id`。

文档语言的 ID 类型属性允许作者将标识符分配给文档树中的一个元素实例。ID 选择器包含一个数字符号 `#`，紧跟其后的是 ID 值，必须是 CSS 标识符。ID 选择器表示具有与 ID 选择器中的标识符匹配的标识符的元素实例。

```css
h1#chapter1 {
  color: red;
}
```

#### 3.3.5. 伪类

引入伪类概念是为了允许基于文档树之外的信息或无法使用其他简单选择器表示的信息进行选择。当计算元素在其同级列表中的位置时，不计算独立文本和其他非元素节点。索引编号从 1 开始。

##### 3.3.5.1. 结构伪类

- `:nth-child()`

  根据元素在父元素的子元素列表中的索引来选择元素。

  选择所有 `li` 元素，且该元素是其父元素下所有元素中的偶数元素：

  ```css
  li:nth-child(even) {
    background-color: lightyellow;
  }
  ```

  还可以使用 `:nth-child(an+b)` 表示法，其中 `n` 为任何正整数或零：

  ```css
  li:nth-child(2n) {
    background-color: lightyellow;
  }
  ```

  对于大于零的 `a` 和 `b` 的值，这有效地将元素的子元素分成每组 `a` 个元素（最后一组取余数），并选择每组中的第 `b` 个元素。

- `:nth-of-type()`

  基于相同标签名称的兄弟元素中的位置来匹配元素。

  选择所有 `li` 元素，且该元素是其父元素下所有 `li` 元素中的偶数元素：

  ```css
  li:nth-of-type(even) {
    background-color: lightyellow;
  }
  ```

## 四、Box Model

### 4.1. Box Size

尺寸属性有 `width`、`height`、`min-width`、`min-height`、`max-width` 和 `max-height`。详见 [Sizing Properties](https://www.w3.org/TR/css-sizing-3/#sizing-properties)。

## 五、Backgrounds

每个盒模型都有一个背景层，默认是完全透明的，或者填充有颜色和图像。`background` 属性指定要使用的颜色 `background-color` 和图像 `background-image`，以及它们的大小、位置和平铺方式等。

`background` 属性不会被继承，但是由于 `background-color` 的初始透明值，父框的背景默认会发光。

### 5.1. 背景颜色

`background-color` 属性设置元素的背景颜色。颜色绘制在任何背景图像后面。

```css
h1 {
  background-color: green;
  width: max-content;
}
```

## 六、Fonts

### 6.1. 字体系列

`font-family` 属性通过给定一个有先后顺序的，由字体名或者字体族名组成的列表来为选定的元素设置字体。

```css
h1 {
  font-family: 'Open Sans', serif;
}
```

通过 `@font-face` 从服务器上下载字体：

```html
<link rel="stylesheet" href="https://fonts.font.im/css?family=Open+Sans" />
```

### 6.2. 字体大小

`font-size` 属性设置字体大小。

```css
h1 {
  font-size: 64px;
}
```

## 七、Text

### 7.1. 文本对齐

#### 7.1.1. 水平对齐

`text-align` 属性设置块元素的行内内容的水平对齐，左对齐或右对齐。

### 7.2. 间距

#### 7.2.1. 字符间距

`letter-spacing` 属性用于设置文本字符的额外间距。

```css
p {
  letter-spacing: 1px;
}
```

#### 7.2.2. 单词间距

`word-spacing` 属性设置标签、单词之间的额外间距。

## 八、内联布局

### 8.1. 行间距

`line-height` 属性用于设置多行文本的间距。

```css
p {
  line-height: 1.2;
}
```

