# DOM

DOM 是 HTML 和 XML 文档的编程接口。它提供了对文档的结构化表述，并定义了一种方式从程序中对该结构进行访问，从而改变文档的结构，样式和内容。

## 一、Events

### 1.1. Event

`Event` 接口表示在 DOM 中出现的事件。

实例属性：

- Event.**target**

  只读属性，对事件分派到的对象的引用。

实例方法：

- Event.**preventDefault**()

  通知浏览器，取消默认动作。

### 1.2. EventTarget

`EventTarget` 接口由可以接收事件、并且可以创建侦听器的对象实现。

DOM 节点的事件操作，都定义在 `EventTarget` 接口。所有节点对象都实现了这个接口，其他一些需要事件通信的浏览器内置对象，比如，`XMLHttpRequest`、`AudioNode`、`AudioContext` 也实现了这个接口。

每个 `EventTarget` 对象都有一个关联的事件侦听器列表。它最初是空列表。

实例方法：

- EventTarget.**addEventListener**(*type*, *listener*)

  将指定的监听器注册到 `EventTarget` 上。

  ```javascript
  const form = document.querySelector("form");
  form.addEventListener("submit", loginFun);
  ```

- EventTarget.**removeEventListener**(*type*, *listener*)

  移除事件的监听函数。

- EventTarget.**dispatchEvent**(*event*)

  向一个指定的事件目标派发一个 `Event`。

## 二、Nodes

### 2.1. Element

`Document` 中的所有元素对象都继承自它。

实例方法：

- Element.**getAttribute**(*attributeName*)

  返回元素上一个指定的属性值。如果指定的属性不存在，则返回 `null` 或 `""`。

  ```javascript
  let attribute = element.getAttribute(attributeName);
  ```

- Element.**setAttribute**(*name*, *value*)

  设置指定元素上的某个属性值。如果属性已经存在，则更新该值；否则，使用指定的名称和值添加一个新的属性。

  ```javascript
  element.setAttribute(name, value);
  ```

### 2.2. Node tree

#### 2.2.1. ParentNode

实例方法：

- Node.**querySelector**(*selectors*)

  返回与指定的选择器组匹配的第一个元素。

  ```javascript
  const form = document.querySelector("form");
  ```

### 2.3. Document

`Document` 接口表示浏览器中加载的任何网页，并充当进入 DOM 树的入口。

实例方法：

- Document.**createElement**(*tagName*)

  `createElement()` 方法用于创建一个由标签名称 *tagName* 指定的 HTML 元素。

  ```javascript
  const textarea = document.createElement('textarea');
  ```

