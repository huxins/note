# PostgreSQL

[PostgreSQL](https://www.postgresql.org/docs/current/index.html) 是一个强大的开源对象关系数据库系统，它使用并扩展了 SQL 语言，并结合了许多功能，可以安全地存储和扩展最复杂的数据工作负载。

## 一、安装

### Red Hat

要使用 PostgreSQL [Yum Repository](https://www.postgresql.org/download/linux/redhat/)，请按以下步骤操作。

```sh
yum install -y https://download.postgresql.org/pub/repos/yum/reporpms/EL-7-x86_64/pgdg-redhat-repo-latest.noarch.rpm
yum install -y postgresql12-server
```

切换腾讯镜像源进行网络加速。

```sh
sed -i 's|download.postgresql.org/pub|mirrors.cloud.tencent.com/postgresql|g' /etc/yum.repos.d/pgdg-redhat-all.repo
```

初始化数据库并启动服务。

```sh
/usr/pgsql-12/bin/postgresql-12-setup initdb
systemctl enable postgresql-12
systemctl start postgresql-12
```

### Debian

[Debian](https://www.postgresql.org/download/linux/debian/) 默认包含 PostgreSQL。

```sh
apt install postgresql
```

### Docker

Docker 可以不受宿主机的限制，安装各种版本的 PostgreSQL。

```sh
docker run -d -p 5432:5432 --name postgres \
  --restart always \
  -e POSTGRES_PASSWORD=password \
  -e TZ=Asia/Shanghai \
  -v /var/lib/postgres/data:/var/lib/postgresql/data \
  postgres:10.7-alpine
```

`PGDATA` 在 [Docker](https://hub.docker.com/_/postgres) 中的默认路径为 `/var/lib/postgresql/data`，需要持久化数据时，请将此目录挂载到宿主机。

## 二、约束条件

### 检查约束

[检查约束](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-CHECK-CONSTRAINTS)是最通用的约束类型。它允许我们指定特定列中的值必须满足布尔表达式。

```sql
# 要求正值的产品价格
CREATE TABLE products (
    product_no integer,
    name text,
    price numeric CHECK (price > 0)
);
```

可以给约束一个独立的名称，这会使错误消息更为清晰，同时也允许我们在需要更改约束时能引用它。

```sql
CREATE TABLE products (
    product_no integer,
    name text,
    price numeric CONSTRAINT positive_price CHECK (price > 0)
);
```

一个检查约束也可以引用多个列。例如我们存储一个普通价格和一个打折后的价格，而我们希望保证打折后的价格低于普通价格。

```sql
CREATE TABLE products (
    product_no integer,
    name text,
    price numeric CHECK (price > 0),
    discounted_price numeric CHECK (discounted_price > 0),
    CHECK (price > discounted_price)
);
```

一个检查约束在其检查表达式值为 `true` 或 `null` 值时被满足。

### 非空约束

一个[非空约束](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-NOT-NULL)仅仅指定一个列中不会有空值。

```sql
CREATE TABLE products (
    product_no integer NOT NULL,
    name text NOT NULL,
    price numeric
);
```

### 唯一约束

[唯一约束](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-UNIQUE-CONSTRAINTS)保证在一列或一组列中保存的数据在表中所有行间是唯一的。

```sql
CREATE TABLE products (
    product_no integer UNIQUE,
    name text,
    price numeric
);
```

为一组列定义一个唯一约束，把它写作一个表级约束，列名用逗号分隔。

```sql
CREATE TABLE products (
    product_no integer,
    name text,
    UNIQUE (product_no, name)
);
```

这指定这些列的组合值在整个表的范围内是唯一的，但其中任意一列的值并不需要是唯一的。

为一个唯一约束命名：

```sql
CREATE TABLE products (
    product_no integer CONSTRAINT must_be_different UNIQUE,
    name text,
    price numeric
);
```

增加一个唯一约束会在约束列或列组上自动创建一个唯一 *B-tree* 索引。

### 主键约束

[主键约束](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-PRIMARY-KEYS)保证在一列或一组列中可以用作表中行的唯一标识符。这要求值既是唯一的又是非空的。因此，以下两个表定义接受相同的数据。

```sql
CREATE TABLE products (
    product_no integer UNIQUE NOT NULL,
    name text,
    price numeric
);
```

```sql
CREATE TABLE products (
    product_no integer PRIMARY KEY,
    name text,
    price numeric
);
```

主键也可以包含多于一个列，其语法和唯一约束相似。

```sql
CREATE TABLE products (
    product_no integer,
    name text,
    PRIMARY KEY (product_no, name)
);
```

增加一个主键将自动在主键中列出的列或列组上创建一个唯一 *B-tree* 索引，并且会强制这些列被标记为 `NOT NULL`。

一个表最多只能有一个主键。关系数据库理论要求每一个表都要有一个主键，但 PostgreSQL 中并未强制要求这一点，但是最好能够遵循它。

### 外键约束

[外键约束](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-FK)指定一列或一组列中的值必须匹配出现在另一个表中某些行的值。

```sql
CREATE TABLE products (
    product_no integer PRIMARY KEY,
    name text,
    price numeric
);

CREATE TABLE orders (
    order_id integer PRIMARY KEY,
    product_no integer REFERENCES products (product_no),
    quantity integer
);
```

## 三、函数

### 序列

[序列](https://www.postgresql.org/docs/12/functions-sequence.html)是一个数据库对象，本质上是一个自增器。序列在其他同类型数据库软件中以 `AUTO_INCREMENT` 值的形式存在。

序列对象是使用 [`CREATE SEQUENCE`](https://www.postgresql.org/docs/12/sql-createsequence.html) 创建的特殊单行表，序列对象通常用于为表的行生成唯一标识符。

序列对象中包含当前值，和一些独特属性，例如如何递增或递减。序列不能直接访问，需要通过 PostgreSQL 中的相关函数来操作它们。

以下为用于操作序列对象的函数，也称为序列生成器或序列。

- **nextval**(*regclass*) → `bigint`

  将序列对象前进到它的下一个值并返回该值。
  
- **setval**(*regclass*, *bigint* [, *boolean* ]) → `bigint`

  设置序列的当前值。
  
- **currval**(*regclass*) → `bigint`

  返回指定序列最近使用 `nextval` 获得的值，即 *last_value*。

#### 创建序列

```sql
CREATE SEQUENCE sequence_name
    [ INCREMENT increment ]    -- 自增数，默认是 1
    [ MINVALUE minvalue ]      -- 最小值
    [ MAXVALUE maxvalue ]      -- 最大值
    [ START start ]            -- 起始值
    [ CACHE cache ]            -- 是否预先缓存
    [ CYCLE ]                  -- 到达最大值时，是否重新返回到最小值
```

序列使用的是整型数值。创建一个简单的序列：

```sql
CREATE SEQUENCE sequence_name MINVALUE 0;
```

#### 查看序列

[`psql`](https://www.postgresql.org/docs/17/app-psql.html) 的 [`\d`](https://www.postgresql.org/docs/17/app-psql.html#APP-PSQL-META-COMMAND-D) 命令输出一个数据库对象，包括序列，表，视图和索引，还可以使用 [`\ds`](https://www.postgresql.org/docs/17/app-psql.html#APP-PSQL-META-COMMAND-DE) 命令只查看当前数据库的所有序列。

序列就像表和视图一样，拥有自己的结构，只不过它的结构是固定的。

查询 `sequence_name` 的 `last_value`：

```sql
SELECT last_value FROM sequence_name;
```

#### 删除序列

```sql
DROP SEQUENCE sequence_name;
```

如果该序列无法直接删除，可以查询是否被数据库中的其他对象引用。

```sql
SELECT p.relname, a.adsrc FROM pg_class p
  JOIN pg_attrdef a on p.relfilenode = a.adrelid
  WHERE a.adsrc ~ 'sequence_name';
```

## 四、服务器管理

### 服务器配置

[设置参数](https://www.postgresql.org/docs/12/config-setting.html)的最基本方法是编辑 [`postgresql.conf`](https://www.postgresql.org/docs/12/config-setting.html#CONFIG-SETTING-CONFIGURATION-FILE) 文件，该文件通常保存在数据目录中。

通过 SQL 查询配置文件和数据目录位置。

```sh
psql -U postgres -c "SHOW config_file"     # 配置文件目录
psql -U postgres -c "SHOW data_directory"  # 数据目录
```

通过 [`pg_config`](https://www.postgresql.org/docs/17/app-pgconfig.html) 可以查询执行文件所在目录。

```sh
pg_config --bindir
```

#### 连接设置

[连接设置](https://www.postgresql.org/docs/12/runtime-config-connection.html#RUNTIME-CONFIG-CONNECTION-SETTINGS)的相关配置项如下。

- **listen_addresses**(*string*)

  指定服务器在哪些 TCP/IP 地址上监听客户端连接。该值采用逗号分隔的主机名或数字 IP 地址列表的形式。特殊条目 `*` 对应于所有可用的 IP 接口。

### 客户端认证

#### 配置文件

客户端身份验证由一个配置文件控制，该文件通常名为 [`pg_hba.conf`](https://www.postgresql.org/docs/12/auth-pg-hba-conf.html) 并存储在数据库集簇的数据目录中。

`pg_hba.conf` 文件的格式是一组记录，每行一个。空白行将被忽略，`#` 注释字符之后的任何文本也是如此。

每条记录指定一种连接类型、一个数据库名称、一个用户名、一个客户端 IP 地址范围以及对匹配这些参数的连接使用的认证方法。

记录可以是下面格式之一：

```
host    all             all             127.0.0.1/32            trust
host    database        user            address                 auth-method  [auth-options]
```

#### 身份验证

PostgreSQL 提供了多种[验证用户](https://www.postgresql.org/docs/12/auth-methods.html)的方法：

- [**Trust authentication**](https://www.postgresql.org/docs/12/auth-trust.html)：简单的信任用户声称的身份。
- [**Password authentication**](https://www.postgresql.org/docs/current/auth-password.html)：需要用户提供密码。

#### 密码认证

有几种基于[密码](https://www.postgresql.org/docs/12/auth-password.html)的身份验证方法。这些方法的操作类似，但不同之处在于用户密码如何存储在服务器上以及客户端提供的密码如何通过连接发送。

- **scram-sha-256**

  `scram-sha-256` 方法执行 SCRAM-SHA-256 身份验证。它是一种*质询 - 响应*方案，可防止在不受信任的连接上嗅探密码，并支持以被认为安全的加密散列形式将密码存储在服务器上。
  
- **md5**

  `md5` 方法使用自定义的安全性较低的*质询 - 响应*机制。
  
- **password**

  `password` 方法以明文形式发送密码，因此容易受到密码嗅探攻击。

### 账户管理

#### 修改密码

通过 SQL 修改用户密码。

```sh
psql -U postgres -c "ALTER USER postgres WITH PASSWORD 'new-password'"
```

## 五、命令行程序

### initdb

[`initdb`](https://www.postgresql.org/docs/12/app-initdb.html) 用于创建一个新的 PostgreSQL 数据库集簇。

```
initdb [option...] [ --pgdata | -D ] directory
```

安装完成后，可以进行初始化操作。

```sh
/usr/pgsql-10/bin/initdb \
    --pgdata=/var/lib/pgsql/10/data \
    --auth=trust \
    --username=postgres \
    --pwprompt
```

- --**auth**=*authmethod*

  为本地用户指定在 `pg_hba.conf` 中使用的默认认证方法。

- --**auth-host**=*authmethod*

  为通过 TCP/IP 连接的本地用户指定在 `pg_hba.conf` 中使用的认证方法。

- --**auth-local**=*authmethod*

  为通过 Unix 域套接字连接的本地用户指定在 `pg_hba.conf` 中使用的认证方法。

- -**D** *directory*

- --**pgdata**=*directory*

  指定数据库集簇应该存放的目录。

- --**encoding**=*encoding*

  选择模板数据库的编码。这也将是后来创建的任何数据库的默认编码。

- --**username**=*username*

  选择数据库超级用户的用户名。

- --**pwprompt**

  让 `initdb` 提示要求为数据库超级用户给予一个口令。

### createuser

[`createuser`](https://www.postgresql.org/docs/12/app-createuser.html) 用于定义一个新的 PostgreSQL 用户帐户。

- -**P**, --**pwprompt**：如果给定，`createuser` 将提示输入新用户的密码。
- -**s**, --**superuser**：新用户将是超级用户。
- -**e**, --**echo**：回显 `createuser` 生成并发送到服务器的命令。

```sh
su postgres
createuser -P -s -e sonar;
```

### psql

[`psql`](https://www.postgresql.org/docs/12/app-psql.html) 是 PostgreSQL 的一个基于终端的前端。

- -**U** *username*, --**username**=*username*：以指定用户名连接到数据库。
- -**d** *dbname*, --**dbname**=*dbname*：指定要连接到的数据库的名称。
- -**h** *hostname*, --**host**=*hostname*：指定运行服务器的计算机的主机名。
- -**p** *port*, --**port**=*port*：指定服务器正在侦听连接的 TCP 端口。

连接指定数据库。

```sh
psql -U dbuser -d exampledb -h 127.0.0.1 -p 5432
```

[**Meta 命令**](https://www.postgresql.org/docs/12/app-psql.html#APP-PSQL-META-COMMANDS)：

- \\**l**：列出服务器中的数据库，并显示它们的名称、所有者、字符集编码和访问权限。
- \\**c** *dbname*：建立到 PostgreSQL 服务器的新连接。
- \\**dt**：列举表，`t` 为表。
- \\**z**：列出表、视图和序列及其关联的访问权限。
- \\**encoding**：设置客户端字符集编码。如果没有参数，此命令将显示当前编码。
- \\**q**：退出 `psql` 程序。

### pg_dump

[`pg_dump`](https://www.postgresql.org/docs/12/app-pgdump.html) 是一个用于备份 PostgreSQL 数据库的实用程序。

- -**U** *username*：连接的用户名。
- -**d** *dbname*：指定要连接到的数据库的名称。

备份单个数据库。

```sh
pg_dump -U postgres -d mydb > mydb.pgsql
# 压缩
pg_dump -U postgres -d mydb | gzip > mydb.pgsql.gz
# 分包
pg_dump -U postgres -d mydb | gzip | split -b 100M - mydb.pgsql.gz
```

备份单个表。

```sh
pg_dump -U postgres -d mydb -t mytable > mydb-mytable.pgsql
```

恢复数据。

```sh
psql -U postgres -d mydb -f mydb.pgsql
# 解压
gunzip -c mydb.pgsql.gz | psql -U postgres -d mydb
# 合包
cat mydb.pgsql.gz* | gunzip | psql -U postgres -d mydb
```

### pg_controldata

[`pg_controldata`](https://www.postgresql.org/docs/15/app-pgcontroldata.html) 用于显示 PostgreSQL 数据库集群的控制信息。

控制文件 `global/pg_control` 包含了关于数据库集群的信息，包括版本号。

可以使用 `pg_controldata` 工具来读取这个文件的信息。

```sh
/usr/pgsql-12/bin/pg_controldata /path/to/data/directory
```

