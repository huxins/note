# Flask

## 1. 入门

### 1.1. 安装

```sh
$ pip3 install flask
```

## 2. 快速上手

### 2.1. 一个最小的应用

一个最小的 Flask 应用如下：

```python
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "Hello, World!"
```

### 2.2. 程序发现机制

如果你把上面的程序保存成其他的名字，比如 `hello.py`，接着执行 `flask run` 命令会返回一个错误提示。这是因为 Flask 默认会假设你把程序存储在名为 `app.py` 或 `wsgi.py` 的文件中。如果你使用了其他名称，就要设置系统环境变量 `FLASK_APP` 来告诉 Flask 你要启动哪个程序：

```sh
$ export FLASK_APP=hello
```

在 Windows CMD 中使用 `set` 命令：

```powershell
> set FLASK_APP=hello
```

在 Windows PowerShell 中则使用下面的命令：

```powershell
> $env:FLASK_APP = "hello"
```

### 2.3. 调试模式

`FLASK_ENV` 用来设置程序运行的环境，默认为 `production`。在开发时，我们需要开启调试模式（debug mode）。调试模式可以通过将系统环境变量 `FLASK_ENV` 设为 `development` 来开启。调试模式开启后，当程序出错，浏览器页面上会显示错误信息；代码出现变动后，程序会自动重载。

下面是手动设置环境变量 `FLASK_ENV` 来开启调试模式的示例：

```sh
$ export FLASK_ENV=development
```

为了不用每次打开新的终端会话都要设置环境变量，我们安装用来自动导入系统环境变量的 `python-dotenv`：

```sh
$ pip3 install python-dotenv
```

当 `python-dotenv` 安装后，Flask 会从项目根目录的 `.flaskenv` 和 `.env` 文件读取环境变量并设置。我们分别使用文本编辑器创建这两个文件，或是使用更方便的 `touch` 命令创建：

```sh
$ touch .env .flaskenv
```

`.flaskenv` 用来存储 Flask 命令行系统相关的公开环境变量；而 `.env` 则用来存储敏感数据，不应该提交进 Git 仓库，我们把文件名 `.env` 添加到 `.gitignore` 文件来让 Git 忽略它。

在新创建的 `.flaskenv` 文件里，我们写入一行 `FLASK_ENV=development`，将环境变量 `FLASK_ENV` 的值设为 `development`，以便开启调试模式：

```ini
# .flaskenv 文件
FLASK_ENV=development
```

### 2.4. HTML 转义

当返回 HTML 时，为了防止注入攻击，所有用户提供的值在输出渲染前必须被转义。

```python
from markupsafe import escape

@app.route("/<name>")
def hello(name):
    return f"Hello, {escape(name)}!"
```

### 2.5. 路由

使用 `route()` 装饰器来把函数绑定到 URL：

```python
@app.route('/')
def index():
    return 'Index Page'

@app.route('/hello')
def hello():
    return 'Hello, World'
```

#### 2.5.1. 变量规则

通过把 URL 的一部分标记为 `<variable_name>` 就可以在 URL 中添加变量。标记的部分会作为关键字参数传递给函数。通过使用 `<converter:variable_name>`，可以选择性的加上一个转换器，为变量指定规则。请看下面的例子：

```python
from markupsafe import escape

@app.route('/user/<username>')
def show_user_profile(username):
    return f'User {escape(username)}'

@app.route('/post/<int:post_id>')
def show_post(post_id):
    return f'Post {post_id}'

@app.route('/path/<path:subpath>')
def show_subpath(subpath):
    return f'Subpath {escape(subpath)}'
```

转换器类型：

- `string`：默认值，接受任何不包含斜杠的文本
- `int`：接受正整数
- `float`：接受正浮点数
- `path`：类似 `string`，但可以包含斜杠
- `uuid`：接受 UUID 字符串

#### 2.5.2. 唯一的 URL / 重定向行为

以下两条规则的不同之处在于是否使用尾部的斜杠：

```python
@app.route('/projects/')
def projects():
    return 'The project page'

@app.route('/about')
def about():
    return 'The about page'
```

`projects` 的 URL 尾部有一个斜杠，看起来就如同一个文件夹。访问一个没有斜杠结尾的 URL ( `/projects` ) 时 Flask 会自动进行重定向，帮您在尾部加上一个斜杠 ( `/projects/` )。

`about` 的 URL 没有尾部斜杠，因此其行为表现与一个文件类似。如果访问这个 URL 时添加了尾部斜杠 ( `/about/` ) 就会得到一个 404 错误。这样可以保持 URL 唯一，并有助于搜索引擎重复索引同一页面。

#### 2.5.3. URL 构建

`url_for()` 函数用于构建指定函数的 URL。它把函数名称作为第一个参数。它可以接受任意个关键字参数，每个关键字参数对应 URL 中的变量。未知变量将添加到 URL 中作为查询参数。

```python
from flask import url_for

app = Flask(__name__)

@app.route('/')
def index():
    return 'index'

@app.route('/login')
def login():
    return 'login'

@app.route('/user/<username>')
def profile(username):
    return f"{username}'s profile"

with app.test_request_context():
    print(url_for('index'))
    print(url_for('login'))
    print(url_for('login', next='/'))
    print(url_for('profile', username='John Doe'))
```

#### 2.5.4. HTTP 方法

Web 应用使用不同的 HTTP 方法处理 URL。缺省情况下，一个路由只回应 GET 请求。可以使用 `route()` 装饰器的 `methods` 参数来处理不同的 HTTP 方法：

```python
from flask import request

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        return do_the_login()
    else:
        return show_the_login_form()
```

### 2.6. 静态文件

