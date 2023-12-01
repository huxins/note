# Pyenv

Pyenv 可以轻松地在多个 Python 版本之间切换。

## 一、安装 Pyenv

安装 Pyenv，详见 [pyenv installer](https://github.com/pyenv/pyenv-installer)。

```sh
$ curl https://pyenv.run | bash
```

为 Pyenv 设置 Shell 环境，将命令添加到 `~/.bashrc`。

```sh
$ echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
$ echo 'command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
$ echo 'eval "$(pyenv init -)"' >> ~/.bashrc
```

安装 Python 构建依赖项。

```sh
# CentOS 7
$ yum install gcc make patch zlib-devel bzip2 bzip2-devel readline-devel sqlite sqlite-devel openssl-devel tk-devel libffi-devel xz-devel
```

## 二、安装 Python

安装其他 Python 版本。

```sh
$ pyenv install 3.9.18
```

列出所有可用版本的列表。

```sh
$ pyenv install -l
```

## 三、切换 Python

查询所选版本。

```sh
$ pyenv versions
```

仅为当前 Shell 会话选择。

```sh
$ pyenv shell 3.9.18
```

在当前目录及其子目录中自动选择。

```sh
$ pyenv local 3.9.18
```

为用户帐户全局选择。

```sh
$ pyenv global 3.9.18
```

