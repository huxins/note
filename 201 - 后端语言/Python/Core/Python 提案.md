# Python 增强提案

[Python Enhancement Proposals](https://peps.python.org/)（PEPs）是 Python 社区用于提出、讨论和记录 Python 语言改进和新特性的一种正式化文档。

PEPs 的类型主要包括：

- **标准跟踪 PEP**（Standards Track PEPs）：这些提案涉及对 Python 语言本身的变更、标准库的变更或者新的标准。
- **信息性 PEP**（Informational PEPs）：这些提案提供一般性指导或者信息，但不提出新的特性或功能。
- **流程 PEP**（Process PEPs）：这些提案描述 Python 社区的流程、决策过程和其他运营方面的事务。

## 定义源代码编码

[PEP 263](https://peps.python.org/pep-0263/) 建议引入一种语法来声明 Python 源文件的编码。默认情况下，Python 源码文件的编码是 `UTF-8`。如果不使用默认编码，则要声明文件的编码，文件的第一行要写成特殊注释。

```python
# -*- coding: encoding -*-
```

其中，*encoding* 可以是 Python 支持的任意一种 [codecs](https://docs.python.org/3/library/codecs.html#standard-encodings)。

比如，声明使用 `utf8` 编码。

```python
# -*- coding: utf8 -*-
```

第一行的规则也有一种例外情况，源码以 [UNIX Shebang](https://en.wikipedia.org/wiki/Shebang_(Unix)) 开头。此时，编码声明要写在文件的第二行。

```python
#!/usr/bin/env python3
# -*- coding: utf8 -*-
```

## 导入多行模块

[PEP 328](https://peps.python.org/pep-0328/) 实现了更优雅的从一个模块或包中导入多个标识符。

```python
from Tkinter import (Tk, Frame, Button, Entry, Canvas, Text,
    LEFT, DISABLED, NORMAL, RIDGE, END)
```

## 类型提示

[PEP 484](https://peps.python.org/pep-0484/) 实现了类型提示。

函数参数中的冒号，是参数的类型建议符，告诉程序员希望传入的实参的类型。

```python
def func(a: int, b: int):
    print(a + b)

func(1, 2)
```

函数后面的箭头，是函数返回值的类型建议符，用来说明该函数返回的值是什么类型。

```python
def func(a, b) -> int:
    return a + b

func(1, 2)
```

## 数字字面量下划线

[PEP 515](https://peps.python.org/pep-0515/) 提议扩展 Python 的语法和 *number-from-string* 构造函数，以便下划线可以用作视觉分隔符，用于整数、浮点和复数文字中的数字分组目的。

以千为单位对十进制数进行分组。

```python
amount = 10_000_000.0
```

按单词对十六进制地址进行分组。

```python
addr = 0xCAFE_F00D
```

在二进制文字中将位分组为半字节。

```python
flags = 0b_0011_1111_0100_1110
flags = int('0b_1111_0000', 2)
```

