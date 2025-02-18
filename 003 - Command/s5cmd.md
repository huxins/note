# s5cmd

[`s5cmd`](https://github.com/peak/s5cmd) 是一个非常快速的 S3 和本地文件系统执行工具。

## 一、安装

### 二进制

```sh
wget -O s5cmd.tar.gz https://github.com/peak/s5cmd/releases/download/v2.2.2/s5cmd_2.2.2_Linux-64bit.tar.gz
tar zxvf s5cmd.tar.gz
cp s5cmd /usr/local/bin/s5cmd
```

## 二、配置

`s5cmd` 使用 AWS 官方 SDK 访问 S3，SDK 需要凭据来签署向 AWS 发出的请求。

提供[凭据](https://docs.aws.amazon.com/zh_cn/cli/latest/userguide/cli-chap-configure.html)的方式有多种：

- **凭证文件**

  像 AWS CLI 一样，设置[凭证文件](https://docs.aws.amazon.com/zh_cn/cli/latest/userguide/cli-configure-files.html)。

  新建 `~/.aws/credentials` 文件。

  ```ini
  [default]
  aws_access_key_id=AKIAIOSFODNN7EXAMPLE
  aws_secret_access_key=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
  ```

  新建 `~/.aws/config` 文件。

  ```ini
  [default]
  region=us-west-2
  output=json
  ```

  配置完成后，发送 `ListObjects` 请求进行测试。

  ```sh
  s5cmd --endpoint-url http://s3.us-north-1.qiniucs.com ls s3://my-company-bucket/
  ```

- **环境变量**

  ```sh
  export AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
  export AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
  export AWS_DEFAULT_REGION=us-west-2
  export S3_ENDPOINT_URL="https://s3.us-north-1.qiniucs.com"
  s5cmd ls s3://my-company-bucket/
  ```

## 三、使用

### 上传文件

上传单个文件。

```sh
s5cmd cp object.gz s3://bucket/
```

