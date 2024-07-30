# CSS









## 七、内联布局

### 7.1. 行间距

#### 7.1.1. line-height

`line-height` 属性用于设置多行文本的间距。

```css
p {
  line-height: 1.2;
}
```

### 7.2. 基线对齐

#### 7.2.1. vertical-align

`vertical-align` 属性用来指定行内元素的垂直对齐方式。

```css
img {
  vertical-align: top;
}
```

## 八、Display

### 8.1. display

`display` 属性定义元素的显示类型。

```css
p {
  display: block;
}
```

#### 8.1.1. display-box

- `none`

  元素及其子元素不生成 Box 或文本序列。

  ```css
  p {
    display: none;
  }
  ```

#### 8.1.2. display-legacy

- `inline-block`

  元素显示为行内块级元素的一种显示模式。它结合了行内元素和块级元素的特性，使得元素既可以在行内显示，又可以设置宽度、高度等属性，从而在行内形成块状布局。

  ```css
  span {
    display: inline-block;
    width: 30px;
    height: 30px;
  }
  ```

### 8.2. visibility

`visibility` 属性显示或隐藏元素而不更改文档的布局。

```css
span {
  visibility: hidden;
}
```

## 九、Overflow

### 9.1. overflow

`overflow` 是简写属性，其设置了元素溢出时所需的行为。

```css
p {
  width: 100px;
  height: 100px;
  overflow: hidden;
}
```

## 十、Color

### 10.1. opacity

`opacity` 属性指定了一个元素的不透明度。换言之，`opacity` 属性指定了一个元素后面的背景的被覆盖程度。

```css
img {
  opacity: 0.6;
}
```

## 十一、层叠和继承

### 11.1. 默认值

- `initial`

  `initial` 将属性的初始值应用于元素。

  ```css
  img {
    opacity: initial;
  }
  ```

- `unset`

  `unset` 可以分为两种情况，如果这个属性有从父级继承的值，则将该属性重新设置为继承的值，如果没有继承父级样式，则将该属性重新设置为初始值。

  例如，`margin` 和 `padding` 不是继承属性，使用 `unset` 将该属性重新设置为初始值；`font-size` 是继承属性，使用 `unset` 将该属性重新设置为继承的值。

  ```css
  ul {
    margin: unset;
    padding: unset;
    font-size: unset;
  }
  ```

- `revert`

  `revert` 将属性重置为浏览器默认样式。

  ```css
  ul {
    margin: revert;
    padding: revert;
  }
  ```

