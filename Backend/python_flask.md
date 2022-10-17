# Flask

## 安装

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
    return "<p>Hello, World!</p>"
```

