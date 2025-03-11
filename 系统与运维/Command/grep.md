# Grep

[`grep`](https://www.gnu.org/software/grep/manual/html_node/index.html) 是用于搜索文本内容的命令。它可以从文件或标准输入中查找匹配特定模式（通常是正则表达式）的行，并将结果输出。

`grep` 的名称来源于早期的文本编辑器 `ed` 中的命令：`g/re/p`。

## 一、选项

### 基本匹配

- -**i**：忽略大小写进行匹配。
- -**v**：反向匹配，显示不包含匹配模式的行。
- -**x**：完全匹配整行。
- -**E**：使用扩展正则表达式（等价于 `egrep`）。
- -**F**：仅匹配固定字符串（等价于 `fgrep`）。
- -**G**：使用基本正则表达式（默认模式）。
- -**w**：匹配整个单词，而不是部分匹配。

### 输出控制

- -**c**：仅显示匹配的行数。
- -**n**：显示匹配行的行号。
- -[**o**](https://www.gnu.org/software/grep/manual/html_node/General-Output-Control.html#index-_002do)：仅输出匹配的部分。
- -**q**：安静模式，不输出任何信息，只返回退出状态码。
- --**color**：为匹配到的部分加上高亮颜色。
- -**L**：列出未匹配模式的文件名。
- -**l**：仅显示包含匹配内容的文件名，不显示具体匹配行。

### 递归与文件搜索

- -**r**：递归搜索指定目录及其子目录中的文件。
- --**include**：只搜索指定模式的文件（如 `--include=*.txt`）。
- --**exclude**：排除指定模式的文件（如 `--exclude=*.log`）。
- --**exclude-dir**：排除指定目录（如 `--exclude-dir=log`）。

### 上下文显示

- -**A** *num*：显示匹配行及其后面 N 行。
- -**B** *num*：显示匹配行及其前面 N 行。
- -**C** *num*：显示匹配行及其前后 N 行（相当于 `-A N -B N`）。

## 二、示例

### 字符串次数

可以使用 `grep`、`awk` 或 `sed` 等工具来查询文件中某个字符串出现的次数。

使用 `grep -o` 和 `wc -l`。

```sh
echo "strstrstr" | grep -o "str" | wc -l
```

使用 [`awk`](https://www.gnu.org/software/gawk/manual/html_node/String-Functions.html#index-gsub_0028_0029-function-1)。

```sh
echo "strstrstr" | awk '{ count += gsub(/str/, "") } END { print count }'
```

使用 `perl`。

```sh
echo "strstrstr" | perl -lne '$count += () = /str/g; END {print $count}'
```

