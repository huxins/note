# IoC

## 类路径扫描和托管组件

### 自动检测类和注册 `BeanDefinition`

Spring 可以自动检测原型类并使用 `ApplicationContext` 注册相应的 `BeanDefinition` 实例。

使用 XML：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        https://www.springframework.org/schema/context/spring-context.xsd">

    <context:component-scan base-package="org.example"/>

</beans>
```

### 使用过滤器自定义扫描

默认情况下，使用 `@Component`、`@Repository`、`@Service`、`@Controller`、`@Configuration` 注解的类，或使用 `@Component` 注解的自定义注解是唯一检测到的候选组件。但是，您可以通过应用自定义过滤器来修改和扩展此行为。将它们添加为 `@ComponentScan` 注解的 `includeFilters` 或 `excludeFilters` 属性（或作为 XML 配置中 `<context:component-scan>` 元素的 `<context:include-filter />` 或 `<context:exclude-filter />` 子元素）。每个过滤器元素都需要类型和表达式属性。

```xml
<beans>
    <context:component-scan base-package="org.example">
        <context:include-filter type="regex"
                expression=".*Stub.*Repository"/>
        <context:exclude-filter type="annotation"
                expression="org.springframework.stereotype.Repository"/>
    </context:component-scan>
</beans>
```

可以通过在注解上设置 `useDefaultFilters=false` 或通过提供 `use-default-filters="false"` 作为 `<component-scan/>` 元素的属性来禁用默认过滤器。这有效地禁用了使用 `@Component`、`@Repository`、`@Service`、`@Controller`、`@RestController` 或 `@Configuration` 注解或元注解的类的自动检测。

## ApplicationContext

### 在 Web 应用程序中快捷实例化

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

## 参考文献

- [Spring IoC有什么好处 - 知乎](https://www.zhihu.com/question/23277575)

## 参见

- [The IoC Container](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans)
