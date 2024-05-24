# PyMySQL

## 一、安装

```sh
$ python -m pip install PyMySQL
```

## 二、数据库连接

```python
import pymysql.cursors

connection = pymysql.connect(
    host='localhost',
    user='user',
    password='passwd',
    database='db',
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor
)
```

## 三、数据新增操作

```python
with connection:
    with connection.cursor() as cursor:
        sql = "INSERT INTO `users` (`email`, `password`) VALUES (%s, %s)"
        cursor.execute(sql, ('webmaster@python.org', 'very-secret'))

    connection.commit()
```

## 四、数据查询操作

```python
with connection:
    with connection.cursor() as cursor:
        sql = "SELECT `id`, `password` FROM `users` WHERE `email`=%s"
        cursor.execute(sql, ('webmaster@python.org',))
        result = cursor.fetchone()
        print(result)
```

