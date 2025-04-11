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

一个类可以通过定义具有[特殊名称的方法](https://docs.python.org/zh-cn/3/reference/datamodel.html#special-method-names)来实现由特殊语法来发起调用的特定操作。

这是 Python 实现*运算符重载*的方式，允许每个类自行定义基于该语言运算符的特定行为。举例来说，如果一个类定义了名为 `__getitem__()` 的方法，并且 `x` 是该类的一个实例，则 `x[i]` 基本就等价于 `type(x).__getitem__(x, i)`。

将一个特殊方法设为 `None` 表示对应的操作不可用。例如，如果一个类将 `__iter__()` 设为 `None`，则该类就是不可迭代的，因此对其实例调用 `iter()` 将引发一个异常。

在实现模拟任何内置类型的类时，很重要的一点是模拟的实现程度对于被模拟对象来说应当是有意义的。例如，提取单个元素的操作对于某些序列来说是适宜的，但提取切片可能就没有意义。

#### 对象初始化

[`__init__`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__init__) 在实例通过 `__new__()` 创建之后，返回调用者之前调用。其参数与传递给类构造器表达式的参数相同。

```python
object.__init__(self[, ...])
```

一个基类如果有 `__init__()` 方法，其所派生的类如果也有 `__init__()` 方法，就必须显式地调用它以确保实例基类部分的正确初始化。

```python
super().__init__([args...])
```

因为对象是由 `__new__()` 和 `__init__()` 协作构造完成的，由 `__new__()` 创建，并由 `__init__()` 定制，所以 `__init__()` 返回的值只能是 `None`，否则会在运行时引发 [`TypeError`](https://docs.python.org/zh-cn/3/library/exceptions.html#TypeError)。

#### 字符串表示

[`__repr__`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__repr__) 由 `repr()` 内置函数调用以输出一个对象的字符串表示。

```python
object.__repr__(self)
```

#### 上下文管理器

[*上下文管理器*](https://docs.python.org/zh-cn/3.10/library/stdtypes.html#context-manager-types)是一个对象，它定义了在执行 `with` 语句时要建立的运行时上下文。

[上下文管理器](https://docs.python.org/zh-cn/3/reference/datamodel.html#with-statement-context-managers)处理进入和退出所需运行时上下文，以执行代码块。通常使用 `with` 语句，但是也可以通过直接调用它们的方法来使用。

上下文管理器的典型用法包括保存和恢复各种全局状态，锁定和解锁资源，关闭打开的文件等等。

- object.**\__enter__**(*self*)

  [进入](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__enter__)与此对象相关的运行时上下文。`with` 语句将会绑定这个方法的返回值到 `as` 子句中指定的目标，如果有的话。

- object.**\__exit__**(*self*, *exc_type*, *exc_value*, *traceback*)

  [退出](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__exit__)关联到此对象的运行时上下文。各个参数描述了导致上下文退出的异常。如果上下文是无异常地退出的，三个参数都将为 `None`。

  如果提供了异常，并且希望方法屏蔽此异常，则应当返回真值。否则的话，异常将在退出此方法时按正常流程处理。

  请注意 `__exit__()` 方法不应该重新引发被传入的异常，这是调用者的责任。

## 三、导入系统

一个 *module* 内的 Python 代码通过 *importing* 操作就能够访问另一个模块内的代码。

[`import`](https://docs.python.org/zh-cn/3/reference/simple_stmts.html#import) 语句是发起调用[导入机制](https://docs.python.org/zh-cn/3/reference/import.html)的最常用方式，但不是唯一的方式。[`importlib.import_module()`](https://docs.python.org/zh-cn/3/library/importlib.html#importlib.import_module) 以及内置的 [`__import__()`](https://docs.python.org/zh-cn/3/library/functions.html#import__) 等函数也可以被用来发起调用导入机制。

[`import`](https://docs.python.org/zh-cn/3/reference/simple_stmts.html#import) 语句结合了两个操作：

```
1、搜索指定名称的模块。
2、然后将搜索结果绑定到当前作用域中的名称。
```

[`import`](https://docs.python.org/zh-cn/3/reference/simple_stmts.html#import) 语句的搜索操作被定义为对 [`__import__()`](https://docs.python.org/zh-cn/3/library/functions.html#import__) 函数的调用并带有适当的参数。[`__import__()`](https://docs.python.org/zh-cn/3/library/functions.html#import__) 的返回值会被用于执行 `import` 语句的名称绑定操作。

对 [`__import__()`](https://docs.python.org/zh-cn/3/library/functions.html#import__) 的直接调用将仅执行模块搜索，如果找到，则执行模块创建操作。只有 [`import`](https://docs.python.org/zh-cn/3/reference/simple_stmts.html#import) 语句会执行名称绑定操作。

当一个模块首次被导入时，Python 会搜索该模块，如果找到就创建一个 *module* 对象并初始化它。如果指定名称的模块未找到，则会引发 [`ModuleNotFoundError`](https://docs.python.org/zh-cn/3/library/exceptions.html#ModuleNotFoundError)。

当发起调用导入机制时，Python 会实现多种策略来搜索指定名称的模块。这些策略可以通过使用下文所描述的多种钩子来加以修改和扩展。

### importlib

[`importlib`](https://docs.python.org/zh-cn/3/library/importlib.html#module-importlib) 模块提供了丰富的 API 用来与导入系统进行交互。

例如 [`importlib.import_module()`](https://docs.python.org/zh-cn/3/library/importlib.html#importlib.import_module) 提供了相比内置的 [`__import__()`](https://docs.python.org/zh-cn/3/library/functions.html#import__) 更推荐、更简单的 API 用来发起调用导入机制。

### 包

Python 只有一种模块对象类型，所有模块都属于该类型，无论模块是用 Python、C 还是别的语言实现。为了帮助组织模块并提供名称层次结构，Python 还引入了[包](https://docs.python.org/zh-cn/3/reference/import.html#packages)的概念。

可以把包看成是文件系统中的目录，并把模块看成是目录中的文件。与文件系统一样，包通过层次结构进行组织，在包之内除了一般的模块，还可以有**子包**。

所有**包都是模块**，但并非所有模块都是包。或者换句话说，包只是一种特殊的模块。特别地，任何具有 `__path__` 属性的模块都会被当作是包。

所有模块都有自己的名字。子包名与其父包名会以点号分隔，与 Python 的标准属性访问语法一致。因此你可能会有一个名为 `email` 的包，这个包中又有一个名为 `email.mime` 的子包，以及该子包中的名为 `email.mime.text` 的子包。

[常规包](https://docs.python.org/zh-cn/3/reference/import.html#regular-packages)是传统的包类型。常规包通常以一个包含 `__init__.py` 文件的目录形式实现。当一个常规包被导入时，这个 `__init__.py` 文件会隐式地被执行，它所定义的对象会被绑定到该包命名空间中的名称。

`__init__.py` 文件可以包含与任何其他模块中所包含的 Python 代码相似的代码，Python 将在模块被导入时为其添加额外的属性。

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

## 四、表达式

[表达式](https://docs.python.org/zh-cn/3/reference/expressions.html)（Expression）是一个能够计算出一个值的代码片段。表达式可以由常量、变量、运算符、函数调用等组成，并且在求值时会生成一个具体的结果。

### 算术转换

[算术转换](https://docs.python.org/zh-cn/3/reference/expressions.html#arithmetic-conversions)是指在算术运算过程中对不同类型的数据进行隐式或显式转换，以确保操作数兼容并生成预期结果的过程。算术转换通常涉及基本数据类型（如整数、浮点数等）之间的转换。

- 如果任一参数为复数，另一参数会被转换为复数；
- 否则，如果任一参数为浮点数，另一参数会被转换为浮点数；
- 否则，两者应该都为整数，不需要进行转换。

### 函数调用

所谓[调用](https://docs.python.org/zh-cn/3/reference/expressions.html#calls)就是附带可能为空的一系列参数来执行一个可调用对象（如函数）。

#### 位置参数

用于函数[调用](https://docs.python.org/zh-cn/3/reference/expressions.html#calls)，根据[函数定义](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#function-definitions)的参数位置来传递参数。

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

#### 关键字参数

用于函数[调用](https://docs.python.org/zh-cn/3/reference/expressions.html#calls)，通过键值对形式加以指定。可以让函数更加清晰、容易使用，同时也清除了参数的顺序需求。

有位置参数时，位置参数必须在关键字参数的前面，但关键字参数之间不存在先后顺序。

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

#### 解包

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

### lambda

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

## 五、简单语句

[简单语句](https://docs.python.org/zh-cn/3/reference/simple_stmts.html)由一个单独的逻辑行构成。多条简单语句可以存在于同一行内并以分号分隔。

### 赋值语句

[赋值语句](https://docs.python.org/zh-cn/3/reference/simple_stmts.html#assignment-statements)用于将名称（重）绑定到特定值，以及修改属性或可变对象的成员项。

赋值的左手边与右手边是同时进行的，例如 `a, b = b, a` 会交换两个变量的值。但在赋值给变量的多项集之内的重叠是从左至右进行的。

```python
x = [0, 1]
i = 0
i, x[i] = 1, 2
print(x)
```

### raise

如果没有提供表达式，则 [`raise`](https://docs.python.org/zh-cn/3/reference/simple_stmts.html#the-raise-statement) 会重新引发当前正在处理的异常，它也被称为活动的异常。如果当前没有活动的异常，则会引发 [`RuntimeError`](https://docs.python.org/zh-cn/3/library/exceptions.html#RuntimeError) 来提示发生了错误。

否则的话，[`raise`](https://docs.python.org/zh-cn/3/reference/simple_stmts.html#the-raise-statement) 会将第一个表达式求值为异常对象。它必须为 [`BaseException`](https://docs.python.org/zh-cn/3/library/exceptions.html#BaseException) 的子类或实例。如果它是一个类，当需要时会通过不带参数地实例化该类来获得异常的实例。

```python
raise KeyError('未找到对应的配置信息')
```

### import

基本的 [`import`](https://docs.python.org/zh-cn/3/reference/simple_stmts.html#the-import-statement) 语句会分两步执行：

```
1、查找一个模块，如果有必要还会加载并初始化模块。
2、在局部命名空间中，为 import 语句发生位置所处的作用域，定义一个或多个名称。
```

当语句包含多个子句时，这两个步骤将对每个子句分别执行，如同这些子句被分成独立的 `import` 语句一样。

[`from`](https://docs.python.org/zh-cn/3/reference/simple_stmts.html#index-36) 形式使用的过程略微繁复一些：

```
1、查找 from 子句中指定的模块，如有必要还会加载并初始化模块。
2、对于 import 子句中指定的每个标识符：
    1、检查被导入模块是否有该名称的属性。
    2、如果没有，尝试导入具有该名称的子模块，然后再次检查被导入模块是否有该属性。
    3、如果未找到该属性，则引发 ImportError。
    4、否则的话，将对该值的引用存入局部命名空间，如果有 as 子句则使用其指定的名称，否则使用该属性的名称。
```

如果标识符列表改为一个星号 `*`，则在模块中定义的全部**公有名称**都将按 `import` 语句所在的作用域被绑定到局部命名空间。

```python
from module import *
```

- **公有名称**：公有名称是指在模块中可以被外部直接访问和使用的名称（如函数、类、变量等）。
- **私有名称**：私有名称通常以下划线 `_` 开头，表示这些名称是模块的内部实现细节，不建议外部访问。

一个模块所定义的**公有名称**，是由在模块的命名空间中检测一个名为 `__all__` 的变量来确定的；如果有定义，它必须是一个字符串列表，其中的项为该模块所定义或导入的名称。

当使用 `from module import *` 语句时，只有 `__all__` 列表中的名称会被导入。

如果没有定义 `__all__`，Python 会默认将所有不以下划线 `_` 开头的名称视为公有名称。

```python
from . import views

__all__ = ["views"]
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

## 六、复合语句

[复合语句](https://docs.python.org/zh-cn/3/reference/compound_stmts.html)是包含其它语句的语句，它们会以某种方式影响或控制所包含其它语句的执行。

### with

[`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#the-with-statement) 语句用于包装带有使用[上下文管理器](https://docs.python.org/zh-cn/3/reference/datamodel.html#context-managers)定义的方法的代码块的执行。这允许对普通的 [`try`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#try)...[`except`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#except)...[`finally`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#finally) 使用模式进行封装以方便地重用。

[`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#with) 语句的执行过程如下：

```
1、对上下文表达式进行求值来获得上下文管理器。
2、载入上下文管理器的 __enter__() 以便后续使用。
3、载入上下文管理器的 __exit__() 以便后续使用。
4、发起调用上下文管理器的 __enter__() 方法。
5、如果 with 语句中包含一个目标，来自 __enter__() 的返回值将被赋值给它。
6、执行语句体。
7、发起调用上下文管理器的 __exit__() 方法。
    如果语句体的退出是由异常导致的，则其类型、值和回溯信息将被作为参数传递给 __exit__()。否则的话，将提供三个 None 参数。
    如果语句体的退出是由异常导致的，并且来自 __exit__() 方法的返回值为假，则该异常会被重新引发。如果返回值为真，则该异常会被抑制，并会继续执行 with 语句之后的语句。
    如果语句体由于异常以外的任何原因退出，则来自 __exit__() 的返回值会被忽略，并会在该类退出正常的发生位置继续执行。
```

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

如果有多个项目，则会视作存在多个 [`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#with) 语句嵌套来处理多个上下文管理器：

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

也可以用圆括号包围的多行形式的多项目上下文管理器：

```python
with (
    A() as a,
    B() as b,
):
    SUITE
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

#### 装饰器

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

##### 无参装饰器

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

##### 有参装饰器

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

##### 函数签名

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

