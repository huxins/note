# Docker

## 一、安装

### Debian

使用脚本快速安装。

```sh
curl -fsSL https://get.docker.com | bash -s -- --mirror Aliyun
```

默认情况下，`docker` 命令会使用 Unix socket 与 Docker 引擎通讯。而只有 `root` 用户和 `docker` 组的用户才可以访问 Docker 引擎的 Unix socket。

出于安全考虑，一般 Linux 系统上不会直接使用 `root` 用户。因此，更好地做法是将需要使用 `docker` 的用户加入 `docker` 用户组。

正常情况下，快速脚本已经建立了 `docker` 组，如果未建立，可以手动创建 `docker` 组。

```sh
groupadd docker
```

将当前用户或指定用户加入 `docker` 组。

```sh
usermod -aG docker $USER
```

## 二、镜像

### 获取镜像

从 Docker 镜像仓库获取镜像的命令是 `docker pull`。

```sh
docker pull alpine:3.13
```

### 列出镜像

要想列出已经下载下来的镜像，可以使用 `docker image ls` 命令。

```sh
docker image ls
```

## 三、容器

### 启动

[启动容器](https://docs.docker.com/reference/cli/docker/container/run/)有两种方式，一种是基于镜像新建一个容器并启动，另外一个是将在终止状态的容器重新启动。

- [--**restart** *policy*](https://docs.docker.com/reference/cli/docker/container/run/#restart)：使用 `--restart` 标志可以指定容器的重新启动策略。支持以下重启策略：`always`。
- -**i**：保持容器的 STDIN 打开，并允许您通过标准输入向容器发送输入。
- -**t**：将一个伪 tty 附加到容器。
- --**entrypoint** *cmd*：覆盖 *image* 的默认 *ENTRYPOINT*。

新建并启动一个容器，输出一个 *Hello World*。

```sh
docker run alpine:3.13 /bin/echo 'Hello world'
```

启动一个 `sh` 终端，允许用户进行交互。

```sh
docker run -t -i alpine:3.13 /bin/sh
```

已启动的容器，可以使用 `docker update` 命令动态更新容器配置。

```sh
docker update --restart=always abebf7571666
```

如果 Docker 镜像 `run` 失败了，可以在启动容器时设置 `--entrypoint`。

```sh
docker run --rm -it --entrypoint=/bin/sh image-name
```

遇到问题需要排查时，可以通过 `docker inspect` 来获取容器的日志地址。

```sh
docker inspect --format '{{.LogPath}}' 97069f94437b
```

还可以使用 `docker logs`。

```sh
docker logs 97069f94437b
```

### 进入容器

在使用 `-d` 参数时，容器启动后会进入后台。

某些时候需要进入容器进行操作，可以使用 `docker attach` 命令或 `docker exec` 命令。

- docker **attach**

  使用 `docker attach` 可以使用容器的 ID 或名称将终端的标准输入、输出和错误附加到正在运行的容器。这使您能够以交互方式查看其输出或控制它，就好像命令直接在终端中运行一样。

  ```sh
  docker run -dit ubuntu
  docker attach 243c
  ```

  如果从这个 stdin 中 exit，会导致容器的停止。

- docker **exec**

  `docker exec` 后边可以跟多个参数，当 `-i` 和 `-t` 参数一起使用时，则可以看到我们熟悉的 Linux 命令提示符。

  ```sh
  docker run -dit ubuntu
  docker exec -it 69d1 bash
  ```

  如果从这个 stdin 中 exit，不会导致容器的停止。

### 导入导出

如果要导出本地某个容器，可以使用 `docker export` 命令。

```sh
docker export 7691a814370e > ubuntu.tar
```

可以使用 `docker import` 从容器快照文件中再导入为镜像。

```sh
cat ubuntu.tar | docker import - test/ubuntu:v1.0
```

也可以通过指定 URL 或者某个目录来导入。

```sh
docker import http://example.com/exampleimage.tgz example/imagerepo
```

