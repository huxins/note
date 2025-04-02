# dateutil

[dateutil](https://github.com/dateutil/dateutil) 模块为 Python 中的标准 [datetime](https://docs.python.org/zh-cn/3/library/datetime.html) 模块提供了强大的扩展。

**安装**：[`dateutil`](https://pypi.org/project/python-dateutil/)

```sh
pip install python-dateutil
```

## 相对时间

[`relativedelta`](https://dateutil.readthedocs.io/en/stable/relativedelta.html) 类型可以表示时间间隔。

获取上个月的同一天。

```python
from datetime import datetime
from dateutil.relativedelta import relativedelta

now = datetime.now()
last_month = now - relativedelta(months=1)

print("当前日期:", now.strftime("%Y-%m-%d"))
print("上月日期:", last_month.strftime("%Y-%m-%d"))
```

