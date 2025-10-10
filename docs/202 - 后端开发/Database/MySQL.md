# MySQL

[MySQL](https://dev.mysql.com/doc/refman/5.7/en/) 是一种流行的开源关系型数据库管理系统（RDBMS），广泛应用于各种类型的应用程序中，尤其是在基于互联网的应用程序中。

## 一、安装

### YUM

添加 MySQL Yum [存储库](https://dev.mysql.com/doc/refman/5.7/en/linux-installation-yum-repo.html)。

```sh
yum install https://repo.mysql.com/mysql80-community-release-el7-7.noarch.rpm     # 对于基于 EL7 的系统
```

选择发布系列。

```sh
yum-config-manager --disable mysql80-community
yum-config-manager --enable mysql57-community
```

安装 MySQL。

```sh
yum install mysql-community-server
```

腾讯镜像加速。

```sh
sed -e '/http/s@repo.mysql.com@mirrors.cloud.tencent.com/mysql@g' \
-e '/http/s@/el/7/@-el7-@g' \
-i /etc/yum.repos.d/mysql-community.repo
```

启动 MySQL 服务器。

```sh
systemctl start mysqld
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
grep 'temporary password' /var/log/mysqld.log
```

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

### 修改账户

[`ALTER USER`](https://dev.mysql.com/doc/refman/5.7/en/alter-user.html) 语句可以修改 MySQL 帐户。它支持为现有帐户修改身份验证、SSL/TLS、资源限制和密码管理属性，它还可用于锁定和解锁帐户。

- [更改用户密码](https://dev.mysql.com/doc/refman/5.7/en/assigning-passwords.html)

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

### 权限管理

[`GRANT`](https://dev.mysql.com/doc/refman/5.7/en/grant.html) 语句将权限授予 MySQL 用户帐户。

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

[`FLUSH PRIVILEGES`](https://dev.mysql.com/doc/refman/5.7/en/flush.html#flush-privileges) 语句可以从 `mysql` 系统数据库的 `grant` 表中重新读取权限。

```sql
FLUSH PRIVILEGES;
```

### 帐户名称

MySQL [帐户名](https://dev.mysql.com/doc/refman/5.7/en/account-names.html)由用户名和主机名组成，这使得从不同主机连接的具有相同用户名的用户可以创建不同的帐户。

账户名出现在 `CREATE USER`、`GRANT` 和 `SET PASSWORD` 等 SQL 语句中并遵循以下规则。

- 帐户名语法为 `'user_name'@'host_name'`。
- `@'host_name'` 部分是可选的。仅由用户名组成的帐户名等同于 `'user_name'@'%'`。例如，`'me'` 等同于 `'me'@'%'`。
- 如果用户名和主机名作为未加引号的标识符是合法的，则不需要加引号。如果 `user_name` 字符串包含特殊字符，或者 `host_name` 字符串包含特殊字符或通配符，则必须使用引号。

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

### mysql

[`mysql`](https://dev.mysql.com/doc/refman/5.7/en/mysql.html) 是一个简单的 SQL Shell。

从命令行中调用它，如下所示。

```sh
mysql --user=user_name --password db_name
```

`mysql` [**选项**](https://dev.mysql.com/doc/refman/5.7/en/mysql-command-options.html)：

- --**user**=*user_name*, -**u** *user_name*

  连接到服务器时使用的 MySQL 用户名。

- --**password**[=*password*], -**p**[*password*]

  连接到服务器时使用的密码。

- --**port**=*port_num*, -**P** *port_num*

  用于连接的 TCP/IP 端口号。

- --**host**=*host_name*, -**h** *host_name*

  MySQL 服务器所在的主机。

`mysql` [**命令**](https://dev.mysql.com/doc/refman/5.7/en/mysql-commands.html)：

`mysql` 会将发出的每个 SQL 语句发送到要执行的服务器，同时还有一组 `mysql` 自己解释的命令。

- `status`, `\s`

  从服务器获取状态信息。
  
- `\u` *db_name*

  使用 `db_name` 作为默认数据库。

### mysqladmin

[`mysqladmin`](https://dev.mysql.com/doc/refman/5.7/en/mysqladmin.html) 是用于执行管理操作的客户端。可以使用它来检查服务器的配置和当前状态，创建和删除数据库等等。

从命令行中调用它，如下所示。

```sh
mysqladmin --user=user_name --password flush-privileges
```

`mysqladmin` **选项**：

`mysqladmin` 支持以下选项，可以在命令行或选项文件的 `[mysqladmin]` 和 `[client]` 组中指定。

- --**user**=*user_name*, -**u** *user_name*

  连接到服务器时使用的 MySQL 用户名。

- --**password**[=*password*], -**p**[*password*]

  连接到服务器时使用的密码。

`mysqladmin` **命令**：

- `flush-privileges`

  重新加载授权表。

- `password` *new_password*

  设置新密码。

### mysqldump

[`mysqldump`](https://dev.mysql.com/doc/refman/5.7/en/mysqldump.html) 客户端执行逻辑备份，生成一组 SQL 语句，可以执行这些语句以重现原始数据库对象定义和表数据。

默认情况下，`mysqldump` 将信息作为 SQL 语句写入标准输出，可以将输出保存在文件中。

要转储所有数据库，使用 `--all-databases` 选项调用 `mysqldump`。

```sh
mysqldump --all-databases > dump.sql
```

要仅转储特定数据库，使用 `--databases` 选项。

```sh
mysqldump --databases db1 db2 db3 > dump.sql
```

要只转储数据库中的特定表，请在命令行中将这些表命名在数据库名称之后。

```sh
mysqldump db1 t1 t3 t7 > dump.sql
```

要重新加载由 `mysqldump` 编写的包含 SQL 语句的转储文件，请将其用作 `mysql` 客户端的输入。

```sh
mysql < dump.sql
```

或者，从 `mysql` 中使用 `source` 命令。

```sh
source dump.sql
```

`mysqldump` **选项**：

- --**host**=*host_name*, -**h** *host_name*

  从给定主机上的 MySQL 服务器转储数据。

- --**password**[=*password*], -**p**[*password*]

  用于连接到服务器的 MySQL 帐户的密码。

- --**port**=*port_num*, -**P** *port_num*

  对于 TCP/IP 连接，要使用的端口号。

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

## 十、存储引擎

### MyISAM

#### 自增列

[MyISAM](https://dev.mysql.com/doc/refman/8.4/en/myisam-storage-engine.html) 引擎支持[复合主键](https://dev.mysql.com/doc/refman/8.4/en/multiple-column-indexes.html)包含自增列，而 [InnoDB](https://dev.mysql.com/doc/refman/8.4/en/innodb-storage-engine.html) 引擎不支持，因此 MyISAM 引擎[转换](https://cloud.tencent.com/document/product/236/45043)为 InnoDB 引擎后，创建表时会报错，报错信息为 [ERROR 1075](https://dev.mysql.com/doc/refman/8.4/en/mysql-cluster-limitations-syntax.html)。

MyISAM 允许自增列作为复合主键的非首列。

```sql
CREATE TABLE `ec_pdf` (
  `co` varchar(10) NOT NULL DEFAULT '',
  `ii` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`co`,`ii`)  -- MyISAM允许自增列作为复合主键的非首列
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
```

InnoDB 中，自增列必须是键。

```sql
CREATE TABLE `ec_pdf` (
  `co` varchar(10) NOT NULL DEFAULT '',
  `ii` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`co`,`ii`),  -- MyISAM允许自增列作为复合主键的非首列
  KEY `ii` (`ii`)           -- 为自增列创建索引
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

如果是复合主键，应位于复合主键的首位。

```sql
CREATE TABLE `ec_pdf` (
  `co` varchar(10) NOT NULL DEFAULT '',
  `ii` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ii`, `co`) -- 自增列作为主键首列
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

**原始数据分析：**

查询原始文件有多少自增参数。

```sh
grep -o "AUTO_INCREMENT" data.sql | wc -l

sed 's/ENGINE=MyISAM/ENGINE=InnoDB/g' data.sql | awk '
  BEGIN { RS=";"; ORS=";"; FS="\n"; OFS="\n"; count=0 }
  {
    for (i = 1; i <= NF; i++) {  # 遍历每个字段（即行）
      while ($i ~ /AUTO_INCREMENT/) {  # 如果当前字段包含 AUTO_INCREMENT
        sub(/AUTO_INCREMENT/, "", $i); # 移除第一个匹配项，避免无限循环
        count++;  # 递增计数
      }
    }
  }
  END { print count }'
```

查询原始文件中，有多少包含自增参数的行（一行可能包含多个自增参数，避免重复统计）。

```sh
grep "AUTO_INCREMENT" data.sql | wc -l

sed 's/ENGINE=MyISAM/ENGINE=InnoDB/g' data.sql | awk '
  BEGIN { RS=";"; ORS=";"; FS="\n"; OFS="\n"; count=0 }
  {
    for (i = 1; i <= NF; i++) {  # 遍历每个字段（即行）
      if ($i ~ /AUTO_INCREMENT/)  # 如果当前字段包含 AUTO_INCREMENT
        count++;  # 递增计数
    }
  }
  END { print count }'
```

查询原始文件中，有多少包含自增参数的 SQL 语句。

```sh
awk 'BEGIN { RS=";"; IGNORECASE=1 }
{
  gsub(/\n/, " ", $0);
  if ($0 ~ /CREATE[[:space:]]+TABLE/ && $0 ~ /AUTO_INCREMENT/)
    count++
}
END { print count }' data.sql

sed 's/ENGINE=MyISAM/ENGINE=InnoDB/g' data.sql | awk '
  BEGIN { RS=";"; ORS=";"; FS="\n" }
  $0 ~ /CREATE TABLE/ && $0 ~ /AUTO_INCREMENT/ { count++ }
  END { print count }'
```

查询原始文件中，有多少包含自增参数，且包含复合主键的 SQL 语句（匹配 `PRIMARY KEY`，且括号内至少一个逗号，以确保主键包含两个或更多字段）。

```sh
awk 'BEGIN { RS=";"; FS="\n"; IGNORECASE=1 }
{
  if ($0 ~ /CREATE[[:space:]]+TABLE/ && $0 ~ /AUTO_INCREMENT/ && $0 ~ /PRIMARY[[:space:]]+KEY[[:space:]]*\([^)]*,[^)]*\)/)
    count++
}
END { print count }' data.sql
```

查询需要修改的语句数量（自增列作为复合主键的非首列）。

```sh
awk 'BEGIN { RS = ";"; IGNORECASE = 1 }
{
    if ($0 ~ /CREATE[[:space:]]+TABLE/ && $0 ~ /AUTO_INCREMENT/) {
        pk_match = match($0, /PRIMARY[[:space:]]+KEY[[:space:]]*\([^)]+\)/);
        if (pk_match) {
            pk_def = substr($0, RSTART, RLENGTH);  # 提取主键定义

            # 提取主键字段列表
            split(pk_def, arr, /[(),]/);
            first_pk_field = arr[2];

            # 检查自增列是否为首字段
            if ($0 !~ first_pk_field"[^,]*AUTO_INCREMENT") {
                count++;
            }
        }
    }
}
END { print count }' data.sql
```

通过命令修改 SQL 语句，让自增列作为复合主键的首列（`gawk` 版本）。

```sh
sed 's/ENGINE=MyISAM/ENGINE=InnoDB/g' data.sql | awk '
BEGIN { RS = ";"; ORS = ";" }
{
    if ($0 ~ /CREATE[[:space:]]+TABLE/ && $0 ~ /AUTO_INCREMENT/) {
        ai_col = "";
        pk_fields = "";
        
        # 提取自增列名
        if (match($0, /`([^`]+)`[^,`]*AUTO_INCREMENT/, m))
            ai_col = m[1]
    
        # 提取主键字段列表
        if (match($0, /PRIMARY[[:space:]]+KEY[[:space:]]*\(([^)]+)\)/, pk)) {
            split(pk[1], arr, /,[[:space:]]*/)
            # 清洗字段名并检查顺序
            new_pk = ""
            for (i=1; i<=length(arr); i++) {
                gsub(/[`[:space:]]/, "", arr[i])  # 去除反引号和空格
                if (arr[i] == ai_col && new_pk == "") {
                    new_pk = ai_col  # 自增列置顶
                } else if (arr[i] != ai_col) {
                    pk_fields = (pk_fields == "" ? arr[i] : pk_fields "," arr[i])
                }
            }
            # 重组主键（仅当需要调整时）
            if (ai_col != "" && arr[1] != ai_col && new_pk != "") {
                new_pk = "PRIMARY KEY (`" ai_col "`" (pk_fields != "" ? ",`" pk_fields "`" : "") ")";
                gsub(/,/, "`,`", new_pk)  # 处理字段分隔符
                sub(/PRIMARY[[:space:]]+KEY[[:space:]]*\([^)]+\)/, new_pk, $0)
            }
        }
    }
    print $0
}' | sed '/PRIMARY KEY/s/``,``/`,`/g'  # 修复异常替换
```

[`mawk`](https://invisible-island.net/mawk/) 版本不支持 `match()` 函数的第三个参数（捕获组数组）。请使用以下兼容性改写方案：

```sh
sed 's/ENGINE=MyISAM/ENGINE=InnoDB/g' data.sql | mawk '
BEGIN {
    RS = ";\n*";
    ORS = ";\n";
    IGNORECASE = 1
}
{
    if ($0 ~ /CREATE[[:space:]]+TABLE/ && $0 ~ /AUTO_INCREMENT/) {
        ai_col = ""; pk_fields = ""
        # 兼容性提取自增列名
        if (match($0, /`[^`]+`[^,`]*AUTO_INCREMENT/)) {
            col_part = substr($0, RSTART, RLENGTH)
            ai_col = substr(col_part, 2, index(col_part, "` ")-2)
        }
        
        # 提取主键字段（兼容写法）
        if (match($0, /PRIMARY[[:space:]]+KEY[[:space:]]*\([^)]+\)/)) {
            pk_start = RSTART
            pk_end = RSTART + RLENGTH
            pk_str = substr($0, pk_start+13, pk_end - pk_start - 14)
            gsub(/[`[:space:]]/, "", pk_str)  # 清理特殊字符
            split(pk_str, pk_arr, ",")
            
            # 重组主键顺序
            if (ai_col != "" && pk_arr[1] != ai_col) {
                new_pk = ai_col
                for (i=1; i<=length(pk_arr); i++) {
                    if (pk_arr[i] != ai_col) 
                        new_pk = new_pk "," pk_arr[i]
                }
                # 替换主键定义
                sub(/PRIMARY[[:space:]]+KEY[[:space:]]*\([^)]+\)/,
                    "PRIMARY KEY (`" gensub(/,/, "`,`", "g", new_pk) "`)", $0)
            }
        }
    }
    print $0
}'
```

通过 [`gensub`](https://www.gnu.org/software/gawk/manual/html_node/String-Functions.html#index-gensub_0028_0029-function-_0028gawk_0029-1) 函数保持字段反引号的规范性，[GNU awk](https://www.gnu.org/software/gawk/manual/html_node/index.html) 支持，如使用其他版本可替换为 [`gsub`](https://www.gnu.org/software/gawk/manual/html_node/String-Functions.html#index-gsub_0028_0029-function-1) 链。

```sh
sed 's/ENGINE=MyISAM/ENGINE=InnoDB/g' data.sql | mawk '
BEGIN {
    RS = ";\n*";
    ORS = ";\n";
    IGNORECASE = 1
}
{
    if ($0 ~ /CREATE[[:space:]]+TABLE/ && $0 ~ /AUTO_INCREMENT/) {
        ai_col = ""; pk_fields = ""
        # 兼容性提取自增列名
        if (match($0, /`[^`]+`[^,`]*AUTO_INCREMENT/)) {
            col_part = substr($0, RSTART, RLENGTH)
            ai_col = substr(col_part, 2, index(col_part, "` ")-2)
        }
        
        # 提取主键字段（兼容写法）
        if (match($0, /PRIMARY[[:space:]]+KEY[[:space:]]*\([^)]+\)/)) {
            pk_start = RSTART
            pk_end = RSTART + RLENGTH
            pk_str = substr($0, pk_start+13, pk_end - pk_start - 14)
            gsub(/[`[:space:]]/, "", pk_str)  # 清理特殊字符
            split(pk_str, pk_arr, ",")
            
            # 重组主键顺序
            if (ai_col != "" && pk_arr[1] != ai_col) {
                new_pk = ai_col
                for (i=1; i<=length(pk_arr); i++) {
                    if (pk_arr[i] != ai_col) 
                        new_pk = new_pk "," pk_arr[i]
                }
                # 替换主键定义（用 gsub 替代 gensub）
                temp_pk = new_pk               # 创建临时变量
                gsub(/,/, "`,`", temp_pk)      # 直接修改临时变量
                sub(/PRIMARY[[:space:]]+KEY[[:space:]]*\([^)]+\)/,
                    "PRIMARY KEY (`" temp_pk "`)", $0)  # 使用修改后的变量
            }
        }
    }
    print $0
}'
```

