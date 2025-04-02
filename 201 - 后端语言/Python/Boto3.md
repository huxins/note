# Boto3

[Boto3](https://github.com/boto/boto3) 是一个 Python SDK，用于访问 AWS 的服务。它使开发人员能够轻松创建、配置和管理 AWS 资源，如 Amazon S3，Amazon EC2 等等。使用 boto3，开发人员可以通过 Python 代码与 AWS 进行交互，而无需手动编写 HTTP 请求。

## 一、Session

[Session](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/session.html) 通常存储以下内容：

- [Credentials](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/credentials.html#configuring-credentials)
- [AWS Region](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/session.html#session-configurations)

### 默认会话

Boto3 作为[默认会话](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/session.html#default-session)的代理对象，会在创建低层级 [`client`](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/core/session.html#boto3.session.Session.client) 或 [`resource`](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/core/session.html#boto3.session.Session.resource) 实例时自动实例化。

```python
import boto3

# Using the default session
sqs = boto3.client('sqs')
s3 = boto3.resource('s3')
```

### 自定义会话

开发者可[自主管理](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/session.html#custom-session) `Session` 对象，并通过该 `Session` 实例化低层级 [`client`](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/core/session.html#boto3.session.Session.client) 或 [`resource`](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/core/session.html#boto3.session.Session.resource) 实例。

```python
import boto3
import boto3.session

# Create your own session
my_session = boto3.session.Session()

# 从自定义会话创建低级客户端或资源客户端
sqs = my_session.client('sqs')
s3 = my_session.resource('s3')
```

### 会话配置

[`Session`](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/core/session.html#boto3.session.Session) 实例可[独立配置](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/session.html#session-configurations)访问凭证、AWS 区域参数及配置文件。

```python
import boto3
import boto3.session

session = boto3.session.Session(
    aws_access_key_id=settings.AWS_SERVER_PUBLIC_KEY,
    aws_secret_access_key=settings.AWS_SERVER_SECRET_KEY
)
```

`Session` 对象集中维护运行时配置状态，并支持生成服务 [`client`](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/core/session.html#boto3.session.Session.client) 与 [`resource`](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/core/session.html#boto3.session.Session.resource) 实例。

```python
s3 = session.resource('s3')
```

## 二、Services

### S3

[`S3.ServiceResource`](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3/service-resource/index.html#S3.ServiceResource) 表示 S3 的服务资源类。

```python
import boto3

s3 = boto3.resource('s3')

# Bucket resource
bucket = s3.Bucket('name')
# Object resource
object = s3.Object('bucket_name', 'key')
```

#### Bucket

[`S3.Bucket`](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3/bucket/index.html#S3.Bucket) 表示 S3 存储桶实体的资源类，提供存储容器级原子操作接口。

```python
import boto3

s3 = boto3.resource('s3')
bucket = s3.Bucket('name')
```

**Actions**：

- bucket.[**upload_fileobj**](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3/bucket/upload_fileobj.html#S3.Bucket.upload_fileobj)()

  向当前存储桶执行流式上传操作，需确保 *file-like* 对象处于二进制读取模式。

  ```python
  import boto3
  
  s3 = boto3.resource('s3')
  bucket = s3.Bucket('mybucket')
  
  with open('filename', 'rb') as data:
      bucket.upload_fileobj(data, 'mykey')
  ```
  
- bucket.[**download_fileobj**](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3/bucket/download_fileobj.html#S3.Bucket.download_fileobj)()

  对当前存储桶实例执行流式下载操作，目标 *file-like* 对象需处于二进制写入模式。

  ```python
  import boto3
  
  s3 = boto3.resource('s3')
  bucket = s3.Bucket('mybucket')
  
  with open('filename', 'wb') as data:
      bucket.download_fileobj('mykey', data)
  ```

**Sub-resources**：

- bucket.[**Object**](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3/bucket/Object.html#S3.Bucket.Object)(*key*)

  表示 S3 对象资源。

  ```python
  object = bucket.Object('key')
  ```
  

**Collections**：

- bucket.[**objects**](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3/bucket/objects.html#S3.Bucket.objects)

  `ObjectSummary` 资源集合体默认执行全量加载，执行全域操作时需严格遵循高危操作预警。

  - [**all**](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3/bucket/objects.html#S3.Bucket.all)()

    实例化资源集合体内 `ObjectSummary` 全域遍历的惰性生成器，确保大数据量操作时的内存安全。

    ```python
    object_summary_iterator = bucket.objects.all()
    ```

  - [**filter**](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3/bucket/objects.html#filter)()

    实例化基于条件筛选的 `ObjectSummary` 资源遍历生成器，该惰性加载机制实现内存效率优化。当未配置筛选条件时，资源集合体默认执行全量加载，全域遍历操作需触发高危操作预警，建议显式指定资源筛选条件以保障操作可控性。

    ```python
    object_summary_iterator = bucket.objects.filter(
        Delimiter='string',
        EncodingType='url',
        Marker='string',
        MaxKeys=123,
        Prefix='string',
        RequestPayer='requester',
        ExpectedBucketOwner='string'
    )
    ```

    将响应限制为以指定前缀开头的键。

    ```python
    import boto3
    
    s3 = boto3.resource('s3')
    bucket = s3.Bucket(bucket_name)
    for obj in bucket.objects.filter(Prefix=file_name):
        if obj.key == file_name:
            return True
    return False
    ```
    
#### Object

[`S3.Object`](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3/object/index.html#S3.Object) 表示 S3 云存储对象实体的资源类，封装对象级数据流操作方法。

```python
import boto3

s3 = boto3.resource('s3')
object = s3.Object('bucket_name', 'key')
```

**Actions**：

- object.[**upload_file**](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3/object/upload_file.html#S3.Object.upload_file)()

  将文件上传到 S3 对象。

  ```python
  import boto3
  
  s3 = boto3.resource('s3')
  s3.Object('mybucket', 'hello.txt').upload_file('/tmp/hello.txt')
  ```

- object.[**upload_fileobj**](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3/object/upload_fileobj.html#S3.Object.upload_fileobj)()

  执行流式写入操作同步云端对象数据，源 *file-like* 对象须开启二进制读取模式。

  ```python
  import boto3
  
  s3 = boto3.resource('s3')
  bucket = s3.Bucket('mybucket')
  obj = bucket.Object('mykey')
  
  with open('filename', 'rb') as data:
      obj.upload_fileobj(data)
  ```

- object.[**download_file**](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3/object/download_file.html#S3.Object.download_file)()

  将 S3 对象下载到文件。

  ```python
  import boto3
  
  s3 = boto3.resource('s3')
  s3.Object('mybucket', 'hello.txt').download_file('/tmp/hello.txt')
  ```

- object.[**download_fileobj**](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3/object/download_fileobj.html#S3.Object.download_fileobj)()

  执行云端对象流式下载操作，目标 *file-like* 对象须启用二进制写入模式。

  ```python
  import boto3
  
  s3 = boto3.resource('s3')
  bucket = s3.Bucket('mybucket')
  obj = bucket.Object('mykey')
  
  with open('filename', 'wb') as data:
      obj.download_fileobj(data)
  
  # 暂存内存
  buf = io.BytesIO()
  obj.download_fileobj(buf)
  ```

- object.[**get**](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3/object/get.html#S3.Object.get)()

  从 Amazon S3 检索对象。

  ```python
  import boto3
  
  s3 = boto3.resource('s3')
  obj = s3.Object('mybucket', 'hello.txt').get()
  response = obj.get('Body')
  ```

- object.[**put**](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3/object/put.html#S3.Object.put)()

  将对象添加到存储桶。

  ```python
  import boto3
  
  s3 = boto3.resource('s3')
  with open(local_file, 'rb') as f:
      s3.Object(bucket_name, file_name).put(Body=f)
  ```

#### 第三方兼容

S3 支持路径（Path）请求风格和虚拟托管（Virtual Hosted）请求风格。

- **虚拟托管**：将 Bucket 置于 Host Header 的访问方式。

**第三方兼容风格**：

- [**腾讯云**](https://cloud.tencent.com/document/product/436/37421#python)

  以存储桶所在[地域](https://cloud.tencent.com/document/product/436/6224)是 `ap-guangzhou` 为例。
  
  ```python
  client = boto3.client(
      's3',
      endpoint_url='https://cos.ap-guangzhou.myqcloud.com',
      config=Config(s3={
          "addressing_style": "virtual",
          "signature_version": "s3"
      })
  )
  ```

