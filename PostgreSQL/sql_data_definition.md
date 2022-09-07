# 数据定义

## 创建表

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

