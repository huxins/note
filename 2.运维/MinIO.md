# MinIO

## 一、安装

CentOS 7

```sh
$ wget https://dl.min.io/server/minio/release/linux-amd64/archive/minio-20231115204325.0.0.x86_64.rpm -O minio.rpm
$ yum install minio.rpm
```

## 二、Systemd

### 2.1. minio.service

创建 `/usr/lib/systemd/system/minio.service` 文件。

```ini
[Unit]
Description=MinIO
Documentation=https://docs.min.io
Wants=network-online.target
After=network-online.target
AssertFileIsExecutable=/usr/local/bin/minio

[Service]
Type=notify

WorkingDirectory=/usr/local

User=minio-user
Group=minio-user
# Added in version 247.
# ProtectProc=invisible

EnvironmentFile=-/etc/default/minio
ExecStartPre=/bin/bash -c "if [ -z '${MINIO_VOLUMES}' ]; then echo 'Variable MINIO_VOLUMES not set in /etc/default/minio'; exit 1; fi"
ExecStart=/usr/local/bin/minio server $MINIO_OPTS $MINIO_VOLUMES

Restart=always

LimitNOFILE=1048576

TasksMax=infinity

TimeoutStopSec=infinity
SendSIGKILL=no

[Install]
WantedBy=multi-user.target
```

### 2.2. 配置文件

创建 `/etc/default/minio` 文件。

```sh
MINIO_VOLUMES="/mnt/data"
MINIO_OPTS="--address :9199 --console-address :9001"
MINIO_ROOT_USER=Root-User
MINIO_ROOT_PASSWORD=Root-Password
MINIO_CONFIG_ENV_FILE=/etc/default/minio
```

### 2.3. 配置用户

新增用户组。

```sh
$ groupadd -r minio-user
```

新增用户。

```sh
$ useradd -m -d /home/minio-user -r -g minio-user minio-user
```

新增数据目录并更改所有权。

```sh
$ mkdir /mnt/data
$ chown minio-user:minio-user /mnt/data
```

