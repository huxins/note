# Python

## 1. 安装和使用

### 1.1. 命令行与环境

#### 1.1.1. 命令行

调用 Python 时，可以指定下列任意选项：

```
python [-bBdEhiIOqsSuvVWx?] [-c command | -m module-name | script | - ] [args]
```

##### 1.1.1.1. 接口选项

- **-c** *`<command>`*

  执行 *command* 中的 Python 代码。*command* 可以是一条语句，也可以是用换行符分隔的多条语句，其中，前导空白字符与普通模块代码中的作用一样。

  使用此选项时，`sys.argv` 的首个元素为 `'-c'`，并会把当前目录加入至 `sys.path` 开头。

  ```sh
  $ python -c "import sys; print(sys.argv)"
  $ python -c "import sys; print(sys.path)"
  ```

- **-m** *`<module-name>`*

  在 `sys.path` 中搜索指定模块，并以 `__main__` 模块执行其内容。

  ```sh
  $ python -m pip --version
  ```

## 2. 安装 Python 模块

### 2.1. 关键术语

- `pip`：是首选的安装程序。从 Python 3.4 开始，它默认包含在 Python 二进制安装程序中。
- *virtual environment*：是一种半隔离的 Python 环境，允许为特定的应用安装各自的包，而不是安装到整个系统。
- `venv`：是创建虚拟环境的标准工具，从 Python 3.3 开始成为 Python 的组成部分。从 Python 3.4 开始，它会默认安装 `pip` 到所创建的全部虚拟环境。
- `virtualenv`：是 `venv` 的第三方替代及其前身。它允许在 Python 3.4 之前的版本中使用虚拟环境，那些版本或是完全不提供 `venv`，或是不会自动安装 `pip` 到所创建的虚拟环境。
- [Python Package Index](https://pypi.org/)：是一个开源许可的软件包公共存储库，可供所有 Python 用户使用。
- `distutils`：是最初的构建和分发系统，于 1998 年首次加入 Python 标准库。虽然直接使用 `distutils` 的方式已被淘汰，它仍然是当前打包和分发架构的基础，而且它不仅仍然是标准库的一部分，这个名称还以其他方式存在，例如用于协调 Python 打包标准开发流程的邮件列表就以此命名。

### 2.2. 虚拟环境

Python 虚拟环境允许将 Python 包安装在特定应用程序的隔离位置，而不是全局安装。

- 使用 `venv`

  - 创建虚拟环境

    ```sh
    $ python3 -m venv <DIR>
    ```
    
  - 激活虚拟环境
    
    ```sh
    $ source <DIR>/bin/activate  # Linux
    $ <DIR>\Scripts\activate     # Windows
    ```
    
  - 退出虚拟环境
  
    ```sh
    $ source <DIR>/bin/deactivate  # Linux
    $ <DIR>\Scripts\deactivate     # Windows
    ```

## 3. Python 标准库

### 3.1. 内置函数

#### `bytes()`

```
bytes(source=b'')
bytes(source, encoding)
bytes(source, encoding, errors)
```

返回一个新的 bytes 对象，这是一个不可变序列，包含范围为 `0 <= x < 256` 的整数。

```python
bytes('Hello', encoding='utf8')
```

#### `int()`

```python
int(x=0)
int(x, base=10)
```

返回一个基于数字或字符串 *x* 构造的整数对象，或者在未给出参数时返回 `0`。如果 *x* 定义了 `__int__()`，`int(x)` 将返回 `x.__int__()`。如果 *x* 定义了 `__index__()`，它将返回 `x.__index__()`。如果 *x* 定义了 `__trunc__()`，它将返回 `x.__trunc__()`。对于浮点数，它将向零舍入。

如果 *x* 不是数字，或者有 *base* 参数，则 *x* 必须是字符串、*bytes* 或 *bytearray* 实例，表示进制为 *base* 的整数字面值。字面值前可以加上 `+` 或 `-`。一个进制为 *n* 的数字包含 *0* 到 *n-1* 的数，其中 *a-z* 或 *A-Z* 表示 *10* 到 *35*。默认的 *base* 为 10，允许的进制有 0、2-36。2、8、16 进制的数字可以在代码中用 `0b`/`0B`、`0o`/`0O`、`0x`/`0X` 前缀来表示。进制为 0 将按照代码的字面量来精确解释，最后的结果会是 2、8、10、16 进制中的一个。所以 `int('010', 0)` 是非法的，但 `int('010')` 和 `int('010', 8)` 是合法的。

```python
int('0b_1111_0000', 2)     # 二进制转十进制
```

#### `isinstance()`

- **isinstance**(*object*, *classinfo*)

  如果对象参数是 *classinfo* 参数或其子类的实例，则返回 True。

#### `open()`

```
open(file, mode='r', buffering=-1, encoding=None, errors=None, newline=None, closefd=True, opener=None)
```

打开 *file* 并返回对应的 *file object*。如果该文件不能被打开，则引发 `OSError`。

| 字符 | 含义                                       |
| ---- | ------------------------------------------ |
| `r`  | 读取，默认值                               |
| `w`  | 写入                                       |
| `x`  | 排它性创建，如果文件已存在则失败           |
| `a`  | 打开文件用于写入，如果文件存在则在末尾追加 |
| `b`  | 二进制模式                                 |
| `t`  | 文本模式，默认                             |
| `+`  | 打开用于更新，读取与写入                   |

#### `repr()`

返回包含对象的可打印表示形式的字符串。

#### `str()`

```
str(object='')
str(object=b'', encoding='utf-8', errors='strict')
```

返回一个 str 版本的 object。

```python
str(b'Hello', encoding="utf-8")
```

#### `__import__()`

```python
__import__(name, globals=None, locals=None, fromlist=(), level=0)
```

此函数会由 `import` 语句发起调用。它可以被替换[^1]以便修改 `import` 语句的语义，但是强烈不建议这样做，因为使用导入钩子[^2] 通常更容易实现同样的目标，并且不会导致代码问题，因为许多代码都会假定所用的是默认实现。同样也不建议直接使用 `__import__()` 而应该用 `importlib.import_module()`。

本函数会导入模块 *name*，利用 *globals* 和 *locals* 来决定如何在包的上下文中解释该名称。*fromlist* 给出了应从 *name* 模块中导入的对象或子模块的名称。标准的实现代码完全不会用到 *locals* 参数，只用到了 *globals* 用于确定 `import` 语句所在的包上下文。

*level* 指定是使用绝对还是相对导入。`0` 意味着仅执行绝对导入。*level* 为正数值表示相对于模块调用 `__import__()` 的目录，将要搜索的父目录层数[^3]。

当 *name* 变量的形式为 `package.module` 时，通常将会返回最高层级的包，而不是以 *name* 命名的模块。但是，当给出了非空的 *fromlist* 参数时，则将返回以 *name* 命名的模块。

例如，语句 `import time` 的结果将为与以下代码作用相同的字节码：

```python
time = __import__('time', globals(), locals(), [], 0)
```

语句 `import lxml.html` 的结果将为以下调用：

```python
lxml = __import__('lxml.html', globals(), locals(), [], 0)
```

请注意，在这里 `__import__()` 是返回顶层模块的，因为这是通过 `import` 语句绑定到特定名称的对象。

另一方面，语句 `from lxml.html import fromstring, document_fromstring as doc_fromstring` 的结果将为：

```python
_temp = __import__('lxml.html', globals(), locals(), ['fromstring', 'document_fromstring'], 0)
fromstring = _temp.fromstring
doc_fromstring = _temp.document_fromstring
```

在这里，`lxml.html` 模块会由 `__import__()` 返回。要导入的对象将从此对象中提取并赋值给它们对应的名称。

如果您只想按名称导入模块，请使用 `importlib.import_module()`。

### 3.3. 内置类型

#### 3.3.4. 数字类型 - int, float, complex

共有三种不同的数字类型：[整数](https://docs.python.org/zh-cn/3/library/functions.html#int)、[浮点数](https://docs.python.org/zh-cn/3/library/functions.html#float)和[复数](https://docs.python.org/zh-cn/3/library/functions.html#complex)。此外，[布尔值](https://docs.python.org/zh-cn/3/library/functions.html#bool)是整数的子类型。

整数和浮点数支持下列运算：

| 运算           | 结果                  |
| -------------- | --------------------- |
| `x + y`        | *x* 和 *y* 的和       |
| `x - y`        | *x* 和 *y* 的差       |
| `x * y`        | *x* 和 *y* 的乘积     |
| `x / y`        | *x* 和 *y* 的商       |
| `x // y`       | *x* 和 *y* 的商数[^4] |
| `x % y`        | `x / y` 的余数        |
| `-x`           | *x* 取反              |
| `+x`           | *x* 不变              |
| `abs(x)`       | *x* 的绝对值          |
| `int(x)`       | 将 *x* 转换为整数     |
| `float(x)`     | 将 *x* 转换为浮点数   |
| `divmod(x, y)` | `(x // y, x % y)`     |
| `pow(x, y)`    | *x* 的 *y* 次幂       |
| `x ** y`       | *x* 的 *y* 次幂       |

#### 3.3.6. 序列类型 - list, tuple, range

##### 3.3.6.1. 通用序列操作

大多数序列类型，包括可变类型和不可变类型都支持下表中的操作。

| 运算                   | 结果                                                         |
| ---------------------- | ------------------------------------------------------------ |
| `x in s`               | 如果 *s* 中的某项等于 *x* 则结果为 True，否则为 False        |
| `x not in s`           | 如果 *s* 中的某项等于 *x* 则结果为 False，否则为 True        |
| `s + t`                | *s* 与 *t* 相拼接                                            |
| `s * n` 或 `n * s`     | 相当于 *s* 与自身进行 *n* 次拼接                             |
| `s[i]`                 | *s* 的第 *i* 项，起始为 0                                    |
| `s[i:j]`               | *s* 从 *i* 到 *j* 的切片                                     |
| `s[i:j:k]`             | *s* 从 *i* 到 *j* 步长为 *k* 的切片                          |
| `len(s)`               | *s* 的长度                                                   |
| `min(s)`               | *s* 的最小项                                                 |
| `max(s)`               | *s* 的最大项                                                 |
| `s.index(x[, i[, j]])` | *x* 在 *s* 中首次出现项的索引号（索引号在 *i* 或其后且在 *j* 之前） |
| `s.count(x)`           | *x* 在 *s* 中出现的总次数                                    |

##### 3.3.6.2. 不可变序列类型

不可变序列类型普遍实现而可变序列类型未实现的唯一操作就是对 `hash()` 内置函数的支持。

这种支持允许不可变类型，例如 `tuple` 实例被用作 `dict` 键，以及存储在 `set` 和 `frozenset` 实例中。

尝试对包含有不可哈希值的不可变序列进行哈希运算将会导致 TypeError。

##### 3.3.6.4. 列表

列表是可变序列，通常用于存放同类项目的集合。

可以用多种方式构建列表：

- 使用一对方括号来表示空列表：`[]`
- 使用方括号，其中的项以逗号分隔：`[a]`, `[a, b, c]`
- 使用列表推导式：`[x for x in iterable]`
- 使用类型的构造器：`list()` 或 `list(iterable)`

###### 3.3.6.4.1. 列表推导式

列表推导式提供了一种简明扼要的方法来创建列表。

它的结构是在一个中括号里包含一个表达式，然后是一个 `for` 语句，然后是 0 个或多个 `for` 或者 `if` 语句。那个表达式可以是任意的，意思是你可以在列表中放入任意类型的对象。返回结果将是一个新的列表，在这个以 `if` 和 `for` 语句为上下文的表达式运行完成之后产生。

列表推导式的执行顺序：各语句之间是嵌套关系，左边第二个语句是最外层，依次往右进一层，左边第一条语句是最后一层。

例如：

```python
[x * y for x in range(1, 5) if x > 2 for y in range(1, 4) if y < 3]
```

他的执行顺序是：

```python
for x in range(1, 5):
    if x > 2:
        for y in range(1, 4):
            if y < 3:
                append(x * y)
```

##### 3.3.6.5. 元组

元组是不可变序列，通常用于储存异构数据的多项集。

可以用多种方式构建元组：

- 使用一对圆括号来表示空元组：`()`
- 使用一个后缀的逗号来表示单元组： `a,` 或 `(a,)`
- 使用以逗号分隔的多个项：`a, b, c` or `(a, b, c)`
- 使用内置的 `tuple()`：`tuple()` 或 `tuple(iterable)`

#### 3.3.7. 文本序列类型 - str

在 Python 中处理文本数据是使用 [str](https://docs.python.org/zh-cn/3/library/stdtypes.html#str) 对象，也称为字符串。字符串是由 Unicode 码位构成的不可变序列。字符串字面值有多种不同的写法：

- 单引号：`'允许包含有 "双" 引号'`
- 双引号：`"允许嵌入 '单' 引号"`
- 三重引号：`'''三重单引号'''`，`"""三重双引号"""`

和其他语言不一样，特殊字符如 `\n` 在单引号和双引号里的意义一样。这两种引号唯一的区别是，不需要在单引号里转义双引号，但必须把单引号转义成 `\'`，反之亦然。

使用三重引号的字符串可以跨越多行，其中所有的空白字符都将包含在该字符串字面值中。

##### 3.3.7.1. 字符串的方法

字符串实现了所有一般序列的操作，还额外提供了以下列出的一些附加方法。

- str.**encode**(*encoding='utf-8'*, *errors='strict'*)

  返回原字符串编码为字节串对象的版本。默认编码为 `utf-8`。
  
- str.**format**(*args, **kwargs)

  执行字符串格式化操作。调用此方法的字符串可以包含字符串字面值或者以花括号 `{}` 括起来的替换域。每个替换域可以包含一个位置参数的数字索引，或者一个关键字参数的名称。返回的字符串副本中每个替换域都会被替换为对应参数的字符串值。

  ```python
  "The sum of 1 + 2 is {0}".format(1+2)
  # 'The sum of 1 + 2 is 3'
  ```

- str.**upper**()

  返回原字符串的副本，其中所有区分大小写的字符均转换为大写。

##### 3.3.7.2. printf 风格的字符串格式化

字符串具有一种特殊的内置操作：使用 `%` 运算符。这也被称为字符串的格式化或插值运算符。对于 `format % values` (其中 *format* 为一个字符串)，在 *format* 中的 `%` 转换标记符将被替换为零个或多个 *values* 条目。其效果类似于在 C 语言中使用 *sprintf()*。

如果 *format* 要求一个单独参数，则 *values* 可以为一个非元组对象。否则的话，*values* 必须是一个包含项数与格式字符串中指定的转换符项数相同的元组，或者是一个单独映射对象（例如字典）。

| 转换符 | 含意             |
| ------ | ---------------- |
| `'d'`  | 有符号十进制整数 |
| `'s'`  | 字符串           |

例子：

```python
print(
    'hello %s %s, welcome to python world!' % ('新', '世界')
)
```

#### 3.3.8. 二进制序列类型 - bytes, bytearray, memoryview

操作二进制数据的核心内置类型是 [bytes](https://docs.python.org/zh-cn/3/library/stdtypes.html#bytes) 和 [bytearray](https://docs.python.org/zh-cn/3/library/stdtypes.html#bytearray)。它们由 [memoryview](https://docs.python.org/zh-cn/3/library/stdtypes.html#memoryview) 提供支持，该对象使用缓冲区协议来访问其他二进制对象所在内存，不需要创建对象的副本。

[array](https://docs.python.org/zh-cn/3/library/array.html) 模块支持高效地存储基本数据类型，例如 32 位整数和 IEEE754 双精度浮点值。

##### 3.3.8.1. bytes

bytes 对象是由单个字节构成的不可变序列。由于许多主要二进制协议都基于 ASCII 文本编码，因此 bytes 对象提供了一些仅在处理 ASCII 兼容数据时可用，并且在许多特性上与字符串对象紧密相关的方法。

##### 3.3.8.3. bytes 和 bytearray 操作

- bytes.**decode**(encoding='utf-8', errors='strict')

- bytearray.**decode**(encoding='utf-8', errors='strict')

  返回从给定 bytes 解码出来的字符串。默认编码为 `utf-8`。
  
  ```python
  bytes.decode(b'Hello', encoding="utf-8")
  ```

#### 3.3.10. 映射类型 - dict

- **get**(key[, default])

  如果 *key* 存在于字典中则返回 *key* 的值，否则返回 *default*。如果 *default* 未给出则默认为 `None`。
  
- **keys**()

  返回由字典键组成的一个新视图。
  
- **setdefault**(*key*[, *default*])

  如果字典存在键 *key*，返回它的值。如果不存在，插入值为 *default* 的键 *key*，并返回 *default*。*default* 默认为 `None`。
  
- **update**([*other*])

  使用来自 *other* 的键值对更新字典，覆盖原有的键。返回 `None`。
  
  `update()` 接受另一个字典对象，或者一个包含键值对的可迭代对象。如果给出了关键字参数，则会以其所指定的键值对更新字典：`d.update(red=1, blue=2)`。

#### 3.3.11. 上下文管理器类型

Python 的 `with` 语句支持由*上下文管理器*定义的运行时上下文这一概念。此对象的实现使用了一对专门方法，允许用户自定义类来定义运行时上下文，在语句体被执行前进入该上下文，并在语句执行完毕时退出该上下文：

- contextmanager.**`__enter__()`**

  进入运行时上下文并返回此对象或关联到该运行时上下文的其他对象。此方法的返回值会绑定到使用此上下文管理器的 `with` 语句的 `as` 子句中的标识符。
  
  一个返回其自身的上下文管理器的例子是 `file object`。文件对象会从 `__enter__()` 返回其自身，以允许 `open()` 被用作 `with` 语句中的上下文表达式。
  
  一个返回关联对象的上下文管理器的例子是 `decimal.localcontext()` 所返回的对象。此种管理器会将活动的 `decimal` 上下文设为原始 `decimal` 上下文的一个副本并返回该副本。这允许对 `with` 语句的语句体中的当前 `decimal` 上下文进行更改，而不会影响 `with` 语句以外的代码。
  
- contextmanager.**`__exit__`**(*exc_type*, *exc_val*, *exc_tb*)
  
  退出运行时上下文并返回一个布尔值旗标来表明所发生的任何异常是否应当被屏蔽。如果在执行 `with` 语句的语句体期间发生了异常，则参数会包含异常的类型、值以及回溯信息。在其他情况下三个参数均为 `None`。
  
  自此方法返回一个真值将导致 `with` 语句屏蔽异常并继续执行紧随在 `with` 语句之后的语句。否则异常将在此方法结束执行后继续传播。在此方法执行期间发生的异常将会取代 `with` 语句的语句体中发生的任何异常。
  
  传入的异常绝对不应当被显式地重新引发，相反地，此方法应当返回一个假值以表明方法已成功完成并且不希望屏蔽被引发的异常。这允许上下文管理代码方便地检测 `__exit__()` 方法是否确实已失败。

Python 定义了一些上下文管理器来支持简易的线程同步、文件或其他对象的快速关闭，以及更方便地操作活动的十进制算术上下文。除了实现上下文管理协议以外，不同类型不会被特殊处理。

Python 的 `generator` 和 `contextlib.contextmanager` 装饰器提供了实现这些协议的便捷方式。如果使用 `contextlib.contextmanager` 装饰器来装饰一个生成器函数，它将返回一个实现了必要的 `__enter__()` 和 `__exit__()` 方法的上下文管理器，而不再是由未经装饰的生成器所产生的迭代器。

### 3.4. 内置异常

#### 3.4.4. 具体异常

以下异常属于经常被引发的异常。

- *exception* **KeyError**

  当在现有键集合中找不到指定的映射键时将被引发。
  
- *exception* **ValueError**

  当操作或函数接收到具有正确类型但值不适合的参数，并且情况不能用更精确的异常例如 `IndexError` 来描述时将被引发。

### 3.5. 文本处理服务

#### 3.5.1. string - 常见的字符串操作

##### 3.5.1.3. 格式字符串语法

替换字段的语法如下：

```
replacement_field ::=  "{" [field_name] ["!" conversion] [":" format_spec] "}"
```

使用 *conversion* 字段在格式化之前进行类型强制转换。通常，格式化值的工作由值本身的 `__format__()` 方法来完成。但是，在某些情况下最好强制将类型格式化为一个字符串，覆盖其本身的格式化定义。通过在调用 `__format__()` 之前将值转换为字符串，可以绕过正常的格式化逻辑。

目前支持的转换旗标有三种: `'!s'` 会对值调用 `str()`，`'!r'` 调用 `repr()` 而 `'!a'` 则调用 `ascii()`。

例如，调用 `repr()`：

```python
"<User(name={self.name!r})>".format(self=self)
```

### 3.7. 数据类型

#### 3.7.1. datetime - 基本日期和时间类型

`datetime` 模块提供用于处理日期和时间的类。

##### 3.7.1.3. 有效的类型

- class datetime.**datetime**

  日期和时间的结合。

##### 3.7.1.6. datetime 对象

`datetime` 对象是包含来自 `date` 对象和 `time` 对象的所有信息的单一对象。

构造器：

- *class* datetime.datetime(*year*, *month*, *day*, *hour=0*, *minute=0*, *second=0*, *microsecond=0*, *tzinfo=None*, *, *fold=0*)

其它构造器，所有的类方法：

- *classmethod* datetime.**now**(*tz=None*)

  返回表示当前地方时的 `date` 和 `time` 对象。

### 3.8. 数字和数学模块

#### 3.8.4. decimal - 十进制定点和浮点运算

[decimal](https://docs.python.org/zh-cn/3/library/decimal.html) 模块提供对快速正确舍入的十进制浮点运算的支持。它提供了优于浮点数据类型的几个优点：

- Decimal 类型的设计是基于考虑人类习惯的浮点数模型。
- Decimal 数字的表示是完全精确的。相比之下，1.1 和 2.2 这样的数字在二进制浮点中没有精确的表示。
- Decimal 模块包含有效位的概念，因此 1.30 + 1.20 的结果是 2.50。保留尾随零以表示有效位。这是货币的惯用表示方法。乘法则保留被乘数中的所有数字的方法。例如，1.3 * 1.2 结果是 1.56 而 1.30 * 1.20 结果是 1.5600。
- 与基于硬件的二进制浮点不同，十进制模块具有用户可更改的精度（默认为 28 位）。

```python
from decimal import *

getcontext().prec = 6
print(Decimal(1) / Decimal(7))
```

#### 3.8.5. fractions - 分数

[fractions](https://docs.python.org/zh-cn/3/library/fractions.html) 模块支持分数运算。

分数实例可以由一对整数，一个分数，或者一个字符串构建而成。

### 3.9. 函数式编程模块

#### 3.9.2. functools - 高阶函数和可调用对象上的操作

`functools` 模块应用于高阶函数，即参数或返回值为其他函数的函数。通常来说，此模块的功能适用于所有可调用对象。

`functools` 模块定义了以下函数：

- @functools.**wraps**(*wrapped*, *assigned=WRAPPER_ASSIGNMENTS*, *updated=WRAPPER_UPDATES*)

  这是一个便捷函数，用于在定义包装器函数时发起调用 `update_wrapper()` 作为函数装饰器。它等价于 `partial(update_wrapper, wrapped=wrapped, assigned=assigned, updated=updated)`。

### 3.10. 文件和目录访问

#### 3.10.2. os.path - 常用路径操作

- os.path.**join**(*path*, **paths*)

  智能地拼接一个或多个路径部分。

### 3.15. 通用操作系统服务

#### 3.15.1. os - 多种操作系统接口

##### 3.15.1.6. 文件和目录

- os.**getcwd**()

  返回表示当前工作目录的字符串。

#### 3.15.2. io - 处理流的核心工具

`io` 模块提供了 Python 用于处理各种 I/O 类型的主要工具。

##### 3.15.2.7. I/O 基类

- *class io*.**IOBase**

  所有 I/O 类的抽象基类。

  此类为许多方法提供了空的抽象实现，派生类可以有选择地重写。默认实现代表一个无法读取、写入或查找的文件。

  `IOBase` 提供以下数据属性和方法：

  - `close()`

    刷新并关闭此流。
  
- *class io*.**RawIOBase**

  原始二进制流的基类。它继承自 `IOBase`。
  
  `RawIOBase` 在 `IOBase` 的现有成员以外还提供了下列方法：
  
  - read(*size=-1, /*)
  
    从对象中读取 *size* 个字节并将其返回。

### 3.21. 互联网数据处理

#### 3.21.15. uuid

这个模块提供了不可变的 UUID 对象和 `uuid1()`, `uuid3()`, `uuid4()`, `uuid5()` 等函数用于生成 RFC 4122 所定义的第 1, 3, 4 和 5 版 UUID。

`str(uuid)` 返回一个 `12345678-1234-5678-1234-567812345678` 形式的字符串，其中 32 位十六进制数字代表 UUID。

- `uuid`.**`uuid4()`**

  生成一个随机的 UUID。

### 3.28. Python 运行时服务

#### 3.28.1. sys - 系统相关的参数和函数

该模块提供了一些变量和函数。这些变量可能被解释器使用，也可能由解释器提供。

- sys.**argv**

  一个列表，其中包含了被传递给 Python 脚本的命令行参数。`argv[0]` 为脚本的名称（是否是完整的路径名取决于操作系统）。

  如果没有脚本名被传递给 Python 解释器，`argv[0]` 为空字符串。如果是通过 Python 解释器的命令行参数 `-c` 来执行的，`argv[0]` 会被设置成字符串 `'-c'`。给定脚本名是 `'-'`（标准输入）时，`argv[0]` 是 `'-'`。如果使用选项 `-m module`，`argv[0]` 就是包含目录的模块全名。

  解释器不处理 `-c command` 或 `-m module` 之后的选项，而是直接留在 `sys.argv` 中由命令或模块来处理。

  ```sh
  $ echo -e 'import sys\nprint(sys.argv)' | python -
  $ python -c "import sys; print(sys.argv)"
  ```

## 4. 语言参考

### 4.2. 词法分析

#### 4.2.4. 字面值

字面值是内置类型常量值的表示法。

##### 4.2.4.1. 字符串与字节串字面值

字节串字面值要加前缀 `b` 或 `B`；生成的是类型 bytes 的实例，不是类型 str 的实例；字节串只能包含 ASCII 字符；字节串数值大于等于 128 时，必须用转义表示。

字符串和字节串都可以加前缀 `r` 或 `R`，称为原始字符串，原始字符串把反斜杠当作原义字符，不执行转义操作。

为兼容 Python 2，支持 Unicode 字面值前缀 `u` 或 `U`，和普通字符串意义一样。

##### 4.2.4.4. 数值字面值

数值字面值有三种类型：整数、浮点数、虚数。没有复数字面值。

##### 4.2.4.5. 整数字面值

整数字面值的长度没有限制，能一直大到占满可用内存。

确定数值时，会忽略字面值中的下划线。下划线只是为了分组数字，让数字更易读。下划线可在数字之间，也可在 `0x` 等基数说明符后。

注意，除了 0 以外，十进制数字的开头不允许有零。以免与八进制字面值混淆。

整数字面值示例如下：

```
decinteger: 10_000_000
bininteger: 0b_1010_0110_10
octinteger: 0o_1232
hexinteger: 0x_29a
```

##### 4.2.4.6. 浮点数字面值

解析时，整数和指数部分总以 10 为基数。例如，`077e010` 是合法的，表示的数值与 `77e10` 相同。浮点数字面值的支持范围取决于具体实现。整数字面值支持用下划线分组数字。

浮点数字面值示例如下：

```
3.14
10.
.001
1e3
0e0
3.14_15_93
```

#### 4.2.5. 运算符

| 运算符 | 描述                                            | 实例          |
| ------ | ----------------------------------------------- | ------------- |
| +      | 加 - 两个对象相加                               | 10 + 20 = 30  |
| -      | 减 - 得到负数或一个数减去另一个数               | 10 - 20 = -10 |
| *      | 乘 - 两个数相乘或是返回一个被重复若干次的字符串 | 20 * 10 = 200 |
| /      | 除 - *x* 除以 *y*                               | 20 / 10 = 2.0 |
| %      | 取模 - 返回除法的余数                           | 10 % 3 = 1    |
| //     | 取整除 - 向下取接近商的整数                     | 20 // 10 = 2  |
| **     | 幂 - 返回 *x* 的 *y* 次幂                       | 10 ** 2 = 100 |

除法 `/` 始终返回一个浮点数。要进行向下取整除法并获得整数结果，可以使用 `//` 运算符；要计算余数，可以使用 `%`。

### 4.3. 数据模型

#### 4.3.3. 特殊方法名称

一个类可以通过定义具有特殊名称的方法来实现由特殊语法来发起调用的特定操作。这是 Python 实现*运算符重载*的方式，允许每个类自行定义基于该语言运算符的特定行为。举例来说，如果一个类定义了名为 `__getitem__()` 的方法，并且 `x` 是该类的一个实例，则 `x[i]` 基本就等价于 `type(x).__getitem__(x, i)`。除非有说明例外情况，在没有定义适当方法的时候尝试执行某种操作将引发一个异常。

将一个特殊方法设为 `None` 表示对应的操作不可用。例如，如果一个类将 `__iter__()` 设为 `None`，则该类就是不可迭代的，因此对其实例调用 `iter()` 将引发一个异常。

在实现模拟任何内置类型的类时，很重要的一点是模拟的实现程度对于被模拟对象来说应当是有意义的。例如，提取单个元素的操作对于某些序列来说是适宜的，但提取切片可能就没有意义。

##### 4.3.3.1. 基本定制

- object.`__init__`(*self*[, ...])

  在实例被创建之后，返回调用者之前调用。其参数与传递给类构造器表达式的参数相同。一个基类如果有 `__init__()` 方法，则其所派生的类如果也有 `__init__()` 方法，就必须显式地调用它以确保实例基类部分的正确初始化；例如：
  
  ```python
  super().__init__([args...])
  ```
  
  因为对象是由 `__new__()` 和 `__init__()` 协作构造完成的，由 `__new__()` 创建，并由 `__init__()` 定制，所以 `__init__()` 返回的值只能是 None，否则会在运行时引发 TypeError。
  
- object.`__repr__`(*self*)

  由 `repr()` 内置函数调用以输出一个对象的字符串表示。

##### 4.3.3.9. `with` 语句上下文管理器

*上下文管理器*是一个对象，它定义了在执行 `with` 语句时要建立的运行时上下文。*上下文管理器*处理进入和退出所需运行时上下文以执行代码块。通常使用 `with` 语句，但是也可以通过直接调用它们的方法来使用。

*上下文管理器*的典型用法包括保存和恢复各种全局状态，锁定和解锁资源，关闭打开的文件等等。

- object.**`__enter__`**(*self*)

  进入与此对象相关的运行时上下文。`with` 语句将会绑定这个方法的返回值到 `as` 子句中指定的目标，如果有的话。

- object.**`__exit__`**(*self*, *exc_type*, *exc_value*, *traceback*)

  退出关联到此对象的运行时上下文。各个参数描述了导致上下文退出的异常。如果上下文是无异常地退出的，三个参数都将为 `None`。
  
  如果提供了异常，并且希望方法屏蔽此异常，则应当返回真值。否则的话，异常将在退出此方法时按正常流程处理。
  
  请注意 `__exit__()` 方法不应该重新引发被传入的异常，这是调用者的责任。

### 4.5. 导入系统

一个 `module` 内的 Python 代码通过 `importing` 操作就能够访问另一个模块内的代码。`import` 语句是发起调用导入机制的最常用方式，但不是唯一的方式。`importlib.import_module()` 以及内置的 `__import__()` 等函数也可以被用来发起调用导入机制。

`import` 语句结合了两个操作；它先搜索指定名称的模块，然后将搜索结果绑定到当前作用域中的名称。`import` 语句的搜索操作被定义为对 `__import__()` 函数的调用并带有适当的参数。`__import__()` 的返回值会被用于执行 `import` 语句的名称绑定操作。

对 `__import__()` 的直接调用将仅执行模块搜索，如果找到，则执行模块创建操作。只有 `import` 语句会执行名称绑定操作。

当一个模块首次被导入时，Python 会搜索该模块，如果找到就创建一个 `module` 对象并初始化它。如果指定名称的模块未找到，则会引发 `ModuleNotFoundError`。当发起调用导入机制时，Python 会实现多种策略来搜索指定名称的模块。这些策略可以通过使用下文所描述的多种钩子来加以修改和扩展。

#### 4.5.1. `importlib`

`importlib` 模块提供了丰富的 API 用来与导入系统进行交互。例如 `importlib.import_module()` 提供了相比内置的 `__import__()` 更推荐、更简单的 API 用来发起调用导入机制。

#### 4.5.2. 包

Python 只有一种模块对象类型，所有模块都属于该类型，无论模块是用 Python、C 还是别的语言实现。为了帮助组织模块并提供名称层次结构，Python 还引入了包的概念。

可以把包看成是文件系统中的目录，并把模块看成是目录中的文件。与文件系统一样，包通过层次结构进行组织，在包之内除了一般的模块，还可以有子包。

要注意的是所有包都是模块，但并非所有模块都是包。或者换句话说，包只是一种特殊的模块。特别地，任何具有 `__path__` 属性的模块都会被当作是包。

所有模块都有自己的名字。子包名与其父包名会以点号分隔，与 Python 的标准属性访问语法一致。因此你可能会有一个名为 `email` 的包，这个包中又有一个名为 `email.mime` 的子包以及该子包中的名为 `email.mime.text` 的子包。

##### 4.5.2.1. 常规包

常规包是传统的包类型。常规包通常以一个包含 `__init__.py` 文件的目录形式实现。当一个常规包被导入时，这个 `__init__.py` 文件会隐式地被执行，它所定义的对象会被绑定到该包命名空间中的名称。`__init__.py` 文件可以包含与任何其他模块中所包含的 Python 代码相似的代码，Python 将在模块被导入时为其添加额外的属性。

例如，以下文件系统布局定义了一个最高层级的 `parent` 包和三个子包：

```
parent/
    __init__.py
    one/
        __init__.py
    two/
        __init__.py
    three/
        __init__.py
```

导入 `parent.one` 将隐式地执行 `parent/__init__.py` 和 `parent/one/__init__.py`。后续导入 `parent.two` 或 `parent.three` 则将分别执行 `parent/two/__init__.py` 和 `parent/three/__init__.py`。

### 4.6. 表达式

#### 4.6.1. 算术转换

- 如果任一参数为复数，另一参数会被转换为复数；
- 否则，如果任一参数为浮点数，另一参数会被转换为浮点数；
- 否则，两者应该都为整数，不需要进行转换。

#### 4.6.3. 原型

原型代表编程语言中最紧密绑定的操作。

##### 4.6.3.4. 调用

所谓调用就是附带可能为空的一系列参数来执行一个可调用对象（例如函数）。

###### 4.6.3.4.1. 位置参数

用于函数调用，根据函数定义的参数位置来传递参数。

以此函数为例：

```python
def print_hello(name, sex):
    sex_dict = {1: u'先生', 2: u'女士'}
    print(
        'hello %s %s, welcome to python world!' % (name, sex_dict.get(sex))
    )
```

通过位置参数调用：

```python
print_hello('x', 1)
```

###### 4.6.3.4.2. 关键字参数

用于函数调用，通过键值对形式加以指定。可以让函数更加清晰、容易使用，同时也清除了参数的顺序需求。

以上一节函数为例，通过关键字参数调用：

```python
print_hello('x', sex=1)
print_hello(name='x', sex=1)
print_hello(sex=1, name='x')
```

错误的调用方式：

```python
print_hello(1, name='x')
print_hello(name='x', 1)
print_hello(sex=1, 'x')
```

注意，有位置参数时，位置参数必须在关键字参数的前面，但关键字参数之间不存在先后顺序。

###### 4.6.3.4.3. 额外的位置参数

如果存在比正式参数空位多的位置参数，将会引发 `TypeError` 异常，除非有一个正式参数使用了 `*expression` 句法；在此情况下，该正式参数将接受一个包含了多余位置参数的元组，如果没有多余位置参数则为一个空元组。

如果函数调用中出现了 `*expression` 句法，`expression` 必须求值为一个 `iterable`。来自该可迭代对象的元素会被当作是额外的位置参数。

注意，`*expression` 句法可能出现于显式的关键字参数之后，但它会在关键字参数，以及任何 `**expression` 参数之前被处理。

```python
def f(a, b):
    print(a, b)

f(b=1, *(2,))
```

###### 4.6.3.4.4. 额外的关键字参数

如果任何关键字参数没有与之对应的正式参数名称，将会引发 `TypeError` 异常，除非有一个正式参数使用了 `**expression` 句法，该正式参数将接受一个包含了多余关键字参数的字典，如果没有多余关键字参数则为一个空字典。

如果函数调用中出现了 `**expression` 句法，则 `expression` 必须求值为一个映射，其内容被视为额外的关键字参数。

```python
def f(a, b):
    print(a, b)

f(**{'a': 1, 'b': 2})
```

### 4.7. 简单语句

#### 4.7.2. 赋值语句

赋值语句用于将名称（重）绑定到特定值，以及修改属性或可变对象的成员项。

赋值的定义意味着左手边与右手边的重叠是同时进行的，例如 `a, b = b, a` 会交换两个变量的值。但在赋值给变量的多项集之内的重叠是从左至右进行的：

```python
x = [0, 1]
i = 0
i, x[i] = 1, 2
print(x)
```

#### 4.7.8. `raise` 语句

如果没有提供表达式，则 `raise` 会重新引发当前正在处理的异常，它也被称为活动的异常。如果当前没有活动的异常，则会引发 `RuntimeError` 来提示发生了错误。

否则的话，`raise` 会将第一个表达式求值为异常对象。它必须为 `BaseException` 的子类或实例。如果它是一个类，当需要时会通过不带参数地实例化该类来获得异常的实例。

```python
raise KeyError('未找到对应的配置信息')
```

#### 4.7.11. `import` 语句

基本的 `import` 语句会分两步执行：

1. 查找一个模块，如果有必要还会加载并初始化模块。
2. 在局部命名空间中为 `import` 语句发生位置所处的作用域定义一个或多个名称。

当语句包含多个子句时这两个步骤将对每个子句分别执行，如同这些子句被分成独立的 `import` 语句一样。

`from` 形式使用的过程略微繁复一些：

1. 查找 `from` 子句中指定的模块，如有必要还会加载并初始化模块；
2. 对于 `import` 子句中指定的每个标识符：
    1. 检查被导入模块是否有该名称的属性
    1. 如果没有，尝试导入具有该名称的子模块，然后再次检查被导入模块是否有该属性
    1. 如果未找到该属性，则引发 `ImportError`。
    1. 否则的话，将对该值的引用存入局部命名空间，如果有 `as` 子句则使用其指定的名称，否则使用该属性的名称

### 4.8. 复合语句

#### 4.8.5. `with` 语句

`with` 语句用于包装带有使用*上下文管理器*定义的方法的代码块的执行。这允许对普通的 `try...except...finally` 使用模式进行封装以方便地重用。

带有一个*项目*的 `with` 语句的执行过程如下：

1. 对上下文表达式进行求值来获得上下文管理器。

2. 载入上下文管理器的 `__enter__()` 以便后续使用。

3. 载入上下文管理器的 `__exit__()` 以便后续使用。

4. 发起调用上下文管理器的 `__enter__()` 方法。

5. 如果 `with` 语句中包含一个目标，来自 `__enter__()` 的返回值将被赋值给它。

6. 执行语句体。

7. 发起调用上下文管理器的 `__exit__()` 方法。如果语句体的退出是由异常导致的，则其类型、值和回溯信息将被作为参数传递给 `__exit__()`。否则的话，将提供三个 `None` 参数。

    如果语句体的退出是由异常导致的，并且来自 `__exit__()` 方法的返回值为假，则该异常会被重新引发。如果返回值为真，则该异常会被抑制，并会继续执行 `with` 语句之后的语句。
    
    如果语句体由于异常以外的任何原因退出，则来自 `__exit__()` 的返回值会被忽略，并会在该类退出正常的发生位置继续执行。

以下代码：

```python
with EXPRESSION as TARGET:
    SUITE
```

在语义上等价于：

```python
manager = (EXPRESSION)
enter = type(manager).__enter__
exit = type(manager).__exit__
value = enter(manager)
hit_except = False

try:
    TARGET = value
    SUITE
except:
    hit_except = True
    if not exit(manager, *sys.exc_info()):
        raise
finally:
    if not hit_except:
        exit(manager, None, None, None)
```

如果有多个项目，则会视作存在多个 `with` 语句嵌套来处理多个上下文管理器：

```python
with A() as a, B() as b:
    SUITE
```

在语义上等价于：

```python
with A() as a:
    with B() as b:
        SUITE
```

也可以用圆括号包围的多行形式的多项目上下文管理器。例如：

```python
with (
    A() as a,
    B() as b,
):
    SUITE
```

#### 4.8.7. 函数定义

函数定义是一条可执行语句。它执行时会在当前局部命名空间中将函数名称绑定到一个函数对象（函数可执行代码的包装器）。这个函数对象包含对当前全局命名空间的引用，作为函数被调用时所使用的全局命名空间。

函数定义并不会执行函数体；只有当函数被调用时才会执行此操作。

##### 4.8.7.1. 默认形参

用于定义函数，为参数提供默认值，调用函数时可传可不传该默认参数的值。

注意，所有位置参数必须出现在默认参数前，包括函数定义和调用。

```python
def print_hello(name, sex=1):
    pass
```

##### 4.8.7.2. 额外的位置参数

我们传进的额外的位置参数都会被 `args` 变量收集，它会根据传进参数的位置合并为一个元组，`args` 是元组类型。

```python
def func(*args):
    pass
```

##### 4.8.7.3. 额外的关键字参数

我们传进的额外的关键字参数都会被 `kargs` 变量收集，它会根据传进参数的关键字合并为一个字典，`kargs` 是字典类型。

```python
def func(**kargs):
    pass
```

##### 4.8.7.4. 装饰器

一个函数定义可以被一个或多个 *decorator* 表达式所包装。当函数被定义时将在包含该函数定义的作用域中对装饰器表达式求值。求值结果必须是一个可调用对象，它会以该函数对象作为唯一参数被发起调用。其返回值将被绑定到函数名称而非函数对象。多个装饰器会以嵌套方式被应用。例如以下代码

```python
@f1(arg)
@f2
def func(): pass
```

大致等价于

```python
def func(): pass
func = f1(arg)(f2(func))
```

不同之处在于原始函数并不会被临时绑定到名称 `func`。

装饰器可以有参数，也可以没有参数。

- 装饰器无需传参

  ```python
  def log(func):
      def wrapper(*args, **kw):
          print('call %s():' % func.__name__)
          return func(*args, **kw)
      return wrapper
  
  @log
  def now():
      print('2015-3-25')
  ```

  大致等价于

  ```python
  now = log(now)
  ```

  可快速调用

  ```python
  log(now)()
  ```

- 装饰器需要参数

  ```python
  def log(text):
      def decorator(func):
          def wrapper(*args, **kw):
              print('%s %s():' % (text, func.__name__))
              return func(*args, **kw)
          return wrapper
      return decorator
  
  @log('execute')
  def now():
      print('2015-3-25')
  ```
  
  和两层嵌套的 `decorator` 相比，3 层嵌套的效果是这样的：
  
  ```python
  now = log('execute')(now)
  ```
  
  可快速调用
  
  ```python
  log('execute')(now)()
  ```

还差最后一步。因为我们讲了函数也是对象，它有 `__name__` 等属性，但你去看经过 `decorator` 装饰之后的函数，它们的 `__name__` 已经从原来的 `'now'` 变成了 `'wrapper'`。

因为返回的那个 `wrapper()` 函数名字就是 `'wrapper'`，所以，需要把原始函数的 `__name__` 等属性复制到 `wrapper()` 函数中，否则，有些依赖函数签名的代码执行就会出错。

不需要编写 `wrapper.__name__ = func.__name__` 这样的代码，Python 内置的 `functools.wraps` 就是干这个事的，所以，一个完整的 `decorator` 的写法如下：

```python
import functools

def log(func):
    @functools.wraps(func)
    def wrapper(*args, **kw):
        print('call %s():' % func.__name__)
        return func(*args, **kw)
    return wrapper
```

或者针对带参数的 `decorator`：

```python
import functools

def log(text):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kw):
            print('%s %s():' % (text, func.__name__))
            return func(*args, **kw)
        return wrapper
    return decorator
```

#### 4.8.8. 类定义

类定义就是对类对象的定义。

类定义是一条可执行语句。其中继承列表通常给出基类的列表，列表中的每一项都应当被求值为一个允许子类的类对象。没有继承列表的类默认继承自基类 `object`；因此，：

```python
class Foo:
    pass
```

等价于

```python
class Foo(object):
    pass
```

## 5. Python 增强建议

### PEP 263 - 定义 Python 源代码编码

默认情况下，Python 源码文件的编码是 UTF-8。

如果不使用默认编码，则要声明文件的编码，文件的第一行要写成特殊注释。句法如下：

```python
# -*- coding: encoding -*-
```

其中，*encoding* 可以是 Python 支持的任意一种 [codecs](https://docs.python.org/3/library/codecs.html)。

比如，声明使用 utf8 编码，源码文件要写成：

```python
# -*- coding: utf8 -*-
```

第一行的规则也有一种例外情况，源码以 [UNIX Shebang](https://en.wikipedia.org/wiki/Shebang_(Unix)) 行开头。此时，编码声明要写在文件的第二行。例如：

```python
#!/usr/bin/env python3
# -*- coding: utf8 -*-
```

### PEP 484 - 类型提示

函数参数中的冒号是参数的类型建议符，告诉程序员希望传入的实参的类型。

```python
def func(a: int, b: int):
    print(a + b)

func(1, 2)
```

函数后面的箭头是函数返回值的类型建议符，用来说明该函数返回的值是什么类型。

```python
def func(a, b) -> int:
    return a + b

func(1, 2)
```

### PEP 515 - 数字文字中的下划线

这个 PEP 提议扩展 Python 的语法和 number-from-string 构造函数，以便下划线可以用作视觉分隔符，用于整数、浮点和复数文字中的数字分组目的。

这是其他现代语言的一个共同特征，并且可以帮助长文本或值应该清楚地分成部分的文本的可读性，例如十六进制表示法的字节或单词。

例子：

```python
# 以千为单位对十进制数进行分组
amount = 10_000_000.0

# 按单词对十六进制地址进行分组
addr = 0xCAFE_F00D

# 在二进制文字中将位分组为半字节
flags = 0b_0011_1111_0100_1110

# 相同，用于字符串转换
flags = int('0b_1111_0000', 2)
```

## 备注

[^1]: 通过导入 `builtins` 模块并赋值给 `builtins.__import__`。

[^2]: 参见 [PEP 302 – New Import Hooks](https://peps.python.org/pep-0302/)。

[^3]: 参见 [PEP 328 – Imports: Multi-Line and Absolute/Relative](https://peps.python.org/pep-0328/)

[^4]: 也称为整数除法。结果值是一个整数，但结果的类型不一定是 `int`。运算结果总是向负无穷的方向舍入：`1//2` 为 `0`，`(-1)//2` 为 `-1`，`1//(-2)` 为 `-1` 而 `(-1)//(-2)` 为 `0`。

