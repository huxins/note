# Flask

## 入门

### 安装

```sh
$ pip3 install flask
```

## 快速上手

### 一个最小的应用

一个最小的 Flask 应用如下：

```python
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "Hello, World!"
```

### 程序发现机制

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

### 调试模式

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

### HTML 转义

当返回 HTML 时，为了防止注入攻击，所有用户提供的值在输出渲染前必须被转义。

```python
from markupsafe import escape

@app.route("/<name>")
def hello(name):
    return f"Hello, {escape(name)}!"
```

### 路由

使用 `route()` 装饰器来把函数绑定到 URL：

```python
@app.route('/')
def index():
    return 'Index Page'

@app.route('/hello')
def hello():
    return 'Hello, World'
```

#### 变量规则

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

#### 唯一的 URL / 重定向行为

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

#### URL 构建

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

#### HTTP 方法

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

### 静态文件

只要在您的包或模块旁边创建一个名为 `static` 的文件夹就行了。静态文件位于应用的 `/static` 中。

使用特定的 `'static'` 端点就可以生成相应的 URL

```python
url_for('static', filename='style.css')
```

这个静态文件在文件系统中的位置应该是 `static/style.css`。

## 参考文献

- [Flask 中文文档](https://dormousehole.readthedocs.io/en/latest/)
- [Flask 入门教程](https://read.helloflask.com/)

