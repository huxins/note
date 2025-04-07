# pip

[`pip`](https://pip.pypa.io/en/stable/) 是 Python 的包安装程序。

## 一、配置管理

`pip` 允许用户通过[三种机制](https://pip.pypa.io/en/stable/topics/configuration/)改变其行为：

- 命令行选项
- 环境变量
- 配置文件

### 配置文件

[配置文件](https://pip.pypa.io/en/stable/topics/configuration/#configuration-files)可以更改命令行选项的默认值，使用标准 `INI` 样式编写。

`pip` 有三个级别的配置文件：

- **global**：系统范围的配置文件，在用户之间共享。
- **user**：每个用户的配置文件。
- **site**：每个环境的配置文件；即虚拟环境。

**作用域**：

每个子命令都可以在其自己的部分中进行配置。这会覆盖具有相同名称的全局设置。

例如，如果您想在运行 `pip freeze` 时将超时时间减少到 10 秒，并为所有其他命令使用 60 秒。

```ini
[global]
timeout = 60

[freeze]
timeout = 10
```

### 配置项名称

设置的名称源自长命令行选项。

例如，如果想使用不同的[包索引](https://pip.pypa.io/en/stable/cli/pip_install/#cmdoption-i)并将 HTTP [超时](https://pip.pypa.io/en/stable/cli/pip/#cmdoption-timeout)设置为 60 秒。

```ini
[global]
timeout = 60
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
```

## 二、常用命令

### pip install

[`pip install`](https://pip.pypa.io/en/stable/cli/pip_install/) 是 Python 包管理工具 [`pip`](https://pip.pypa.io/en/stable/cli/pip/) 用来安装 Python 包的命令。

- -**i**, --**index-url** *url*：Python 包索引的 Base URL，默认值为 https://pypi.org/simple。
- -**e**, --**editable** *path/url*：从本地项目路径或 VCS url 以可编辑模式（即 [setuptools 开发模式](https://setuptools.pypa.io/en/latest/userguide/development_mode.html)）安装项目。

升级 `pip` 自身版本。

```sh
python -m pip install --upgrade pip
```

使用[需求说明符](https://pip.pypa.io/en/stable/reference/requirement-specifiers/)从 [PyPI](https://pypi.org/) 安装 `SomePackage` 及其依赖项。

```sh
python -m pip install SomePackage            # 最新版本
python -m pip install SomePackage==1.0.4     # 具体版本
python -m pip install 'SomePackage>=1.0.4'   # 最低版本
```

从不同的索引安装，而不是 PyPI。

```sh
python -m pip install --index-url https://pypi.doubanio.com/simple SomePackage
```

从包含档案的本地目录安装，并且不扫描索引。

```sh
python -m pip install --no-index --find-links=file:///local/dir/ SomePackage
python -m pip install --no-index --find-links=/local/dir/ SomePackage
python -m pip install --no-index --find-links=relative/dir/ SomePackage
```

根据 [*requirements.txt*](https://pip.pypa.io/en/stable/reference/requirements-file-format/) 文件安装项目依赖。

```sh
python -m pip install -r requirements.txt
```

以 [setuptools 开发模式](https://setuptools.pypa.io/en/latest/userguide/development_mode.html)安装项目。

```sh
pip install -e .
```

### pip config

[`pip config`](https://pip.pypa.io/en/stable/cli/pip_config/) 命令用于配置 `pip` 的行为。

通过 `pip config`，可以查看和设置 `pip` 的配置选项，这些配置选项会影响 `pip` 的默认行为。

配置指定包索引的 Base URL。

- 豆瓣：https://pypi.doubanio.com/simple
- 清华：https://pypi.tuna.tsinghua.edu.cn/simple

```sh
python -m pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

获取在配置文件中包索引的 Base URL。

```sh
python -m pip config get global.index-url
```

### pip freeze

[`pip freeze`](https://pip.pypa.io/en/stable/cli/pip_freeze/) 用于生成当前 Python 环境中已安装的所有包及其版本的列表。

生成一个 [*requirements*](https://pip.pypa.io/en/stable/reference/requirements-file-format/) 文件。

```sh
python -m pip freeze > requirements.txt
```

在 Windows 平台以指定文件编码生成。

```sh
pip freeze | Out-File -Encoding ascii requirements.txt
```

