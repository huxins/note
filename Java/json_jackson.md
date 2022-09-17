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

### 配置

#### 字段与属性匹配

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

### 反序列化

```java
ObjectMapper objectMapper = new ObjectMapper();
Car car = objectMapper.readValue(carJson, Car.class);
Car[] cars = objectMapper.readValue(jsonArray, Car[].class);
List<Car> cars = objectMapper.readValue(jsonArray, new TypeReference<List<Car>>(){});
Map<String, Object> jsonMap = objectMapper.readValue(jsonObject, new TypeReference<Map<String,Object>>(){});
```

#### 自定义反序列化

有时，不希望 `ObjectMapper` 以缺省方式将 JSON 字符串读入 Java 对象。可以将自定义反序列化器添加到 `ObjectMapper`，可以按需要执行反序列化。

通过 `BeanDeserializerFactory#createBeanDeserializer` 以确定使用哪一个 `Deserializer` 来反序列化数据。

对 `String.class` 的自定义反序列化：

```java
SimpleModule module = new SimpleModule();
module.addDeserializer(String.class, new StdScalarDeserializer<String>(String.class) {
    @Override
    public String deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        return p.getValueAsString() == null ? null : p.getValueAsString().trim();
    }
});
objectMapper.registerModule(module);
```

对 `Car.class` 的自定义反序列化：

```java
SimpleModule module = new SimpleModule();
module.addDeserializer(Car.class, new StdScalarDeserializer<Car>(Car.class) {
    @Override
    public Car deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        Car car = new Car();
        JsonToken jsonToken;
        while(!p.isClosed() && (jsonToken = p.nextToken()) != null){
            if(JsonToken.FIELD_NAME.equals(jsonToken)){
                String fieldName = p.getCurrentName();
                p.nextToken();
                if("carId".equals(fieldName)){
                    car.setCarId(p.getValueAsString());
                } else if ("id".equals(fieldName)){
                    car.setId(p.getValueAsInt());
                }
            }
        }
        return car;
    }
});
objectMapper.registerModule(module);
```

### 序列化

```java
ObjectMapper objectMapper = new ObjectMapper();
objectMapper.writeValue(new FileOutputStream("output.json"), car);
String s = objectMapper.writeValueAsString(car);
byte[] bytes = objectMapper.writeValueAsBytes(car);
```

#### 自定义序列化

有时，不希望 `ObjectMapper` 以缺省方式将 Java 对象序列化为 JSON 字符串。例如，想要在 JSON 中使用与 Java 对象中不同的字段名称，或者希望完全省略某些字段。

对 `Car.class` 的自定义序列化：

```java
SimpleModule module = new SimpleModule();
module.addSerializer(Car.class, new StdSerializer<Car>(Car.class) {
    @Override
    public void serialize(Car car, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeStringField("producer", car.getCarId());
        jsonGenerator.writeNumberField("doorCount", car.getId());
        jsonGenerator.writeEndObject();
    }
});
objectMapper.registerModule(module);
```

#### 日期格式化

默认情况下，`ObjectMapper` 会将 `java.util.Date` 对象序列化为 `long` 型的 Unix 时间戳。

可以通过在 `ObjectMapper` 上设置 `SimpleDateFormat` 来指定要使用的日期格式。

```java
SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
objectMapper.setDateFormat(dateFormat);
```

## JsonNode

Jackson 具有内置的树模型，可用于表示 JSON 对象。如果接收到未知的 JSON 格式，或者不想创建一个类来表示它，可以使用 Jackson 的树模型。如果需要在使用或转化 JSON 之前对其进行操作，也可以用 Jackson 树模型。

### 字符串转 JsonNode

Jackson 树模型由 `JsonNode` 类表示。可以使用 `ObjectMapper` 将 JSON 解析为 JsonNode 树模型。

```java
JsonNode jsonNode = objectMapper.readValue(jsonStr, JsonNode.class);
JsonNode jsonNode = objectMapper.readTree(jsonStr);
```

### 对象转 JsonNode

可以使用 `ObjectMapper` 将 Java 对象转换为 `JsonNode`，而 `JsonNode` 是转换后的 Java 对象的 JSON 表示形式。

```java
ObjectMapper objectMapper = new ObjectMapper();
Car car = new Car();
JsonNode carJsonNode = objectMapper.valueToTree(car);
```

### JsonNode 转对象

