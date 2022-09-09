# 数据操纵

## 更新数据

联表更新：

```sql
UPDATE products ps
  LEFT JOIN productionorder po ON po.barcode = ps.name
    SET ps.price = po.number;
```

