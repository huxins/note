# CSS Fonts

[Fonts](https://www.w3.org/TR/css-fonts-3/) 模块描述了如何指定字体属性以及如何动态加载字体资源。

[Font Loading](https://drafts.csswg.org/css-font-loading-3/) 模块描述了用于动态加载字体资源的事件和接口。

## 一、字体属性

[`font-family`](https://www.w3.org/TR/css-fonts-3/#propdef-font-family) 属性通过给定一个有先后顺序的，由字体名或者字体族名组成的列表来为选定的元素设置字体。

```css
h1 {
  font-family: 'Open Sans', serif;
}
```

[`font-size`](https://www.w3.org/TR/css-fonts-3/#propdef-font-size) 属性设置字体大小。

```css
h1 {
  font-size: 64px;
}
```

## 二、字体资源

[`@font-face`](https://www.w3.org/TR/css-fonts-3/#at-font-face-rule) [At-Rule](https://www.w3.org/TR/css-syntax-3/#ref-for-at-rule%E2%91%A0%E2%91%A0) 指定一个用于显示文本的自定义字体。

例如，通过 `@font-face` 从服务器上下载字体。

```html
<link rel="stylesheet" href="https://fonts.font.im/css?family=Open+Sans" />
```

