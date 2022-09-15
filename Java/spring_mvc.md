# MVC

## DispatcherServlet

在 web.xml 中注册并初始化 `DispatcherServlet`：

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

## 注解控制器

### Request Mapping

可以使用 `@RequestMapping` 注解将请求映射到控制器方法。它有各种属性来匹配 URL、HTTP 方法、请求参数、标头和媒体类型。您可以在类级别使用它来表达共享映射，或者在方法级别使用它来缩小到特定的端点映射。

`@RequestMapping` 还有一些特定于 HTTP 方法的快捷变体：

- `@GetMapping`
- `@PostMapping`

以下示例具有类型和方法级别的映射：

```java
@RestController
@RequestMapping("/persons")
class PersonController {

    @GetMapping("/{id}")
    public Person getPerson(@PathVariable Long id) {
        // ...
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void add(@RequestBody Person person) {
        // ...
    }
}
```

#### URI patterns

`@RequestMapping` 方法可以使用 URL 模式进行映射。有两种选择：

- `PathPattern` — 与 URL 路径匹配的预解析模式。
- `AntPathMatcher` — 将字符串模式与字符串路径匹配。

### Handler Methods

`@RequestMapping` 处理程序方法具有灵活的签名，可以从一系列受支持的控制器方法参数和返回值中进行选择。

#### `@RequestParam`

可以使用 `@RequestParam` 注解将 Servlet 请求参数绑定到控制器中的方法参数。

```java
@GetMapping
public String setupForm(@RequestParam("petId") int petId, Model model) { 
    Pet pet = this.clinic.loadPet(petId);
    model.addAttribute("pet", pet);
    return "petForm";
}
```

## MVC 配置

### 启用 MVC 配置

在 XML 配置中，可以使用 `<mvc:annotation-driven>` 元素来启用 MVC 配置：

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

## 参见

- [Spring Web MVC](https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#mvc)

