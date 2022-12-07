# Packages

## 一、数据序列化

### 1. PyYAML - YAML 解析器

#### 1.1. 安装

```sh
$ pip install PyYAML
```

#### 1.2. 加载 YAML

- yaml.safe_load

  构建简单的 Python 对象，如整数或列表。
  
  ```python
  import yaml
  
  yaml.safe_load(f.read())
  ```

### 2. marshmallow - 类型转换

`marshmallow` 是一个与 ORM/ODM/框架无关的库，用于将复杂数据类型与 Python 数据类型相互转换。

#### 2.1. 安装

```sh
$ pip install -U marshmallow
```

#### 2.2. 快速开始

##### 2.2.1. 声明 models

让我们从一个基本的用户 *model* 开始。

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

通过定义带有将属性名称映射到 Field 对象的变量的类来创建模式。

```python
from marshmallow import Schema, fields


class UserSchema(Schema):
    name = fields.Str()
    email = fields.Email()
    created_at = fields.DateTime()
```

##### 2.2.2. 从字典创建 Schema

您可以使用 `from_dict` 方法从 `fields` 字典创建模式。

```python
from marshmallow import Schema, fields

UserSchema = Schema.from_dict(
    {"name": fields.Str(), "email": fields.Email(), "created_at": fields.DateTime()}
)
```

`from_dict` 对于在运行时生成模式特别有用。

##### 2.2.3. 序列化对象

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

##### 2.2.4. 过滤输出

您可能不需要在每次使用模式时都输出所有声明的字段。您可以使用 `only` 参数指定要输出的字段。

```python
summary_schema = UserSchema(only=("name", "email"))
summary_schema.dump(user)
```

您还可以通过传入 `exclude` 参数来排除字段。

### 3. marshmallow-sqlalchemy

SQLAlchemy 与 marshmallow 序列化库的集成。

#### 3.1 安装

```sh
$ pip install marshmallow-sqlalchemy
```

#### 3.2. 声明 models

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

#### 3.3. 生成 marshmallow schemas

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

#### 3.4. （反）序列化数据

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

### 4. flask-marshmallow

#### 4.1. 安装

```sh
$ pip install flask-marshmallow
```

#### 4.2. 创建应用程序

```python
from flask import Flask
from flask_marshmallow import Marshmallow

app = Flask(__name__)
ma = Marshmallow(app)
```

#### 4.3. 创建 models

```python
from your_orm import Model, Column, Integer, String, DateTime


class User(Model):
    email = Column(String)
    password = Column(String)
    date_created = Column(DateTime, auto_now_add=True)
```

#### 4.4. 用 marshmallow 定义输出格式

```python
class UserSchema(ma.Schema):
    class Meta:
        # 要公开的字段
        fields = ("email", "date_created", "_links")

    # Smart hyperlinking
    _links = ma.Hyperlinks(
        {
            "self": ma.URLFor("user_detail", values=dict(id="<id>")),
            "collection": ma.URLFor("users"),
        }
    )


user_schema = UserSchema()
users_schema = UserSchema(many=True)
```

#### 4.5. 在视图中输出数据

```python
@app.route("/api/users/")
def users():
    all_users = User.all()
    return users_schema.dump(all_users)


@app.route("/api/users/<id>")
def user_detail(id):
    user = User.get(id)
    return user_schema.dump(user)
```

#### 4.6. 可选的 Flask-SQLAlchemy 集成

`Flask-Marshmallow` 包括用于与 `Flask-SQLAlchemy` 和 `marshmallow-sqlalchemy` 集成的有用附加功能。

要启用 SQLAlchemy 集成，请确保同时安装了 `Flask-SQLAlchemy` 和 `marshmallow-sqlalchemy`。

```sh
$ pip install -U flask-sqlalchemy marshmallow-sqlalchemy
```

接下来，按顺序初始化 SQLAlchemy 和 Marshmallow 扩展。

```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:////tmp/test.db"

# 顺序很重要：在 Marshmallow 之前初始化 SQLAlchemy
db = SQLAlchemy(app)
ma = Marshmallow(app)
```

像往常一样声明你的模型。

```python
class Author(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))


class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    author_id = db.Column(db.Integer, db.ForeignKey("author.id"))
    author = db.relationship("Author", backref="books")
```

使用 `SQLAlchemySchema` 或 `SQLAlchemyAutoSchema` 从您的模型生成 Marshmallow Schema。

```python
class AuthorSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Author

    id = ma.auto_field()
    name = ma.auto_field()
    books = ma.auto_field()


class BookSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Book
        include_fk = True
```

您现在可以使用您的架构来转储和加载您的 ORM 对象。

```python
db.create_all()
author_schema = AuthorSchema()
book_schema = BookSchema()
author = Author(name="Chuck Paluhniuk")
book = Book(title="Fight Club", author=author)
db.session.add(author)
db.session.add(book)
db.session.commit()
author_schema.dump(author)
# {'id': 1, 'name': 'Chuck Paluhniuk', 'books': [1]}
```

## 二、数据库访问

### 1. PyMySQL

#### 1.1. 安装

使用 `pip` 安装：

```sh
$ python3 -m pip install PyMySQL
```

#### 1.2. 例子

##### 1.2.1. 数据库连接

```python
import pymysql.cursors

connection = pymysql.connect(host='localhost',
                             user='user',
                             password='passwd',
                             database='db',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)
```

##### 1.2.2. 数据新增操作

```python
with connection:
    with connection.cursor() as cursor:
        sql = "INSERT INTO `users` (`email`, `password`) VALUES (%s, %s)"
        cursor.execute(sql, ('webmaster@python.org', 'very-secret'))

    connection.commit()
```

##### 1.2.3. 数据查询操作

```python
with connection:
    with connection.cursor() as cursor:
        sql = "SELECT `id`, `password` FROM `users` WHERE `email`=%s"
        cursor.execute(sql, ('webmaster@python.org',))
        result = cursor.fetchone()
        print(result)
```

