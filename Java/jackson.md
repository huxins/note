# Jackson

## 构件

```xml
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.7.3</version>
</dependency>
```

## ObjectMapper

`ObjectMapper` 可以从字符串，流或文件中解析 JSON，并创建表示已解析的 JSON 的 Java 对象。将 JSON 解析为 Java 对象也称为从 JSON 反序列化 Java 对象。

`ObjectMapper` 也可以从 Java 对象创建 JSON。从 Java 对象生成 JSON 也称为将 Java 对象序列化为 JSON。

`ObjectMapper` 可以将 JSON 解析为自定义的类的对象，也可以解析至 JSON 树模型的对象。

### 反序列化

```java
ObjectMapper objectMapper = new ObjectMapper();
Car car = objectMapper.readValue(carJson, Car.class);
Car[] cars = objectMapper.readValue(jsonArray, Car[].class);
List<Car> cars = objectMapper.readValue(jsonArray, new TypeReference<List<Car>>(){});
Map<String, Object> jsonMap = objectMapper.readValue(jsonObject, new TypeReference<Map<String,Object>>(){});
```

### 字段与属性匹配

默认情况下，Jackson 通过将 JSON 字段的名称与 Java 对象中的 getter 和 setter 方法进行匹配，将 JSON 对象的字段映射到 Java 对象中的属性。

有时候，与 Java 对象相比，JSON 中的字段更多。默认情况下，`ObjectMapper` 在这种情况下会抛出异常，因为在 Java 对象中找不到该字段。

**忽略未知的 JSON 字段**：

```java
objectMapper.configure(
    DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
```

如果 JSON 字符串包含其值设置为 null 的字段，对于在相应的 Java 对象中是基本数据类型，`ObjectMapper` 默认会处理基本数据类型为 null 的情况。

**不允许基本类型为 null**：

```java
objectMapper.configure(
    DeserializationFeature.FAIL_ON_NULL_FOR_PRIMITIVES, true);
```

### 自定义反序列化

