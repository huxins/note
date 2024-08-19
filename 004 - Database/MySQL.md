# MySQL

## 一、安装

### Linux

#### Yum

添加 MySQL Yum 存储库。

```sh
# 对于基于 EL7 的系统
$ yum install https://repo.mysql.com/mysql80-community-release-el7-7.noarch.rpm
```

选择发布系列。

```sh
$ yum-config-manager --disable mysql80-community
$ yum-config-manager --enable mysql57-community
```

安装 MySQL。

```sh
$ yum install mysql-community-server
```

腾讯镜像加速。

```sh
$ sed -e '/http/s@repo.mysql.com@mirrors.cloud.tencent.com/mysql@g' \
-e '/http/s@/el/7/@-el7-@g' \
-i /etc/yum.repos.d/mysql-community.repo
```

启动 MySQL 服务器。

```sh
$ systemctl start mysqld
```

在服务器初始启动时，如果服务器的数据目录为空，则会发生以下情况。

```
1、服务器初始化。
2、SSL 证书和密钥文件在数据目录中生成。
3、validate_password 默认安装并启用。
4、创建超级用户帐户 'root'@'localhost'。超级用户的默认密码存储在错误日志文件中。
```

要显示超级用户的默认密码，请使用以下命令。

```sh
$ grep 'temporary password' /var/log/mysqld.log
```

## 二、账户管理

### 2.1. 修改账户

`ALTER USER` 语句可以修改 MySQL 帐户。它支持为现有帐户修改身份验证、SSL/TLS、资源限制和密码管理属性。它还可用于锁定和解锁帐户。

- 更改用户密码

  ```sql
  ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
  ```

- 更改服务器用于验证当前客户端的 MySQL 帐户的用户密码

  ```sql
  ALTER USER CURRENT_USER() IDENTIFIED BY 'new_password';
  ```

- 更改当前 MySQL 帐户的用户密码

  ```sql
  ALTER USER USER() IDENTIFIED BY 'new_password';
  ```

### 2.2. 权限管理

`GRANT` 语句将权限授予 MySQL 用户帐户。

- 查询用户名和主机名

  ```sql
  USE mysql;
  SELECT user, host FROM user;
  ```

- 全局授予所有权限。账户不存在时，自动创建。

  ```sql
  GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';
  ```

- 全局授予所有权限。账户不存在时，带密码自动创建。

  ```sql
  GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'auth_string';
  ```

- 全局授予所有权限。账户不存在时，带密码自动创建；允许向其他用户授予或撤销自己拥有的权限。

  ```sql
  GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'auth_string' WITH GRANT OPTION;
  ```

`FLUSH PRIVILEGES` 语句可以从 `mysql` 系统数据库的 `grant` 表中重新读取权限。

```sql
FLUSH PRIVILEGES;
```

### 2.3. 帐户名称