只要在您的包或模块旁边创建一个名为 `static` 的文件夹就行了。静态文件位于应用的 `/static` 中。

使用特定的 `'static'` 端点就可以生成相应的 URL

```python
url_for('static', filename='style.css')
```

这个静态文件在文件系统中的位置应该是 `static/style.css`。

### 2.7. 操作请求数据

在 Flask 中由全局对象 `request` 来提供请求信息。既然这个对象是全局的，怎么还能保持线程安全？答案是*本地环境*。

#### 2.7.2. 请求对象

从 `flask` 模块导入请求对象：

```python
from flask import request
```

通过使用 `method` 属性可以操作当前请求方法，通过使用 `form` 属性处理表单数据。以下是使用上述两个属性的例子：

```python
@app.route('/login', methods=['POST', 'GET'])
def login():
    error = None
    if request.method == 'POST':
        if valid_login(request.form['username'],
                       request.form['password']):
            return log_the_user_in(request.form['username'])
        else:
            error = 'Invalid username/password'
    return render_template('login.html', error=error)
```

要操作 URL（如 `?key=value`）中提交的参数可以使用 `args` 属性：

```python
searchword = request.args.get('key', '')
```

将 `application/json` 数据解析为 JSON：

```python
obj = request.get_json()
```

## 9. 配置管理

应用总是需要一定的配置的。根据应用环境不同，会需要不同的配置。比如开关调试模式、设置密钥以及其他依赖于环境的东西。

### 9.1. 配置入门

`config` 实质上是一个字典的子类，可以像字典一样操作：

```python
app = Flask(__name__)
app.config['TESTING'] = True
```

某些配置值还转移到了 Flask 对象中，可以直接通过 Flask 来操作：

```python
app.testing = True
```

一次更新多个配置值可以使用 `dict.update()` 方法：

```python
app.config.update(
    TESTING=True,
    SECRET_KEY='192b9bdd22ab9ed4d12e236c78afcb9a393ec15f71bbf5dc987d54727823bcbf'
)
```

### 9.3. 内置配置变量

以下配置变量由 Flask 内部使用：

- **ENV**

  应用运行于什么环境。
  
  缺省值：`'production'`
  
- **DEBUG**

  是否开启调试模式。
  
  缺省值：当 `ENV` 是 `'development'` 时，为 `True`；否则为 `False`。

## 14. 使用蓝图进行应用模块化

为了在一个或多个应用中，使应用模块化并且支持常用方案，Flask 引入了*蓝图*概念。蓝图可以极大地简化大型应用并为扩展提供集中的注册入口。`Blueprint` 对象与 Flask 应用对象的工作方式类似，但不是一个真正的应用。它更像一个用于构建和扩展应用的*蓝图*。

### 14.3. 第一个蓝图

以下是一个最基本的蓝图示例：

```python
from flask import Blueprint

simple_page = Blueprint('simple_page', __name__, url_prefix='/')

@simple_page.route('/', defaults={'page': 'index'})
@simple_page.route('/<page>')
def show(page):
    return page
```

当你使用 `@simple_page.route` 装饰器绑定一个函数时，蓝图会记录下所登记的 `show` 函数。当以后在应用中注册蓝图时，这个函数会被注册到应用中。另外，它会把构建 `Blueprint` 时所使用的名称作为函数端点的前缀。蓝图的名称不修改 URL，只修改端点。

### 14.4. 注册蓝图

可以这样注册蓝图：

```python
from flask import Flask
import simple_page

app = Flask(__name__)
app.register_blueprint(simple_page)
```

## 19. Flask 方案

### 19.8. 使用 SQLAlchemy

因为 SQLAlchemy 是一个常用的数据库抽象层，并且需要一定的配置才能使用，因此，我们为你做了一个处理 SQLAlchemy 的扩展。如果你需要快速的开始使用 SQLAlchemy，那么推荐你使用这个扩展。

#### 19.8.1. 快速开始

##### 19.8.1.2. 安装

从 PyPI 下载 [Flask-SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/)：

```sh
$ pip install -U Flask-SQLAlchemy
```

##### 19.8.1.3. 配置扩展

唯一需要的 Flask 应用程序配置是 `SQLALCHEMY_DATABASE_URI` 键。这是一个连接字符串，它告诉 SQLAlchemy 要连接到哪个数据库。

创建 Flask 应用程序对象，加载配置，然后通过调用 `db.init_app` 使应用程序初始化 SQLAlchemy 扩展类。此示例连接到 SQLite 数据库，该数据库存储在应用程序的实例文件夹中。

```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# 创建扩展
db = SQLAlchemy()
# 创建应用
app = Flask(__name__)
# 配置 SQLite 数据库，相对于应用程序实例文件夹
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
# 使用扩展初始化应用程序
db.init_app(app)
```

`db` 对象使您可以访问 `db.Model` 类来定义模型，并访问 `db.session` 来执行查询。

##### 19.8.1.4. 定义 Models

子类 `db.Model` 以定义模型类。`db` 对象使 `sqlalchemy` 和 `sqlalchemy.orm` 中的名称方便使用，例如 `db.Column`。该模型将通过将 CamelCase 类名转换为 snake_case 来生成表名。

```python
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String)
```

表名 `user` 将自动分配给模型的表。

##### 19.8.1.5. 创建表

定义完所有模型和表后，调用 `SQLAlchemy.create_all()` 在数据库中创建表。这需要一个应用程序上下文。由于此时您不在请求中，请手动创建一个。

```python
with app.app_context():
    db.create_all()
```

如果你在其他模块中定义模型，你必须在调用 `create_all` 之前导入它们，否则 SQLAlchemy 将不知道它们。

如果表已经在数据库中，`create_all` 不会更新它们。

