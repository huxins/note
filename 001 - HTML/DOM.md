## 十一、DOM

DOM 是 HTML 和 XML 文档的编程接口。它提供了对文档的结构化表述，并定义了一种方式从程序中对该结构进行访问，从而改变文档的结构，样式和内容。

DOM 将文档解析为一个由节点和对象组成的结构集合。所有操作和创建 Web 页面的属性，方法和事件都会被组织成对象的形式。例如，`document` 对象表示文档本身，`table` 对象实现了特定的 `HTMLTableElement` 接口来访问 HTML 表格等。

### 11.1. Events

#### 11.1.1. Event

`Event` 表示在 DOM 中出现的事件。

##### 11.1.1.1. 实例属性

- **target**

  只读属性，对事件分派到的对象的引用。

##### 11.1.1.2. 实例方法

- **preventDefault**()

  通知浏览器，取消默认动作。

#### 11.1.2. EventTarget

`EventTarget` 接口由可以接收事件、并且可以创建侦听器的对象实现。

DOM 节点的事件操作，都定义在 `EventTarget` 接口。所有节点对象都实现了这个接口，其他一些需要事件通信的浏览器内置对象，比如，`XMLHttpRequest`、`AudioNode`、`AudioContext` 也实现了这个接口。

每个 `EventTarget` 对象都有一个关联的事件侦听器列表。它最初是空列表。

##### 11.1.2.1. 实例方法

- **addEventListener**(*type*, *listener*)

  将指定的监听器注册到 `EventTarget` 上。

  - **type**

    事件名称，大小写敏感。

  - **listener**

    监听函数。事件发生时，会调用该监听函数。

- **removeEventListener**()

  移除事件的监听函数。

- **dispatchEvent**()

  触发事件。

### 11.2. Nodes

#### 11.2.1. Element

所有 `Document` 对象下的对象都继承自它。这个接口描述了所有相同种类的元素所普遍具有的方法和属性。

##### 11.2.1.1. 实例方法

- **getAttribute**()

  返回元素上一个指定的属性值。如果指定的属性不存在，则返回 `null` 或空字符串 `""`。

  ```javascript
  let attribute = element.getAttribute(attributeName);
  ```

- **setAttribute**()

  设置指定元素上的某个属性值。如果属性已经存在，则更新该值；否则，使用指定的名称和值添加一个新的属性。

  ```javascript
  element.setAttribute(name, value);
  ```

#### 11.2.2. Node tree

##### 11.2.2.1. ParentNode 接口

###### 11.2.2.1.1. 实例方法

- *node*.**querySelector**(*selectors*)

  返回第一个元素，该元素是匹配选择器的节点的后代。

  - **selectors**

    有效的 CSS 选择器字符串。

  ```javascript
  const form = document.querySelector("form");
  ```

#### 11.2.3. Document

`Document` 接口表示浏览器中加载的任何网页，并充当进入网页内容（即 DOM 树）的入口点。

##### 11.2.3.1. 实例方法

- Document.**createElement**()

  `createElement()` 方法用于创建一个由标签名称 *tagName* 指定的 HTML 元素。

  ```javascript
  const textarea = document.createElement('textarea');
  ```

