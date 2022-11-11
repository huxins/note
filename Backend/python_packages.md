# Python Packages

## 1. pip

### 1.1. 安装

#### 1.1.1. 升级 `pip`

```sh
$ python -m pip install --upgrade pip
```

### 1.2. 主题指南

#### 1.2.1. 配置

`pip` 允许用户通过 3 种机制改变其行为：

- 命令行选项
- 环境变量
- 配置文件

##### 1.2.1.1. 配置文件

配置文件可以更改命令行选项的默认值。它们是使用标准 INI 样式的配置文件编写的。

`pip` 有 3 个级别的配置文件：

- `global`：系统范围的配置文件，在用户之间共享。
- `user`：每个用户的配置文件。
- `site`：每个环境的配置文件；即虚拟环境。

###### 1.2.1.1.1. 位置

`pip` 的配置文件位于相当标准的位置。这个位置在不同的操作系统上是不同的，并且由于向后兼容的原因有一些额外的复杂性。

- Windows
  - Global
    - 在 Windows 7 及更高版本上：`C:\ProgramData\pip\pip.ini`
  - User
    - `%APPDATA%\pip\pip.ini`
    - 旧的用户配置文件也会被加载，如果它存在的话：`%HOMEPATH%\pip\pip.ini`
  - Site
    - `%VIRTUAL_ENV%\pip.ini`

###### 1.2.1.1.2. 装载顺序

当找到多个配置文件时，`pip` 按以下顺序组合它们：

- `PIP_CONFIG_FILE`
- Global
- User
- Site

每个文件读取都会覆盖从先前文件读取的任何值，因此如果在全局文件和每个用户文件中都指定了 *global timeout*，则将使用后一个值。

###### 1.2.1.1.3. 命名

设置的名称源自长命令行选项。

例如，如果您想使用不同的包索引 (`--index-url`) 并将 HTTP 超时 (`--default-timeout`) 设置为 60 秒，您的配置文件将如下所示：

```ini
[global]
timeout = 60
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
```

###### 1.2.1.1.4. 每个命令部分

每个子命令都可以在其自己的部分中进行配置。这会覆盖具有相同名称的全局设置。

例如，如果您想在运行 `pip freeze` 时将超时时间减少到 10 秒，并为所有其他命令使用 60 秒：

```ini
[global]
timeout = 60

[freeze]
timeout = 10
```

### 1.3. 命令

#### 1.3.1. pip install

##### 1.3.1.1. 用法

```
python -m pip install [options] <requirement specifier> [package-index-options] ...
```

##### 1.3.1.2. 描述

###### 1.3.1.2.1. 查找包

- PyPI 镜像站
  - 豆瓣：`https://pypi.doubanio.com/simple/`
  - 清华：`https://pypi.tuna.tsinghua.edu.cn/simple/`

##### 1.3.1.3. 选项

- **-i**, **--index-url** *`<url>`*

   Python 包索引的 Base URL（默认 https://pypi.org/simple）。这应该指向符合 PEP 503（简单存储库 API）的存储库或以相同格式布局的本地目录。

##### 1.3.1.4. 例子

1. 使用需求说明符从 PyPI 安装 `SomePackage` 及其依赖项

    ```sh
    $ python -m pip install SomePackage            # 最新版本
    $ python -m pip install SomePackage==1.0.4     # 具体版本
    $ python -m pip install 'SomePackage>=1.0.4'   # 最低版本
    ```

2. 从替代软件包存储库安装

   从不同的索引安装，而不是 PyPI

    ```sh
    $ python -m pip install --index-url https://pypi.doubanio.com/simple SomePackage
    ```

   从包含档案的本地平面目录安装（并且不扫描索引）
   
    ```sh
    $ python -m pip install --no-index --find-links=file:///local/dir/ SomePackage
    $ python -m pip install --no-index --find-links=/local/dir/ SomePackage
    $ python -m pip install --no-index --find-links=relative/dir/ SomePackage
    ```

#### 1.3.2. pip config

##### 1.3.2.1. 用法

```
python -m pip config [<file-option>] list

python -m pip config [<file-option>] get command.option
python -m pip config [<file-option>] set command.option value
python -m pip config [<file-option>] unset command.option
```

##### 1.3.2.2. 例子

1. 在配置文件中指定包索引的 Base URL

    ```sh
    $ python -m pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
    ```

2. 获取在配置文件中包索引的 Base URL

    ```sh
    $ python -m pip config get global.index-url
    ```

## 2. Flask

### 2.1. 入门

#### 2.1.1. 安装

```sh
$ pip3 install flask
```

### 2.2. 快速上手

#### 2.2.1. 一个最小的应用

一个最小的 Flask 应用如下：

```python
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "Hello, World!"
```

#### 2.2.2. 程序发现机制

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

#### 2.2.3. 调试模式

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

#### 2.2.4. HTML 转义

当返回 HTML 时，为了防止注入攻击，所有用户提供的值在输出渲染前必须被转义。

```python
from markupsafe import escape

@app.route("/<name>")
def hello(name):
    return f"Hello, {escape(name)}!"
```

#### 2.2.5. 路由

使用 `route()` 装饰器来把函数绑定到 URL：

```python
@app.route('/')
def index():
    return 'Index Page'

@app.route('/hello')
def hello():
    return 'Hello, World'
```

##### 2.2.5.1. 变量规则

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

##### 2.2.5.2. 唯一的 URL / 重定向行为

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

##### 2.2.5.3. URL 构建

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

##### 2.2.5.4. HTTP 方法

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

#### 2.2.6. 静态文件

只要在您的包或模块旁边创建一个名为 `static` 的文件夹就行了。静态文件位于应用的 `/static` 中。

使用特定的 `'static'` 端点就可以生成相应的 URL

```python
url_for('static', filename='style.css')
```

这个静态文件在文件系统中的位置应该是 `static/style.css`。

#### 2.2.7. 操作请求数据

在 Flask 中由全局对象 `request` 来提供请求信息。既然这个对象是全局的，怎么还能保持线程安全？答案是*本地环境*。

##### 2.2.7.2. 请求对象

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

### 2.14. 使用蓝图进行应用模块化

为了在一个或多个应用中，使应用模块化并且支持常用方案，Flask 引入了*蓝图*概念。蓝图可以极大地简化大型应用并为扩展提供集中的注册入口。`Blueprint` 对象与 Flask 应用对象的工作方式类似，但不是一个真正的应用。它更像一个用于构建和扩展应用的*蓝图*。

#### 2.14.3. 第一个蓝图

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

#### 2.14.4. 注册蓝图

可以这样注册蓝图：

```python
from flask import Flask
import simple_page

app = Flask(__name__)
app.register_blueprint(simple_page)
```

