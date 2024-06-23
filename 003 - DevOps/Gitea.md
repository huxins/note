# Gitea

## 一、安装

### 二进制安装

使用[二进制文件](https://docs.gitea.com/zh-cn/installation/install-from-binary)安装，从[下载页面](https://dl.gitea.io/gitea/)中选择与目标平台匹配的文件，复制 URL 并在以下命令中替换 URL。

```sh
wget -O gitea https://dl.gitea.com/gitea/1.22.0/gitea-1.22.0-linux-amd64
chmod +x gitea
cp gitea /usr/local/bin/gitea
```

检查服务器上是否安装了 Git。Gitea 需要 Git 版本 >= 2.0。

```sh
git --version
```

创建用户以运行 Gitea。

```sh
adduser \
  --system \
  --shell /bin/bash \
  --gecos 'Git Version Control' \
  --group \
  --disabled-password \
  --home /home/gitea \
  gitea
```

创建所需的目录结构。

```sh
mkdir -p /var/lib/gitea/{custom,data,log}
chown -R gitea:gitea /var/lib/gitea/
chmod -R 750 /var/lib/gitea/
mkdir /etc/gitea
chown root:gitea /etc/gitea
chmod 770 /etc/gitea
```

### Systemd

在 Debian 中以 [service](https://docs.gitea.com/zh-cn/installation/linux-service) 方式运行。

创建 `/etc/systemd/system/gitea.service` 文件。

```ini
[Unit]
Description=Gitea
After=network.target postgresql.service
Wants=postgresql.service

[Service]
RestartSec=2s
Type=simple
User=gitea
Group=gitea
WorkingDirectory=/var/lib/gitea/
ExecStart=/usr/local/bin/gitea web --config /etc/gitea/app.ini
Restart=always
Environment=USER=gitea HOME=/home/gitea GITEA_WORK_DIR=/var/lib/gitea

[Install]
WantedBy=multi-user.target
```

设置自启并启动 Gitea。

```sh
$ systemctl enable gitea
$ systemctl start gitea
```

### 数据库

#### PostgreSQL

在数据库服务器上，以超级用户身份登录到数据库控制台。

```sh
su -c "psql" - postgres
```

创建具有登录权限和密码的数据库用户。

```sql
CREATE ROLE gitea WITH LOGIN PASSWORD 'new_password';
```

使用 UTF-8 字符集创建数据库，并由之前创建的数据库用户拥有。

```sql
CREATE DATABASE giteadb WITH OWNER gitea TEMPLATE template0 ENCODING UTF8 LC_COLLATE 'en_US.UTF-8' LC_CTYPE 'en_US.UTF-8';
```

测试与数据库的连接。

```sh
# 本地数据库
psql -U gitea -d giteadb
# 远程数据库
psql "postgres://gitea@127.0.0.1/giteadb"
```

