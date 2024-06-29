# Serverless

## 1. Plugins

Serverless Framework Plugin 实际上是一个函数的管理工具，无论针对 AWS 还是腾讯云，Plugin 的目标都是对函数进行管理。可参考相关[例子](https://github.com/serverless/examples)。

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



### 1.2. Serverless Python Requirements

一个 Serverless Framework 插件，用于自动捆绑 `requirements.txt` 中的依赖项并使其在您的 `PYTHONPATH` 中可用。

- 插件安装

```sh
$ serverless plugin install -n serverless-python-requirements
```

当您运行 `sls deploy` 时，该插件现在将捆绑您在 `requirements.txt` 或 `Pipfile` 中指定的 `python` 依赖项。

注意，最后上传到云函数的包，包内文件的修改时间可能导致部署失败。

### 1.3. Serverless WSGI

[Serverless WSGI](https://www.serverless.com/plugins/serverless-wsgi) 用于使用无服务器构建部署 Python WSGI 应用程序。

- 插件安装：

```sh
$ sls plugin install -n serverless-wsgi
```



## Serverless Database

- [Amazon Aurora Serverless](https://aws.amazon.com/cn/rds/aurora/serverless/) - 关系型数据库
- [Amazon DynamoDB](https://aws.amazon.com/cn/dynamodb/) - 键值数据库
- [Amazon Timestream](https://aws.amazon.com/cn/timestream/) - 时序数据库
- [Amazon Keyspaces](https://aws.amazon.com/cn/keyspaces/) - 宽列数据库
- [Amazon QLDB](https://aws.amazon.com/cn/qldb/) - 分类账数据库
- [Tencent Cloud TDSQL-C MySQL](https://cloud.tencent.com/document/product/1003/50853) - 关系型数据库
- [Tencent Cloud PostgreSQL for Serverless](https://cloud.tencent.com/document/product/409/42844) - 关系型数据库
- [Alibaba Cloud PolarDB](https://www.aliyun.com/product/polardb) - 关系型数据库

