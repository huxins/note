# Flask

[Flask](https://github.com/pallets/flask) 是一个轻量级的 Python Web 应用程序框架，它被设计用于快速开发简单的 Web 应用程序。

**安装**：

```sh
pip install Flask
```

## 一、快速开始

### 最简程序

Flask [最小化应用](https://flask.palletsprojects.com/en/stable/quickstart/#a-minimal-application)典型实现范式如下。

```python
from flask import Flask

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "Hello, World!"
```

### 入口文件

当应用入口文件采用 `app.py` 或 `wsgi.py` 标准化命名时，系统自动识别应用实例，不必设置 [`FLASK_APP`](https://flask.palletsprojects.com/en/stable/cli/#environment-variables-from-virtualenv) 环境变量。

```sh
flask --app main:app run --debug
```

否则，需要设置 `FLASK_APP` 环境变量。

```sh
export FLASK_APP=hello   # Bash
set FLASK_APP=hello      # CMD
$env:FLASK_APP = "hello" # Powershell
```

`FLASK_APP` 支持多种选项来指定应用程序：

- 空值

  导入名称为 `app` 或 `wsgi` 的 `.py` 文件或包，自动检测变量 `app`/`application` 和函数 `create_app`/`make_app`。

- `FLASK_APP=hello:app2`

  导入名称为 `hello` 的 `.py` 文件或包，使用变量为 `app2` 的 Flask 实例。

### 调试模式

> Flask 应用程序运行环境由 `FLASK_ENV` 环境变量设置：[弃用于 2.3.0](https://flask.palletsprojects.com/en/stable/changes/#version-2-3-0)
>
> - `production`：默认
> - `development`：启用调试模式
>
> ```sh
> export FLASK_ENV=development
> ```

如果要单独控制[调试模式](https://flask.palletsprojects.com/en/stable/quickstart/#debug-mode)，请使用 [`FLASK_DEBUG`](https://flask.palletsprojects.com/en/stable/api/#index-0)。

```sh
export FLASK_DEBUG=1
```

### 环境变量

集成 [`python-dotenv`](https://github.com/theskumar/python-dotenv) 依赖后，[Flask CLI](https://flask.palletsprojects.com/en/stable/cli/#environment-variables-from-dotenv) 将自动加载 `.env` 与 `.flaskenv` 文件中定义的环境变量。

```sh
pip install python-dotenv
```

## 二、路由

使用 [`route()`](https://flask.palletsprojects.com/en/stable/api/#flask.Flask.route) 装饰器将函数绑定到 URL。

```python
@app.route("/")
def index():
    return "Index Page"

@app.route("/hello")
def hello():
    return "Hello, World"
```

### 变量规则

Flask 路由系统通过把 URL 的一部分标记为 [`<param>`](https://flask.palletsprojects.com/en/stable/quickstart/#variable-rules) 实现动态路由参数注入，视图函数将自动接收对应关键字参数。

支持类型转换器扩展配置（`<converter:param>`），通过预置转换器实现参数类型约束及路径解析优化。

- `string`：默认值，接受任何不包含斜杠的文本
- `int`：接受正整数
- `float`：接受正浮点数
- `path`：类似 `string`，但可以包含斜杠
- `uuid`：接受 UUID 字符串

```python
@app.route("/user/<username>")
def show_user_profile(username):
    return f"User {username}"

@app.route("/post/<int:post_id>")
def show_post(post_id):
    return f"Post {post_id}"
```

### 重定向

Flask 路由系统严格遵循尾部斜杠语义化规范：

- **`/projects/`** 型端点：自动实施 301 重定向至标准 URI，符合目录资源访问范式
- **`/about`** 型端点：强制拒绝尾部斜杠请求，返回 404 状态码以保持文件资源定位精确性

```python
@app.route("/projects/")
def projects():
    return "The project page"

@app.route("/about")
def about():
    return "The about page"
```

### URL 构建

Flask 路由系统通过 [`url_for()`](https://flask.palletsprojects.com/en/stable/api/#flask.url_for) 方法实现视图函数反向解析。

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

### HTTP 方法

默认路由仅响应 `GET` 方法请求，开发者需通过 [`@route`](https://flask.palletsprojects.com/en/stable/api/#flask.Flask.route) 装饰器的 [`methods`](https://werkzeug.palletsprojects.com/en/stable/routing/#werkzeug.routing.Rule) 参数显式声明支持的 HTTP 方法。

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

## 三、工程化

### 蓝图

Flask [蓝图系统](https://flask.palletsprojects.com/en/stable/blueprints/)采用模块化架构设计实现业务逻辑解耦，开发者通过 [`Blueprint`](https://flask.palletsprojects.com/en/stable/api/#flask.Blueprint) 对象注册视图逻辑单元，并在应用工厂函数中执行蓝图注册操作。

#### 最简程序

以下是一个[基础蓝图](https://flask.palletsprojects.com/en/stable/blueprints/#my-first-blueprint)实现方案。

```python
from flask import Blueprint

simple_page = Blueprint('simple_page', __name__, url_prefix='/')

@simple_page.route('/<page>')
def show(page):
    return page
```

#### 注册蓝图

可以这样[注册蓝图](https://flask.palletsprojects.com/en/stable/blueprints/#registering-blueprints)。

```python
from flask import Flask
import simple_page

app = Flask(__name__)
app.register_blueprint(simple_page)
```

### 配置文件

Flask 采用初始化阶段加载配置的设计范式，虽支持硬编码配置方式（适用于小型应用场景），但更推荐动态配置管理方案。

框架通过 Flask 应用实例的 [`config`](https://flask.palletsprojects.com/en/stable/api/#flask.Flask.config) 属性提供集中式配置对象，该对象遵循模块化架构：

- 承载框架核心参数的预设配置
- 兼容扩展组件的独立配置注册
- 支持开发者进行多源自定义配置
  - 环境变量
  - 类对象
  - 配置文件

[`config`](https://flask.palletsprojects.com/en/stable/api/#flask.Flask.config) 实质上是一个字典的子类，可以像字典一样操作。

```python
app.config['TESTING'] = True
```

一次更新多个配置值可以使用 [`dict.update()`](https://docs.python.org/3/library/stdtypes.html#dict.update) 方法。

```python
app.config.update(
    TESTING=True,
    SECRET_KEY='192b9bdd22ab9ed4d12e236c78afcb9a393ec15f71bbf5dc987d54727823bcbf'
)
```

## 四、请求和响应

### 响应处理

Flask 框架对视图函数返回值采用以下自动化响应转换逻辑：

- 字符串：自动封装为包含 `text/html` MIME 类型字符串主体的响应对象
- 字典或列表：自动调用 [`jsonify()`](https://flask.palletsprojects.com/en/stable/api/#flask.json.jsonify) 生成 JSON 格式响应

#### JSON

视图函数直接返回字典类型或列表类型数据结构时，系统将自动调用 [JSON](https://flask.palletsprojects.com/en/stable/quickstart/#apis-with-json) 序列化处理并生成符合标准的 HTTP 响应。

```python
@app.route('/')
def index():
    data = {'message': 'Hello, World!'}
    return data
```

> Flask 框架支持通过继承内置 `JSONEncoder` 基类实现定制化 JSON 序列化。开发者需重写 `default()` 方法，该方法专门用于处理非标准数据类型的序列化转换，确保特定对象类型能被正确编码为 JSON 格式。弃用于 [2.3.0](https://flask.palletsprojects.com/en/stable/changes/#version-2-3-0)
>
> ```python
> from flask import Flask, json
> import datetime
> 
> app = Flask(__name__)
> 
> class CustomJSONEncoder(json.JSONEncoder):
>     def default(self, obj):
>            if isinstance(obj, datetime.datetime):
>                return obj.strftime("%Y-%m-%d %H:%M:%S")
>            if isinstance(obj, datetime.date):
>                return obj.strftime('%Y-%m-%d')
>            return super().default(obj)
>    
> app.json_encoder = CustomJSONEncoder
> 
> @app.route('/')
> def index():
>     data = {'message': 'Hello, World!', 'timestamp': datetime.datetime.now()}
>     return data
> ```

#### 拦截器

在 Flask 中，可以使用 [`before_request`](https://flask.palletsprojects.com/en/stable/api/#flask.Flask.before_request) 装饰器来实现拦截器功能。

```python
@app.before_request
def authenticate():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return 'Unauthorized', 401
```

#### 错误处理

Flask 框架默认针对不同 HTTP 状态码返回标准化错误页面。若需自定义错误页面的呈现形式，可通过内置 [`errorhandler`](https://flask.palletsprojects.com/en/stable/api/#flask.Flask.errorhandler) 装饰器实现，该机制支持开发者对特定 HTTP 状态码注册定制化错误处理逻辑。

```python
@app.errorhandler(404)
def not_found_error(error):
    error_message = 'Not Found'
    return {'error': error_message}, 404

@app.route('/')
def index():
    abort(404)


@app.errorhandler(Exception)
def internal_server_error(error):
    error_message = 'Internal Server Error'
    return {'error': error_message}, 500

@app.route('/')
def index():
    raise Exception('Some error occurred')
```

### 请求处理

Flask 框架采用上下文局部变量机制实现请求对象的线程安全访问。该架构下，全局 [`request`](https://flask.palletsprojects.com/en/stable/api/#flask.request) 对象通过请求上下文隔离存储，确保在多线程环境中各请求能独立获取对应的客户端传输数据，从而满足 Web 应用对请求数据高效处理的核心需求。

#### 请求参数

[`request.args`](https://flask.palletsprojects.com/en/stable/api/#flask.Request.args) 用于获取 URL 中的查询参数。

```python
value = request.args.get('key')
```

[`request.form`](https://flask.palletsprojects.com/en/stable/api/#flask.Request.form) 用于获取请求体中的表单数据。需要确保请求的 `Content-Type` 是 `application/x-www-form-urlencoded` 或 `multipart/form-data`。

```python
value = request.form.get('key')
```

[`request.data`](https://flask.palletsprojects.com/en/stable/api/#flask.Request.data) 用于获取请求体中的原始数据。

```python
value = str(request.data, encoding="utf-8")
```

[`request.json`](https://flask.palletsprojects.com/en/stable/api/#flask.Request.json) 用于获取请求体中的 JSON 数据。它会将请求体中的 JSON 数据解析为 Python 对象，例如字典或列表。需要确保请求的 `Content-Type` 是 `application/json`。

```python
value = request.json.get("message")
```

#### 请求属性

[`request.method`](https://flask.palletsprojects.com/en/stable/api/#flask.Request.method) 用于获取当前请求的 HTTP 方法。

[`request.endpoint`](https://flask.palletsprojects.com/en/stable/api/#flask.Request.endpoint) 用于获取当前请求的 `endpoint`。`endpoint` 是指与当前请求关联的视图函数的名称。

#### 文件上传

[`request.files`](https://flask.palletsprojects.com/en/stable/api/#flask.Request.files) 用于获取上传的文件。

```python
file = request.files.get("filename")
value = str(file.stream.read(), encoding="utf-8")
```

## Reference

- [Flask 中文文档 - *dormouse*](https://github.com/dormouse/Flask_Docs_ZhCn)
- [Flask 入门教程 - *helloflask*](https://github.com/helloflask/flask-tutorial)
- [qzq1111/flask-restful-example](https://github.com/qzq1111/flask-restful-example)

