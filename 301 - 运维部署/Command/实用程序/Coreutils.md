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

## 二、文件系统

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

### 空间使用情况

[`stat`](https://www.gnu.org/software/coreutils/manual/html_node/stat-invocation.html) 命令用于显示文件或文件系统状态。

例如，查看文件详细信息。

```sh
stat file.txt
```

格式化输出：可以使用 `-c` 选项（或 `--format`）指定格式。

```sh
stat -c "Size: %s, Inode: %i, Permissions: %A" file.txt
```

例如，查看文件系统信息。

```sh
stat -f /
```

## 三、文件属性

### 所有者和组

[`chown`](https://www.gnu.org/software/coreutils/manual/html_node/chown-invocation.html) 是一个用于更改文件或目录的所有者和所属组的命令。

**常用选项：**

- -**R**：递归更改目录下的所有文件和子目录。

例如，更改文件的所有者。

```sh
chown alice file.txt
```

例如，更改文件的所有者和所属组。

```sh
chown new_owner:new_group file.txt
```

## 四、用户信息

### 打印用户身份

[`id`](https://www.gnu.org/software/coreutils/manual/html_node/id-invocation.html) 命令用于查询当前用户或指定用户的 UID、GID 以及所属组信息。

**常用选项：**

- -**u**：显示用户的 UID。
- -**g**：显示用户的 GID。
- -**G**：显示用户所属的所有组的 GID。
- -**n**：以名称形式显示信息（与 `-u`、`-g` 或 `-G` 一起使用）。

例如，查看当前用户的 ID 信息。

```sh
id
```

例如，查看指定用户的 ID 信息。

```sh
id alice
```

[`groups`](https://www.gnu.org/software/coreutils/manual/html_node/groups-invocation.html) 命令用于显示当前用户所属的用户组，或者显示指定用户所属的用户组。

```sh
groups [username]
```

## 五、命令调用

### 忽略挂起信号

[`nohup`](https://www.gnu.org/software/coreutils/manual/html_node/nohup-invocation.html) 命令用于在用户注销或终端关闭后，继续运行某个命令或程序。它的作用是防止进程因为挂起信号（SIGHUP）而被终止。

默认情况下，如果一个进程的父终端被关闭（例如用户注销或终端被关闭），系统会发送一个挂起信号（SIGHUP）给该终端启动的所有进程，导致它们被终止。而通过使用 `nohup` 命令，可以让这些进程忽略挂起信号，从而继续运行。

例如，运行一个程序并忽略挂起信号。

```sh
nohup python my_script.py &
```

默认情况下，`nohup` 会将命令的标准输出和标准错误重定向到 `nohup.out` 文件（如果没有指定其他输出文件）。可以通过查看该文件来检查程序的输出。

如果不想使用默认的 `nohup.out` 文件，可以手动重定向输出。

```sh
nohup python my_script.py > my_output.log 2>&1 &
nohup command </dev/null >/dev/null 2>&1 &
```

在命令后加 `&` 只是将进程放入后台运行，但如果终端关闭，进程仍然会被挂起或终止。

结合 `nohup` 和 `&` 使用，可以确保后台进程在终端关闭后继续运行。

