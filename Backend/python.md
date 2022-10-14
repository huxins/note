# Python

## 安装和使用

### 命令行与环境

#### 命令行

调用 Python 时，可以指定下列任意选项：

```
python [-bBdEhiIOqsSuvVWx?] [-c command | -m module-name | script | - ] [args]
```

##### 接口选项

- **-c** *`<command>`*

执行 command 中的 Python 代码。command 可以是一条语句，也可以是用换行符分隔的多条语句，其中，前导空白字符与普通模块代码中的作用一样。

使用此选项时，`sys.argv` 的首个元素为 `'-c'`，并会把当前目录加入至 `sys.path` 开头（让该目录中的模块作为顶层模块导入）。

```sh
$ python -c "import sys; print(sys.argv)"
$ python -c "import sys; print(sys.path)"
```

- **-m** *`<module-name>`*

在 `sys.path` 中搜索指定模块，并以 `__main__` 模块执行其内容。

```sh
$ python -m pip --version
```

## Python 标准库

### 内置函数

#### int()

```python
class int([x])
class int(x, base=10)
```

返回一个基于数字或字符串 *x* 构造的整数对象，或者在未给出参数时返回 `0`。如果 *x* 定义了 `__int__()`，`int(x)` 将返回 `x.__int__()`。如果 *x* 定义了 `__index__()`，它将返回 `x.__index__()`。如果 *x* 定义了 `__trunc__()`，它将返回 `x.__trunc__()`。对于浮点数，它将向零舍入。

如果 *x* 不是数字，或者有 *base* 参数，*x* 必须是字符串、*bytes*、表示进制为 *base* 的整数字面值的 *bytearray* 实例。

```python
# 二进制转十进制
flags = int('0b_1111_0000', 2)
```

### 内置类型

#### 数字类型 - int, float, complex

