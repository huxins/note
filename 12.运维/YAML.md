# YAML

YAML 是一个可读性高，用来表达数据序列化的格式。

## 一、语法

它的基本语法规则如下。

- 大小写敏感。
- 使用缩进表示层级关系。
- 缩进时不允许使用 Tab 键，只允许使用空格。
- 缩进的空格数目不重要，只要相同层级的元素左侧对齐即可。

特殊字符含义。

- `#` — 表示注释，从这个字符一直到行尾，都会被解析器忽略。
- `---` — 在一个文件中，可同时包含多个文件，并用 `---` 分隔。
- `...` — 选择性的符号，可以用来表示文件结尾，在利用流的通信中，这非常有用，可以在不关闭流的情况下，发送结束信号。

YAML 支持的数据结构有三种。

- 对象 — 键值对的集合。
- 数组 — 按次序排列的一组值。
- 纯量 — 单个的、不可再分的值。

## 二、对象

对象的一组键值对，使用冒号结构表示。

```yaml
name: Steve
foo: bar
```

Yaml 也允许另一种写法，将所有键值对写成一个行内对象。

```yaml
hash: { name: Steve, foo: bar }
```

## 三、数组

一组连词线开头的行，构成一个数组。

```yaml
- Cat
- Dog
- Goldfish
```

数组结构的子成员是一个数组，则可以在该项下面缩进一个空格。

```yaml
-
 - Cat
 - Dog
 - Goldfish
```

数组也可以采用行内表示法。

```yaml
animal: [Cat, Dog]
```

## 四、纯量

纯量是最基本的、不可再分的值。

### 4.1. 字符串

字符串默认不使用引号表示。如果字符串之中包含空格或特殊字符，需要放在引号之中。

```yaml
str: '内容： 字符串'
```

单引号和双引号都可以使用，双引号不会对特殊字符转义。单引号之中如果还有单引号，必须连续使用两个单引号转义。

字符串可以写成多行，从第二行开始，必须有一个单空格缩进。换行符会被转为空格。

  ```yaml
  str: 这是一段
    多行
    字符串
  ```

多行字符串可以使用 `|` 保留换行符，也可以使用 `>` 折叠换行。

```yaml
this: |
  Foo
  Bar
that: >
  Foo
  Bar
```

`+` 表示保留文字块末尾的换行，`-` 表示删除字符串末尾的换行。

```yaml
s1: |
  Foo

s2: |+
  Foo


s3: |-
  Foo
```

### 4.2. 布尔值

布尔值用 `true` 和 `false` 表示。

### 4.3. 整数

### 4.4. 浮点数

数值直接以字面量的形式表示。

```yaml
number: 12.30
```

### 4.5. Null

`null` 用 `~` 表示。

### 4.6. 时间

时间采用 ISO 8601 格式。

```yaml
iso8601: 2001-12-14t21:59:43.10-05:00
```

### 4.7. 日期

日期采用 ISO 8601 格式的年、月、日表示。

```yaml
date: 1976-07-31
```

### 4.8. 类型转换

YAML 允许使用两个感叹号，强制转换数据类型。

```yaml
e: !!str 123
f: !!str true
```

## 五、引用

锚点 `&` 和别名 `*`，可以用来引用。

```yaml
defaults: &defaults
  adapter:  postgres
  host:     localhost

development:
  database: myapp_development
  <<: *defaults

test:
  database: myapp_test
  <<: *defaults
```

等同于下面的代码。

```yaml
defaults:
  adapter:  postgres
  host:     localhost

development:
  database: myapp_development
  adapter:  postgres
  host:     localhost

test:
  database: myapp_test
  adapter:  postgres
  host:     localhost
```

`&` 用来建立锚点，`<<` 表示合并到当前数据，`*` 用来引用锚点。

