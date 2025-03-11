# Flask

Flask 是一个轻量级的 Python Web 应用程序框架，它被设计用于快速开发简单的 Web 应用程序。

通过 `pip` 进行安装。

```sh
pip install Flask
```

## 一、例子

### 初始化

#### 最简程序

```python
from flask import Flask

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "Hello, World!"
```

#### 命令行启动

如果文件名为 `app.py` 或 `wsgi.py`，则不必设置 `FLASK_APP` 环境变量。

```sh
flask run
```

否则，需要设置 `FLASK_APP` 环境变量。

```sh
> set FLASK_APP=hello      # CMD
> $env:FLASK_APP = "hello" # Powershell
$ export FLASK_APP=hello   # Bash
```

`FLASK_APP` 支持多种选项来指定应用程序。

- 空值

  导入名称为 `app` 或 `wsgi` 的 `.py` 文件或包。自动检测变量（`app` 或 `application`）和函数（`create_app` 或 `make_app`）。

- `FLASK_APP=hello:app2`

  导入名称为 `hello` 的 `.py` 文件或包。使用变量为 `app2` 的 Flask 实例。

#### Debug

Flask 应用程序运行环境由 `FLASK_ENV` 环境变量设置。如果未设置，则默认为 `production`。如果设置为 `development`，Flask 和扩展可以选择启用基于环境的行为。

如果 `FLASK_ENV` 设置为 `development`，`flask` 命令将启用调试模式，`flask run` 将启用交互式调试器和重新加载器。

```sh
> set FLASK_ENV=development      # CMD
> $env:FLASK_ENV = "development" # Powershell
$ export FLASK_ENV=development   # Bash
```

如果要单独控制调试模式，请使用 `FLASK_DEBUG`。值为 `1` 启用它，为 `0` 禁用它。

```sh
> set FLASK_DEBUG=1      # CMD
> $env:FLASK_DEBUG = "1" # Powershell
$ export FLASK_DEBUG=1   # Bash
```

#### 环境变量

可以使用 Flask 的 `dotenv` 支持自动设置环境变量，而不是每次打开新终端时都设置 `FLASK_APP`。

如果安装了 `python-dotenv`，运行 `flask` 命令将设置文件 `.env` 和 `.flaskenv` 中定义的环境变量。

```sh
pip install python-dotenv
```

### 路由

#### 路由绑定

使用 `route()` 装饰器将函数绑定到 URL。

```python
@app.route("/")
def index():
    return "Index Page"


@app.route("/hello")
def hello():
    return "Hello, World"
```

#### 变量规则

通过把 URL 的一部分标记为 `<variable_name>` 就可以在 URL 中添加变量。标记的部分会作为关键字参数传递给函数。通过使用 `<converter:variable_name>`，可以选择性的加上一个转换器，为变量指定规则。

```python
@app.route("/user/<username>")
def show_user_profile(username):
    return f"User {username}"


@app.route("/post/<int:post_id>")
def show_post(post_id):
    return f"Post {post_id}"
```

转换器类型：

- `string`：默认值，接受任何不包含斜杠的文本。
- `int`：接受正整数。
- `float`：接受正浮点数。
- `path`：类似 `string`，但可以包含斜杠。
- `uuid`：接受 UUID 字符串。

#### 重定向

以下两条规则的不同之处在于是否使用尾部的斜杠。

```python
@app.route("/projects/")
def projects():
    return "The project page"


@app.route("/about")
def about():
    return "The about page"
```

`projects` 的 URL 尾部有一个斜杠，看起来就如同一个文件夹。访问 `/projects` 时 Flask 会自动进行重定向，帮您在尾部加上一个斜杠。

`about` 的 URL 没有尾部斜杠，因此其行为表现与一个文件类似。如果访问 `/about/` 就会得到一个 404 错误。这样可以保持 URL 唯一。

#### URL 构建

`url_for()` 函数用于构建指定函数的 URL。它把函数名称作为第一个参数。它可以接受任意个关键字参数，每个关键字参数对应 URL 中的变量。未知变量将添加到 URL 中作为查询参数。

```python
from flask import Flask, url_for

app = Flask(__name__)


@app.route("/")
def index():
    return "index"


@app.route("/login")
def login():
    return "login"


@app.route("/user/<username>")
def profile(username):
    return f"{username}'s profile"


with app.test_request_context():
    print(url_for('index'))
    print(url_for('login'))
    print(url_for('login', next='/'))
    print(url_for('profile', username='John Doe'))
```

#### HTTP 方法

Web 应用使用不同的 HTTP 方法处理 URL。缺省情况下，一个路由只回应 GET 请求。可以使用 `route()` 装饰器的 `methods` 参数来处理不同的 HTTP 方法。

```python
from flask import Flask, request

app = Flask(__name__)


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        return "POST"
    else:
        return "GET"
```

