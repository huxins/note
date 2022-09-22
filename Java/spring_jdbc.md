# 使用 JDBC 进行数据访问

## 构件

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>4.3.2.RELEASE</version>
</dependency>
```

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

