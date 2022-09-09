# 数据库管理

## 账户管理

### 更改用户

更改用户密码：

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
SET PASSWORD FOR 'root'@'localhost' = 'new_password';
```

## 其他管理

### 刷新

从 *mysql* 系统数据库的授权表中重新读取权限：

```sql
FLUSH PRIVILEGES;
```

## 参见

- [Database Administration - MySQL](https://dev.mysql.com/doc/refman/5.7/en/sql-server-administration-statements.html)

