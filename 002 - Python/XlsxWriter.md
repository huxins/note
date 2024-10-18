# XlsxWriter

[XlsxWriter](https://github.com/jmcnamara/XlsxWriter) 是一个 Python 模块，用于编写 Excel 2007+ XLSX 文件格式的文件。

可以通过 `pip` 安装 [XlsxWriter](https://pypi.org/project/XlsxWriter/)：

```sh
pip install xlsxwriter
```

## 一、工作簿

### 生成文件

可以通过 [`Workbook()`](https://xlsxwriter.readthedocs.io/workbook.html#Workbook) 创建新的 XlsxWriter 工作簿对象。

```python
import xlsxwriter

workbook = xlsxwriter.Workbook('example.xlsx')
worksheet = workbook.add_worksheet()

worksheet.write(0, 0, 'test')
workbook.close()
```

