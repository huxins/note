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

#### `@JsonProperty	`

用于属性，把属性的名称映射到另外一个名称。

```java
@JsonProperty("userId")
private long id;
```

#### `@JsonIgnore` 忽略属性

注解 `@JsonIgnore` 用于忽略 Java 对象的某个属性。在将 JSON 读取到 Java 对象中以及将 Java 对象写入 JSON 时，都将忽略该属性。

#### `@JsonIgnoreProperties` 忽略属性列表

注解 `@JsonIgnoreProperties` 用于指定要忽略的类的属性列表。`@JsonIgnoreProperties` 注解放置在类声明上方，而不是要忽略的各个属性上方。

```java
@JsonIgnoreProperties({"firstName", "lastName"})
public class PersonIgnoreProperties {...
```

#### `@JsonIgnoreType` 忽略类型

注解 `@JsonIgnoreType` 只能用于类级别。当一个被 `@JsonIgnoreType` 注解的类作为其他类的属性时，在序列化和反序列化期间将忽略该属性。

#### `@JsonAutoDetect`

默认情况下，Jackson 可以访问 `public` 字段以进行序列化和反序列化。如果没有可用的 `public` 字段，则使用 `public` getter/setter。我们可以通过使用 `@JsonAutoDetect` 注解来自定义这个默认行为。

```java
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class PersonAutoDetect {...
```

### 反序列化注解

#### @JsonSetter

注解 `@JsonSetter` 用于 JSON 字段名与 Java 属性名不一致时。

```java
@JsonSetter("id")
public void setCarId(String carId) {
    this.carId = carId;
}
```

#### `@JsonAnySetter`

注解 `@JsonAnySetter` 为 JSON 中所有无法识别的字段调用相同的 `setter()`。*无法识别*是指尚未映射到 Java 对象中的属性。

```java
public class Car {
    private Map<String, Object> properties = new HashMap<>();

    @JsonAnySetter
    public void set(String fieldName, Object value) {
        this.properties.put(fieldName, value);
    }

    public Object get(String fieldName) {
        return this.properties.get(fieldName);
    }
}
```

#### `@JsonCreator`

注解 `@JsonCreator` 定义反序列化的构造函数或工厂方法。`@JsonCreator` 在无法使用 `@JsonSetter` 的情况下很有用。

```java
public class Car {
    private long id = 0;
    private String name = null;

    @JsonCreator
    public Car(
            @JsonProperty("id") long id,
            @JsonProperty("name") String name) {
        this.id = id;
        this.name = name;
    }
}
```

#### `@JacksonInject`

注解 `@JacksonInject` 用于在反序列化过程中注入注解属性的值。对于想要添加源 JSON 中未包含的其他信息，这将非常有用。

```java
public class Car {
    private long id = 0;
    private String name = null;

    @JacksonInject
    private String source = null;
}
```

为了将值注入属性，需要在创建 `ObjectMapper` 时做一些额外的工作：

```java
InjectableValues inject = new InjectableValues.Std().addValue(String.class, "douyu.com");
Car car = new ObjectMapper().reader(inject)
    .forType(Car.class)
    .readValue(carJson);
```

#### `@JsonDeserialize`

注解 `@JsonDeserialize` 为 Java 对象中给定的属性指定自定义反序列化器类。

### 序列化注解

#### `@JsonFormat`

用于属性或者方法，以指定的格式转换属性。

```java
@JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm:ss")
private Date time;

@JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm:ss")
public Date getTime() {
    return time;
}
```

#### `@JsonInclude`

注解 `@JsonInclude` 定义仅在某些情况下包括属性。例如，仅当属性为非 `null` 或具有非默认值时，才应包括该属性。

```java
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class Car {...
```

#### `@JsonGetter`

`@JsonGetter` 注解用于 JSON 字段名与 Java 属性名不一致时。

```java
@JsonGetter("userId")
public long getId() {
    return id;
}
```

#### `@JsonAnyGetter`

序列化为 JSON 时，注解 `@JsonAnyGetter` 可以将 `Map` 中的每个键值对都视为一个属性。

```java
public class Car {
    private Map<String, Object> properties = new HashMap<>();

    @JsonAnyGetter
    public Map<String, Object> getProperties() {
        return properties;
    }
}
```

#### `@JsonPropertyOrder`

注解 `@JsonPropertyOrder` 用于指定将 Java 对象的属性序列化为 JSON 的顺序。

```java
@JsonPropertyOrder({"id", "name"})
public class Car {...
```

#### `@JsonRawValue`

注解 `@JsonRawValue` 将 Java 对象属性值直接写入 JSON 输出。如果该属性是字符串，JSON 通常会将值括在引号中，如果使用 `@JsonRawValue` 在属性上进行注解，JSON 值不带引号。

```java
public class Car {
    @JsonRawValue
    private String name;
}
```

#### `@JsonValue`

注解 `@JsonValue` 定义序列化时，不序列化对象本身，而是调用将对象序列化为 JSON 字符串的方法。

```java
@JsonValue
public String toJson(){
    return this.id + "," + this.name;
}
```

引号由 Jackson 添加。对象返回的值字符串中的所有引号均会转义。

#### `@JsonSerialize`

注解 `@JsonSerialize` 为 Java 对象中给定的属性指定自定义序列化器类。

