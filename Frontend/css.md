# CSS

Cascading Style Sheet，简称 CSS，是为网页添加样式的代码。

## CSS 规范的分类

### CSS 官方定义

此 profile 仅包括我们认为稳定的规范，并且我们有足够的实施经验来确保其稳定性。

> 注意：这不是 CSS Desktop Browser Profile：包含在此 profile 中仅基于功能稳定性，而不是预期使用或 Web 浏览器采用。该 profile 以最完整的形式定义了 CSS。

截至 2021 年，***CSS*** 由以下规范定义。

- [CSS Syntax Level 3](https://www.w3.org/TR/css-syntax-3/)

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



## 参考文献

- [CSS4-Selectors](https://css4-selectors.com/)

## 参见

- [Descriptions of all CSS specifications](https://www.w3.org/Style/CSS/specs.en.html)

