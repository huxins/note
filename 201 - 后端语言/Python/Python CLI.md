# Python CLI

CPython 解析器在启动时会扫描[命令行](https://docs.python.org/zh-cn/3/using/cmdline.html)参数和环境变量，以获取各种设置信息，这样可以根据用户提供的参数和环境配置调整其行为。

## 一、接口选项

- -[**c**](https://docs.python.org/zh-cn/3/using/cmdline.html#cmdoption-c) *command*

  执行 `command` 中的 Python 代码。`command` 可以是一条语句，也可以是用换行符分隔的多条语句。

  使用此选项时，[`sys.argv`](https://docs.python.org/zh-cn/3/library/sys.html#sys.argv) 的首个元素为 `-c`，并会把当前目录加入至 [`sys.path`](https://docs.python.org/zh-cn/3/library/sys.html#sys.path) 开头。

  ```sh
  python -c "import sys; print(sys.argv)"
  python -c "import sys; print(sys.path)"
  ```

- -[**m**](https://docs.python.org/zh-cn/3/using/cmdline.html#cmdoption-m) *module-name*

  在 [`sys.path`](https://docs.python.org/zh-cn/3/library/sys.html#sys.path) 中搜索指定模块，并以 [`__main__`](https://docs.python.org/zh-cn/3/library/__main__.html#module-__main__) 模块执行其内容。

  ```sh
  python -m pip --version
  ```

