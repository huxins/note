# 数据定义

## 创建表

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

## 删除表

如果不再需要一个表，可以通过使用 `DROP TABLE` 命令来移除它。例如：

```sql
DROP TABLE my_first_table;
```

尝试移除一个不存在的表会引起错误，发生错误忽略即可。如果介意，可以使用 `DROP TABLE IF EXISTS` 变体来防止出现错误消息，但这并非标准SQL。

```sql
DROP TABLE IF EXISTS my_first_table;
```

## 默认值

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

## 约束

### 检查约束

指定一个特定列中的值必须要满足一个布尔表达式。例如，为了要求正值的产品价格，我们可以使用：

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

### 非空约束

一个非空约束仅仅指定一个列中不会有空值：

```sql
CREATE TABLE products (
    product_no integer NOT NULL,
    name text NOT NULL,
    price numeric
);
```

### 唯一约束

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

### 主键

主键约束保证在一列或一组列中保存的数据在表中所有行间是唯一的，并且非空：

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

增加一个主键将自动在主键中列出的列或列组上创建一个唯一 B-tree 索引。并且会强制这些列被标记为 NOT NULL。

一个表最多只能有一个主键。关系数据库理论要求每一个表都要有一个主键。但 PostgreSQL 中并未强制要求这一点，但是最好能够遵循它。

### 外键

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

## 修改表

### 增加列

```sql
ALTER TABLE products ADD COLUMN description text;
```

同时为列定义约束：

```sql
ALTER TABLE products ADD COLUMN description text CHECK (description <> '');
```

同时为列定义默认值：

```sql
ALTER TABLE products ADD COLUMN description text DEFAULT '';
```

### 移除列

列中的数据将会消失。涉及到该列的表约束也会被移除：

```sql
ALTER TABLE products DROP COLUMN description;
```

### 重命名列

```sql
ALTER TABLE products RENAME COLUMN product_no TO product_number;
```

### 重命名表

```sql
ALTER TABLE products RENAME TO items;
```

### 修改列的默认值

这不会影响任何表中已经存在的行，它只是为未来的 `INSERT` 命令改变了默认值。

```sql
ALTER TABLE products ALTER COLUMN description SET DEFAULT '';
```

移除任何默认值：

```sql
ALTER TABLE products ALTER COLUMN description DROP DEFAULT;
```

### 修改列的数据类型

```sql
ALTER TABLE products ALTER COLUMN name TYPE varchar(70);
```

### 增加约束

```sql
ALTER TABLE products ADD CHECK (name <> '');
ALTER TABLE products ADD CONSTRAINT some_name UNIQUE (product_no);
ALTER TABLE products ADD FOREIGN KEY (product_group_id) REFERENCES product_groups;
```

要增加一个不能写成表约束的非空约束，可使用语法：

```sql
ALTER TABLE products ALTER COLUMN product_no SET NOT NULL;
```

### 移除约束

移除非空约束之外的所有约束：

```sql
ALTER TABLE products DROP CONSTRAINT some_name;
```

移除非空约束：

```sql
ALTER TABLE products ALTER COLUMN product_no DROP NOT NULL;
```

