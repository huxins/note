# Python 标准库

[Python 标准库](https://docs.python.org/zh-cn/3/library/index.html)非常庞大，所提供的组件涉及范围十分广泛。

## 一、内置函数

Python 解释器[内置](https://docs.python.org/zh-cn/3/library/functions.html)了很多函数和类型，任何时候都能使用。

### all

```python
all(iterable)
```

如果 *iterable* 的所有元素均为真值，或可迭代对象为空，则返回 True。

```python
if not all([username, password]):
    raise ValueError('用户名或密码为空')
```

### bytes

```python
class bytes(source=b'')
class bytes(source, encoding)
class bytes(source, encoding, errors)
```

返回一个新的 [`bytes`](https://docs.python.org/zh-cn/3/library/stdtypes.html#bytes) 对象，这是一个不可变序列，包含范围为 `0 <= x < 256` 的整数。

```python
bytes('Hello', encoding='utf8')
```

### int

```python
class int(number=0, /)
class int(string, /, base=10)
```

返回一个基于数字或字符串构造的[整数](https://docs.python.org/zh-cn/3/library/functions.html#int)对象，或者在未给出参数时返回 `0`。

如果参数定义了 `__int__()`，`int(x)` 将返回 `x.__int__()`。

如果参数定义了 `__index__()`，则返回 `x.__index__()`。

如果参数定义了 `__trunc__()`，则返回 `x.__trunc__()`。

对于浮点数，它将向零舍入。

一个进制为 *n* 的整数包含 `0` 到 `n-1` 的数，其中 `a-z` 或 `A-Z` 表示 `10` 到 `35`。

默认的 *base* 为 `10`，允许的进制有 `0`、`2-36`。`2`、`8`、`16` 进制的数字可以在代码中用 `0b`/`0B`、`0o`/`0O`、`0x`/`0X` 前缀来表示。

进制为 `0` 将按照代码的字面量来精确解释，最后的结果会是 `2`、`8`、`10`、`16` 进制中的一个。所以 `int('010', 0)` 是非法的，但 `int('010')` 和 `int('010', 8)` 是合法的。

例如，二进制转十进制。

```python
int('0b_1111_0000', 2)
```

### isinstance

```python
isinstance(object, classinfo)
```

如果 *object* 参数是 *classinfo* 参数或其子类的实例，则返回 `True`。

### open

```python
open(file, mode='r', buffering=-1, encoding=None, errors=None, newline=None, closefd=True, opener=None)
```

打开 *file* 并返回对应的 *file object*，如果该文件不能被打开，则引发 [`OSError`](https://docs.python.org/zh-cn/3/library/exceptions.html#OSError)。

可用模式如下：

- **r**：读取，默认值。
- **w**：写入。
- **x**：排它性创建，如果文件已存在则失败。
- **a**：打开文件用于写入，如果文件存在则在末尾追加。
- **b**：二进制模式。
- **t**：文本模式，默认。
- **+**：打开用于更新，读取与写入。

### repr

```python
repr(object)
```

返回对象的可打印表示形式的字符串。

### str

```python
class str(object='')
class str(object=b'', encoding='utf-8', errors='strict')
```

返回一个 [`str`](https://docs.python.org/zh-cn/3/library/stdtypes.html#str) 版本的 *object*。

```python
str(b'Hello', encoding="utf-8")
```

### \__import__

```python
__import__(name, globals=None, locals=None, fromlist=(), level=0)
```

[`__import__`](https://docs.python.org/zh-cn/3/library/functions.html#import__) 函数会由 [`import`](https://docs.python.org/zh-cn/3/reference/simple_stmts.html#import) 语句发起调用。不建议直接使用 [`__import__()`](https://docs.python.org/zh-cn/3/library/functions.html#import__) 而应该用 [`importlib.import_module()`](https://docs.python.org/zh-cn/3/library/importlib.html#importlib.import_module)。

本函数会导入模块 *name*，利用 *globals* 和 *locals* 来决定如何在包的上下文中解释该名称；*fromlist* 给出了应从 *name* 模块中导入的对象或子模块的名称。标准的实现代码完全不会用到 *locals* 参数，只用到了 *globals* 用于确定 [`import`](https://docs.python.org/zh-cn/3/reference/simple_stmts.html#import) 语句所在的包上下文。

*level* 指定是使用绝对还是相对导入，`0` 意味着仅执行绝对导入，*level* 为正数值表示相对于模块调用 [`__import__()`](https://docs.python.org/zh-cn/3/library/functions.html#import__) 的目录，将要搜索的父目录层数。

当 *name* 变量的形式为 `package.module` 时，通常将会返回最高层级的包，而不是以 *name* 命名的模块。但是，当给出了非空的 *fromlist* 参数时，则将返回以 *name* 命名的模块。

例如，语句 `import time` 的结果将为与以下代码作用相同的字节码：

```python
time = __import__('time', globals(), locals(), [], 0)
```

语句 `import lxml.html` 的结果将为以下调用：

```python
lxml = __import__('lxml.html', globals(), locals(), [], 0)
```

在这里 [`__import__()`](https://docs.python.org/zh-cn/3/library/functions.html#import__) 是返回顶层模块的，因为这是通过 [`import`](https://docs.python.org/zh-cn/3/reference/simple_stmts.html#import) 语句被绑定到特定名称的对象。

语句 `from lxml.html import fromstring, document_fromstring as doc_fromstring` 的结果将为：

```python
_temp = __import__('lxml.html', globals(), locals(), ['fromstring', 'document_fromstring'], 0)
fromstring = _temp.fromstring
doc_fromstring = _temp.document_fromstring
```

在这里，`lxml.html` 模块会由 [`__import__()`](https://docs.python.org/zh-cn/3/library/functions.html#import__) 返回，要导入的对象将从此对象中提取并赋值给它们对应的名称。

如果只想按名称导入模块，请使用 [`importlib.import_module()`](https://docs.python.org/zh-cn/3/library/importlib.html#importlib.import_module)。

## 二、内置类型

Python 解释器中[内置](https://docs.python.org/zh-cn/3/library/stdtypes.html)的标准类型涵盖了多种数据结构和对象类型，能够满足大多数编程需求。

### 数字类型

共有三种不同的[数字类型](https://docs.python.org/zh-cn/3/library/stdtypes.html#numeric-types-int-float-complex)：

- [**int**](https://docs.python.org/zh-cn/3/library/functions.html#int)：整数。
- [**float**](https://docs.python.org/zh-cn/3/library/functions.html#float)：浮点数。
- [**complex**](https://docs.python.org/zh-cn/3/library/functions.html#complex)：复数。

此外，[布尔值](https://docs.python.org/zh-cn/3/library/functions.html#bool)是[整数](https://docs.python.org/zh-cn/3/library/functions.html#int)的子类型。

[整数](https://docs.python.org/zh-cn/3/library/functions.html#int)和[浮点数](https://docs.python.org/zh-cn/3/library/functions.html#float)支持下列[运算](https://docs.python.org/zh-cn/3/library/stdtypes.html#index-13)：

| 运算           | 结果                |
| -------------- | ------------------- |
| `x + y`        | *x* 和 *y* 的和     |
| `x - y`        | *x* 和 *y* 的差     |
| `x * y`        | *x* 和 *y* 的乘积   |
| `x / y`        | *x* 和 *y* 的商     |
| `x // y`       | *x* 和 *y* 的商数   |
| `x % y`        | `x / y` 的余数      |
| `-x`           | *x* 取反            |
| `+x`           | *x* 不变            |
| `abs(x)`       | *x* 的绝对值        |
| `int(x)`       | 将 *x* 转换为整数   |
| `float(x)`     | 将 *x* 转换为浮点数 |
| `divmod(x, y)` | `(x // y, x % y)`   |
| `pow(x, y)`    | *x* 的 *y* 次幂     |
| `x ** y`       | *x* 的 *y* 次幂     |

商数也称为整数除法，结果值是一个整数，但结果的类型不一定是 `int`。

运算结果总是向负无穷的方向舍入：`1//2` 为 `0`，`(-1)//2` 为 `-1`，`1//(-2)` 为 `-1` 而 `(-1)//(-2)` 为 `0`。

### 序列类型

有三种基本[序列类型](https://docs.python.org/zh-cn/3/library/stdtypes.html#sequence-types-list-tuple-range)：[`list`](https://docs.python.org/zh-cn/3/library/stdtypes.html#list)、[`tuple`](https://docs.python.org/zh-cn/3/library/stdtypes.html#tuple) 和 [`range`](https://docs.python.org/zh-cn/3/library/stdtypes.html#range) 对象。

#### 通用序列操作

大多数序列类型，包括可变类型和不可变类型都支持下表中的[操作](https://docs.python.org/zh-cn/3/library/stdtypes.html#common-sequence-operations)。

在表格中，*s* 和 *t* 是具有相同类型的序列，*n*, *i*, *j* 和 *k* 是整数而 *x* 是任何满足 *s* 所规定的类型和值限制的任意对象。

| 运算                   | 结果                                                         |
| ---------------------- | ------------------------------------------------------------ |
| `x in s`               | 如果 *s* 中的某项等于 *x* 则结果为 `True`，否则为 `False`    |
| `x not in s`           | 如果 *s* 中的某项等于 *x* 则结果为 `False`，否则为 `True`    |
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

#### 不可变序列类型

[不可变序列类型](https://docs.python.org/zh-cn/3/library/stdtypes.html#immutable-sequence-types)普遍实现而[可变序列类型](https://docs.python.org/zh-cn/3/library/stdtypes.html#mutable-sequence-types)未实现的唯一操作就是对 [`hash()`](https://docs.python.org/zh-cn/3/library/functions.html#hash) 内置函数的支持。

这种支持允许不可变类型，例如 [`tuple`](https://docs.python.org/zh-cn/3/library/stdtypes.html#tuple) 实例被用作 [`dict`](https://docs.python.org/zh-cn/3/library/stdtypes.html#dict) 键，以及存储在 [`set`](https://docs.python.org/zh-cn/3/library/stdtypes.html#set) 和 [`frozenset`](https://docs.python.org/zh-cn/3/library/stdtypes.html#frozenset) 实例中。

#### 可变序列类型

以下表格中的操作是在[可变序列类型](https://docs.python.org/zh-cn/3/library/stdtypes.html#mutable-sequence-types)上定义的。

表格中的 *s* 是可变序列类型的实例，*t* 是任意可迭代对象，而 *x* 是符合对 *s* 所规定类型与值限制的任何对象。

| 运算       | 结果                         |
| ---------- | ---------------------------- |
| `s[i] = x` | 将 *s* 的第 *i* 项替换为 *x* |

#### 列表

[列表](https://docs.python.org/zh-cn/3/library/stdtypes.html#lists)是可变序列，通常用于存放同类项目的集合。

可以用多种方式构建列表：

- 使用一对方括号来表示空列表：`[]`
- 使用方括号，其中的项以逗号分隔：`[a]`, `[a, b, c]`
- 使用列表推导式：`[x for x in iterable]`
- 使用类型的构造器：`list()` 或 `list(iterable)`

**列表推导式**提供了一种简明扼要的方法来创建列表。

它的结构是在一个中括号里包含一个表达式，然后是一个 `for` 语句，再然后是零个或多个 `for` 或者 `if` 语句。

返回结果将是一个新的列表，在这个以 `if` 和 `for` 语句为上下文的表达式运行完成之后产生。

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

#### 元组

[元组](https://docs.python.org/zh-cn/3/library/stdtypes.html#tuples)是不可变序列，通常用于储存异构数据的多项集。

可以用多种方式构建元组：

- 使用一对圆括号来表示空元组：`()`
- 使用一个后缀的逗号来表示单元组：`a,` 或 `(a,)`
- 使用以逗号分隔的多个项：`a, b, c` 或 `(a, b, c)`
- 使用内置的 `tuple()`：`tuple()` 或 `tuple(iterable)`

#### range

[`range`](https://docs.python.org/zh-cn/3/library/stdtypes.html#ranges) 类型表示不可变的数字序列，通常用于在 `for` 循环中循环指定的次数。

```python
class range(stop)
class range(start, stop[, step])
```

[`range`](https://docs.python.org/zh-cn/3/library/stdtypes.html#ranges) 构造器的参数必须为整数（可以是内置的 [`int`](https://docs.python.org/zh-cn/3/library/functions.html#int) 或任何实现了 [`__index__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__index__) 特殊方法的对象）。

如果省略 *step* 参数，则默认为 1。如果省略 *start* 参数，则默认为 0。如果 *step* 为零，则会引发 [`ValueError`](https://docs.python.org/zh-cn/3/library/exceptions.html#ValueError)。

### 文本序列类型

在 Python 中处理文本数据是使用 [`str`](https://docs.python.org/zh-cn/3/library/stdtypes.html#str) 对象，也称为字符串。字符串是由 Unicode 码位构成的不可变序列。

字符串字面值有多种不同的写法：

- 单引号：`'允许包含有 "双" 引号'`
- 双引号：`"允许嵌入 '单' 引号"`
- 三重引号：`'''三重单引号'''`，`"""三重双引号"""`

和其他语言不一样，特殊字符如 `\n` 在单引号和双引号里的意义一样。这两种引号唯一的区别是，不需要在单引号里转义双引号，但必须把单引号转义成 `\'`，反之亦然。

使用三重引号的字符串可以跨越多行，其中所有的空白字符都将包含在该字符串字面值中。

字符串实现了所有一般序列的操作，还额外提供了以下列出的一些附加方法。

- str.**encode**(*encoding*=*'utf-8'*, *errors*=*'strict'*)

  [`str.encode`](https://docs.python.org/zh-cn/3/library/stdtypes.html#str.encode) 返回原字符串编码为字节串对象的版本。默认编码为 `utf-8`。

- str.**format**(*args*, ***kwargs*)

  [`str.format`](https://docs.python.org/zh-cn/3/library/stdtypes.html#str.format) 执行字符串格式化操作。调用此方法的字符串可以包含字符串字面值或者以花括号 `{}` 括起来的替换域。每个替换域可以包含一个位置参数的数字索引，或者一个关键字参数的名称。返回的字符串副本中每个替换域都会被替换为对应参数的字符串值。

  ```python
  "The sum of 1 + 2 is {0}".format(1+2)
  # 'The sum of 1 + 2 is 3'
  ```

- str.**upper**()

  [`str.upper`](https://docs.python.org/zh-cn/3/library/stdtypes.html#str.upper) 返回原字符串的副本，其中所有区分大小写的字符均转换为大写。

#### printf

字符串具有一种特殊的[内置操作](https://docs.python.org/zh-cn/3/library/stdtypes.html#printf-style-string-formatting)：使用 `%` 运算符。这也被称为字符串的格式化或插值运算符。

对于 `format % values`（其中 `format` 为一个字符串），在 `format` 中的 `%` 转换标记符将被替换为零个或多个 `values` 条目。

如果 `format` 要求一个单独参数，则 `values` 可以为一个非元组对象；否则的话，`values` 必须是一个包含项数与格式字符串中指定的转换符项数相同的元组，或者是一个单独映射对象（例如字典）。

| 转换符 | 含意             |
| ------ | ---------------- |
| `'d'`  | 有符号十进制整数 |
| `'s'`  | 字符串           |

具体用法如下所示。

```python
print(
    'hello %s %s, welcome to python world!' % ('新', '世界')
)
```

### 二进制序列类型

操作二进制数据的核心内置类型是 [`bytes`](https://docs.python.org/zh-cn/3/library/stdtypes.html#bytes) 和 [`bytearray`](https://docs.python.org/zh-cn/3/library/stdtypes.html#bytearray)。它们由 [`memoryview`](https://docs.python.org/zh-cn/3/library/stdtypes.html#memoryview) 提供支持，该对象使用缓冲区协议来访问其他二进制对象所在内存，不需要创建对象的副本。

[`array`](https://docs.python.org/zh-cn/3/library/array.html#module-array) 模块支持高效地存储基本数据类型，例如 32 位整数和 IEEE754 双精度浮点值。

[`bytes`](https://docs.python.org/zh-cn/3/library/stdtypes.html#bytes-objects) 对象是由单个字节构成的不可变序列。

由于主流二进制协议都基于 ASCII 文本编码，因此 `bytes` 对象提供了一些仅在处理 ASCII 兼容数据时可用，并且在许多特性上与字符串对象紧密相关的方法。

[`bytearray`](https://docs.python.org/zh-cn/3/library/stdtypes.html#bytearray-objects) 对象是 `bytes` 对象的可变对应物。

`bytes` 和 `bytearray` 对象的下列方法可以用于任意二进制数据。

- bytes.**decode**(*encoding*=*'utf-8'*, *errors*=*'strict'*)
- bytearray.**decode**(*encoding*=*'utf-8'*, *errors*=*'strict'*)

  [`decode`](https://docs.python.org/zh-cn/3/library/stdtypes.html#bytes.decode) 返回解码为 [`str`](https://docs.python.org/zh-cn/3/library/stdtypes.html#str) 的字符串。默认编码为 `utf-8`。

  ```python
  bytes.decode(b'Hello', encoding="utf-8")
  ```

### 映射类型

目前仅有一种标准映射类型 [`dict`](https://docs.python.org/zh-cn/3/library/stdtypes.html#dict)。

```python
class dict(**kwargs)
class dict(mapping, **kwargs)
class dict(iterable, **kwargs)
```

返回一个新的字典，基于可选的位置参数和可能为空的关键字参数集来初始化。

字典可用多种方式来创建：

- 字面量

  ```python
  body = {
      "data": self._data,
      "msg": self._msg,
      "code": self._code
  }
  ```

- 字典推导式

  以上面的字面量 *body* 为基础，如果 *value* 为 `None`，则删除。
  
  ```python
  body = {k: v for k, v in body.items() if v is not None}
  ```

这些是字典所支持的操作：

- **get**(*key*[, *default*])

  如果 *key* 存在于字典中，则返回 *key* 的值，否则返回 *default*。如果 *default* 未给出则默认为 `None`。

- **keys**()

  返回由字典键组成的一个新视图。

- **items**()

  返回字典中所有键值对所组成的元组列表。

  ```python
  my_dict = {'apple': 1, 'banana': 2, 'orange': 3}
  
  for key, value in my_dict.items():
      print(key, value)
  ```

- **setdefault**(*key*[, *default*])

  如果字典存在键 *key*，返回它的值。如果不存在，插入值为 *default* 的键 *key*，并返回 *default*。*default* 默认为 `None`。

- **update**([*other*])

  使用来自 *other* 的键值对更新字典，覆盖原有的键。返回 `None`。

  [`update()`](https://docs.python.org/zh-cn/3/library/stdtypes.html#dict.update) 接受另一个字典对象，或者一个包含键值对的可迭代对象。
  
  如果给出了关键字参数，则会以其所指定的键值对更新字典。
  
  ```python
  d.update(red=1, blue=2)
  ```

### 上下文管理器类型

Python 的 [`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#the-with-statement) 语句支持由[上下文管理器](https://docs.python.org/zh-cn/3/library/stdtypes.html#context-manager-types)定义的运行时上下文这一概念。

此对象的实现使用了一对专门方法，允许用户自定义类来定义运行时上下文，在语句体被执行前进入该上下文，并在语句执行完毕时退出该上下文。

- contextmanager.**\__enter__**()

  进入运行时上下文并返回此对象或关联到该运行时上下文的其他对象。

  此方法的返回值会绑定到使用此上下文管理器的 [`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#the-with-statement) 语句的 `as` 子句中的标识符。

  - 一个返回其自身的上下文管理器的例子是 *file object*。

    文件对象会从 [`__enter__()`](https://docs.python.org/zh-cn/3/library/stdtypes.html#contextmanager.__enter__) 返回其自身，以允许 [`open()`](https://docs.python.org/zh-cn/3/library/functions.html#open) 被用作 [`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#the-with-statement) 语句中的上下文表达式。

  - 一个返回关联对象的上下文管理器的例子是 [`decimal.localcontext()`](https://docs.python.org/zh-cn/3/library/decimal.html#decimal.localcontext) 所返回的对象。

    此种管理器会将活动的 [`decimal`](https://docs.python.org/zh-cn/3/library/decimal.html) 上下文设为原始 [`decimal`](https://docs.python.org/zh-cn/3/library/decimal.html) 上下文的一个副本并返回该副本。这允许对 [`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#the-with-statement) 语句的语句体中的当前 [`decimal`](https://docs.python.org/zh-cn/3/library/decimal.html) 上下文进行更改，而不会影响 [`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#the-with-statement) 语句以外的代码。

- contextmanager.**\__exit__**(*exc_type*, *exc_val*, *exc_tb*)

  退出运行时上下文并返回一个布尔值标识来表明所发生的任何异常是否应当被屏蔽。

  如果在执行 [`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#the-with-statement) 语句的语句体期间发生了异常，则参数会包含异常的类型、值以及回溯信息。在其他情况下三个参数均为 `None`。

Python 定义了一些上下文管理器来支持简易的线程同步、文件或其他对象的快速关闭，以及更方便地操作活动的 `decimal` 上下文。

除了实现上下文管理协议以外，不同类型不会被特殊处理。

## 三、内置异常

在 Python 中，所有[异常](https://docs.python.org/zh-cn/3/library/exceptions.html)必须为一个派生自 [BaseException](https://docs.python.org/zh-cn/3/library/exceptions.html#BaseException) 类的实例。

以下异常属于经常被引发的异常。

- *exception* **KeyError**

  当在现有键集合中找不到指定的映射键时将被引发。

- *exception* **ValueError**

  当操作或函数接收到具有正确类型但值不适合的参数，并且情况不能用更精确的异常，例如 [`IndexError`](https://docs.python.org/zh-cn/3/library/exceptions.html#IndexError) 来描述时将被引发。

## 四、内置模块

### 文本处理服务

#### string

[`string`](https://docs.python.org/zh-cn/3/library/string.html) 模块提供了一组常用的字符串操作工具和常量。

[格式字符串](https://docs.python.org/zh-cn/3/library/string.html#format-string-syntax)包含有以花括号 `{}` 括起来的替换字段，不在花括号之内的内容被视为字面文本，会不加修改地复制到输出中。如果你需要在字面文本中包含花括号字符，可以通过重复来转义：`{{ and }}`。

格式化之前会进行类型强制转换。通常由该值本身的 [`__format__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__format__) 方法来完成。但是，在某些情况下最好强制将类型格式化为一个字符串，覆盖其本身的格式化定义。通过在调用 [`__format__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__format__) 之前将值转换为字符串，可以绕过正常的格式化逻辑。

目前支持的[转换标识](https://docs.python.org/zh-cn/3/library/string.html#grammar-token-format-string-conversion)有三种：`!s` 会对值调用 [`str()`](https://docs.python.org/zh-cn/3/library/stdtypes.html#str)，`!r` 调用 [`repr()`](https://docs.python.org/zh-cn/3/library/functions.html#repr) 而 `!a` 则调用 [`ascii()`](https://docs.python.org/zh-cn/3/library/functions.html#ascii)。

例如，调用 [`repr()`](https://docs.python.org/zh-cn/3/library/functions.html#repr)：

```python
"<User(name={self.name!r})>".format(self=self)
```

### 数据类型

#### datetime

[`datetime`](https://docs.python.org/zh-cn/3/library/datetime.html) 模块提供了用于操作日期和时间的类。

##### datetime

[`datetime`](https://docs.python.org/zh-cn/3/library/datetime.html#datetime-objects) 对象是包含来自 [`date`](https://docs.python.org/zh-cn/3/library/datetime.html#datetime.date) 对象和 [`time`](https://docs.python.org/zh-cn/3/library/datetime.html#datetime.time) 对象的所有信息的单一对象。

```python
class datetime.datetime(year, month, day, hour=0, minute=0, second=0, microsecond=0, tzinfo=None, *, fold=0)
```

静态方法：

- datetime.**now**(*tz*=*None*)

  返回表示当前地方时的日期和时间对象。

实例方法：

- datetime.**strftime**(*format*)

  返回表示日期和时间的字符串，由[显式格式字符串](https://docs.python.org/zh-cn/3/library/datetime.html#strftime-and-strptime-format-codes)控制。

  ```python
  now = datetime.now()
  ftime = now.strftime("%Y-%m-%d %H:%M:%S")
  ```

### 数字和数学模块

[数字和数学模块](https://docs.python.org/zh-cn/3/library/numeric.html)提供与数字和数学相关的函数和数据类型。

#### decimal

[`decimal`](https://docs.python.org/zh-cn/3/library/decimal.html) 模块提供对快速且正确舍入的十进制浮点运算的支持。

它提供了优于浮点数据类型的几个优点：

- `Decimal` 类型的设计是基于考虑人类习惯的浮点数模型。

- `Decimal` 数字的表示是完全精确的。相比之下，1.1 和 2.2 这样的数字在二进制浮点中没有精确的表示。

- `Decimal` 模块包含有效位的概念。

  因此 1.30 + 1.20 的结果是 2.50，保留尾随零以表示有效位，这是货币的惯用表示方法。

  乘法则保留被乘数中的所有数字的方法。例如，1.3 * 1.2 结果是 1.56 而 1.30 * 1.20 结果是 1.5600。

- 与基于硬件的二进制浮点不同，十进制模块具有用户可更改的精度（默认为 28 位）。

  ```python
  from decimal import *
  
  getcontext().prec = 6
  print(Decimal(1) / Decimal(7))
  ```

#### fractions

[`fractions`](https://docs.python.org/zh-cn/3/library/fractions.html) 模块支持分数运算。

分数实例可以由一对整数，一个分数，或者一个字符串构建而成。

### 函数式编程模块

[函数式编程模块](https://docs.python.org/zh-cn/3/library/functional.html)提供了函数和类，以支持函数式编程风格和在可调用对象上的通用操作。

#### functools

[`functools`](https://docs.python.org/zh-cn/3/library/functools.html) 模块应用于高阶函数，即参数或返回值为其他函数的函数。通常来说，此模块的功能适用于所有可调用对象。

##### wraps

[`wraps`](https://docs.python.org/zh-cn/3/library/functools.html#functools.wraps) 是一个装饰器函数，使得被包装的函数的元信息（如函数名、文档字符串等）能够被正确地传递给包装后的函数，避免元信息的丢失。

```python
@functools.wraps(wrapped, assigned=WRAPPER_ASSIGNMENTS, updated=WRAPPER_UPDATES)
```

例如，对 `add` 函数进行包装，会丢失 `add` 的元信息，通过 `wraps` 避免元信息的丢失。

```python
import functools

def logger(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@logger
def add(a, b):
    """Add two numbers."""
    return a + b

print(add.__name__)
print(add.__doc__)
```

大致等价于：

```python
import functools

def logger(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    wrapper.__name__ = func.__name__
    wrapper.__doc__ = func.__doc__
    return wrapper

@logger
def add(a, b):
    """Add two numbers."""
    return a + b

print(add.__name__)
print(add.__doc__)
```

### 文件和目录访问

[文件和目录访问模块](https://docs.python.org/zh-cn/3/library/filesys.html)用于处理磁盘文件和目录。

#### os.path

[`os.path`](https://docs.python.org/zh-cn/3/library/os.path.html) 模块实现了一些有用的路径名称相关函数。

- os.path.**join**(*path*, **paths*)

  智能地拼接一个或多个路径部分。
  
  ```python
  import os
  
  folder = "my_folder"
  subfolder = "sub_folder"
  filename = "my_file.txt"
  
  full_path = os.path.join(folder, subfolder, filename)
  
  print("Full Path:", full_path)
  ```

### 通用操作系统服务

[通用操作系统服务模块](https://docs.python.org/zh-cn/3/library/allos.html)提供了在所有的操作系统上可用的操作系统特性的接口。

#### os

[`os`](https://docs.python.org/zh-cn/3/library/os.html) 模块提供了一种使用与操作系统相关的功能的便捷式途径。

- os.**getcwd**()

  返回表示当前工作目录的字符串。

#### io

[`io`](https://docs.python.org/zh-cn/3/library/io.html) 模块提供了 Python 用于处理各种 IO 类型的主要工具。

##### 文本 IO

[文本 IO](https://docs.python.org/zh-cn/3/library/io.html#text-i-o) 预期生成 [`str`](https://docs.python.org/zh-cn/3/library/stdtypes.html#str) 对象。

无论后台存储是由字节还是字符组成的，数据的编码和解码都是透明的，并且可以选择转换特定于平台的换行符。

创建文本流的最简单方法是使用 [`open()`](https://docs.python.org/zh-cn/3/library/functions.html#open)，可以选择指定编码：

```python
f = open("myfile.txt", "r", encoding="utf-8")
```

内存中的文本流也可以通过 [`StringIO`](https://docs.python.org/zh-cn/3/library/io.html#io.StringIO) 对象使用：

```python
f = io.StringIO("some initial text data")
```

##### 二进制 IO

[二进制 IO](https://docs.python.org/zh-cn/3/library/io.html#binary-i-o) 预期生成 [`bytes`](https://docs.python.org/zh-cn/3/library/stdtypes.html#bytes) 对象。

不执行编码、解码或换行转换。这种类型的流可以用于所有类型的非文本数据，并且还可以在需要手动控制文本数据的处理时使用。

创建二进制流的最简单方法是使用 [`open()`](https://docs.python.org/zh-cn/3/library/functions.html#open)，并在模式字符串中指定 `b`：

```python
f = open("myfile.jpg", "rb")
```

内存中的二进制流也可以通过 [`BytesIO`](https://docs.python.org/zh-cn/3/library/io.html#io.BytesIO) 对象使用：

```python
f = io.BytesIO(b"some initial binary data: \x39\x33")
```

##### IOBase

[io.**IOBase**](https://docs.python.org/zh-cn/3/library/io.html#io.IOBase) 是所有 IO 类的抽象基类。

此类为许多方法提供了空的抽象实现，派生类可以有选择地重写。默认实现代表一个无法读取、写入或查找的文件。

[`IOBase`](https://docs.python.org/zh-cn/3/library/io.html#io.IOBase) 提供以下数据属性和方法：

- **close**()

  刷新并[关闭](https://docs.python.org/zh-cn/3/library/io.html#io.IOBase.close)此流。

- **seek**(*offset*, *whence*=*os.SEEK_SET*, /)

  将流位置[修改](https://docs.python.org/zh-cn/3/library/io.html#io.IOBase.seek)到给定的字节 *offset*。*offset* 将相对于由 *whence* 指定的位置进行解析。

  *whence* 的默认值为 *os.SEEK_SET*。*whence* 的可用值有：
  
  - *os.SEEK_SET* 或 *0*：流的开头；*offset* 应为零或正值。
  - *os.SEEK_CUR* 或 *1*：当前流位置；*offset* 可以为负值。
  - *os.SEEK_END* 或 *2*：流的末尾；*offset* 通常为负值。

##### RawIOBase

[io.**RawIOBase**](https://docs.python.org/zh-cn/3/library/io.html#io.RawIOBase) 是原始二进制流的基类。它继承自 [`IOBase`](https://docs.python.org/zh-cn/3/library/io.html#io.IOBase)。

[`RawIOBase`](https://docs.python.org/zh-cn/3/library/io.html#io.RawIOBase) 在 [`IOBase`](https://docs.python.org/zh-cn/3/library/io.html#io.IOBase) 的现有成员以外还提供了下列方法：

- **read**(*size*=*-1*, /)

  从对象中[读取](https://docs.python.org/zh-cn/3/library/io.html#io.RawIOBase.read) *size* 个字节并将其返回。

#### time

[`time`](https://docs.python.org/zh-cn/3/library/time.html) 模块提供了各种与时间相关的函数。

- time.**sleep**(*secs*)

  在给定的秒数内[暂停](https://docs.python.org/zh-cn/3/library/time.html#time.sleep)调用线程的执行。该参数可以是一个浮点数，以指示更精确的睡眠时间。

#### argparse

[`argparse`](https://docs.python.org/zh-cn/3/library/argparse.html) 模块是用于命令行选项、参数和子命令的解析器。

[`argparse`](https://docs.python.org/zh-cn/3/library/argparse.html) 模块对命令行接口的支持是围绕 [`argparse.ArgumentParser`](https://docs.python.org/zh-cn/3/library/argparse.html#argparse.ArgumentParser) 的实例建立的。

```python
parser = ArgumentParser(prog="ProgramName", description="What the program does")
```

[`ArgumentParser.add_argument()`](https://docs.python.org/zh-cn/3/library/argparse.html#argparse.ArgumentParser.add_argument) 方法将单个参数规格说明关联到解析器。

```python
parser.add_argument('--verbose', action='store_true', help='Enable verbose output')
parser.add_argument('--quiet', action='store_true', help='Enable quiet output')
```

[`ArgumentParser.parse_args()`](https://docs.python.org/zh-cn/3/library/argparse.html#argparse.ArgumentParser.parse_args) 方法运行解析器并将提取的数据放入 [`argparse.Namespace`](https://docs.python.org/zh-cn/3/library/argparse.html#argparse.Namespace) 对象。

```python
args = parser.parse_args()
print(args.filename, args.count, args.verbose)
```

根据解析的参数执行相应的操作。

```python
if args.verbose:
    print("Verbose mode is enabled.")
elif args.quiet:
    print("Quiet mode is enabled.")
else:
    print("Default mode is enabled.")
```

[`ArgumentParser.add_mutually_exclusive_group`](https://docs.python.org/zh-cn/3/library/argparse.html#argparse.ArgumentParser.add_mutually_exclusive_group) 创建一个互斥组，[`argparse`](https://docs.python.org/zh-cn/3/library/argparse.html) 将会确保互斥组中只有一个参数在命令行中可用。

```python
main_group = parser.add_mutually_exclusive_group(required=True)
main_group.add_argument('--verbose', action='store_true', help='Enable verbose output')
main_group.add_argument('--quiet', action='store_true', help='Enable quiet output')
```

### 互联网协议和支持

[互联网协议和支持模块](https://docs.python.org/zh-cn/3/library/internet.html)实现了互联网协议以及相关技术支持。

#### uuid

[`uuid`](https://docs.python.org/zh-cn/3/library/uuid.html) 模块提供了不可变的 [UUID](https://docs.python.org/zh-cn/3/library/uuid.html#uuid.UUID) 对象和 [`uuid1()`](https://docs.python.org/zh-cn/3/library/uuid.html#uuid.uuid1)，[`uuid3()`](https://docs.python.org/zh-cn/3/library/uuid.html#uuid.uuid3)，[`uuid4()`](https://docs.python.org/zh-cn/3/library/uuid.html#uuid.uuid4)，[`uuid5()`](https://docs.python.org/zh-cn/3/library/uuid.html#uuid.uuid5) 等函数用于生成 [RFC 4122](https://tools.ietf.org/html/rfc4122) 所定义的第 1，3，4 和 5 版 *UUID*。

```python
class uuid.UUID(hex=None, bytes=None, bytes_le=None, fields=None, int=None, version=None, *, is_safe=SafeUUID.unknown)
```

用一串 32 位十六进制数字创建一个 *UUID*。

```python
uuid.UUID('c4396c2e-cf4c-46aa-a4ef-3d20f17d88d5')
```

`str(uuid)` 返回一个 *12345678-1234-5678-1234-567812345678* 形式的字符串，其中 32 位十六进制数字代表 *UUID*。

- uuid.**uuid4**()

  生成一个随机的 *UUID*。

- uuid.**uuid5**(*namespace*, *name*)

  根据 *namespace* 和 *name* 的 SHA-1 哈希值生成一个 *UUID*。

  ```python
  namespace = uuid.UUID('c4396c2e-cf4c-46aa-a4ef-3d20f17d88d5')
  name = 'example.com'
  uuid5 = uuid.uuid5(namespace, name)
  ```

### Python 运行时服务

#### sys

[`sys`](https://docs.python.org/zh-cn/3/library/sys.html) 模块提供了一些变量和函数。这些变量可能被解释器使用，也可能由解释器提供。

- sys.**argv**

  一个列表，其中包含了被传递给 Python 脚本的命令行参数。

  - `argv[0]` 为脚本的名称。

    如果没有脚本名被传递给 Python 解释器，`argv[0]` 为空字符串。
  
    如果是通过 Python 解释器的命令行参数 `-c` 来执行的，`argv[0]` 会被设置成字符串 `'-c'`。
  
    给定脚本名是 `-`（标准输入）时，`argv[0]` 是 `'-'`。
  
    如果使用选项 `-m module`，`argv[0]` 就是包含目录的模块全名。
  
  解释器不处理 `-c command` 或 `-m module` 之后的选项，而是直接留在 `sys.argv` 中由命令或模块来处理。
  
  ```sh
  echo -e 'import sys\nprint(sys.argv)' | python -
  python -c "import sys; print(sys.argv)"
  ```

### 导入模块

#### importlib

[`importlib`](https://docs.python.org/zh-cn/3/library/importlib.html) 包的主要目的是在 Python 源代码中提供 [`import`](https://docs.python.org/zh-cn/3/reference/simple_stmts.html#import) 语句的实现。

- importlib.**import_module**(*name*, *package*=*None*)

  导入一个模块。参数 *name* 指定了以绝对或相对导入方式导入什么模块。如果参数 *name* 使用相对导入的方式来指定，那么 *package* 参数必须设置为模块包名。

### 并发执行

#### threading

[`threading`](https://docs.python.org/zh-cn/3/library/threading.html) 模块在较低级别的 [`_thread`](https://docs.python.org/zh-cn/3/library/_thread.html#module-_thread) 模块之上构建较高级别的线程接口。

##### 线程对象

```python
class threading.Thread(group=None, target=None, name=None, args=(), kwargs={}, *, daemon=None)
```

[`Thread`](https://docs.python.org/zh-cn/3/library/threading.html#threading.Thread) 类代表一个在独立控制线程中运行的活动。

有两种方式指定活动：

- 传递一个可调用对象给构造函数。
- 在子类重载 [`run()`](https://docs.python.org/zh-cn/3/library/threading.html#threading.Thread.run) 方法。

当线程对象一旦被创建，其活动必须通过调用线程的 [`start()`](https://docs.python.org/zh-cn/3/library/threading.html#threading.Thread.start) 方法开始。这会在独立的控制线程中发起调用 [`run()`](https://docs.python.org/zh-cn/3/library/threading.html#threading.Thread.run) 方法。

其他线程可以调用一个线程的 [`join()`](https://docs.python.org/zh-cn/3/library/threading.html#threading.Thread.join) 方法。这会阻塞调用该方法的线程，直到被调用 [`join()`](https://docs.python.org/zh-cn/3/library/threading.html#threading.Thread.join) 方法的线程终结。

以下为通过**构造函数**创建线程，操作共有变量，线程不安全的例子：

```python
import threading
import time

count = 0

def add():
    global count
    tmp = count
    time.sleep(0.001)
    count = tmp + 1


thread_list = []
for _ in range(100):
    thread = threading.Thread(target=add)
    thread_list.append(thread)

for j in thread_list:
    j.start()

for j in thread_list:
    j.join()

print(count)
```

##### 锁对象

[`threading.Lock`](https://docs.python.org/zh-cn/3/library/threading.html#threading.Lock) 是实现原始锁对象的类。一旦一个线程获得一个锁，会阻塞随后尝试获得锁的线程，直到它被释放；任何线程都可以释放它。

```python
class threading.Lock
```

- **acquire**(*blocking*=*True*, *timeout*=*-1*)

  可以阻塞或非阻塞地获得锁。

  当锁对象已经被某个线程锁定时，其他线程尝试调用 [`acquire()`](https://docs.python.org/zh-cn/3/library/threading.html#threading.Lock.acquire) 方法来获得锁时会被阻塞。

  这些线程会一直等待，直到持有锁的线程调用 [`release()`](https://docs.python.org/zh-cn/3/library/threading.html#threading.Lock.release) 方法释放锁。释放锁后，这些被阻塞的线程中的一个线程会调用 [`acquire()`](https://docs.python.org/zh-cn/3/library/threading.html#threading.Lock.acquire) 方法获得锁。这时，锁的状态会再次变为锁定，表示当前线程已经成功获得了锁。

- **release**()

  释放一个锁。这个方法可以在任何线程中调用，不单指获得锁的线程。

以下为通过锁，操作共有变量，线程安全的例子：

```python
import threading
import time

count = 0
lock = threading.Lock()

def add():
    global count
    lock.acquire()
    tmp = count
    time.sleep(0.001)
    count = tmp + 1
    lock.release()


thread_list = []
for _ in range(100):
    thread = threading.Thread(target=add)
    thread_list.append(thread)

for j in thread_list:
    j.start()

for j in thread_list:
    j.join()

print(count)
```

Python 提供了上下文管理器来简化锁的使用，确保锁在不再需要时正确释放。

当进入语句块时 [`acquire()`](https://docs.python.org/zh-cn/3/library/threading.html#threading.Lock.acquire) 方法会被调用，退出语句块时 [`release()`](https://docs.python.org/zh-cn/3/library/threading.html#threading.Lock.release) 会被调用。

因此，以下片段：

```python
with some_lock:
    # do something...
```

相当于

```python
some_lock.acquire()
try:
    # do something...
finally:
    some_lock.release()
```

#### concurrent.futures

[`concurrent.futures`](https://docs.python.org/zh-cn/3/library/concurrent.futures.html) 模块提供异步执行可调用对象高层接口。

异步执行可以由 [`ThreadPoolExecutor`](https://docs.python.org/zh-cn/3/library/concurrent.futures.html#concurrent.futures.ThreadPoolExecutor) 使用线程或由 [`ProcessPoolExecutor`](https://docs.python.org/zh-cn/3/library/concurrent.futures.html#concurrent.futures.ProcessPoolExecutor) 使用单独的进程来实现。两者都是实现抽像类 [`Executor`](https://docs.python.org/zh-cn/3/library/concurrent.futures.html#concurrent.futures.Executor) 定义的接口。

##### Executor

```python
class concurrent.futures.Executor
```

抽象类提供异步执行调用方法。要通过它的子类调用，而不是直接调用。

- **submit**(*fn*, /, *\*args*, ***kwargs*)

  调度可调用对象 *fn*，以 `fn(*args, **kwargs)` 方式执行并返回一个代表该可调用对象的执行的 [`Future`](https://docs.python.org/zh-cn/3/library/concurrent.futures.html#concurrent.futures.Future) 对象。

  ```python
  with ThreadPoolExecutor(max_workers=1) as executor:
      future = executor.submit(pow, 323, 1235)
      print(future.result())
  ```

##### ThreadPoolExecutor

[`ThreadPoolExecutor`](https://docs.python.org/zh-cn/3/library/concurrent.futures.html#concurrent.futures.ThreadPoolExecutor) 是 [`Executor`](https://docs.python.org/zh-cn/3/library/concurrent.futures.html#concurrent.futures.Executor) 的子类，它使用线程池来异步执行调用。

```python
class concurrent.futures.ThreadPoolExecutor(max_workers=None, thread_name_prefix='', initializer=None, initargs=())
```

以下为多线程操作共有变量，线程不安全的例子：

```python
from concurrent.futures import ThreadPoolExecutor, as_completed
import time

count = 0

def add():
    global count
    tmp = count
    time.sleep(0.001)
    count = tmp + 1
    return count


executor = ThreadPoolExecutor(max_workers=2)
futures = [executor.submit(add) for i in range(1, 6)]

for future in as_completed(futures):
    result = future.result()
    print(result)

print(count)
```

##### 模块函数

- concurrent.futures.**as_completed**(*fs*, *timeout*=*None*)

  返回 *fs* 给出的 [`Future`](https://docs.python.org/zh-cn/3/library/concurrent.futures.html#concurrent.futures.Future) 实例的迭代器，按线程完成的顺序返回 *futures*。

### 软件打包和分发

#### venv

[`venv`](https://docs.python.org/zh-cn/3/library/venv.html) 是创建虚拟环境的标准工具。从 Python 3.3 开始成为 Python 的组成部分；从 Python 3.4 开始，它会默认安装 `pip` 到所创建的全部虚拟环境。

`virtualenv` 是 `venv` 的第三方替代及其前身。它允许在 Python 3.4 之前的版本中使用虚拟环境，那些版本或是完全不提供 `venv`，或是不会自动安装 `pip` 到所创建的虚拟环境。

创建虚拟环境。

```sh
python3 -m venv DIR
```

激活虚拟环境。

```sh
source DIR/bin/activate  # Linux
DIR\Scripts\activate     # Windows
```

退出虚拟环境。

```sh
source DIR/bin/deactivate  # Linux
DIR\Scripts\deactivate     # Windows
```

