# Druid

## 构件

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.2.8</version>
</dependency>
```

## 配置属性

```xml
<bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource" init-method="init" destroy-method="close">
    <property name="driverClassName" value="${jdbc.driverClassName}"/>
    <property name="url" value="${jdbc.url}"/>
    <property name="username" value="${jdbc.username}"/>
    <property name="password" value="${jdbc.password}"/>

    <!-- 配置连接池大小 -->
    <property name="initialSize" value="5"/>
    <property name="minIdle" value="10"/>
    <property name="maxActive" value="20"/>

    <!-- 配置获取连接等待超时的时间 -->
    <property name="maxWait" value="6000"/>

    <!-- 配置间隔多久才进行一次检测，检测需要关闭的空闲连接 -->
    <property name="timeBetweenEvictionRunsMillis" value="2000"/>

    <!-- 配置一个连接在池中最小生存的时间 -->
    <property name="minEvictableIdleTimeMillis" value="600000"/>
    <property name="maxEvictableIdleTimeMillis" value="900000"/>

    <property name="validationQuery" value="select 1"/>
    <property name="testWhileIdle" value="true"/>
    <property name="testOnBorrow" value="false"/>
    <property name="testOnReturn" value="false"/>

    <!-- PSCache -->
    <property name="poolPreparedStatements" value="true"/>
    <property name="maxPoolPreparedStatementPerConnectionSize" value="20"/>

    <!-- filters -->
    <property name="filters" value="stat"/>
</bean>
```

