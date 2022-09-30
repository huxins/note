# DOM

文档对象模型（DOM）是 HTML 和 XML 文档的编程接口。它提供了对文档的结构化的表述，并定义了一种方式可以使从程序中对该结构进行访问，从而改变文档的结构，样式和内容。DOM 将文档解析为一个由节点和对象（包含属性和方法的对象）组成的结构集合。简言之，它会将 web 页面和脚本或程序语言连接起来。

一个 web 页面是一个文档。这个文档可以在浏览器窗口或作为 HTML 源码显示出来。但上述两个情况中都是同一份文档。文档对象模型（DOM）提供了对同一份文档的另一种表现，存储和操作的方式。DOM 是 web 页面的完全的面向对象表述，它能够使用如 JavaScript 等脚本语言进行修改。

所有操作和创建 web 页面的属性，方法和事件都会被组织成对象的形式（例如，`document` 对象表示文档本身，`table` 对象实现了特定的 `HTMLTableElement` DOM 接口来访问 HTML 表格等）。

## Nodes

### Node tree

**Nodes** 是实现 Node 接口的对象。**Nodes** 参与一棵树，称为 **node tree**。

#### Mixin ParentNode

要将 **nodes** 转换为 **node**，给定 *nodes* 和 *document*，运行这些步骤：

1. 让 *node* 为 null。
2. 将 *nodes* 中的每个字符串替换为一个新的 Text node，其数据为字符串，node document 为 *document*。



## 参见

- [DOM Living Standard](https://dom.spec.whatwg.org/)

