# openpyxl

[openpyxl](https://openpyxl.readthedocs.io/en/stable/) 是一个 Python 库，用于读取或写入 Excel 2010 xlsx、xlsm、xltx、xltm 文件。

- [renmu123/openpyxl-chinese-docs](https://openpyxl-chinese-docs.readthedocs.io/zh-cn/latest/)

可以通过 `pip` 安装 [openpyxl](https://pypi.org/project/openpyxl/)：

```sh
pip install openpyxl
```

## 一、工作表

### 从文件加载

可以使用 [`openpyxl.load_workbook()`](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.reader.excel.html#openpyxl.reader.excel.load_workbook) 方法来打开一个已存在的工作簿。

```python
from openpyxl import load_workbook

workbook = load_workbook(filename='test.xlsx')
print(workbook.sheetnames)
```

### 读取工作表

需要遍历文件中的所有行和列，可以使用 [`Worksheet.rows`](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.worksheet.worksheet.html#openpyxl.worksheet.worksheet.Worksheet.rows) 属性。

```python
from openpyxl import load_workbook

workbook = load_workbook(filename='test.xlsx')
worksheet = workbook['Sheet1']

for row in worksheet.rows:
    print(row[0].value)
```

### 访问单元格

可以通过 [`Worksheet.cell()`](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.worksheet.worksheet.html#openpyxl.worksheet.worksheet.Worksheet.cell) 访问单元格。

```python
from openpyxl import load_workbook

workbook = load_workbook(filename='test.xlsx')
worksheet = workbook['Sheet1']

value = worksheet.cell(row=1, column=1).value
print(value)
```

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

