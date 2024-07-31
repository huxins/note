# CSS













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

