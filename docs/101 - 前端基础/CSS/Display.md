# Display

[Display](https://www.w3.org/TR/css-display/) 模块描述了如何从文档元素树生成 CSS 格式化盒树，并定义了控制该过程的 [`display`](https://www.w3.org/TR/css-display/#propdef-display) 属性。

## 一、盒布局模式

[`display`](https://www.w3.org/TR/css-display/#propdef-display) 属性设置元素的显示类型，包括[内部显示](https://www.w3.org/TR/css-display/#typedef-display-inside)类型和[外部显示](https://www.w3.org/TR/css-display/#typedef-display-outside)类型。

外部显示类型决定元素是否被视为块级或行内盒子，以及它在文档流中的表现方式。

内部显示类型则决定子元素的布局方式，例如流式布局、网格布局或弹性布局。

### 外部显示

[display-outside](https://www.w3.org/TR/css-display/#typedef-display-outside) 规定元素的外部显示类型，实际上就是其在流式布局中的角色。

- **block**

  [`block`](https://www.w3.org/TR/css-display/#ref-for-valdef-display-block) 定义元素生成一个块级盒子。在正常的流中，该元素之前和之后产生换行。
  
  ```css
  p {
    display: block;
  }
  ```

### 其他显示

- **none**

  [`none`](https://www.w3.org/TR/css-display/#ref-for-valdef-display-none%E2%91%A2) 定义元素及其子元素不生成 Box 或文本序列。
  
  ```css
  p {
    display: none;
  }
  ```

- **inline-block**

  [`inline-block`](https://www.w3.org/TR/css-display/#ref-for-valdef-display-inline-block) 定义元素为行内块级元素。
  
  它结合了行内元素和块级元素的特性，使得元素既可以在行内显示，又可以设置宽度、高度等属性，从而在行内形成块状布局。
  
  ```css
  span {
    display: inline-block;
    width: max-content;
    height: auto;
    border: 1px solid black;
    margin-bottom: 10px;
  }
  ```

## 二、可见性

[`visibility`](https://www.w3.org/TR/css-display/#propdef-visibility) 属性显示或隐藏元素而不更改文档的布局。该属性还可以隐藏 `table` 中的行或列。

```css
span {
  visibility: hidden;
}
```

