# PostgreSQL

## 一、教程

### 1. 入门

#### 1.1. 安装

- Red Hat

  ```sh
  $ yum install https://download.postgresql.org/pub/repos/yum/reporpms/EL-7-x86_64/pgdg-redhat-repo-latest.noarch.rpm
  $ yum install postgresql10-server
  ```

  切换腾讯镜像源进行网络加速：

  ```sh
  $ sed -i 's|download.postgresql.org/pub|mirrors.cloud.tencent.com/postgresql|g' /etc/yum.repos.d/pgdg-redhat-all.repo
  ```

## 二、SQL 语言

### 5. 数据定义

#### 5.1. 表基础

创建一个表，需要用到 `CREATE TABLE` 命令。在这个命令中，我们需要为表指定一个名字，以及列的名字及数据类型。例如：

```sql
CREATE TABLE my_first_table (
    first_column text,
    second_column integer
);
```

从查询的结果创建一个新表需要用到 `CREATE TABLE AS` 命令：

```sql
CREATE TABLE order_new AS
  SELECT * FROM order_old WHERE date_prod >= '2002-01-01';
```

`SELECT INTO` 在功能上与 `CREATE TABLE AS` 相似：

```sql
SELECT * INTO order_new FROM order_old WHERE date_prod >= '2002-01-01';
```

如果不再需要某个表，可以通过 `DROP TABLE` 命令来移除它。例如：

```sql
DROP TABLE my_first_table;
```

尝试移除一个不存在的表会引起错误，发生错误忽略即可。如果介意，可以使用 `DROP TABLE IF EXISTS` 变体来防止出现错误消息，但这并非标准 SQL。

```sql
DROP TABLE IF EXISTS my_first_table;
```

#### 5.2. 默认值

一个列可以被分配一个默认值。当一个新行被创建且没有为某些列指定值时，这些列将会被它们相应的默认值填充。

如果没有显式指定默认值，则默认值是 *null*。

```sql
CREATE TABLE products (
    product_no integer,
    name text,
    price numeric DEFAULT 9.99
);
```

默认值可以是一个表达式，它将在任何需要插入默认值的时候被实时计算。例如为每一行生成一个*序列号*：

```sql
CREATE TABLE products (
    product_no integer DEFAULT nextval('products_product_no_seq'),
    name text
);
```

#### 5.4. 约束条件

##### 5.4.1. 检查约束

检查约束是最通用的约束类型。它允许我们指定特定列中的值必须满足布尔表达式。例如，为了要求正值的产品价格，我们可以使用：

```sql
CREATE TABLE products (
    product_no integer,
    name text,
    price numeric CHECK (price > 0)
);
```

可以给约束一个独立的名称。这会使错误消息更为清晰，同时也允许我们在需要更改约束时能引用它：

```sql
CREATE TABLE products (
    product_no integer,
    name text,
    price numeric CONSTRAINT positive_price CHECK (price > 0)
);
```

一个检查约束也可以引用多个列。例如我们存储一个普通价格和一个打折后的价格，而我们希望保证打折后的价格低于普通价格：

```sql
CREATE TABLE products (
    product_no integer,
    name text,
    price numeric CHECK (price > 0),
    discounted_price numeric CHECK (discounted_price > 0),
    CHECK (price > discounted_price)
);
```

一个检查约束在其检查表达式值为 *true* 或 *null* 值时被满足。

##### 5.4.2. 非空约束

一个非空约束仅仅指定一个列中不会有空值：

```sql
CREATE TABLE products (
    product_no integer NOT NULL,
    name text NOT NULL,
    price numeric
);
```

##### 5.4.3. 唯一约束

唯一约束保证在一列或一组列中保存的数据在表中所有行间是唯一的：

```sql
CREATE TABLE products (
    product_no integer UNIQUE,
    name text,
    price numeric
);
```

为一组列定义一个唯一约束，把它写作一个表级约束，列名用逗号分隔：

```sql
CREATE TABLE products (
    product_no integer,
    name text,
    UNIQUE (product_no, name)
);
```

这指定这些列的组合值在整个表的范围内是唯一的，但其中任意一列的值并不需要是唯一的。

为一个唯一约束命名：

```sql
CREATE TABLE products (
    product_no integer CONSTRAINT must_be_different UNIQUE,
    name text,
    price numeric
);
```

增加一个唯一约束会在约束列或列组上自动创建一个唯一 *B-tree* 索引。

##### 5.4.4. 主键

主键约束保证在一列或一组列中可以用作表中行的唯一标识符。这要求值既是唯一的又是非空的。因此，以下两个表定义接受相同的数据：

```sql
CREATE TABLE products (
    product_no integer UNIQUE NOT NULL,
    name text,
    price numeric
);
```

```sql
CREATE TABLE products (
    product_no integer PRIMARY KEY,
    name text,
    price numeric
);
```

主键也可以包含多于一个列，其语法和唯一约束相似：

```sql
CREATE TABLE products (
    product_no integer,
    name text,
    PRIMARY KEY (product_no, name)
);
```