共有三种不同的数字类型：[整数](https://docs.python.org/zh-cn/3/library/functions.html#int)、[浮点数](https://docs.python.org/zh-cn/3/library/functions.html#float)和[复数](https://docs.python.org/zh-cn/3/library/functions.html#complex)。此外，[布尔值](https://docs.python.org/zh-cn/3/library/functions.html#bool)是整数的子类型。

#### 序列类型 - list, tuple, range

##### 通用序列操作

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

##### 不可变序列类型

不可变序列类型普遍实现而可变序列类型未实现的唯一操作就是对 `hash()` 内置函数的支持。

这种支持允许不可变类型，例如 `tuple` 实例被用作 `dict` 键，以及存储在 `set` 和 `frozenset` 实例中。

尝试对包含有不可哈希值的不可变序列进行哈希运算将会导致 TypeError。

##### 元组

元组是不可变序列，通常用于储存异构数据的多项集。

可以用多种方式构建元组：

- 使用一对圆括号来表示空元组：`()`
- 使用一个后缀的逗号来表示单元组： `a,` 或 `(a,)`
- 使用以逗号分隔的多个项：`a, b, c` or `(a, b, c)`
- 使用内置的 `tuple()`：`tuple()` 或 `tuple(iterable)`

#### 文本序列类型 - str

##### printf 风格的字符串格式化

字符串具有一种特殊的内置操作：使用 `%` (取模) 运算符。这也被称为字符串的格式化或插值运算符。对于 `format % values` (其中 *format* 为一个字符串)，在 *format* 中的 `%` 转换标记符将被替换为零个或多个 *values* 条目。其效果类似于在 C 语言中使用 *sprintf()*。

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

#### 二进制序列类型 - bytes, bytearray, memoryview

操作二进制数据的核心内置类型是 [bytes](https://docs.python.org/zh-cn/3/library/stdtypes.html#bytes) 和 [bytearray](https://docs.python.org/zh-cn/3/library/stdtypes.html#bytearray)。它们由 [memoryview](https://docs.python.org/zh-cn/3/library/stdtypes.html#memoryview) 提供支持，该对象使用缓冲区协议来访问其他二进制对象所在内存，不需要创建对象的副本。

[array](https://docs.python.org/zh-cn/3/library/array.html) 模块支持高效地存储基本数据类型，例如 32 位整数和 IEEE754 双精度浮点值。

##### bytes

bytes 对象是由单个字节构成的不可变序列。由于许多主要二进制协议都基于 ASCII 文本编码，因此 bytes 对象提供了一些仅在处理 ASCII 兼容数据时可用，并且在许多特性上与字符串对象紧密相关的方法。

```python
# str to bytes
bytes(str, encoding = "utf8")

# bytes to str
bytes.decode(b)
```

### 数字和数学模块

#### decimal

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

#### fractions

[fractions](https://docs.python.org/zh-cn/3/library/fractions.html) 模块支持分数运算。

分数实例可以由一对整数，一个分数，或者一个字符串构建而成。

### Python 运行时服务

#### sys

该模块提供了一些变量和函数。这些变量可能被解释器使用，也可能由解释器提供。

##### sys.argv

一个列表，其中包含了被传递给 Python 脚本的命令行参数。`argv[0]` 为脚本的名称（是否是完整的路径名取决于操作系统）。

如果没有脚本名被传递给 Python 解释器，`argv[0]` 为空字符串。如果是通过 Python 解释器的命令行参数 `-c` 来执行的，`argv[0]` 会被设置成字符串 `'-c'`。给定脚本名是 `'-'`（标准输入）时，`argv[0]` 是 `'-'`。如果使用选项 `-m module`，`argv[0]` 就是包含目录的模块全名。

解释器不处理 `-c command` 或 `-m module` 之后的选项，而是直接留在 `sys.argv` 中由命令或模块来处理。

```sh
$ echo -e 'import sys\nprint(sys.argv)' | python -
$ python -c "import sys; print(sys.argv)"
```

## 语言参考

### 词法分析

#### 字面值

字面值是内置类型常量值的表示法。

##### 数值字面值

数值字面值有三种类型：整数、浮点数、虚数。没有复数字面值（复数由实数加虚数构成）。

##### 整数字面值

整数字面值词法定义如下：

```
integer      ::=  decinteger | bininteger | octinteger | hexinteger
decinteger   ::=  nonzerodigit (["_"] digit)* | "0"+ (["_"] "0")*
bininteger   ::=  "0" ("b" | "B") (["_"] bindigit)+
octinteger   ::=  "0" ("o" | "O") (["_"] octdigit)+
hexinteger   ::=  "0" ("x" | "X") (["_"] hexdigit)+
nonzerodigit ::=  "1"..."9"
digit        ::=  "0"..."9"
bindigit     ::=  "0" | "1"
octdigit     ::=  "0"..."7"
hexdigit     ::=  digit | "a"..."f" | "A"..."F"
```

整数字面值的长度没有限制，能一直大到占满可用内存。

确定数值时，会忽略字面值中的下划线。下划线只是为了分组数字，让数字更易读。下划线可在数字之间，也可在 `0x` 等基数说明符后。

注意，除了 0 以外，十进制数字的开头不允许有零。以免与 Python 3.0 版之前使用的 C 样式八进制字面值混淆。

整数字面值示例如下：

```
decinteger: 10_000_000
bininteger: 0b_1010_0110_10
octinteger: 0o_1232
hexinteger: 0x_29a
```

##### 浮点数字面值

浮点数字面值词法定义如下：

```
floatnumber   ::=  pointfloat | exponentfloat
pointfloat    ::=  [digitpart] fraction | digitpart "."
exponentfloat ::=  (digitpart | pointfloat) exponent
digitpart     ::=  digit (["_"] digit)*
fraction      ::=  "." digitpart
exponent      ::=  ("e" | "E") ["+" | "-"] digitpart
```

注意，解析时，整数和指数部分总以 10 为基数。例如，`077e010` 是合法的，表示的数值与 `77e10` 相同。浮点数字面值的支持范围取决于具体实现。整数字面值支持用下划线分组数字。

浮点数字面值示例如下：

```
3.14
10.
.001
1e3
0e0
3.14_15_93
```

#### 运算符

| 运算符 | 描述                                            | 实例                 |
| ------ | ----------------------------------------------- | -------------------- |
| +      | 加 - 两个对象相加                               | 10 + 20 输出结果 30  |
| -      | 减 - 得到负数或一个数减去另一个数               | 10 - 20 输出结果 -10 |
| *      | 乘 - 两个数相乘或是返回一个被重复若干次的字符串 | 20 * 10 输出结果 200 |
| /      | 除 - x 除以 y                                   | 20 / 10 输出结果 2.0 |
| %      | 取模 - 返回除法的余数                           | 10 % 3 输出结果 1    |
| //     | 取整除 - 向下取接近商的整数                     | 20 // 10 输出结果 2  |
| **     | 幂 - 返回 x 的 y 次幂                           | 10 ** 2 输出结果 100 |

除法 (`/`) 始终返回一个浮点数。要进行向下取整除法并获得整数结果，您可以使用 `//` 运算符；要计算余数，您可以使用 `%`。

#### 分隔符

| 分隔符 | 描述 | 实例                                  |
| ------ | ---- | ------------------------------------- |
| =      | 赋值 | c = a + b 将 a + b 的运算结果赋值给 c |

### 表达式

#### 算术转换

- 如果任一参数为复数，另一参数会被转换为复数；
- 否则，如果任一参数为浮点数，另一参数会被转换为浮点数；
- 否则，两者应该都为整数，不需要进行转换。

#### 原型

原型代表编程语言中最紧密绑定的操作。

##### 调用

所谓调用就是附带可能为空的一系列参数来执行一个可调用对象（例如函数）。

###### 位置参数

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

###### 关键字参数

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

###### *expression

如果函数调用中出现了 `*expression` 句法，`expression` 必须求值为一个 `iterable`。来自该可迭代对象的元素会被当作是额外的位置参数。

注意，`*expression` 句法可能出现于显式的关键字参数之后，但它会在关键字参数，以及任何 `**expression` 参数之前被处理。

```python
def f(a, b):
    print(a, b)

f(b=1, *(2,))
```

###### **expression

如果函数调用中出现了 `**expression` 句法，则 `expression` 必须求值为一个映射，其内容被视为额外的关键字参数。

```python
def f(a, b):
    print(a, b)

f(**{'a': 1, 'b': 2})
```

### 复合语句

#### 函数定义

函数定义是一条可执行语句。它执行时会在当前局部命名空间中将函数名称绑定到一个函数对象（函数可执行代码的包装器）。这个函数对象包含对当前全局命名空间的引用，作为函数被调用时所使用的全局命名空间。

函数定义并不会执行函数体；只有当函数被调用时才会执行此操作。

##### 默认形参

用于定义函数，为参数提供默认值，调用函数时可传可不传该默认参数的值。

注意，所有位置参数必须出现在默认参数前，包括函数定义和调用。

```python
def print_hello(name, sex=1):
    pass
```

##### 额外的位置参数

我们传进的额外的位置参数都会被 `args` 变量收集，它会根据传进参数的位置合并为一个元组，`args` 是元组类型。

```python
def func(*args):
    pass
```

##### 额外的关键字参数

我们传进的额外的关键字参数都会被 `kargs` 变量收集，它会根据传进参数的关键字合并为一个字典，`kargs` 是字典类型。

```python
def func(**kargs):
    pass
```

## Python 增强建议

### 完成的 PEP

#### PEP 263 - 定义 Python 源代码编码

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

#### PEP 484 - 类型提示

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

#### PEP 515 - 数字文字中的下划线

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

## 参见

- [Python documentation](https://docs.python.org/3/)

