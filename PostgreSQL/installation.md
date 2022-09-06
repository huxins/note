# Installation

## Red Hat

```sh
$ yum install https://download.postgresql.org/pub/repos/yum/reporpms/EL-7-x86_64/pgdg-redhat-repo-latest.noarch.rpm
$ yum install postgresql10-server
```

腾讯镜像源：

```sh
$ sed -i 's/download.postgresql.org\/pub/mirrors.cloud.tencent.com\/postgresql/g' /etc/yum.repos.d/pgdg-redhat-all.repo
```

