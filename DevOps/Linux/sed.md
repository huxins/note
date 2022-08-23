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

## 脚本

### `s` 命令

`s` 命令可以替换指定字符，并且有很多不同的选项。`s` 命令的语法是 `'s/regexp/replacement/flags'`。

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

`s` 命令后面可以跟零个或多个以下 *flags*：

- **g**

将替换应用于正则表达式的所有匹配项，而不仅仅是第一个。

- ***number***

仅替换正则表达式的第 *number* 个匹配项。

当混合 `g` 和 *`number`* 修饰符时，对于 GNU `sed`，忽略第 *number* 号之前的匹配，然后匹配并替换第 *number* 号以后的所有匹配。

## 指定行

地址决定了 `sed` 命令将在哪一行执行。如果没有给出地址，则在所有行上执行该命令。

以下命令仅在第 3 行将单词替换：

```sh
$ sed '3s/one/two/g' test.txt
```

地址范围用逗号 (`,`) 分隔的两个地址指定：

```sh
$ sed '3,6s/one/two/g' test.txt
```

## 参考文献

- [SED 简明教程 - 酷壳](https://coolshell.cn/articles/9104.html)

## 参见

- [sed, a stream editor - GNU](https://www.gnu.org/software/sed/manual/sed.html)

