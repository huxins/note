# Excel



```
ADDRESS(ROW(), COLUMN()) 返回当前单元格的地址。
INDIRECT() 函数将该地址作为字符串输入，并返回该地址引用的单元格。
OFFSET() 函数以该单元格为参考点，向上移动一行，从而返回上一个单元格的引用。


```



## 一、函数

### 1.1. 查找

#### 1.1.1. INDEX

返回指定的行与列交叉处的单元格引用。

```sql
INDEX(reference, row_num, [column_num], [area_num])
```

  - *reference*

    对一个或多个单元格区域的引用。如果引用中的每个区域均只包含一行或一列，则 *row_num* 或 *column_num* 为可选参数。

  - *row_num*

    引用中某行的行号。

  - *column_num*

    引用中某列的列号。

  ```
  1、在行中，倒叙引用指定列的数据。=INDEX($D:$D, ROW($D$34)-COLUMNS($B$5:B5)+1)
  2、根据 MATCH 获取指定日期最大访客数的行号取出对应关键词数据。=INDEX(D:D, MATCH(MAXIFS(E:E, C:C, DATE(2023,6,1)), E:E, 0))
  ```

- **MATCH**(*lookup_value*, *lookup_array*, [*match_type*])

  搜索单元格区域中的项，然后返回该项在该区域中的相对位置。

  - *lookup_value*

    *lookup_array* 中要匹配的值。

  - *lookup_array*

    单元格区域或数组。

  - *match_type*

    `1` 完全匹配或次小，`0` 完全匹配，`-1` 完全匹配或次大。

  ```
  1、如果区域 A1:A3 包含值 5、7 和 38，找出 7 是该区域中的第几个项目。=MATCH(7, A1:A3, 0)
  2、E列为访客人数，C列为日期，通过 MAXIFS 筛选指定日期最大的访客数，通过 MATCH 获取行号。=MATCH(MAXIFS(E:E, C:C, DATE(2023,6,1)), E:E, 0)
  ```

- **OFFSET**(*reference*, *rows*, *cols*, [*height*], [*width*])

  返回对单元格或单元格区域中指定行数和列数的区域的引用。

  - *Reference*

    要基于偏移量的引用。引用必须引用单元格或相邻单元格区域。

  - *Rows*

    基于 *Reference* 的向上或向下行数。

  - *Cols*

    基于 *Reference* 的从左到右的列数。

  ```
  1、在行中，倒叙引用指定列的数据。=OFFSET($D$34, -(COLUMNS($B$5:B5)-1), 0)
  ```

- **VLOOKUP**(*lookup_value*, *table_array*, *column_index_num*, [*range_lookup*])

  在表格或区域中按行查找内容。例如，按部件号查找汽车部件的价格，或根据员工 ID 查找员工姓名。

  - *lookup_value*

    要查找的值。

  - *table_array*

    从中检索值的表。

  - *column_index_num*

    要返回的值的范围内的列号。

  - *range_lookup*

    默认为 `TRUE` 近似匹配。`FALSE` 为完全匹配。

  ```
  1、根据H3的值，在B4:E13的范围内查找相匹配的数据，选择第二列。=VLOOKUP(H3, B4:E13, 2, FALSE)
  ```

- **FILTER**(*array*, *include*, [*if_empty*])

  基于定义的条件筛选一系列数据。

  - *array*

    要过滤的引用单元格或数组。

  - *include*

    布尔数组，作为条件提供。

  - *if_empty*

    没有返回结果时返回的值。

  ```
  1、返回C列值等于H2的行。=FILTER(A5:D20, C5:C20=H2, "")
  ```

- **SORT**(*array*, [*sort_index*], [*sort_order*], [*by_col*])

  对某个区域或数组的内容进行排序。

  - *array*

    要排序的单元格区域或数组。

  - *sort_index*

    用于排序的列索引。

  - *sort_order*

    `1` 升序，`-1` 降序。默认为升序。

  - *by_col*

    `TRUE` 按列排序。`FALSE` 按行排序。默认为 `FALSE`。

  ```
  1、按分数降序排列。=SORT(B5:C14, 2)
  ```

- **INDIRECT**(*ref_text*, [*a1*])

  返回由文本字符串指定的引用。

  - *ref_text*

    作为文本提供的引用。

  - *a1*

    `A1` 或 `R1C1` 样式引用的布尔值。默认值为 `TRUE`，`A1` 样式；`FALSE` 为 `R1C1` 样式。

  ```
  1、根据指定行号和列号获取单元格引用，采用R1C1样式。=INDIRECT("R"&1&"C"&COLUMN()-1, FALSE)
  2、根据指定行号和列号获取单元格区域引用，采用R1C1样式。=INDIRECT("R2C5:R2C"&COLUMN()-1, FALSE)
  ```

