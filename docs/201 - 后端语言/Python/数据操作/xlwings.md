# xlwings

[xlwings](https://github.com/xlwings/xlwings) 可以轻松地从 Excel 调用 Python，反之亦然。

## 一、Book

[`xw.Book`](https://docs.xlwings.org/en/stable/api/book.html#xlwings.Book) 提供了连接到 Excel 工作簿的最简单方法。

```python
wb = xw.Book(file_path)  # 自动创建隐式App实例
ws = wb.sheets[0]

wb.save()
wb.close()
wb.app.quit()  # 通过工作簿关联的App实例退出
```

## 二、Sheet

### Cell

[`ws.range()`](https://docs.xlwings.org/en/stable/api/sheet.html#xlwings.Sheet.range) 作为核心单元格定位接口，返回的 [`Range`](https://docs.xlwings.org/en/stable/api/range.html#xlwings.Range) 对象封装了单/多单元格操作能力，支持数据读写、格式设置及范围计算等统一访问模式。

```python
app = xw.App(visible=False)
wb = xw.Book(file_path)
ws: xw.Sheet = wb.sheets[0]

cell = ws.range((1, 1))

wb.save()
wb.close()
app.quit()
```

