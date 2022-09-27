# CSS

Cascading Style Sheet，简称 CSS，是为网页添加样式的代码。

## CSS 规范的分类

### CSS 官方定义

此 profile 仅包括我们认为稳定的规范，并且我们有足够的实施经验来确保其稳定性。

> 注意：这不是 CSS Desktop Browser Profile：包含在此 profile 中仅基于功能稳定性，而不是预期使用或 Web 浏览器采用。该 profile 以最完整的形式定义了 CSS。

截至 2021 年，***CSS*** 由以下规范定义。

- [CSS Syntax Level 3](https://www.w3.org/TR/css-syntax-3/)
- [CSS Fonts Level 3](https://www.w3.org/TR/css-fonts-3/)

### CSS Levels

层叠样式表没有传统意义上的版本；相反，它有 ***levels***。每个 ***level*** 的 CSS 都建立在前面的基础上，改进定义并添加功能。每个较高级别的特征集是任何较低级别的超集，并且在较高级别中允许给定特征的行为是在较低级别中允许的行为的子集。因此，符合更高级别 CSS 的 user agent 也符合所有较低级别。参考[文档](https://www.w3.org/TR/CSS/#css-levels)。

## CSS Syntax

### CSS 语法说明

一个 `qualified rule` 以一个 *prelude* 开始，以及一个包含一系列声明的 `{}` 包装块。*prelude* 的含义根据规则出现的上下文而有所不同，对于样式规则，它是一个选择器，它指定声明将应用于哪些元素。

> 注意：大多数符合条件的规则都是样式规则，其中前奏是选择器，块是声明列表。

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

- 每个规则集（除了选择器的部分）都应该包含在成对的大括号里（`{}`）。
- 在每个声明里要用冒号（`:`）将属性与属性值分隔开。
- 在每个规则集里要用分号（`;`）将各个声明分隔开。

## Selectors

### Groups of selectors

一个以逗号分隔的选择器列表表示由列表中的每个单独选择器选择的所有元素的并集。例如，在 CSS 中，当多个选择器共享相同的声明时，它们可能会被分组到一个逗号分隔的列表中。

```css
h1, h2, h3 { font-family: sans-serif }
```

### Simple selectors

#### Type selector

类型选择器，也称为元素选择器，是使用 CSS qualified names 的语法编写的文档语言元素类型的名称。类型选择器表示文档树中元素类型的一个实例。

例如，以下选择器表示文档树中的一个 `h1` 元素：

```css
h1
```

#### Attribute selectors

选择器允许表示元素的属性。当选择器用作与元素匹配的表达式时，如果元素具有与属性选择器表示的属性匹配的属性，则必须将属性选择器视为与元素匹配。

#### Class selectors

使用 HTML 时，作者可以在表示 `class` 属性时使用*句点*表示法，作为 `~=` 表示法的替代。因此，对于 HTML，`div.value` 和 `div[class~=value]` 具有相同的含义。属性值必须紧跟在句号 `.` 之后。

CSS 示例：

```css
.pastoral { color: green }  /* all elements with class~=pastoral */
H1.pastoral { color: green }  /* H1 elements with class~=pastoral */
```

#### ID selectors

文档语言可能包含声明为 ID 类型的属性。ID 类型属性的特殊之处在于，在一个符合标准的文档中，没有两个这样的属性可以具有相同的值，无论携带它们的元素的类型如何；无论使用哪种文档语言，都可以使用 ID 类型的属性来唯一标识其元素。在 HTML 中，所有 ID 属性都命名为 `id`。

文档语言的 ID 类型属性允许作者将标识符分配给文档树中的一个元素实例。ID 选择器包含一个*数字符号* `#`，紧跟其后的是 ID 值，必须是 CSS 标识符。ID 选择器表示具有与 ID 选择器中的标识符匹配的标识符的元素实例。

以下 ID 选择器表示一个 `h1` 元素，其 ID-typed 属性的值为 *chapter1*：

```css
h1#chapter1
```

#### Pseudo-classes

引入伪类概念是为了允许基于位于文档树之外的信息或无法使用其他简单选择器表示的信息进行选择。

## Fonts



## 参考文献

- [CSS4-Selectors](https://css4-selectors.com/)

## 参见

- [Descriptions of all CSS specifications](https://www.w3.org/Style/CSS/specs.en.html)

