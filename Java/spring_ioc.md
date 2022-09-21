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

