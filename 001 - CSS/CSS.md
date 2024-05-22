# CSS

Cascading Style Sheets，是为网页添加样式的代码。

CSS 没有传统意义上的版本；相反，它有 ***[levels](https://www.w3.org/TR/CSS/#css-levels)***。每个 ***level*** 的 CSS 都建立在前面的基础上，改进定义并添加功能。每个较高级别的特征集是任何较低级别的超集，并且在较高级别中允许给定特征的行为是在较低级别中允许的行为的子集。因此，符合更高级别 CSS 的 user agent 也符合所有较低级别。

## 一、语法

一个 [qualified rule](https://www.w3.org/TR/css-syntax-3/#qualified-rule) 以前缀开始，以及一个包含一系列声明的 `{}` 包装块。

```css
p > a {
  color: blue;
  text-decoration: underline;
}
```

在上面的规则中，`p > a` 是选择器，如果源文档是 HTML，它会选择任何作为 `p` 元素的子元素的 `a` 元素。

`color: blue` 是一个声明，指定对于匹配选择器的元素，它们的 `color` 属性应该具有值 `blue`。同样，它们的 `text-decoration` 属性应该具有 `underline` 值。

## 二、Selectors

选择器是由一个或多个简单选择器序列组成的链，这些简单选择器序列由组合器分隔。一个伪元素可以附加到选择器中的最后一个简单选择器序列。

### 2.1. 选择器组

一个以逗号分隔的选择器列表，表示由列表中每个单独选择器所选择的所有元素的并集。

```css
h1,
h2,
h3 {
  font-family: sans-serif;
}
```

### 2.2. 简单选择器

#### 2.2.1. 类型选择器

类型选择器，也称为元素选择器，表示文档树中元素类型的一个实例。

```css
p {
  color: red;
}
```

#### 2.2.2. 属性选择器

选择器允许表示元素的属性。当选择器用作匹配元素的表达式时，如果元素具有与属性选择器表示的属性相匹配的属性，则被视为匹配该元素。

- `[att~=val]`

  表示具有 `att` 属性的元素，该属性的值是以空格分隔的单词列表，其中一个单词正好是 `val`。

  ```css
  p[class~='example'] {
    color: red;
  }
  ```

#### 2.2.3. 类选择器

使用 HTML 时，可以使用 `.` 来替代表示 `class` 属性的 `~=` 符号。因此，在 HTML 中，`div.value` 和 `div[class~=value]` 具有相同的含义。

```css
p.example {
  color: green;
}
```

#### 2.2.4. ID 选择器

在一个符合标准的文档中，没有两个 ID 属性可以具有相同的值，无论携带它们的元素的类型如何。在 HTML 中，所有 ID 属性都命名为 `id`。

```css
h1#chapter1 {
  color: red;
}
```

#### 2.2.5. 伪类

引入伪类概念是为了允许基于文档树之外的信息或无法使用其他简单选择器表示的信息进行选择。

伪类总是由 `:` 和伪类名称组成，括号中还可选择包含一个值。

##### 2.2.5.1. 结构伪类

###### 2.2.5.1.1. nth-child()

根据元素在父元素的子元素列表中的索引来选择元素。元素的第一个子元素的索引为 1。

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

对于 `a` 和 `b` 的值大于零的情况，这实际上是将元素的子元素分成每组 `a` 个元素（最后一组取余数），并选择每组中的第 `b` 个元素。

###### 2.2.5.1.2. nth-of-type()

根据元素在父元素的同名称子元素列表中的索引来选择元素。

选择所有 `li` 元素，且该元素是其父元素下所有 `li` 元素中的偶数元素：

```css
li:nth-of-type(even) {
  background-color: lightyellow;
}
```

###### 2.2.5.1.3. first-child

与 `:nth-child(1)` 相同。`:first-child` 伪类表示在同级元素列表中排在第一位的元素。

```css
li:first-child {
  background-color: lightyellow;
}
```

###### 2.2.5.1.4. last-child

与 `:nth-last-child(1)` 相同。`:last-child` 伪类表示在同级元素列表中排在最后的元素。

```css
li:last-child {
  background-color: lightyellow;
}
```

## 三、盒模型

### 3.1. Box Sizing

Sizing 属性有 `width`、`height`、`min-width`、`min-height`、`max-width` 和 `max-height`。

`width` 默认设置内容区域的宽度，但如果 `box-sizing` 属性被设置为 `border-box`，就转而设置边框区域的宽度。

Sizing 值有 `auto`、`max-content`、`min-content` 和 `fit-content()`。

## 四、背景和边框

### 4.1. Backgrounds

每个盒模型都有一个背景层，默认是完全透明的，或者填充有颜色和图像。

背景属性不会被继承，但由于 `background-color` 的初始透明值，父框的背景会默认显示出来。

#### 4.1.1. background-color

`background-color` 属性设置元素的背景颜色。颜色绘制在任何背景图像后面。

```css
h1 {
  background-color: green;
  width: max-content;
}
```

## 五、Fonts

### 5.1. 字体基本属性

#### 5.1.1. font-family

`font-family` 属性通过给定一个有先后顺序的，由字体名或者字体族名组成的列表来为选定的元素设置字体。

```css
h1 {
  font-family: 'Open Sans', serif;
}
```

#### 5.1.2. font-size

`font-size` 属性设置字体大小。

```css
h1 {
  font-size: 64px;
}
```

### 5.2. 字体资源

#### 5.2.1. @font-face

通过 `@font-face` 从服务器上下载字体：

```html
<link rel="stylesheet" href="https://fonts.font.im/css?family=Open+Sans" />
```

## 六、文字排版

### 6.1. 对齐校正

对齐和校正控制内联内容在行框中的分布。

#### 6.1.1. text-align

`text-align` 属性设置块元素的行内内容的水平对齐，左对齐或右对齐。

```css
p {
  text-align: center;
}
```

### 6.2. 间距

#### 6.2.1. letter-spacing

`letter-spacing` 属性用于设置文本字符的额外间距。

```css
p {
  letter-spacing: 1px;
}
```

#### 6.2.2. word-spacing

`word-spacing` 属性设置标签、单词之间的额外间距。

```css
p {
  word-spacing: 4px;
}
```

## 七、内联布局

### 7.1. 行间距

#### 7.1.1. line-height

`line-height` 属性用于设置多行文本的间距。

```css
p {
  line-height: 1.2;
}
```

### 7.2. 基线对齐

#### 7.2.1. vertical-align

`vertical-align` 属性用来指定行内元素的垂直对齐方式。

```css
img {
  vertical-align: top;
}
```

## 八、Display

### 8.1. display

`display` 属性定义元素的显示类型。

```css
p {
  display: block;
}
```

#### 8.1.1. display-box

- `none`

  元素及其子元素不生成 Box 或文本序列。

  ```css
  p {
    display: none;
  }
  ```

#### 8.1.2. display-legacy

- `inline-block`

  元素显示为行内块级元素的一种显示模式。它结合了行内元素和块级元素的特性，使得元素既可以在行内显示，又可以设置宽度、高度等属性，从而在行内形成块状布局。

  ```css
  span {
    display: inline-block;
    width: 30px;
    height: 30px;
  }
  ```

### 8.2. visibility

`visibility` 属性显示或隐藏元素而不更改文档的布局。

```css
span {
  visibility: hidden;
}
```

## 九、Overflow

### 9.1. overflow

`overflow` 是简写属性，其设置了元素溢出时所需的行为。

```css
p {
  width: 100px;
  height: 100px;
  overflow: hidden;
}
```

## 十、Color

### 10.1. opacity

`opacity` 属性指定了一个元素的不透明度。换言之，`opacity` 属性指定了一个元素后面的背景的被覆盖程度。

```css
img {
  opacity: 0.6;
}
```

## 十一、层叠和继承

### 11.1. 默认值

- `initial`

  `initial` 将属性的初始值应用于元素。

  ```css
  img {
    opacity: initial;
  }
  ```

- `unset`

  `unset` 可以分为两种情况，如果这个属性有从父级继承的值，则将该属性重新设置为继承的值，如果没有继承父级样式，则将该属性重新设置为初始值。

  例如，`margin` 和 `padding` 不是继承属性，使用 `unset` 将该属性重新设置为初始值；`font-size` 是继承属性，使用 `unset` 将该属性重新设置为继承的值。

  ```css
  ul {
    margin: unset;
    padding: unset;
    font-size: unset;
  }
  ```

- `revert`

  `revert` 将属性重置为浏览器默认样式。

  ```css
  ul {
    margin: revert;
    padding: revert;
  }
  ```

