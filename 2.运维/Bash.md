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

## 二、Shell 扩展

### 2.1. 变量扩展

Bash 将 `$` 开头的词视为变量，将其扩展成变量值。`${}` 是可选的，可以用于明确标识变量名的边界，以防止歧义。详见 [Shell Parameter Expansion](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html)。

```sh
$ NAME="Alice"
$ echo "Hello, ${NAME}"!
```

