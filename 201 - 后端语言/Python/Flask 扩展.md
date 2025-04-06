## 三、扩展

### Flask-SQLAlchemy

SQLAlchemy 是一个常用的数据库抽象层，需要一些配置工作，Flask-SQLAlchemy 扩展可以简化。

```sh
pip install Flask-SQLAlchemy
```

唯一需要的 Flask 应用程序配置是 `SQLALCHEMY_DATABASE_URI` 键。这是一个连接字符串，它告诉 SQLAlchemy 要连接到哪个数据库。

创建 Flask 应用程序对象，加载配置，然后通过调用 `db.init_app` 使应用程序初始化 SQLAlchemy 扩展类。此示例连接到 SQLite 数据库，该数据库存储在应用程序的实例文件夹中。

```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"

db.init_app(app)
```

`db` 对象使您可以访问 `db.Model` 类来定义模型，并访问 `db.session` 来执行查询。

#### ORM 映射

子类 `db.Model` 以定义模型类。`db` 对象使 `sqlalchemy` 和 `sqlalchemy.orm` 中的名称方便使用，例如 `db.Column`。该模型将通过将 CamelCase 类名转换为 snake_case 来生成表名。

```python
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String)
```

表名 `user` 将自动分配给模型的表。

#### 创建表

定义完所有模型和表后，调用 `SQLAlchemy.create_all()` 在数据库中创建表。这需要一个应用程序上下文。由于此时您不在请求中，请手动创建一个。

```python
with app.app_context():
    db.create_all()
```

如果你在其他模块中定义模型，你必须在调用 `create_all` 之前导入它们，否则 SQLAlchemy 将不知道它们。

如果表已经在数据库中，`create_all` 不会更新它们。

#### 查询表

Flask-SQLAlchemy 向每个模型添加一个查询对象。这可用于查询给定模型的实例。`User.query` 是 `db.session.query(User)` 的快捷方式。

```python
# 获取 id 为 5 的用户
user = User.query.get(5)

# 通过用户名获取用户
user = User.query.filter_by(username=username).one()
```

### Flask-Marshmallow

```sh
pip install flask-marshmallow
```

初始化扩展。

```python
from flask import Flask
from flask_marshmallow import Marshmallow

app = Flask(__name__)
ma = Marshmallow(app)
```

#### 创建 models

```python
from your_orm import Model, Column, Integer, String, DateTime

class User(Model):
    email = Column(String)
    password = Column(String)
    date_created = Column(DateTime, auto_now_add=True)
```

#### 定义输出格式

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

#### 在视图中输出数据

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

#### Flask-SQLAlchemy 集成

`Flask-Marshmallow` 包括用于与 `Flask-SQLAlchemy` 和 `marshmallow-sqlalchemy` 集成的有用附加功能。

要启用 SQLAlchemy 集成，请确保同时安装了 `Flask-SQLAlchemy` 和 `marshmallow-sqlalchemy`。

```sh
pip install -U flask-sqlalchemy marshmallow-sqlalchemy
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

### Flask-JWT-Extended

```sh
pip install flask-jwt-extended
```

#### 配置扩展

在其最简单的形式中，使用此扩展程序并不多。您使用 `create_access_token()` 制作 JSON Web 令牌，使用 `jwt_required()` 保护路由，使用 `get_jwt_identity()` 获取受保护路由中 JWT 的身份。

```python
from flask import Flask
from flask import jsonify
from flask import request

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
jwt = JWTManager(app)


@app.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if username != "test" or password != "test":
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)


@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


if __name__ == "__main__":
    app.run()
```

#### 部分保护路由

在某些情况下，无论请求中是否存在 JWT，您都希望使用相同的路由。在这些情况下，您可以使用 `jwt_required()` 和 `optional=True` 参数。

如果不存在 JWT，`get_jwt()` 和 `get_jwt_header()` 将返回一个空字典。`get_jwt_identity()`、`current_user` 和 `get_current_user()` 将返回 None。

如果请求中有过期或不可验证的 JWT，仍会像往常一样返回错误。

#### 更改默认行为

- **expired_token_loader**(*callback*)

  此装饰器设置回调函数，用于在遇到过期的 JWT 时返回自定义响应。

  ```python
  @jwt.expired_token_loader
  def handle_token_error(jwt_header, jwt_payload):
      return jsonify(code="dave", err="I can't let you do that"), 401
  ```

- **invalid_token_loader**(*callback*)

  当遇到无效的 JWT 时，此装饰器设置用于返回自定义响应的回调函数。

  ```python
  @jwt.invalid_token_loader
  def handle_token_error(e):
      return ResMsg(code=ResponseCode.PleaseSignIn).data
  ```

### Flask-RESTful

```sh
pip install flask-restful
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



