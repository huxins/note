# Awk

[`awk`](https://www.gnu.org/software/gawk/manual/html_node/index.html) 是一个强大的文本处理工具和编程语言，专门用于处理和分析文本数据。它以行为单位读取输入文件或标准输入，对每一行应用指定的规则和操作。

**常见功能包括：**

- 文本过滤和提取
- 字符串处理
- 数据格式化
- 数值计算
- 表格数据处理

`awk` 的核心思想是基于 *pattern-action* 规则，语法如下：

```sh
pattern { action }
```

- **pattern**：指定匹配条件，只有满足条件的行才会执行后面的动作。
- **action**：定义对匹配到的行将要执行的操作。

## 一、字段

[Fields](https://www.gnu.org/software/gawk/manual/html_node/Fields.html) 是指每一行输入数据被分隔成的若干部分。`awk` 的核心功能之一就是基于字段来处理和操作文本数据。

- **字段分隔符：**
  - `awk` 默认使用[空白字符](https://www.gnu.org/software/gawk/manual/html_node/Default-Field-Splitting.html)（空格和制表符）作为字段分隔符。
  - 可以通过设置特殊变量 [`FS`](https://www.gnu.org/software/gawk/manual/html_node/Command-Line-Field-Separator.html)（Field Separator）来指定其他的分隔符。
- **字段编号：**
  - `awk` 将每一行的字段编号为 `$1`, `$2`, `$3`，依此类推。
  - `$0` 表示整行数据。
- **特殊字段变量：**
  - [`NF`](https://www.gnu.org/software/gawk/manual/html_node/Auto_002dset.html#index-NF-variable-1)：表示当前行的字段总数。
  - [`FS`](https://www.gnu.org/software/gawk/manual/html_node/User_002dmodified.html#index-field-separator-1)：指定输入字段分隔符（默认为空白字符）。
  - [`OFS`](https://www.gnu.org/software/gawk/manual/html_node/User_002dmodified.html#index-field-separator-2)：指定输出字段分隔符（默认也是空白字符）。

假设有一个文件 `data.txt`，内容如下：

```
apple orange banana
cat dog tiger
```

例如，**访问字段**，以下命令打印每行的第一个字段。

```sh
awk '{print $1}' data.txt
```

例如，**修改字段分隔符**，假设数据改为逗号分隔。

```
apple,orange,banana
cat,dog,tiger
```

可以显式指定分隔符。

```sh
awk -F ',' '{print $2}' data.txt
```

例如，**打印字段总数**，以下命令打印每行的字段总数。

```sh
awk '{print NF}' data.txt
```

例如，**修改字段分隔符和输出分隔符**。假设我们想把逗号分隔的数据改为用冒号分隔，并打印出来。

```sh
awk -F ',' 'BEGIN {OFS=":"} {print $1, $2, $3}' data.txt
```

## 二、表达式

[Expressions](https://www.gnu.org/software/gawk/manual/html_node/Expressions.html) 是用于处理、计算和操作数据的核心部分。表达式可以是值、变量、运算符、函数调用等的组合，它们可以用来生成新值、匹配模式、执行条件判断等。

```sh
$1 + $2    # 一个算术表达式
$3 ~ /abc/ # 一个正则表达式匹配
```

`awk` 会在每一行数据上逐行执行这些表达式。

### 算术表达式

用来进行数学运算，支持常见的[算术运算符](https://www.gnu.org/software/gawk/manual/html_node/Arithmetic-Ops.html)：

- `+`：加
- `-`：减
- `*`：乘
- `/`：除
- `%`：取余

```sh
$1 + $2    # 将第一字段和第二字段相加
$3 - 5     # 将第三字段减去 5
```

### 字符串表达式

用于处理字符串，支持[字符串连接](https://www.gnu.org/software/gawk/manual/html_node/Concatenation.html)操作：

```sh
$1 $2      # 将第一字段和第二字段直接拼接
$1 ", " $2 # 用逗号和空格连接第一字段和第二字段
```

### 比较表达式

用于比较两个值，返回布尔值（`true` 或 `false`）。支持以下[比较运算符](https://www.gnu.org/software/gawk/manual/html_node/Comparison-Operators.html)：

- `==`：等于
- `!=`：不等于
- `<`：小于
- `>`：大于
- `<=`：小于等于
- `>=`：大于等于

```sh
$1 > 10     # 检查第一字段是否大于 10
$2 == "abc" # 检查第二字段是否等于 "abc"
```

### 正则表达式匹配

用来检查字段或字符串是否匹配某个[正则表达式](https://www.gnu.org/software/gawk/manual/html_node/Standard-Regexp-Constants.html)：

- `~`：匹配正则表达式
- `!~`：不匹配正则表达式

```sh
$1 ~ /^[A-Z]/  # 检查第一字段是否以大写字母开头
$2 !~ /abc/    # 检查第二字段是否不包含 "abc"
```

### 逻辑表达式

用于逻辑判断，支持以下[逻辑运算符](https://www.gnu.org/software/gawk/manual/html_node/Boolean-Ops.html#Boolean-Expressions)：

- `&&`：逻辑与（AND）
- `||`：逻辑或（OR）
- `!`：逻辑非（NOT）

```sh
$1 > 10 && $2 < 5          # 第一字段大于 10 且第二字段小于 5
$1 == "abc" || $2 == "def" # 第一字段是 "abc" 或第二字段是 "def"
```

### 赋值表达式

将值赋给变量或字段。支持以下[赋值运算符](https://www.gnu.org/software/gawk/manual/html_node/Assignment-Ops.html)：

- `=`：赋值
- `+=`：加法赋值
- `-=`：减法赋值
- `*=`：乘法赋值
- `/=`：除法赋值
- `%=`：取余赋值

```sh
sum = $1 + $2  # 将第一字段和第二字段的和赋给变量 sum
count += 1     # 将变量 count 的值加 1
```

### 条件表达式

`awk` 支持[三目运算符](https://www.gnu.org/software/gawk/manual/html_node/Conditional-Exp.html) `condition ? true_value : false_value`，用于根据条件返回不同的值。

```sh
x = ($1 > 10) ? "High" : "Low"  # 如果第一字段大于 10，则 x 为 "High"，否则为 "Low"
```

### 优先级

`awk` 中的表达式运算符有[优先级](https://www.gnu.org/software/gawk/manual/html_node/Precedence.html)，以下是常用运算符的优先级（从高到低）：

- `()`：括号，用于强制优先级
- `!`：逻辑非
- `*` `/` `%`：乘、除、取余
- `+` `-`：加、减
- `<` `<=` `>` `>=`：比较运算符
- `==` `!=`：等于、不等于
- `~` `!~`：正则表达式匹配
- `&&`：逻辑与
- `||`：逻辑或
- `=` `+=` `-=` `*=` `/=` `%=`：赋值运算符

## 三、模式

[Patterns](https://www.gnu.org/software/gawk/manual/html_node/Pattern-Overview.html) 用于筛选匹配的行，决定哪些行需要执行 `awk` 的 [Actions](https://www.gnu.org/software/gawk/manual/html_node/Action-Overview.html)。当 `awk` 处理文本时，会遍历每一行数据，并检查模式是否匹配，匹配的行会执行指定的操作，不匹配的行则被跳过。

在 `awk` 中，模式可以是：

- **空模式**（匹配所有行）
- **正则表达式**（匹配特定文本）
- **关系表达式**（比较字段或变量）
- **范围模式**（匹配特定范围的行）
- **BEGIN 和 END**（处理开始和结束逻辑）
- **组合模式**（逻辑运算符 `&&`, `||`, `!` 组合多个模式）

`awk` 的模式提供了强大的行匹配功能，可以结合正则表达式、条件表达式、范围模式、逻辑运算符等高效地处理文本数据。

### 空模式

如果 `awk` 只提供了 `{动作}` 而没有指定模式，则 `awk` 会默认匹配所有行。

```sh
awk '{print}' data.txt  # 打印所有行，相当于 `cat data.txt`
```

### 正则表达式模式

`awk` 可以使用 `/正则表达式/` 作为匹配模式，匹配含有该模式的行。

使用 `~`（匹配）或 `!~`（不匹配）来检测字段是否符合正则表达式。

例如，匹配包含 `apple` 的行。

```sh
awk '/apple/' data.txt
```

例如，匹配第一列包含 `10` 的行。

```sh
awk '$1 ~ /10/' data.txt
```

例如，排除匹配 `apple` 的行。

```sh
awk '!/apple/' data.txt
```

### 关系表达式模式

关系表达式可以用于比较字段的值，如 `$1 > 10`，`$2 == "banana"` 等。

例如，第一列大于 `20` 的行。

```sh
awk '$1 > 20' data.txt
```

例如，第三列等于 `banana` 的行。

```sh
awk '$3 == "banana"' data.txt
```

### 范围模式

`awk` 允许使用 `模式1, 模式2` 指定匹配的[范围](https://www.gnu.org/software/gawk/manual/html_node/Ranges.html)（从匹配 `模式1` 的行开始，到匹配 `模式2` 的行结束），适用于提取数据的某个连续区域。

例如，匹配从 `banana` 开始到 `cherry` 结束的行。

```sh
awk '/banana/, /cherry/' data.txt
```

- 第一次匹配 `/banana/`，开始输出。
- 直到匹配 `/cherry/` 结束。

### BEGIN 和 END 模式

- `BEGIN`：在 `awk` 处理文件的第一行之前运行（可用于打印表头、初始化变量等）。
- `END`：在 `awk` 处理完所有行之后运行（可用于打印统计信息等）。

例如，在处理前后打印消息。

```sh
awk 'BEGIN {print "Processing Start"} {print} END {print "Processing End"}' data.txt
```

例如，统计文件的行数。

```sh
awk 'END {print "Total lines: " NR}' data.txt
```

### 组合模式

- `&&`（逻辑 AND）：两个条件同时满足
- `||`（逻辑 OR）：任意一个条件满足
- `!`（逻辑 NOT）：取反

例如，第一列大于 `10` 且第二列小于 `50`。

```sh
awk '$1 > 10 && $2 < 50' data.txt
```

例如，第一列等于 `10` 或者第三列等于 `banana`。

```sh
awk '$1 == 10 || $3 == "banana"' data.txt
```

例如，排除包含 `apple` 的行。

```sh
awk '!/apple/' data.txt
```

## 四、动作

[Actions](https://www.gnu.org/software/gawk/manual/html_node/Action-Overview.html) 是对匹配模式的行所执行的操作。`awk` 遇到匹配行时会执行指定的 [Actions](https://www.gnu.org/software/gawk/manual/html_node/Action-Overview.html)，例如[打印](https://www.gnu.org/software/gawk/manual/html_node/Print.html)、修改、计算等。[Actions](https://www.gnu.org/software/gawk/manual/html_node/Action-Overview.html) 通常写在 `{}` 中，并且可以包含多条命令。

`awk` 的基本结构：`pattern { action }`

- `pattern`：指定模式，用于匹配行。
- `{ action }`：指定动作，定义对匹配行的操作。

如果没有指定 `pattern`，默认匹配所有行。

如果没有指定 `action`，默认执行打印操作（即 `print $0`）。

### 打印

[`print`](https://www.gnu.org/software/gawk/manual/html_node/Print.html) 用于将指定的内容输出到标准输出或文件。`print` 语句非常灵活，可以输出文本字符串、变量、字段和表达式的值。

基本格式如下：

```
print item1, item2, ..., itemN
```

- **item**：要输出的内容，可以是字符串、字段值、变量、表达式等。
- 如果多个项目之间用逗号分隔，`awk` 会默认用 **输出字段分隔符**（`OFS`，默认为空格）将它们连接起来。
- 如果 `print` 语句没有指定任何内容，默认会打印当前行的全部内容。

例如，打印文件中的所有行。

```sh
awk '{print}' file.txt
```

例如，打印特定字段。打印文件中的第 `1` 列和第 `3` 列。

```sh
awk '{print $1, $3}' file.txt
```

例如，统计文件中的行数。

```sh
awk 'END {print NR}' file.txt
```

例如，简单数值计算。

```sh
awk '{sum += $2} END {print sum}' file.txt
```

### 条件语句

可以使用 [`if-else`](https://www.gnu.org/software/gawk/manual/html_node/If-Statement.html) 条件语句来控制逻辑。

例如，根据条件打印特定字段。

```sh
awk '{if ($1 > 20) print $1, $3; else print $1, $2}' data.txt
```

### 循环语句

`awk` 支持 [`for`](https://www.gnu.org/software/gawk/manual/html_node/For-Statement.html) 和 [`while`](https://www.gnu.org/software/gawk/manual/html_node/While-Statement.html) 循环，用于重复执行特定操作。

需注意，是每一行开启一次循环判断，循环的是该行的所有字段。

- **`for` 循环**

  例如，打印每个字段。

  ```sh
  awk '{for (i = 1; i <= NF; i++) print $i}' data.txt
  ```

- **`while` 循环**

  例如，打印字段直到值为 `40`。

  ```sh
  awk '{i = 1; while ($i != 40 && i <= NF) {print $i; i++}}' data.txt
  ```

### 修改字段

`awk` 可以直接修改字段的值。

例如，将第二列的值加 `10` 并打印。

```sh
awk '{$2 = $2 + 10; print}' data.txt
```

### 内置变量操作

`awk` 提供了一些内置变量，可以在 [Actions](https://www.gnu.org/software/gawk/manual/html_node/Action-Overview.html) 中使用：

| 变量名                                                       | 含义                             |
| ------------------------------------------------------------ | -------------------------------- |
| `$0`                                                         | 当前行的全部内容                 |
| `$1, $2`                                                     | 当前行的第 1 列、第 2 列（字段） |
| [`NF`](https://www.gnu.org/software/gawk/manual/html_node/Auto_002dset.html#index-NF-variable-1) | 当前行的字段数                   |
| [`NR`](https://www.gnu.org/software/gawk/manual/html_node/Auto_002dset.html#index-NR-variable-1) | 当前行号（从 1 开始）            |
| [`FNR`](https://www.gnu.org/software/gawk/manual/html_node/Auto_002dset.html#index-FNR-variable-1) | 当前文件的行号                   |
| [`FS`](https://www.gnu.org/software/gawk/manual/html_node/User_002dmodified.html#index-field-separator-1) | 输入字段分隔符（默认是空白）     |
| [`OFS`](https://www.gnu.org/software/gawk/manual/html_node/User_002dmodified.html#index-field-separator-2) | 输出字段分隔符（默认是空白）     |
| [`RS`](https://www.gnu.org/software/gawk/manual/html_node/User_002dmodified.html#index-record-separators-1) | 输入记录分隔符（默认是换行符）   |
| [`ORS`](https://www.gnu.org/software/gawk/manual/html_node/User_002dmodified.html#index-ORS-variable-1) | 输出记录分隔符（默认是换行符）   |

例如，打印当前行号。

```sh
awk '{print NR, $0}' data.txt
```

例如，使用自定义分隔符。

```sh
awk 'BEGIN {FS=","; OFS="|"} {print $1, $2}' data.csv
```

### 数学运算

`awk` 支持基本的数学运算：`+`, `-`, `*`, `/`, `%`。

例如，计算每行的两列之和。

```sh
awk '{sum = $1 + $2; print $1, $2, sum}' data.txt
```

### 数组操作

`awk` 支持关联数组（键值对）。

例如，统计每个单词出现的次数。

```sh
awk '{for (i = 1; i <= NF; i++) count[$i]++} END {for (word in count) print word, count[word]}' data.txt
```

### 自定义函数

可以在 `awk` 中[定义函数](https://www.gnu.org/software/gawk/manual/html_node/User_002ddefined.html)来复用代码。

例如，定义一个函数计算平方。

```sh
awk 'function square(x) {return x * x} {print $1, square($2)}' data.txt
```

## 五、环境变量

在 `awk` 中，环境变量是指可以从操作系统中获取的变量，或者在运行 `awk` 脚本时通过命令行传递的变量。这些变量可以用于动态地控制 `awk` 的行为，例如输入文件名、分隔符、过滤条件等。

### ENVIRON

`ENVIRON` 是一个关联数组，`ENVIRON["VAR_NAME"]` 的值对应于操作系统中的环境变量 `VAR_NAME`。

虽然 `ENVIRON` 数组可以访问环境变量，但不能直接通过 `ENVIRON` 修改系统的环境变量。即使修改了 `ENVIRON` 的值，也不会影响系统环境变量。

例如，打印所有环境变量。

```sh
awk 'BEGIN {for (var in ENVIRON) print var, ENVIRON[var]}'
```

例如，访问特定环境变量。

```sh
awk 'BEGIN {print "HOME:", ENVIRON["HOME"]; print "PATH:", ENVIRON["PATH"]}'
```

### 命令行传递

可以通过[命令行](https://www.gnu.org/software/gawk/manual/html_node/Options.html#index-_002dv-option)将自定义变量传递给 `awk`，这些变量可以在 `awk` 脚本中直接使用。

例如，传递变量并使用。

```sh
awk -v threshold=50 '{if ($1 > threshold) print $1}' data.txt
```

例如，传递多个变量。

```sh
awk -v min=30 -v max=70 '{if ($1 >= min && $1 <= max) print $1}' data.txt
```

## 六、正则表达式

### 括号表达式

[括号表达式](https://www.gnu.org/software/gawk/manual/html_node/Bracket-Expressions.html)匹配在开始和结束方括号之间列出的任何字符。

例如，通过 [`split`](https://www.gnu.org/software/gawk/manual/html_node/String-Functions.html#index-split_0028_0029-function) 按指定分隔符，把一行字符串分割成多个字段。

```sh
echo 123 | awk '{ split($0, arr, /[2]+/); for (i=1; i<=length(arr); i++) print arr[i] }'
echo 123 | awk '{ n=split($0, arr, /[2]+/); for(i=1; i<=n; i++) print arr[i] }'
```

[字符类](https://www.gnu.org/software/gawk/manual/html_node/Bracket-Expressions.html#table_002dchar_002dclasses)由表示类的关键字 `[:` 和 `:]` 组成。

例如，空格字符作为分隔符，把一行字符串分割成多个字段（`for...in` 遍历数组时，元素的顺序是不确定的，通常按哈希表顺序遍历）。

```sh
cat <<-EOF | awk '{ split($0, arr, /[[:space:]]+/); for (i in arr) print arr[i] }'
apple  banana    cherry
dog    elephant   fox
EOF
```

### 扩展正则

处理正则表达式的 GNU 软件提供了许多额外的正则表达式[运算符](https://www.gnu.org/software/gawk/manual/html_node/GNU-Regexp-Operators.html)。

在 `awk` 的正则表达式中，`[[:space:]]+` 和 `\s+` 在大多数环境下作用相同，但 `\s+` 需要 `awk` 支持[扩展正则表达式](https://www.gnu.org/software/gawk/manual/html_node/GNU-Regexp-Operators.html)（ERE），比如使用 `gawk`：

```sh
awk 'BEGIN { if ("a b  c" ~ /\s+/) print "match" }'
```

但 `\s+` 可能在某些 `awk` 版本（如 POSIX `awk`）中不被识别，因此 `[[:space:]]+` 更通用。

```sh
awk 'BEGIN { if ("a b  c" ~ /[[:space:]]+/) print "match" }'
```

## 七、示例

### 查看文件

查看文件的指定行数范围。

```sh
awk 'NR >= 10 && NR <= 50 { print NR, $0 }' data.txt
```

## Reference

- [AWK 简明教程 - 酷壳](https://coolshell.cn/articles/9070.html)

