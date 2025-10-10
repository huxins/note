# MySQL Connector

[MySQL Connector/NET](https://dev.mysql.com/doc/connector-net/en/) 使 .NET 应用程序能够与 MySQL 服务器通信。

## 一、安装

[Connector/NET](https://dev.mysql.com/doc/connector-net/en/connector-net-installation-binary-nuget.html#connector-net-installation-binary-nuget-packages) 提供以下 NuGet 包：

- [MySql.Data](https://www.nuget.org/packages/MySql.Data)：包含 Connector/NET 的核心功能。

## 二、配置连接

[`MySqlClient.MySqlConnection`](https://dev.mysql.com/doc/dev/connector-net/latest/api/data_api/MySql.Data.MySqlClient.MySqlConnection.html) 是 .NET 中用于与 MySQL 数据库建立连接的类。它是 MySQL Connector/NET 提供的一个重要组件，允许开发者通过 .NET 应用程序与 MySQL 数据库进行通信。

当给定 [`ConnectionString`](https://dev.mysql.com/doc/connector-net/en/connector-net-connections-string.html) 时，初始化 [`MySqlConnection`](https://dev.mysql.com/doc/dev/connector-net/latest/api/data_api/MySql.Data.MySqlClient.MySqlConnection.html#MySql_Data_MySqlClient_MySqlConnection__ctor_System_String_) 类的新实例。

```c#
MySqlConnection conn = new(@"server=localhost;
                             dns-srv=true;
                             user id=user;
                             password=****;
                             database=test");
```

## 三、执行语句

[`MySqlClient.MySqlCommand`](https://dev.mysql.com/doc/dev/connector-net/latest/api/data_api/MySql.Data.MySqlClient.MySqlCommand.html) 是 .NET 中用于执行 SQL 命令和查询的类，专门用于与 MySQL 数据库进行交互。它与 [`MySqlConnection`](https://dev.mysql.com/doc/dev/connector-net/latest/api/data_api/MySql.Data.MySqlClient.MySqlConnection.html) 类紧密协作，执行各种数据库操作，如插入、更新、删除和查询数据。

例如，使用 SQL 文本和 `MySqlConnection` 初始化 [`MySqlCommand`](https://dev.mysql.com/doc/dev/connector-net/latest/api/data_api/MySql.Data.MySqlClient.MySqlCommand.html#MySql_Data_MySqlClient_MySqlCommand__ctor_System_String_MySql_Data_MySqlClient_MySqlConnection_) 类的新实例。

```c#
using (MySqlConnection conn = new(connectionString))
{
    string sqlQuery = "SELECT * FROM ab LIMIT 1";
    MySqlCommand comm = new(sqlQuery, conn);
    conn.Open();
    MySqlDataReader dr = comm.ExecuteReader();
}
```

其中，[`ExecuteReader()`](https://dev.mysql.com/doc/dev/connector-net/latest/api/data_api/MySql.Data.MySqlClient.MySqlCommand.html#MySql_Data_MySqlClient_MySqlCommand_ExecuteReader) 将 [`CommandText`](https://dev.mysql.com/doc/dev/connector-net/latest/api/data_api/MySql.Data.MySqlClient.MySqlCommand.html#MySql_Data_MySqlClient_MySqlCommand_CommandText) 值发送到 [`MySqlConnection`](https://dev.mysql.com/doc/dev/connector-net/latest/api/data_api/MySql.Data.MySqlClient.MySqlConnection.html) 并构建 [`MySqlDataReader`](https://dev.mysql.com/doc/dev/connector-net/latest/api/data_api/MySql.Data.MySqlClient.MySqlDataReader.html) 对象，用于读取结果集。

## 四、读取数据

[`MySqlClient.MySqlDataReader`](https://dev.mysql.com/doc/dev/connector-net/latest/api/data_api/MySql.Data.MySqlClient.MySqlDataReader.html) 是 .NET 中用于读取从 MySQL 数据库返回的行的一个类。它是通过执行 SQL 查询获得的，并以一种只进的、只读的方式提供对结果集的访问。

以只进、只读的方式访问数据，这意味着只能向前读取数据，不能修改数据。

例如，通过列索引和列名称访问数据。

```c#
using MySqlDataReader dr = comm.ExecuteReader();

while (dr.Read())
{
    // 通过列索引访问数据
    var column1 = dr[0];

    // 通过列名称访问数据
    var columnName1 = dr["city"];

    // 根据具体列的数据类型，可以使用相应的类型转换
    string name = dr.GetString(7);

    Console.WriteLine($"第一列: {column1}, city: {columnName1}, Name: {name}");
}
```

其中，[`Read()`](https://dev.mysql.com/doc/dev/connector-net/latest/api/data_api/MySql.Data.MySqlClient.MySqlDataReader.html#MySql_Data_MySqlClient_MySqlDataReader_Read) 移动到结果集中的下一行。如果有更多行可读则返回 `true`，否则返回 `false`。

## Reference

- [MySQL Connector/NET and X DevAPI](https://dev.mysql.com/doc/dev/connector-net/latest/)

