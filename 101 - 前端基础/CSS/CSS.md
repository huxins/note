# CSS

[层叠样式表](https://www.w3.org/Style/CSS/current-work)（Cascading Style Sheets，缩写为 CSS）是一种样式表语言，用来描述 HTML 或 XML（包括如 SVG、MathML 或 XHTML 之类的 XML 分支语言）文档的呈现方式。

## 一、Levels

CSS 没有传统意义上的版本；相反，它有 ***[levels](https://www.w3.org/TR/CSS/#css-levels)***。

每个 *level* 的 CSS 都建立在前面的基础上，改进定义并添加功能。

在 CSS 中，每个更高级别的功能集（如 CSS Level 2, CSS Level 3 等）包含了所有较低级别的功能，并在此基础上添加了新功能。

因此，更高的级别是较低级别的超集。

[CSS Level 1](https://www.w3.org/TR/CSS1/) 是 CSS 的第一个版本，其中定义了一些基础的样式规则，比如[颜色](https://www.w3.org/TR/CSS1/#color)、[字体](https://www.w3.org/TR/CSS1/#font-family)和[文本对齐](https://www.w3.org/TR/CSS1/#text-align)等。

```css
body {
  color: black;
  font-family: Arial, sans-serif;
  text-align: left;
}
```

[CSS Level 2](https://www.w3.org/TR/CSS22/) 在 CSS1 的基础上，添加了更多的功能，比如[定位](https://www.w3.org/TR/CSS22/visuren.html#choose-position)、[z-index](https://www.w3.org/TR/CSS22/visuren.html#z-index) 和[媒体类型](https://www.w3.org/TR/CSS22/media.html#at-media-rule)等。

```css
body {
  color: black;
  font-family: Arial, sans-serif;
  text-align: left;
  position: relative;
  z-index: 10;
}

@media screen and (max-width: 600px) {
  body {
    background-color: lightblue;
  }
}
```

CSS Level 3 又在 CSS2 的基础上，增加了更多的功能，比如[圆角](https://www.w3.org/TR/css-backgrounds-3/#border-radius)、[阴影](https://www.w3.org/TR/css-backgrounds-3/#box-shadow)和[动画](https://www.w3.org/TR/css-transitions-1/#transition-shorthand-property)等。

```css
body {
  color: black;
  font-family: Arial, sans-serif;
  text-align: left;
  position: relative;
  z-index: 10;
  background-color: lightblue;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

body:hover {
  background-color: lightcoral;
}
```

从上述例子可以看出，CSS3 包含了 CSS1 和 CSS2 的所有功能，并在此基础上增加了更多的特性。因此，我们可以说，CSS3 是 CSS2 和 CSS1 的超集；同理，CSS2 是 CSS1 的超集。

在 CSS 中，每个更高 *level* 的功能集是任何较低级别的超集，因为每个更高 *level* 包含了较低级别的所有功能，并在此基础上添加了更多的新特性。

## 二、Syntax

一个[合格的规则](https://www.w3.org/TR/css-syntax-3/#qualified-rule)由两部分组成：前导（prelude）和块（block）。

```css
p > a {
  color: blue;
  text-decoration: underline;
}
```

在[上面](https://www.w3.org/TR/css-syntax-3/#syntax-description)的规则中，`p > a` 是选择器，如果源文档是 HTML，它会选择任何作为 `p` 元素的子元素的 `a` 元素。

`color: blue` 是一个[声明](https://www.w3.org/TR/css-syntax-3/#declaration)，指定对于匹配选择器的元素，它们的 `color` 属性应该具有 `blue` 值。

同样，它们的 `text-decoration` 属性应该具有 `underline` 值。

### 转义字符

在 CSS 中选择器、属性值等场景中，若需要表示特殊字符（如 Unicode 字符、保留符号或非常规字符），可以通过反斜杠 `\` 进行转义。

- ASCII 字符可以使用 `\` + 一个 ASCII 字符来转义，例如 `\;` 表示分号。
- Unicode 字符（包括与上述 ASCII 码表重合的部分）使用 `\` + 6 位数字表示，例如 `\000030` 表示字符 `"1"`。
- 对于第二种情况，不足 6 位时为避免歧义后面可加空格分隔，这个空格总会被当做分隔符，不会被当做内容。

## 三、层叠和继承

[Cascading and Inheritance](https://www.w3.org/TR/css-cascade-3/) 描述了如何整理样式规则并为所有元素的所有属性赋值。

通过层叠和继承，所有元素的所有属性的值都会被传播。

### 默认值

每个属性都有一个[初始值](https://www.w3.org/TR/css-cascade-3/#initial-values)，该初始值在属性的定义表中定义。

如果该属性不是[继承](https://www.w3.org/TR/css-cascade-3/#inheriting)属性，并且[层叠](https://www.w3.org/TR/css-cascade-3/#cascading)没有产生一个值，那么该属性的指定值就是它的初始值。

[`initial`](https://www.w3.org/TR/css-cascade-3/#initial) 将属性的初始值应用于元素。

```css
img {
  opacity: initial;
}
```

[`unset`](https://www.w3.org/TR/css-cascade-3/#inherit-initial) 可以分为两种情况，如果这个属性是继承属性，则将该属性重新设置为继承的值；如果不是，则将该属性重新设置为初始值。

例如，`margin` 和 `padding` 不是继承属性，使用 `unset` 将该属性重新设置为初始值；`font-size` 是继承属性，使用 `unset` 将该属性重新设置为继承的值。

```css
ul {
  margin: unset;
  padding: unset;
  font-size: unset;
}
```

[`revert`](https://www.w3.org/TR/css-cascade-4/#default) 将属性重置为浏览器默认样式。

```css
ul {
  margin: revert;
  padding: revert;
}
```

