# Commons

## BeanUtils

### 构件

```xml
<dependency>
    <groupId>commons-beanutils</groupId>
    <artifactId>commons-beanutils</artifactId>
    <version>1.9.4</version>
</dependency>
```

### BeanUtils

通过 Java 反射 API 填充 JavaBeans 属性的实用方法。参考[文档](https://commons.apache.org/proper/commons-beanutils/javadocs/v1.9.4/apidocs/org/apache/commons/beanutils/BeanUtils.html)。

- **copyProperties**

对于属性名称相同的所有情况，将属性值从源 bean 复制到目标 bean。

> 支持类型转换，相同属性名并且类型之间支持转换时，可以自动转换。

### PropertyUtils

使用 Java 反射 API 来促进对 Java 对象的通用属性 getter 和 setter 操作的实用方法。参考[文档](https://commons.apache.org/proper/commons-beanutils/javadocs/v1.9.4/apidocs/org/apache/commons/beanutils/PropertyUtils.html)。

- **copyProperties**

在属性名称相同的所有情况下，将属性值从 *origin* bean 复制到 *destination* bean。

> 不支持类型转换，必须是类型和属性名一样才处理。

## 参见

- [Apache Commons Proper](https://commons.apache.org/)

