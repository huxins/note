# MVC

## 构件

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>4.3.2.RELEASE</version>
</dependency>
```

## DispatcherServlet

`DispatcherServlet` 与所有 `Servlet` 一样，需要根据 `Servlet` 规范通过使用 Java 配置或在 `web.xml` 中进行声明和映射。

以下 `web.xml` 配置示例注册并初始化 `DispatcherServlet`：

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

## 注解 Controllers

Spring MVC 提供了一个基于注解的编程模型，其中 `@Controller` 和 `@RestController` 组件使用注解来表达请求映射、请求输入、异常处理等。带注解的控制器具有灵活的方法签名，不必扩展基类，也不必实现特定的接口。

`@RestController` 是一个组合注解，它本身使用 `@Controller` 和 `@ResponseBody` 进行元注解，其每个方法都继承了类型级别的 `@ResponseBody` 注解，因此，直接写入 *response body*。

### Request Mapping

可以使用 `@RequestMapping` 注解将请求映射到控制器方法。它有各种属性来匹配 URL、HTTP 方法、请求参数、标头和媒体类型。您可以在类级别使用它来表达共享映射，或者在方法级别使用它来缩小到特定的端点映射。

`@RequestMapping` 还有一些特定于 HTTP 方法的快捷变体：

- `@GetMapping`
- `@PostMapping`

#### URI patterns

`@RequestMapping` 方法可以使用 URL 模式进行映射。有两种选择：

- `PathPattern` — 与 URL 路径匹配的预解析模式。
- `AntPathMatcher` — 将字符串模式与字符串路径匹配。

可以使用 `@PathVariable` 访问捕获的 URI 变量。例如：

```java
@GetMapping("/getUser/{userId}")
public String getUser(@PathVariable String userId) {
    // ...
}
```

#### Producible Media Types

可以根据 `Accept` 请求标头和控制器方法生成的内容类型列表来缩小请求映射，如以下示例所示：

```java
@GetMapping(path = "/getId", produces = MediaType.APPLICATION_JSON_VALUE)
public String getId(String id) {
    // ...
}
```

媒体类型可以指定一个字符集：

```java
@GetMapping(path = "/getId", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
```

### Handler Methods

`@RequestMapping` handler methods 具有灵活的签名，可以从一系列受支持的控制器方法参数和返回值中进行选择。

#### `@RequestParam`

可以使用 `@RequestParam` 注解将 Servlet 请求参数绑定到控制器中的方法参数。

```java
@GetMapping
public String getId(@RequestParam("id") int userId) {
    // ...
}
```

默认情况下，使用此注解的方法参数是必需的，但可以通过将 `@RequestParam` 的 `required` 标志设置为 `false` 或使用 `java.util.Optional` 声明参数来指定方法参数是可选的。

将参数类型声明为数组或列表允许解析相同参数名称的多个参数值。

#### `@ModelAttribute`

可以在方法参数上使用 `@ModelAttribute` 来访问模型中的属性，如果不存在，则将其实例化。模型属性还覆盖了 HTTP Servlet 请求参数的值，这些参数的名称与字段名称匹配。这被称为数据绑定，它使您无需解析和转换单个查询参数和表单字段。以下示例显示了如何执行此操作：

```java
@PostMapping("/getCar")
public String getCar(@ModelAttribute Car car) {
    // method logic...
}
```

#### `@RequestBody`

可以使用 `@RequestBody` 注解通过 `HttpMessageConverter` 读取请求正文并将其反序列化为 `Object`。以下示例使用 `@RequestBody` 参数：

```java
@PostMapping("/getCar")
public String getCat(@RequestBody Car car) {
    // ...
}
```

### DataBinder

```java
@InitBinder
private void initBinder(ServletRequestDataBinder binder) {
    binder.registerCustomEditor(
        Date.class,
        new CustomDateEditor(new SimpleDateFormat("yyyy-MM-dd"), true)
    );
}
```

## MVC 配置

### 启用 MVC 配置

在 XML 配置中，可以使用 `<mvc:annotation-driven>` 元素来启用 MVC 配置，如以下示例所示：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:mvc="http://www.springframework.org/schema/mvc"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="
        http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/mvc
        https://www.springframework.org/schema/mvc/spring-mvc.xsd">

    <mvc:annotation-driven/>

</beans>
```

### 消息转换器

```xml
<mvc:annotation-driven>
    <mvc:message-converters>
        <bean class="org.springframework.http.converter.StringHttpMessageConverter">
            <property name="supportedMediaTypes" value="text/html; charset=utf-8"/>
        </bean>
        <bean class="org.springframework.http.converter.json.MappingJackson2HttpMessageConverter">
            <property name="supportedMediaTypes" value="text/html; charset=utf-8"/>
        </bean>
    </mvc:message-converters>
</mvc:annotation-driven>
```

## 参见

- [Spring Web MVC](https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#mvc)

