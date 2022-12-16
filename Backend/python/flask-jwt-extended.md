# Flask-JWT-Extended

## 一、安装

使用 `pip` 开始使用此扩展的最简单方法：

```sh
$ pip install flask-jwt-extended
```

## 二、基本用法

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

