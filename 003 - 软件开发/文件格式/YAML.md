# YAML

[YAML](https://yaml.org/) 是一种人类可读的数据序列化格式，支持复杂数据结构的表达。

## 一、基础语法

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

## 二、数据结构

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

# 多行字符串：折叠换行
summary: >
  This will
  become single line

# 保留末尾换行控制
content: |+
  Keep trailing newlines

# 删除末尾换行控制
content: |-
  Keep trailing newlines
```

## 三、高级特性

### 数据类型转换

YAML 允许使用两个感叹号，强制转换数据类型。

```yaml
num_str: !!str 123
bool_str: !!str true
```

### 锚点与引用

锚点 `&` 和别名 `*`，可以用来引用。

```yaml
defaults: &DEFAULTS
  host: localhost
  port: 5432

development:
  <<: *DEFAULTS
  db: dev_db

production:
  <<: *DEFAULTS
  db: prod_db
```

### 时间格式

时间采用 ISO 8601 格式。

```yaml
iso_date: 2023-08-20
iso_datetime: 2023-08-20T15:30:00+08:00
```

## Reference

- [YAML JavaScript parser](https://nodeca.github.io/js-yaml/)

