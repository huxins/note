# Marshmallow

Marshmallow 是一个与 ORM/ODM/框架无关的库，用于将复杂数据类型与本机 Python 数据类型相互转换。

## 一、安装

```sh
$ pip install -U marshmallow
```

## 二、模式

让我们从一个基本的用户 `model` 开始。

```python
import datetime as dt

class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email
        self.created_at = dt.datetime.now()

    def __repr__(self):
        return "<User(name={self.name!r})>".format(self=self)
```

### 2.1. 创建模式

#### 2.1.1. 定义类

通过使用变量将属性名称映射到 Field 对象来定义类来创建模式。

```python
from marshmallow import Schema, fields

class UserSchema(Schema):
    name = fields.Str()
    email = fields.Email()
    created_at = fields.DateTime()
```

#### 2.1.2. 定义字典

通过使用 `from_dict` 方法从 `fields` 字典创建模式。

```python
from marshmallow import Schema, fields

UserSchema = Schema.from_dict(
    {
        "name": fields.Str(),
        "email": fields.Email(),
        "created_at": fields.DateTime()
    }
)
```

`from_dict` 对于在运行时生成模式特别有用。

## 三、序列化对象

通过将对象传递给模式的转储方法来序列化对象，该方法返回格式化的结果。

```python
from pprint import pprint

user = User(name="Monty", email="monty@python.org")
schema = UserSchema()
result = schema.dump(user)
pprint(result)
```

您还可以使用 `dumps` 序列化为 JSON 编码的字符串。

```python
json_result = schema.dumps(user)
pprint(json_result)
```

#### 3.1. 过滤输出

您可能不需要在每次使用模式时都输出所有声明的字段。您可以使用 `only` 参数指定要输出的字段。

```python
summary_schema = UserSchema(only=("name", "email"))
summary_schema.dump(user)
```

您还可以通过传入 `exclude` 参数来排除字段。

或者通过 `Mate` 进行配置：

```python
class UserSchema(Schema):
    class Meta:
        exclude = ['password']
```

## 四、Marshmallow-Sqlalchemy

SQLAlchemy 与 Marshmallow 序列化库的集成。

#### 4.1. 安装

```sh
$ pip install marshmallow-sqlalchemy
```

#### 4.2. 声明 Sqlalchemy 模型

```python
import sqlalchemy as sa
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker, relationship, backref

engine = sa.create_engine("sqlite:///:memory:")
session = scoped_session(sessionmaker(bind=engine))
Base = declarative_base()

class Author(Base):
    __tablename__ = "authors"
    id = sa.Column(sa.Integer, primary_key=True)
    name = sa.Column(sa.String, nullable=False)

    def __repr__(self):
        return "<Author(name={self.name!r})>".format(self=self)

class Book(Base):
    __tablename__ = "books"
    id = sa.Column(sa.Integer, primary_key=True)
    title = sa.Column(sa.String)
    author_id = sa.Column(sa.Integer, sa.ForeignKey("authors.id"))
    author = relationship("Author", backref=backref("books"))

Base.metadata.create_all(engine)
```

#### 4.3. 生成 Marshmallow 模式

```python
from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field

class AuthorSchema(SQLAlchemySchema):
    class Meta:
        model = Author
        load_instance = True  # 可选：反序列化为模型实例

    id = auto_field()
    name = auto_field()
    books = auto_field()

class BookSchema(SQLAlchemySchema):
    class Meta:
        model = Book
        load_instance = True

    id = auto_field()
    title = auto_field()
    author_id = auto_field()
```

您可以使用 `SQLAlchemyAutoSchema` 为 models 的列自动生成字段。下面的 schema 类等同于上面的。

```python
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema


class AuthorSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Author
        include_relationships = True
        load_instance = True

class BookSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Book
        include_fk = True
        load_instance = True
```

确保在实例化 Schemas 之前声明 Models。否则 `sqlalchemy.orm.configure_mappers()` 将运行得太快而失败。

#### 4.4. （反）序列化数据

```python
author = Author(name="Chuck Paluhniuk")
author_schema = AuthorSchema()
book = Book(title="Fight Club", author=author)
session.add(author)
session.add(book)
session.commit()

dump_data = author_schema.dump(author)
print(dump_data)
# {'id': 1, 'name': 'Chuck Paluhniuk', 'books': [1]}

load_data = author_schema.load(dump_data, session=session)
print(load_data)
# <Author(name='Chuck Paluhniuk')>
```

