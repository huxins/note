# Installation

## Red Hat

```sh
$ yum install https://repo.mysql.com/mysql80-community-release-el7-7.noarch.rpm
$ yum-config-manager --disable mysql80-community
$ yum-config-manager --enable mysql57-community
$ yum install mysql-community-server
```

腾讯镜像源：

```sh
$ sed -Ee '/tools|connectors|5.7/s/repo.mysql.com/mirrors.cloud.tencent.com\/mysql/g' \
    -e '/tools|connectors|5.7/s/community\/el\/7\//community-el7-/g' \
    -i /etc/yum.repos.d/mysql-community.repo
```

