# cglib

## 构件

```xml
<dependency>
    <groupId>cglib</groupId>
    <artifactId>cglib</artifactId>
    <version>3.3.0</version>
</dependency>
```

## BeanCopier

属性名称、类型都相同时，进行复制：

```java
BeanCopier copier = BeanCopier.create(ProductorsDTO.class, ProductorsDO.class, false);
copier.copy(productors, productorsDO, null);
```

> BeanCopier 只拷贝名称和类型都相同的属性。

