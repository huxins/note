# CSS 背景和边框

[Backgrounds and Borders](https://www.w3.org/TR/css-backgrounds-3/) 模块包含了与边框和背景相关的 CSS 特性。

## 一、背景

每个盒模型都有一个[背景](https://www.w3.org/TR/css-backgrounds-3/#backgrounds)层，默认是完全透明的，可以填充颜色和图像。

背景属性不会被继承，但由于 [`background-color`](https://www.w3.org/TR/css-backgrounds-3/#propdef-background-color) 的初始透明值，默认情况下父盒的背景会发光。

### 背景颜色

[`background-color`](https://www.w3.org/TR/css-backgrounds-3/#propdef-background-color) 属性设置盒子的背景颜色，此颜色绘制在任何背景图像后面。

```css
h1 {
  background-color: green;
  width: max-content;
}
```

