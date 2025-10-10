# holidays

[holidays](https://github.com/vacanza/python-holidays) 库用于在 Python 中生成和处理假期。

**安装**：[`holidays`](https://pypi.org/project/holidays/)

```sh
pip install --upgrade holidays
```

## 法定节假日

如果日期为周一到周五，且为法定节假日时，返回 `True`。

```python
cn_holidays = holidays.country_holidays('CN')

datetime.date(2024, 5, 1) in cn_holidays  # True
datetime.date(2024, 5, 4) in cn_holidays  # False
```

