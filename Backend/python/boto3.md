# Boto3

您可以使用适用于 Python 的 AWS 开发工具包 Boto3 创建、配置和管理 AWS 服务，例如 Amazon EC2 和 Amazon S3。

## 一、S3

### 1.4. Service Resource

- *class* **S3.ServiceResource**

  表示 S3 的 Resource：
  
  ```python
  import boto3
  
  s3 = boto3.resource('s3')
  ```

  这些是 *resource* 的可用操作：

    - `create_bucket()`
    - `get_available_subresources()`
  
  这些是 *resource* 的可用 *sub-resources*：
  
  - `Object()`

#### 1.4.2. Sub-resources

- `Object`(*bucket_name*, *key*)
  
  创建对象资源：
  
  ```python
  object = s3.Object('bucket_name', 'key')
  ```
  
  参数：
  
  - **bucket_name** (*string*) -- 对象的 *bucket_name* 标识符。这必须设置。
  - **key** (*string*) -- 对象的 *key* 标识符。这必须设置。

### 1.5. Bucket

- *class* **S3.Bucket**(*name*)

  表示 S3 Bucket 的 resource：
  
  ```python
  import boto3
  
  s3 = boto3.resource('s3')
  bucket = s3.Bucket('name')
  ```
  
  参数：
  
  - **name** (*str*) -- Bucket 的名称标识符。这必须设置。
  
  这些是资源的可用子资源：
  
  - `Object()`
  
  这些是资源的可用集合：
  
  - `objects`

#### 1.5.2. Sub-resources

- **Object**(*key*)

  创建对象资源：

  ```python
  object = bucket.Object('key')
  ```
  
  参数：
  
  - **key** (*str*) -- 对象标识符。这必须设置。

#### 1.5.4. Collections

- **objects**

  ObjectSummary 资源的集合。默认情况下，ObjectSummary 集合将包括所有资源，在对所有资源执行操作时应格外小心。
  
  - **filter**(***kwargs*)
  
    创建由传递给方法的 *kwargs* 过滤的集合中所有 ObjectSummary 资源的可迭代对象。
    
    请求语法：
    
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
    
    参数：
    
    - **Prefix** (*string*) -- 将响应限制为以指定前缀开头的键。
    
    以此判断文件是否存在：
    
    ```python
    import boto3
    
    s3 = boto3.resource('s3')
    bucket = s3.Bucket(bucket_name)
    for obj in bucket.objects.filter(Prefix=file_name):
        if obj.key == file_name:
            return True
    return False
    ```

### 1.19. Object

- *class* **S3.Object**(*bucket_name*, *key*)

  表示 S3 对象的 Resource：
  
  ```python
  import boto3
  
  s3 = boto3.resource('s3')
  object = s3.Object('bucket_name', 'key')
  ```
  
  参数：
  
  - **bucket_name** (*string*) -- 对象的 *bucket_name* 标识符。这必须设置。
  - **key** (*string*) -- 对象的 *key* 标识符。这必须设置。
  
  这些是资源的可用操作：
  
  - `download_file()`
  - `download_fileobj()`
  - `get()`
  - `put()`
  - `upload_file()`
  - `upload_fileobj()`

#### 1.19.1. Actions

- **download_file**(*Filename*, *ExtraArgs=None*, *Callback=None*, *Config=None*)

  将 S3 对象下载到文件。

  ```python
  import boto3
  
  s3 = boto3.resource('s3')
  s3.Object('mybucket', 'hello.txt').download_file('/tmp/hello.txt')
  ```

  参数：

  - **Filename** (*str*) -- 下载到的文件的保存路径。

- **download_fileobj**(*Fileobj*, *ExtraArgs=None*, *Callback=None*, *Config=None*)

  将此对象从 S3 下载到类似文件的对象。

  类文件对象必须处于二进制模式。

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

  参数：

  - **Fileobj** (*a file-like object*) -- 要下载到的类似文件的对象。至少，它必须实现 `write` 方法并且必须接受字节。

