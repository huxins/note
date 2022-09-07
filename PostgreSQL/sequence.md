# Sequence

序列是一个数据库对象，本质上是一个自增器。序列在其他同类型数据库软件中以 `autoincrment` 值的形式存在。

Sequence 对象中包含当前值，和一些独特属性，例如如何递增或递减。Sequence 不能直接访问，需要通过 PostgreSQL 中的相关函数来操作它们。

## 创建序列

```
CREATE SEQUENCE sequence_name
    [ INCREMENT increment ]    -- 自增数，默认是 1
    [ MINVALUE minvalue ]      -- 最小值
    [ MAXVALUE maxvalue ]      -- 最大值
    [ START start ]            -- 起始值
    [ CACHE cache ]            -- 是否预先缓存
    [ CYCLE ]                  -- 到达最大值时，是否重新返回到最小值
```

Sequence 使用的是整型数值。创建一个简单的序列：

```sql
CREATE SEQUENCE sequence_name MINVALUE 0;
```

## 查看序列

`psql` 的 `\d` 命令输出一个数据库对象，包括 Sequence，表，视图和索引。你还可以使用 `\ds` 命令只查看当前数据库的所有序列。

Sequence 就像表和视图一样，拥有自己的结构，只不过它的结构是固定的。

查询 `sequence_name` 的 `last_value`：

```sql
SELECT last_value FROM sequence_name;
```

## 使用序列

通过相关函数使用 Sequence：

- currval(regclass)

返回指定序列最近使用 `nextval` 获得的值，即 *last_value*。

- nextval(regclass)

递增序列并返回新值。

- setval(regclass, bigint)

设置序列的当前值。

## 删除序列

```sql
DROP SEQUENCE sequence_name;
```

如果该序列无法直接删除，可以查询是否被数据库中的其他对象引用：

```sql
SELECT p.relname, a.adsrc FROM pg_class p
JOIN pg_attrdef a on p.relfilenode = a.adrelid
WHERE a.adsrc ~ 'sequence_name';
```

