# Box Model

## 一、Box Sizing

[Box Sizing](https://www.w3.org/TR/css-sizing-3/) 模块通过关键字扩展了 CSS 尺寸属性，这些关键字代表基于内容的 *intrinsic* 尺寸和基于上下文的 *extrinsic* 尺寸，使 CSS 更容易描述适合其内容或适应特定布局上下文的框。

### Box 尺寸

控制 Box 尺寸的属性有 [`width`](https://www.w3.org/TR/css-sizing-3/#propdef-width)、[`height`](https://www.w3.org/TR/css-sizing-3/#propdef-height)、[`min-width`](https://www.w3.org/TR/css-sizing-3/#propdef-min-width)、[`min-height`](https://www.w3.org/TR/css-sizing-3/#propdef-min-height)、[`max-width`](https://www.w3.org/TR/css-sizing-3/#propdef-max-width) 和 [`max-height`](https://www.w3.org/TR/css-sizing-3/#propdef-max-height)。

在 CSS 盒子模型的默认定义里，对一个元素所设置的 `width` 与 `height` 只会应用到这个元素的内容区。

```css
div {
  width: 100px;
  background-color: green;
}
```

如果 `box-sizing` 属性被设置为 `border-box`，那么设置的边框和内边距的值是包含在 `width` 内的。

```css
div {
  width: 100px;
  background-color: green;
  box-sizing: border-box;
  padding: 10px;
}
```

