# MySql.Data

[MySQL Connector/NET](https://dev.mysql.com/doc/connector-net/en/) 使 .NET 应用程序能够与 MySQL 服务器通信。

## 一、MySql.Data.MySqlClient

### MySqlConnection

表示到 MySQL 数据库的连接。

- **MySqlConnection**(*String*)

  当给定 `ConnectionString` 时，初始化 `MySqlConnection` 类的新实例。

  ```c#
  MySqlConnection conn = new(@"server=localhost;
                               dns-srv=true;
                               user id=user;
                               password=****;
                               database=test");
  ```

属性：

- MySqlConnection.**ConnectionString**

  获取或设置用于连接 MySQL 数据库的[字符串](https://dev.mysql.com/doc/connector-net/en/connector-net-8-0-connection-options.html)。

### MySqlCommand

表示针对 MySQL 数据库执行的 SQL 语句。

- MySqlCommand.**MySqlCommand**(*String*, *MySqlConnection*)

  使用 SQL 文本和 `MySqlConnection` 初始化 `MySqlCommand` 类的新实例。

  ```c#
  using (MySqlConnection conn = new(connectionString))
  {
      string sqlQuery = "SELECT * FROM ab LIMIT 1";
      MySqlCommand comm = new(sqlQuery, conn);
      conn.Open();
      MySqlDataReader dr = comm.ExecuteReader();
  }
  ```

实例方法：

- MySqlCommand.**ExecuteReader**()

  将 `CommandText` 值发送到 `MySqlConnection` 并构建 `MySqlDataReader` 对象。

### MySqlDataReader

提供了一种从 MySQL 数据库中读取仅向前的行流的方法。

实例方法：

- MySqlDataReader.**Read**()

  将 `MySqlDataReader` 提前到下一条记录。

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

