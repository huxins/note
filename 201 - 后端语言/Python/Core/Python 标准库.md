# Python 标准库

Python [标准库](https://docs.python.org/zh-cn/3/library/index.html)非常庞大，所提供的组件涉及范围十分广泛。

## 一、系统交互

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

#### re

[`re`](https://docs.python.org/zh-cn/3/library/re.html) 模块提供了与 Perl 语言类似的正则表达式匹配操作。

静态方法：

- re.[**sub**](https://docs.python.org/zh-cn/3/library/re.html#re.sub)(*pattern*, *repl*, *string*, *count*=0, *flags*=0)

  返回通过使用 *repl* 替换在 *string* 中出现的 *pattern* 而获得的字符串。`count` 是可选参数，表示最多替换的次数，默认值为 0，表示替换所有匹配项。

  例如，替换掉所有的 HTML 标签。
  
  ```python
  re.sub(r'<.*?>', '', time_str)
  ```
  
- re.[**search**](https://docs.python.org/zh-cn/3/library/re.html#re.search)(*pattern*, *string*, *flags*=0)

  扫描整个 *string*，查找正则表达式 *pattern* 产生匹配的第一个位置，并返回相应的 [`Match`](https://docs.python.org/zh-cn/3/library/re.html#re.Match)。

  例如，判断字符串中，是否存在中文。

  ```python
  if re.search(r'[\u4e00-\u9fff]', times_raw):
      times_raw = ""
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
  
- datetime.**replace**(*year*=*self.year*, *month*=*self.month*, *day*=*self.day*, *hour*=*self.hour*, *minute*=*self.minute*, *second*=*self.second*, *microsecond*=*self.microsecond*, *tzinfo*=*self.tzinfo*, *, *fold*=0)

  返回一个具有同样属性值的 `datetime`，除非通过任何关键字参数为某些属性指定了新值。

##### timedelta

[`timedelta`](https://docs.python.org/zh-cn/3/library/datetime.html#timedelta-objects) 对象表示一段持续的时间，即两个 [`datetime`](https://docs.python.org/zh-cn/3/library/datetime.html#datetime.datetime) 或 [`date`](https://docs.python.org/zh-cn/3/library/datetime.html#datetime.date) 实例之间的差值。

```python
class datetime.timedelta(days=0, seconds=0, microseconds=0, milliseconds=0, minutes=0, hours=0, weeks=0)
```

获取上一天的时间日期。

```python
from datetime import datetime, timedelta

now = datetime.today()
last_day = now - timedelta(days=1)

print("当前日期:", now.strftime("%Y-%m-%d"))
print("昨日日期:", last_day.strftime("%Y-%m-%d"))
```

#### calendar

[`calendar`](https://docs.python.org/zh-cn/3/library/calendar.html) 模块提供了与日历相关的实用函数。

静态方法：

- calendar.**monthrange**(*year*, *month*)

  返回指定年份的指定月份的第一天是星期几和这个月的天数。

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

##### 文本

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

##### 二进制

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

#### logging

[`logging`](https://docs.python.org/zh-cn/3/library/logging.html) 模块实现了灵活的事件日志系统的函数与类。

```python
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

logger.info("登录请求成功")
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

### 互联网数据处理

#### json

[`json`](https://docs.python.org/zh-cn/3/library/json.html) 模块是用于处理 JSON 数据的标准库。

使用 [`json.dumps()`](https://docs.python.org/zh-cn/3/library/json.html#json.dumps) 方法，可以序列化 Python 对象为 JSON 字符串。

```python
import json

data = {"name": "Alice", "age": 25, "is_student": False}
json_str = json.dumps(data)
print(json_str)
```

使用 [`json.loads()`](https://docs.python.org/zh-cn/3/library/json.html#json.loads) 方法，可以反序列化 JSON 字符串为 Python 对象。

```python
import json

json_str = '{"name": "Alice", "age": 25, "is_student": false}'
data = json.loads(json_str)
print(data)
```

