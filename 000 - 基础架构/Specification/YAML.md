# YAML

[YAML](https://yaml.org/) 是一种人类可读的数据序列化格式，支持复杂数据结构的表达。

## 一、基础语法规范

### 基本规则

- 大小写敏感
- 使用缩进表示层级关系
- 禁止使用 Tab 缩进
- 同层级元素必须左对齐
- 允许自由缩进空格数

### 特殊符号

| 符号  | 功能说明           |
| ----- | ------------------ |
| `#`   | 行内注释起始符     |
| `---` | 多文档分隔符       |
| `...` | 文档结束符（可选） |

### 数据结构类型

- 对象（键值对集合）
- 数组（有序值集合）
- 纯量（基础数据类型）

## 二、数据结构详解

### 对象

```yaml
# 标准写法
name: John
age: 30

# 行内写法
profile: { name: John, age: 30 }
```

### 数组

```yaml
# 标准写法
- Cat
- Dog
- Fish

# 嵌套数组
pets:
  - Cat
  - Dog

# 行内写法
fruits: [Apple, Banana]

# 二维数组
- Planet
-
 - Cat
 - Dog
 - Goldfish
```

### 纯量

#### 基础类型

| 类型   | 示例                 |
| ------ | -------------------- |
| 字符串 | `str: "Hello World"` |
| 布尔值 | `flag: true`         |
| 整型   | `count: 42`          |
| 浮点型 | `price: 3.14`        |
| Null   | `value: ~`           |

#### 高级字符串处理

当字符串包含空格或特殊字符时，必须使用引号包裹。YAML 支持单引号和双引号两种形式：

- **双引号**：不进行特殊字符转义（如 `\n` 保持原义，产生换行）
- **单引号**：需对内部单引号进行双写转义（如 `''` 表示单个 `'`）

```yaml
# 多行字符串：换行符会转为空格
str: 这是一段
  多行
  字符串

# 多行字符串：保留换行符
description: |
  This is a
  multiline
  string

# 折叠换行
summary: >
  This will
  become single line

# 保留换行控制
content: |+
  Keep trailing newlines
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

### 布尔值

布尔值用 `true` 和 `false` 表示。

### 整数

### 浮点数

数值直接以字面量的形式表示。

```yaml
number: 12.30
```

### Null

`null` 用 `~` 表示。

### 时间

时间采用 ISO 8601 格式。

```yaml
iso8601: 2001-12-14t21:59:43.10-05:00
```

### 日期

日期采用 ISO 8601 格式的年、月、日表示。

```yaml
date: 1976-07-31
```

### 类型转换

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

