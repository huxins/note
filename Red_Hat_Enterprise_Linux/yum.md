# Yum

`yum` 是用于在 Red Hat Enterprise Linux 中安装、更新、删除和管理软件包的主要软件包管理工具。`yum` 在安装、更新和删除软件包时执行依赖关系解析，可以管理来自系统中已安装的存储库或 .rpm 包。

## 配置文件

`yum` 的主要配置文件在 `/etc/yum.conf`。

### main

- **reposdir**

定义要使用的存储库的 .repo 文件的目录列表。默认为 `/etc/yum.repos.d`。

- **exclude**

要从更新或安装中排除的软件包列表。以空格分隔。

- **ip_resolve**

IP 地址类型。确定如何解析主机名。

- **proxy**

要连接的代理服务器的 URL。

- **proxy_username**

用于连接代理服务器的用户名。

- **proxy_password**

用于连接代理服务器的密码。

## 语法

```
yum [options] [command] [package ...]
```

## 命令

### 安装软件包

- **install**

安装一个包或一组包的最新版本，同时确保满足所有依赖项。

- **localinstall**

安装一组本地 .rpm 文件。

### 删除软件包

- **remove**

从系统中删除指定的包以及删除依赖于被删除包的任何包。

### 更新软件包

- **update**

如果在没有指定任何包的情况下运行，将更新每个当前安装的包。

- **upgrade**

与设置了 `--obsoletes` 标志的 `update` 命令相同。

- **check-update**

列出所有可更新的软件清单。

### 查询软件包

- **deplist**

列出依赖项和提供它们的包。

- **list**

列出可用包的各种信息。

`all`：已安装和可用的软件包。

`available`：可用的软件包。

`installed`：已安装的软件包。

`updates`：可更新的软件包。

`extras`：已安装的软件包，且这些软件包在已配置的存储库中都不可用。

`kernel`：已安装和可用的内核包。

- **info**

列出可用包的描述和摘要信息。

- **search**

根据名称和摘要搜索包。

- **provides**

查询提供了某些功能或文件的包。

`yum provides "*bin/top"`：显示包含 `top` 命令的包。

`yum provides "*/nginx.conf"`：显示包含 nginx.conf 文件的包。

### 查询仓库

- **repolist**

生成已配置存储库的列表，默认列出所有启用的存储库。

`all`：所有的软件存储库。

`enabled`：启用的软件存储库。

`disabled`：禁用的软件存储库。

### 缓存

- **clean**

清理缓存目录中随时间累积的各种东西。

`packages`：删除保存在缓存中的包。

- **makecache**

下载当前启用的存储库的所有元数据并使其可用。

### 事务

- **history**

查看事务的历史记录。

`yum history undo <id>`：撤消事务。

## 命令行选项

- **-y**

假设任何问题的答案都是肯定的。

## 存储库

### 安装存储库 .rpm

安装一个带有存储库信息的 .rpm。以下命令为 CentOS 7 安装 EPEL 存储库：

```sh
$ yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
```

### 仅设置存储库的一部分

在需要特定存储库的情况下，例如 PHP 7.2，您首先需要安装存储库，然后使用 `yum-config-manager` 禁用和启用存储库，如下所示：

```sh
$ yum install http://rpms.remirepo.net/enterprise/remi-release-7.rpm
$ yum-config-manager --disable remi-php54
$ yum-config-manager --enable remi-php72
```

### 手动设置存储库

使用文本编辑器在 `/etc/yum.repos.d` 中创建一个 .repo 文件。在此示例中，我们将为 MySQL 5.7 创建存储库文件：

```sh
$ nano /etc/yum.repos.d/mysql57-community.repo
[mysql57-community]
name=MySQL 5.7 Community Server
baseurl=http://repo.mysql.com/yum/mysql-5.7-community/el/7/$basearch/
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-mysql
```

### 存储库镜像

清华 Base：

```sh
$ sed -e 's/^mirrorlist/#mirrorlist/g' \
    -e 's/^#baseurl/baseurl/g' \
    -e 's/mirror.centos.org/mirrors.cloud.tencent.com/g' \
    -e 's/http/https/g' \
    -i /etc/yum.repos.d/CentOS-Base.repo
```

清华 EPEL：

```sh
$ yum install epel-release
$ sed -e 's/^metalink/#metalink/g' \
    -e 's/^#baseurl/baseurl/g' \
    -e 's/download.fedoraproject.org\/pub/mirrors.tuna.tsinghua.edu.cn/g' \
    -e 's/http/https/g' \
    -i /etc/yum.repos.d/epel*.repo
```

## 插件

插件的配置文件存在于 `/etc/yum/pluginconf.d/<plugin_name>.conf`。

禁用插件：

```sh
$ sed -i 's/enabled=1/enabled=0/g' /etc/yum/pluginconf.d/fastestmirror.conf
```

## yum-utils

操作存储库和扩展包管理的工具。

安装：

```sh
$ yum install yum-utils
```

### 命令

- **yum-config-manager**

切换存储库，添加新存储库并设置主要配置选项。

`yum-config-manager --add-repo repository_url`：从指定的文件或 url 添加并启用 repo。

`yum-config-manager --enable repository`：启用指定的 repos。

`yum-config-manager --disable repository`：禁用指定的 repos。

- **repoquery**

查询远程 repos 和本地 RPM 数据库。

`repoquery --requires --resolve bash`：显示依赖包。

`repoquery -ql epel-release`：列出包中的文件。

