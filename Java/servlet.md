# Servlet

## 构件

```xml
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>3.1.0</version>
    <scope>provided</scope>
</dependency>
```

## 部署描述符

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://java.sun.com/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://java.sun.com/xml/ns/javaee
                             http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
         metadata-complete="true"
         version="3.0">
</web-app>
```

## Servlet

### 配置

使用注解进行配置：

```java
@WebServlet(urlPatterns = "/WebServlet")
```

在部署描述符中进行配置：

```xml
<servlet>
    <servlet-name>WebServlet</servlet-name>
    <servlet-class>cn.inxiny.controller.ApplicationController</servlet-class>
    <load-on-startup>1</load-on-startup>
</servlet>
<servlet-mapping>
    <servlet-name>WebServlet</servlet-name>
    <url-pattern>/</url-pattern>
</servlet-mapping>
```

### ServletConfig

```xml
<servlet>
    <servlet-name>WebServlet</servlet-name>
    <servlet-class>cn.inxiny.controller.ApplicationController</servlet-class>
    <init-param>
        <param-name>name</param-name>
        <param-value>value</param-value>
    </init-param>
</servlet>
```

获取初始化参数：

```java
this.getServletConfig().getInitParameter("name");
```

## ServletContext

```xml
<context-param>
    <param-name>name</param-name>
    <param-value>value</param-value>
</context-param>
```

获取初始化参数：

```java
this.getServletContext().getInitParameter("name");
```

获取资源文件绝对路径：

```java
this.getServletContext().getRealPath("/WEB-INF/classes/jdbc.properties");
```

获取资源文件 MIME type：

```java
this.getServletContext().getMimeType("test.jpg");
```

获取资源文件流：

```java
this.getServletContext().getResourceAsStream("/WEB-INF/classes/test.jpg");
```

## Filter

### 配置

使用注解进行配置：

```java
@WebFilter(filterName = "CodeFilter", urlPatterns = "/*")
```

在部署描述符中进行配置：

```xml
<filter>
    <filter-name>ApplicationFilter</filter-name>
    <filter-class>cn.inxiny.controller.ApplicationFilter</filter-class>
</filter>
<filter-mapping>
    <filter-name>ApplicationFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

### FilterConfig

```xml
<filter>
    <filter-name>ApplicationFilter</filter-name>
    <filter-class>cn.inxiny.controller.ApplicationFilter</filter-class>
    <init-param>
        <param-name>name</param-name>
        <param-value>value</param-value>
    </init-param>
</filter>
```

获取初始化参数：

```java
filterConfig.getInitParameter("name");
```

### CharacterEncodingFilter

```xml
<filter>
    <filter-name>CharacterEncodingFilter</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
        <param-name>encoding</param-name>
        <param-value>UTF-8</param-value>
    </init-param>
    <init-param>
        <param-name>forceEncoding</param-name>
        <param-value>true</param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>CharacterEncodingFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

## HttpServletRequest

### Params

获取 HTTP Get 参数：

```java
req.getParameter("name");
```

## HttpServletResponse

### 编码

默认编码是 `ISO 8859-1`，目前在浏览器中都是以 `Windows-1252` 来实现的。

设置默认编码：

```java
resp.setCharacterEncoding(StandardCharsets.UTF_8);
```

设置 Header，同时会设置默认编码：

```java
resp.setHeader("Content-Type", "text/html; charset=utf-8");
```

下载文件时，因 HTTP header 不支持 `UTF-8`，仅支持 `ISO-8859-1`，需转换编码：

```java
// Chrome
String fileName = new String("文档.word".getBytes(StandardCharsets.UTF_8), StandardCharsets.ISO_8859_1);
// Chrome、IE11
String fileName = URLEncoder.encode("文档.word", StandardCharsets.UTF_8.name()).replace("+", "%20");
resp.setHeader("Content-Disposition", String.format("attachment; filename=%s", fileName));
```

## 参考文献

- [Java Servlet 3.1 规范笔记](https://emacsist.github.io/emacsist/servlet/Java Servlet 3.1 规范笔记.html)

## 参见

- [javaee/servlet-spec - GitHub](https://github.com/javaee/servlet-spec)

