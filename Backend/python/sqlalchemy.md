# SQLAlchemy

## 1. 入门

### 1.1. 安装

```sh
$ pip install SQLAlchemy
```

## 2. 引擎和连接使用

### 2.1. 引擎配置

#### 2.1.2. Database URLs

`create_engine()` 函数根据 URL 生成一个 `Engine` 对象。URL 的格式通常遵循 [RFC1738](https://tools.ietf.org/html/rfc1738)，也有一些例外。URL 通常包括用户名、密码、主机名、数据库名称字段，以及用于其他配置的可选关键字参数。数据库 URL 的典型形式是：

```
dialect+driver://username:password@host:port/database
```

`dialect` 包括 SQLAlchemy 方言的标识名称，例如 `sqlite`、`mysql`、`postgresql`、`oracle` 或 `mssql`。`driver` 是用于连接到数据库的 DBAPI 的名称，全部使用小写字母。如果未指定，则将导入默认 DBAPI，此默认值通常是该后端可用的最广为人知的驱动程序。

#### 2.1.3. 引擎创建 API

##### 2.1.3.1. `create_engine()`

```
function sqlalchemy.create_engine(url, **kwargs)
```

创建一个新的 `Engine` 实例。

标准调用形式是将 URL 作为第一个位置参数发送，通常是指数据库方言和连接参数的字符串：

```python
from sqlalchemy import create_engine

engine = create_engine("postgresql://scott:tiger@localhost/test")
```

## 3. 使用 Session

### 3.8. Session API

#### 3.8.1. Session 和 `sessionmaker()`

##### 3.8.1.1. sessionmaker

一个可配置的 `Session` 工厂。

`sessionmaker` 工厂在调用时生成新的 `Session` 对象，根据建立的配置参数创建它们。

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine("postgresql://scott:tiger@localhost/test")
DBSession = sessionmaker(bind=engine)
```

##### 3.8.1.3. Session

- `Session.add()`

  将对象放入此会话中。
  
- `Session.close()`

  关闭此会话使用的事务资源和 ORM 对象。

- `Session.commit()`

  刷新挂起的更改并提交当前事务。
  
- `Session.execute()`

  执行 SQL 表达式构造。

  ```python
  db.session.execute(db.select(User)).scalars()
  ```

- `Session.query()`

  返回一个新的 `Query` 对象对应于这个 `Session`。

  ```python
  session.query(User).filter(User.id == '5').one()
  ```

- `Session.scalars()`

  执行语句并将结果作为纯量返回。

## 4. ORM 映射类配置

### 4.1. ORM 映射类概述

#### 4.1.1. ORM 映射样式

SQLAlchemy 具有两种截然不同的映射器配置风格，它们还具有进一步的子选项来说明它们的设置方式。

##### 4.1.1.1. 声明式映射

声明式映射是现代 SQLAlchemy 中构建映射的典型方式。最常见的模式是首先使用 `declarative_base()` 函数构造一个基类，这会将声明映射过程应用于从它派生的所有子类。下面是一个声明性基础，然后在声明性表映射中使用：

```python
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    fullname = Column(String)
    nickname = Column(String)
```

### 4.2. 使用声明映射类

#### 4.2.2. 声明式表配置

##### 4.2.2.1. 声明表

对于声明性基类，映射的典型形式包括一个属性 `__tablename__`，它指示应与映射一起生成的表的名称：

```python
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    fullname = Column(String)
    nickname = Column(String)
```

###### 4.2.2.1.1. 访问表和元数据

声明式映射的类将始终包含一个名为 `__table__` 的属性；当使用 `__tablename__` 的上述配置完成后，声明过程通过 `__table__` 属性使表可用：

```python
# 访问表
user_table = User.__table__
```

为了运行 DDL 操作以及与迁移工具一起使用，与声明性注册表和基类相关联的元数据集合经常是必需的。该对象可通过注册表的 `.metadata` 属性以及声明性基类获得。下面，对于一个小脚本，我们可能希望针对 SQLite 数据库为所有表发出 `CREATE`：

```python
engine = create_engine("sqlite://")

Base.metadata.create_all(engine)
```

### 4.8. Class Mapping API

#### 4.8.1. registry

- `registry.generate_base()`

  生成声明类基类。

  从返回的类对象继承的类将使用声明映射自动映射。

  ```python
  from sqlalchemy.orm import registry
  
  mapper_registry = registry()
  
  Base = mapper_registry.generate_base()
  
  class MyClass(Base):
      __tablename__ = "my_table"
      id = Column(Integer, primary_key=True)
  ```

#### 4.8.2. `declarative_base()`

为声明类定义构造一个基类。

```python
from sqlalchemy.orm import declarative_base

Base = declarative_base()
```

## 5. 查询数据、加载对象

### 5.5. Query API

#### 5.5.1. Query 对象

##### 5.5.1.1. Query

- `Query.all()`

  将此 `Query` 表示的结果作为列表返回。

- `Query.filter()`

  使用 SQL 表达式将给定的过滤条件应用于此查询的副本。
  
- `Query.one()`

  只返回一个结果或引发异常。

## 6. 模式定义语言

### 6.1. 用元数据描述数据库

#### 6.1.6. 列、表、元数据 API

##### 6.1.6.1. Column

- `Column.__init__()`

  构造一个新的 Column 对象。
  
  参数：
  
  - **name**
  
    此列的名称在数据库中表示。此参数可以是第一个位置参数，或通过关键字指定。
  
  - **type_**
  
    列的类型，使用 TypeEngine 的子类实例表示。如果该类型不需要参数，则也可以发送该类型的类，例如：
  
    ```python
    # 使用带参数的类型
    Column('data', String(50))
    
    # 不使用参数
    Column('level', Integer)
    ```
  
    类型参数可以是第二个位置参数或由关键字指定。
  
  - **autoincrement**
  
    为没有外键依赖项的整数主键列设置”自动递增“语义。
  
  - **nullable**
  
    当设置为 False 时，将导致在为列生成 DDL 时添加 *NOT NULL* 短语。
  
  - **primary_key**
  
    如果为 True，则将此列标记为主键列。

## 7. SQL 数据类型对象

### 7.1. 类型层次结构

#### 7.1.5. 通用驼峰命名法类型

##### 7.1.5.7. Integer

int 整数的类型。

##### 7.1.5.15. String

所有字符串和字符类型的基础。

- `String.__init__()`

  创建一个字符串类型。
  
  参数：
  
  - **length**
  
    可选，用于 DDL 和 CAST 表达式的列的长度。如果不会发出 `CREATE TABLE`，则可以安全地省略。某些数据库可能需要在 DDL 中使用长度，如果包含没有长度的 `VARCHAR`，则在发出 `CREATE TABLE` DDL 时会引发异常。该值是被解释为字节还是字符是特定于数据库的。

## 8. SQL 语句和表达式 API

### 8.1. 列元素和表达式

#### 8.1.1. 列元素基础构造函数

##### 8.1.1.1. text()

```python
sqlalchemy.sql.expression.text(text, bind=None)
```

构造一个新的 `TextClause` 子句，直接表示文本 SQL 字符串。

### 8.3. Selectables, Tables, FROM 对象

#### 8.3.1. Selectables 基础构造函数

顶级 `FROM` 子句和 `SELECT` 构造函数。

- **select**()

  使用构造函数样式创建 Select。

