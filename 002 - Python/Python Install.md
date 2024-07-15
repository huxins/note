# Python 安装和使用

## 一、安装

### Linux

#### CentOS 7

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

## 二、命令行

### 接口选项

- -**c** *command*

  执行 *command* 中的 Python 代码。*command* 可以是一条语句，也可以是用换行符分隔的多条语句。

  使用此选项时，`sys.argv` 的首个元素为 `-c`，并会把当前目录加入至 `sys.path` 开头。

  ```sh
  python -c "import sys; print(sys.argv)"
  python -c "import sys; print(sys.path)"
  ```

- -**m** *module-name*

  在 `sys.path` 中搜索指定模块，并以 `__main__` 模块执行其内容。

  ```sh
  python -m pip --version
  ```