增加一个主键将自动在主键中列出的列或列组上创建一个唯一 *B-tree* 索引。并且会强制这些列被标记为 `NOT NULL`。

一个表最多只能有一个主键。关系数据库理论要求每一个表都要有一个主键。但 PostgreSQL 中并未强制要求这一点，但是最好能够遵循它。

##### 5.4.5. 外键

外键约束指定一列或一组列中的值必须匹配出现在另一个表中某些行的值。

```sql
CREATE TABLE products (
    product_no integer PRIMARY KEY,
    name text,
    price numeric
);

CREATE TABLE orders (
    order_id integer PRIMARY KEY,
    product_no integer REFERENCES products (product_no),
    quantity integer
);
```

#### 5.6. 修改表

##### 5.6.1. 添加列

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

##### 5.6.2. 删除列

要删除列，请使用如下命令：

```sql
ALTER TABLE products DROP COLUMN description;
```

列中的任何数据都会消失。涉及该列的表约束也被删除。

##### 5.6.3. 添加约束

要添加约束，请使用表约束语法。例如：

```sql
ALTER TABLE products ADD CHECK (name <> '');
ALTER TABLE products ADD CONSTRAINT some_name UNIQUE (product_no);
ALTER TABLE products ADD FOREIGN KEY (product_group_id) REFERENCES product_groups;
```

要增加一个不能写成表约束的非空约束，请使用以下语法：

```sql
ALTER TABLE products ALTER COLUMN product_no SET NOT NULL;
```

##### 5.6.4. 删除约束

要删除约束，您需要知道它的名称。移除非空约束之外的所有约束：

```sql
ALTER TABLE products DROP CONSTRAINT some_name;
```

移除非空约束：

```sql
ALTER TABLE products ALTER COLUMN product_no DROP NOT NULL;
```

##### 5.6.5. 更改列的默认值

要为列设置新的默认值，请使用如下命令：

```sql
ALTER TABLE products ALTER COLUMN description SET DEFAULT '';
```

这不会影响任何表中已经存在的行，它只是为未来的 `INSERT` 命令改变了默认值。

要删除任何默认值，请使用：

```sql
ALTER TABLE products ALTER COLUMN description DROP DEFAULT;
```

##### 5.6.6. 更改列的数据类型

要将列转换为不同的数据类型，请使用如下命令：

```sql
ALTER TABLE products ALTER COLUMN name TYPE varchar(70);
```

##### 5.6.7. 重命名列

要重命名列：

```sql
ALTER TABLE products RENAME COLUMN product_no TO product_number;
```

##### 5.6.8. 重命名表

要重命名表：

```sql
ALTER TABLE products RENAME TO items;
```

### 6. 数据操作

#### 6.1. 插入数据

以此表为例：

```sql
CREATE TABLE products (
    product_no integer,
    name text,
    price numeric
);
```

插入一行，数据的值按照这些列在表中出现的顺序列出的，并且用逗号分隔：

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

```sql
INSERT INTO products (product_no, name, price)
  SELECT product_no, name, price FROM new_products
    WHERE release_date = 'today';
```

#### 6.2. 更新数据

```sql
UPDATE products SET price = 10 WHERE price = 5;
```

联表更新：

```sql
UPDATE products ps SET price = po.number FROM productionorder po
  WHERE ps.name = po.barcode;

UPDATE products ps SET price = (SELECT number FROM productionorder po WHERE po.barcode = ps.name)
  WHERE ps.name = 'SCDT202115309';
```

#### 6.3. 删除数据

使用 `DELETE` 命令删除行；语法与 `UPDATE` 命令非常相似。例如，要从产品表中删除价格为 10 的所有行，请使用：

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

### 7. 查询

#### 7.1. 概述

一种简单的查询具有以下形式：

```sql
SELECT * FROM products;
```

#### 7.3. 选择列表

##### 7.3.3. DISTINCT

处理完选择列表后，结果表可以选择性地消除重复行。DISTINCT 关键字直接写在 SELECT 之后以指定：

```sql
SELECT DISTINCT select_list ...
```

### 9. 函数和运算符

#### 9.17. 序列操作函数

序列是一个数据库对象，本质上是一个自增器。序列在其他同类型数据库软件中以 `autoincrment` 值的形式存在。序列对象中包含当前值，和一些独特属性，例如如何递增或递减。序列不能直接访问，需要通过 PostgreSQL 中的相关函数来操作它们。

本节描述用于操作序列对象的函数，也称为序列生成器或序列。序列对象是使用 `CREATE SEQUENCE` 创建的特殊单行表。序列对象通常用于为表的行生成唯一标识符。

- `nextval` ( `regclass` ) → `bigint`

  将序列对象前进到它的下一个值并返回该值。
  
- `setval` ( `regclass`, `bigint` [, `boolean` ] ) → `bigint`

  设置序列的当前值。
  
- `currval` ( `regclass` ) → `bigint`

  返回指定序列最近使用 `nextval` 获得的值，即 *last_value*。

##### 9.17.1. 创建序列

