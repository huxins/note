# Boto3

Boto3 是一个 Python SDK，用于访问 AWS 的服务。它使开发人员能够轻松创建、配置和管理 AWS 资源，如 Amazon S3，Amazon EC2 等等。使用 boto3，开发人员可以通过 Python 代码与 AWS 进行交互，而无需手动编写 HTTP 请求。

## 一、S3

### Resource

- *class* S3.**ServiceResource**

  表示 S3 的资源：

  ```python
  import boto3
  
  s3 = boto3.resource('s3')
  ```

- S3.*ServiceResource*.**Bucket**(*name*)

  创建一个 Bucket 资源：

  ```python
  bucket = s3.Bucket('name')
  ```

  - **name** (*string*)

    Bucket 的 `name` 标识符。这必须设置。

- S3.*ServiceResource*.**Object**(*bucket_name*, *key*)

  创建对象资源：

  ```python
  object = s3.Object('bucket_name','key')
  ```

  - **bucket_name** (*string*)

    对象的 `bucket_name` 标识符。这必须设置。

  - **key** (*string*)

    对象的 `key` 标识符。这必须设置。

### Bucket

- *class* S3.**Bucket**(*name*)

  表示 S3 Bucket 的资源：

  ```python
  import boto3
  
  s3 = boto3.resource('s3')
  bucket = s3.Bucket('name')
  ```

  - **name** (*string*)

    Bucket 的名称标识符。这必须设置。

- S3.*Bucket*.**upload_fileobj**(*Fileobj*, *Key*, *ExtraArgs*=*None*, *Callback*=*None*, *Config*=*None*)

  将类似文件的对象上传到此存储桶。

  类文件对象必须处于二进制模式。

  ```python
  import boto3
  
  s3 = boto3.resource('s3')
  bucket = s3.Bucket('mybucket')
  
  with open('filename', 'rb') as data:
      bucket.upload_fileobj(data, 'mykey')
  ```

- S3.*Bucket*.**download_fileobj**(*Key*, *Fileobj*, *ExtraArgs*=*None*, *Callback*=*None*, *Config*=*None*)

  从此存储桶下载对象到类似文件的对象。

  类文件对象必须处于二进制模式。

  ```python
  import boto3
  
  s3 = boto3.resource('s3')
  bucket = s3.Bucket('mybucket')
  
  with open('filename', 'wb') as data:
      bucket.download_fileobj('mykey', data)
  ```

- S3.*Bucket*.**Object**(*key*)

  创建对象资源：

  ```python
  object = bucket.Object('key')
  ```

  - **key** (*string*)

    对象的 `key` 标识符。这必须设置。

- S3.*Bucket*.**objects**

  `ObjectSummary` 资源的集合。一个 `ObjectSummary` Collection 默认会包含所有的资源，在对所有资源执行操作时要格外小心。

  - **all**()

    创建集合中所有 `ObjectSummary` 资源的可迭代对象。

    ```python
    object_summary_iterator = bucket.objects.all()
    ```

  - **filter**(***kwargs*)

    创建由传递给方法的 `kwargs` 过滤的集合中所有 `ObjectSummary` 资源的可迭代对象。如果没有提供过滤器，`ObjectSummary` 集合将默认包含所有资源，并且在对所有资源执行操作时应格外小心。

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

    - **Prefix** (*string*)

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

### Object

- *class* S3.**Object**(*bucket_name*, *key*)

  表示 S3 对象的资源：

  ```python
  import boto3
  
  s3 = boto3.resource('s3')
  object = s3.Object('bucket_name','key')
  ```

  - **bucket_name** (*string*)

    对象的 `bucket_name` 标识符。这必须设置。

  - **key** (*string*)

    对象的 `key` 标识符。这必须设置。

- S3.*Object*.**download_file**(*Filename*, *ExtraArgs*=*None*, *Callback*=*None*, *Config*=*None*)

  将 S3 对象下载到文件。

  ```python
  import boto3
  
  s3 = boto3.resource('s3')
  s3.Object('mybucket', 'hello.txt').download_file('/tmp/hello.txt')
  ```

  - **Filename** (*str*)

    要下载的文件的保存路径。

- S3.*Object*.**download_fileobj**(*Fileobj*, *ExtraArgs*=*None*, *Callback*=*None*, *Config*=*None*)

  将此对象从 S3 下载到类似文件的对象。

  类文件对象必须处于二进制模式。

  这是一个托管传输，如有必要，它将在多个线程中执行多部分下载。

  ```python
  import boto3
  
  s3 = boto3.resource('s3')
  bucket = s3.Bucket('mybucket')
  obj = bucket.Object('mykey')
  
  with open('filename', 'wb') as data:
      obj.download_fileobj(data)
  ```

  也可暂存内存。

  ```python
  import boto3
  
  s3 = boto3.resource('s3')
  buf = io.BytesIO()
  s3.Object(bucket_name, file_name).download_fileobj(buf)
  ```

  - **Fileobj** (*a file-like object*)

    要下载到的类似文件的对象。至少，它必须实现 `write` 方法并且必须接受字节。

