# openpyxl

[openpyxl](https://openpyxl.readthedocs.io/en/stable/) 用于读取或写入 Excel 2010 xlsx/xlsm/xltx/xltm 文件。

**安装**：[`openpyxl`](https://pypi.org/project/openpyxl/)

```sh
pip install openpyxl
```

## 一、Workbook

可通过调用 [`Workbook()`](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.workbook.workbook.html#openpyxl.workbook.workbook.Workbook) 构造函数[创建新工作簿实例](https://openpyxl.readthedocs.io/en/stable/tutorial.html#create-a-workbook)。

```python
from openpyxl import Workbook

wb = Workbook()
ws = wb.active
ws.title = "New Title"
wb.save('test.xlsx')
```

通过调用 `Workbook` 对象的 [`save()`](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.workbook.workbook.html#openpyxl.workbook.workbook.Workbook.save) 方法实现[工作簿的安全保存](https://openpyxl.readthedocs.io/en/stable/tutorial.html#saving-to-a-file)。

```python
wb = Workbook()
wb.save('balances.xlsx')
```

可通过调用 [`openpyxl.load_workbook()`](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.reader.excel.html#openpyxl.reader.excel.load_workbook) 函数[加载现有工作簿实例](https://openpyxl.readthedocs.io/en/stable/tutorial.html#loading-from-a-file)。

```python
from openpyxl import load_workbook

workbook = load_workbook(filename='test.xlsx')
print(workbook.sheetnames)
```

## 二、Worksheet

### One cell

[`Worksheet.cell()`](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.worksheet.worksheet.html#openpyxl.worksheet.worksheet.Worksheet.cell) 方法提供对工作表中[单个单元格的访问](https://openpyxl.readthedocs.io/en/stable/tutorial.html#accessing-one-cell)。

```python
from openpyxl import load_workbook

workbook = load_workbook(filename='test.xlsx')
worksheet = workbook['Sheet1']

# 访问/创建 B5 单元格
cell = ws.cell(row=5, column=2)

# 创建时初始化值
cell = ws.cell(row=3, column=4, value="Initial Data")

# 链式操作（设置字体样式）
ws.cell(row=2, column=1).font = Font(color="FF0000")
# 链式操作（设置单元格值）
ws.cell(row=1, column=1).value = 'new value'

# 获取单元格值
value = worksheet.cell(row=1, column=1).value
print(value)
```

### Many cells

可以使用[切片](https://foss.heptapod.net/openpyxl/openpyxl/-/blob/branch/default/openpyxl/worksheet/worksheet.py?ref_type=heads#L275)访问单元格范围，实现[多个单元格的访问](https://openpyxl.readthedocs.io/en/stable/tutorial.html#accessing-many-cells)。

```python
worksheet = workbook['Sheet1']

# 获取第一行数据
worksheet[1]
```

可以使用 [`Worksheet.rows`](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.worksheet.worksheet.html#openpyxl.worksheet.worksheet.Worksheet.rows) 和 [`Worksheet.columns`](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.worksheet.worksheet.html#openpyxl.worksheet.worksheet.Worksheet.columns) 遍历文件中的所有行和列。

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

### Pandas

[`dataframe_to_rows()`](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.utils.dataframe.html#openpyxl.utils.dataframe.dataframe_to_rows) 函数提供了将 Pandas [`Dataframe`](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html#pandas.DataFrame) 转换为行数据的[标准化方法](https://openpyxl.readthedocs.io/en/stable/pandas.html#working-with-pandas-dataframes)。

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

### Formula

[Formualae](https://openpyxl.readthedocs.io/en/stable/simple_formulae.html) 也可以被解析和修改。

```python
from openpyxl import Workbook

wb = Workbook()
ws = wb.active

ws['A1'] = 10
ws['A2'] = 20
ws['A3'] = '=SUM(A1:A2)'

wb.save('formula_example.xlsx')
```

当需要动态引用每一行时，可通过 [`ws.max_row`](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.worksheet.worksheet.html#openpyxl.worksheet.worksheet.Worksheet.max_row) 获取当前已写入的最大行索引。

```python
last_row = ws.max_row
ws[f'O{last_row}'] = f"=L{last_row}+N{last_row}-M{last_row}"
```

## 三、样式

[样式](https://openpyxl.readthedocs.io/en/stable/styles.html)支持以下配置项：

- 字体属性（字号、颜色、下划线）
- 填充样式（图案/渐变色）
- 单元格边框
- 对齐方式

### 字体

可以通过 [`Font`](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.styles.fonts.html#openpyxl.styles.fonts.Font) 配置字体大小、颜色等。

```python
font = Font(name='Arial', bold=True, color='FF0000', size=12)
ws.cell(row=1, column=1).font = font
```

### 背景填充

可以通过 [`PatternFill`](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.styles.fills.html#openpyxl.styles.fills.PatternFill) 配置背景填充颜色。

```python
fill = PatternFill(start_color='FFF2CC', end_color='FFF2CC', fill_type="solid")
ws.cell(row=1, column=1).fill = fill
```

### 单元格边框

可以通过 [`Border`](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.styles.borders.html#openpyxl.styles.borders.Border) 配置单元格边框。

```python
thin_border = Border(
    left=Side(style='thin'),
    right=Side(style='thin'),
    top=Side(style='thin'),
    bottom=Side(style='thin')
)

ws.cell(row=1, column=1).border = thin_border
```

可以使用 `ws.sheet_view.showGridLines` 属性来隐藏网格线。

```python
ws.sheet_view.showGridLines = False
```

### 对齐方式

可以通过 [`Alignment`](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.styles.alignment.html#openpyxl.styles.alignment.Alignment) 配置单元格对齐方式。

```python
alignment = Alignment(horizontal='center', vertical='center')
ws.cell(row=1, column=1).alignment = alignment
```

### 列宽行高

可以通过 [`ColumnDimension`](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.worksheet.dimensions.html#openpyxl.worksheet.dimensions.ColumnDimension) 或 [`RowDimension`](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.worksheet.dimensions.html#openpyxl.worksheet.dimensions.RowDimension) 修改单个行和列的属性，例如宽度和高度。

```python
column_dimension = ws.column_dimensions['A']
column_dimension.width = 20

row_dimension = ws.row_dimensions[1]
row_dimension.height = 30
```

其中 `column_dimensions` 是 [`Worksheet`](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.worksheet.worksheet.html#openpyxl.worksheet.worksheet.Worksheet) 对象的一个属性，它用于访问工作表的 [`DimensionHolder`](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.worksheet.dimensions.html#openpyxl.worksheet.dimensions.DimensionHolder) 对象。可以把它看作是一个专门用于保存 [`ColumnDimension`](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.worksheet.dimensions.html#openpyxl.worksheet.dimensions.ColumnDimension) 或 [`RowDimension`](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.worksheet.dimensions.html#openpyxl.worksheet.dimensions.RowDimension) 的字典。

通常通过 `ws.column_dimensions[col_letter]` 来访问或设置某一列的属性。注意，设置的宽度和实际生成的列宽，存在 0.62 的误差。

```python
column_widths = [12.75, 37.25, 16.75, 10]
for i, width in enumerate(column_widths, 1):
    ws.column_dimensions[chr(64 + i)].width = width + 0.62
```

可以通过 [`Cell.column_letter`](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.cell.cell.html#openpyxl.cell.cell.Cell.column_letter) 属性，获取指定单元格的列号。

```python
col_letter = ws.cell(row=1, column=1).column_letter
```

## 四、格式

### 数字格式

可以使用 [`NumberFormat`](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.styles.numbers.html#openpyxl.styles.numbers.NumberFormat) 属性来设置[单元格的格式](https://openpyxl.readthedocs.io/en/stable/styles.html#using-number-formats)。

```python
cell.number_format = 'yyyy-mm-dd'
cell.number_format = '#,##0'
```

### 条件格式

可以通过 [`ConditionalFormatting`](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.formatting.formatting.html#openpyxl.formatting.formatting.ConditionalFormatting) 来使用[条件格式](https://openpyxl.readthedocs.io/en/stable/formatting.html)。

- [**FormulaRule**](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.formatting.rule.html#openpyxl.formatting.rule.FormulaRule)

  在表格中设置斑马条纹。
  
  ```python
  zebra_fill = PatternFill(start_color="DCE6F1", end_color="DCE6F1", fill_type="solid")
  zebra_rule = FormulaRule(formula=['ISODD(ROW())'], fill=zebra_fill)
  ws.conditional_formatting.add(f"A2:{ws.dimensions.split(':')[1]}", zebra_rule)
  ```
  
- [**DataBar**](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.formatting.rule.html#openpyxl.formatting.rule.DataBar)

  将百分比展示为数据条。
  
  ```python
  min_val = FormatObject(type='min')
  max_val = FormatObject(type='max')
  data_bar = DataBar(cfvo=[min_val, max_val], color="63C384", minLength=0, maxLength=100)
  rule = Rule(type='dataBar', dataBar=data_bar)
  ws.conditional_formatting.add('P2:P{}'.format(ws.max_row), rule)
  ```

  可以通过 [`DataBarRule`](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.formatting.rule.html#openpyxl.formatting.rule.DataBarRule) 函数快捷创建数据条规则。
  
  ```python
  rule = DataBarRule(start_type='min', end_type='max', color='63C384', minLength=0, maxLength=100)
  ws.conditional_formatting.add('P2:P{}'.format(ws.max_row), rule)
  ```
  
  数据条[仅支持渐变填充](https://foss.heptapod.net/openpyxl/openpyxl/-/issues/891)，不支持实心填充。这与微软自 OOXML 规范发布以来添加的格式扩展有关。

### 合并单元格

可以使用 [`merge_cells()`](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.worksheet.worksheet.html#openpyxl.worksheet.worksheet.Worksheet.merge_cells) 合并单元格，并通过改变左上单元格来[定义值和样式](https://openpyxl.readthedocs.io/en/stable/styles.html#styling-merged-cells)。

```python
ws.merge_cells(start_row=start_row, start_column=1, end_row=end_row, end_column=1)
```

### 冻结和筛选

可以通过 [`freeze_panes()`](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.worksheet.worksheet.html#openpyxl.worksheet.worksheet.Worksheet.freeze_panes) 配置冻结区域，例如冻结首行。

```python
ws.freeze_panes = ws['A2']
```

可以通过 `auto_filter` 开启筛选。

```python
ws.auto_filter.ref = ws.dimensions
```

## Reference

- [文档列表](https://openpyxl.readthedocs.io/en/stable/_sources/index.rst.txt#:~:text=tutorial)
- [renmu123/openpyxl-chinese-docs](https://openpyxl-chinese-docs.readthedocs.io/zh-cn/latest/)

