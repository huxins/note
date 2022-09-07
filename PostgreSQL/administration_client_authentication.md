# 客户端认证

客户端认证是由一个配置文件 *pg_hba.conf* 控制，存放在数据库集簇目录中。

*pg_hba.conf* 文件的常用格式是一组记录，每行一条。

每条记录指定一种连接类型、一个数据库名、一个用户名、一个客户端 IP 地址范围以及对匹配这些参数的连接使用的认证方法。

记录可以是下面格式之一：

```
host    all             all             127.0.0.1/32            trust
```

## 认证方法

信任认证：

- trust

口令认证：

- scram-sha-256
- md5
- password

## 参见

- [Client Authentication - PostgreSQL](https://www.postgresql.org/docs/10/client-authentication.html)

