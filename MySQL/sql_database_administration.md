# 数据库管理

## 账户管理

### 更改用户

更改用户密码：

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
SET PASSWORD FOR 'root'@'localhost' = 'new_password';
```

### 授权

查询用户授权：

```sql
USE mysql;
SELECT user, host FROM user;
```

增加用户授权：

```sql
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' IDENTIFIED BY 'auth_string' WITH GRANT OPTION;
```

## SET

### 变量赋值

修改系统变量：

```sql
SET GLOBAL system_var_name = expr;
```

## 其他管理

### 刷新

从 *mysql* 系统数据库的授权表中重新读取权限：

```sql
FLUSH PRIVILEGES;
```

## 参见

- [Database Administration - MySQL](https://dev.mysql.com/doc/refman/5.7/en/sql-server-administration-statements.html)

