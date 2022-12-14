# MySQL

## 1. 安装和升级 MySQL

### 1.5. 在 Linux 上安装 MySQL

#### 1.5.1. 使用 MySQL Yum 存储库

##### 1.5.1.1. 全新安装 MySQL 的步骤

- 添加 MySQL Yum 存储库

  ```sh
  $ yum install https://repo.mysql.com/mysql80-community-release-el7-7.noarch.rpm
  ```
  
- 选择发布系列

  ```sh
  $ yum-config-manager --disable mysql80-community
  $ yum-config-manager --enable mysql57-community
  ```

- 安装 MySQL

  ```sh
  $ yum install mysql-community-server
  ```

- 腾讯镜像源：

  ```sh
  $ sed -Ee '/tools|connectors|5.7/s/repo.mysql.com/mirrors.cloud.tencent.com\/mysql/g' \
    -e '/tools|connectors|5.7/s/community\/el\/7\//community-el7-/g' \
    -i /etc/yum.repos.d/mysql-community.repo
  ```

## 3. MySQL 程序

### 3.5. 客户端程序

#### 3.5.2. mysqladmin

`mysqladmin` 是用于执行管理操作的客户端。您可以使用它来检查服务器的配置和当前状态，创建和删除数据库等等。

像这样调用 `mysqladmin`：

```
mysqladmin [options] command [command-arg] [command [command-arg]] ...
```

`mysqladmin` 支持以下命令。一些命令在命令名称后带有一个参数。

- `flush-privileges`

  重新加载授权表。
  
- `password` *new_password*

  设置新密码。

`mysqladmin` 支持以下选项，可以在命令行或选项文件的 `[mysqladmin]` 和 `[client]` 组中指定。

- `--user`=*user_name*, `-u` *user_name*

  用于连接到服务器的 MySQL 帐户的用户名。

## 4. MySQL 服务器管理

### 4.1. MySQL 服务器

#### 4.1.6. 服务器命令选项

`mysqld` 从 `[mysqld]` 和 `[server]` 组中读取选项。`mysqld_safe` 从 `[mysqld]`、`[server]`、`[mysqld_safe]` 和 `[safe_mysqld]` 组读取选项。

- `--skip-grant-tables`

  命令行格式：`--skip-grant-tables[={OFF|ON}]`

  配置服务器不读取 `mysql` 系统数据库中的授权表，因此根本不使用权限系统启动。这使任何有权访问服务器的人都可以不受限制地访问所有数据库。
  
  要使以 `--skip-grant-tables` 启动的服务器在运行时加载授权表，请执行权限刷新操作，可以通过以下方式完成：
  
  - 连接到服务器后发出 `MySQL FLUSH PRIVILEGES` 语句。
  - 从命令行执行 `mysqladmin flush-privileges` 或 `mysqladmin reload` 命令。

#### 4.1.8. 使用系统变量

- 设置全局系统变量：

  ```sql
  SET GLOBAL max_connections = 1000;
  SET @@GLOBAL.max_connections = 1000;
  ```
  
- 设置会话系统变量：

  ```sql
  SET SESSION sql_mode = 'TRADITIONAL';
  SET @@SESSION.sql_mode = 'TRADITIONAL';
  SET @@sql_mode = 'TRADITIONAL';
  ```
  
- 获得系统变量的会话值或全局值：

  ```sql
  SELECT @@validate_password_policy;
  ```

## 5. 安全

### 5.2. 访问控制和帐户管理

#### 5.2.4. 指定帐户名称

MySQL 帐户名由用户名和主机名组成，这使得从不同主机连接的具有相同用户名的用户可以创建不同的帐户。本节介绍帐户名称的语法，包括特殊值和通配符规则。

账户名出现在 `CREATE USER`、`GRANT` 和 `SET PASSWORD` 等 SQL 语句中并遵循以下规则：

- 帐户名语法为 `'user_name'`@`'host_name'`。
- `@'host_name'` 部分是可选的。仅由用户名组成的帐户名等同于 `'user_name'`@`'%'`。例如，`'me'` 等同于 `'me'@'%'`。
- 如果用户名和主机名作为未加引号的标识符是合法的，则不需要加引号。如果 `user_name` 字符串包含特殊字符，或者 `host_name` 字符串包含特殊字符或通配符，则必须使用引号。

### 5.4. 安全插件

#### 5.4.3. 密码验证插件

##### 5.4.3.2. 密码验证插件选项和变量

密码验证插件系统变量：

- `validate_password_policy`

  命令行格式：`--validate-password-policy=value`

  默认值：`1`
  
  可选值：`0`, `1`, `2`
  
  由 *validate_password* 强制执行的密码策略。除非安装了 *validate_password*，否则此变量不可用。
  
  修改安全等级：
  
  ```sql
  SELECT @@validate_password_policy;
  SET GLOBAL validate_password_policy = 0;
  ```

## 12. SQL 语句

### 12.7. 数据库管理语句

#### 12.7.1. 账户管理语句

##### 12.7.1.1. ALTER USER 语句

更改用户密码：

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
ALTER USER USER() IDENTIFIED BY 'new_password';
```

##### 12.7.1.4. GRANT 语句

查询用户授权：

```sql
USE mysql;
SELECT user, host FROM user;
```

增加用户授权：

```sql
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' IDENTIFIED BY 'auth_string' WITH GRANT OPTION;
```

##### 12.7.1.7. SET PASSWORD 语句

更改用户密码：

```sql
SET PASSWORD FOR 'root'@'localhost' = 'new_password';
```

#### 12.7.4. SET 语句

修改系统变量：

```sql
SET GLOBAL system_var_name = expr;
```

#### 12.7.6. 其他管理语句

##### 12.7.6.3. FLUSH 语句

从 *mysql* 系统数据库的授权表中重新读取权限：

```sql
FLUSH PRIVILEGES;
```







# 数据操纵

## 更新数据

联表更新：

```sql
UPDATE products ps
  LEFT JOIN productionorder po ON po.barcode = ps.name
    SET ps.price = po.number;
```

