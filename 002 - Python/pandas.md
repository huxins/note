# pandas

[pandas](https://pandas.pydata.org/) 是一个快速、强大、灵活、易于使用的开源数据分析和操作工具。

## 一、数据结构

### DataFrame

[`DataFrame`](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html#pandas.DataFrame) 是一种二维标记数据结构，其中列的类型可能不同。可以把它想象成电子表格或 SQL 表。

`DataFrame` 接受许多不同类型的输入：

- 字典中的列表

  如下所示，`data` 是一个字典，键是 `Name`、`Age` 和 `City`，对应的值是列表，这些列表将成为 `DataFrame` 的列。

  ```python
  import pandas as pd
  
  data = {
      'Name': ['Alice', 'Bob', 'Charlie'],
      'Age': [25, 30, 35],
      'City': ['New York', 'Los Angeles', 'Chicago']
  }
  df = pd.DataFrame(data)
  
  print(df)
  ```

- 列表中的字典

  如下所示，`data` 是一个列表，其中的每一个元素都是一个字典。这个列表中的字典表示的是 `DataFrame` 的每一行的数据。

  ```python
  import pandas as pd
  
  data = [
      {'Name': 'Alice', 'Age': 25, 'City': 'New York'},
      {'Name': 'Bob', 'Age': 30, 'City': 'Los Angeles'},
      {'Name': 'Charles', 'Age': 35, 'City': 'Chicago'},
  ]
  df = pd.DataFrame(data)
  
  print(df)
  ```

## 二、访问数据

可以将 `DataFrame` 在语义上视为字典。

### 列数据

[获取、设置和删除列](https://pandas.pydata.org/docs/user_guide/dsintro.html#column-selection-addition-deletion)的语法与类似的 `dict` 操作相同。

例如，访问列数据。

```python
import pandas as pd

data = [
    {'Name': 'Alice', 'Age': 25, 'City': 'New York'},
    {'Name': 'Bob', 'Age': 30, 'City': 'Los Angeles'},
    {'Name': 'Charles', 'Age': 35, 'City': 'Chicago'},
]
df = pd.DataFrame(data)

print(df['Name'])
```

### 行数据

行数据的访问，基于[索引](https://pandas.pydata.org/docs/user_guide/dsintro.html#indexing-selection)。

例如，访问行数据，基于标签的索引。

```python
import pandas as pd

data = [
    {'Name': 'Alice', 'Age': 25, 'City': 'New York'},
    {'Name': 'Bob', 'Age': 30, 'City': 'Los Angeles'},
    {'Name': 'Charles', 'Age': 35, 'City': 'Chicago'},
]
df = pd.DataFrame(data, index=['Alice', 'Bob', 'Charles'])

print(df.loc['Alice'])
```

例如，访问行数据，基于位置的索引。

```python
import pandas as pd

data = [
    {'Name': 'Alice', 'Age': 25, 'City': 'New York'},
    {'Name': 'Bob', 'Age': 30, 'City': 'Los Angeles'},
    {'Name': 'Charles', 'Age': 35, 'City': 'Chicago'},
]
df = pd.DataFrame(data)

print(df.iloc[0])
```

## 三、新增数据

### 列数据

```python
import pandas as pd

data = [
    {'Name': 'Alice', 'Age': 25, 'City': 'New York'},
    {'Name': 'Bob', 'Age': 30, 'City': 'Los Angeles'},
    {'Name': 'Charles', 'Age': 35, 'City': 'Chicago'},
]
df = pd.DataFrame(data)

df['Salary'] = [70000, 80000, 90000]
print(df)
```

## 四、数据处理

### 数据筛选

常见的操作是使用[布尔向量](https://pandas.pydata.org/docs/user_guide/indexing.html#boolean-indexing)来过滤数据。

```python
import pandas as pd

data = [
    {'Name': 'Alice', 'Age': 25, 'City': 'New York'},
    {'Name': 'Bob', 'Age': 30, 'City': 'Los Angeles'},
    {'Name': 'Charles', 'Age': 35, 'City': 'Chicago'},
]
df = pd.DataFrame(data)

print(df[df['Age'] > 30])
```

### 数据统计

```python
import pandas as pd

data = [
    {'Name': 'Alice', 'Age': 25, 'City': 'New York'},
    {'Name': 'Bob', 'Age': 30, 'City': 'Los Angeles'},
    {'Name': 'Charles', 'Age': 35, 'City': 'Chicago'},
]
df = pd.DataFrame(data)

df['Salary'] = [70000, 80000, 90000]

print(df.describe())
```

### 数据排序

可以通过创建[有序分类](https://pandas.pydata.org/docs/reference/api/pandas.Categorical.html#pandas.Categorical)数据，进行[数据排序](https://pandas.pydata.org/docs/user_guide/categorical.html#sorting-and-order)。

```python
import pandas as pd

size = pd.Categorical(['small', 'medium', 'large', 'small'], categories=['small', 'medium', 'large'], ordered=True)
print(size)
```

例如，通过定义分类顺序，将 `DataFrame` 中的排序列转换为分类数据类型，并进行排序。

```python
import pandas as pd

data = {
    '姓名': ['张三', '李四', '王五', '赵六'],
    '部门': ['财务部', '销售部', 'IT部', '设计部']
}
df = pd.DataFrame(data)

department_order = ["财务部", "设计部", "销售部", "IT部"]
df['部门'] = pd.Categorical(df['部门'], categories=department_order, ordered=True)
df.sort_values(by='部门', inplace=True)

print(df)
```

