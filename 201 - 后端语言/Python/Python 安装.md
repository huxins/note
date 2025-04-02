# Python 安装

安装 [Python](https://docs.python.org/zh-cn/3/using/index.html) 环境是开发和运行 Python 程序的基础，不同平台的安装方式可能略有不同。

## CentOS 7

- **编译安装**

  ```sh
  # 安装编译 Python 所需的依赖
  yum groupinstall "Development Tools"
  yum install openssl-devel bzip2-devel libffi-devel
  
  # 下载 Python 源代码
  wget https://www.python.org/ftp/python/3.9.18/Python-3.9.18.tgz
  
  # 解压源代码并进入目录
  tar -zxvf Python-3.9.18.tgz
  cd Python-3.9.18
  
  # 配置并编译 Python
  ./configure
  make -j$(nproc)
  
  # 安装 Python
  make altinstall
  ```

