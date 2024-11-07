# xlwings

[xlwings](https://github.com/xlwings/xlwings) 是一个 Python 库，可以轻松地从 Excel 调用 Python，反之亦然。

## 一、工作簿

[`xw.Book`](https://docs.xlwings.org/en/stable/api/book.html#xlwings.Book) 提供了连接到 Excel 工作簿的最简单方法。

当使用 `xw.Book` 时，它会在所有的 Excel 应用程序实例中查找指定的工作簿。

```python
app = xw.App(visible=False)
wb = xw.Book(file_path)
ws = wb.sheets[0]

wb.save()
wb.close()
app.quit()
```

## 二、数据操作

### 访问单元格

可以通过 [`ws.range()`](https://docs.xlwings.org/en/stable/api/sheet.html#xlwings.Sheet.range) 访问单元格。该方法返回一个 [`Range`](https://docs.xlwings.org/en/stable/api/range.html#xlwings.Range) 对象，表示一个单元格或一组单元格。

```python
app = xw.App(visible=False)
wb = xw.Book(file_path)
ws: xw.Sheet = wb.sheets[0]

cell = ws.range((1, 1))

wb.save()
wb.close()
app.quit()
```

