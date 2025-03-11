# CSS Box Model

[Box Model](https://www.w3.org/TR/css-box-3/) 模块描述了 [`margin`](https://www.w3.org/TR/css-box-3/#margins) 和 [`padding`](https://www.w3.org/TR/css-box-3/#paddings) 属性，这些属性用于在 CSS 盒模型内部及周围创建间距。

[Box Sizing](https://www.w3.org/TR/css-sizing-3/) 模块通过引入基于内容的 [`intrinsic`](https://www.w3.org/TR/css-sizing-3/#intrinsic) 尺寸和基于上下文的 [`extrinsic`](https://www.w3.org/TR/css-sizing-3/#extrinsic) 尺寸，扩展了 CSS 的尺寸属性。这使得 CSS 能够更轻松地描述那些适应自身内容或融入特定布局上下文的盒子。

## 一、尺寸

控制 Box 尺寸的属性有 [`width`](https://www.w3.org/TR/css-sizing-3/#propdef-width)、[`height`](https://www.w3.org/TR/css-sizing-3/#propdef-height)、[`min-width`](https://www.w3.org/TR/css-sizing-3/#propdef-min-width)、[`min-height`](https://www.w3.org/TR/css-sizing-3/#propdef-min-height)、[`max-width`](https://www.w3.org/TR/css-sizing-3/#propdef-max-width) 和 [`max-height`](https://www.w3.org/TR/css-sizing-3/#propdef-max-height)。

在 CSS 盒模型的默认定义里，对一个元素所设置的 `width` 与 `height` 只会应用到这个元素的内容区。

```css
div {
  width: 100px;
  background-color: green;
}
```

如果 [`box-sizing`](https://www.w3.org/TR/css-sizing-3/#propdef-box-sizing) 属性被设置为 [`border-box`](https://www.w3.org/TR/css-sizing-3/#valdef-box-sizing-border-box)，那么设置的边框和内边距的值是包含在 `width` 和 `height` 内的。

```css
div {
  width: 100px;
  height: 100px;
  background-color: green;
  box-sizing: border-box;
  padding: 10px;
  border: 10px solid black;
}
```

如果需要根据内容长度，动态设置宽高时，可以使用 [`min-content`](https://www.w3.org/TR/css-sizing-3/#valdef-width-min-content) 或 [`max-content`](https://www.w3.org/TR/css-sizing-3/#valdef-width-max-content) 属性值。

对于文本内容而言，`min-content` 表示的是内容的最小宽度，会利用所有软换行的机会，使大小不会超过最长单词的宽度。

```html
<p class="max-content">This is a long piece of text that might need different width settings.</p>
<p class="min-content">This is a long piece of text that might need different width settings.</p>
```

```css
.max-content {
  width: max-content;
  border: 1px solid black;
}

.min-content {
  width: min-content;
  border: 1px solid black;
}
```

