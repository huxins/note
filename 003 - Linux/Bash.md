# Bash

## 一、命令

### 简单命令

[Simple Commands](https://www.gnu.org/software/bash/manual/html_node/Simple-Commands.html) 是最常见的命令类型。它是一个由空格分隔的单词序列，由 Shell 的一个[控制操作符](https://www.gnu.org/software/bash/manual/html_node/Definitions.html#index-control-operator)终止。第一个单词通常指定要执行的命令，其余单词是该命令的参数。

```sh
date +'%Y-%m-%d %T'
```

#### 简单命令扩展

当执行一个简单命令时，Shell 从左到右按以下顺序执行以下扩展、赋值和重定向。

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

当一个程序被调用时，它会获得一个名为 [*environment*](https://www.gnu.org/software/bash/manual/html_node/Environment.html) 的字符串数组。这是一个以 `name=value` 形式表示的键值对列表。

下面这些赋值语句只影响该命令所看到的 Environment，不会影响当前的 Shell Environment。

设置临时环境变量。

```sh
CITY=Shanghai env | grep CITY
```

输出指定时区的日期。

```sh
TZ=':Asia/Tokyo' date +'%Y-%m-%d %T'
```

当要执行除内置函数或 Shell 函数之外的简单命令时，会在由以下内容组成的单独执行环境中调用该命令。

- 标记为 `export` 的 Shell 变量和函数。

  ```sh
  export CITY=Shanghai; env | grep CITY
  ```

### 复合命令

#### 条件构造

[`if`](https://www.gnu.org/software/bash/manual/html_node/Conditional-Constructs.html) 命令的语法如下。

```sh
if test-commands; then
  consequent-commands;
fi
```

##### test

在 *Bash* 中，`[]` 用于 *test* 条件。它是 *test* 表达式的一种方法，也被称为 [test](https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html#index-test) 命令。

```sh
if [ -z "${MINIO_VOLUMES}" ]; then
  echo 'Variable MINIO_VOLUMES not set in /etc/default/minio';
fi
```

##### 条件表达式

[条件表达式](https://www.gnu.org/software/bash/manual/html_node/Bash-Conditional-Expressions.html)由 `[[` [命令](https://www.gnu.org/software/bash/manual/html_node/Conditional-Constructs.html#index-_005b_005b) 和 `[` [命令](https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html#index-test)使用。

- -**z** *string*：如果字符串的长度为零，则为 True。
- -**n** *string*：如果字符串的长度非零，则为 True。

## 二、扩展

### 参数扩展

*Bash* 将 `$` 开头的词视为变量，将其[扩展](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html)成变量值。`${}` 是可选的，可以用于明确标识变量名的边界，以防止歧义。

```sh
NAME="Alice"
echo "Hello, ${NAME}"!
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

文件描述符是内核为了高效管理已经被打开的文件所创建的索引，是一个非负整数，用于指代被打开的文件，所有执行 I/O 操作的系统调用都通过文件描述符来实现。同时还规定 `0` 是标准输入，`1` 是标准输出，`2` 是标准错误。这意味着如果此时去打开一个新的文件，它的文件描述符会是 `3`；再打开一个文件，文件描述符就是 `4`。

| 整数值 | 名称     | 文件流   |
| ------ | -------- | -------- |
| `0`    | 标准输入 | `stdin`  |
| `1`    | 标准输出 | `stdout` |
| `2`    | 标准错误 | `stderr` |

### 重定向输出

将[输出重定向](https://www.gnu.org/software/bash/manual/html_node/Redirections.html#Redirecting-Input)到文件。

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

将输入重定向到文件。

```sh
cat < output.txt
```

### Here Documents

从当前源读取输入，读取的所有行都用作命令的标准输入。

```sh
cat <<-EOF > output.txt
Line 1
Line 2
Line 3
EOF
```

## 四、启动文件

### 交互式

交互式（Interactive）和非交互式（Non-Interactive）是两种不同的用户界面模式。

- 非交互式 Shell

  ```sh
  bash myscript.sh
  ```

- 交互式 Shell

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

- 登录式 Shell

  当用户登录到系统时，系统会启动一个登录式 Shell。用户通常通过用户名和密码进行登录。

  登录式 Shell 会执行用户的登录配置文件（如 *~/.bash_profile* 或 *~/.bash_login* 或 *~/.profile*）来设置环境变量、别名等配置信息。

- 非登录式 Shell

  在已经登录的环境中启动新的 Shell，或者通过执行脚本来启动 Shell 时，通常会得到一个非登录式 Shell。

  非登录式 Shell 不会执行用户的登录配置文件，而是执行其他配置文件，如 *~/.bashrc*。

可以通过查看 `$0` 环境变量的值来确定当前 Shell 是否为登录式或非登录式。如果 `$0` 的值以 `-` 开头，通常表示登录式 Shell。

非交互式非登录式 Shell 的典型用例如下。

```sh
bash myscript.sh
```

## 五、内置命令

### exec

[`exec`](https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html#index-exec) 是一个 *Bash* 内建命令，用于替换当前 Shell 进程。

用当前用户的默认 Shell 替换当前的 Shell 进程。

```sh
exec "$SHELL"
```

### set

[`set`](https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html#index-set) 设置或取消设置 Shell 属性。

- -**e**：当脚本中的任何命令返回非零退出状态时，立即退出脚本。
- -**u**：如果尝试使用未声明的变量，则引发错误并导致脚本退出。
- -**x**：执行脚本时，在执行每个命令之前，打印出实际执行的命令及其参数。

```sh
set -eux
```

