# SQLAlchemy

[SQLAlchemy](https://github.com/sqlalchemy/sqlalchemy) 是 Python 的 SQL 工具包与对象关系映射（ORM）框架。

**安装**：

```sh
pip install SQLAlchemy
```

## 一、引擎和连接

### 数据库 URL

`create_engine()` 函数通过[数据库 URL](https://docs.sqlalchemy.org/en/14/core/engines.html#database-urls) 生成 SQLAlchemy 的 `Engine` 对象。其 URL 格式基于 [RFC-1738](https://tools.ietf.org/html/rfc1738) 标准，通常包括用户名、密码、主机名、数据库名称字段，以及用于其他配置的可选关键字参数。

```
dialect+driver://username:password@host:port/database
```

- `dialect`：SQLAlchemy 方言的标识名称，例如 `sqlite`、`mysql`、`postgresql`、`oracle` 或 `mssql`。
- `driver`：用于连接到数据库的 DBAPI 的名称，全部使用小写字母。

**密码转义**：

在构建完整格式的 URL 字符串以传递给 `create_engine()` 时，需要对可能在用户和密码中使用的特殊字符进行 URL 编码才能正确解析。

### 引擎创建

- **create_engine**(*url*, ***kwargs*)

  创建一个新的 `Engine` 实例。

  标准调用形式是将 URL 作为第一个位置参数发送，通常是指数据库方言和连接参数的字符串。

  ```python
  from sqlalchemy import create_engine
  
  engine = create_engine("postgresql://scott:tiger@localhost/test")
  ```

## 二、Session

### 会话周期

SQLAlchemy 的 [`Session`](https://docs.sqlalchemy.org/en/14/orm/session_basics.html#opening-and-closing-a-session) 会话对象可通过直接实例化或 `sessionmaker` 工厂类创建，需绑定至单一 `Engine` 实例作为数据库连接核心。推荐通过 `sessionmaker` 预定义会话配置（如自动提交策略、事务隔离级别），确保会话行为一致性。

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine("sqlite:///mydb.sqlite")
Session = sessionmaker(bind=engine)  # 生成预配置的会话类
session = Session()                  # 实例化具体会话对象
```

### 查询数据

SQLAlchemy 2.0 将通过 ORM 直接采用统一的 [`Select`](https://docs.sqlalchemy.org/en/14/core/selectable.html#sqlalchemy.sql.expression.Select) 对象替代传统 [`Query`](https://docs.sqlalchemy.org/en/14/orm/query.html#sqlalchemy.orm.Query) 对象，实现 Core 与 ORM 层 `SELECT` 语句生成方式的标准化。

> 此兼容模式已在当前 [1.4](https://docs.sqlalchemy.org/en/14/orm/session_basics.html#querying-2-0-style) 版本中提供，便于向 2.0 版本过渡迁移。

标准查询流程为通过 [`select()`](https://docs.sqlalchemy.org/en/14/core/selectable.html#sqlalchemy.sql.expression.select) 构造 [`Select`](https://docs.sqlalchemy.org/en/14/core/selectable.html#sqlalchemy.sql.expression.Select) 对象，并借助 [`Session.execute()`](https://docs.sqlalchemy.org/en/14/orm/session_api.html#sqlalchemy.orm.Session.execute) 或 [`Session.scalars()`](https://docs.sqlalchemy.org/en/14/orm/session_api.html#sqlalchemy.orm.Session.scalars) 等方法执行，分别返回 [`Result`](https://docs.sqlalchemy.org/en/14/core/connections.html#sqlalchemy.engine.Result) 及其子类型（如 [`ScalarResult`](https://docs.sqlalchemy.org/en/14/core/connections.html#sqlalchemy.engine.ScalarResult)），进而获取查询结果集。

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

也可以通过 [`Session.query()`](https://docs.sqlalchemy.org/en/14/orm/session_api.html#sqlalchemy.orm.Session.query) 构建 [`Query`](https://docs.sqlalchemy.org/en/14/orm/query.html#sqlalchemy.orm.Query) 对象。

```python
session.query(User).filter(User.id == '5').one()
```

### 新增数据

[`Session.add()`](https://docs.sqlalchemy.org/en/14/orm/session_api.html#sqlalchemy.orm.Session.add) 用于将实例纳入会话管理：

- 瞬态实例（新创建对象）：将在下次刷新时触发 `INSERT` 操作。
- 持久态实例（已被当前会话加载）：已存在于会话中无需重复添加。
- 游离态实例（已脱离原会话）：可通过此方法重新与会话建立关联。

```python
user1 = User(name="user1")
user2 = User(name="user2")
session.add(user1)
session.add(user2)

session.commit()
```

## 三、ORM 映射

### 声明式映射

SQLAlchemy 的[声明式映射](https://docs.sqlalchemy.org/en/14/orm/declarative_styles.html)作为 ORM 框架核心机制，通过 `declarative_base()` 创建基类实现模型统一管理，该基类将自动继承声明式元数据配置至所有派生模型类，形成标准化的对象关系映射体系。

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

基类本质是承载 ORM 元数据管理的 `registry` 对象。`declarative_base()` 函数作为快捷实现方式，其底层机制是通过 `registry` 构造函数初始化注册表实例，随后调用 `registry.generate_base()` 方法动态生成声明式基类，从而简化 ORM 模型类的标准化构建流程。

```python
from sqlalchemy.orm import registry

mapper_registry = registry()
Base = mapper_registry.generate_base()
```

> 版本 2.0 更新：[声明式映射](https://docs.sqlalchemy.org/en/20/orm/declarative_styles.html)体系重构为采用 `DeclarativeBase` 超类，取代原有 `declarative_base()` 函数及 `registry.generate_base()` 方法，该超类设计原生支持 PEP 484 类型注解，无需依赖插件即可实现类型工具集成。

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

### 映射表

在[声明式基类](https://docs.sqlalchemy.org/en/14/orm/declarative_tables.html#declarative-table)映射中，标准做法需定义 `__tablename__` 属性以指定对应的数据表名称，该属性将触发 ORM 框架同步生成与模型类映射的 `Table` 对象。

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

#### 表和元数据

在声明式映射类中，[`__table__`](https://docs.sqlalchemy.org/en/14/orm/declarative_tables.html#accessing-table-and-metadata) 属性作为 ORM 元数据核心载体，当开发者定义 `__tablename__` 声明表名后，ORM 框架将自动生成对应的 `Table` 对象并持久化存储于该属性，为后续数据库操作提供结构化元数据支撑。

```python
# 访问表
user_table = User.__table__
```

声明式注册表与基类所关联的元数据（`MetaData`）是执行 DDL 操作及集成迁移工具不可或缺的核心组件。开发者可通过注册表的 `.metadata` 属性或声明式基类直接访问该元数据对象。

```python
engine = create_engine("sqlite://")

Base.metadata.create_all(engine)
```

### 映射表字段

默认情况下，ORM 映射将模型属性名与 [`Column`](https://docs.sqlalchemy.org/en/14/core/metadata.html#sqlalchemy.schema.Column) 对象的键名（[`Column.key`](https://docs.sqlalchemy.org/en/14/core/metadata.html#sqlalchemy.schema.Column.key)）进行绑定，且 `Column.key` 默认与其对应的数据库列名（`Column.name`）保持一致。

```python
class User(Base):
    __tablename__ = "user"
    id = Column("user_id", Integer, primary_key=True)
    name = Column("user_name", String(50))
```

#### 驼峰数据类型

[驼峰命名](https://docs.sqlalchemy.org/en/20/core/type_basics.html#the-camelcase-datatypes)规范通过 ORM 框架实现数据库无关性设计，其类型转换机制可跨所有数据库后端动态适配，自动根据目标数据库特性生成符合规范的 DDL 语句。

- [**Integer**](https://docs.sqlalchemy.org/en/20/core/type_basics.html#sqlalchemy.types.Integer)
- [**String**](https://docs.sqlalchemy.org/en/20/core/type_basics.html#sqlalchemy.types.String)()
- [**DateTime**](https://docs.sqlalchemy.org/en/20/core/type_basics.html#sqlalchemy.types.DateTime)()

## 四、查询数据

### SELECT 语句

[SELECT](https://docs.sqlalchemy.org/en/20/orm/queryguide/select.html) 语句通过 [`select()`](https://docs.sqlalchemy.org/en/20/core/selectable.html#sqlalchemy.sql.expression.select) 函数构建，该函数返回承载查询逻辑的 [`Select`](https://docs.sqlalchemy.org/en/20/core/selectable.html#sqlalchemy.sql.expression.Select) 对象作为核心执行载体。

```python
from sqlalchemy import select

stmt = select(User).where(User.name == "spongebob")
```

### Query 对象

在 [SQLAlchemy ORM](https://docs.sqlalchemy.org/en/20/orm/queryguide/query.html) 中，可通过调用 [`Session.query()`](https://docs.sqlalchemy.org/en/20/orm/session_api.html#sqlalchemy.orm.Session.query) 方法基于指定会话实例化生成 [`Query`](https://docs.sqlalchemy.org/en/20/orm/queryguide/query.html#sqlalchemy.orm.Query) 对象，该对象承载 ORM 实体查询的构造与执行逻辑。

```python
q = session.query(SomeMappedClass)
```

- [**all**](https://docs.sqlalchemy.org/en/20/orm/queryguide/query.html#sqlalchemy.orm.Query.all)：以列表形式返回此查询表示的结果。

- [**exists**](https://docs.sqlalchemy.org/en/20/orm/queryguide/query.html#sqlalchemy.orm.Query.exists)：将查询转换为 `EXISTS (SELECT 1 FROM … WHERE …)` 形式的 `EXISTS` 子查询的便捷方法。

  ```python
  exists = db.session.query(User).filter_by(username=username, password=password).exists()
  session.query(exists)
  ```
  
  等同于：

  ```sql
  SELECT EXISTS (SELECT 1 FROM `user` WHERE username = '2' AND `password` = '2')
  ```
  
- [**scalar**](https://docs.sqlalchemy.org/en/20/orm/queryguide/query.html#sqlalchemy.orm.Query.scalar)：返回第一个结果的第一个元素，如果没有行则返回 `None`。

- [**count**](https://docs.sqlalchemy.org/en/20/orm/queryguide/query.html#sqlalchemy.orm.Query.count)：返回此查询形成的 SQL 将返回的行数。

- [**filter**](https://docs.sqlalchemy.org/en/20/orm/queryguide/query.html#sqlalchemy.orm.Query.filter)：使用 SQL 表达式将给定的过滤条件应用于此查询的副本。

  ```python
  session.query(MyClass).filter(MyClass.name == 'some name')
  ```
  
- [**filter_by**](https://docs.sqlalchemy.org/en/20/orm/queryguide/query.html#sqlalchemy.orm.Query.filter_by)：使用关键字表达式将给定的过滤条件应用于此查询的副本。

  ```python
  session.query(MyClass).filter_by(name = 'some name')
  ```
  
- [**one**](https://docs.sqlalchemy.org/en/20/orm/queryguide/query.html#sqlalchemy.orm.Query.one)：只返回一个结果或引发异常。

- [**get**](https://docs.sqlalchemy.org/en/20/orm/queryguide/query.html#sqlalchemy.orm.Query.get)：根据给定的主键标识符返回一个实例，如果找不到则返回 `None`。

- [**first**](https://docs.sqlalchemy.org/en/20/orm/queryguide/query.html#sqlalchemy.orm.Query.first)：返回此查询的第一个结果，如果结果不包含任何行，则返回 `None`。

- [**offset**](https://docs.sqlalchemy.org/en/20/orm/queryguide/query.html#sqlalchemy.orm.Query.offset)：将 `OFFSET` 应用于查询并返回新生成的查询。

- [**limit**](https://docs.sqlalchemy.org/en/20/orm/queryguide/query.html#sqlalchemy.orm.Query.limit)：将 `LIMIT` 应用于查询并返回新生成的查询。

- [**order_by**](https://docs.sqlalchemy.org/en/20/orm/queryguide/query.html#sqlalchemy.orm.Query.order_by)：将一个或多个 `ORDER BY` 条件应用于查询并返回新生成的查询。

  ```python
  q = session.query(Entity).order_by(Entity.id, Entity.name)
  ```

### SQL 表达式

[`sqlalchemy.sql.expression`](https://docs.sqlalchemy.org/en/20/core/expression_api.html) 提供了一些辅助函数。

- [**text**](https://docs.sqlalchemy.org/en/20/core/sqlelement.html#sqlalchemy.sql.expression.text)()

  直接表示文本 SQL 字符串。

  ```python
  from sqlalchemy import text
  
  t = text("SELECT * FROM users")
  result = connection.execute(t)
  ```

