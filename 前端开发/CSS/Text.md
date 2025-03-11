# CSS Text

[Text](https://www.w3.org/TR/css-text-3/) 模块定义了用于文本操作的属性，并规定了其处理模型。

其内容包括换行规则、两端对齐与对齐方式、空白符处理以及文本转换机制。

## 一、对齐

[Alignment and Justification](https://www.w3.org/TR/css-text-3/#justification) 决定了行内内容在行盒中的分布方式。

Alignment（对齐）和 Justification（两端对齐）的区别主要在于它们针对的轴向和应用场景不同。

- **Justification**

  作用于主轴（Main Axis）或行内轴（Inline Axis）（默认水平方向）。

- **Alignment**

  作用于交叉轴（Cross Axis）或块轴（Block Axis）（默认垂直方向）。

### text-align

[`text-align`](https://www.w3.org/TR/css-text-3/#propdef-text-align) 属性设置块级元素内部内容的水平对齐方式（作用于行内轴），主要影响行内内容（如文本、图片、行内块元素）的对齐。

**书写模式决定轴方向**：在默认的水平书写模式（如拉丁语系）中：

- 行内轴（Inline Axis）是水平方向（→）。
- 块轴（Block Axis）是垂直方向（↓）。

因此，`text-align` 在默认情况下表现为水平对齐，但它实际是行内轴对齐。如果使用竖排书写模式（如中文竖排），`text-align` 会变成垂直对齐。

例如，两端对齐段落。

```css
p { text-align: justify; }
```

例如，居中标题。

```css
h1 { text-align: center; }
```

例如，右对齐导航链接。

```css
.nav { text-align: right; }
```

## 二、间距

CSS 提供了通过 [`word-spacing`](https://www.w3.org/TR/css-text-3/#word-spacing-property)（词间距）和 [`letter-spacing`](https://www.w3.org/TR/css-text-3/#letter-spacing-property)（字符间距）属性控制文本间距的功能，这两个属性分别用于指定单词分隔符周围的额外间距或排版字符单元之间的间距。

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

## Reference

- 竖版排版的网页
  - [直排诗文网](https://poet.imaiko.com/)
  - [HIROKA KISHIMOTO | 岸本浩加 | 着物](https://hirokakishimoto.jp/)
  - [たてよこWebアワード](https://tategaki.github.io/awards/)

