# MinIO

## 一、安装

CentOS 7

```sh
$ wget https://dl.min.io/server/minio/release/linux-amd64/archive/minio-20231115204325.0.0.x86_64.rpm -O minio.rpm
$ yum install minio.rpm
```

## 二、Systemd

- `/usr/lib/systemd/system/minio.service`

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
  ProtectProc=invisible
  
  EnvironmentFile=-/etc/default/minio
  ExecStartPre=/bin/bash -c "if [ -z \"${MINIO_VOLUMES}\" ]; then echo \"Variable MINIO_VOLUMES not set in /etc/default/minio\"; exit 1; fi"
  ExecStart=/usr/local/bin/minio server $MINIO_OPTS $MINIO_VOLUMES
  
  Restart=always
  
  LimitNOFILE=1048576
  
  TasksMax=infinity
  
  TimeoutStopSec=infinity
  SendSIGKILL=no
  
  [Install]
  WantedBy=multi-user.target
  ```
  
- `/etc/default/minio`

  ```sh
  MINIO_VOLUMES="/mnt/data"
  MINIO_OPTS="--address :9199 --console-address :9001"
  MINIO_ROOT_USER=Root-User
  MINIO_ROOT_PASSWORD=Root-Password
  MINIO_CONFIG_ENV_FILE=/etc/default/minio
  ```

