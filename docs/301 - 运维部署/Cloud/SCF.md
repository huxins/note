# SCF

腾讯云 [SCF](https://cloud.tencent.com/document/product/583) 支持 [Python](https://cloud.tencent.com/document/product/583/55592)、Node.js、Golang、PHP、Java 等语言，可选地区列表可参考[支持地域](https://cloud.tencent.com/document/product/583/17299#.E6.94.AF.E6.8C.81.E5.9C.B0.E5.9F.9F)。

SCF 将在函数接收到触发请求时执行函数，SCF 平台负责所有函数的[生命周期](https://cloud.tencent.com/document/product/583/9694)。

API 网关触发器将[下线](https://cloud.tencent.com/document/product/583/107631)，替代方案为[函数 URL](https://cloud.tencent.com/document/product/583/96099)。

## 函数类型

云函数 SCF 提供了[代码部署](https://cloud.tencent.com/document/product/583/73483)、[镜像部署](https://cloud.tencent.com/document/product/583/56051)两种[部署方式](https://cloud.tencent.com/document/product/583/73923)。

### Web 函数

[Web 函数](https://cloud.tencent.com/document/product/583/56124)下，API 网关会在 `header` 里加上函数触发所需要的信息，并将原始请求直接透传，触发后端函数运行。

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9000)
```

### Event 函数

[Event 函数](https://cloud.tencent.com/document/product/583/9694#scf-.E4.BA.8B.E4.BB.B6.E5.87.BD.E6.95.B0)下，API 网关会将请求内容以参数形式传递给函数，并将函数返回作为响应返回给请求方。

```python
import json

def main_handler(event, context):
    print("Received event: " + json.dumps(event, indent = 2)) 
    print("Received context: " + str(context))
    print("Hello world")
    return("Hello World")
```

## 部署方式

### Plugin

> 腾讯已不再维护此方式。

Plugin 部署方式仅支持 Event 函数。

[`serverless-tencent-scf`](https://github.com/tencentyun/serverless-tencent-scf/blob/master/README.zh-hans.md) 插件提供 [Serverless Framework](https://github.com/serverless/serverless) 对 [Tencent SCF](https://cloud.tencent.com/product/scf) 的支持。

更多触发器的配置可参考 [`serverless.yml`](https://github.com/serverless-tencent/serverless-tencent-scf/blob/master/docs/zh/yaml.md)。

### Components

> 腾讯已不再维护此方式。

[Serverless Components](https://github.com/serverless/components/blob/master/README.cn.md) 是 [Serverless Framework](https://github.com/serverless/serverless) 重磅推出的基础设施编排能力，支持开发者通过 Serverless Components 构建，组合并部署你的 Serverless 应用。

可以通过基础组件部署相关的资源，如 [`tencent-scf`](https://github.com/serverless-components/tencent-scf) 可以部署云函数，[`tencent-cos`](https://github.com/serverless-components/tencent-cos) 可以部署一个存储桶；封装的上层组件实际上是对基础组件的组合，并且增加一些额外的逻辑，实现一些高阶功能，如 [`tencent-django`](https://github.com/serverless-components/tencent-django) 就通过对请求的 WSGI 转换，将 Django 框架部署到云函数上，其底层依赖了 `tencent-scf`/`tencent-apigateway` 等组件。

目前腾讯云的**基础组件**包括：

- [@serverless/tencent-scf](https://github.com/serverless-components/tencent-scf)
- [@serverless/tencent-cos](https://github.com/serverless-components/tencent-cos)
- [@serverless/tencent-cdn](https://github.com/serverless-components/tencent-cdn)
- [@serverless/tencent-apigateway](https://github.com/serverless-components/tencent-apigateway)
- [@serverless/tencent-cam-role](https://github.com/serverless-components/tencent-cam-role)
- [@serverless/tencent-cam-policy](https://github.com/serverless-components/tencent-cam-policy)

封装的**上层组件**包括：

- [@serverless/tencent-express](https://github.com/serverless-components/tencent-express)
- [@serverless/tencent-django](https://github.com/serverless-components/tencent-django)
- [@serverless/tencent-egg](https://github.com/serverless-components/tencent-egg)
- [@serverless/tencent-flask](https://github.com/serverless-components/tencent-flask)
- [@serverless/tencent-koa](https://github.com/serverless-components/tencent-koa)
- [@serverless/tencent-laravel](https://github.com/serverless-components/tencent-laravel)
- [@serverless/tencent-website](https://github.com/serverless-components/tencent-website)

相关**例子**：

- [@serverless/tencent-examples](https://github.com/serverless-components/tencent-examples)

### SCF

[`serverless-tencent`](https://github.com/Serverlesstencent/serverless-tencent/tree/v3.21.6) 基于 Component 的方式，进行了一些封装，目前已[弃用](https://www.npmjs.com/package/serverless-tencent/v/3.21.6)。

[`serverless-cloud-framework`](https://github.com/Serverlesstencent/serverless-cloud-framework) 是 [`serverless-tencent`](https://github.com/Serverlesstencent/serverless-tencent/tree/v3.21.6) 的[继任版本](https://www.npmjs.com/package/serverless-cloud-framework)。

安装 [`serverless-cloud-framework`](https://cloud.tencent.com/document/product/583/44753)：

```sh
npm i -g serverless-cloud-framework
```

配置[本地密钥授权](https://cloud.tencent.com/document/product/1154/43006#.E6.9C.AC.E5.9C.B0.E5.AF.86.E9.92.A5.E6.8E.88.E6.9D.83)：

```ini
# .env
TENCENT_SECRET_ID=xxxxxxxxxx
TENCENT_SECRET_KEY=xxxxxxxx
```

`serverless.yml` 配置项可参考 [`@serverless-components/tencent-scf`](https://github.com/serverless-components/tencent-scf/blob/master/docs/configure.md)。

[`@tencentyun/serverless-demo`](https://github.com/tencentyun/serverless-demo) 也有许多模板可供参考。

配置[启动文件](https://cloud.tencent.com/document/product/583/56126)：

```sh
#!/bin/bash
SERVERLESS=1 /var/lang/python39/bin/python3.9 -u run.py
```

部署函数：

```sh
scf deploy --noCache
```

## 运行环境

### 层

SCF 中的[层](https://cloud.tencent.com/document/product/583/40159)用于管理依赖库或公共代码文件。

打包 Python 依赖：

```sh
pip install -r requirements.txt -t ./runtime
```