- S3.*Object*.**get**(***kwargs*)

  从 Amazon S3 检索对象。

  ```python
  import boto3
  
  s3 = boto3.resource('s3')
  obj = s3.Object('mybucket', 'hello.txt').get()
  stream = obj.get('Body')
  ```

  - 响应结构

    - **Body** (*StreamingBody*)

      对象数据。

- S3.*Object*.**put**(***kwargs*)

  将对象添加到存储桶。

  ```python
  import boto3
  
  s3 = boto3.resource('s3')
  with open(local_file, 'rb') as f:
      s3.Object(bucket_name, file_name).put(Body=f)
  ```

  - 请求结构

    - **Body** (*bytes* or *seekable file-like object*)

      对象数据。

- S3.*Object*.**upload_file**(*Filename*, *ExtraArgs*=*None*, *Callback*=*None*, *Config*=*None*)

  将文件上传到 S3 对象。

  ```python
  import boto3
  
  s3 = boto3.resource('s3')
  s3.Object('mybucket', 'hello.txt').upload_file('/tmp/hello.txt')
  ```

  - **Filename** (*str*)

    要上传的文件的路径。

- S3.*Object*.**upload_fileobj**(*Fileobj*, *ExtraArgs*=*None*, *Callback*=*None*, *Config*=*None*)

  将类似文件的对象上传到此对象。

  类文件对象必须处于二进制模式。

  这是一个托管传输，必要时将在多个线程中执行分段上传。

  ```python
  import boto3
  
  s3 = boto3.resource('s3')
  bucket = s3.Bucket('mybucket')
  obj = bucket.Object('mykey')
  
  with open('filename', 'rb') as data:
      obj.upload_fileobj(data)
  ```

  - **Fileobj** (*a file-like object*)

    要上传的类文件对象。至少，它必须实现 `read` 方法，并且必须返回字节。

## 二、Session

会话通常存储以下内容：

- Credentials
- AWS Region

### 默认会话

Boto3 充当默认会话的代理。这是在创建低级客户端或资源客户端时自动创建的：

```python
import boto3

sqs = boto3.client('sqs')
s3 = boto3.resource('s3')
```

### 自定义会话

还可以管理自己的会话并从中创建低级客户端或资源客户端：

```python
import boto3
import boto3.session

my_session = boto3.session.Session()

sqs = my_session.client('sqs')
s3 = my_session.resource('s3')
```

### 会话配置

可以使用特定凭证、AWS 区域信息或配置文件配置每个会话。

- *class* boto3.session.**Session**(*aws_access_key_id*=*None*, *aws_secret_access_key*=*None*, *aws_session_token*=*None*, *region_name*=*None*, *botocore_session*=*None*, *profile_name*=*None*)

  会话存储配置状态并允许创建 Service `client` 和 `resource`。

  ```python
  import boto3
  import boto3.session
  
  session = boto3.session.Session(
      aws_access_key_id=settings.AWS_SERVER_PUBLIC_KEY,
      aws_secret_access_key=settings.AWS_SERVER_SECRET_KEY
  )
  ```

  - **aws_access_key_id** (*string*)

    AWS 访问密钥 ID。

  - **aws_secret_access_key** (*string*)

    AWS 访问密钥。

  - **region_name** (*string*)

    创建新连接时的默认区域。

  - **profile_name** (*string*)

    要使用的配置文件的名称。如果未给出，则使用默认配置文件。

- **resource**(*service_name*, *region_name*=*None*, *api_version*=*None*, *use_ssl*=*True*, *verify*=*None*, *endpoint_url*=*None*, *aws_access_key_id*=*None*, *aws_secret_access_key*=*None*, *aws_session_token*=*None*, *config*=*None*)

  按名称创建 `resource` Service 客户端。

  ```python
  s3 = session.resource('s3')
  ```

  - **service_name** (*string*)

    服务的名称。

  - **endpoint_url** (*string*)

    用于构造客户端的完整 URL。

  - **aws_access_key_id** (*string*)

    创建客户端时使用的访问密钥。

  - **aws_secret_access_key** (*string*)

    创建客户端时使用的密钥。

  - **config** (*botocore.client.Config*)

    高级客户端配置选项。

## 三、兼容性

S3 支持路径（Path）请求风格和虚拟托管（Virtual Hosted）请求风格。虚拟托管请求风格是指将 Bucket 置于 Host Header 的访问方式。

### 腾讯云

以存储桶所在地域是 `ap-guangzhou` 为例：

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

`endpoint_url` 可选值可参考[地域和访问域名](https://cloud.tencent.com/document/product/436/6224)。

