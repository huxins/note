# Microsoft Excel

[Microsoft Excel](https://support.microsoft.com/zh-cn/excel) 是 Microsoft 为使用 Windows 和 macOS 操作系统的电脑编写的一款电子表格软件。

## 一、函数

### 查找和引用

#### ROW

返回引用的行号。

```sql
=ROW(A5)
-- Result: 5
```

#### ROWS

返回引用中包含的行数。

```sql
=ROWS(C1:E4)
-- Result: 4
```

#### COLUMN

返回引用的列号。

```sql
=COLUMN(C5)
-- Result: 3
```

#### COLUMNS

返回引用中包含的列数。

```sql
=COLUMNS(C1:E4)
-- Result: 3
```

#### ADDRESS

根据指定行号和列号获得工作表中的某个单元格的地址。

```sql
=ADDRESS(2, 3)
-- Result: $C$2
```

可以使用其他函数，如 `ROW` 和 `COLUMN` 函数为 `ADDRESS` 函数提供行号和列号参数。

```sql
=ADDRESS(ROW(), COLUMN())
```

#### INDIRECT

返回由文本字符串指定的引用。

```sql
-- A1 样式引用
=INDIRECT("A1")

-- R1C1 样式引用
=INDIRECT("R1C1", FALSE)
```

#### OFFSET

从给定引用中，按偏移量返回引用。

```sql
OFFSET(reference, rows, cols, [height], [width])
```

例如，在 D3 引用的基础上，加上偏移量。

```sql
=OFFSET(D3, -2, -3)
-- Result: A1
```

例如，在行中，倒叙引用指定列的数据。

```sql
=OFFSET($D$34, -(COLUMNS($B$5:B5) - 1), 0)
```

#### INDEX

使用索引从引用或数组中选择值。

```sql
INDEX(reference, row_num, [column_num], [area_num])
```

例如，在行中，倒叙引用指定列的数据。

```sql
=INDEX($D:$D, ROW($D$34) - COLUMNS($B$5:B5) + 1)
```

例如，根据 MATCH 获取指定日期最大访客数的行号取出对应关键词数据。

```sql
=INDEX(D:D, MATCH(MAXIFS(E:E, C:C, DATE(2023, 6, 1)), E:E, 0))
```

#### MATCH

在引用或数组中查找值，返回该项在该区域中的相对位置。

```sql
MATCH(lookup_value, lookup_array, [match_type])
```

- **match_type**：`1` 完全匹配或次小，`0` 完全匹配，`-1` 完全匹配或次大。

例如，区域 A1:A3 包含值 5、7 和 38，找出 7 是该区域中的第几个项目。

```sql
=MATCH(7, A1:A3, 0)
```

例如，E 列为访客人数，C 列为日期，通过 `MAXIFS` 筛选指定日期最大的访客数，通过 `MATCH` 获取行号。

```sql
=MATCH(MAXIFS(E:E, C:C, DATE(2023,6,1)), E:E, 0)
```

#### VLOOKUP

在数组第一列中查找，然后在行之间移动以返回单元格的值。

```sql
VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])
```

- **range_lookup**：默认为 `TRUE` 近似匹配。`FALSE` 为完全匹配。

例如，根据 H3 的值，在 B4:E13 的范围内查找相匹配的数据，选择第二列。

```sql
=VLOOKUP(H3, B4:E13, 2, FALSE)
```

#### FILTER

基于定义的条件筛选一系列数据。

```sql
=FILTER(array, include, [if_empty])
```

例如，返回 C 列值等于 H2 的行。

```sql
=FILTER(A5:D20, C5:C20=H2, "")
```

#### SORT

对区域或数组的内容进行排序。

```sql
SORT(array, [sort_index], [sort_order], [by_col])
```

- **sort_order**：`1` 升序，`-1` 降序。默认为升序。
- **by_col**：`TRUE` 按列排序。`FALSE` 按行排序。默认为 `FALSE`。

例如，按分数降序排列。

```sql
=SORT(B5:C14, 2)
```

### 数据库函数

#### DGET

从数据库提取符合指定条件的单个记录。

```sql
DGET(database, field, criteria)
```

- **database**：构成列表或数据库的单元格区域，包括标题。
- **field**：指定函数所使用的列名或索引。
- **criteria**：所指定条件的单元格区域，包括标题。

例如，获取指定条件的数据。

```sql
=DGET($C$2:$E$2370, "访客数", N2:O3)
```

### 数学函数

#### SUM

求参数的和。将单个值、单元格引用或区域相加，或者将三者的组合相加。

```sql
SUM(number1, [number2], ...)
```

例如。

```sql
=SUM(A1:A5)
```

#### SUMIFS

计算满足多个条件的全部参数的总量。

```sql
SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)
```

例如，获取指定条件的数据。此函数是汇总函数，但可匹配项多，可更好的替代 DGET。

```sql
=SUMIFS($E$3:$E$2370, $C$3:$C$2370, B$2, $D$3:$D$2370, "手淘搜索")
```

还可以根据列汇总。

```sql
=SUMIFS(E2:AH2, E1:AH1, ">="&DATE(2023, 6, 1), E1:AH1, "<="&DATE(2023, 6, 30))
```

### 逻辑函数

#### IF

指定要执行的逻辑检测。

```sql
IF(logical_test, value_if_true, [value_if_false])
```

例如，规避被除数为 0 的情况。

```sql
=IF(B19=0, 0, B20/B19)
```

### 时间和日期

#### DATE

采用三个单独的值并将它们合并为一个日期。

```sql
DATE(year, month, day)
```

例如，指定日期。

```sql
=DATE(2022, 1, 1)
```

#### YEAR

返回对应于某个日期的年份。

例如，获取指定单元格引用的年份。

```sql
=YEAR(A1)
```

#### MONTH

返回日期中的月份。

例如，获取指定单元格引用的月份。

```sql
=MONTH(A1)
```

### 统计函数

#### MAXIFS

返回一组给定条件或标准指定的单元格中的最大值。

```sql
MAXIFS(max_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)
```

例如，C 列为日期，E 列为访客数，获取指定日期的最大访客数。

```sql
=MAXIFS(E:E, C:C, DATE(2023, 6, 1))
```

#### COUNTA

计算单元格区域中不为空的单元格的个数。

```sql
COUNTA(value1, [value2], ...)
```

例如，获取指定单元格区域中不为空的单元格个数。

```sql
=COUNTA(B5:B15)
```

例如，获取整列中不为空的单元格个数。

```sql
=COUNTA(A:A)
```

## 二、快捷键

使用 Excel 的[键盘快捷方式](https://support.microsoft.com/zh-cn/office/1798d9d5-842a-42b8-9c99-9b7213f0040f)可以提高工作效率。

| Command                                                      | Key                     |
| ------------------------------------------------------------ | ----------------------- |
| 移到工作表的开头                                             | `Ctrl + Home`           |
| 移到工作表的结尾                                             | `Ctrl + End`            |
| 移到当前数据区域边缘                                         | `Ctrl + 箭头键`         |
| 选择整行                                                     | `Shift + 空格键`        |
| 选择整个表                                                   | `Ctrl + A`              |
| [扩展单元格的选定范围](https://support.microsoft.com/zh-cn/office/1798d9d5-842a-42b8-9c99-9b7213f0040f#bkmk_selectwin) | `Ctrl + Shift + 箭头键` |
| 填充颜色                                                     | `Alt + H + H`           |
| [打开或关闭筛选](https://support.microsoft.com/zh-cn/office/d6ae119c-5fab-4b7f-8869-6ef02ece71f5#bkmk_keyboardshortcuts_win) | `Ctrl + Shift + L`      |
| [更改列宽以自动适合内容](https://support.microsoft.com/zh-cn/office/72f5e3cc-994d-43e8-ae58-9774a0905f46) | `Alt + H + O + I`       |

