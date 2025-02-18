# restic

[`restic`](https://github.com/restic/restic) 是一个快速、高效、安全的备份程序。

## 一、安装

### Debian

```sh
apt install restic
```

## 二、配置存储库

### Amazon S3

配置 [AWS](https://restic.readthedocs.io/en/stable/030_preparing_a_new_repo.html#amazon-s3) 密钥。

```sh
export AWS_ACCESS_KEY_ID=<MY_ACCESS_KEY>
export AWS_SECRET_ACCESS_KEY=<MY_SECRET_ACCESS_KEY>
```

配置[存储区域](https://restic.readthedocs.io/en/stable/030_preparing_a_new_repo.html#s3-compatible-storage)。

```sh
export AWS_DEFAULT_REGION=us-north-1
```

初始化 AWS 作为后端的存储库。

```sh
restic -r s3:s3.amazonaws.com/bucket_name init
```

初始化[七牛云 S3](https://developer.qiniu.com/kodo/12503/restic-s3-kodo) 作为后端的存储库。

```sh
restic -r s3:https://s3.us-north-1.qiniucs.com/<bucket_name> init
```

## 三、备份数据

### 备份

备份 `/home/data` 到存储库 `/data/backup` 中。`/home/data` 可以为目录或者单文件。

```sh
restic -r /data/backup backup /home/data
```

上传的时候进行限速，以及读取密码文件。

```sh
restic \
    --limit-upload=30000 \
    --password-file=/data/passwd/restic_bj1_passwd \
    -r /data/backup \
    backup /data/app/data_cache
```

从标准输出来保存数据。

```sh
mysqldump [...] | restic -r /srv/restic-repo backup --stdin --stdin-filename production.sql
```

### 快照

列出存储库中的可用快照。

```sh
restic -r /data/backup snapshots
```

检查两个快照之间的差异。

```sh
restic -r /data/backup diff 6eda7c7d b52d462b
```

### 恢复

将数据从快照 *b52d462b* 恢复到 `/home/data` 目录。

```sh
restic -r /data/backup restore b52d462b --target /home/data
```

将备份作为常规文件系统进行浏览。

```sh
restic -r /data/backup mount path/to/mount
```

### 删除

删除快照列表信息。

```sh
restic -r /data/backup snapshots         # 列出存储库中的可用快照
restic -r /data/backup forget 6eda7c7d   # 根据ID删除指定快照
```

从存储库中删除不需要的数据。

```sh
restic -r /data/backup prune
```

只保留最近一定数量的快照。

```sh
restic -r /data/backup forget --keep-last 1 --prune
```

