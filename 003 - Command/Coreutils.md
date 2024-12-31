# Coreutils

[Coreutils](https://www.gnu.org/software/coreutils/manual/html_node/index.html) 是 GNU 项目的一部分，全称是 GNU Core Utilities，它提供了一个集合，包含许多基本的命令行工具，用于文件操作、文本处理和系统管理等任务。这些工具是 Linux 系统的核心组成部分，几乎每个 Linux 发行版都会包含 Coreutils。

## 一、文本处理

### 替换字符

[**`tr`**](https://www.gnu.org/software/coreutils/manual/html_node/tr-invocation.html) 命令用于替换或删除文本中的字符。它常用于文本处理任务，比如大小写转换、字符替换或删除等操作。

```sh
tr [选项] 集合1 [集合2]
```

**常用选项：**

- -**d**：删除*集合1*中的字符。

例如，将 CRLF 转为 LF。

```sh
cat -v test.txt | tr -d "^M"
```

### 打印文本

[**`cat`**](https://www.gnu.org/software/coreutils/manual/html_node/cat-invocation.html) 命令主要用于查看文件内容、将多个文件合并输出以及创建或追加文件内容。

**功能：**

- **显示文件内容**。
- **连接多个文件**并输出到终端或另一个文件。
- **创建新文件**并写入内容。
- **追加文件内容**。

**常用选项：**

- -**n**：对输出的每一行编号。
- -**b**：对非空行编号（空行不编号）。
- -**s**：压缩连续的空行。
- -**E**：在每行的末尾显示 `$`，用于标识行尾。
- -**T**：将制表符显示为 `^I`。
- -**v**：显示不可见字符。

例如，显示不可见字符。

```sh
echo -e $'line1\r\nline2' | cat -v
```

[**`echo`**](https://www.gnu.org/software/coreutils/manual/html_node/echo-invocation.html) 是一个用于打印文本或变量值到终端的命令，属于最基本和常用的 Shell 工具之一。

**常用选项：**

- -**n**：不输出最后的换行符。
- -**e**：启用转义字符（例如 `\n`, `\t`）。
- -**E**：禁用转义字符（这是默认行为）。

```sh
echo "Hello, World!"         # 输出普通字符串
echo -n "No newline here"    # 输出后不换行
echo -e "Line1\nLine2"       # 输出包含换行的字符串
```

`echo` 是 **POSIX 标准** 的一部分，因此在大多数 Unix 和类 Unix 操作系统（如 Linux、macOS、BSD 等）中都有实现。它有两种主要的实现来源：

- **Shell 内建命令**：在大多数 Shell 中，[`echo`](https://www.gnu.org/software/bash/manual/html_node/Bash-Builtins.html#index-echo) 是一个内建命令，直接由 Shell 解析和执行。
- **外部命令**：在 Linux 系统中，[`echo`](https://www.gnu.org/software/coreutils/manual/html_node/echo-invocation.html) 也可以是来自 GNU Coreutils 的一个独立二进制程序。

## 二、文件操作

### 调整文件大小

[**`truncate`**](https://www.gnu.org/software/coreutils/manual/html_node/truncate-invocation.html) 命令用于调整文件的大小。它可以创建新文件或修改现有文件的大小，通过截断（缩短）或扩展（填充）文件来实现。

**功能：**

- **缩短文件**：将文件的大小减少到指定字节数，多余的内容会被删除。
- **扩展文件**：将文件的大小增加到指定字节数，新增的部分会填充为空字节（`\0`）。

**常用选项：**

- -**s** *size*：根据 *size* 设置或调整每个文件的大小。

  `SIZE` 可以用数字加单位的形式表示：

  - **无单位**：字节数（默认）。
  - **k** 或 **K**：千字节（1024 字节）。
  - **M**：兆字节（1024² 字节）。
  - **G**：吉字节（1024³ 字节）。

例如，清空文件的内容。

```sh
truncate -s 0 filename
```

