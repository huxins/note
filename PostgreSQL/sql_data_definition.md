# 数据定义

## 表基础

创建一个表，需要用到 `CREATE TABLE` 命令。在这个命令中，我们需要为表指定一个名字，以及列的名字及数据类型。例如：

```sql
CREATE TABLE my_first_table (
    first_column text,
    second_column integer
);
```

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

唯一约束保证在一列中或者一组列中保存的数据在表中所有行间是唯一的：

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

