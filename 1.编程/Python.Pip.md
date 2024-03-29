# Pip

## 一、安装

### 1.1. 升级

```sh
$ python -m pip install --upgrade pip
```

### 1.2. Requirements 文件

```sh
$ python -m pip install -r requirements.txt
```

## 二、配置

`pip` 允许用户通过 3 种机制改变其行为：

- 命令行选项
- 环境变量
- 配置文件

### 2.1. 配置文件

配置文件可以更改命令行选项的默认值。它们是使用标准 `INI` 样式的配置文件编写的。

`pip` 有 3 个级别的配置文件：

- `global`：系统范围的配置文件，在用户之间共享。
- `user`：每个用户的配置文件。
- `site`：每个环境的配置文件；即虚拟环境。

#### 2.1.1. 位置

`pip` 的配置文件位于相当标准的位置。这个位置在不同的操作系统上是不同的，并且由于向后兼容的原因有一些额外的复杂性。

- Windows
  - Global
    - 在 Windows 7 及更高版本上：`C:\ProgramData\pip\pip.ini`
  - User
    - `%APPDATA%\pip\pip.ini`
    - 旧的用户配置文件也会被加载，如果它存在的话：`%HOMEPATH%\pip\pip.ini`
  - Site
    - `%VIRTUAL_ENV%\pip.ini`

#### 2.1.2. 装载顺序

当找到多个配置文件时，`pip` 按以下顺序组合它们：

- `PIP_CONFIG_FILE` 环境变量
- Global
- User
- Site

每个文件读取都会覆盖从先前文件读取的任何值，因此如果在全局文件和每个用户文件中都指定了 `global timeout`，则将使用后一个值。

#### 2.1.3. 命名

设置的名称源自长命令行选项。

例如，如果您想使用不同的包索引（`--index-url`）并将 HTTP 超时（`--default-timeout`）设置为 60 秒，您的配置文件将如下所示：

```ini
[global]
timeout = 60
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
```

#### 2.1.4. 每个命令部分

每个子命令都可以在其自己的部分中进行配置。这会覆盖具有相同名称的全局设置。

例如，如果您想在运行 `pip freeze` 时将超时时间减少到 10 秒，并为所有其他命令使用 60 秒：

```ini
[global]
timeout = 60

[freeze]
timeout = 10
```

## 三、命令

### 3.1. pip install

- 用法

  ```
  python -m pip install [options] <requirement specifier> [package-index-options] ...
  ```

- 选项

  - **-i**, **--index-url** *\<url>*

    Python 包索引的 Base URL（默认值 https://pypi.org/simple）。

- 例子

  - 使用需求说明符从 PyPI 安装 `SomePackage` 及其依赖项

    ```sh
    $ python -m pip install SomePackage            # 最新版本
    $ python -m pip install SomePackage==1.0.4     # 具体版本
    $ python -m pip install 'SomePackage>=1.0.4'   # 最低版本
    ```

  - 从替代软件包存储库安装

    从不同的索引安装，而不是 PyPI

    ```sh
    $ python -m pip install --index-url https://pypi.doubanio.com/simple SomePackage
    ```

    从包含档案的本地平面目录安装（并且不扫描索引）

    ```sh
    $ python -m pip install --no-index --find-links=file:///local/dir/ SomePackage
    $ python -m pip install --no-index --find-links=/local/dir/ SomePackage
    $ python -m pip install --no-index --find-links=relative/dir/ SomePackage
    ```

### 3.2. pip config

- 用法

  ```
  python -m pip config [<file-option>] list
  
  python -m pip config [<file-option>] get command.option
  python -m pip config [<file-option>] set command.option value
  python -m pip config [<file-option>] unset command.option
  ```

- 例子

  - 在配置文件中指定包索引的 Base URL

    - 豆瓣：`https://pypi.doubanio.com/simple/`
    - 清华：`https://pypi.tuna.tsinghua.edu.cn/simple/`

    ```sh
    $ python -m pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
    ```

  - 获取在配置文件中包索引的 Base URL

    ```sh
    $ python -m pip config get global.index-url
    ```

### 3.3. pip freeze

- 用法

  ```
  python -m pip freeze [options]
  ```

- 例子

  - 生成一个 `requirements` 文件

    ```sh
    $ python -m pip freeze > requirements.txt
    ```

  - 在 Windows 平台以指定文件编码生成

    ```sh
    $ pip freeze | Out-File -Encoding ascii requirements.txt
    ```

