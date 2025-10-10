# SQL

## 一、数据查询

### SELECT

[`SELECT`](https://dev.mysql.com/doc/refman/5.7/en/select.html) 用于检索从一个或多个表中选择的行。

```sql
SELECT * FROM users;
```

#### DISTINCT

处理完选择列表后，结果表可以选择性地消除重复行。`DISTINCT` 关键字直接写在 `SELECT` 之后以指定：

```sql
SELECT DISTINCT select_list ...
```

### JOIN

#### INNER JOIN

`INNER JOIN` 在没有连接条件的情况下，在指定的表之间产生笛卡尔积。在有连接条件的情况下，当两个表中存在匹配项时返回行。

#### LEFT JOIN

`LEFT JOIN` 与 `INNER JOIN` 有所不同，`LEFT JOIN` 会读取左侧数据表的全部数据，即使右侧表中无对应数据。

#### RIGHT JOIN

`RIGHT JOIN` 会读取右侧数据表的全部数据，即便左侧表无对应数据。

#### 笛卡尔积

两个集合 *X* 和 *Y* 的所有可能的有序对组成的集合，为笛卡儿积。即，第一个表中的每一行都连接到第二个表中的每一行。

```sql
SELECT
  *
FROM ( SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 ) AS digit
  JOIN ( SELECT 'a' UNION ALL SELECT 'b' UNION ALL SELECT 'c') AS letter;
```

### 子查询

#### EXISTS

如果子查询返回任何行，则 [`EXISTS`](https://dev.mysql.com/doc/refman/5.7/en/exists-and-not-exists-subqueries.html) 子查询为 `TRUE`，`NOT EXISTS` 子查询为 `FALSE`。

```sql
SELECT column1 FROM t1 WHERE EXISTS (SELECT * FROM t2);
```

## 二、数据定义

### 数据库

#### 创建数据库

[`CREATE DATABASE`](https://dev.mysql.com/doc/refman/5.7/en/create-database.html) 创建一个具有给定名称的数据库。

```sql
CREATE DATABASE db_name;
```

指定字符集。

```sql
CREATE DATABASE db_name CHARACTER SET utf8mb4;
```

#### 销毁数据库

使用命令 [`DROP DATABASE`](https://dev.mysql.com/doc/refman/5.7/en/drop-database.html) 销毁数据库。

```sql
DROP DATABASE name;
```

### 数据表

#### 创建表

[`CREATE TABLE`](https://dev.mysql.com/doc/refman/5.7/en/create-table.html) 创建一个具有给定名称的表。

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL
);
```

从查询的结果创建一个新表需要用到 `CREATE TABLE AS` 命令。

```sql
CREATE TABLE order_new AS
  SELECT * FROM order_old WHERE date_prod >= '2002-01-01';
```

`SELECT INTO FROM` 在功能上与 `CREATE TABLE AS` 相似。

```sql
SELECT * INTO order_new FROM order_old WHERE date_prod >= '2002-01-01';
```

##### 默认值

一个列可以被分配一个默认值。当一个新行被创建且没有为某些列指定值时，这些列将会被它们相应的默认值填充。

如果没有显式指定默认值，则默认值是 `null`。

```sql
CREATE TABLE products (
    product_no integer,
    name text,
    price numeric DEFAULT 9.99
);
```

默认值可以是一个表达式，它将在任何需要插入默认值的时候被实时计算。

例如在 PostgreSQL 中，为每一行生成一个*序列号*。

```sql
CREATE TABLE products (
    product_no integer DEFAULT nextval('products_product_no_seq'),
    name text
);
```

#### 删除表

如果不再需要某个表，可以通过 [`DROP TABLE`](https://dev.mysql.com/doc/refman/5.7/en/drop-table.html) 命令来移除它。

```sql
DROP TABLE my_first_table;
```

尝试移除一个不存在的表会引起错误，发生错误忽略即可。如果介意，可以使用 `DROP TABLE IF EXISTS` 变体来防止出现错误消息，但这并非标准 SQL。

```sql
DROP TABLE IF EXISTS my_first_table;
```

#### 修改表

##### 添加列

要添加列，请使用如下命令：

```sql
ALTER TABLE products ADD COLUMN description text;
```

还可以使用通常的语法同时在列上定义约束：

```sql
ALTER TABLE products ADD COLUMN description text CHECK (description <> '');
```

还可以使用通常的语法同时为列定义默认值：

```sql
ALTER TABLE products ADD COLUMN description text DEFAULT '';
```

##### 删除列

要删除列，请使用如下命令：

```sql
ALTER TABLE products DROP COLUMN description;
```

列中的任何数据都会消失，涉及该列的表约束也被删除。

##### 添加约束

要添加约束，请使用表约束语法。

```sql
ALTER TABLE products ADD CHECK (name <> '');
ALTER TABLE products ADD CONSTRAINT some_name UNIQUE (product_no);
ALTER TABLE products ADD FOREIGN KEY (product_group_id) REFERENCES product_groups;
```

要增加一个不能写成表约束的非空约束，请使用以下语法：

```sql
ALTER TABLE products ALTER COLUMN product_no SET NOT NULL;
```

##### 删除约束

要删除约束，需要知道它的名称。移除非空约束之外的所有约束：

```sql
ALTER TABLE products DROP CONSTRAINT some_name;
```

移除非空约束：

```sql
ALTER TABLE products ALTER COLUMN product_no DROP NOT NULL;
```

##### 更改默认值

要为列设置新的默认值，请使用如下命令：

```sql
ALTER TABLE products ALTER COLUMN description SET DEFAULT '';
```

这不会影响任何表中已经存在的行，它只是为未来的 `INSERT` 命令改变了默认值。

要删除任何默认值，请使用：

```sql
ALTER TABLE products ALTER COLUMN description DROP DEFAULT;
```

##### 更改数据类型

要将列转换为不同的数据类型，请使用如下命令：

```sql
ALTER TABLE products ALTER COLUMN name TYPE varchar(70);
```

##### 重命名列

要重命名列：

```sql
ALTER TABLE products RENAME COLUMN product_no TO product_number;
```

##### 重命名表

要重命名表：

```sql
ALTER TABLE products RENAME TO items;
```

## 三、数据操作

### 更新数据

#### 表数据

[`UPDATE`](https://dev.mysql.com/doc/refman/5.7/en/update.html) 可以修改表中行数据。

```sql
UPDATE users SET username = 'sky';
UPDATE products SET price = 10 WHERE price = 5;
```

#### 联表更新

多表 `UPDATE` 语句可以使用 `SELECT` 语句中允许的任何类型的联接，如 `LEFT JOIN`。

```mysql
UPDATE users
  LEFT JOIN tests ON tests.username = users.username
    SET users.password = tests.password;
```

PostgreSQL 不支持在联表更新中使用 `JOIN`，使用以下的形式进行联表更新。

```postgresql
UPDATE products ps SET price = po.number FROM productionorder po
  WHERE ps.name = po.barcode;

UPDATE products ps SET price = (SELECT number FROM productionorder po WHERE po.barcode = ps.name)
  WHERE ps.name = 'SCDT202115309';
```

### 新增数据

以此表为例：

```sql
CREATE TABLE products (
    product_no integer,
    name text,
    price numeric
);
```

插入一行，数据的值按照这些列在表中出现的顺序列出的，并且用逗号分隔。

```sql
INSERT INTO products VALUES (1, 'Cheese', 9.99);
```

显式地列出列：

```sql
INSERT INTO products (product_no, name, price) VALUES (1, 'Cheese', 9.99);
```

如果没有获得部分列的值，将被填充为它们的缺省值。为了保持清晰，也可以显式地要求缺省值，用于单个的列或者用于整个行：

```sql
INSERT INTO products (product_no, name, price) VALUES (1, 'Cheese', DEFAULT);
INSERT INTO products DEFAULT VALUES;
```

插入多行：

```sql
INSERT INTO products (product_no, name, price) VALUES
  (1, 'Cheese', 9.99),
  (2, 'Bread', 1.99),
  (3, 'Milk', 2.99);
```

插入查询结果：

`INSERT INTO SELECT` 语句从一个表复制数据，然后把数据插入到一个已存在的表中。

```sql
INSERT INTO products (product_no, name, price)
  SELECT product_no, name, price FROM old_products
    WHERE release_date = 'today';
```

### 删除数据

使用 [`DELETE`](https://dev.mysql.com/doc/refman/5.7/en/delete.html) 命令删除行，语法与 `UPDATE` 命令非常相似。

例如，要从产品表中删除价格为 `10` 的所有行，请使用：

```sql
DELETE FROM products WHERE price = 10;
```

删除表中的所有行：

```sql
DELETE FROM products;
```

截断表：

```sql
TRUNCATE TABLE products;
```

