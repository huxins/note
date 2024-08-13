# Microsoft Excel

[Microsoft Excel](https://support.microsoft.com/zh-cn/excel) 是 Microsoft 为使用 Windows 和 macOS 操作系统的电脑编写的一款电子表格软件。

## 一、函数

### 查找和引用

#### 行信息

[`ROW`](https://support.microsoft.com/zh-cn/office/3a63b74a-c4d0-4093-b49a-e76eb49a6d8d) 函数返回引用的行号。

```sql
=ROW(A5)
-- Result: 5
```

[`ROWS`](https://support.microsoft.com/zh-cn/office/b592593e-3fc2-47f2-bec1-bda493811597) 函数返回引用中包含的行数。

```sql
=ROWS(C1:E4)
-- Result: 4
```

#### 列信息

[`COLUMN`](https://support.microsoft.com/zh-cn/office/44e8c754-711c-4df3-9da4-47a55042554b) 函数返回引用的列号。

```sql
=COLUMN(C5)
-- Result: 3
```

[`COLUMNS`](https://support.microsoft.com/zh-cn/office/4e8e7b4e-e603-43e8-b177-956088fa48ca) 函数返回引用中包含的列数。

```sql
=COLUMNS(C1:E4)
-- Result: 3
```

#### 指定引用

[`ADDRESS`](https://support.microsoft.com/zh-cn/office/d0c26c0d-3991-446b-8de4-ab46431d4f89) 函数根据指定行号和列号，以文本形式返回工作表中的某个单元格的地址。

```sql
=ADDRESS(2, 3)
-- Result: $C$2
```

可以使用其他函数，如 [`ROW`](https://support.microsoft.com/zh-cn/office/3a63b74a-c4d0-4093-b49a-e76eb49a6d8d) 和 [`COLUMN`](https://support.microsoft.com/zh-cn/office/44e8c754-711c-4df3-9da4-47a55042554b) 函数为 [`ADDRESS`](https://support.microsoft.com/zh-cn/office/d0c26c0d-3991-446b-8de4-ab46431d4f89) 函数提供行号和列号参数。

```sql
=ADDRESS(ROW(), COLUMN())
```

[`INDIRECT`](https://support.microsoft.com/zh-cn/office/474b3a3a-8a26-4f44-b491-92b6306fa261) 函数返回由文本字符串指定的引用。

```sql
-- A1 样式引用
=INDIRECT("A1")

-- R1C1 样式引用
=INDIRECT("R1C1", FALSE)
```

可以使用其他函数，如 [`ADDRESS`](https://support.microsoft.com/zh-cn/office/d0c26c0d-3991-446b-8de4-ab46431d4f89) 函数为 [`INDIRECT`](https://support.microsoft.com/zh-cn/office/474b3a3a-8a26-4f44-b491-92b6306fa261) 函数提供参数。

[`OFFSET`](https://support.microsoft.com/zh-cn/office/c8de19ae-dd79-4b9b-a14e-b4d906d11b66) 函数从给定引用中，按偏移量返回引用。

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

[`INDEX`](https://support.microsoft.com/zh-cn/office/a5dcf0dd-996d-40a4-a822-b56b061328bd) 函数使用索引从引用或数组中选择值。

```sql
INDEX(reference, row_num, [column_num], [area_num])
```

例如，在行中，倒叙引用指定列的数据。

```sql
=INDEX($D:$D, ROW($D$34) - COLUMNS($B$5:B5) + 1)
```

#### 查找引用

[`MATCH`](https://support.microsoft.com/zh-cn/office/e8dffd45-c762-47d6-bf89-533f4a37673a) 函数在引用或数组中查找值，返回该项在该区域中的相对位置。

```sql
MATCH(lookup_value, lookup_array, [match_type])
```

- **match_type**：`1` 完全匹配或次小，`0` 完全匹配，`-1` 完全匹配或次大。

例如，区域 A1:A3 包含值 5、7 和 38，找出 7 是该区域中的第几个项目。

```sql
=MATCH(7, A1:A3, 0)
```

例如，E 列为访客人数，C 列为日期，通过 [`MAXIFS`](https://support.microsoft.com/zh-cn/office/dfd611e6-da2c-488a-919b-9b6376b28883) 筛选指定日期最大的访客数，通过 [`MATCH`](https://support.microsoft.com/zh-cn/office/e8dffd45-c762-47d6-bf89-533f4a37673a) 获取行号。

```sql
=MATCH(MAXIFS(E:E, C:C, DATE(2023,6,1)), E:E, 0)
```

例如，根据 [`MATCH`](https://support.microsoft.com/zh-cn/office/e8dffd45-c762-47d6-bf89-533f4a37673a) 获取指定日期最大访客数的行号，配合 [`INDEX`](https://support.microsoft.com/zh-cn/office/a5dcf0dd-996d-40a4-a822-b56b061328bd) 函数，取出对应关键词数据。

```sql
=INDEX(D:D, MATCH(MAXIFS(E:E, C:C, DATE(2023, 6, 1)), E:E, 0))
```

[`VLOOKUP`](https://support.microsoft.com/zh-cn/office/0bbc8083-26fe-4963-8ab8-93a18ad188a1) 函数在数组第一列中查找，然后在行之间移动以返回单元格的值。

```sql
VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])
```

- **range_lookup**：默认为 `TRUE` 近似匹配。`FALSE` 为完全匹配。

例如，根据 H3 的值，在 B4:E13 的范围内查找相匹配的数据，选择第二列。

```sql
=VLOOKUP(H3, B4:E13, 2, FALSE)
```

[`FILTER`](https://support.microsoft.com/zh-cn/office/f4f7cb66-82eb-4767-8f7c-4877ad80c759) 函数基于定义的条件筛选一系列数据。

```sql
=FILTER(array, include, [if_empty])
```

例如，返回 C 列值等于 H2 的行。

```sql
=FILTER(A5:D20, C5:C20=H2, "")
```

#### 排序

[`SORT`](https://support.microsoft.com/zh-cn/office/22f63bd0-ccc8-492f-953d-c20e8e44b86c) 对区域或数组的内容进行排序。

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

[`DGET`](https://exceljet.net/functions/dget-function) 函数从数据库提取符合指定条件的单个记录。

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

#### 求和

[`SUM`](https://support.microsoft.com/zh-cn/office/043e1c7d-7726-4e80-8f32-07b23e057f89) 函数用于求参数的和。将单个值、单元格引用或区域相加，或者将三者的组合相加。

```sql
SUM(number1, [number2], ...)
```

例如。

```sql
=SUM(A1:A5)
```

[`SUMIFS`](https://support.microsoft.com/zh-cn/office/c9e748f5-7ea7-455d-9406-611cebce642b) 函数用于计算满足多个条件的全部参数的总量。

```sql
SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)
```

例如，获取指定条件的数据。此函数是汇总函数，但可匹配项多，可更好的替代 [`DGET`](https://exceljet.net/functions/dget-function) 函数。

```sql
=SUMIFS($E$3:$E$2370, $C$3:$C$2370, B$2, $D$3:$D$2370, "手淘搜索")
```

还可以根据列汇总。

```sql
=SUMIFS(E2:AH2, E1:AH1, ">="&DATE(2023, 6, 1), E1:AH1, "<="&DATE(2023, 6, 30))
```

### 逻辑函数

#### 逻辑检测

[`IF`](https://support.microsoft.com/zh-cn/office/69aed7c9-4e8a-4755-a9bc-aa8bbff73be2) 函数指定要执行的逻辑检测。

```sql
IF(logical_test, value_if_true, [value_if_false])
```

例如，规避被除数为 0 的情况。

```sql
=IF(B19=0, 0, B20/B19)
```

### 时间和日期

#### 生成日期

[`DATE`](https://support.microsoft.com/zh-cn/office/e36c0c8c-4104-49da-ab83-82328b832349) 函数采用三个单独的值并将它们合并为一个日期。

```sql
DATE(year, month, day)
```

例如，指定日期。

```sql
=DATE(2022, 1, 1)
```

[`TODAY`](https://support.microsoft.com/zh-cn/office/5eb3078d-a82c-4736-8930-2f51a028fdd9) 函数返回今天日期的序列号。

```sql
=TODAY()
```

#### 提取日期

[`YEAR`](https://support.microsoft.com/zh-cn/office/c64f017a-1354-490d-981f-578e8ec8d3b9) 函数返回对应于某个日期的年份。

例如，获取指定单元格引用的年份。

```sql
=YEAR(A1)
```

[`MONTH`](https://support.microsoft.com/zh-cn/office/579a2881-199b-48b2-ab90-ddba0eba86e8) 函数返回日期中的月份。

例如，获取指定单元格引用的月份。

```sql
=MONTH(A1)
```

#### 比较日期

[`DATEDIF`](https://support.microsoft.com/zh-cn/office/25dba1a4-2812-480b-84dd-8b32a451b35c) 函数用于计算两个日期之间相隔的天数、月数或年数。

```sql
DATEDIF(start_date, end_date, unit)
```

例如，计算[以月为单位的差值](https://support.microsoft.com/zh-cn/office/8235e7c9-b430-44ca-9425-46100a162f38#ID0EDDBBL)。

```sql
=DATEDIF(B3, TODAY(), "m")
```

### 统计函数

#### 最大值

[`MAXIFS`](https://support.microsoft.com/zh-cn/office/dfd611e6-da2c-488a-919b-9b6376b28883) 函数返回一组给定条件或标准指定的单元格中的最大值。

```sql
MAXIFS(max_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)
```

例如，C 列为日期，E 列为访客数，获取指定日期的最大访客数。

```sql
=MAXIFS(E:E, C:C, DATE(2023, 6, 1))
```

#### 单元格数量

[`COUNTA`](https://support.microsoft.com/zh-cn/office/7dc98875-d5c1-46f1-9a82-53f3219e2509) 函数计算单元格区域中不为空的单元格的个数。

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

| Command                                                      | Key                     | 分类           |
| ------------------------------------------------------------ | ----------------------- | -------------- |
| 移到工作表的开头                                             | `Ctrl + Home`           | 当前选定单元格 |
| 移到工作表的结尾                                             | `Ctrl + End`            | 当前选定单元格 |
| 移到当前数据区域边缘                                         | `Ctrl + 箭头键`         | 当前选定单元格 |
| 选择整行                                                     | `Shift + 空格键`        | 区域选择       |
| 选择整个表                                                   | `Ctrl + A`              | 区域选择       |
| [扩展单元格的选定范围](https://support.microsoft.com/zh-cn/office/1798d9d5-842a-42b8-9c99-9b7213f0040f#bkmk_selectwin) | `Ctrl + Shift + 箭头键` | 区域选择       |
| 填充颜色                                                     | `Alt + H + H`           | 样式           |
| [更改列宽以自动适合内容](https://support.microsoft.com/zh-cn/office/72f5e3cc-994d-43e8-ae58-9774a0905f46) | `Alt + H + O + I`       | 样式           |
| [打开或关闭筛选](https://support.microsoft.com/zh-cn/office/d6ae119c-5fab-4b7f-8869-6ef02ece71f5#bkmk_keyboardshortcuts_win) | `Ctrl + Shift + L`      | 筛选           |

