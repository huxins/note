# Python 标准库

## 一、内置函数

### all

用法如下。

```python
all(iterable)
```

如果 *iterable* 的所有元素均为真值，或可迭代对象为空，则返回 True。

```python
if not all([username, password]):
    raise ValueError('用户名或密码为空')
```

### bytes

用法如下。

```python
class bytes(source=b'')
class bytes(source, encoding)
class bytes(source, encoding, errors)
```

返回一个新的 `bytes` 对象，这是一个不可变序列，包含范围为 `0 <= x < 256` 的整数。

```python
bytes('Hello', encoding='utf8')
```

### int

用法如下。

```python
class int(number=0, /)
class int(string, /, base=10)
```

返回一个基于数字或字符串构造的整数对象，或者在未给出参数时返回 `0`。

如果参数定义了 `__int__()`，`int(x)` 将返回 `x.__int__()`。

如果参数定义了 `__index__()`，则返回 `x.__index__()`。

如果参数定义了 `__trunc__()`，则返回 `x.__trunc__()`。

对于浮点数，它将向零舍入。

一个进制为 *n* 的整数包含 `0` 到 `n-1` 的数，其中 `a-z` 或 `A-Z` 表示 `10` 到 `35`。

默认的 *base* 为 `10`，允许的进制有 `0`、`2-36`。`2`、`8`、`16` 进制的数字可以在代码中用 `0b`/`0B`、`0o`/`0O`、`0x`/`0X` 前缀来表示。

进制为 `0` 将按照代码的字面量来精确解释，最后的结果会是 `2`、`8`、`10`、`16` 进制中的一个。所以 `int('010', 0)` 是非法的，但 `int('010')` 和 `int('010', 8)` 是合法的。

二进制转十进制。

```python
int('0b_1111_0000', 2)
```

### isinstance

用法如下。

```python
isinstance(object, classinfo)
```

如果 *object* 参数是 *classinfo* 参数或其子类的实例，则返回 `True`。

### open

用法如下。

```python
open(file, mode='r', buffering=-1, encoding=None, errors=None, newline=None, closefd=True, opener=None)
```

打开 *file* 并返回对应的 *file object*。如果该文件不能被打开，则引发 `OSError`。

可用模式有：

- **r**：读取，默认值。
- **w**：写入。
- **x**：排它性创建，如果文件已存在则失败。
- **a**：打开文件用于写入，如果文件存在则在末尾追加。
- **b**：二进制模式。
- **t**：文本模式，默认。
- **+**：打开用于更新，读取与写入。

### repr

用法如下。

```python
repr(object)
```

返回对象的可打印表示形式的字符串。

### str

用法如下。

```python
class str(object='')
class str(object=b'', encoding='utf-8', errors='strict')
```

返回一个 *str* 版本的 *object*。

```python
str(b'Hello', encoding="utf-8")
```

### \__import__

用法如下。

```python
__import__(name, globals=None, locals=None, fromlist=(), level=0)
```

此函数会由 `import` 语句发起调用。不建议直接使用 `__import__()` 而应该用 `importlib.import_module()`。

本函数会导入模块 *name*，利用 *globals* 和 *locals* 来决定如何在包的上下文中解释该名称。

*fromlist* 给出了应从 *name* 模块中导入的对象或子模块的名称。

标准的实现代码完全不会用到 *locals* 参数，只用到了 *globals* 用于确定 `import` 语句所在的包上下文。

*level* 指定是使用绝对还是相对导入。`0` 意味着仅执行绝对导入。*level* 为正数值表示相对于模块调用 `__import__()` 的目录，将要搜索的父目录层数。

当 *name* 变量的形式为 `package.module` 时，通常将会返回最高层级的包，而不是以 *name* 命名的模块。但是，当给出了非空的 *fromlist* 参数时，则将返回以 *name* 命名的模块。

例如，语句 `import time` 的结果将为与以下代码作用相同的字节码：

```python
time = __import__('time', globals(), locals(), [], 0)
```

语句 `import lxml.html` 的结果将为以下调用：

```python
lxml = __import__('lxml.html', globals(), locals(), [], 0)
```

请注意，在这里 `__import__()` 是返回顶层模块的，因为这是通过 `import` 语句被绑定到特定名称的对象。

