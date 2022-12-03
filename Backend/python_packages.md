# Python Packages


## 3. PyMySQL

### 3.1. 安装

使用 `pip` 安装：

```sh
$ python3 -m pip install PyMySQL
```

### 3.2. 例子

#### 3.2.1. 数据库连接

```python
import pymysql.cursors

connection = pymysql.connect(host='localhost',
                             user='user',
                             password='passwd',
                             database='db',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)
```

#### 3.2.2. 数据新增操作

```python
with connection:
    with connection.cursor() as cursor:
        sql = "INSERT INTO `users` (`email`, `password`) VALUES (%s, %s)"
        cursor.execute(sql, ('webmaster@python.org', 'very-secret'))

    connection.commit()
```

#### 3.2.3. 数据查询操作

```python
with connection:
    with connection.cursor() as cursor:
        sql = "SELECT `id`, `password` FROM `users` WHERE `email`=%s"
        cursor.execute(sql, ('webmaster@python.org',))
        result = cursor.fetchone()
        print(result)
```

