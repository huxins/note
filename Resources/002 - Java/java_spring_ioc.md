# IoC

## 容器

`org.springframework.context.ApplicationContext` 接口代表 Spring IoC 容器，负责实例化、配置和组装 bean。容器通过读取配置元数据来获取关于要实例化、配置和组装哪些对象的指令。配置元数据以 XML、Java 注解或 Java 代码表示。它允许您表达组成应用程序的对象以及这些对象之间丰富的相互依赖关系。

### 配置元数据

以下示例显示了基于 XML 的配置元数据的基本结构：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="..." class="...">  
        <!-- collaborators and configuration for this bean go here -->
    </bean>

</beans>
```

## 依赖

典型的企业应用程序不包含单个对象。即使是最简单的应用程序也有一些对象协同工作，以呈现最终用户认为的连贯应用程序。

### 依赖注入

依赖注入是一个过程，其中对象仅通过构造函数参数、工厂方法参数或对象实例来构造或从工厂方法返回。然后容器在创建 bean 时注入这些依赖项。这个过程基本上是 bean 本身的逆过程，因此称为控制反转，它通过使用类的直接构造或服务定位器模式自行控制其依赖项的实例化或位置。

使用 DI 原则，代码更干净，当对象具有依赖关系时，解耦更有效。对象不查找其依赖项，也不知道依赖项的位置或类别。结果，您的类变得更容易测试，特别是当依赖关系在接口或抽象基类上时，它们允许在单元测试中使用 *stub* 或模拟实现。

#### 基于构造函数的依赖注入

基于构造函数的 DI 是通过容器调用具有多个参数的构造函数来完成的，每个参数代表一个依赖项。调用带有特定参数的静态工厂方法来构造 bean 几乎是等价的，并且本次讨论对构造函数和静态工厂方法的参数进行了类似的处理。以下示例显示了一个只能通过构造函数注入进行依赖注入的类：

```java
public class SimpleMovieLister {

    private final MovieFinder movieFinder;

    public SimpleMovieLister(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }

}
```

##### 构造函数参数解析

构造函数参数解析匹配通过使用参数的类型进行。如果 bean definition 的构造函数参数中不存在潜在的歧义，在 bean definition 中定义构造函数参数的顺序是在实例化 bean 时将这些参数提供给适当的构造函数的顺序。考虑以下类：

```java
package x.y;

public class ThingOne {

    public ThingOne(ThingTwo thingTwo, ThingThree thingThree) {
        // ...
    }
}
```

假设 `ThingTwo` 和 `ThingThree` 类没有继承关系，则不存在潜在的歧义。因此，以下配置工作正常，您无需在 `<constructor-arg/>` 元素中显式指定构造函数参数索引或类型。

```xml
<beans>
    <bean id="beanOne" class="x.y.ThingOne">
        <constructor-arg ref="beanTwo"/>
        <constructor-arg ref="beanThree"/>
    </bean>

    <bean id="beanTwo" class="x.y.ThingTwo"/>

    <bean id="beanThree" class="x.y.ThingThree"/>
</beans>
```

当引用另一个 bean 时，类型是已知的，并且可以发生匹配。当使用简单类型时，例如 `<value>true</value>`，Spring 无法确定 value 的类型，因此无法在没有帮助的情况下按类型匹配。考虑以下类：

```java
package examples;

public class ExampleBean {

    private final int years;

    private final String ultimateAnswer;

    public ExampleBean(int years, String ultimateAnswer) {
        this.years = years;
        this.ultimateAnswer = ultimateAnswer;
    }
}
```

##### 构造函数参数类型匹配

在上述场景中，如果您使用 `type` 属性显式指定构造函数参数的类型，则容器可以使用简单类型的类型匹配，如以下示例所示：

```xml
<bean id="exampleBean" class="examples.ExampleBean">
    <constructor-arg type="int" value="7500000"/>
    <constructor-arg type="java.lang.String" value="42"/>
</bean>
```

##### 构造函数参数索引

您可以使用 `index` 属性显式指定构造函数参数的索引，如以下示例所示：

```xml
<bean id="exampleBean" class="examples.ExampleBean">
    <constructor-arg index="0" value="7500000"/>
    <constructor-arg index="1" value="42"/>
