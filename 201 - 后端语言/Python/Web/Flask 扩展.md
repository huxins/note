# Flask 扩展

## Flask-SQLAlchemy

[SQLAlchemy](https://github.com/sqlalchemy/sqlalchemy) 的独立使用需显式配置管理，而 [Flask-SQLAlchemy](https://github.com/pallets-eco/flask-sqlalchemy) 扩展通过框架集成可将其改造为声明式配置模式，提供开箱即用的会话控制与资源生命周期管理。

**安装**：[`Flask-SQLAlchemy`](https://pypi.org/project/Flask-SQLAlchemy/)

```sh
pip install Flask-SQLAlchemy
```

Flask 应用配置核心参数为 [`SQLALCHEMY_DATABASE_URI`](https://flask-sqlalchemy.readthedocs.io/en/stable/config/#flask_sqlalchemy.config.SQLALCHEMY_DATABASE_URI)，该键值定义符合 DB-API 规范的标准连接字符串，用于声明 SQLAlchemy 的数据库连接端点。

典型应用**初始化流程**如下：

- 实例化 Flask 对象后加载配置
- 通过 [`db.init_app()`](https://flask-sqlalchemy.readthedocs.io/en/stable/api/#flask_sqlalchemy.SQLAlchemy.init_app) 方法采用工厂模式进行扩展初始化
- SQLite 数据库上下文绑定至应用实例专属目录

```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"

db.init_app(app)
```

[`db`](https://flask-sqlalchemy.readthedocs.io/en/stable/quickstart/#about-the-sqlalchemy-object) 对象封装 ORM 核心功能组件：

- `db.Model` 基类实现声明式模型定义
- `db.session` 接口执行原子化事务操作，该会话管理器提供 CRUD 操作的事务完整性保障及连接池优化访问。

### 定义模型

[模型类](https://flask-sqlalchemy.readthedocs.io/en/stable/quickstart/#define-models)通过继承 `db.Model` 基类进行定义，其中 `db` 对象封装了 SQLAlchemy 核心模块 [`sqlalchemy`](https://docs.sqlalchemy.org/en/20/core/api_basics.html) 和 ORM 模块 `sqlalchemy.orm` 的常用组件（如 `db.Column`）。根据 SQLAlchemy ORM 机制，数据表名称将自动由模型类的 CamelCase 命名转换为 snake_case 格式。

```python
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String)
```

### 生成表结构

在完成所有模型及数据表定义后，需调用 `SQLAlchemy.create_all()` 方法生成数据库表结构。该操作须在应用上下文中执行，若当前处于非请求处理环境，可通过 `with app.app_context():` 手动构建上下文区块实现。

```python
with app.app_context():
    db.create_all()
```

若模型定义分布在多个模块中，需在调用 `create_all()` 前显式导入相关模型类，以确保 SQLAlchemy ORM 能够识别其元数据。

此外，`create_all()` 仅执行数据库表的初始化创建操作，若需同步模型字段变更至已存在的表结构，应通过集成迁移工具（如 Flask-Migrate 或 Flask-Alembic）生成迁移脚本，实现数据库模式的版本化演进。

### 查询数据

在 Flask 视图或 CLI 命令中，可通过 `db.session` 接口执行 ORM 查询及数据操作。

`Model.query` 为 SQLAlchemy [传统查询模式](https://flask-sqlalchemy.readthedocs.io/en/stable/queries/#legacy-query-interface)，现已被声明式会话取代，后者通过预编译语句实现更规范的查询构建，推荐作为标准实践。

```python
# 获取id为5的用户
user = User.query.get(5)  # User.query 是 db.session.query(User) 的快捷方式

# 通过用户名获取用户
user = User.query.filter_by(username=username).one()
```

## Flask-Marshmallow

[Flask-Marshmallow](https://github.com/marshmallow-code/flask-marshmallow) 是 Flask Web 框架与 [marshmallow](https://github.com/marshmallow-code/marshmallow) 对象序列化/反序列化库的轻量化集成方案，其通过扩展字段类型（如 URL 和 Hyperlinks）原生支持构建符合 HATEOAS 规范的 API 接口。该库不仅强化了 marshmallow 的核心功能，还可与 Flask-SQLAlchemy ORM 框架深度整合，实现 ORM 模型与序列化逻辑的无缝衔接。

**安装**：[`flask-marshmallow`](https://pypi.org/project/flask-marshmallow/)

```sh
pip install flask-marshmallow
```

**初始化**：

```python
from flask import Flask
from flask_marshmallow import Marshmallow

app = Flask(__name__)
ma = Marshmallow(app)
```

### 声明模式

```python
from your_orm import Model, Column, Integer, String, DateTime

# 定义模型
class User(Model):
    email = Column(String)
    password = Column(String)
    date_created = Column(DateTime, auto_now_add=True)

# 声明模式
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

### 输出数据

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

### 深度集成

[`Flask-Marshmallow`](https://github.com/marshmallow-code/flask-marshmallow) 提供与 [`Flask-SQLAlchemy`](https://github.com/pallets-eco/flask-sqlalchemy) 及 [`marshmallow-sqlalchemy`](https://github.com/marshmallow-code/marshmallow-sqlalchemy) 的深度集成支持，通过 ORM 层适配实现声明式模型序列化。

启用该功能需预先安装 `Flask-SQLAlchemy` 与 `marshmallow-sqlalchemy` 依赖项，以实现自动化模式推断及数据库模型与序列化逻辑的精准映射。

```sh
pip install -U flask-sqlalchemy marshmallow-sqlalchemy
```

按顺序初始化 SQLAlchemy 和 Marshmallow 扩展。

```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:////tmp/test.db"

# 顺序很重要：在 Marshmallow 之前初始化 SQLAlchemy
db = SQLAlchemy(app)
ma = Marshmallow(app)

# 声明模型
class Author(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))

class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    author_id = db.Column(db.Integer, db.ForeignKey("author.id"))
    author = db.relationship("Author", backref="books")
```

使用 `SQLAlchemySchema` 或 `SQLAlchemyAutoSchema` 从模型生成 Marshmallow Schema。

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

## marshmallow-sqlalchemy

[`marshmallow-sqlalchemy`](https://github.com/marshmallow-code/marshmallow-sqlalchemy) 专为 SQLAlchemy ORM 模型与 marshmallow 序列化/反序列化框架提供深度整合，支持自动化模式推断与双向数据转换。

**安装**：

```sh
pip install marshmallow-sqlalchemy
```

### 定义模型

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

### 声明模式

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

可以使用 `SQLAlchemyAutoSchema` 为 Model 的列自动生成字段。

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

需确保在实例化 Schema 前完成数据模型类的声明，以避免 SQLAlchemy ORM 的 `configure_mappers()` 方法因元数据未就绪而触发过早，导致映射配置异常。

### 序列化数据

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

## Flask-JWT-Extended

[Flask-JWT-Extended](https://github.com/vimalloc/flask-jwt-extended) 为 JWT 身份验证提供全功能支持，具备开箱即用的集成能力，涵盖令牌生成、验证及权限管理等核心流程。

**安装**：

```sh
pip install flask-jwt-extended
```

### 基本使用

通过 `create_access_token()` 生成加密令牌；使用 `@jwt_required()` 装饰器实施路由访问控制；在受保护路由中调用 `get_jwt_identity()` 即可解析并获取当前令牌关联的用户身份标识。

```python
from flask import Flask, request

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
        return {"msg": "Bad username or password"}, 401

    access_token = create_access_token(identity=username)
    return access_token=access_token

@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return current_user, 200

if __name__ == "__main__":
    app.run()
```

### 可选鉴权

在需要兼容 JWT 可选验证的鉴权场景中，可通过 `@jwt_required(optional=True)` 装饰器实现路由的弹性鉴权策略。

此模式下，若请求未携带有效 JWT，`get_jwt()` 及 `get_jwt_header()` 将返回空字典对象，`get_jwt_identity()` 和 `current_user` 则返回 `None` 值。

需注意：当存在 JWT 但发生过期或验证异常时，系统仍会触发标准错误响应机制，确保安全性不受折损。

### 默认行为

该扩展默认提供标准化安全策略。例如，当过期令牌尝试访问受保护端点时，系统将自动返回携带错误信息的 JSON 响应体及 401 状态码。若需针对特定业务场景调整扩展行为（如身份解析方式、令牌验证流程），可通过回调函数体系实现深度定制。

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

## Flask-RESTful

[Flask-RESTful](https://github.com/flask-restful/flask-restful) 为构建符合 REST 架构规范的 API 服务提供核心组件集，通过声明式资源路由、请求数据验证及响应序列化机制，显著简化 RESTful 接口开发流程，支持标准化特性（如内容协商、状态码管理），助力实现高内聚低耦合的 API 设计范式。

**安装**：

```sh
pip install flask-restful
```

## Flask-CORS

[Flask-CORS](https://github.com/corydolphin/flask-cors) 通过中间件机制实现跨域资源共享（CORS）协议，为 REST API 提供符合 W3C 规范的跨域 AJAX 请求安全授权解决方案。

**安装**：

```sh
pip install flask-cors
```

