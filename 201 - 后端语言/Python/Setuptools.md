# Setuptools

[Setuptools](https://github.com/pypa/setuptools) 是一个用于 Python 项目的打包工具，它扩展了 Python 标准库中的 [distutils](https://docs.python.org/zh-cn/3.11/library/distutils.html)。

**主要功能**：

- **依赖管理**：允许定义项目的依赖项，并在安装时自动解决这些依赖关系。
- **打包和分发**：提供工具来打包项目，使其可以上传到 [PyPI](https://pypi.org/) 或其他存储库。
- **入口点**：支持定义控制台脚本和 GUI 脚本的入口点，使得在安装包时可以自动创建可执行命令。
- **扩展支持**：支持编译 C 或 C++ 扩展模块，并将其包含在包中。

**安装**：

```sh
pip install setuptools
```

## 一、包信息

一些包信息，如元数据、内容、依赖关系等，可以在 `pyproject.toml`、`setup.cfg` 或 `setup.py` 文件中配置。

- **pyproject.toml**

  `pyproject.toml` 是 [PEP 518](https://peps.python.org/pep-0518/) 和 [PEP 621](https://peps.python.org/pep-0621/) 引入的一种新的标准化格式，用于定义 Python 项目的构建系统要求，以及声明性地描述项目元数据。

  它最初是为了支持 [PEP 517](https://peps.python.org/pep-0517/) 中定义的构建接口而引入的，但现在也逐渐用于替代部分 `setup.py` 和 `setup.cfg` 的功能。
  
- **setup.py**

  `setup.py` 是最早使用的配置文件，用于定义 Python 项目的元数据和依赖。

  它是一个 Python 脚本，可以运行任意的、可能不受信任的 Python 代码。
  
- **setup.cfg**

  `setup.cfg` 主要用于静态配置，旨在将项目的配置与元数据从代码中分离出来。
  
  它使用 INI 格式来定义项目的配置信息，不包含任何代码逻辑。

下面是一个简单的 `setup.py` 示例。

```python
from setuptools import setup, find_packages

setup(
    name="my_package",
    version="0.1",
    packages=find_packages(),
    install_requires=[
        "requests",
    ],
    entry_points={
        'console_scripts': [
            'my_command=my_package.module:function',
        ],
    },
)
```