</bean>
```

除了解决多个简单值的歧义之外，指定索引还可以解决构造函数具有两个相同类型参数的歧义。

##### 构造函数参数名称

您还可以使用构造函数参数名称进行值消歧，如以下示例所示：

```xml
<bean id="exampleBean" class="examples.ExampleBean">
    <constructor-arg name="years" value="7500000"/>
    <constructor-arg name="ultimateAnswer" value="42"/>
</bean>
```

#### 基于 Setter 的依赖注入

基于 Setter 的 DI 是通过容器在调用无参数构造函数或无参数静态工厂方法来实例化 bean 后调用 bean 上的 setter 方法来完成的。

以下示例显示了一个只能通过使用纯 setter 注入进行依赖注入的类。这个类是常规的 Java。它是一个 POJO，不依赖于容器特定的接口、基类或注解。

```java
public class SimpleMovieLister {

    private MovieFinder movieFinder;

    public void setMovieFinder(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }

}
```

以下示例将基于 XML 的配置元数据用于基于 setter 的 DI。Spring XML 配置文件的一小部分指定了一些 bean 定义，如下所示：

```xml
<bean id="exampleBean" class="examples.ExampleBean">
    <!-- 使用嵌套 ref 元素的 setter 注入 -->
    <property name="beanOne">
        <ref bean="anotherExampleBean"/>
    </property>

    <!-- 使用更整洁的 ref 属性的 setter 注入 -->
    <property name="beanTwo" ref="yetAnotherBean"/>
    <property name="integerProperty" value="1"/>
</bean>

<bean id="anotherExampleBean" class="examples.AnotherBean"/>
<bean id="yetAnotherBean" class="examples.YetAnotherBean"/>
```

### 依赖关系和配置

如上一节所述，您可以将 bean 属性和构造函数参数定义为对其他托管 bean（协作者）的引用或作为内联定义的值。为此，Spring 的基于 XML 的配置元数据在其 `<property/>` 和 `<constructor-arg/>` 元素中支持子元素类型。

#### Collections

`<list/>`、`<set/>`、`<map/>` 和 `<props/>` 元素分别设置 Java 集合类型 List、Set、Map 和 Properties 的属性和参数。以下示例显示了如何使用它们：

```xml
<bean id="moreComplexObject" class="example.ComplexObject">
    <!-- java.util.Properties -->
    <property name="adminEmails">
        <props>
            <prop key="administrator">administrator@example.org</prop>
            <prop key="support">support@example.org</prop>
            <prop key="development">development@example.org</prop>
        </props>
    </property>
    <!-- java.util.List -->
    <property name="someList">
        <list>
            <value>a list element followed by a reference</value>
            <ref bean="myDataSource" />
        </list>
    </property>
    <!-- java.util.Map -->
    <property name="someMap">
        <map>
            <entry key="an entry" value="just some string"/>
            <entry key="a ref" value-ref="myDataSource"/>
        </map>
    </property>
    <!-- java.util.Set -->
    <property name="someSet">
        <set>
            <value>just some string</value>
            <ref bean="myDataSource" />
        </set>
    </property>
