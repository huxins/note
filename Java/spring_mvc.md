# MVC

## DispatcherServlet

### 在 Web 应用程序中快捷实例化

注册并初始化 `DispatcherServlet`：

```xml
<servlet>
    <servlet-name>app</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:webApplicationContext.xml</param-value>
    </init-param>
    <load-on-startup>1</load-on-startup>
</servlet>

<servlet-mapping>
    <servlet-name>app</servlet-name>
    <url-pattern>/app/*</url-pattern>
</servlet-mapping>
```

## 参见

- [Spring Web MVC](https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#mvc)

