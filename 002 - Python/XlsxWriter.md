# XlsxWriter

[XlsxWriter](https://github.com/jmcnamara/XlsxWriter) 是一个 Python 模块，用于编写 Excel 2007+ XLSX 文件格式的文件。

可以通过 `pip` 安装 [XlsxWriter](https://pypi.org/project/XlsxWriter/)：

```sh
pip install xlsxwriter
```

## 一、工作簿

### 创建文件

可以通过 [`Workbook()`](https://xlsxwriter.readthedocs.io/workbook.html#Workbook) 创建新的 XlsxWriter 工作簿对象。

```python
import xlsxwriter

workbook = xlsxwriter.Workbook('example.xlsx')
worksheet = workbook.add_worksheet()

worksheet.write(0, 0, 'test')
workbook.close()
```

## 二、数据操作

### 写入单元格

可以通过 [`worksheet.write()`](https://xlsxwriter.readthedocs.io/worksheet.html#write) 方法向单元格写入数据。

```python
import xlsxwriter

workbook = xlsxwriter.Workbook('test.xlsx')
worksheet = workbook.add_worksheet()
worksheet.write('A1', 'Hello')
worksheet.write('A2', 'World')
workbook.close()
```

### 写入行

可以通过 [`worksheet.write_row()`](https://xlsxwriter.readthedocs.io/worksheet.html#write_row) 方法向一行写入数据。

```python
import xlsxwriter

workbook = xlsxwriter.Workbook('test.xlsx')
worksheet = workbook.add_worksheet()

# 写入一行数据
data = ['Name', 'Age', 'City']
worksheet.write_row('A1', data)

# 写入多行数据
data = [
    ['Alice', 25, 'New York'],
    ['Bob', 30, 'Los Angeles'],
    ['Charlie', 35, 'Chicago']
]
for row_num, row_data in enumerate(data, 1):
    worksheet.write_row(row_num, 0, row_data)

workbook.close()
```

## 三、样式处理

### 单元格样式

可以通过 [`Format`](https://xlsxwriter.readthedocs.io/format.html#format-methods-and-format-properties) 设置单元格格式的方法和属性，再使用 [`worksheet.write()`](https://xlsxwriter.readthedocs.io/worksheet.html#write) 或 [`worksheet.set_column()`](https://xlsxwriter.readthedocs.io/worksheet.html#set_column) 应用格式。

```python
import xlsxwriter

workbook = xlsxwriter.Workbook('test.xlsx')
worksheet = workbook.add_worksheet()

bold = workbook.add_format({
    'font_name': '微软雅黑',
    'font_size': 14,
    'bold': True,
    'bg_color': '#92CDDC',
    'align': 'center',
    'valign': 'vcenter',
    'border': 1
})
worksheet.write('A1', 'Hello', bold)
workbook.close()
```

### 列宽行高

可以通过 [`worksheet.set_column()`](https://xlsxwriter.readthedocs.io/worksheet.html#set_column) 和 [`worksheet.set_row()`](https://xlsxwriter.readthedocs.io/worksheet.html#set_row) 方法设置列宽和行高。

```python
workbook = xlsxwriter.Workbook('test.xlsx')
worksheet = workbook.add_worksheet()

worksheet.set_column('A:A', 20)
worksheet.set_row(0, 30)

worksheet.write('A1', 'Hello')
workbook.close()
```

### 冻结和筛选

可以通过 [`worksheet.freeze_panes()`](https://xlsxwriter.readthedocs.io/worksheet.html#freeze_panes) 冻结窗格。

```python
workbook = xlsxwriter.Workbook('test.xlsx')
worksheet = workbook.add_worksheet()

worksheet.freeze_panes(1, 0)
worksheet.write('A1', 'Header')
worksheet.write('A2', 'Data')
workbook.close()
```

可以通过 [`worksheet.autofilter()`](https://xlsxwriter.readthedocs.io/worksheet.html#autofilter) 开启筛选。

```python
ws.autofilter(0, 0, 0, ws.dim_rowmax)
```

### 条件格式

可以通过 [`worksheet.conditional_format()`](https://xlsxwriter.readthedocs.io/worksheet.html#conditional_format) 设置[条件格式](https://xlsxwriter.readthedocs.io/working_with_conditional_formats.html#type)。

```python
ws.conditional_format(
    f'P2:P{ws.dim_rowmax + 1}',
    {
        'type': 'data_bar',
        'min_type': 'num',
        'min_value': 0,
        'max_type': 'num',
        'max_value': 1,
        'bar_color': '#63C384',
        'bar_solid': True
    }
)
```

