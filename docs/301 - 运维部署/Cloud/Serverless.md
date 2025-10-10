# Serverless

## Plugins

[Serverless Plugin](https://www.serverless.com/plugins) 实际上是一个函数的管理工具，无论针对 AWS 还是腾讯云，Plugin 的目标都是对函数进行管理。

> - [serverless/examples](https://github.com/serverless/examples)

以下为 `serverless.yml` 基本配置示例：

```yaml
service: aws-python-api

frameworkVersion: '3'

provider:
  name: aws
  runtime: python3.7

functions:
  api:
    handler: wsgi_handler.handler
    events:
      - httpApi: '*'
```

### serverless-python-requirements

[`serverless-python-requirements`](https://github.com/serverless/serverless-python-requirements) 用于自动捆绑 `requirements.txt` 中的依赖项并使其在您的 `PYTHONPATH` 中可用。

```sh
serverless plugin install -n serverless-python-requirements
```

当运行 `sls deploy` 时，该插件将捆绑在 `requirements.txt` 或 `Pipfile` 中指定的 `python` 依赖项。

> 最后上传到云函数 SCF 的包，包内文件的修改时间可能导致部署失败。

### serverless-wsgi

[`serverless-wsgi`](https://github.com/logandk/serverless-wsgi) 用于使用无服务器构建部署 Python WSGI 应用程序。

```sh
sls plugin install -n serverless-wsgi
```

## 腾讯云

腾讯云 [SCF](https://cloud.tencent.com/document/product/583) 支持 [Python](https://cloud.tencent.com/document/product/583/55592)、Node.js、Golang、PHP、Java 等语言，可选地区列表可参考[支持地域](https://cloud.tencent.com/document/product/583/17299#.E6.94.AF.E6.8C.81.E5.9C.B0.E5.9F.9F)。

SCF 将在函数接收到触发请求时执行函数，SCF 平台负责所有函数的[生命周期](https://cloud.tencent.com/document/product/583/9694)。

API 网关触发器将[下线](https://cloud.tencent.com/document/product/583/107631)，替代方案为[函数 URL](https://cloud.tencent.com/document/product/583/96099)。

