# Layout

## 一、Inline Layout

CSS 格式化模型提供了一种将容器内的元素和文本打包成行的流。[Inline Layout](https://www.w3.org/TR/css-inline/) 模块描述了行内布局模型的盒模型，并定义了行级内容在块轴上的对齐和尺寸。

### 行间间距

[`line-height`](https://www.w3.org/TR/css-inline/#propdef-line-height) 属性用于设置多行元素的空间量，如多行文本的间距。

```css
p {
  line-height: 1.2;
}
```

### 基线对齐

[`vertical-align`](https://www.w3.org/TR/css-inline/#propdef-vertical-align) 属性用来指定行内元素的垂直对齐方式。

```css
img {
  vertical-align: top;
}
```

## 二、Display

[Display](https://www.w3.org/TR/css-display/) 模块描述如何从文档元素树生成 CSS 格式化盒树，并定义控制它的 [`display`](https://www.w3.org/TR/css-display/#propdef-display) 属性。

### 盒子布局模式

[`display`](https://www.w3.org/TR/css-display/#propdef-display) 属性设置元素的显示类型，包括[内部显示](https://www.w3.org/TR/css-display/#typedef-display-inside)类型和[外部显示](https://www.w3.org/TR/css-display/#typedef-display-outside)类型。外部显示类型决定元素是否被视为块级或行内盒子，以及它在文档流中的表现方式；内部显示类型则决定子元素的布局方式，例如流式布局、网格布局或弹性布局。

#### 外部表现

[display-outside](https://www.w3.org/TR/css-display/#typedef-display-outside) 规定元素的外部显示类型，实际上就是其在流式布局中的角色。

##### block

[`block`](https://www.w3.org/TR/css-display/#ref-for-valdef-display-block) 定义元素生成一个块级盒子，在正常的流中，该元素之前和之后产生换行。

```css
p {
  display: block;
}
```

#### 其他表现

##### none

[`none`](https://www.w3.org/TR/css-display/#ref-for-valdef-display-none%E2%91%A2) 定义元素及其子元素不生成 Box 或文本序列。

```css
p {
  display: none;
}
```

##### inline-block

[`inline-block`](https://www.w3.org/TR/css-display/#ref-for-valdef-display-inline-block) 定义元素为行内块级元素。它结合了行内元素和块级元素的特性，使得元素既可以在行内显示，又可以设置宽度、高度等属性，从而在行内形成块状布局。

```css
span {
  display: inline-block;
  width: max-content;
  height: auto;
  border: 1px solid black;
  margin-bottom: 10px;
}
```

### 可见性

[`visibility`](https://www.w3.org/TR/css-display/#propdef-visibility) 属性显示或隐藏元素而不更改文档的布局。该属性还可以隐藏 `table` 中的行或列。

```css
span {
  visibility: hidden;
}
```

## 三、Overflow

[Overflow](https://www.w3.org/TR/css-overflow-3/) 模块包含了与可滚动溢出处理相关的 CSS 特性，适用于视觉媒体。

### 滚动和剪切

[`overflow`](https://www.w3.org/TR/css-overflow-3/#propdef-overflow) 是简写属性，其设置了元素溢出时所需的行为，即当元素的内容太大而无法适应它的[区块格式化上下文](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_display/Block_formatting_context)（Block Formatting Context，BFC）时。

```css
p {
  width: 100px;
  height: 100px;
  overflow: hidden;
}
```

