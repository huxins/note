# SQLAlchemy

## 一、安装

```sh
pip install SQLAlchemy
```

## 二、引擎和连接

### 引擎配置

#### 数据库 URL

`create_engine()` 函数根据 URL 生成一个 `Engine` 对象。URL 的格式通常遵循 [RFC1738](https://tools.ietf.org/html/rfc1738)。URL 通常包括用户名、密码、主机名、数据库名称字段，以及用于其他配置的可选关键字参数。数据库 URL 的典型形式是：

```
dialect+driver://username:password@host:port/database
```

`dialect` 包括 SQLAlchemy 方言的标识名称，例如 `sqlite`、`mysql`、`postgresql`、`oracle` 或 `mssql`。`driver` 是用于连接到数据库的 DBAPI 的名称，全部使用小写字母。如果未指定，则将导入默认 DBAPI，此默认值通常是该后端可用的最广为人知的驱动程序。

##### 密码转义

在构建完整格式的 URL 字符串以传递给 `create_engine()` 时，需要对可能在用户和密码中使用的特殊字符进行 URL 编码才能正确解析。

#### 引擎创建 API

- **create_engine**(*url*, ***kwargs*)

  创建一个新的 `Engine` 实例。

  标准调用形式是将 URL 作为第一个位置参数发送，通常是指数据库方言和连接参数的字符串：

  ```python
  from sqlalchemy import create_engine
  
  engine = create_engine("postgresql://scott:tiger@localhost/test")
  ```

## 三、Session

### 基本使用

#### 开始和结束会话

`Session` 可以自己构建，也可以使用 `sessionmaker` 类构建。它通常通过单个引擎作为前端连接源。

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import Session

engine = create_engine("postgresql+psycopg2://scott:tiger@localhost/")

with Session(engine) as session:
    session.add(some_object)
    session.add(some_other_object)
    session.commit()
```

使用 `sessionmaker()`：

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine("postgresql+psycopg2://scott:tiger@localhost/")

Session = sessionmaker(engine)

with Session() as session:
    session.add(some_object)
    session.add(some_other_object)
    session.commit()
```

#### 查询

查询的主要方式是利用 `select()` 构造一个 `Select` 对象，然后使用 `Session.execute()` 和 `Session.scalars()` 等方法执行该对象以返回 `Result`。然后根据 `Result` 对象返回结果，包括 `ScalarResult` 等子变体。

```python
from sqlalchemy import select
from sqlalchemy.orm import Session

with Session(engine) as session:
    # 查询 User 对象
    statement = select(User).filter_by(name="ed")
    # User 对象列表
    user_obj = session.scalars(statement).all()
    
    # 查询单个列
    statement = select(User.name, User.fullname)
    # 行对象列表
    rows = session.execute(statement).all()
```

也可以通过 `session.query()` 构建 `Query` 对象：

```python
session.query(User).filter(User.id == '5').one()
```

#### 新增

`Session.add()` 用于在会话中新增实例。对于全新实例，将在下一次刷新时对这些实例进行 INSERT。

```python
user1 = User(name="user1")
user2 = User(name="user2")
session.add(user1)
session.add(user2)

session.commit()
```

## 四、ORM 映射

### 声明式映射

声明式映射是现代 SQLAlchemy 中构建映射的典型方式。最常见的模式是首先使用 `declarative_base()` 函数构造一个基类，这会将声明映射过程应用于从它派生的所有子类。

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

基类是指维护相关映射类集合的 `registry` 对象。`declarative_base()` 函数实际上是首先使用 `registry` 构造函数创建 `registry`，然后使用 `registry.generate_base()` 方法生成基类的简写。

```python
from sqlalchemy.orm import registry

mapper_registry = registry()
Base = mapper_registry.generate_base()
```

在 2.0 版中更改：`DeclarativeBase` 超类取代了 `declarative_base()` 函数和 `registry.generate_base()` 方法的使用；超类方法在不使用插件的情况下与 PEP 484 工具集成。

```python
from sqlalchemy import Integer, String, ForeignKey
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    fullname: Mapped[str] = mapped_column(String(30))
    nickname: Mapped[Optional[str]]
```

#### 表配置

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

##### 访问表和元数据

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

### 列字段

`Column` 表示数据库表中的列。

- **\__init__**(*\*args*, ***kwargs*)

  构造一个新的 `Column` 对象。

  - **name**

    此列在数据库中的名称。此参数可以是第一个位置参数，或通过关键字指定。

  - **type_**

    列的类型，使用 `TypeEngine` 的子类实例表示。类型参数可以是第二个位置参数或由关键字指定。如果该类型不需要参数，也可以发送该类型的类。

    ```python
    # 使用带参数的类型
    Column('data', String(50))
    
    # 不使用参数
    Column('level', Integer)
    ```

  - **autoincrement**

    为没有外键依赖项的整数主键列设置自动递增语义。

  - **nullable**

    当设置为 `False` 时，将导致在为列生成 DDL 时添加 `NOT NULL` 短语。

  - **primary_key**

    如果为 `True`，则将此列标记为主键列。

  - **default**

    表示此列默认值的标量。

### 驼峰数据类型

驼峰类型在最大程度上与数据库无关，可以在任何数据库后端上使用，它们将以适合该后端的方式运行以产生所需的行为。

- **Integer**

  `int` 整数的类型。

- **String**(*length*=*None*, *collation*=*None*, *convert_unicode*=*False*, *unicode_error*=*None*, *_warn_on_bytestring*=*False*, *_expect_unicode*=*False*)

  所有字符串和字符类型的基础。

- **DateTime**(*timezone*=*False*)

  `datetime.datetime()` 对象的类型。

## 五、查询数据

### SELECT 语句

SELECT 语句由返回 `Select` 对象的 `select()` 函数生成：

```python
from sqlalchemy import select

stmt = select(User).where(User.name == "spongebob")
```

### Query 对象

`Query` 是根据给定 `Session` 生成的，使用 `Session.query()` 方法：

```python
q = session.query(SomeMappedClass)
```

- **all**()

  将此 `Query` 表示的结果作为列表返回。

- **exists**()

  一种将查询转换为 `EXISTS (SELECT 1 FROM … WHERE …)` 形式的 `EXISTS` 子查询的便捷方法。

  ```python
  exists = db.session.query(User).filter_by(username=username, password=password).exists()
  session.query(exists)
  ```

  等同于：

  ```sql
  SELECT EXISTS (SELECT 1 FROM `user` WHERE username = '2' AND `password` = '2')
  ```

- **scalar**()

  返回第一个结果的第一个元素，如果没有行则返回 None。如果返回多行，则引发 `MultipleResultsFound`。

- **count**()

  返回此查询形成的 SQL 将返回的行数。

- **filter**()

  使用 SQL 表达式将给定的过滤条件应用于此查询的副本。

  ```python
  session.query(MyClass).filter(MyClass.name == 'some name')
  ```

- **filter_by**(***kwargs*)

  使用关键字表达式将给定的过滤条件应用于此查询的副本。

  ```python
  session.query(MyClass).filter_by(name = 'some name')
  ```

- **one**()

  只返回一个结果或引发异常。

- **get**(*ident*)

  根据给定的主键标识符返回一个实例，如果找不到则返回 None。

- **first**()

  返回此查询的第一个结果，如果结果不包含任何行，则返回 None。

- **offset**(*offset*)

  将 `OFFSET` 应用于查询并返回新生成的查询。

- **limit**(*limit*)

  将 `LIMIT` 应用于查询并返回新生成的查询。

- **order_by**(**clauses*)

  将一个或多个 `ORDER BY` 条件应用于查询并返回新生成的查询。

  ```python
  q = session.query(Entity).order_by(Entity.id, Entity.name)
  ```

### 表达式

`sqlalchemy.sql.expression` 提供了一些辅助函数。

- **text**(*text*, *bind*=*None*)

  构造一个新的 `TextClause` 子句，直接表示文本 SQL 字符串。

  ```python
  from sqlalchemy import text
  
  t = text("SELECT * FROM users")
  result = connection.execute(t)
  ```

