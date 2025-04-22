# Python

[Python](https://docs.python.org/zh-cn/3/) 是一种广泛使用的解释型、高级和通用的编程语言。

## 一、语言基础

### 命令行接口

CPython 解析器在启动时会扫描[命令行参数和环境变量](https://docs.python.org/zh-cn/3/using/cmdline.html)，以获取各种设置信息，这样可以根据用户提供的参数和环境配置调整其行为。

- -[**c**](https://docs.python.org/zh-cn/3/using/cmdline.html#cmdoption-c) *command*

  执行 `command` 中的 Python 代码。`command` 可以是一条语句，也可以是用换行符分隔的多条语句。

  使用此选项时，[`sys.argv`](https://docs.python.org/zh-cn/3/library/sys.html#sys.argv) 的首个元素为 `-c`，并会把当前目录加入至 [`sys.path`](https://docs.python.org/zh-cn/3/library/sys.html#sys.path) 开头。

  ```sh
  python -c "import sys; print(sys.argv)"
  python -c "import sys; print(sys.path)"
  ```

- -[**m**](https://docs.python.org/zh-cn/3/using/cmdline.html#cmdoption-m) *module-name*

  在 [`sys.path`](https://docs.python.org/zh-cn/3/library/sys.html#sys.path) 中搜索指定模块，并以 [`__main__`](https://docs.python.org/zh-cn/3/library/__main__.html#module-__main__) 模块执行其内容。

  ```sh
  python -m pip --version
  ```

### 安装

安装 [Python](https://docs.python.org/zh-cn/3/using/index.html) 环境是开发和运行 Python 程序的基础，不同平台的安装方式可能略有不同。

- **编译安装**

  - CentOS 7
  
    ```sh
    # 安装编译 Python 所需的依赖
    yum groupinstall "Development Tools"
    yum install openssl-devel bzip2-devel libffi-devel
    
    # 下载 Python 源代码
    wget https://www.python.org/ftp/python/3.9.18/Python-3.9.18.tgz
    
    # 解压源代码并进入目录
    tar -zxvf Python-3.9.18.tgz
    cd Python-3.9.18
    
    # 配置并编译 Python
    ./configure
    make -j$(nproc)
    
    # 安装 Python
    make altinstall
    ```

## 二、核心语法

[词法分析](https://docs.python.org/zh-cn/3/reference/lexical_analysis.html)（Lexical Analysis）是编译器或解释器中的一个关键步骤，其主要任务是将源代码转换成一系列的标记（token）。这些标记是源代码中最小的有意义的单元，比如关键字、标识符、运算符和分隔符等。词法分析器（lexer 或 scanner）负责执行这一过程。

### 字面量

[字面量](https://docs.python.org/zh-cn/3/reference/lexical_analysis.html#literals)是内置类型常量值的表示法。

- **字节串**

  [字节串字面值](https://docs.python.org/zh-cn/3/reference/lexical_analysis.html#string-and-bytes-literals)要加前缀 `b` 或 `B`。生成的是类型 `bytes` 的实例，不是类型 `str` 的实例。
  
  ```python
  # 字节串只能包含 ASCII 字符
  bytes = b'hello'
  
  # 字节串数值大于等于 128 时，必须用转义表示
  bytes = b'hello\x80world'
  ```

- **字符串**

  [字符串和字节串](https://docs.python.org/zh-cn/3/reference/lexical_analysis.html#string-and-bytes-literals)都可以加前缀 `r` 或 `R`，称为**原始字符串**，原始字符串把反斜杠当作原义字符，不执行转义操作。
  
  ```python
  normal_str = "C:\\Users\\User\\Documents"
  raw_str = r"C:\Users\User\Documents"
  ```

  为兼容 Python 2，支持 Unicode 字面值前缀 `u` 或 `U`，和普通字符串意义一样。
  
  ```python
  name = "Fred"
  u_name = u"Fred"
  ```

  前缀为 `f` 或 `F` 的字符串称为[**格式字符串**](https://docs.python.org/zh-cn/3/reference/lexical_analysis.html#f-strings)；`f` 可与 `r` 连用，但不能与 `b` 或 `u` 连用，因此，可以使用**原始格式字符串**，但不能使用格式字节串。
  
  ```python
  name = "Fred"
  formatted_str = f"He said his name is {name!r}."
  ```

- **整数**

  [整数字面值](https://docs.python.org/zh-cn/3/reference/lexical_analysis.html#integer-literals)的长度没有限制，能一直大到占满可用内存。

  确定数值时，会忽略字面值中的下划线。下划线只是为了分组数字，让数字更易读。下划线可在数字之间，也可在 `0x` 等基数说明符后。

  注意，除了 0 以外，十进制数字的开头不允许有零，以免与八进制字面值混淆。
  
  ```
  decinteger: 10_000_000
  bininteger: 0b_1010_0110_10
  octinteger: 0o_1232
  hexinteger: 0x_29a
  ```

- **浮点数**

  [浮点数](https://docs.python.org/zh-cn/3/reference/lexical_analysis.html#floating-point-literals)解析时，整数和指数部分总以 10 为基数。例如，`077e010` 是合法的，表示的数值与 `77e10` 相同。
  
  ```
  3.14
  10.
  .001
  1e3
  0e0
  3.14_15_93
  ```

### 运算符

[运算符](https://docs.python.org/zh-cn/3/reference/lexical_analysis.html#operators)如下所示。

| 运算符 | 描述                                           | 实例          |
| ------ | ---------------------------------------------- | ------------- |
| +      | 加，两个对象相加                               | 10 + 20 = 30  |
| -      | 减，得到负数或一个数减去另一个数               | 10 - 20 = -10 |
| *      | 乘，两个数相乘或是返回一个被重复若干次的字符串 | 20 * 10 = 200 |
| /      | 除，*x* 除以 *y*                               | 20 / 10 = 2.0 |
| %      | 取模，返回除法的余数                           | 10 % 3 = 1    |
| //     | 取整除，向下取接近商的整数                     | 20 // 10 = 2  |
| **     | 幂，返回 *x* 的 *y* 次幂                       | 10 ** 2 = 100 |

除法 `/` 始终返回一个浮点数。要进行向下取整除法并获得整数结果，可以使用 `//` 运算符；要计算余数，可以使用 `%`。

### 特殊方法

一个类可以通过定义具有[特殊名称](https://docs.python.org/zh-cn/3/reference/datamodel.html#special-method-names)的方法来实现由特殊语法来发起调用的特定操作。这是 Python 实现*运算符重载*的方式，允许每个类自行定义基于该语言运算符的特定行为。

- [**\__getitem__**](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__getitem__)

  如果一个类定义了该方法，并且 `x` 是该类的一个实例，则 `x[i]` 基本就等价于 `type(x).__getitem__(x, i)`。
  
- [**\__iter__**](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__iter__)

  将一个特殊方法设为 `None` 表示对应的操作不可用。例如一个类将 `__iter__()` 设为 `None`，则该类就是不可迭代的，因此对其实例调用 `iter()` 将引发一个异常。

- [**\__init__**](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__init__)

  在实例通过 [`__new__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__new__) 创建之后，返回调用者之前调用。其参数与传递给类构造器表达式的参数相同。
  
  ```python
  object.__init__(self[, ...])
  ```

  一个基类如果有 `__init__()` 方法，其所派生的类如果也有 `__init__()` 方法，就必须显式地调用它以确保实例基类部分的正确初始化。
  
  ```python
  super().__init__([args...])
  ```

  因为对象是由 `__new__()` 和 `__init__()` 协作构造完成的，由 `__new__()` 创建，并由 `__init__()` 定制，所以 `__init__()` 返回的值只能是 `None`，否则会在运行时引发 [`TypeError`](https://docs.python.org/zh-cn/3/library/exceptions.html#TypeError)。

- [**\__repr__**](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__repr__)

  由 `repr()` 内置函数调用以输出一个对象的字符串表示。
  
  ```python
  object.__repr__(self)
  ```

### 表达式

[表达式](https://docs.python.org/zh-cn/3/reference/expressions.html)（Expression）是一个能够计算出一个值的代码片段。表达式可以由常量、变量、运算符、函数调用等组成，并且在求值时会生成一个具体的结果。

#### 算术转换

[算术转换](https://docs.python.org/zh-cn/3/reference/expressions.html#arithmetic-conversions)是指在算术运算过程中对不同类型的数据进行隐式或显式转换，以确保操作数兼容并生成预期结果的过程。算术转换通常涉及基本数据类型（如整数、浮点数等）之间的转换。

- 如果任一参数为复数，另一参数会被转换为复数；
- 否则，如果任一参数为浮点数，另一参数会被转换为浮点数；
- 否则，两者应该都为整数，不需要进行转换。

#### Lambda

[`lambda`](https://docs.python.org/zh-cn/3/reference/expressions.html#lambda) 表达式被用于创建匿名函数。

下列表达式会产生一个函数对象。

```python
lambda parameters: expression
```

该未命名对象的行为类似于用以下方式定义的函数。

```python
def <lambda>(parameters):
    return expression
```

## 三、函数和类

### 函数调用

所谓[调用](https://docs.python.org/zh-cn/3/reference/expressions.html#calls)就是附带可能为空的一系列参数来执行一个可调用对象（如函数）。

#### 位置参数

用于函数[调用](https://docs.python.org/zh-cn/3/reference/expressions.html#calls)，根据[函数定义](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#function-definitions)的参数位置来传递参数。

```python
def print_hello(name, sex):
    sex_dict = {1: u'先生', 2: u'女士'}
    print(
        'hello %s %s, welcome to python world!' % (name, sex_dict.get(sex))
    )

# 通过位置参数调用
print_hello('x', 1)
```

#### 关键字参数

用于函数[调用](https://docs.python.org/zh-cn/3/reference/expressions.html#calls)，通过键值对形式加以指定。可以让函数更加清晰、容易使用，同时也清除了参数的顺序需求。有位置参数时，位置参数必须在关键字参数的前面，但关键字参数之间不存在先后顺序。

以上一节函数为例，通过关键字参数调用。

```python
print_hello('x', sex=1)
print_hello(name='x', sex=1)
print_hello(sex=1, name='x')

# 错误的调用方式
print_hello(1, name='x')
print_hello(name='x', 1)
print_hello(sex=1, 'x')
```

#### 参数解包

如果存在比正式参数空位多的**位置参数**，将会引发 [`TypeError`](https://docs.python.org/zh-cn/3/library/exceptions.html#TypeError) 异常，除非有一个正式参数使用了 `*expression` 句法。在此情况下，该正式参数将接受一个包含了多余位置参数的元组，如果没有多余位置参数则为一个空元组。

如果函数[调用](https://docs.python.org/zh-cn/3/reference/expressions.html#calls)中出现了 `*expression` 句法，`expression` 必须求值为一个 `iterable`。来自该可迭代对象的元素会被当作是额外的位置参数。

`*expression` 句法可能出现于显式的关键字参数之后，但它会在关键字参数，以及任何 `**expression` 参数之前被处理。

```python
def f(a, b):
    print(a, b)

f(b=1, *(2,))
```

如果任何**关键字参数**没有与之对应的正式参数名称，将会引发 [`TypeError`](https://docs.python.org/zh-cn/3/library/exceptions.html#TypeError) 异常，除非有一个正式参数使用了 `**expression` 句法，该正式参数将接受一个包含了多余关键字参数的字典，如果没有多余关键字参数则为一个空字典。

如果函数[调用](https://docs.python.org/zh-cn/3/reference/expressions.html#calls)中出现了 `**expression` 句法，则 `expression` 必须求值为一个映射，其内容被视为额外的关键字参数。

```python
def f(a, b):
    print(a, b)

f(**{'a': 1, 'b': 2})
```

### 函数定义

[函数定义](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#function-definitions)是一条可执行语句。它执行时会在当前局部命名空间中将函数名称绑定到一个函数对象（函数可执行代码的包装器）。

这个函数对象包含对当前全局命名空间的引用，作为函数被调用时所使用的全局命名空间。

#### 默认形参

默认形参值会在执行函数定义时按从左至右的顺序被求值，这意味着当函数被定义时将对表达式求值一次，相同的*预计算*值将在每次调用时被使用。

例如，列表或字典等可变对象，如果函数修改了该对象，则实际上默认值也会被修改。

```python
def test(a=[]):
    a.append('test')
    print(a)

test()
test()
```

绕过此问题的一个方法是使用 `None` 作为默认值。

```python
def whats_on_the_telly(penguin=None):
    if penguin is None:
        penguin = []
    penguin.append("property of the zoo")
    return penguin

whats_on_the_telly()
whats_on_the_telly()
```

所有位置参数必须出现在默认参数前，包括[函数定义](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#function-definitions)和[调用](https://docs.python.org/zh-cn/3/reference/expressions.html#calls)。

```python
def print_hello(name, sex=1):
    pass
```

#### 位置参数

我们传进的额外的位置参数都会被 `args` 变量收集，它会根据传进参数的位置合并为一个元组，`args` 是元组类型。

```python
def func(*args):
    pass
```

在 `/` 之前的形参，都是仅限位置形参，因而只能通过位置参数传入。

#### 关键字参数

我们传进的额外的关键字参数都会被 `kargs` 变量收集，它会根据传进参数的关键字合并为一个字典，`kargs` 是字典类型。

```python
def func(**kargs):
    pass
```

在 `*` 或 `*identifier` 之后的形参，都是仅限关键字形参，因而只能通过关键字参数传入。

```python
def add(a, b, c, *, d):
    print(a, b, c, d)

add(1, 2, 3, d=4)
```

### 装饰器

一个函数定义可以被一个或多个 *decorator* 表达式所包装。

当函数被定义时将在包含该函数定义的作用域中对装饰器表达式求值。求值结果必须是一个可调用对象，它会以该函数对象作为唯一参数被发起调用。其返回值将被绑定到函数名称而非函数对象。

多个装饰器会以嵌套方式被应用：

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

#### 无参装饰器

装饰器可以有参数，也可以没有参数。

装饰器无需传参：

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

大致等价于：

```python
now = log(now)
```

可快速调用：

```python
log(now)()
```

#### 有参装饰器

装饰器需要参数：

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

和两层嵌套的 *decorator* 相比，三层嵌套的效果是这样的：

```python
now = log('execute')(now)
```

可快速调用：

```python
log('execute')(now)()
```

#### 函数签名

函数也是对象，它有 `__name__` 等属性，经过 *decorator* 装饰之后的函数，它们的 `__name__` 已经从原来的 `now` 变成了 `wrapper`。

因为返回的 `wrapper()` 函数名字就是 `wrapper`，所以，需要把原始函数的 `__name__` 等属性复制到 `wrapper()` 函数中，否则，有些依赖函数签名的代码执行就会出错。

不需要编写 `wrapper.__name__ = func.__name__` 这样的代码，Python 内置的 `functools.wraps` 就是解决这个问题的。

一个完整的 *decorator* 的写法如下：

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

### 类定义

[类定义](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#class-definitions)就是对类对象的定义。

类定义是一条可执行语句。其中继承列表通常给出基类的列表，列表中的每一项都应当被求值为一个允许子类的类对象。没有继承列表的类默认继承自基类 [`object`](https://docs.python.org/zh-cn/3/library/functions.html#object)。

因此：

```python
class Foo:
    pass
```

等价于：

```python
class Foo(object):
    pass
```

## 四、常用语句

### raise

如果没有提供表达式，则 [`raise`](https://docs.python.org/zh-cn/3/reference/simple_stmts.html#the-raise-statement) 会重新引发当前正在处理的异常，它也被称为活动的异常。如果当前没有活动的异常，则会引发 [`RuntimeError`](https://docs.python.org/zh-cn/3/library/exceptions.html#RuntimeError) 来提示发生了错误。

否则的话，[`raise`](https://docs.python.org/zh-cn/3/reference/simple_stmts.html#the-raise-statement) 会将第一个表达式求值为异常对象。它必须为 [`BaseException`](https://docs.python.org/zh-cn/3/library/exceptions.html#BaseException) 的子类或实例。如果它是一个类，当需要时会通过不带参数地实例化该类来获得异常的实例。

```python
raise KeyError('未找到对应的配置信息')
```

### assert

[`assert`](https://docs.python.org/zh-cn/3/reference/simple_stmts.html#the-assert-statement) 语句是在程序中插入调试性断言的简便方式。

简单形式 `assert expression` 等价于

```python
if __debug__:
    if not expression: raise AssertionError
```

扩展形式 `assert expression1, expression2` 等价于

```python
if __debug__:
    if not expression1: raise AssertionError(expression2)
```

