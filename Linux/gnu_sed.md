# Sed

`sed` (stream editor) 是一个非交互式命令行文本编辑器。

## 语法

调用 `sed` 的完整格式是：

```
sed [OPTION]... {script-only-if-no-other-script} [input-file]...
```

## 命令行选项

- **-i[*SUFFIX*]**

直接修改文件，如果提供扩展名，则进行备份。

- **-n**

禁用自动打印模式空间 (pattern space)。与 `p` 命令一起使用时，显示脚本处理后的结果。

- **-e**

将脚本添加到要执行的命令中，可以多次添加。

- **-E**

使用扩展正则表达式而不是基本正则表达式。

## 脚本

### `s` 命令

`s` 命令可以替换指定字符，并且有很多不同的选项。`s` 命令的语法是 `s/regexp/replacement/flags`。

替换指定字符串：

```sh
$ sed 's/one/two/g' test.txt
```

在每一行最前面加点东西：

```sh
$ sed 's/^/#/g' test.txt
```

在每一行最后面加点东西：

```sh
$ sed 's/$/ --- /g' test.txt
```

去掉 html 中的所有标签：

```sh
$ sed 's/<[^>]*>//g' test.html
```

未转义的 `&` 字符可以替代整个匹配部分：

```sh
$ seq 6 | sed 's/3/[&]/g'
```

`s` 命令后面可以跟零个或多个以下 *flags*：

- **g**

将替换应用于正则表达式的所有匹配项，而不仅仅是第一个。

- ***number***

仅替换正则表达式的第 *number* 个匹配项。

当混合 `g` 和 *`number`* 修饰符时，对于 GNU `sed`，忽略第 *number* 号之前的匹配，然后匹配并替换第 *number* 号以后的所有匹配。

### 其他命令

- **`p`** 命令

打印模式空间。可以作为 `grep` 式的命令。

打印第三行内容：

```sh
$ seq 6 | sed -n '3 p'
```

- **`n`** 命令

如果未禁用自动打印，则打印模式空间，然后无论如何都将模式空间替换为下一行输入。

- **`N`** 命令

将换行符添加到模式空间，然后将下一行输入添加到模式空间。

- **`a`** 命令

在一行之后附加文本。

在第三行后附加文本：

```sh
$ seq 6 | sed '3 a append'
```

- **`i`** 命令

在一行之前插入文本。

在第三行前插入文本：

```sh
$ seq 6 | sed '3 i insert'
```

- **`c`** 命令

用文本替换匹配行。

替换第三行内容：

```sh
$ seq 6 | sed '3 c 66'
```

- **d** 命令

删除匹配行。

删除第三行：

```sh
$ seq 6 | sed '3 d'
```

- **{ *cmd ; cmd ...* }**

将多个命令组合在一起。

执行替换然后打印第二个输入行：

```sh
$ seq 3 | sed -n '2{s/2/X/ ; p}'
```

### Hold space

当 `sed` 一行一行的读取文件，正在读取的当前行会被插入到 `pattern space`。`pattern space` 像是一个临时的缓冲区，即存储当前信息的暂存器。

`hold space` 像一个长期储存，你可以将你获取的一些东西储存到其中然后待会在 `sed` 处理别的行的时候再取出来用，你不能直接对 `hold space` 进行操作，取而代之的是将他的内容复制或者添加到 `pattern space`。

- **g** 命令

将模式空间的内容替换为保持空间的内容。

- **G** 命令

将换行符附加到模式空间，然后将保留空间的内容附加到模式空间。

- **h** 命令

将保持空间的内容替换为模式空间的内容。

- **H** 命令

将换行符附加到保持空间，然后将模式空间的内容附加到保持空间。

- **x** 命令

交换保持空间和模式空间的内容。

例子：反序文件的行：

```sh
$ echo -e "one \ntwo \nthree" | sed '1!G;h;$!d'
$ echo -e "one \ntwo \nthree" | sed -n '1!G;h;$p'
```

### 多命令语法

有几种方法可以在 `sed` 程序中指定多个命令。

在命令行上，所有 `sed` 命令都可以用换行符分隔：

```sh
$ seq 6 | sed '1d
3d
5d'
```

可以将每个命令指定为 `-e` 选项的参数：

```sh
$ seq 6 | sed -e 1d -e 3d -e 5d
```

分号 (`;`) 可用于分隔最简单的命令：

```sh
$ seq 6 | sed '1d;3d;5d'
```

## 指定行

地址决定了 `sed` 命令将在哪一行执行。如果没有给出地址，则在所有行上执行该命令。

### 通过数字选择行

以下命令仅在第 3 行将单词替换：

```sh
$ sed '3s/one/two/g' test.txt
```

地址范围用逗号 (`,`) 分隔的两个地址指定：

```sh
$ sed '3,6s/one/two/g' test.txt
```

`sed` 脚本中的地址可以是以下任何一种形式：

- ***number***

指定行号将仅匹配输入中的该行。

- **$**

此地址匹配最后一个输入文件的最后一行。

### 通过文本匹配选择行

以下命令仅在包含字符串 '3' 时，将 '6' 替换为 '5'：

```sh
$ echo -e "136 \n146 \n156 \n163" | sed '/3/s/6/5/g'
```

附加 `!` 字符（在命令字母之前）作否定：

```sh
$ echo -e "136 \n146 \n156 \n163" | sed '/3/!s/6/5/g'
```

## 正则表达式

### 反向引用和子表达式

反向引用是正则表达式命令，它引用匹配的正则表达式的前一部分。反向引用用反斜杠和一个数字指定（例如 '`\1`'）。他们引用的正则表达式部分称为子表达式，并用括号指定。整个匹配部分用未转义的 `&` 字符指定。

反向引用和子表达式用于两种情况：正则表达式搜索模式和 `s` 命令的替换部分。

正则表达式搜索模式：

```sh
$ seq 666 | sed -E -n '/^3(6)\1$/p'
```

`s` 命令：

```sh
$ seq 666 | sed -E 's/^66(6)$/&:last is:\1/g'
```

## 参考文献

- [SED 简明教程 - 酷壳](https://coolshell.cn/articles/9104.html)

## 参见

- [sed, a stream editor - GNU](https://www.gnu.org/software/sed/manual/sed.html)

