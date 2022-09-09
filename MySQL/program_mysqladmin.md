# mysqladmin

`mysqladmin` 是用于执行管理操作的客户端。您可以使用它来检查服务器的配置和当前状态，创建和删除数据库等等。

## 语法

```
mysqladmin [options] command [command-arg] [command [command-arg]] ...
```

## 命令

- flush-privileges

重新加载授权表。

- password ***new_password***

设置新密码。

## 命令行选项

- --user=***user_name***, -u ***user_name***

用于连接到服务器的 MySQL 帐户的用户名。

## 参见

- [mysqladmin - MySQL](https://dev.mysql.com/doc/refman/5.7/en/mysqladmin.html)

