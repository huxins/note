# Command

## 一、文本处理

### vim

在 Debian 中，默认安装的是 [Vim](https://vimdoc.sourceforge.net/htmldoc/usr_toc.html) 的 [Tiny](https://vimdoc.sourceforge.net/htmldoc/various.html#+feature-list) 版本。

```sh
$ vi --version
$ update-alternatives --display vi
```

启动 Vim 后，Vim 处于 *Normal* 模式下。需要进入 *Insert* 模式时，请按下键 `i`，此时，可以输入文本了。需要返回 *Normal* 模式，请按 `ESC` 键。

*Normal* 模式下的命令。

>`i` → *Insert* 模式。
>
>`x` → 删除光标下的字符。
>
>`:wq` → 保存并退出。
>
>`dd` → 删除并复制当前行。
>
>`p` → 粘贴。
>
>`u` → 撤销上次操作。
>
>`:%d` → 删除文件中的所有行。
>
>`ggVGd` → 删除文件中的所有行。
>
>- `gg` → `1G` 的快捷方式，跳转到文件的开头。
>- `V` → 进入 Visual 模式，选择整行。
>- `G` → 将光标移到文件的最后一行。
>- `d` → 删除选择的内容。

### tr

[`tr`](https://www.gnu.org/software/coreutils/manual/html_node/tr-invocation.html) 通过替换或删除选定字符将标准输入复制到标准输出。由 [Coreutils](https://www.gnu.org/software/coreutils/manual/html_node/index.html) 提供。

将 CRLF 转为 LF。

```sh
$ cat -v test.txt | tr -d "^M"
```

### truncate

[`truncate`](https://www.gnu.org/software/coreutils/manual/html_node/truncate-invocation.html) 将文件缩小或扩展到指定大小。由 [Coreutils](https://www.gnu.org/software/coreutils/manual/html_node/index.html) 提供。

- -**s** *SIZE*：根据 *SIZE* 设置或调整每个文件的大小。

清空文件的内容。

```sh
$ truncate -s 0 filename
```

## 二、账户管理

### useradd

[`useradd`](https://manpages.debian.org/bookworm/passwd/useradd.8.en.html) 命令用于建立用户帐号。由 [shadow-utils](https://github.com/shadow-maint/shadow) 提供。

- -**d** *HOME_DIR*：指定用户登录目录。
- -**g** *GROUP*：用户初始登录组的组名或编号。必须存在。
- -**m**：如果用户的主目录不存在，则创建该目录。
- -**s** *SHELL*：用户的登录 Shell 的名称。
- -**r**, --**system**：创建系统帐户。

可以运行以下命令查看用户及其组的信息。

```sh
$ id username
```

也可以查看 `/etc/passwd`，是一个文本文件，描述系统的用户登录帐户。

```
sshd:x:74:74:Privilege-separated SSH:/var/empty/sshd:/sbin/nologin
```

密码已经用 `x` 替换掉了，基于安全考虑，密码的密文存储在 `/etc/shadow` 中。

### adduser

[`adduser`](https://manpages.debian.org/bookworm/adduser/adduser.8.en.html) 是一个在后端使用 `useradd` 二进制文件的 *perl* 脚本。

- --**system**：创建一个动态分配的系统用户和组。
- --**shell** *shell*：使用 *shell* 作为用户的登录 Shell。
- --**comment** *comment*：为生成的新条目设置注释字段。
- --**group**：在 `adduser --system` 中使用该选项表示新用户应获得一个相同名称的组作为其主要组。如果还没有相同名称的组，则会创建该组。
- --**disabled-login**, --**disabled-password**：请勿运行 `passwd` 设置密码。
- --**home** *dir*：使用 *dir* 作为用户的主目录。如果目录不存在，则会创建该目录。

### groupadd

[`groupadd`](https://manpages.debian.org/bookworm/passwd/groupadd.8.en.html) 命令用于创建一个新的工作组。

- -**r**, --**system**：创建系统组。

可以通过 `/etc/group` 查看工作组详情，它是一个文本文件，用于定义系统上的组。

```
sshd:x:74:
```

### usermod

[`usermod`](https://manpages.debian.org/bookworm/passwd/usermod.8.en.html) 命令用于修改用户帐号。

- -**a**：将用户添加到补充组。仅与 `-G` 选项一起使用。
- -**G** *GROUP1* [,*GROUP2*, ... [,*GROUPN*]]]：补充组列表。

添加用户到附加组。

```sh
$ usermod -aG additional_group username
```

## 三、权限管理

### chown

[`chown`](https://www.gnu.org/software/coreutils/manual/html_node/chown-invocation.html) 命令用于更改文件所有者和组。

- -**R**：递归操作文件和目录。

更改文件的所有者和组。

```sh
$ chown new_owner:new_group file.txt
```

### sudo

[`sudo`](https://www.sudo.ws/docs/man/sudo.man/) 用于以超级用户的身份执行特定的命令。

## 四、进程管理

### nohup

运行一个不受挂起影响的命令，并将输出发送到非终端。

```sh
$ nohup command </dev/null >/dev/null 2>&1 &
```

### ps

报告当前系统的进程状态。

- -**e**：显示所有进程。
- -**f**：显示完整格式的列表。
- -**a**：显示所有终端机下执行的程序，除了阶段作业领导者之外。
- -**u**  *userlist*：按用户 ID 或名称选择。
- **x**：显示没有控制终端的进程。

显示所有进程信息。

```sh
$ ps -ef
$ ps -aux
```

### kill

终止一个进程。

- -**n**：`n` 大于 1。信号名称对应的数字。

```sh
$ kill -9 PID
```

## 五、网络请求

### wget

[Wget](https://www.gnu.org/software/wget/manual/html_node/index.html) 用于使用 HTTP、HTTPS、FTP 和 FTPS 检索文件。

- [-**4**, -**6**](https://www.gnu.org/software/wget/manual/html_node/Download-Options.html#index-IPv6)：强制连接到 IPv4 或 IPv6 地址。
- -**b**：后台下载。
- -**c**：断点续传。
- --**limit-rate**=*amount*：限速下载。
- --**server-response**：显示响应头部信息。

下载文件。

```sh
wget -4 https://mirrors.upr.edu/centos/7/isos/x86_64/CentOS-7-x86_64-Minimal-2009.iso
```

下载文件并重命名。

```sh
wget -4 -O CentOS-7.iso https://mirrors.upr.edu/centos/7/isos/x86_64/CentOS-7-x86_64-Minimal-2009.iso
```

### ufw

[ufw](https://manpages.ubuntu.com/manpages/noble/en/man8/ufw.8.html) 是用于管理 *netfilter* 防火墙的程序。

设置默认规则。

```sh
ufw default deny incoming
ufw default allow outgoing
```

添加规则。

```sh
ufw allow ssh
ufw allow http
ufw allow https
ufw allow 3000
ufw deny 3306
```

检查 UFW 的状态，了解哪些规则是活动的。

```sh
ufw status
```

重新加载防火墙并在启动时启用防火墙。

```sh
ufw enable
```

卸载防火墙并在启动时禁用防火墙。

```sh
ufw disable
```

## 六、文件管理

### find

[`find`](https://www.man7.org/linux/man-pages/man1/find.1.html) 根据用户给定的表达式在目录层次结构中搜索文件和目录，并且可以对每个匹配的文件执行用户指定的操作。

- -**type** *c*：文件类型。*f* 为常规文件。
- -**name** *pattern*：文件名。
- -**mtime** *n*：文件的数据上次修改时间小于、大于或正好 *n*\*24 小时前。
- -**exec** *command ;*

在根目录下，递归查找某个文件。

```sh
find / -type f -name unzip
```

