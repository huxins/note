# DOM

DOM 是 HTML 和 XML 文档的编程接口。它提供了对文档的结构化的表述，并定义了一种方式可以使从程序中对该结构进行访问，从而改变文档的结构，样式和内容。

DOM 将文档解析为一个由节点和对象组成的结构集合。所有操作和创建 web 页面的属性，方法和事件都会被组织成对象的形式。例如，`document` 对象表示文档本身，`table` 对象实现了特定的 `HTMLTableElement` 接口来访问 HTML 表格等。

## Events

### EventTarget 接口

`EventTarget` 对象表示一个 target，当某事发生时可以将事件分派到该 target。

DOM 节点的事件操作（监听和触发），都定义在 `EventTarget` 接口。所有节点对象都部署了这个接口，其他一些需要事件通信的浏览器内置对象（比如，`XMLHttpRequest`、`AudioNode`、`AudioContext`）也部署了这个接口。

每个 `EventTarget` 对象都有一个关联的事件侦听器列表（零个或多个事件侦听器的列表）。它最初是空列表。

该接口主要提供三个实例方法：

- `addEventListener()`：绑定事件的监听函数
- `removeEventListener()`：移除事件的监听函数
- `dispatchEvent()`：触发事件

#### 方法

##### EventTarget.addEventListener()

`EventTarget.addEventListener()` 用于在当前节点或对象上（即部署了 `EventTarget` 接口的对象），定义一个特定事件的监听函数。一旦这个事件发生，就会执行监听函数。该方法没有返回值。

```javascript
target.addEventListener(type, listener[, useCapture]);
```

该方法接受三个参数：

- `type`：事件名称，大小写敏感。
- `listener`：监听函数。事件发生时，会调用该监听函数。
- `useCapture`：布尔值，如果设为 `true`，表示监听函数将在捕获阶段触发。该参数可选，默认值为 `false`（监听函数只在冒泡阶段被触发）。

## Nodes

### Node tree

**Nodes** 是实现 Node 接口的对象。**Nodes** 参与一棵树，称为 **node tree**。

#### Mixin ParentNode

要将 **nodes** 转换为 **node**，给定 *nodes* 和 *document*，运行这些步骤：

1. 让 *node* 为 null。
2. 将 *nodes* 中的每个字符串替换为一个新的 Text node，其数据为字符串，node document 为 *document*。

### Element 接口

元素节点简称为元素。

#### 方法

##### getAttribute()

返回元素上一个指定的属性值。如果指定的属性不存在，则返回 `null` 或空字符串 `""`。

```javascript
let attribute = element.getAttribute(attributeName);
```

##### setAttribute()

设置指定元素上的某个属性值。如果属性已经存在，则更新该值；否则，使用指定的名称和值添加一个新的属性。

```javascript
element.setAttribute(name, value);
```

## 参见

- [DOM Living Standard - WHATWG](https://dom.spec.whatwg.org/)