</bean>
```

### 自动装配协作者

Spring 容器可以自动装配协作 bean 之间的关系。您可以通过检查 `ApplicationContext` 的内容让 Spring 为您的 bean 自动解析协作者（其他 bean）。

使用基于 XML 的配置元数据时，您可以使用 `<bean/>` 元素的 `autowire` 属性为 bean 定义指定自动装配模式。自动装配功能有四种模式。您可以指定每个 bean 的自动装配，从而可以选择要自动装配的 bean。

| Mode          | Explanation                                      |
| ------------- | ------------------------------------------------ |
| `no`          | 默认，不自动装配。Bean 引用必须由 ref 元素定义。 |
| `byName`      | 按属性名称自动装配。                             |
| `byType`      | 按属性类型自动装配。                             |
| `constructor` | 类似于 `byType` 但适用于构造函数参数。           |

## 自定义 Bean 的性质

Spring Framework 提供了许多接口，您可以使用它们来自定义 bean 的性质。

### 生命周期回调

要与容器对 bean 生命周期的管理进行交互，您可以实现 Spring `InitializingBean` 和 `DisposableBean` 接口。容器为前者调用 `afterPropertiesSet()` 并为后者调用 `destroy()` 以让 bean 在初始化和销毁 bean 时执行某些操作。

#### 初始化回调

`org.springframework.beans.factory.InitializingBean` 接口让 bean 在容器设置了 bean 的所有必要属性后执行初始化工作。`InitializingBean` 接口指定了一个方法：

```java
void afterPropertiesSet() throws Exception;
```

我们建议您不要使用 `InitializingBean` 接口，因为它不必要地将代码耦合到 Spring。我们建议使用 `@PostConstruct` 注解或指定 POJO 初始化方法。对于基于 XML 的配置元数据，您可以使用 `init-method` 属性来指定具有 `void` 无参数签名的方法的名称。通过 Java 配置，您可以使用 @Bean 的 `initMethod` 属性。参考以下示例：

```xml
<bean id="exampleInitBean" class="examples.ExampleBean" init-method="init"/>
```

#### 销毁回调

`org.springframework.beans.factory.DisposableBean` 接口让 bean 在包含它的容器被销毁时获得回调。`DisposableBean` 接口指定了一个方法：

```java
void destroy() throws Exception;
```

我们建议您不要使用 `DisposableBean` 接口，因为它不必要地将代码耦合到 Spring。我们建议使用 `@PreDestroy` 注解或指定 POJO 销毁方法。对于基于 XML 的配置元数据，您可以在 `<bean/>` 上使用 `destroy-method` 属性。通过 Java 配置，您可以使用 `@Bean` 的 `destroyMethod` 属性。参考以下示例：

```xml
<bean id="exampleInitBean" class="examples.ExampleBean" destroy-method="cleanup"/>
```

## 容器扩展点

通常，应用程序开发人员不需要继承 `ApplicationContext` 实现类，相反，可以通过插入特殊集成接口的实现来扩展 Spring IoC 容器。接下来的几节描述了这些集成接口。

### 使用 `BeanFactoryPostProcessor` 自定义配置元数据

#### 示例：类名替换 `PropertySourcesPlaceholderConfigurer`

您可以使用 `PropertySourcesPlaceholderConfigurer` 将 bean definition 中的属性值外部化到单独的文件中。这样做使部署应用程序的人员能够自定义特定于环境的属性，例如数据库 URL 和密码，而无需修改容器的主要 XML 定义文件。

参考以下基于 XML 的配置元数据片段，其中定义了具有占位符值的 `DataSource`：

```xml
<bean class="org.springframework.context.support.PropertySourcesPlaceholderConfigurer">
    <property name="locations" value="classpath:jdbc.properties"/>
</bean>

<bean id="dataSource" destroy-method="close"
        class="org.apache.commons.dbcp.BasicDataSource">
    <property name="driverClassName" value="${jdbc.driverClassName}"/>
    <property name="url" value="${jdbc.url}"/>
    <property name="username" value="${jdbc.username}"/>
    <property name="password" value="${jdbc.password}"/>
