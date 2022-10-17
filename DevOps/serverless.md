# Serverless

## Plugins

Serverless Framework Plugin 实际上是一个函数的管理工具，无论针对 AWS 还是腾讯云，Plugin 的目标都是对函数进行管理。

相关例子：

- [Serverless Examples](https://github.com/serverless/examples)

### Tencent Cloud

#### Web 函数

Web 函数下，API 网关会在 header 里加上函数触发所需要的信息，并将原始请求直接透传，触发后端函数运行。

```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
   return 'Hello World'

if __name__ == '__main__':
   app.run(host='0.0.0.0',port=9000)
```

#### Event 函数

Event 函数下，API 网关会将请求内容以参数形式传递给函数，并将函数返回作为响应返回给请求方。

```python
import json
def main_handler(event, context):
    print("Received event: " + json.dumps(event, indent = 2)) 
    print("Received context: " + str(context))
    print("Hello world")
    return("Hello World")
```

#### Plugins

[serverless-tencent-scf](https://github.com/tencentyun/serverless-tencent-scf/blob/master/README.zh-hans.md) 插件提供 [Serverless Framework](https://github.com/serverless/serverless) 对 [Tencent SCF](https://cloud.tencent.com/product/scf) 的支持。

Plugins 部署方式仅支持 Event 函数。`serverless.yml` 的详细配置选项可参考 [Serverless.yml 参考](https://github.com/serverless-tencent/serverless-tencent-scf/blob/master/docs/zh/yaml.md)。

##### Example


```yaml
service: hello-world

frameworkVersion: '3'

provider:
  name: tencent
  runtime: Python3.6
  credentials: credentials.ini
  region: ap-guangzhou
  stage: dev

plugins:
  - serverless-tencent-scf

functions:
  hello_world:
    handler: index.main_handler
    description: Tencent Serverless Cloud Function
    runtime: Python3.6
    events:
      - apigw:
          name: hello_world_apigw
          parameters:
            stageName: release
            serviceId: service-oolooxe6
            httpMethod: ANY
            integratedResponse: false
            path: /abc/cde
            enableCORS: true
            serviceTimeout: 10
```

##### Serverless WSGI

[Serverless WSGI](https://www.serverless.com/plugins/serverless-wsgi) 用于使用无服务器构建部署 Python WSGI 应用程序。

安装插件：

```sh
$ sls plugin install -n serverless-wsgi
```



## Components

[Serverless Components](https://github.com/serverless/components/blob/master/README.cn.md) 是 [Serverless Framework](https://github.com/serverless/serverless) 重磅推出的基础设施编排能力，支持开发者通过 Serverless Components 构建，组合并部署你的 Serverless 应用。

### Tencent Cloud

可以通过基础组件部署相关的资源，例如 tencent-scf 可以部署云函数，tencent-cos 可以部署一个存储桶；封装的上层组件实际上是对基础组件的组合，并且增加一些额外的逻辑，实现一些高阶功能，例如 tencent-django 就通过对请求的 WSGI 转换，将 Django 框架部署到云函数上，其底层依赖了 tencent-scf/tencent-apigateway 等组件。

目前腾讯云的基础组件包括：

- [@serverless/tencent-scf](https://github.com/serverless-components/tencent-scf)
- [@serverless/tencent-cos](https://github.com/serverless-components/tencent-cos)
- [@serverless/tencent-cdn](https://github.com/serverless-components/tencent-cdn)
- [@serverless/tencent-apigateway](https://github.com/serverless-components/tencent-apigateway)
- [@serverless/tencent-cam-role](https://github.com/serverless-components/tencent-cam-role)
- [@serverless/tencent-cam-policy](https://github.com/serverless-components/tencent-cam-policy)

封装的上层组件包括：

- [@serverless/tencent-express](https://github.com/serverless-components/tencent-express)
- [@serverless/tencent-django](https://github.com/serverless-components/tencent-django)
- [@serverless/tencent-egg](https://github.com/serverless-components/tencent-egg)
- [@serverless/tencent-flask](https://github.com/serverless-components/tencent-flask)
- [@serverless/tencent-koa](https://github.com/serverless-components/tencent-koa)
- [@serverless/tencent-laravel](https://github.com/serverless-components/tencent-laravel)
- [@serverless/tencent-website](https://github.com/serverless-components/tencent-website)

相关例子：

- [@serverless/tencent-examples](https://github.com/serverless-components/tencent-examples)

## Serverless Database

- [Amazon Aurora Serverless](https://aws.amazon.com/cn/rds/aurora/serverless/) - 关系型数据库
- [Amazon DynamoDB](https://aws.amazon.com/cn/dynamodb/) - 键值数据库
- [Amazon Timestream](https://aws.amazon.com/cn/timestream/) - 时序数据库
- [Amazon Keyspaces](https://aws.amazon.com/cn/keyspaces/) - 宽列数据库
- [Amazon QLDB](https://aws.amazon.com/cn/qldb/) - 分类账数据库
- [Tencent Cloud TDSQL-C MySQL](https://cloud.tencent.com/document/product/1003/50853) - 关系型数据库
- [Tencent Cloud PostgreSQL for Serverless](https://cloud.tencent.com/document/product/409/42844) - 关系型数据库
- [Alibaba Cloud PolarDB](https://www.aliyun.com/product/polardb) - 关系型数据库

