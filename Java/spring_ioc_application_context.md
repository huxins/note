# ApplicationContext

## 在 Web 应用程序中快捷实例化

可以使用 `ContextLoader` 以声明方式创建 `ApplicationContext` 实例。也可以使用 `ApplicationContext` 实现之一以编程方式创建 `ApplicationContext` 实例。

使用 `ContextLoaderListener` 注册 `ApplicationContext`：

```xml
<context-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>classpath:applicationContext.xml</param-value>
</context-param>

<listener>
    <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
</listener>
```

`ContextLoaderListener` 检查 `contextConfigLocation` 参数。如果该参数不存在，则默认使用 `/WEB-INF/applicationContext.xml`。

## 参见

- [The IoC Container](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans)

