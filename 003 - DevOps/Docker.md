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

