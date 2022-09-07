# initdb

```sh
$ su postgres
$ /usr/pgsql-10/bin/initdb \
    --pgdata=/var/lib/pgsql/10/data \
    --auth=trust \
    --username=postgres \
    --pwprompt
```

## 命令行选项

- --pgdata=***directory***

指定数据库集簇应该存放的目录。

- --auth=***authmethod***

为本地用户指定在 *pg_hba.conf* 中使用的默认认证方法。

- --auth-host=***authmethod***

为通过 TCP/IP 连接的本地用户指定在 *pg_hba.conf* 中使用的认证方法。

- --auth-local=***authmethod***

为通过 Unix 域套接字连接的本地用户指定在 *pg_hba.conf* 中使用的认证方法。

- --encoding=***encoding***

选择模板数据库的编码。这也将是后来创建的任何数据库的默认编码。

- --username=***username***

选择数据库超级用户的用户名。

- --pwprompt

让 `initdb` 提示要求为数据库超级用户给予一个口令。

## 参见

- [initdb - PostgreSQL](https://www.postgresql.org/docs/10/app-initdb.html)

