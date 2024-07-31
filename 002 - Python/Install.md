# Python 安装

[安装 Python](https://docs.python.org/zh-cn/3/using/index.html) 环境是开发和运行 Python 程序的基础，不同平台的安装方式可能略有不同，本文将详细介绍如何在常见操作系统上安装和配置 Python 环境。

## CentOS 7

### 编译安装

安装编译 Python 所需的依赖。

```sh
yum groupinstall "Development Tools"
yum install openssl-devel bzip2-devel libffi-devel
```

下载 Python 源代码。

```sh
wget https://www.python.org/ftp/python/3.9.18/Python-3.9.18.tgz
```

解压源代码并进入目录。

```sh
tar -zxvf Python-3.9.18.tgz
cd Python-3.9.18
```

配置并编译 Python。

```sh
./configure
make -j$(nproc)
```

安装 Python。

```sh
make altinstall
```