</bean>
```

该示例显示了从外部 `Properties` 文件配置的属性。在运行时，`PropertySourcesPlaceholderConfigurer` 应用于替换 `DataSource` 的某些属性的元数据。要替换的值被指定为 `${property-name}` 形式的占位符，它遵循 Ant 和 log4j 以及 JSP EL 样式。

> `PropertyPlaceholderConfigurer`：Deprecated. as of 5.2.

实际值来自标准 Java `Properties` 格式的另一个文件：

```properties
jdbc.driverClassName=org.hsqldb.jdbcDriver
jdbc.url=jdbc:hsqldb:hsql://production:9002
jdbc.username=sa
jdbc.password=root
```

因此，`${jdbc.username}` 字符串在运行时被替换为值 *sa*，这同样适用于与 `properties` 文件中的键匹配的其他占位符值。`PropertySourcesPlaceholderConfigurer` 检查 bean definition 的大多数属性和属性中的占位符。此外，您可以自定义占位符前缀和后缀。

使用 Spring 2.5 中引入的 `context` namespace，您可以使用专用配置元素配置属性占位符。您可以在 location 属性中以逗号分隔列表的形式提供一个或多个位置，如以下示例所示：

```xml
<context:property-placeholder location="classpath:jdbc.properties"/>
```

`PropertySourcesPlaceholderConfigurer` 不仅在您指定的 `Properties` 文件中查找属性。默认情况下，如果在指定的 `Properties` 文件中找不到属性，它会检查 Spring `Environment` 属性和常规 Java `System` 属性。

## 基于注解的容器配置

基于注解的配置提供了 XML 设置的替代方案，它依赖于字节码元数据来连接组件，而不是尖括号声明。开发人员不使用 XML 来描述 bean 关系，而是通过在相关类、方法或字段声明上使用注解将配置移动到组件类本身。

一如既往，您可以将 post-processors 注册为单独的 bean definitions，但也可以通过在基于 XML 的 Spring 配置中包含以下标记来隐式注册它们：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        https://www.springframework.org/schema/context/spring-context.xsd">

    <context:annotation-config/>

</beans>
```

### `@Autowired`

您可以将 `@Autowired` 注解应用于构造函数，如以下示例所示：

```java
public class MovieRecommender {

    private final CustomerPreferenceDao customerPreferenceDao;

    @Autowired
    public MovieRecommender(CustomerPreferenceDao customerPreferenceDao) {
        this.customerPreferenceDao = customerPreferenceDao;
    }

}
```

> 构造函数注入是通过对象构建的时候建立关系，所以这种方式对对象创建的顺序会有要求，Spring 会自动处理这样的先后顺序，除非出现循环依赖，然后就会抛出异常。
>
> 从 Spring Framework 4.3 开始，如果目标 bean 仅定义了一个构造函数，则不再需要在此类构造函数上使用 `@Autowired` 注解。但是，如果有多个构造函数可用并且没有 primary/default 构造函数，则必须至少使用 `@Autowired` 注释其中一个构造函数，以指示容器使用哪一个。

您还可以将 `@Autowired` 注解应用于传统的 setter 方法，如以下示例所示：

```java
public class SimpleMovieLister {

    private MovieFinder movieFinder;

    @Autowired
    public void setMovieFinder(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }

}
```

您还可以将注解应用于具有任意名称和多个参数的方法，如以下示例所示：

```java
public class MovieRecommender {

    private MovieCatalog movieCatalog;

    private CustomerPreferenceDao customerPreferenceDao;

    @Autowired
    public void prepare(MovieCatalog movieCatalog,
            CustomerPreferenceDao customerPreferenceDao) {
        this.movieCatalog = movieCatalog;
        this.customerPreferenceDao = customerPreferenceDao;
    }

}
```

您也可以将 `@Autowired` 应用于字段，甚至可以将其与构造函数混合使用，如以下示例所示：

```java
public class MovieRecommender {

    private final CustomerPreferenceDao customerPreferenceDao;

    @Autowired
    private MovieCatalog movieCatalog;

    @Autowired
    public MovieRecommender(CustomerPreferenceDao customerPreferenceDao) {
        this.customerPreferenceDao = customerPreferenceDao;
    }

}
```

> 字段注入通过 Java 的反射机制实现，所以 `private` 的成员也可以被注入具体的对象。
>
> 默认情况下，Spring 是按照类型装配的，也就是 `byType` 方式。所以需要确保您的目标组件始终由您用于 `@Autowired` 注解的注入点的类型声明。否则，注入可能会由于运行时出现 *no type match found* 错误而失败。

您还可以通过将 `@Autowired` 注解添加到需要该类型数组的字段或方法来指示 Spring 从 `ApplicationContext` 提供特定类型的所有 bean，如以下示例所示：

```java
public class MovieRecommender {

    @Autowired
    private MovieCatalog[] movieCatalogs;

}
```

这同样适用于集合，如以下示例所示：