另一方面，语句 `from lxml.html import fromstring, document_fromstring as doc_fromstring` 的结果将为：

```python
_temp = __import__('lxml.html', globals(), locals(), ['fromstring', 'document_fromstring'], 0)
fromstring = _temp.fromstring
doc_fromstring = _temp.document_fromstring
```

在这里，`lxml.html` 模块会由 `__import__()` 返回。要导入的对象将从此对象中提取并赋值给它们对应的名称。

如果您只想按名称导入模块，请使用 `importlib.import_module()`。

## 二、内置类型

### 数字类型

共有三种不同的数字类型：

- **int**：整数。
- **float**：浮点数。
- **complex**：复数。

此外，布尔值是整数的子类型。

整数和浮点数支持下列[运算](https://docs.python.org/zh-cn/3/library/stdtypes.html#numeric-types-int-float-complex)：

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

商数也称为整数除法。结果值是一个整数，但结果的类型不一定是 `int`。运算结果总是向负无穷的方向舍入：`1//2` 为 `0`，`(-1)//2` 为 `-1`，`1//(-2)` 为 `-1` 而 `(-1)//(-2)` 为 `0`。

### 序列类型

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

不可变序列类型普遍实现而可变序列类型未实现的唯一操作就是对 `hash()` 内置函数的支持。

这种支持允许不可变类型，例如 `tuple` 实例被用作 `dict` 键，以及存储在 `set` 和 `frozenset` 实例中。

#### 可变序列类型

以下表格中的[操作](https://docs.python.org/zh-cn/3/library/stdtypes.html#mutable-sequence-types)是在可变序列类型上定义的。

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

#### 元组

[元组](https://docs.python.org/zh-cn/3/library/stdtypes.html#tuples)是不可变序列，通常用于储存异构数据的多项集。

可以用多种方式构建元组：

- 使用一对圆括号来表示空元组：`()`
- 使用一个后缀的逗号来表示单元组：`a,` 或 `(a,)`
- 使用以逗号分隔的多个项：`a, b, c` 或 `(a, b, c)`
- 使用内置的 `tuple()`：`tuple()` 或 `tuple(iterable)`

#### range

[`range`](https://docs.python.org/zh-cn/3/library/stdtypes.html#ranges) 类型表示不可变的数字序列，通常用于在 `for` 循环中循环指定的次数。

用法如下。

```python
class range(stop)
class range(start, stop[, step])
```

`range` 构造器的参数必须为整数（可以是内置的 `int` 或任何实现了 `__index__()` 特殊方法的对象）。如果省略 `step` 参数，则默认为 1。如果省略 `start` 参数，则默认为 0。如果 `step` 为零，则会引发 `ValueError`。

### 文本序列类型

在 Python 中处理文本数据是使用 `str` 对象，也称为字符串。字符串是由 Unicode 码位构成的不可变序列。字符串字面值有多种不同的写法：

- 单引号：`'允许包含有 "双" 引号'`
- 双引号：`"允许嵌入 '单' 引号"`
- 三重引号：`'''三重单引号'''`，`"""三重双引号"""`

和其他语言不一样，特殊字符如 `\n` 在单引号和双引号里的意义一样。这两种引号唯一的区别是，不需要在单引号里转义双引号，但必须把单引号转义成 `\'`，反之亦然。

使用三重引号的字符串可以跨越多行，其中所有的空白字符都将包含在该字符串字面值中。

#### 实例方法

字符串实现了所有一般序列的操作，还额外提供了以下列出的一些附加方法。

- str.**encode**(*encoding*=*'utf-8'*, *errors*=*'strict'*)

  返回原字符串编码为字节串对象的版本。默认编码为 `utf-8`。

- str.**format**(*args*, ***kwargs*)

  执行字符串格式化操作。调用此方法的字符串可以包含字符串字面值或者以花括号 `{}` 括起来的替换域。每个替换域可以包含一个位置参数的数字索引，或者一个关键字参数的名称。返回的字符串副本中每个替换域都会被替换为对应参数的字符串值。

  ```python
  "The sum of 1 + 2 is {0}".format(1+2)
  # 'The sum of 1 + 2 is 3'
  ```

- str.**upper**()

  返回原字符串的副本，其中所有区分大小写的字符均转换为大写。

#### 字符串格式化

##### printf 风格

字符串具有一种特殊的[内置操作](https://docs.python.org/zh-cn/3/library/stdtypes.html#printf-style-string-formatting)：使用 `%` 运算符。这也被称为字符串的格式化或插值运算符。对于 `format % values`（其中 `format` 为一个字符串），在 `format` 中的 `%` 转换标记符将被替换为零个或多个 `values` 条目。其效果类似于在 C 语言中使用 `sprintf()`。

如果 `format` 要求一个单独参数，则 `values` 可以为一个非元组对象。否则的话，`values` 必须是一个包含项数与格式字符串中指定的转换符项数相同的元组，或者是一个单独映射对象（例如字典）。

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

操作二进制数据的核心内置类型是 `bytes` 和 `bytearray`。它们由 `memoryview` 提供支持，该对象使用缓冲区协议来访问其他二进制对象所在内存，不需要创建对象的副本。

`array` 模块支持高效地存储基本数据类型，例如 32 位整数和 IEEE754 双精度浮点值。

#### bytes

`bytes` 对象是由单个字节构成的不可变序列。由于许多主要二进制协议都基于 ASCII 文本编码，因此 `bytes` 对象提供了一些仅在处理 ASCII 兼容数据时可用，并且在许多特性上与字符串对象紧密相关的方法。

#### bytearray

`bytearray` 对象是 `bytes` 对象的可变对应物。

#### 实例方法

- bytes.**decode**(*encoding*=*'utf-8'*, *errors*=*'strict'*)
- bytearray.**decode**(*encoding*=*'utf-8'*, *errors*=*'strict'*)

  返回从给定 `bytes` 解码出来的字符串。默认编码为 `utf-8`。

  ```python
  bytes.decode(b'Hello', encoding="utf-8")
  ```

### 映射类型

用法如下。

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
  
#### 实例方法

这些是字典所支持的操作：

- **get**(*key*[, *default*])

  如果 `key` 存在于字典中则返回 `key` 的值，否则返回 `default`。如果 `default` 未给出则默认为 `None`。

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

  如果字典存在键 `key`，返回它的值。如果不存在，插入值为 `default` 的键 `key`，并返回 `default`。`default` 默认为 `None`。

- **update**([*other*])

  使用来自 `other` 的键值对更新字典，覆盖原有的键。返回 `None`。

  `update()` 接受另一个字典对象，或者一个包含键值对的可迭代对象。如果给出了关键字参数，则会以其所指定的键值对更新字典：`d.update(red=1, blue=2)`。

### 上下文管理器类型

Python 的 `with` 语句支持由上下文管理器定义的运行时上下文这一概念。此对象的实现使用了一对专门方法，允许用户自定义类来定义运行时上下文，在语句体被执行前进入该上下文，并在语句执行完毕时退出该上下文：

- contextmanager.**\__enter__**()

  进入运行时上下文并返回此对象或关联到该运行时上下文的其他对象。此方法的返回值会绑定到使用此上下文管理器的 `with` 语句的 `as` 子句中的标识符。

  一个返回其自身的上下文管理器的例子是 *file object*。文件对象会从 `__enter__()` 返回其自身，以允许 `open()` 被用作 `with` 语句中的上下文表达式。

  一个返回关联对象的上下文管理器的例子是 `decimal.localcontext()` 所返回的对象。此种管理器会将活动的 `decimal` 上下文设为原始 `decimal` 上下文的一个副本并返回该副本。这允许对 `with` 语句的语句体中的当前 `decimal` 上下文进行更改，而不会影响 `with` 语句以外的代码。

- contextmanager.**\__exit__**(*exc_type*, *exc_val*, *exc_tb*)

  退出运行时上下文并返回一个布尔值标识来表明所发生的任何异常是否应当被屏蔽。如果在执行 `with` 语句的语句体期间发生了异常，则参数会包含异常的类型、值以及回溯信息。在其他情况下三个参数均为 `None`。

  自此方法返回一个真值将导致 `with` 语句屏蔽异常并继续执行紧随在 `with` 语句之后的语句。否则异常将在此方法结束执行后继续传播。在此方法执行期间发生的异常将会取代 `with` 语句的语句体中发生的任何异常。

  传入的异常绝对不应当被显式地重新引发，相反地，此方法应当返回一个假值以表明方法已成功完成并且不希望屏蔽被引发的异常。这允许上下文管理代码方便地检测 `__exit__()` 方法是否确实已失败。

Python 定义了一些上下文管理器来支持简易的线程同步、文件或其他对象的快速关闭，以及更方便地操作活动的 `decimal` 上下文。除了实现上下文管理协议以外，不同类型不会被特殊处理。

## 三、内置异常

### 具体异常

以下异常属于经常被引发的异常。

- *exception* **KeyError**

  当在现有键集合中找不到指定的映射键时将被引发。

- *exception* **ValueError**

  当操作或函数接收到具有正确类型但值不适合的参数，并且情况不能用更精确的异常例如 `IndexError` 来描述时将被引发。

## 四、文本处理服务

### string

#### 格式字符串语法

[格式字符串](https://docs.python.org/zh-cn/3/library/string.html#format-string-syntax)包含有以花括号 `{}` 括起来的替换字段。不在花括号之内的内容被视为字面文本，会不加修改地复制到输出中。如果你需要在字面文本中包含花括号字符，可以通过重复来转义：`{{ and }}`。

替换字段的语法如下：

```
replacement_field ::=  "{" [field_name] ["!" conversion] [":" format_spec] "}"
```

*conversion* 字段会在格式化之前进行类型强制转换。通常，格式化值的工作由该值本身的 `__format__()` 方法来完成。但是，在某些情况下最好强制将类型格式化为一个字符串，覆盖其本身的格式化定义。通过在调用 `__format__()` 之前将值转换为字符串，可以绕过正常的格式化逻辑。

目前支持的转换标识有三种：`'!s'` 会对值调用 `str()`，`'!r'` 调用 `repr()` 而 `'!a'` 则调用 `ascii()`。

例如，调用 `repr()`：

```python
"<User(name={self.name!r})>".format(self=self)
```

## 五、数据类型

### datetime

[`datetime`](https://docs.python.org/zh-cn/3/library/datetime.html) 模块提供用于处理日期和时间的类。

#### datetime

`datetime` 对象是包含来自 `date` 对象和 `time` 对象的所有信息的单一对象。

```python
class datetime.datetime(year, month, day, hour=0, minute=0, second=0, microsecond=0, tzinfo=None, *, fold=0)
```

静态方法：

- datetime.**now**(*tz*=*None*)

  返回表示当前地方时的日期和时间对象。

实例方法：

- datetime.**strftime**(*format*)

  返回表示日期和时间的字符串，由显式格式字符串控制。

  ```python
  now = datetime.now()
  ftime = now.strftime("%Y-%m-%d %H:%M:%S")
  ```

## 六、数字和数学模块

### decimal

[`decimal`](https://docs.python.org/zh-cn/3/library/decimal.html) 模块提供对快速且正确舍入的十进制浮点运算的支持。它提供了优于浮点数据类型的几个优点：

- Decimal 类型的设计是基于考虑人类习惯的浮点数模型。

- Decimal 数字的表示是完全精确的。相比之下，1.1 和 2.2 这样的数字在二进制浮点中没有精确的表示。

- Decimal 模块包含有效位的概念，因此 1.30 + 1.20 的结果是 2.50。保留尾随零以表示有效位。这是货币的惯用表示方法。乘法则保留被乘数中的所有数字的方法。例如，1.3 * 1.2 结果是 1.56 而 1.30 * 1.20 结果是 1.5600。

- 与基于硬件的二进制浮点不同，十进制模块具有用户可更改的精度（默认为 28 位）。

  ```python
  from decimal import *
  
  getcontext().prec = 6
  print(Decimal(1) / Decimal(7))
  ```

### fractions

[`fractions`](https://docs.python.org/zh-cn/3/library/fractions.html) 模块支持分数运算。

分数实例可以由一对整数，一个分数，或者一个字符串构建而成。

## 七、函数式编程模块

### functools

[`functools`](https://docs.python.org/zh-cn/3/library/functools.html) 模块应用于高阶函数，即参数或返回值为其他函数的函数。通常来说，此模块的功能适用于所有可调用对象。

#### wraps

这是一个装饰器函数，使得被包装的函数的元信息（如函数名、文档字符串等）能够被正确地传递给包装后的函数，避免元信息的丢失。

用法如下。

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

## 八、文件和目录访问

### os.path

- os.path.**join**(*path*, **paths*)

  智能地拼接一个或多个路径部分。
  
  ```python
  import os
  
  # 定义多个路径片段
  folder = "my_folder"
  subfolder = "sub_folder"
  filename = "my_file.txt"
  
  # 使用 os.path.join 连接路径
  full_path = os.path.join(folder, subfolder, filename)
  
  print("Full Path:", full_path)
  ```

## 九、通用操作系统服务

### os

[`os`](https://docs.python.org/zh-cn/3/library/os.html) 模块提供了一种使用与操作系统相关的功能的便捷式途径。

- os.**getcwd**()

  返回表示当前工作目录的字符串。

### io

[`io`](https://docs.python.org/zh-cn/3/library/io.html) 模块提供了 Python 用于处理各种 I/O 类型的主要工具。

#### 文本 I/O

文本 I/O 预期生成 `str` 对象。这意味着，无论后台存储是由字节还是字符组成的，数据的编码和解码都是透明的，并且可以选择转换特定于平台的换行符。

创建文本流的最简单方法是使用 `open()`，可以选择指定编码：

```python
f = open("myfile.txt", "r", encoding="utf-8")
```

内存中的文本流也可以通过 `StringIO` 对象使用：

```python
f = io.StringIO("some initial text data")
```

#### 二进制 I/O

二进制 I/O 预期生成 `bytes` 对象。不执行编码、解码或换行转换。这种类型的流可以用于所有类型的非文本数据，并且还可以在需要手动控制文本数据的处理时使用。

创建二进制流的最简单方法是使用 `open()`，并在模式字符串中指定 `'b'`：

```python
f = open("myfile.jpg", "rb")
```

内存中的二进制流也可以通过 `BytesIO` 对象使用：

```python
f = io.BytesIO(b"some initial binary data: \x39\x33")
```

#### I/O 基类

##### IOBase

io.**IOBase** 是所有 I/O 类的抽象基类。

此类为许多方法提供了空的抽象实现，派生类可以有选择地重写。默认实现代表一个无法读取、写入或查找的文件。

[`IOBase`](https://docs.python.org/zh-cn/3/library/io.html#io.IOBase) 提供以下数据属性和方法：

- **close**()

  刷新并关闭此流。

- **seek**(*offset*, *whence*=*os.SEEK_SET*, /)

  将流位置修改到给定的字节 *offset*。*offset* 将相对于由 *whence* 指定的位置进行解析。*whence* 的默认值为 *os.SEEK_SET*。*whence* 的可用值有：

  - *os.SEEK_SET* 或 *0*：流的开头；*offset* 应为零或正值。
  - *os.SEEK_CUR* 或 *1*：当前流位置；*offset* 可以为负值。
  - *os.SEEK_END* 或 *2*：流的末尾；*offset* 通常为负值。

##### RawIOBase

io.**RawIOBase** 是原始二进制流的基类。它继承自 `IOBase`。

`RawIOBase` 在 `IOBase` 的现有成员以外还提供了下列方法：

- **read**(*size*=*-1*, /)

  从对象中读取 `size` 个字节并将其返回。

### time

[`time`](https://docs.python.org/zh-cn/3/library/time.html) 模块提供了各种与时间相关的函数。

- time.**sleep**(*secs*)

  在给定的秒数内暂停调用线程的执行。该参数可以是一个浮点数，以指示更精确的睡眠时间。

## 十、互联网协议和支持

### uuid

[`uuid`](https://docs.python.org/zh-cn/3/library/uuid.html) 模块提供了不可变的 *UUID* 对象和 `uuid1()`，`uuid3()`，`uuid4()`，`uuid5()` 等函数用于生成 *RFC 4122* 所定义的第 1，3，4 和 5 版 *UUID*。

- *class* uuid.**UUID**(*hex*=*None*, *bytes*=*None*, *bytes_le*=*None*, *fields*=*None*, *int*=*None*, *version*=*None*, *, *is_safe*=*SafeUUID.unknown*)

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

## 十一、Python 运行时服务

### sys

[`sys`](https://docs.python.org/zh-cn/3/library/sys.html) 模块提供了一些变量和函数。这些变量可能被解释器使用，也可能由解释器提供。

- sys.**argv**

  一个列表，其中包含了被传递给 Python 脚本的命令行参数。

  `argv[0]` 为脚本的名称（是否是完整的路径名取决于操作系统）。如果没有脚本名被传递给 Python 解释器，`argv[0]` 为空字符串。如果是通过 Python 解释器的命令行参数 `-c` 来执行的，`argv[0]` 会被设置成字符串 `'-c'`。给定脚本名是 `'-'`（标准输入）时，`argv[0]` 是 `'-'`。如果使用选项 `-m module`，`argv[0]` 就是包含目录的模块全名。

  解释器不处理 `-c command` 或 `-m module` 之后的选项，而是直接留在 `sys.argv` 中由命令或模块来处理。
  
  ```sh
  echo -e 'import sys\nprint(sys.argv)' | python -
  python -c "import sys; print(sys.argv)"
  ```

## 十二、导入模块

### importlib

[`importlib`](https://docs.python.org/zh-cn/3/library/importlib.html) 包的主要目的是在 Python 源代码中提供 `import` 语句的实现。

- importlib.**import_module**(*name*, *package*=*None*)

  导入一个模块。参数 *name* 指定了以绝对或相对导入方式导入什么模块。如果参数 *name* 使用相对导入的方式来指定，那么 *package* 参数必须设置为模块包名。

## 十三、并发执行

### threading

[`threading`](https://docs.python.org/zh-cn/3/library/threading.html) 模块在较低级别的 `_thread` 模块之上构建较高级别的线程接口。

#### 线程对象

```python
class threading.Thread(group=None, target=None, name=None, args=(), kwargs={}, *, daemon=None)
```

`Thread` 类代表一个在独立控制线程中运行的活动。有两种方式指定活动：

- 传递一个可调用对象给构造函数。
- 在子类重载 `run()` 方法。

当线程对象一旦被创建，其活动必须通过调用线程的 `start()` 方法开始。这会在独立的控制线程中发起调用 `run()` 方法。

其他线程可以调用一个线程的 `join()` 方法。这会阻塞调用该方法的线程，直到被调用 `join()` 方法的线程终结。

以下为通过构造函数创建线程，操作共有变量，线程不安全的例子：

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

#### 锁对象

`threading.Lock` 是实现原始锁对象的类。一旦一个线程获得一个锁，会阻塞随后尝试获得锁的线程，直到它被释放；任何线程都可以释放它。

```python
class threading.Lock
```

- **acquire**(*blocking*=*True*, *timeout*=*-1*)

  可以阻塞或非阻塞地获得锁。

  当锁对象已经被某个线程锁定时，其他线程尝试调用 `acquire()` 方法来获得锁时会被阻塞。这些线程会一直等待，直到持有锁的线程调用 `release()` 方法释放锁。释放锁后，这些被阻塞的线程中的一个线程会调用 `acquire()` 方法获得锁。这时，锁的状态会再次变为锁定，表示当前线程已经成功获得了锁。

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

当进入语句块时 `acquire()` 方法会被调用，退出语句块时 `release()` 会被调用。因此，以下片段：

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

### concurrent.futures

[`concurrent.futures`](https://docs.python.org/zh-cn/3/library/concurrent.futures.html) 模块提供异步执行可调用对象高层接口。

异步执行可以由 `ThreadPoolExecutor` 使用线程或由 `ProcessPoolExecutor` 使用单独的进程来实现。两者都是实现抽像类 `Executor` 定义的接口。

#### Executor

```python
class concurrent.futures.Executor
```

抽象类提供异步执行调用方法。要通过它的子类调用，而不是直接调用。

- **submit**(*fn*, /, *\*args*, ***kwargs*)

  调度可调用对象 *fn*，以 `fn(*args, **kwargs)` 方式执行并返回一个代表该可调用对象的执行的 `Future` 对象。

  ```python
  with ThreadPoolExecutor(max_workers=1) as executor:
      future = executor.submit(pow, 323, 1235)
      print(future.result())
  ```

#### ThreadPoolExecutor

`ThreadPoolExecutor` 是 `Executor` 的子类，它使用线程池来异步执行调用。

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

#### 模块函数

- concurrent.futures.**as_completed**(*fs*, *timeout*=*None*)

  返回 *fs* 给出的 `Future` 实例的迭代器，按线程完成的顺序返回 *futures*。

