# Inline Layout

CSS [格式化模型](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Visual_formatting_model)中的[行内格式化上下文](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_display/Introduction_to_formatting_contexts#%E8%A1%8C%E5%86%85%E6%A0%BC%E5%BC%8F%E5%8C%96%E4%B8%8A%E4%B8%8B%E6%96%87)通过流式布局机制，将容器内的行内级元素（如文本、图片、按钮等）按照书写顺序依次排列成水平行（行框）。

当内容超出容器宽度时，会自动换行生成新的行框，这种动态的换行规则使元素和文本在垂直方向形成自然的段落流，同时通过 [`vertical-align`](https://www.w3.org/TR/css-inline/#propdef-vertical-align) 等属性实现行内元素间的垂直对齐。

该模型的核心是通过计算行框高度和内容流向来实现灵活的自适应布局。

[Inline Layout](https://www.w3.org/TR/css-inline/) 模块描述了行内布局的盒模型，并定义了行级内容在块轴上的对齐和尺寸。

## 一、行间间距

[`line-height`](https://www.w3.org/TR/css-inline/#propdef-line-height) 属性用于设置多行元素的空间量，如多行文本的间距。

```css
p {
  line-height: 1.2;
}
```

## 二、基线对齐

[`vertical-align`](https://www.w3.org/TR/css-inline/#propdef-vertical-align) 属性用来指定行内元素的垂直对齐方式。

```css
img {
  vertical-align: top;
}
```

## Reference

- [深入 CSS 之 `line-height` 应用 - *MUKI space*](https://muki.tw/css-line-height/)

