# Bash

## 一、语句

### 1.1. 条件表达式

#### 1.1.1. 条件构造

`if` 命令的语法，详见 [Conditional Constructs](https://www.gnu.org/software/bash/manual/html_node/Conditional-Constructs.html)。

```sh
if [ test-commands ]; then
  consequent-commands;
fi
```

#### 1.1.2. 条件表达式

详见 [Conditional Expressions](https://www.gnu.org/software/bash/manual/html_node/Bash-Conditional-Expressions.html)。

- `-z` *string*：如果字符串的长度为零，则为 True。

