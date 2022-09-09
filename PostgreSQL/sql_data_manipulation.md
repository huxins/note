# 数据操纵

## 插入数据

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

## 更新数据

```sql
UPDATE products SET price = 10 WHERE price = 5;
```