### 蓝图

为了在一个或多个应用中，使应用模块化并且支持常用方案，Flask 引入了蓝图概念。

#### 最简程序

以下是一个最基本的蓝图示例。

```python
from flask import Blueprint

simple_page = Blueprint('simple_page', __name__, url_prefix='/')

@simple_page.route('/<page>')
def show(page):
    return page
```

构建 `Blueprint` 时所使用的名称作为函数端点的前缀。蓝图的名称不修改 URL，只修改端点。

#### 注册蓝图

可以这样注册蓝图。

```python
from flask import Flask
import simple_page

app = Flask(__name__)
app.register_blueprint(simple_page)
```

## 二、应用对象

### 响应数据

#### JSON

在 Flask 中，可以使用 `jsonify` 函数来生成 JSON 响应。`jsonify` 函数将字典或其他可序列化的对象转换为 JSON 格式，并将其作为响应返回给客户端。

```python
@app.route('/')
def index():
    data = {'message': 'Hello, World!'}
    return jsonify(data)
```

在 Flask 中自定义 JSON 编码，你可以使用 Flask 提供的 `json.JSONEncoder` 类，并覆盖其中的 `default` 方法。`default` 方法负责将无法序列化的对象转换为可序列化的对象。

> Flask==2.2.2

```python
from flask import Flask, json, jsonify
import datetime

app = Flask(__name__)


class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.datetime):
            return obj.strftime("%Y-%m-%d %H:%M:%S")
        if isinstance(obj, datetime.date):
            return obj.strftime('%Y-%m-%d')
        return super().default(obj)


app.json_encoder = CustomJSONEncoder


@app.route('/')
def index():
    data = {'message': 'Hello, World!', 'timestamp': datetime.datetime.now()}
    return jsonify(data)
```

#### 错误处理

在 Flask 中处理错误可以通过使用错误处理装饰器或注册错误处理函数来实现。

- 错误处理装饰器

  ```python
  @app.errorhandler(404)
  def not_found_error(error):
      error_message = 'Not Found'
      return jsonify({'error': error_message}), 404
  
  
  @app.route('/')
  def index():
      abort(404)
  
  
  @app.errorhandler(500)
  def internal_server_error(error):
      error_message = 'Internal Server Error'
      return jsonify({'error': error_message}), 500
  
  
  @app.route('/')
  def index():
      raise Exception('Some error occurred')
  ```

#### 拦截器

在 Flask 中，可以使用 `before_request` 装饰器来实现拦截器功能。`before_request` 会在每个请求到达路由处理函数之前执行特定的操作。

```python
@app.before_request
def authenticate():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return 'Unauthorized', 401
```

### 请求数据

在 Flask 中由全局对象 `request` 来提供请求数据。

#### 请求参数

`request.args` 用于获取 URL 中的查询参数。是一个不可变的字典。

```python
value = request.args.get('key')
```

`request.form` 用于获取请求体中的表单数据。是一个不可变的字典。需要确保请求的 `Content-Type` 是 `application/x-www-form-urlencoded` 或 `multipart/form-data`。

```python
value = request.form.get('key')
```

`request.data` 用于获取请求体中的原始数据，无论数据的内容类型是什么。它返回的是一个 `bytes`。

```python
value = str(request.data, encoding="utf-8")
```

`request.json` 用于获取请求体中的 JSON 数据。它会将请求体中的 JSON 数据解析为 Python 对象，例如字典或列表。需要确保请求的 `Content-Type` 是 `application/json`。

```python
value = request.json.get("message")
```

#### 请求属性

`request.method` 用于获取当前请求的 HTTP 方法。它返回一个字符串。

`request.endpoint` 用于获取当前请求的 `endpoint`。`endpoint` 是指与当前请求关联的视图函数的名称。

#### 文件上传

`request.files` 用于获取上传文件。它可以用来处理客户端通过 HTTP 请求上传的文件数据。

```python
file = request.files.get("filename")
value = str(file.stream.read(), encoding="utf-8")
```

### 配置文件

根据应用环境不同，会需要不同的配置。例如切换调试模式、设置密钥以及其他此类特定于环境的配置。

可以通过 Flask 对象的 `config` 属性访问已加载的配置值。这个属性是 Flask 存储配置值的地方，也是许多 Flask 扩展和应用程序自定义配置值的地方。

`config` 实质上是一个字典的子类，可以像字典一样操作。

```python
app.config['TESTING'] = True
```

某些配置值还转移到了 Flask 对象中，可以直接通过 Flask 来操作。

```python
app.testing = True
```

一次更新多个配置值可以使用 `dict.update()` 方法。

```python
app.config.update(
    TESTING=True,
    SECRET_KEY='192b9bdd22ab9ed4d12e236c78afcb9a393ec15f71bbf5dc987d54727823bcbf'
)
```

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

