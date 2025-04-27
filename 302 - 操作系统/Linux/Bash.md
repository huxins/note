# Bash

[Bash](https://www.gnu.org/software/bash/)（Bourne Again Shell）是一种广泛使用的 Linux 命令行解释器和脚本语言，提供强大的命令执行、脚本编写和系统管理功能，兼具交互式和编程式操作能力。

## 一、命令

### 简单命令

[Simple Commands](https://www.gnu.org/software/bash/manual/html_node/Simple-Commands.html) 是最常见的命令类型。它是一个由空格分隔的单词序列，由 Shell 的一个[控制操作符](https://www.gnu.org/software/bash/manual/html_node/Definitions.html#index-control-operator)终止。第一个单词通常指定要执行的命令，其余单词是该命令的参数。

```sh
date +'%Y-%m-%d %T'
```

#### 简单命令扩展

当执行一个[简单命令](https://www.gnu.org/software/bash/manual/html_node/Simple-Command-Expansion.html)时，Shell 从左到右按以下顺序执行以下扩展、赋值和重定向。

- 命令名之前的变量赋值将被保存，以供以后处理。
- Shell Expansions。
- 命令名之前的变量赋值。

变量将添加到执行命令的环境中，不会影响当前的 Shell 环境，即设置当前执行命令中的临时环境变量。

```sh
v=var echo $v
```

由于命令替换的原因，`echo $v` 的执行会在变量赋值之前发生，从而导致 `$v` 的值在赋值时仍为空。

具体过程如下。

```
1、命令替换，$v 为空，命令结果为 echo。
2、命令名之前的变量赋值，执行 v=var。
3、执行命令结果，即执行 echo。
```

#### 命令执行环境

Shell 有一个[执行环境](https://www.gnu.org/software/bash/manual/html_node/Command-Execution-Environment.html)，它由以下部分组成：

- **当前工作目录**：使用命令 `cd`、`pushd` 或 `popd` 设置，或 Shell 启动时继承的目录。
- **文件创建模式掩码**：使用 `umask` 命令设置，或从父进程继承。
- **当前信号捕获**：通过 `trap` 命令设置。
- **Shell 参数**：通过变量赋值设置，或使用 `set` 命令设置，或从父进程继承。
- **Shell 函数**：执行时定义的函数，或从父进程继承的函数。
- **启用的选项**：调用时默认启用或通过命令行参数指定，或使用 `set` 命令启用。
- **Shell 别名**：使用 `alias` 命令定义。
- **各类进程 ID**：包括后台作业的进程 ID、当前 Shell 的 PID 和父进程的 PID。

当一个程序被调用时，它会获得一个名为 [*environment*](https://www.gnu.org/software/bash/manual/html_node/Environment.html) 的字符串数组。这是一个以 `name=value` 形式表示的键值对列表。

下面这些赋值语句只影响该命令所看到的 Environment，不会影响当前的 Shell Environment。

例如，设置临时环境变量。

```sh
CITY=Shanghai env | grep CITY
```

例如，输出指定时区的日期。

```sh
TZ=':Asia/Tokyo' date +'%Y-%m-%d %T'
```

当要执行除内置函数或 Shell 函数之外的简单命令时，会在由以下内容组成的单独执行环境中调用该命令。

- 标记为 `export` 的 Shell 变量和函数。

  ```sh
  export CITY=Shanghai; env | grep CITY
  ```

### 复合命令

在 Shell 编程中，[复合命令](https://www.gnu.org/software/bash/manual/html_node/Compound-Commands.html)是由[保留字](https://www.gnu.org/software/bash/manual/html_node/Definitions.html#index-reserved-word)或[控制操作符](https://www.gnu.org/software/bash/manual/html_node/Definitions.html#index-control-operator)定义的语言结构。每个复合命令结构以一个保留字或控制操作符开始，并由对应的保留字或操作符结束。

此外，任何与复合命令关联的[重定向](https://www.gnu.org/software/bash/manual/html_node/Redirections.html)会应用于该复合命令中的所有子命令，除非这些重定向被显式覆盖。

常见的复合命令包括：

- [循环结构](https://www.gnu.org/software/bash/manual/html_node/Looping-Constructs.html)：如 `for`、`while`、`until` 等。
- [条件结构](https://www.gnu.org/software/bash/manual/html_node/Conditional-Constructs.html)：如 `if` 和 `case`。
- [分组命令](https://www.gnu.org/software/bash/manual/html_node/Command-Grouping.html)：使用 `{}` 或 `()` 进行命令分组。

这些结构允许在 Shell 脚本中实现复杂的逻辑控制和命令流管理。

#### 条件构造

[`if`](https://www.gnu.org/software/bash/manual/html_node/Conditional-Constructs.html#index-if) 命令的语法如下。

```sh
if test-commands; then
  consequent-commands;
fi
```

##### 测试命令

在 Bash 中，`[]` 用于 [*test*](https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html#index-test) 条件。它是 [*test*](https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html#index-test) 表达式的一种方法，也被称为 [*test*](https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html#index-test) 命令。

```sh
if [ -z "${MINIO_VOLUMES}" ]; then
  echo 'Variable MINIO_VOLUMES not set in /etc/default/minio';
fi
```

##### 条件表达式

[条件表达式](https://www.gnu.org/software/bash/manual/html_node/Bash-Conditional-Expressions.html)由 `[[` [命令](https://www.gnu.org/software/bash/manual/html_node/Conditional-Constructs.html#index-_005b_005b)和 `[` [命令](https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html#index-test)使用。

- -**z** *string*：如果字符串的长度为零，则为 True。
- -**n** *string*：如果字符串的长度非零，则为 True。

## 二、扩展

在 Shell 中，[Expansions](https://www.gnu.org/software/bash/manual/html_node/Shell-Expansions.html) 是指 Shell 在执行命令之前，对输入命令中的某些特定模式或符号进行替换或处理的过程。

常见的 Shell 扩展包括：

- 大括号扩展（Brace Expansion）
- 波浪号扩展（Tilde Expansion）
- 参数和变量扩展（Parameter and Variable Expansion）
- 命令替换（Command Substitution）
- 算术扩展（Arithmetic Expansion）
- 单词分割（Word Splitting）
- 文件名扩展（Filename Expansion）

这些扩展是 Shell 在处理命令之前完成的预处理操作，可以让命令更加简洁高效。

### 参数扩展

Bash 将 `$` 开头的词视为变量，将其[扩展](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html)成变量值。`${}` 是可选的，可以用于明确标识变量名的边界，以防止歧义。

```sh
NAME="Alice"
echo "Hello, ${NAME}"!

# 将参数值中的反斜杠转义序列按 $'...' 引用机制展开
str='line1\r\nline2'
echo "${str@E}"
echo $'line1\r\nline2'
```

### 命令替换

[命令替换](https://www.gnu.org/software/bash/manual/html_node/Command-Substitution.html)允许命令的输出替换命令本身。

```sh
current_date=$(date +'%Y-%m-%d %T')
echo "当前日期是：$current_date"
```

### 进程替换

[进程替换](https://www.gnu.org/software/bash/manual/html_node/Process-Substitution.html)允许通过文件名引用进程的输入或输出。

```sh
cat <(tree -h)
```

## 三、重定向

在执行命令之前，Shell 可以使用特殊的符号对命令的输入和输出进行[重定向](https://www.gnu.org/software/bash/manual/html_node/Redirections.html)。重定向允许对命令的文件句柄进行复制、打开、关闭、重新指向不同的文件，从而改变命令读取和写入的目标文件。

此外，重定向还可以用于修改当前 Shell 执行环境中的文件句柄。这些重定向操作符可以出现在简单命令的前面、命令内部的任意位置，或者紧随命令之后。

重定向的处理顺序是从左到右，按照它们在命令中出现的顺序依次执行。

常见重定向操作符包括：

- **输入重定向**：`<`
- **输出重定向**：`>`
- **追加重定向**：`>>`
- **错误重定向**：`2>`
- **将文件描述符合并**：`&>`
- **空设备重定向**：`>/dev/null`

通过重定向，Shell 可以灵活地控制命令的输入来源和输出目标。

### 文件描述符

[文件描述符](https://zh.wikipedia.org/wiki/%E6%96%87%E4%BB%B6%E6%8F%8F%E8%BF%B0%E7%AC%A6)是内核为了高效管理已经被打开的文件所创建的索引，是一个非负整数，用于指代被打开的文件，所有执行 I/O 操作的系统调用都通过文件描述符来实现。

同时还规定 `0` 是标准输入，`1` 是标准输出，`2` 是标准错误。这意味着如果此时去打开一个新的文件，它的文件描述符会是 `3`；再打开一个文件，文件描述符就是 `4`。

| 整数值 | 名称     | 文件流   |
| ------ | -------- | -------- |
| `0`    | 标准输入 | `stdin`  |
| `1`    | 标准输出 | `stdout` |
| `2`    | 标准错误 | `stderr` |

### 重定向输出

将[输出重定向](https://www.gnu.org/software/bash/manual/html_node/Redirections.html#Redirecting-Output)到文件。

```sh
echo "Hello, World"! > output.txt
```

将输出以追加的方式重定向到文件。

```sh
echo "Hello, World"! >> output.txt
```

`[n]>` 表示将文件描述符为 `n` 的流重定向到文件。

```sh
cat non_existent_file.txt 2> error.log
```

将标准输出和标准错误重定向到文件。有三种格式，语义上是等同的。

```sh
cat non_existent_file.txt &> all.log
cat non_existent_file.txt >& all.log
echo log.txt > /dev/null 2>&1
```

### 重定向输入

将[输入重定向](https://www.gnu.org/software/bash/manual/html_node/Redirections.html#Redirecting-Input)到文件。

```sh
cat < output.txt
```

### Here Documents

在 Shell 中，[Here Documents](https://www.gnu.org/software/bash/manual/html_node/Redirections.html#Here-Documents) 是一种多行输入重定向方式，用于将一段文字作为输入传递给命令。

语法如下：

```sh
command <<EOF
多行内容
EOF
```

例如，从当前源读取输入，读取的所有行都用作命令的标准输入。

```sh
cat <<-EOF > output.txt
Line 1
Line 2
Line 3
EOF
```

## 四、启动文件

Bash [启动文件](https://www.gnu.org/software/bash/manual/html_node/Bash-Startup-Files.html)是 Bash 在启动时自动执行的配置文件，用于初始化 Shell 环境。这些文件的加载顺序和作用取决于 Bash 的启动模式：交互式登录 Shell、交互式非登录 Shell 或 非交互式 Shell。

### 交互式

交互式（Interactive）和非交互式（Non-Interactive）是两种不同的用户界面模式。

- **非交互式 Shell**

  非交互式 Shell 用于执行脚本，如果设置了 [`BASH_ENV`](https://www.gnu.org/software/bash/manual/html_node/Bash-Startup-Files.html#Invoked-non_002dinteractively) 环境变量，则加载其指定的文件。

  ```sh
  bash myscript.sh
  ```

- **交互式 Shell**

  ```sh
  echo "Hello, World"!
  ```

以下是一个在 Bash 脚本中判断当前 Shell 是否交互式的示例。

```sh
#!/bin/bash

if [ -n "$PS1" ]; then
  echo "当前是交互式 Shell"
else
  echo "当前是非交互式 Shell"
fi
```

### 登录式

登录式（login shell）和非登录式（non-login shell）是两种不同的交互式 Shell 启动方式。

- **登录式 Shell**

  当用户登录到系统时，系统会启动一个登录式 Shell，会加载以下文件：

  - `/etc/profile`：系统范围的配置文件，适用于所有用户。
  - `~/.bash_profile`、`~/.bash_login` 或 `~/.profile`：用户特定的配置文件，按顺序查找并加载第一个找到的文件。

  当 Bash 会话结束时，会执行：

  - `~/.bash_logout`：用户退出时运行的命令，可用于清理任务。

- **非登录式 Shell**

  在已经登录的环境中启动新的 Shell（如运行 `bash` 命令），或者通过执行脚本来启动 Shell 时，通常会得到一个非登录式 Shell。

  非登录式 Shell 不会执行用户的登录配置文件，而是执行其他配置文件。
  
  - `/etc/bash.bashrc`：系统范围的配置文件。
  - `~/.bashrc`：用户特定的配置文件。

可以通过查看 `$0` 环境变量的值来确定当前 Shell 是否为登录式或非登录式。如果 `$0` 的值以 `-` 开头，通常表示登录式 Shell。

非交互式非登录式 Shell 的典型用例如下。

```sh
bash myscript.sh
```

## 五、内置命令

以下 Shell [内建命令](https://www.gnu.org/software/bash/manual/html_node/Shell-Builtin-Commands.html)是从 Bourne Shell 继承而来的，并按照 POSIX 标准进行了实现。这些命令是 Shell 自带的功能，不需要外部程序支持，因此执行效率更高。

### 符号

- **`:`**

  [`:`](https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html#index-_003a) 为空命令，返回成功状态。除了扩展参数和执行重定向之外，什么都不做。

- **`.`**

  [`.`](https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html#index-_002e) 为执行指定文件中的命令，通常用于加载脚本。

  ```sh
  . ./myscript.sh
  ```

### 结构

- **`break`**

  [`break`](https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html#index-break) 命令用于退出当前的循环结构。

  ```sh
  for i in {1..5}; do
    [ $i -eq 3 ] && break
    echo $i
  done
  ```

- **`continue`**

  [`continue`](https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html#index-continue) 命令用于跳过本次循环的剩余部分，开始下一次循环。

  ```sh
  for i in {1..5}; do
    [ $i -eq 3 ] && continue
    echo $i
  done
  ```

- **`return`**

  [`return`](https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html#index-return) 命令用于从函数中返回，指定返回状态码。

  ```sh
  myfunc() { return 5; }
  myfunc
  echo $?  # 输出 5
  ```

### 执行

- **`eval`**

  [`eval`](https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html#index-eval) 命令用于执行一个字符串作为命令。

  ```sh
  eval "echo Hello, World"
  ```

- **`exec`**

  [`exec`](https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html#index-exec) 用指定命令替换当前 Shell 进程，或者重定向文件描述符。

  例如，用当前用户的默认 Shell，替换当前的 Shell 进程。

  ```sh
  exec "$SHELL"
  ```

  例如，将输出重定向到文件。

  ```sh
  exec > output.txt
  ```

- **`exit`**

  [`exit`](https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html#index-exit) 用于退出 Shell，并返回指定的退出状态码。

  ```sh
  exit 0
  ```

- **`times`**

  [`times`](https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html#index-times) 用于显示 Shell 和子进程的执行时间。

  ```sh
  times
  ```

- **`trap`**

  [`trap`](https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html#index-trap) 用于定义脚本在接收到信号时执行的动作。

  ```sh
  trap "echo Ctrl+C 被捕获" SIGINT
  ```

### 变量

- **`export`**

  [`export`](https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html#index-export) 用于将变量导出到子进程中。

  ```sh
  export MYVAR="Hello"
  ```

- **`readonly`**

  [`readonly`](https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html#index-readonly) 用于将变量标记为只读，无法修改。

  ```sh
  readonly VAR="value"
  ```

- **`unset`**

  [`unset`](https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html#index-unset) 用于删除变量或函数的值。

  ```sh
  unset MYVAR
  ```

### 参数

- **`set`**

  [`set`](https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html#index-set) 用于设置或取消设置 Shell 选项或位置参数。

  - -**e**：当脚本中的任何命令返回非零退出状态时，立即退出脚本。
  - -**u**：如果尝试使用未声明的变量，则引发错误并导致脚本退出。
  - -**x**：执行脚本时，在执行每个命令之前，打印出实际执行的命令及其参数。
  - -**o** *option-name*：设置与选项名称对应的选项。

  ```sh
  set -eux
  ```

  在 Bash 脚本中，通常会使用管道 `|` 将多个命令连接起来。

  例如，`mysqldump | gzip` 会将 `mysqldump` 的输出通过管道传递给 `gzip`。

  ```sh
  #!/bin/bash
  set -o pipefail
  mysqldump [...] | gzip > backup.sql.gz
  ```

  默认情况下，管道中只有最后一个命令的退出状态码会被脚本捕获和返回。如果中间的命令失败了，但最后一个命令成功了，那么整个管道会被认为是成功的。这可能会掩盖中间命令的错误，导致脚本无法正确检测到失败。

  `pipefail` 选项改变了这个行为，使得整个管道的退出状态码是管道中任何一个命令的非零退出状态码（如果有的话）。

  这样，如果 `mysqldump` 失败了，即使 `gzip` 成功，整个管道仍然会返回非零的退出状态码。

- **`shift`**

  [`shift`](https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html#index-shift) 用于移动位置参数的顺序。

  ```sh
  shift 2  # 将 $3 变为 $1
  ```

