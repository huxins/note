# chinese-calendar

[chinese-calendar](https://github.com/LKI/chinese-calendar) 库用于判断日期是不是法定节假日或法定工作日。

可以通过 `pip` 安装 [chinese-calendar](https://pypi.org/project/chinesecalendar/)：

```python
pip install chinesecalendar
```

## 一、工作日

通过 `is_workday` 函数，可以判断指定日期是否为工作日。

```python
import datetime
from chinese_calendar import is_workday

is_workday(datetime.date(2024, 5, 1))  # False
```

通过 `get_workdays` 函数，可以计算两个日期之间的工作日天数。

```python
import datetime
from chinese_calendar import get_workdays

start_of_month = datetime.date(2024, 8, 1)
end_of_month = datetime.date(2024, 8, 31)

len(get_workdays(start_of_month, end_of_month))
```

