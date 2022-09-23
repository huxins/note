# 使用 JDBC 进行数据访问

## 构件

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>4.3.2.RELEASE</version>
</dependency>
```

## 使用 JDBC 核心类控制基本 JDBC 处理和错误处理

### 使用 `JdbcTemplate`

`JdbcTemplate` 是 JDBC 核心包中的类。它处理资源的创建和释放，帮助您避免常见错误，例如忘记关闭连接。它执行核心 JDBC 工作流的基本任务，让应用程序代码提供 SQL 和提取结果。`JdbcTemplate` 类：

- 运行 SQL 查询
- 更新语句和存储过程调用
- 对 ResultSet 实例执行迭代并提取返回的参数值。
- 捕获 JDBC 异常并将它们转换为 `org.springframework.dao` 包中定义的通用、信息更丰富的异常层次结构。

当您在代码中使用 `JdbcTemplate` 时，您只需要实现回调接口，为它们提供明确定义的协定。给定 `JdbcTemplate` 类提供的 `Connection`，`PreparedStatementCreator` 回调接口创建一个准备好的语句，提供 SQL 和任何必要的参数。`CallableStatementCreator` 接口也是如此，它创建可调用的语句。`RowCallbackHandler` 接口从 `ResultSet` 的每一行中提取值。

您可以通过使用 `DataSource` 引用直接实例化在 DAO 实现中使用 `JdbcTemplate`，或者您可以在 Spring IoC 容器中配置它并将其作为 bean 引用提供给 DAO：

```xml
<bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
    <property name="dataSource" ref="dataSource"/>
</bean>
```

该类发出的所有 SQL 都记录在模板实例的全限定类名对应的类别下的 `DEBUG` 级别。

以下部分提供了一些 `JdbcTemplate` 使用示例。这些示例并不是 `JdbcTemplate` 公开的所有功能的详尽列表。请参阅相关的 [javadoc](https://docs.spring.io/spring-framework/docs/5.3.23/javadoc-api/org/springframework/jdbc/core/JdbcTemplate.html)。

#### 查询 (SELECT)

以下查询获取表中的行数：

```java
int rowCount = this.jdbcTemplate.queryForObject("select count(*) from t_actor", Integer.class);
```

以下查询使用绑定变量：

```java
int countOfActorsNamedJoe = this.jdbcTemplate.queryForObject(
        "select count(*) from t_actor where first_name = ?", Integer.class, "Joe");
```

以下查询查找 `String`：

```java
String lastName = this.jdbcTemplate.queryForObject(
        "select last_name from t_actor where id = ?",
        String.class, 1212L);
```

以下查询查找并填充单个 domain object：

```java
Actor actor = jdbcTemplate.queryForObject(
        "select first_name, last_name from t_actor where id = ?",
        (resultSet, rowNum) -> {
            Actor newActor = new Actor();
            newActor.setFirstName(resultSet.getString("first_name"));
            newActor.setLastName(resultSet.getString("last_name"));
            return newActor;
        },
        1212L);
```

以下查询查找并填充 domain objects 列表：

```java
List<Actor> actors = this.jdbcTemplate.query(
        "select first_name, last_name from t_actor",
        (resultSet, rowNum) -> {
            Actor actor = new Actor();
            actor.setFirstName(resultSet.getString("first_name"));
            actor.setLastName(resultSet.getString("last_name"));
            return actor;
        });
```

如果最后两段代码确实存在于同一个应用程序中，删除两个 `RowMapper` lambda 表达式中存在的重复项并将它们提取到单个字段中，然后可以根据需要由 DAO 方法引用是有意义的。例如，最好将前面的代码片段编写如下：

```java
private final RowMapper<Actor> actorRowMapper = (resultSet, rowNum) -> {
    Actor actor = new Actor();
    actor.setFirstName(resultSet.getString("first_name"));
    actor.setLastName(resultSet.getString("last_name"));
    return actor;
};

public List<Actor> findAllActors() {
    return this.jdbcTemplate.query("select first_name, last_name from t_actor", actorRowMapper);
}
```

因为要映射到的类遵循 JavaBean 规则，所以可以使用通过在 `newInstance` 方法中传递要映射到的所需类来创建的 `BeanPropertyRowMapper`。以下示例显示了如何执行此操作：

```java
BeanPropertyRowMapper.newInstance(Actor.class);
```

#### 更新 (INSERT、UPDATE、DELETE)

您可以使用 `update(..)` 方法执行插入、更新和删除操作。参数值通常作为变量参数提供，或者作为对象数组提供。

以下示例插入一个新条目：

```java
this.jdbcTemplate.update(
        "insert into t_actor (first_name, last_name) values (?, ?)",
        "Leonor", "Watling");
```

以下示例更新现有条目：

```java
this.jdbcTemplate.update(
        "update t_actor set last_name = ? where id = ?",
        "Banjo", 5276L);
```

以下示例删除一个条目：

```java
this.jdbcTemplate.update(
        "delete from t_actor where id = ?",
        Long.valueOf(actorId));
```

#### 其他 `JdbcTemplate` 操作

您可以使用 `execute(..)` 方法运行任意 SQL。因此，该方法通常用于 DDL 语句。以下示例创建一个表：

```java
this.jdbcTemplate.execute("create table mytable (id integer, name varchar(100))");
```

### 使用 `NamedParameterJdbcTemplate`

`NamedParameterJdbcTemplate` 类通过使用命名参数增加了对 JDBC 语句编程的支持，与仅使用经典占位符 (`'?'`) 参数来编写 JDBC 语句相反。`NamedParameterJdbcTemplate` 类封装了一个 `JdbcTemplate` 并委托给封装的 `JdbcTemplate` 来完成它的大部分工作。本节仅介绍 `NamedParameterJdbcTemplate` 类中与 `JdbcTemplate` 本身不同的那些领域 —— 即使用命名参数编写 JDBC 语句。下面的例子展示了如何使用 `NamedParameterJdbcTemplate`：

```java
String sql = "select count(*) from T_ACTOR where first_name = :first_name";

