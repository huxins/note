# SQL

## 一、数据查询

### 1.1. SELECT

`SELECT` 用于检索从一个或多个表中选择的行。

```sql
SELECT * FROM users;
```

### 1.2. JOIN

#### 1.2.1. INNER JOIN

`INNER JOIN` 在没有连接条件的情况下，在指定的表之间产生笛卡尔积。在有连接条件的情况下，当两个表中存在匹配项时返回行。

#### 1.2.2. 笛卡尔积

两个集合 *X* 和 *Y* 的所有可能的有序对组成的集合，为笛卡儿积。即，第一个表中的每一行都连接到第二个表中的每一行。

```sql
SELECT
  *
FROM ( SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 ) AS digit
  JOIN ( SELECT 'a' UNION ALL SELECT 'b' UNION ALL SELECT 'c') AS letter;
```

#### 1.2.3. LEFT JOIN

`LEFT JOIN` 与 `INNER JOIN` 有所不同，`LEFT JOIN` 会读取左侧数据表的全部数据，即使右侧表中无对应数据。

#### 1.2.4. RIGHT JOIN

`RIGHT JOIN` 会读取右侧数据表的全部数据，即便左侧表无对应数据。

## 二、数据定义

### 2.1. 创建

#### 2.1.1. 创建数据库

`CREATE DATABASE` 创建一个具有给定名称的数据库。

```sql
CREATE DATABASE db_name;
```

指定字符集。

```sql
CREATE DATABASE db_name CHARACTER SET utf8mb4;
```

#### 2.1.2. 创建表

`CREATE TABLE` 创建一个具有给定名称的表。

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL
);
```

## 三、数据操作

### 3.1. 更新

#### 3.1.1. 更新表数据

`UPDATE` 可以修改表中行数据。

```sql
UPDATE users SET username = 'sky';
```

#### 3.1.2. 联表更新

多表 `UPDATE` 语句可以使用 `SELECT` 语句中允许的任何类型的联接，如 `LEFT JOIN`。

```mysql
UPDATE users
  LEFT JOIN tests ON tests.username = users.username
    SET users.password = tests.password;
```

