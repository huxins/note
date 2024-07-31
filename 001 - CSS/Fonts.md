# Fonts

## 一、字体

[Fonts](https://www.w3.org/TR/css-fonts-3/) 模块描述了如何指定字体属性以及如何动态加载字体资源。

### 设置字体

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

### 字体资源

[`@font-face`](https://www.w3.org/TR/css-fonts-3/#at-font-face-rule) [at-rule](https://www.w3.org/TR/css-syntax-3/#ref-for-at-rule%E2%91%A0%E2%91%A0) 指定一个用于显示文本的自定义字体。

通过 `@font-face` 从服务器上下载字体。

```html
<link rel="stylesheet" href="https://fonts.font.im/css?family=Open+Sans" />
```

## 二、文字排版

[Text](https://www.w3.org/TR/css-text-3/) 模块定义了文本操作的属性，并指定了它们的处理模型。它涵盖了换行、对齐、空格处理和文本转换。

### 对齐

[`text-align`](https://www.w3.org/TR/css-text-3/#propdef-text-align) 属性设置块元素的行内内容的水平对齐。

```css
p {
  text-align: center;
}
```

### 间距

[`letter-spacing`](https://www.w3.org/TR/css-text-3/#propdef-letter-spacing) 属性用于设置文本字符的额外间距。

```css
p {
  letter-spacing: 1px;
}
```

[`word-spacing`](https://www.w3.org/TR/css-text-3/#propdef-word-spacing) 属性用于设置标签、单词之间的额外间距。

```css
p {
  word-spacing: 4px;
}
```

