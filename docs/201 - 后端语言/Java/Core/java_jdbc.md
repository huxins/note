# JDBC

## 建立连接

### 指定数据库连接 URL

数据库连接 URL 是 DBMS JDBC 驱动程序用来连接数据库的字符串。它可以包含诸如在哪里搜索数据库、要连接到的数据库的名称以及配置属性等信息。数据库连接 URL 的确切语法由您的 DBMS 指定。参考 [Specifying Database Connection URLs](https://docs.oracle.com/javase/tutorial/jdbc/basics/connecting.html#db_connection_url)。

#### MySQL

##### MySQL Connector/J 构件

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.39</version>
</dependency>
```

##### MySQL Connector/J Database URL

```
jdbc:mysql://[host][,failoverhost...]
    [:port]/[database]
    [?propertyName1][=propertyValue1]
    [&propertyName2][=propertyValue2]...
```

- *host:port*：是托管数据库的计算机的主机名和端口号。
- *database*：是要连接的数据库的名称。
- *failover*：是备用数据库的名称（MySQL Connector/J 支持故障转移）。
- *propertyName=propertyValue*：表示一个可选的、以 & 符号分隔的属性列表。这些属性使您能够指示 MySQL Connector/J 执行各种任务。

URL 示例：

```properties
jdbc.driverClassName=com.mysql.jdbc.Driver
jdbc.jdbcUrl=jdbc:mysql://127.0.0.1:3306/dbname?useUnicode=true&characterEncoding=UTF-8
jdbc.user=root
jdbc.password=123456
```

#### PostgreSQL

##### PostgreSQL JDBC Driver 构件

```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <version>42.2.18</version>
</dependency>
```

##### PostgreSQL JDBC Driver URL

```properties
jdbc.driverClassName=org.postgresql.Driver
jdbc.url=jdbc:postgresql://127.0.0.1:5432/dbname?characterEncoding=utf-8
jdbc.username=postgres
jdbc.password=123456
```

#### SQL Server

参考[文档](https://learn.microsoft.com/en-us/sql/connect/jdbc/microsoft-jdbc-driver-for-sql-server)。

