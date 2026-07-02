# MySQL

[MySQL](https://dev.mysql.com/doc/refman/5.7/en/) 是一种流行的开源关系型数据库管理系统（RDBMS），广泛应用于各种类型的应用程序中，尤其是在基于互联网的应用程序中。

## 一、安装



### APT

从 Debian 9（Stretch）开始，Debian 官方库中的 [MySql](https://wiki.debian.org/MySql) 被 MariaDB 替代。

将 [MySQL APT](https://dev.mysql.com/doc/mysql-apt-repo-quick-guide/en/) 存储库添加到系统的软件存储库列表中。

```sh
wget https://dev.mysql.com/get/mysql-apt-config_0.8.33-1_all.deb
dpkg -i mysql-apt-config_0.8.33-1_all.deb
```

安装 MySQL。

```sh
apt update
apt install mysql-server
```

## 二、账户管理



### 变量赋值

获得[系统变量](https://dev.mysql.com/doc/refman/5.7/en/server-system-variables.html)的会话值或全局值。

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

### 自增长约束

[`AUTO_INCREMENT`](https://dev.mysql.com/doc/refman/5.7/en/example-auto-increment.html) 约束可用于为新行生成唯一标识。

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL
);
```

## 四、命令行程序







### mysqld

[`mysqld`](https://dev.mysql.com/doc/refman/5.7/en/mysqld.html)，也称为 MySQL Server。

`mysqld` [**选项**](https://dev.mysql.com/doc/refman/5.7/en/server-options.html)：

`mysqld` 从[选项文件](https://dev.mysql.com/doc/refman/5.7/en/option-files.html)中的 `[mysqld]` 和 `[server]` 部分读取[所有选项](https://dev.mysql.com/doc/refman/5.7/en/server-options.html)。

- --**skip-grant-tables**

  - 命令行格式：`--skip-grant-tables[={OFF|ON}]`

  - 默认值：`OFF`

  `--skip-grant-tables` 会导致服务器不读取 `mysql` 系统数据库中的授权表，因此不使用权限系统启动。这使任何有权访问服务器的人都可以不受限制地访问所有数据库。

## 五、安全

### 密码验证插件

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

### 字符串

字符串数据类型为 `CHAR`、`VARCHAR`、`BINARY`、`VARBINARY`、`BLOB`、`TEXT`、`ENUM` 和 `SET`。

#### VARCHAR

[`VARCHAR`](https://dev.mysql.com/doc/refman/5.7/en/char.html) 和 `CHAR` 类型相似，但存储和检索方式不同，在最大长度和是否保留尾随空格方面也不同。

与 `CHAR` 不同，`VARCHAR` 值被存储为一个 `1` 字节或 `2` 字节的长度前缀加上数据，长度前缀表示值中的字节数。如果值不超过 255 字节，则列使用一个长度字节，如果值可能超过 255 字节，则使用两个长度字节。

#### TEXT

[`TEXT`](https://dev.mysql.com/doc/refman/5.7/en/blob.html) 是用来存储非常长的文本数据的类型，最大长度为 `65535` 个字符。它存储的方式和 `VARCHAR` 不同，会占用额外的存储空间。

#### ENUM

[`ENUM`](https://dev.mysql.com/doc/refman/5.7/en/enum.html) 是一个字符串对象，其值从允许的值列表中选择，这些值在表创建时在列规范中显式枚举。

```sql
CREATE TABLE shirts (
    name VARCHAR(40),
    size ENUM('x-small', 'small', 'medium', 'large', 'x-large')
);
```

### 日期

日期和时间数据类型有 `DATE`、`TIME`、`DATETIME`、`TIMESTAMP` 和 `YEAR`。

#### DATETIME

[`DATETIME`](https://dev.mysql.com/doc/refman/5.7/en/datetime.html) 类型用于包含日期和时间部分的数值。

MySQL 以 `'YYYY-MM-DD hh:mm:ss'` 格式检索和显示 `DATETIME` 值，支持的范围是 `'1000-01-01 00:00:00'` 到 `'9999-12-31 23:59:59'`。

#### DATE

[`DATE`](https://dev.mysql.com/doc/refman/5.7/en/datetime.html) 类型用于有日期部分但没有时间部分的值。

MySQL 检索并显示 `'YYYY-MM-DD'` 格式的 `DATE` 值，支持的范围为 `'1000-01-01'` 到 `'9999-12-31'`。

#### TIMESTAMP

[`TIMESTAMP`](https://dev.mysql.com/doc/refman/5.7/en/datetime.html) 数据类型用于同时包含日期和时间部分的值。

`TIMESTAMP` 的范围为协调世界时 `1970-01-01 00:00:01` 到协调世界时 `2038-01-19 03:14:07`。

MySQL 将 `TIMESTAMP` 值从当前时区转换为 UTC 进行存储，并将其从 UTC 转换回当前时区进行检索。`DATETIME` 不会发生这种情况。

默认情况下，每个连接的当前时区是服务器的时间，可以根据每个连接设置时区。

### 数字

#### Integer

[整数](https://dev.mysql.com/doc/refman/5.7/en/integer-types.html)类型。

`INT` 为 4 字节 32 位有符号整数。

#### BOOLEAN

`BOOLEAN` 类型是 `TINYINT(1)` 的同义词。零值被认为是 `false`，非零值被认为是 `true`。

```sql
SELECT IF(0, 'true', 'false');
```

#### DECIMAL

在 [`DECIMAL`](https://dev.mysql.com/doc/refman/5.7/en/fixed-point-types.html) 列声明中，可以指定精度和小数位数。

```sql
salary DECIMAL(5, 2)
```

标准 SQL 要求 `DECIMAL(5, 2)` 能够存储任何具有五位数字和两位小数的值，因此可以存储在 *salary* 列中的值范围为 `-999.99` 到 `999.99`。

## 七、函数

### 字符串

- [**RIGHT**](https://dev.mysql.com/doc/refman/5.7/en/string-functions.html#function_right)(*str*, *len*)

  返回字符串 `str` 中最右边的 `len` 个字符。

- [**LEFT**](https://dev.mysql.com/doc/refman/5.7/en/string-functions.html#function_left)(*str*, *len*)

  返回字符串 `str` 中最左边的 `len` 个字符。

- [**LOCATE**](https://dev.mysql.com/doc/refman/5.7/en/string-functions.html#function_locate)(*substr*, *str*), **LOCATE**(*substr*, *str*, *pos*)

  第一种语法返回子字符串 `substr` 在字符串 `str` 中第一次出现的位置。
  
  第二种语法返回子字符串 `substr` 在字符串 `str` 中第一次出现的位置，从位置 `pos` 开始。

### 聚合

- [**MAX**](https://dev.mysql.com/doc/refman/5.7/en/aggregate-functions.html#function_max)([DISTINCT] *expr*)

  返回 `expr` 的最大值。`MAX()` 可以接受一个字符串参数；在这种情况下，它将返回最大的字符串值。

  ```sql
  SELECT modifyuser, MAX(modifydate) FROM dispatchingorder GROUP BY modifyuser;
  ```

- [**SUM**](https://dev.mysql.com/doc/refman/5.7/en/aggregate-functions.html#function_sum)([DISTINCT] *expr*)

  返回 `expr` 的总和。如果返回集没有行，则 `SUM()` 返回 `NULL`。`DISTINCT` 关键字可用于仅对 `expr` 的不同值求和。
  
  ```sql
  SELECT modifyuser, SUM(count) FROM dispatchingorder GROUP BY modifyuser;
  ```

### 日期和时间

- [**DATE**](https://dev.mysql.com/doc/refman/5.7/en/date-and-time-functions.html#function_date)(*expr*)

  提取日期或日期时间表达式 `expr` 的日期部分。
  
  ```sql
  SELECT DATE('2003-12-31 01:02:03');
  ```

## 八、运算符

### 比较

- [<>, !=](https://dev.mysql.com/doc/refman/5.7/en/comparison-operators.html#operator_not-equal)

  不等于。

- [LIKE](https://dev.mysql.com/doc/refman/5.7/en/string-comparison-functions.html#operator_like)

  字符串简单模式匹配。

- [NOT LIKE](https://dev.mysql.com/doc/refman/5.7/en/string-comparison-functions.html#operator_not-like)

  字符串简单模式匹配的否定。

### 流程控制

- [**IF**](https://dev.mysql.com/doc/refman/5.7/en/flow-control-functions.html#function_if)(*expr1*, *expr2*, *expr3*)

  如果 `expr1` 为真，`IF()` 返回 `expr2`。否则，它返回 `expr3`。

## 九、日志

### 常规查询日志

常规查询日志是 `mysqld` 正在进行的一般记录。当客户端连接或断开时，服务器会向该日志写入信息，并记录从客户端收到的每条 SQL 语句。

默认情况下，常规查询日志处于禁用状态。要明确指定初始的常规查询日志状态，可使用 [`general_log`](https://dev.mysql.com/doc/refman/5.7/en/server-system-variables.html#sysvar_general_log)。要指定日志文件名，使用 [`general_log_file`](https://dev.mysql.com/doc/refman/5.7/en/server-system-variables.html#sysvar_general_log_file)。要指定日志目的地，使用 [`log_output`](https://dev.mysql.com/doc/refman/5.7/en/server-system-variables.html#sysvar_log_output)。

启用常规查询日志：

```sql
SET GLOBAL general_log_file = 'general_log.log';
SET GLOBAL general_log = 'ON';
```