```java
ObjectMapper objectMapper = new ObjectMapper();
JsonNode carJsonNode = objectMapper.readTree(carJson);
Car car = objectMapper.treeToValue(carJsonNode, Car.class);
```

### 获取字段

**获取字段值**：

```java
JsonNode carIdNode = jsonNode.get("carId");
String carId = carIdNode.asText();

JsonNode idNode = jsonNode.get("id");
int id = idNode.asInt();

JsonNode arrNode = jsonNode.get("arr");
int i = arrNode.get(0).asInt();

String s = jsonNode.at("/car/carId").asText();
```

**为 `null` 时，设置默认值**：

关于默认值，如果该字段在 JSON 中未显式设置为 `null`，即未定义，则调用 `JsonNode#get` 将返回 `null`。

```java
String strDefault = jsonNode.asText("Default");
```

**迭代所有字段**：

```java
Iterator<String> fieldNames = jsonNode.fieldNames();
while(fieldNames.hasNext()) {
    String fieldName = fieldNames.next();
    JsonNode field = jsonNode.get(fieldName);
}
```

### ObjectNode

`JsonNode` 类是不可变的，可以通过 `ObjectNode` 实现相应需求。

```java
ObjectMapper objectMapper = new ObjectMapper();
ObjectNode objectNode = objectMapper.createObjectNode();
```

要在 `ObjectNode` 上设置字段，可以调用其 `set()` 方法：

```java
objectNode.set("child", childNode);
```

可以通过 `put()` 直接设置值：

```java
objectNode.put("field1", "value1");
objectNode.put("field2", 123);
objectNode.put("field3", 999.999);
```

可以通过 `remove()` 删除字段：

```java
objectNode.remove("fieldName");
```

## JsonParser

`JsonParser` 是一个 JSON 解析器。

`JsonParser` 的运行层级低于 `ObjectMapper`。这使得 `JsonParser` 比 `ObjectMapper` 更快，但使用起来也比较麻烦。

**创建一个 `JsonParser`**：

为了创建 `JsonParser`，首先需要创建一个 `JsonFactory`。`JsonFactory` 用于创建 `JsonParser` 实例。`JsonFactory` 类包含几个 `createParser()` 方法，每个方法都使用不同的 JSON 源作为参数。

```java
JsonFactory factory = new JsonFactory();
JsonParser  parser  = factory.createParser(jsonStr);
```

创建了 `JsonParser`，就可以使用它来解析 JSON。`JsonParser` 的工作方式是将 JSON 分解为一系列令牌，可以一个一个地迭代令牌。

```java
JsonFactory factory = new JsonFactory();
JsonParser  parser  = factory.createParser(carJson);
JsonToken jsonToken;

while(!parser.isClosed() && (jsonToken = parser.nextToken()) != null){
    System.out.println("jsonToken = " + jsonToken);
}
```

## JsonGenerator

`JsonGenerator` 用于从 Java 对象生成 JSON。

**创建一个 `JsonGenerator`**：

为了创建 `JsonGenerator`，首先需要创建一个 `JsonFactory`。`JsonFactory` 用于创建 `JsonGenerator` 实例。

```java
JsonFactory factory = new JsonFactory();
JsonGenerator generator = factory.createGenerator(new File("output.json"), JsonEncoding.UTF8);
```

创建了 `JsonGenerator`，就可以开始生成 JSON。`JsonGenerator` 包含一组 `write...()` 方法，可以使用这些方法来编写 JSON 对象的各个部分。

```java
JsonFactory factory = new JsonFactory();
JsonGenerator generator = factory.createGenerator(new File("output.json"), JsonEncoding.UTF8);

generator.writeStartObject();
generator.writeStringField("carId", "Peugeot 408");
generator.writeNumberField("userId", 1632);
generator.writeEndObject();

generator.close();
```

## 注解

Jackson 包含一组 Java 注解，可以使用这些注解来设置将 JSON 读入对象的方式或从对象生成 JSON 的方式。

### 通用注解

#### `@JsonIgnore`

注解 `@JsonIgnore` 用于忽略 Java 对象的某个属性。在将 JSON 读取到 Java 对象中以及将 Java 对象写入 JSON 时，都将忽略该属性。

#### `@JsonIgnoreProperties`

注解 `@JsonIgnoreProperties` 用于指定要忽略的类的属性列表。`@JsonIgnoreProperties` 注解放置在类声明上方，而不是要忽略的各个属性上方。

```java
@JsonIgnoreProperties({"firstName", "lastName"})
public class PersonIgnoreProperties {...
```

