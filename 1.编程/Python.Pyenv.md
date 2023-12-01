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

添加到 `~/.profile`。

```sh
$ echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.profile
$ echo 'command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.profile
$ echo 'eval "$(pyenv init -)"' >> ~/.profile
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

仅为当前 Shell 会话选择。

```sh
$ pyenv shell 3.9.18
```

查询所选版本。

```sh
$ pyenv versions
```