- **ROW**([*reference*])

  返回引用的行号。

  - *Reference*

    需要得到其行号的单元格或单元格区域。如果省略，则假定是对自身所在单元格的引用。

  ```
  1、返回自身所在单元格的行号。=ROW()
  2、返回指定单元格的行号。=ROW(C10)
  ```

- **ROWS**(*array*)

  返回引用或数组的行数。

  - *Array*

    需要得到其行数的数组、数组公式或对单元格区域的引用。

  ```
  1、引用中的行数。=ROWS(C1:E4)
  ```

- **COLUMNS**(*array*)

  返回引用或数组的列数。

  - *Array*

    需要得到其列数的数组、数组公式或对单元格区域的引用。

  ```
  1、引用中的列数。=COLUMNS(C1:E4)
  ```

### 1.2. 数据库函数

- **DGET**(*database*, *field*, *criteria*)

  从列表或数据库的列中提取符合指定条件的单个值。

  - *database*

    构成列表或数据库的单元格区域，包括标题。

  - *field*

    指定函数所使用的列名或索引。

  - *criteria*

    所指定条件的单元格区域，包括标题。

  ```
  1、获取指定条件的数据。=DGET($C$2:$E$2370, "访客数", N2:O3)
  ```

### 1.3. 数学和三角函数

- **SUM**(*number1*, [*number2*], [*number3*], ...)

  将单个值、单元格引用或是区域相加，或者将三者的组合相加。

  - *number1* - 要求和的第一个值。
  - *number2* - 要求和的第二个值。
  - *number3* - 要求和的第三个值。

  ```
  1、SUM函数与区域引用一起使用。=SUM(A1:A5)
  ```

- **SUMIFS**(*sum_range*, *range1*, *criteria1*, [*range2*], [*criteria2*], ...)

  计算其满足多个条件的全部参数的总量。

  - *sum_range*

    要求和的单元格区域。

  - *range1*

    要筛选的第一个单元格区域。

  - *criteria1*

    在 *range1* 上使用的条件。

  - *range2*

    要筛选的第二个单元格区域。

  - *criteria2*

    在 *range2* 上使用的条件。

  ```
  1、获取指定条件的数据。此函数是汇总函数，但可匹配项多，可更好的替代 DGET。=SUMIFS($E$3:$E$2370, $C$3:$C$2370, B$2, $D$3:$D$2370, "手淘搜索")
  2、第一条是根据行汇总的，还可以根据列汇总。=SUMIFS(E2:AH2, E1:AH1, ">="&DATE(2023, 6, 1), E1:AH1, "<="&DATE(2023, 6, 30))
  ```

### 1.4. 逻辑函数

- **IF**(*logical_test*, [*value_if_true*], [*value_if_false*])

  - *logical_test*

    可以计算为 TRUE 或 FALSE 的值或逻辑表达式。

  - *value_if_true*

    当 *logical_test* 的计算结果为 TRUE 时要返回的值。

  - *value_if_false*

    当 *logical_test* 的计算结果为 FALSE 时返回的值。

  ```
  1、规避被除数为0的情况。=IF(B19=0, 0, B20/B19)
  ```

### 1.5. 时间和日期

- **DATE**(*year*, *month*, *day*)

  采用三个单独的值并将它们合并为一个日期。

  - *year* - 年。
  - *month* - 月。
  - *day* - 日。

  ```
  1、指定日期。=DATE(2022, 1, 1)
  ```

- **YEAR**(*date*)

  返回对应于某个日期的年份。

  - *date* - 有效的 Excel 日期。

  ```
  1、获取指定单元格引用的年份。=YEAR(A1)
  ```

- **MONTH**(*serial_number*)

  返回日期中的月份。

  - *serial_number* - 有效的 Excel 日期。

  ```
  1、获取指定单元格引用的月份。=MONTH(A1)
  ```

### 1.6. 统计函数

- **MAXIFS**(*max_range*, *range1*, *criteria1*, [*range2*], [*criteria2*], ...)

  根据条件获取最大值。

  - *max_range*

    确定最大值的实际单元格区域。例如销售金额。

  - *range1*

    要筛选的第一个单元格区域。

  - *criteria1*

    在 *range1* 上使用的条件。

  - *range2*

    要筛选的第二个单元格区域。

  - *criteria2*

    在 *range2* 上使用的条件。

  ```
  1、C列为日期，E列为访客数，获取指定日期的最大访客数。=MAXIFS(E:E, C:C, DATE(2023,6,1))
  ```

- **COUNTA**(*value1*, [*value2*], ...)

  计算单元格区域中不为空的单元格的个数。

  - *value1*

    要计数的第一个单元格区域。

  - *value2*

    要计数的其他单元格区域。

  ```
  1、获取指定单元格区域中不为空的单元格个数。=COUNTA(B5:B15)
  2、获取整行中不为空的单元格个数。=COUNTA(A:A)
  ```

