# Bash

## 一、条件表达式

### 1.1. 条件构造

`if` 命令的语法，详见 [Conditional Constructs](https://www.gnu.org/software/bash/manual/html_node/Conditional-Constructs.html)。

```sh
if test-commands; then
  consequent-commands;
fi
```

在 Bash 中，`[]` 用于测试条件。它是测试表达式的一种方法，也被称为 [test 命令](https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html#index-test)。

```sh
if [ -z "${MINIO_VOLUMES}" ]; then
  echo 'Variable MINIO_VOLUMES not set in /etc/default/minio';
fi
```

### 1.2. 条件表达式

详见 [Conditional Expressions](https://www.gnu.org/software/bash/manual/html_node/Bash-Conditional-Expressions.html)。

- `-z` *string*：如果字符串的长度为零，则为 True。
- `-n` *string*：如果字符串的长度非零，则为 True。

## 二、Shell 扩展

### 2.1. 变量扩展

Bash 将 `$` 开头的词视为变量，将其扩展成变量值。`${}` 是可选的，可以用于明确标识变量名的边界，以防止歧义。详见 [Shell Parameter Expansion](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html)。

```sh
$ NAME="Alice"
$ echo "Hello, ${NAME}"!
```

### 2.2. 进程替换

进程替换允许通过文件名引用进程的输入或输出。详见 [Process Substitution](https://www.gnu.org/software/bash/manual/html_node/Process-Substitution.html)。

```sh
$ cat <(tree -h)
```

## 三、重定向

文件描述符是内核为了高效管理已经被打开的文件所创建的索引，是一个非负整数，用于指代被打开的文件，所有执行 I/O 操作的系统调用都通过文件描述符来实现。同时还规定 0 是标准输入，1 是标准输出，2 是标准错误。这意味着如果此时去打开一个新的文件，它的文件描述符会是 3；再打开一个文件，文件描述符就是 4。

| 整数值 | 名称     | 文件流   |
| ------ | -------- | -------- |
| `0`    | 标准输入 | `stdin`  |
| `1`    | 标准输出 | `stdout` |
| `2`    | 标准错误 | `stderr` |

重定向详见 [Redirections](https://www.gnu.org/software/bash/manual/html_node/Redirections.html)。

### 3.1. 重定向输出

将输出重定向到文件。

```sh
$ echo "Hello, World"! > output.txt
```

将输出以追加的方式重定向到文件。

```sh
$ echo "Hello, World"! >> output.txt
```

`[n]>` 表示将文件描述符为 `n` 的流重定向到文件。

```sh
$ cat non_existent_file.txt 2> error.log
```

将标准输出和标准错误重定向到文件。有三种格式，语义上是等同的。

```sh
$ cat non_existent_file.txt &> all.log
$ cat non_existent_file.txt >& all.log
$ echo log.txt > /dev/null 2>&1
```

### 3.2. 重定向输入

将输入重定向到文件。

```sh
$ cat < output.txt
```

### 3.3. Here Documents

从当前源读取输入，读取的所有行都用作命令的标准输入。

```sh
$ cat <<-EOF > output.txt
Line 1
Line 2
Line 3
EOF
```

## 四、启动文件

### 4.1. 交互式

交互式（Interactive）和非交互式（Non-Interactive）是两种不同的用户界面模式。

- 非交互式 Shell

  ```sh
  $ bash myscript.sh
  ```

- 交互式 Shell

  ```sh
  $ echo "Hello, World"!
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

### 4.2. 登录式

登录式（login shell）和非登录式（non-login shell）是两种不同的交互式 Shell 启动方式。

- 登录式 Shell

  当用户登录到系统时，系统会启动一个登录式 Shell。用户通常通过用户名和密码进行登录。

  登录式 Shell 会执行用户的登录配置文件（如 `~/.bash_profile` 或 `~/.bash_login` 或 `~/.profile`）来设置环境变量、别名等配置信息。

- 非登录式 Shell

  在已经登录的环境中启动新的 Shell，或者通过执行脚本来启动 Shell 时，通常会得到一个非登录式 Shell。

  非登录式 Shell 不会执行用户的登录配置文件，而是执行其他配置文件，如 `~/.bashrc`。

可以通过查看 `$0` 环境变量的值来确定当前 Shell 是否为登录式或非登录式。如果 `$0` 的值以 `-` 开头，通常表示登录式 Shell。

非交互式非登录式 Shell 的典型用例如下。

```sh
$ bash myscript.sh
```

## 五、内置命令

### 5.1. exec

`exec` 是一个 Bash 内建命令，用于替换当前 Shell 进程。详见 [exec](https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html#index-exec)。

- 重新启动 Shell

  用当前用户的默认 Shell 替换当前的 Shell 进程。

  ```sh
  $ exec "$SHELL"
  ```

