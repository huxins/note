# Inline Layout

CSS 格式化模型提供了一种将容器内的元素和文本打包成行的流。

[Inline Layout](https://www.w3.org/TR/css-inline/) 模块描述了行内布局的盒模型，并定义了行级内容在块轴上的对齐和尺寸。

## 行间间距

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