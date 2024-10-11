# openpyxl

[openpyxl](https://openpyxl.readthedocs.io/en/stable/) 是一个 Python 库，用于读取或写入 Excel 2010 xlsx、xlsm、xltx、xltm 文件。

可以通过 `pip` 安装 [openpyxl](https://pypi.org/project/openpyxl/)：

```sh
pip install openpyxl
```

## 一、工作簿

### 加载文件

可以使用 [`openpyxl.load_workbook()`](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.reader.excel.html#openpyxl.reader.excel.load_workbook) 方法来打开一个已存在的工作簿。

```python
from openpyxl import load_workbook

workbook = load_workbook(filename='test.xlsx')
print(workbook.sheetnames)
```

### 新建

可以通过 [`Workbook()`](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.workbook.workbook.html#openpyxl.workbook.workbook.Workbook) 新建一个工作簿。

```python
from openpyxl import Workbook

wb = Workbook()
ws = wb.active
ws.title = "New Title"
wb.save('test.xlsx')
```

## 二、数据操作

### 访问单元格

#### 批量

如果需要遍历文件中的所有行和列，可以使用 [`Worksheet.rows`](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.worksheet.worksheet.html#openpyxl.worksheet.worksheet.Worksheet.rows) 属性。

```python
from openpyxl import load_workbook

workbook = load_workbook(filename='test.xlsx')
worksheet = workbook['Sheet1']

for row in worksheet.rows:
    print(row[0].value)
```

也可以使用 [`Worksheet.iter_rows()`](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.worksheet.worksheet.html#openpyxl.worksheet.worksheet.Worksheet.iter_rows) 方法。

```python
headers = {cell.value: idx for idx, cell in enumerate(worksheet[1])}

for row in worksheet.iter_rows(min_row=2, values_only=True):
    name = row[headers['姓名']]
    department = row[headers['部门']]
    position = row[headers['职位']]
```

还可以直接通过[工作表的键](https://foss.heptapod.net/openpyxl/openpyxl/-/blob/5149e809daee6136cdcf95cea34072221ee7616e/openpyxl/worksheet/worksheet.py#L275)来访问单元格。

```python
worksheet = workbook['Sheet1']

# 获取第一行数据
worksheet[1]
```

#### 单个

可以通过 [`Worksheet.cell()`](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.worksheet.worksheet.html#openpyxl.worksheet.worksheet.Worksheet.cell) 访问单元格。

```python
from openpyxl import load_workbook

workbook = load_workbook(filename='test.xlsx')
worksheet = workbook['Sheet1']

value = worksheet.cell(row=1, column=1).value
print(value)
```

### 修改单元格

可以通过 [`Cell.value`](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.cell.cell.html#openpyxl.cell.cell.Cell.value) 属性修改单元格的值。

```python
from openpyxl import load_workbook

workbook = load_workbook(filename='test.xlsx')
worksheet = workbook['Sheet1']

worksheet.cell(row=1, column=1).value = 'new value'
workbook.save('test.xlsx')
```

还可以直接通过 [`Worksheet.cell()`](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.worksheet.worksheet.html#openpyxl.worksheet.worksheet.Worksheet.cell) 设置单元格的值。

```python
from openpyxl import load_workbook

workbook = load_workbook(filename='test.xlsx')
worksheet = workbook['Sheet1']

worksheet.cell(row=1, column=1, value='new value')
workbook.save('test.xlsx')
```

### Pandas

[`dataframe_to_rows()`](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.utils.dataframe.html#openpyxl.utils.dataframe.dataframe_to_rows) 提供了一种使用 Pandas [`Dataframe`](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html#pandas.DataFrame) 的简单方法。

```python
import pandas as pd
from openpyxl.utils.dataframe import dataframe_to_rows
from openpyxl.workbook import Workbook

data = {
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, 35],
    'City': ['New York', 'Los Angeles', 'Chicago']
}
df = pd.DataFrame(data)

wb = Workbook()
ws = wb.active

for r in dataframe_to_rows(df, index=False, header=True):
    ws.append(r)

wb.save("output.xlsx")
```

## 三、样式处理

### 背景颜色

可以通过 [`PatternFill`](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.styles.fills.html#openpyxl.styles.fills.PatternFill) 配置背景颜色。

```python
fill = PatternFill(start_color='FFF2CC', end_color='FFF2CC', fill_type="solid")
ws.cell(row=1, column=1).fill = fill
```

### 合并单元格

可以使用 [`merge_cells`](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.worksheet.worksheet.html#openpyxl.worksheet.worksheet.Worksheet.merge_cells) 合并单元格，并通过改变左上单元格来定义值和样式。

```python
ws.merge_cells(start_row=start_row, start_column=1, end_row=end_row, end_column=1)
```

## Reference

- [renmu123/openpyxl-chinese-docs](https://openpyxl-chinese-docs.readthedocs.io/zh-cn/latest/)

