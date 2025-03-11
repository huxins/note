# debianutils

[`debianutils`](https://packages.debian.org/sid/debianutils) 是一个工具包，包含了一些由 Debian 项目开发并广泛用于 Debian 系统的实用工具，这些工具主要是为系统管理和脚本编写提供方便。

## 一、savelog

[`savelog`](https://manpages.ubuntu.com/manpages/noble/en/man8/savelog.8.html) 命令用于管理日志文件。它主要用于轮替日志文件，并通过重命名或压缩的方式对旧的日志文件进行归档。

- -**c** *cycle*：日志文件的保存周期版本。
- -**n**：不要旋转空文件。
- -**t**：生成新的日志文件。

将日志文件 `mylog` 进行轮替并压缩归档。

```sh
savelog -t mylog
```

指定保留 `5` 个旧日志文件。

```sh
savelog -t -c 5 mylog
```

静默模式下对日志进行归档。

```sh
savelog -q -n -t mylog
```