SqlParameterSource namedParameters = new MapSqlParameterSource("first_name", firstName);

return this.namedParameterJdbcTemplate.queryForObject(sql, namedParameters, Integer.class);
```

请注意在分配给 `sql` 变量的值和插入到 `namedParameters` 变量中的相应值中使用命名参数表示法。

或者，您可以使用基于 `Map` 的样式将命名参数及其对应值传递给 `NamedParameterJdbcTemplate` 实例。由 `NamedParameterJdbcOperations` 公开并由 `NamedParameterJdbcTemplate` 类实现的其余方法遵循类似的模式，此处不再赘述。

以下示例显示了基于 `Map` 的样式的使用：

```java
private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

public int countOfActorsByFirstName(String firstName) {

    String sql = "select count(*) from T_ACTOR where first_name = :first_name";

    Map<String, String> namedParameters = Collections.singletonMap("first_name", firstName);

    return this.namedParameterJdbcTemplate.queryForObject(sql, namedParameters,  Integer.class);
}
```

与 `NamedParameterJdbcTemplate` 相关的一个很好的特性是 `SqlParameterSource` 接口。您已经在前面的代码片段之一中看到了此接口的实现示例 `MapSqlParameterSource`。`SqlParameterSource` 是 `NamedParameterJdbcTemplate` 的命名参数值的来源。`MapSqlParameterSource` 类是一个简单的实现，它是围绕 `java.util.Map` 的适配器，其中键是参数名称，值是参数值。

另一个 `SqlParameterSource` 实现是 `BeanPropertySqlParameterSource` 类。此类包装任意 JavaBean 并使用包装的 JavaBean 的属性作为命名参数值的来源。

以下示例显示了基于 `BeanPropertySqlParameterSource` 的样式的使用：

```java
private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

public int countOfActors(Actor exampleActor) {

    String sql = "select count(*) from T_ACTOR where first_name = :firstName and last_name = :lastName";

    SqlParameterSource namedParameters = new BeanPropertySqlParameterSource(exampleActor);

    return this.namedParameterJdbcTemplate.queryForObject(sql, namedParameters, Integer.class);
}
```

请记住，`NamedParameterJdbcTemplate` 类包装了一个经典的 `JdbcTemplate` 模板。如果您需要访问包装的 `JdbcTemplate` 实例以访问仅存在于 `JdbcTemplate` 类中的功能，您可以使用 `getJdbcOperations()` 方法通过 `JdbcOperations` 接口访问包装好的 `JdbcTemplate`。

## 控制数据库连接

### 使用 `DataSource`

Spring 通过 `DataSource` 获取到数据库的连接。`DataSource` 是 JDBC 规范的一部分，是一个通用的连接工厂。它允许容器或框架从应用程序代码中隐藏连接池和事务管理问题。作为开发人员，您无需了解有关如何连接到数据库的详细信息。这是设置数据源的管理员的责任。在开发和测试代码时，您很可能同时担任这两个角色，但您不必知道 *production* 数据源的配置方式。

使用 Spring 的 JDBC 层时，可以从 JNDI 获取数据源，也可以通过第三方提供的连接池实现来配置自己的数据源。传统的选择是 Apache Commons DBCP 和具有 bean-style `DataSource` 类的 C3P0；对于现代 JDBC 连接池，请考虑使用 HikariCP 及其构建器风格的 API。

> 您应该仅将 `DriverManagerDataSource` 和 `SimpleDriverDataSource` 类用于测试目的！当对连接进行多个请求时，这些变体不提供池并且性能很差。

以下部分使用 Spring 的 `DriverManagerDataSource` 实现。稍后将介绍其他几个 `DataSource` 变体。

配置 `DriverManagerDataSource`：

```xml
<bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
    <property name="driverClassName" value="${jdbc.driverClassName}"/>
    <property name="url" value="${jdbc.url}"/>
    <property name="username" value="${jdbc.username}"/>
    <property name="password" value="${jdbc.password}"/>
</bean>

<context:property-placeholder location="jdbc.properties"/>
```

接下来的两个示例显示了 DBCP 和 C3P0 的基本连接和配置。要了解更多有助于控制池功能的选项，请参阅相应连接池实现的产品文档。

以下示例显示了 DBCP 配置：

```xml
<bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
    <property name="driverClassName" value="${jdbc.driverClassName}"/>
    <property name="url" value="${jdbc.url}"/>
    <property name="username" value="${jdbc.username}"/>
    <property name="password" value="${jdbc.password}"/>
</bean>

<context:property-placeholder location="jdbc.properties"/>
```

以下示例显示了 C3P0 配置：

```xml
<bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource" destroy-method="close">
    <property name="driverClass" value="${jdbc.driverClassName}"/>
    <property name="jdbcUrl" value="${jdbc.url}"/>
    <property name="user" value="${jdbc.username}"/>
    <property name="password" value="${jdbc.password}"/>
    <property name="minPoolSize" value="5"/>
    <property name="maxPoolSize" value="15"/>
    <property name="autoCommitOnClose" value="false"/>
    <property name="checkoutTimeout" value="10000"/>
    <property name="acquireRetryAttempts" value="2"/>
</bean>

<context:property-placeholder location="jdbc.properties"/>
```

