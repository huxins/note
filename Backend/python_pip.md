# pip

## 安装

### 升级 `pip`

```sh
$ python -m pip install --upgrade pip
```

## 主题指南

### 配置

#### 配置文件

##### 位置

`pip` 的配置文件位于相当标准的位置。这个位置在不同的操作系统上是不同的。

- **User**

`%APPDATA%\pip\pip.ini`

旧的 "per-user" 配置文件也会被加载，如果它存在的话：`%HOMEPATH%\pip\pip.ini`

##### 命名

设置的名称源自命令行选项。

例如，如果您想使用不同的包索引 (`--index-url`) 并将 HTTP 超时 (`--default-timeout`) 设置为 60 秒，您的配置文件将如下所示：

```ini
[global]
timeout = 60
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
```

##### 每个命令部分

每个子命令都可以在其自己的部分中进行配置。这会覆盖具有相同名称的全局设置。

例如，如果您想在运行 `pip freeze` 时将超时时间减少到 10 秒，并为所有其他命令使用 60 秒：

```ini
[global]
timeout = 60

[freeze]
timeout = 10
```

## Commands

### pip install

#### Options

- **-i**, **--index-url** *`<url>`*

Python 包索引的 Base URL（默认 https://pypi.org/simple）

### pip config

```sh
$ pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

## 参见

- [pip documentation](https://pip.pypa.io/en/stable/)