```
CREATE SEQUENCE sequence_name
    [ INCREMENT increment ]    -- 自增数，默认是 1
    [ MINVALUE minvalue ]      -- 最小值
    [ MAXVALUE maxvalue ]      -- 最大值
    [ START start ]            -- 起始值
    [ CACHE cache ]            -- 是否预先缓存
    [ CYCLE ]                  -- 到达最大值时，是否重新返回到最小值
```

序列使用的是整型数值。创建一个简单的序列：

```sql
CREATE SEQUENCE sequence_name MINVALUE 0;
```

##### 9.17.2. 查看序列

`psql` 的 `\d` 命令输出一个数据库对象，包括序列，表，视图和索引。你还可以使用 `\ds` 命令只查看当前数据库的所有序列。

序列就像表和视图一样，拥有自己的结构，只不过它的结构是固定的。

查询 `sequence_name` 的 `last_value`：

```sql
SELECT last_value FROM sequence_name;
```

##### 9.17.3. 删除序列

```sql
DROP SEQUENCE sequence_name;
```

如果该序列无法直接删除，可以查询是否被数据库中的其他对象引用：

```sql
SELECT p.relname, a.adsrc FROM pg_class p
  JOIN pg_attrdef a on p.relfilenode = a.adrelid
  WHERE a.adsrc ~ 'sequence_name';
```


## 三、服务器管理

### 20. 服务器配置

#### 20.1. 设置参数

##### 20.1.2. 通过配置文件进行参数交互

设置这些参数的最基本方法是编辑文件 `postgresql.conf`，该文件通常保存在数据目录中。

#### 20.3. 连接和身份验证

##### 20.3.1. 连接设置

- `listen_addresses` (`string`)

  指定服务器在哪些 TCP/IP 地址上监听客户端连接。该值采用逗号分隔的主机名或数字 IP 地址列表的形式。特殊条目 `*` 对应于所有可用的 IP 接口。

### 21. 客户端认证

#### 21.1. `pg_hba.conf` 文件

客户端身份验证由一个配置文件控制，该文件通常名为 `pg_hba.conf` 并存储在数据库集簇的数据目录中。

`pg_hba.conf` 文件的格式是一组记录，每行一个。空白行将被忽略，`#` 注释字符之后的任何文本也是如此。

每条记录指定一种连接类型、一个数据库名称、一个用户名、一个客户端 IP 地址范围以及对匹配这些参数的连接使用的认证方法。

记录可以是下面格式之一：

```
host    all             all             127.0.0.1/32            trust
host    database        user            address                 auth-method  [auth-options]
```

#### 21.3. 身份验证方法

PostgreSQL 提供了多种验证用户的方法：

- Trust authentication，简单的信任用户声称的身份。
- Password authentication，需要用户提供密码。

#### 21.5. 密码认证

有几种基于密码的身份验证方法。这些方法的操作类似，但不同之处在于用户密码如何存储在服务器上以及客户端提供的密码如何通过连接发送。

- `scram-sha-256`

  `scram-sha-256` 方法执行 SCRAM-SHA-256 身份验证。它是一种质询-响应方案，可防止在不受信任的连接上嗅探密码，并支持以被认为安全的加密散列形式将密码存储在服务器上。
  
- `md5`

  `md5` 方法使用自定义的安全性较低的质询-响应机制。
  
- `password`

  `password` 方法以明文形式发送密码，因此容易受到密码”嗅探“攻击。

### 23. 管理数据库

#### 23.2. 创建数据库

使用 SQL 命令 `CREATE DATABASE` 创建数据库：

```sql
CREATE DATABASE name;
```

#### 23.5. 销毁数据库

使用命令 `DROP DATABASE` 销毁数据库：

```sql
DROP DATABASE name;
```

## 六、参考

### III. PostgreSQL 服务器应用程序

#### initdb - 创建一个新的 PostgreSQL 数据库集簇

##### 语法

`initdb` [***`option`***...] [ `--pgdata` | `-D` ] ***`directory`***

##### 选项

- `--auth=`***`authmethod`***

  为本地用户指定在 *pg_hba.conf* 中使用的默认认证方法。

- `--auth-host=`***`authmethod`***

  为通过 TCP/IP 连接的本地用户指定在 *pg_hba.conf* 中使用的认证方法。

- `--auth-local=`***`authmethod`***

  为通过 Unix 域套接字连接的本地用户指定在 *pg_hba.conf* 中使用的认证方法。

- `-D` ***`directory`***

- `--pgdata=`***`directory`***

  指定数据库集簇应该存放的目录。

- `--encoding=`***`encoding`***

  选择模板数据库的编码。这也将是后来创建的任何数据库的默认编码。

- `--username=`***`username`***

  选择数据库超级用户的用户名。

- `--pwprompt`

  让 `initdb` 提示要求为数据库超级用户给予一个口令。

##### 例子

```sh
$ /usr/pgsql-10/bin/initdb \
    --pgdata=/var/lib/pgsql/10/data \
    --auth=trust \
    --username=postgres \
    --pwprompt
```

