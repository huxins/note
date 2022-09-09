# MySQL Server

## 命令行选项

- --skip-grant-tables

服务器不读取 *mysql* 系统数据库中的授权表，因此根本不使用权限系统启动。

## 系统变量

通过 `@@`，获得系统变量的会话值或全局值：

```sql
SELECT @@validate_password_policy;
```

## 参见

- [The MySQL Server - MySQL](https://dev.mysql.com/doc/refman/5.7/en/mysqld-server.html)

