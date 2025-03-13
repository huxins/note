# CSS Selectors

[选择器](https://www.w3.org/TR/selectors-3/#abstract)是一种用于匹配树中元素的模式，是多种选择 XML 文档节点技术中的一种。选择器经过优化，适用于 HTML 和 XML，并设计为可在性能关键的代码中使用。

[选择器](https://www.w3.org/TR/selectors-3/#selector)是由一个或多个[简单选择器序列](https://www.w3.org/TR/selectors-3/#sequence)组成的链，这些简单选择器序列由[组合器](https://www.w3.org/TR/selectors-3/#combinators)分隔。一个[伪元素](https://www.w3.org/TR/selectors-3/#pseudo-elements)可以附加到选择器中的最后一个简单选择器序列。

## 一、选择器组

一个以逗号分隔的[选择器列表](https://www.w3.org/TR/selectors-3/#grouping)，表示由列表中每个单独选择器所选择的所有元素的并集。

```css
h1,
h2,
h3 {
  font-family: sans-serif;
}
```

## 二、简单选择器

### 类型选择器

[类型选择器](https://www.w3.org/TR/selectors-3/#type-selectors)，也称为元素选择器，表示文档树中元素类型的实例。

```css
p {
  color: red;
}
```

### 属性选择器

[属性选择器](https://www.w3.org/TR/selectors-3/#attribute-selectors)允许表示元素的属性。

当选择器用作与元素匹配的表达式时，如果元素具有与属性选择器表示的属性相匹配的属性，则被视为匹配该元素。

- **[att~=val]**

  表示具有 `att` 属性的元素，该属性的值是以空格分隔的单词列表，其中一个单词正好是 `val`。

  ```css
  p[class~='example'] {
    color: red;
  }
  ```

### 类选择器

使用 HTML 时，可以使用 `.` 来替代表示 `class` 属性的 `~=` 符号。

因此，在 HTML 中，`div.value` 和 `div[class~=value]` 具有相同的含义。

```css
p.example {
  color: green;
}
```

### ID 选择器

在一个符合标准的文档中，没有两个 *ID* 属性可以具有相同的值，无论携带它们的元素的类型如何。

在 HTML 中，所有 *ID* 属性都命名为 *id*。

```css
h1#chapter1 {
  color: red;
}
```

## 三、伪类选择器

引入[伪类](https://www.w3.org/TR/selectors-3/#pseudo-classes)概念是为了允许基于文档树之外的信息或无法使用其他简单选择器表示的信息进行选择。

伪类总是由 `:` 和伪类名称组成，括号中还可选择包含一个值。

### 结构伪类

#### nth-child()

[nth-child](https://www.w3.org/TR/selectors-3/#nth-child-pseudo) 根据元素在父元素的子元素列表中的索引来选择元素。

元素的第一个子元素的索引为 `1`。

例如，选择所有 `li` 元素，且该元素是其父元素下所有元素中的偶数元素。

```css
li:nth-child(even) {
  background-color: lightyellow;
}
```

例如，使用 `:nth-child(an+b)` 表示法，其中 `n` 为任何正整数或零。

```css
li:nth-child(2n) {
  background-color: lightyellow;
}
```

对于 `a` 和 `b` 的值大于零的情况，实际上是将元素的子元素分成每组 `a` 个元素（最后一组取余数），并选择每组中的第 `b` 个元素。

#### nth-of-type()

[nth-of-type](https://www.w3.org/TR/selectors-3/#nth-of-type-pseudo) 根据元素在父元素的同名称子元素列表中的索引来选择元素。

例如，选择所有 `li` 元素，且该元素是其父元素下所有 `li` 元素中的偶数元素。

```css
li:nth-of-type(even) {
  background-color: lightyellow;
}
```

#### first-child

[first-child](https://www.w3.org/TR/selectors-3/#first-child-pseudo) 与 `:nth-child(1)` 相同，表示在同级元素列表中排在第一位的元素。

```css
li:first-child {
  background-color: lightyellow;
}
```

#### last-child

[last-child](https://www.w3.org/TR/selectors-3/#last-child-pseudo) 与 `:nth-last-child(1)` 相同，表示在同级元素列表中排在最后的元素。

```css
li:last-child {
  background-color: lightyellow;
}
```