- **get**(***kwargs*)

  从 Amazon S3 检索对象。要使用 GET，您必须对 Object 具有 READ 访问权限。

  ```python
  import boto3
  
  s3 = boto3.resource('s3')
  stream = s3.Object('mybucket', 'hello.txt').get().get('Body')
  ```

  响应结构：

  - (dict)

    - **Body** (*StreamingBody*) -- Object 数据。

- **put**(***kwargs*)

  将对象添加到存储桶。您必须对存储桶具有 WRITE 权限才能向其中添加对象。

  ```python
  import boto3
  
  s3 = boto3.resource('s3')
  with open(local_file, 'rb') as f:
      s3.Object(bucket_name, file_name).put(Body=f)
  ```

  参数：

  - **Body** (*bytes or seekable file-like object*) -- 对象数据。

- **upload_file**(*Filename*, *ExtraArgs=None*, *Callback=None*, *Config=None*)

  将文件上传到 S3 对象。

  ```python
  import boto3
  
  s3 = boto3.resource('s3')
  s3.Object('mybucket', 'hello.txt').upload_file('/tmp/hello.txt')
  ```

  参数：

  - **Filename** (*str*) -- 要上传的文件的路径。

- **upload_fileobj**(*Fileobj*, *ExtraArgs=None*, *Callback=None*, *Config=None*)

  将类似文件的对象上传到此对象。

  类文件对象必须处于二进制模式。

  ```python
  import boto3
  
  s3 = boto3.resource('s3')
  bucket = s3.Bucket('mybucket')
  obj = bucket.Object('mykey')
  
  with open('filename', 'rb') as data:
      obj.upload_fileobj(data)
  ```

  参数：

  - **Fileobj** (*a file-like object*) -- 要上传的类文件对象。至少，它必须实现 `read` 方法，并且必须返回字节。

## 二、Session

- *class* **boto3.session.Session**(*aws_access_key_id=None*, *aws_secret_access_key=None*, *aws_session_token=None*, *region_name=None*, *botocore_session=None*, *profile_name=None*)

  *session* 存储配置状态并允许您创建 *clients* 和 *resources*。
  
  ```python
  import boto3
  
  session = boto3.Session(
      aws_access_key_id=settings.AWS_SERVER_PUBLIC_KEY,
      aws_secret_access_key=settings.AWS_SERVER_SECRET_KEY
  )
  ```
  
  参数：
  
  - **aws_access_key_id** (*string*) -- AWS 访问密钥 ID
  - **aws_secret_access_key** (*string*) -- AWS 访问密钥
  
- **resource**(*service_name*, *region_name=None*, *api_version=None*, *use_ssl=True*, *verify=None*, *endpoint_url=None*, *aws_access_key_id=None*, *aws_secret_access_key=None*, *aws_session_token=None*, *config=None*)

  按名称创建 *resource* 客户端。
  
  ```python
  s3 = session.resource('s3')
  ```

  参数：
  
  - **service_name** (*string*) -- 服务的名称，例如 's3' 或 'ec2'。
  - **endpoint_url** (*string*) -- 用于构造客户端的完整 URL。通常，botocore 会自动构建适当的 URL 以在与服务通信时使用。您可以指定一个完整的 URL 来覆盖此行为。
  - **aws_access_key_id** (*string*) -- AWS 访问密钥 ID。
  - **aws_secret_access_key** (*string*) -- AWS 访问密钥。
  - **config** (*botocore.client.Config*) -- 高级客户端配置选项。

## 三、兼容性

S3 支持路径（Path）请求风格和虚拟托管（Virtual Hosted）请求风格。虚拟托管请求风格是指将 Bucket 置于 Host Header 的访问方式。

### 3.1. 腾讯云

以存储桶所在地域是 `ap-guangzhou` 为例：

```python
client = boto3.client('s3',
                      endpoint_url='https://cos.ap-guangzhou.myqcloud.com',
                      config=Config(s3={"addressing_style": "virtual", "signature_version": 's3'})
                     )
```

`endpoint_url` 可选值可参考[地域和访问域名](https://cloud.tencent.com/document/product/436/6224)。