MySQL [帐户名](https://dev.mysql.com/doc/refman/5.7/en/account-names.html)由用户名和主机名组成，这使得从不同主机连接的具有相同用户名的用户可以创建不同的帐户。

账户名出现在 `CREATE USER`、`GRANT` 和 `SET PASSWORD` 等 SQL 语句中并遵循以下规则。

- 帐户名语法为 `'user_name'@'host_name'`。
- `@'host_name'` 部分是可选的。仅由用户名组成的帐户名等同于 `'user_name'@'%'`。例如，`'me'` 等同于 `'me'@'%'`。
- 如果用户名和主机名作为未加引号的标识符是合法的，则不需要加引号。如果 `user_name` 字符串包含特殊字符，或者 `host_name` 字符串包含特殊字符或通配符，则必须使用引号。

### 2.4. 变量赋值

获得系统变量的会话值或全局值。

```sql
SELECT @@validate_password_policy;
SHOW VARIABLES LIKE 'datadir';
```

设置全局系统变量。

```sql
SET GLOBAL max_connections = 1000;
SET @@GLOBAL.max_connections = 1000;
```

设置会话系统变量。

```sql
SET SESSION sql_mode = 'TRADITIONAL';
SET @@SESSION.sql_mode = 'TRADITIONAL';
SET @@sql_mode = 'TRADITIONAL';
```

## 三、条件约束

### 3.1. 自增长约束

`AUTO_INCREMENT` 约束可用于为新行生成唯一标识。

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL
);
```

## 四、命令行程序

### 4.1. mysql

`mysql` 是一个简单的 SQL Shell。

从命令行中调用它，如下所示。

```sh
$ mysql --user=user_name --password db_name
```

`mysql` 选项：

- --**user**=*user_name*, -**u** *user_name*

  连接到服务器时使用的 MySQL 用户名。

- --**password**[=*password*], -**p**[*password*]

  连接到服务器时使用的密码。

- --**port**=*port_num*, -**P** *port_num*

  用于连接的 TCP/IP 端口号。

- --**host**=*host_name*, -**h** *host_name*

  MySQL 服务器所在的主机。

`mysql` 命令：

`mysql` 将您发出的每个 SQL 语句发送到要执行的服务器。还有一组 `mysql` 自己解释的命令。

- `status`, `\s`

  从服务器获取状态信息。

### 4.2. mysqladmin

`mysqladmin` 是用于执行管理操作的客户端。可以使用它来检查服务器的配置和当前状态，创建和删除数据库等等。

从命令行中调用它，如下所示。

```sh
$ mysqladmin --user=user_name --password flush-privileges
```

`mysqladmin` 选项：

`mysqladmin` 支持以下选项，可以在命令行或选项文件的 `[mysqladmin]` 和 `[client]` 组中指定。

- --**user**=*user_name*, -**u** *user_name*

  连接到服务器时使用的 MySQL 用户名。

- --**password**[=*password*], -**p**[*password*]

  连接到服务器时使用的密码。

`mysqladmin` 命令：

- `flush-privileges`

  重新加载授权表。

- `password` *new_password*

  设置新密码。

### 4.3. mysqldump

`mysqldump` 客户端执行逻辑备份，生成一组 SQL 语句，可以执行这些语句以重现原始数据库对象定义和表数据。

默认情况下，`mysqldump` 将信息作为 SQL 语句写入标准输出。可以将输出保存在文件中。

要转储所有数据库，使用 `--all-databases` 选项调用 `mysqldump`。

```sh
$ mysqldump --all-databases > dump.sql
```

要仅转储特定数据库，使用 `--databases` 选项。

```sh
$ mysqldump --databases db1 db2 db3 > dump.sql
```

要只转储数据库中的特定表，请在命令行中将这些表命名在数据库名称之后。

```sh
$ mysqldump db1 t1 t3 t7 > dump.sql
```

要重新加载由 `mysqldump` 编写的包含 SQL 语句的转储文件，请将其用作 `mysql` 客户端的输入。

```sh
$ mysql < dump.sql
```

或者，从 `mysql` 中使用 `source` 命令。

```sh
$ source dump.sql
```

`mysqldump` 选项：

- --**host**=*host_name*, -**h** *host_name*

  从给定主机上的 MySQL 服务器转储数据。

- --**password**[=*password*], -**p**[*password*]

  用于连接到服务器的 MySQL 帐户的密码。

- --**port**=*port_num*, -**P** *port_num*

  对于 TCP/IP 连接，要使用的端口号。

### 4.4. mysqld

`mysqld`，也称为 MySQL Server。

`mysqld` 选项：

`mysqld` 从[选项文件](https://dev.mysql.com/doc/refman/5.7/en/option-files.html)中的 `[mysqld]` 和 `[server]` 部分读取[所有选项](https://dev.mysql.com/doc/refman/5.7/en/server-options.html)。

- --**skip-grant-tables**

  - 命令行格式：`--skip-grant-tables[={OFF|ON}]`

  - 默认值：`OFF`

  `--skip-grant-tables` 会导致服务器不读取 `mysql` 系统数据库中的授权表，因此不使用权限系统启动。这使任何有权访问服务器的人都可以不受限制地访问所有数据库。

## 五、安全

### 5.1. 密码验证插件

密码验证插件系统变量：

- `validate_password_policy`

  - 命令行格式：`--validate-password-policy=value`

  - 默认值：`1`

  - 可选值：`0`, `1`, `2`

  由 *validate_password* 强制执行的密码策略。除非安装了 *validate_password*，否则此变量不可用。

  修改安全等级。

  ```sql
  SELECT @@validate_password_policy;
  SET GLOBAL validate_password_policy = 0;
  ```

## 六、数据类型

### 6.1. 字符串

字符串数据类型为 `CHAR`、`VARCHAR`、`BINARY`、`VARBINARY`、`BLOB`、`TEXT`、`ENUM` 和 `SET`。

#### VARCHAR

`VARCHAR` 和 `CHAR` 类型相似，但存储和检索方式不同。它们在最大长度和是否保留尾随空格方面也不同。

与 `CHAR` 不同，`VARCHAR` 值被存储为一个 `1` 字节或 `2` 字节的长度前缀加上数据。长度前缀表示值中的字节数。如果值不超过 255 字节，则列使用一个长度字节，如果值可能超过 255 字节，则使用两个长度字节。

#### TEXT

`TEXT` 是用来存储非常长的文本数据的类型，最大长度为 65535 个字符。它存储的方式和 `VARCHAR` 不同，会占用额外的存储空间。

#### ENUM

`ENUM` 是一个字符串对象，其值从允许的值列表中选择，这些值在表创建时在列规范中显式枚举。

```sql
CREATE TABLE shirts (
    name VARCHAR(40),
    size ENUM('x-small', 'small', 'medium', 'large', 'x-large')
);
```

### 6.2. 日期

日期和时间数据类型有 `DATE`、`TIME`、`DATETIME`、`TIMESTAMP` 和 `YEAR`。

#### DATETIME

`DATETIME` 类型用于包含日期和时间部分的数值。MySQL 以 `'YYYY-MM-DD hh:mm:ss'` 格式检索和显示 `DATETIME` 值。支持的范围是 `'1000-01-01 00:00:00'` 到 `'9999-12-31 23:59:59'`。

#### DATE

`DATE` 类型用于有日期部分但没有时间部分的值。MySQL 检索并显示 `'YYYY-MM-DD'` 格式的 `DATE` 值。支持的范围为 `'1000-01-01'` 到 `'9999-12-31'`。

#### TIMESTAMP

`TIMESTAMP` 数据类型用于同时包含日期和时间部分的值。`TIMESTAMP` 的范围为协调世界时 `1970-01-01 00:00:01` 到协调世界时 `2038-01-19 03:14:07`。

MySQL 将 `TIMESTAMP` 值从当前时区转换为 UTC 进行存储，并将其从 UTC 转换回当前时区进行检索。`DATETIME` 不会发生这种情况。默认情况下，每个连接的当前时区是服务器的时间，可以根据每个连接设置时区。

### 6.3. 数字

#### Integer

[整数](https://dev.mysql.com/doc/refman/5.7/en/integer-types.html)类型。

`INT` 为 4 字节 32 位有符号整数。

#### BOOLEAN

`BOOLEAN` 类型是 `TINYINT(1)` 的同义词。零值被认为是 `false`。非零值被认为是 `true`。

```sql
SELECT IF(0, 'true', 'false');
```

#### 定点数

在 `DECIMAL` 列声明中，可以指定精度和小数位数。

```sql
salary DECIMAL(5, 2)
```

标准 SQL 要求 `DECIMAL(5, 2)` 能够存储任何具有五位数字和两位小数的值，因此可以存储在 *salary* 列中的值范围为 `-999.99` 到 `999.99`。

## 七、函数

### 7.1. 字符串

- **RIGHT**(*str*, *len*)

  返回字符串 `str` 中最右边的 `len` 个字符。

- **LEFT**(*str*, *len*)

  返回字符串 `str` 中最左边的 `len` 个字符。

- **LOCATE**(*substr*, *str*), **LOCATE**(*substr*, *str*, *pos*)

  第一种语法返回子字符串 `substr` 在字符串 `str` 中第一次出现的位置。第二种语法返回子字符串 `substr` 在字符串 `str` 中第一次出现的位置，从位置 `pos` 开始。

### 7.2. 聚合

- **MAX**([DISTINCT] *expr*)

  返回 `expr` 的最大值。`MAX()` 可以接受一个字符串参数；在这种情况下，它将返回最大的字符串值。

  ```sql
  SELECT modifyuser, MAX(modifydate) FROM dispatchingorder GROUP BY modifyuser;
  ```

- **SUM**([DISTINCT] *expr*)

  返回 `expr` 的总和。如果返回集没有行，则 `SUM()` 返回 `NULL`。`DISTINCT` 关键字可用于仅对 `expr` 的不同值求和。
  
  ```sql
  SELECT modifyuser, SUM(count) FROM dispatchingorder GROUP BY modifyuser;
  ```

### 7.3. 日期和时间

- **DATE**(*expr*)

  提取日期或日期时间表达式 `expr` 的日期部分。
  
  ```sql
  SELECT DATE('2003-12-31 01:02:03');
  ```

## 八、运算符

### 8.1. 比较

- <>, !=

  不等于。

- `LIKE`

  字符串简单模式匹配。

- `NOT LIKE`

  字符串简单模式匹配的否定。

### 8.2. 流程控制

- **IF**(*expr1*, *expr2*, *expr3*)

  如果 `expr1` 为真，`IF()` 返回 `expr2`。否则，它返回 `expr3`。

## 九、日志

### 9.1. 常规查询日志

常规查询日志是 `mysqld` 正在进行的一般记录。当客户端连接或断开时，服务器会向该日志写入信息，并记录从客户端收到的每条 SQL 语句。

默认情况下，常规查询日志处于禁用状态。要明确指定初始的常规查询日志状态，可使用 [general_log](https://dev.mysql.com/doc/refman/5.7/en/server-system-variables.html#sysvar_general_log)。要指定日志文件名，使用 [general_log_file](https://dev.mysql.com/doc/refman/5.7/en/server-system-variables.html#sysvar_general_log_file)。要指定日志目的地，使用 [log_output](https://dev.mysql.com/doc/refman/5.7/en/server-system-variables.html#sysvar_log_output)。

启用常规查询日志：

```sql
SET GLOBAL general_log_file = 'general_log.log';
SET GLOBAL general_log = 'ON';
```

