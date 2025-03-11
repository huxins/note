# Marshmallow

[Marshmallow](https://github.com/marshmallow-code/marshmallow) 是一个与 ORM、ODM 和框架无关的库，用于将复杂数据类型与 Python 数据类型相互转换。

可以通过 `pip` 安装：

```sh
pip install -U marshmallow
```

## 一、声明模式

以一个基本的 *User* 模型为例：

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

### 类

通过[定义一个类](https://marshmallow.readthedocs.io/en/stable/quickstart.html#declaring-schemas)来创建一个模式，该类中的变量将属性名称映射到 [`Field`](https://marshmallow.readthedocs.io/en/stable/marshmallow.fields.html#marshmallow.fields.Field) 对象。

```python
from marshmallow import Schema, fields

class UserSchema(Schema):
    name = fields.Str()
    email = fields.Email()
    created_at = fields.DateTime()
```

### 字典

使用 `from_dict` 方法，通过字典创建模式。

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

## 二、序列化

通过将对象传递给 `Schema` 的 [`dump`](https://marshmallow.readthedocs.io/en/stable/api_reference.html#marshmallow.Schema.dump) 方法来[序列化](https://marshmallow.readthedocs.io/en/stable/quickstart.html#serializing-objects-dumping)对象，该方法将对象格式化为字典。

```python
from pprint import pprint

user = User(name="Monty", email="monty@python.org")
schema = UserSchema()
result = schema.dump(user)
pprint(result)
```

还可以使用 [`dumps`](https://marshmallow.readthedocs.io/en/stable/api_reference.html#marshmallow.Schema.dumps) 序列化为 JSON 编码的字符串。

```python
json_result = schema.dumps(user)
pprint(json_result)
```

### 集合

在处理对象的可迭代集合时，将 `many` 设置为 `True`。

```python
user1 = User(name="Mick", email="mick@stones.com")
user2 = User(name="Keith", email="keith@stones.com")
users = [user1, user2]
schema = UserSchema(many=True)
result = schema.dump(users)
print(result)
```

### 过滤输出

可以使用 `only` 参数指定要输出的字段，从而避免输出所有声明的字段。

```python
summary_schema = UserSchema(only=("name", "email"))
summary_schema.dump(user)
```

还可以通过传入 `exclude` 参数来排除字段。

```python
summary_schema = UserSchema(exclude=("created_at",))
summary_schema.dump(user)
```

或者通过 `Mate` 进行配置：

```python
class UserSchema(Schema):
    class Meta:
        exclude = ['password']
```

## 三、反序列化

[`load`](https://marshmallow.readthedocs.io/en/stable/api_reference.html#marshmallow.Schema.load) 方法用于验证输入字典，并将其反序列化为一个字典，其中包含字段名称及其对应的反序列化值。

```python
from pprint import pprint

user_data = {
    "created_at": "2014-08-11T05:26:03.869245",
    "email": "ken@yahoo.com",
    "name": "Ken",
}
schema = UserSchema()
result = schema.load(user_data)
pprint(result)
```

为了反序列化为自定义对象，定义 `Schema` 的方法并用 [`post_load`](https://marshmallow.readthedocs.io/en/stable/marshmallow.decorators.html#marshmallow.decorators.post_load) 装饰它。

```python
from marshmallow import Schema, fields, post_load

class UserSchema(Schema):
    name = fields.Str()
    email = fields.Email()
    created_at = fields.DateTime()

    @post_load
    def make_user(self, data, **kwargs):
        return User(**data)
```

现在，[`load`](https://marshmallow.readthedocs.io/en/stable/api_reference.html#marshmallow.Schema.load) 方法返回一个 *User* 实例。

```python
user_data = {"name": "Ronnie", "email": "ronnie@stones.com"}
schema = UserSchema()
result = schema.load(user_data)
print(result)
```

### 处理未知字段

默认情况下，如果 `load` 遇到 `schema` 中[没有匹配字段](https://marshmallow.readthedocs.io/en/stable/quickstart.html#handling-unknown-fields)的键，它将引发 [`ValidationError`](https://marshmallow.readthedocs.io/en/stable/marshmallow.exceptions.html#marshmallow.exceptions.ValidationError)。

可以使用 `unknown` 选项修改此行为。

```python
from marshmallow import Schema, fields, post_load, EXCLUDE

class DailyReportSchema(Schema):
    creator = fields.String(data_key='createName', required=True)
    creation_time = fields.DateTime(data_key='createTime', format='%Y-%m-%d %H:%M', required=True)
    work_today = fields.String(data_key='day2', required=True)
    plan_tomorrow = fields.String(data_key='day1', required=True)

    class Meta:
        unknown = EXCLUDE

    @post_load
    def make_daily_report(self, data, **kwargs):
        return DailyReport(**data)
```

### 预处理

[`pre_load`](https://marshmallow.readthedocs.io/en/stable/marshmallow.decorators.html#marshmallow.decorators.pre_load) 是一个装饰器，用于在数据进入 [`load`](https://marshmallow.readthedocs.io/en/stable/api_reference.html#marshmallow.Schema.load) 方法进行验证和反序列化之前对其进行预处理。

可以在 `Schema` 类中定义一个带有 `@pre_load` 装饰器的方法，以便在数据加载前执行一些自定义的逻辑操作，比如数据清理或格式转换。

```python
from marshmallow import Schema, fields, pre_load

class MySchema(Schema):
    name = fields.String()

    @pre_load
    def process_data(self, data, **kwargs):
        data['name'] = data['name'].strip().title()
        return data
```

## 四、Marshmallow-Sqlalchemy

SQLAlchemy 与 Marshmallow 序列化库的集成。

### 安装

```sh
pip install marshmallow-sqlalchemy
```

### 声明 Sqlalchemy 模型

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

### 生成 Marshmallow 模式

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

### （反）序列化数据

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

