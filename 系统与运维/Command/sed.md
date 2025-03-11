# Sed

[`sed`](https://www.gnu.org/software/sed/manual/html_node/index.html) 是一种流编辑器，用于对文本文件进行解析和编辑操作。它基于早期的 `ed` 编辑器，采用了非交互的流式操作方式。

**功能：**

- **文本替换**：对文件或输入流中的文本进行模式匹配并替换。
- **文本删除**：删除匹配的行或特定的部分。
- **文本插入**：在特定位置插入新内容。
- **文本选择**：仅处理特定行的文本。
- **格式转换**：结合正则表达式，完成复杂的文本格式转换。

## 一、选项

- -**i**：直接修改文件内容。
- -**n**：禁止默认输出（pattern space），仅打印满足条件的内容。
- -**e** *script*：支持多条编辑命令。将脚本添加到要执行的命令中，可以多次添加。
- -**E**, -**r**：支持扩展正则表达式。使用扩展正则表达式而不是基本正则表达式。

## 二、脚本

### 替换文本

[`s`](https://www.gnu.org/software/sed/manual/html_node/The-_0022s_0022-Command.html) 命令可以替换指定字符，并且有很多不同的选项。`s` 命令的语法是 `s/regexp/replacement/flags`。

`s` 命令后面可以跟零个或多个以下 [*flags*](https://www.gnu.org/software/sed/manual/html_node/The-_0022s_0022-Command.html#index-s-command_002c-option-flags)：

- **g**：将替换应用于正则表达式的所有匹配项，而不仅仅是第一个。
- ***number***：仅替换正则表达式的第 *number* 个匹配项。

当混合 `g` 和 *`number`* 修饰符时，对于 GNU `sed`，忽略第 *number* 号之前的匹配，然后匹配并替换第 *number* 号以后的所有匹配。

例如，**替换**指定字符串。仅替换每行的第一个匹配项。

```sh
sed 's/one/two/' test.txt
sed 's/one/two/' <(echo -e 'one\nthree')
```

例如，**插入**指定字符串。在每一行最前面加点东西。

```sh
sed 's/^/#/' test.txt
sed 's/^/#/' <(echo -e '1\n2')
```

例如，**插入**指定字符串。在每一行最后面加点东西。

```sh
sed 's/$/ --- /' test.txt
sed 's/$/ --- /' <(echo -e '1\n2')
```

例如，**删除**指定字符串。去掉 HTML 中的所有标签。

```sh
sed 's/<[^>]*>//g' test.html
```

例如，**引用**替代。未转义的 `&` 字符可以替代整个匹配部分。

```sh
seq 6 | sed 's/3/[&]/g'
```

### 删除行

[`d`](https://www.gnu.org/software/sed/manual/html_node/Common-Commands.html#index-d-_0028delete_0029-command) 命令删除匹配的整个 pattern space。

例如，删除第三行。

```sh
seq 6 | sed 3d
```

例如，删除匹配模式的行。

```sh
seq 6 | sed '/^3/d'
```

### 插入行

`a` 命令在行后插入文本。

例如，在第三行后插入文本。

```sh
seq 6 | sed '3a append'
```

`i` 命令在行前插入文本。

例如，在第三行前插入文本。

```sh
seq 6 | sed '3i insert'
```

### 跳过行

[`n`](https://www.gnu.org/software/sed/manual/html_node/Common-Commands.html#index-n-_0028next_002dline_0029-command) 命令用下一行输入替换 pattern space。如果未禁用自动打印，则打印模式空间，然后无论如何都将模式空间替换为下一行输入。

```sh
seq 6 | sed 'n;n;s/./x/'
seq 6 | sed -n 'n;n;s/./x/;p'
```

[`N`](https://www.gnu.org/software/sed/manual/html_node/Other-Commands.html#index-N-_0028append-Next-line_0029-command) 命令在 pattern space 中添加换行符，然后将下一行输入附加到 pattern space。

```sh
seq 6 | sed 'N;a #'
```

### 替换行

`c` 命令用文本替换匹配行。

例如，替换第三行内容。

```sh
seq 6 | sed '3c 66'
```

### 打印特定行

[`p`](https://www.gnu.org/software/sed/manual/html_node/Common-Commands.html#index-p-_0028print_0029-command) 命令打印匹配的模式空间。可以作为 `grep` 式的命令。

例如，打印第三行内容。

```sh
seq 6 | sed -n 3p
```

例如，打印匹配的行。

```sh
seq 6 | sed -n '/^3/p'
```

### 组合命令

[`{ *cmd ; cmd ...* }`](https://www.gnu.org/software/sed/manual/html_node/Common-Commands.html#index-_007b_007d-command-grouping) 将多个命令组合在一起。

例如，执行替换然后打印第二个输入行。

```sh
seq 3 | sed -n '2{s/2/X/ ; p}'
```

### 多命令

有几种方法可以在 `sed` 程序中指定多个命令。

- **换行符**：在命令行上，所有 `sed` 命令都可以用换行符分隔。

  ```sh
  seq 6 | sed '1d
  3d
  5d'
  ```

- **-e 选项**：可以将每个命令指定为 `-e` 选项的参数。

  ```sh
  seq 6 | sed -e 1d -e 3d -e 5d
  ```

- **分号**：可用于分隔最简单的命令。

  ```sh
  seq 6 | sed '1d;3d;5d'
  ```

## 三、Hold space

当 `sed` 一行一行的读取文件，正在读取的当前行会被插入到 `pattern space`。`pattern space` 像是一个临时的缓冲区，即存储当前信息的暂存器。

`hold space` 像一个长期储存，你可以将你获取的一些东西储存到其中然后待会在 `sed` 处理别的行的时候再取出来用，你不能直接对 `hold space` 进行操作，取而代之的是将他的内容复制或添加到 `pattern space`。

- [`g`](https://www.gnu.org/software/sed/manual/html_node/Other-Commands.html#index-g-_0028get_0029-command) 命令：将模式空间的内容替换为保持空间的内容。
- [`G`](https://www.gnu.org/software/sed/manual/html_node/Other-Commands.html#index-G-_0028appending-Get_0029-command) 命令：将换行符附加到模式空间，然后将保留空间的内容附加到模式空间。
- [`h`](https://www.gnu.org/software/sed/manual/html_node/Other-Commands.html#index-h-_0028hold_0029-command) 命令：将保持空间的内容替换为模式空间的内容。
- [`H`](https://www.gnu.org/software/sed/manual/html_node/Other-Commands.html#index-H-_0028append-Hold_0029-command) 命令：将换行符附加到保持空间，然后将模式空间的内容附加到保持空间。
- [x](https://www.gnu.org/software/sed/manual/html_node/Other-Commands.html#index-x-_0028eXchange_0029-command) 命令：交换保持空间和模式空间的内容。

例如，反序文件的行。

```sh
echo -e "one \ntwo \nthree" | sed '1!G;h;$!d'
echo -e "one \ntwo \nthree" | sed -n '1!G;h;$p'
```

## 四、指定行

[地址](https://www.gnu.org/software/sed/manual/html_node/Addresses-overview.html)决定了 `sed` 命令将在哪一行执行。如果没有给出地址，则在所有行上执行该命令。

### 通过数字选择行

以下命令仅在第 3 行将单词替换。

```sh
sed '3s/one/two/g' test.txt
```

地址范围用逗号（`,`）分隔的两个地址指定。

```sh
sed '3,6s/one/two/g' test.txt
```

`sed` 脚本中的地址可以是以下任何一种形式：

- ***number***：指定行号将仅匹配输入中的该行。
- **$**：此地址匹配最后一个输入文件的最后一行。

### 通过文本匹配选择行

以下命令仅在包含字符串 '3' 时，将 '6' 替换为 '5'。

```sh
echo -e "136 \n146 \n156 \n163" | sed '/3/s/6/5/g'
```

### 否定匹配

在命令字母之前，附加 `!` 字符作否定。

```sh
echo -e "136 \n146 \n156 \n163" | sed '/3/!s/6/5/g'
```

## 五、正则表达式

### 反向引用

[反向引用](https://www.gnu.org/software/sed/manual/html_node/Back_002dreferences-and-Subexpressions.html)是正则表达式命令，它引用匹配的正则表达式的前一部分。

反向引用用反斜杠和一个数字指定（如 `\1`）。他们引用的正则表达式部分称为子表达式，并用括号指定。整个匹配部分用未转义的 `&` 字符指定。

反向引用和子表达式用于两种情况：正则表达式搜索模式和 `s` 命令的替换部分。

- 正则表达式搜索模式：

  ```sh
  seq 666 | sed -E -n '/^3(6)\1$/p'
  ```

- `s` 命令：

  ```sh
  seq 666 | sed -E 's/^66(6)$/&:last is:\1/g'
  ```

## Reference

- [SED 简明教程 - 酷壳](https://coolshell.cn/articles/9104.html)

