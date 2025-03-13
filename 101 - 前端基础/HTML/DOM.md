# DOM

[DOM](https://dom.spec.whatwg.org/) 是 HTML 和 XML 文档的编程接口。

[文档对象模型](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model)提供了对文档的结构化表述，并定义了一种方式从程序中对该结构进行访问，从而改变文档的结构，样式和内容。

## 一、事件

在整个 Web 中，[事件](https://dom.spec.whatwg.org/#introduction-to-dom-events)被分派到对象以表示事件的发生，例如网络活动或用户交互。

这些对象实现了 [`EventTarget`](https://dom.spec.whatwg.org/#eventtarget) 接口，因此可以通过调用 [`addEventListener()`](https://dom.spec.whatwg.org/#dom-eventtarget-addeventlistener) 添加事件监听器来观察事件。

### Event

[`Event`](https://dom.spec.whatwg.org/#event) 接口表示在 DOM 中出现的事件，它允许发出发生了什么的信号，例如，图像已完成下载。

**实例属性**：

- event.[**target**](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/target)

  只读属性，对事件分派到的对象的引用。

**实例方法**：

- event.[**preventDefault**](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault)()

  通知浏览器，取消此事件的默认动作。

### EventTarget

[`EventTarget`](https://dom.spec.whatwg.org/#eventtarget) 接口由可以接收事件、并且可以创建侦听器的对象实现。

DOM 节点的事件操作，都定义在 [`EventTarget`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget) 接口。

所有节点对象都实现了这个接口，其他一些需要事件通信的浏览器内置对象，比如，`XMLHttpRequest`、`AudioNode`、`AudioContext` 也实现了这个接口。

每个 [`EventTarget`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget) 对象都有一个关联的事件侦听器列表，它最初是空列表。

**实例方法**：

- target.[**addEventListener**](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)(*type*, *listener*)

  将指定的监听器注册到 `EventTarget` 上。

  ```javascript
  const form = document.querySelector("form");
  form.addEventListener("submit", loginFun);
  ```

- target.[**removeEventListener**](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/removeEventListener)(*type*, *listener*)

  移除事件的监听函数。

- target.[**dispatchEvent**](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/dispatchEvent)(*event*)

  向一个指定的事件目标派发一个 `Event`。

## 二、节点

### Node

[`Node`](https://dom.spec.whatwg.org/#interface-node) 是一个接口，各种类型的 DOM API 对象会从这个接口继承。

**实例方法**：

- node.[**appendChild**](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/appendChild)()

  将一个节点附加到指定父节点的子节点列表的末尾处。

  ```javascript
  let a = document.createElement('a');
  a.textContent = 'Click here to visit example.com';
  a.href = 'https://www.baidu.com/';
  
  document.body.appendChild(a);
  ```

- node.[**removeChild**](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/removeChild)()

  从 DOM 中移除一个子节点，并返回移除的节点。

  ```javascript
  document.body.removeChild(a);
  ```

### Element

[`Element`](https://dom.spec.whatwg.org/#interface-element) 是最通用的基类，[`Document`](https://dom.spec.whatwg.org/#document) 中的所有元素对象都继承自它。

**实例方法**：

- element.[**getAttribute**](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getAttribute)(*attributeName*)

  返回元素上指定的属性值。如果指定的属性不存在，则返回 `null` 或 `""`。

  ```javascript
  let attribute = element.getAttribute(attributeName);
  ```

- element.[**setAttribute**](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/setAttribute)(*name*, *value*)

  设置指定元素上的某个属性值。如果属性已经存在，则更新该值；否则，使用指定的名称和值添加一个新的属性。

  ```javascript
  element.setAttribute(name, value);
  ```

### Document

[`Document`](https://dom.spec.whatwg.org/#interface-document) 接口表示浏览器中加载的任何网页，并充当进入 DOM 树的入口。

**实例方法**：

- document.[**createElement**](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createElement)(*tagName*)

  用于创建一个由标签名称 *tagName* 指定的 HTML 元素。

  ```javascript
  const textarea = document.createElement('textarea');
  ```
  
- document.[**getElementsByTagName**](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/getElementsByTagName)(*qualifiedName*)

  返回一个包括所有给定标签名称的动态 [`HTMLCollection`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCollection)。

  ```javascript
  const divList = document.getElementsByTagName("div");
  ```

### ParentNode

在 DOM 中，[`ParentNode`](https://dom.spec.whatwg.org/#interface-parentnode) 是一个混入（mixin），它包含了一些方法和属性，这些方法和属性对所有可以拥有子节点的 Node 对象都是通用的。

具体来说，[`ParentNode`](http://udn.realityripple.com/docs/Web/API/ParentNode) 由三个对象实现：`Element` 对象、`Document` 对象和 `DocumentFragment` 对象。

任何可以包含子节点的对象都会具有 `ParentNode` 中定义的那些方法和属性。

例如，像 [`children`](https://dom.spec.whatwg.org/#dom-parentnode-children)、[`firstElementChild`](https://dom.spec.whatwg.org/#dom-parentnode-firstelementchild)、[`lastElementChild`](https://dom.spec.whatwg.org/#dom-parentnode-lastelementchild) 这样的属性，以及像 [`append`](https://dom.spec.whatwg.org/#dom-parentnode-append)、[`prepend`](https://dom.spec.whatwg.org/#dom-parentnode-prepend) 这样的操作子节点的方法，都是 `ParentNode` 提供的。

**实例方法**：

- node.[**querySelector**](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/querySelector)(*selectors*)

  返回与指定的选择器组匹配的第一个元素。

  ```javascript
  const form = document.querySelector("form");
  ```

- node.[**querySelectorAll**](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/querySelectorAll)(*selectors*)

  返回与指定的选择器组匹配的静态 [`NodeList`](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList)。

  ```javascript
  const divList = document.querySelectorAll("div");
  ```