```java
public class MovieRecommender {

    private Set<MovieCatalog> movieCatalogs;

    @Autowired
    public void setMovieCatalogs(Set<MovieCatalog> movieCatalogs) {
        this.movieCatalogs = movieCatalogs;
    }

}
```

只要预期的键类型是 `String`，即使是 `Map` 实例也可以自动装配。映射值包含预期类型的所有 bean，键包含相应的 bean 名称，如以下示例所示：

```java
public class MovieRecommender {

    private Map<String, MovieCatalog> movieCatalogs;

    @Autowired
    public void setMovieCatalogs(Map<String, MovieCatalog> movieCatalogs) {
        this.movieCatalogs = movieCatalogs;
    }

}
```

默认情况下，当给定注入点没有匹配的候选 bean 时，自动装配会失败。在声明的数组、集合或 map 的情况下，至少需要一个匹配元素。

### 使用 `@Primary` 微调基于注解的自动装配

因为按类型自动装配可能会导致多个候选者，因此通常需要对选择过程进行更多控制。实现这一点的一种方法是使用 Spring 的 `@Primary` 注解。`@Primary` 表示当多个 bean 成为自动装配到单值依赖项的候选者时，应该优先考虑特定的 bean。如果候选中恰好存在一个 primary bean，则它将成为自动装配的值。

参考以下将 `firstMovieCatalog` 定义为主 `MovieCatalog` 的配置：

```java
@Configuration
public class MovieConfiguration {

    @Bean
    @Primary
    public MovieCatalog firstMovieCatalog() { ... }

    @Bean
    public MovieCatalog secondMovieCatalog() { ... }

}
```

### 使用 `@Qualifiers` 微调基于注解的自动装配

当可以确定一个主要候选者时，`@Primary` 是通过多个实例按类型使用自动关联的有效方法。当您需要对选择过程进行更多控制时，可以使用 Spring 的 `@Qualifier` 注解。您可以将限定符值与特定参数相关联，缩小类型匹配集，以便为每个参数选择一个特定的 bean。

在最简单的情况下，这可以是一个简单的描述性值，如以下示例所示：

```java
public class MovieRecommender {

    @Autowired
    @Qualifier("movieCatalog")
    private MovieCatalog movieCatalog;

}
```

### `@Resource`

Spring 还支持通过在字段或属性 setter 方法上使用 JSR-250 `@Resource` 注解 (`javax.annotation.Resource`) 进行注入。

`@Resource` 采用名称属性。默认情况下，Spring 将该值解释为要注入的 bean name。换句话说，它遵循 by-name 语义，如以下示例所示：

```java
public class SimpleMovieLister {

    private MovieFinder movieFinder;

    @Resource(name="myMovieFinder") 
    public void setMovieFinder(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }
}
```

如果没有明确指定 name，则默认 name 派生自 field name 或 setter 方法。

## 类路径扫描和托管组件

### 自动检测类和注册 `BeanDefinition`

Spring 可以自动检测原型类并使用 `ApplicationContext` 注册相应的 `BeanDefinition` 实例。

以下替代方法使用 XML：

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

默认情况下，使用 `@Component`、`@Repository`、`@Service`、`@Controller`、`@Configuration` 注解的类，或使用 `@Component` 注解的自定义注解是唯一检测到的候选组件。但是，您可以通过应用自定义过滤器来修改和扩展此行为。将它们添加为 `@ComponentScan` 注解的 `includeFilters` 或 `excludeFilters` 属性，或作为 XML 配置中 `<context:component-scan>` 元素的 `<context:include-filter />` 或 `<context:exclude-filter />` 子元素。每个过滤器元素都需要类型和表达式属性。

以下示例显示了忽略所有 `@Repository` 注解并使用 `stub` 存储库的配置：

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

## `ApplicationContext` 的其他功能

### 在 Web 应用程序中快捷实例化

可以使用 `ContextLoader` 以声明方式创建 `ApplicationContext` 实例。也可以使用 `ApplicationContext` 实现之一以编程方式创建 `ApplicationContext` 实例。

可以使用 `ContextLoaderListener` 注册 `ApplicationContext`，如以下示例所示：

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

