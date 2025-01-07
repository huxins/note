# Command





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

### bsd-mailx

[`bsd-mailx`](https://packages.debian.org/bookworm/bsd-mailx) 是传统的简单命令行模式的邮件客户端。

在 Debian 12 上进行安装。

```sh
apt install bsd-mailx
```

#### msmtp

需要往外部发送邮件的话，需要配置 MTA，常用的有 `msmtp`。

```sh
apt install msmtp
```

配置 `msmtp`，创建或编辑 *~/.msmtprc* 文件。

```
defaults
tls on
tls_trust_file /etc/ssl/certs/ca-certificates.crt
logfile ~/.msmtp.log

account default
host smtp.example.com
port 587
auth on
user your-email@example.com
password your-email-password
from your-email@example.com
```

配置 `bsd-mailx` 使用 `msmtp`，创建或编辑 *~/.mailrc* 文件，添加以下内容：

```sh
set sendmail="/usr/bin/msmtp"
```

发送邮件。使用 `-v` 参数，可以显示发送过程。使用 `-a` 可以发送附件。

```sh
echo "This is the body of the email." | mailx -s "Subject of the Email" recipient@example.com
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

### gzip

`gzip` 使用 *LZ77* 算法来减小指定文件的大小。

压缩。

```sh
gzip FileName
```

解压。

```sh
gunzip FileName.gz
gzip -d FileName.gz
```

### pigz

[`pigz`](https://linux.die.net/man/1/pigz) 使用多线程进行压缩，以利用多处理器和多核。输入数据被分成 128 KB 的块，每个块并行压缩。每个块的单独校验值也并行计算。压缩数据按顺序写入输出，并从各个块的校验值中计算出一个综合校验值。

- -**p** *n*：最多允许 *n* 个进程。

压缩。

```sh
pigz FileName
```

解压。

```sh
pigz -d FileName.tgz
```

### bzip2

[`bzip2`](https://linux.die.net/man/1/bzip2) 使用 *Burrows-Wheeler* 块排序文本压缩算法和霍夫曼编码来压缩文件。与更传统的 *LZ77 / LZ78* 压缩器相比，压缩效果通常要好得多，并接近 *PPM* 系列统计压缩器的性能。

压缩。

```sh
bzip2 -z FileName
```

解压。

```sh
bunzip2 FileName.bz2
bzip2 -d FileName.bz2
```

### compress

[`compress`](https://linux.die.net/man/1/compress) 使用自适应 *Lempel-Ziv* 编码来减小指定文件的大小。

CentOS 7 安装。

```sh
yum install ncompress
```

压缩。

```sh
compress FileName
```

解压。

```sh
uncompress FileName.Z
```

### zip

[`zip`](https://linux.die.net/man/1/zip) 是一个压缩和文件打包工具。它类似于 `tar` 和 `compress` 的组合。

- -**r**：递归遍历目录结构。

压缩。

```sh
zip -r FileName.zip DirName
```

调整压缩级别，如只打包不压缩。

```sh
zip -0 -r archive.zip DirName
```

解压。

```sh
unzip FileName.zip
```

### 7z

*7-Zip* 是一款具有高压缩比的文件归档工具。[`7za`](https://linux.die.net/man/1/7za) 支持 7z、ZIP、CAB、ARJ、GZIP、BZIP2、TAR、CPIO、RPM 和 DEB 格式。

*CentOS 7* 安装。

```sh
yum install p7zip
```

压缩成 *7z* 格式。

```sh
7za a -t7z -r archive.7z DirName
```

解压。

```sh
7za x archive.7z -r -o./
```

### tar

[`tar`](https://man7.org/linux/man-pages/man1/tar.1.html) 是一个归档实用程序。

- -**x**：从存档中提取文件。
- -**c**：创建新的存档。
- -**v**：详细列出已处理的文件。
- -**f** *ARCHIVE*：使用归档文件。

打包。

```sh
tar -cvf FileName.tar DirName
```

解包。

```sh
tar -xvf FileName.tar
```

#### tgz

压缩。

```sh
tar -zcvf FileName.tar.gz DirName

# pigz 多线程处理
tar --use-compress-program=pigz -cvf FileName.tgz DirName
tar -cvf - DirName | pigz -p 8 > FileName.tgz
```

解压。

```sh
tar -zxvf FileName.tar.gz

# pigz 多线程处理
tar --use-compress-program=pigz -xvf FileName.tgz
```

#### bz2

压缩。

```sh
tar -jcvf FileName.tar.bz2 DirName
```

解压。

```sh
tar -jxvf FileName.tar.bz2
```

#### Z

压缩。

```sh
tar -Zcvf FileName.tar.Z DirName
```

解压。

```sh
tar -Zxvf FileName.tar.Z
```

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

### savelog

[savelog](https://manpages.ubuntu.com/manpages/noble/en/man8/savelog.8.html) 命令可以保存文件的旧副本，也可以压缩旧副本。

- -**c** *cycle*：日志文件的保存周期版本。
- -**n**：不要旋转空文件。
- -**t**：生成新的日志文件。

将日志文件重命名，并且只保留指定数量的历史版本。

```sh
savelog -n -t -c 2 /var/log/syslog
```

## 七、Linux

### sysctl

[sysctl](https://man7.org/linux/man-pages/man8/sysctl.8.html) 用于在运行时修改内核参数。可使用的参数列在 */proc/sys/* 下。

#### 禁用 IPv6

```sh
sysctl -w net.ipv6.conf.all.disable_ipv6=1 >> /etc/sysctl.d/disable-ipv6.conf
sysctl -w net.ipv6.conf.default.disable_ipv6=1 >> /etc/sysctl.d/disable-ipv6.conf
sysctl -w net.ipv6.conf.lo.disable_ipv6=1 >> /etc/sysctl.d/disable-ipv6.conf
sysctl -w net.ipv6.conf.eth0.disable_ipv6=1 >> /etc/sysctl.d/disable-ipv6.conf
sysctl -p /etc/sysctl.d/disable-ipv6.conf
```

如果使用 `ip a` 命令，在输出中没有发现 IPv6 地址，则说明成功关闭了 IPv6 功能。

### crontab

[crontab](https://linux.die.net/man/1/crontab) 是用于安装、移除或列出用于驱动 `cron` *daemon* 表的程序。每个用户都可以拥有自己的 `crontab`，尽管这些文件位于 */var/spool/* 目录中，但并不直接编辑它们。

- -**e**：编辑工作表。
- -**l**：列出工作表里的命令。

时间格式如下：

```
*    *    *    *    *
-    -    -    -    -
|    |    |    |    |
|    |    |    |    +----- 星期中星期几 (0 - 6) (星期天 为0)
|    |    |    +---------- 月份 (1 - 12) 
|    |    +--------------- 一个月中的第几天 (1 - 31)
|    +-------------------- 小时 (0 - 23)
+------------------------- 分钟 (0 - 59)
```

常用时间如下：

| 执行计划     | 格式        |
| ------------ | ----------- |
| 每五分钟执行 | */5 * * * * |
| 每小时执行   | 0 * * * *   |
| 每天执行     | 0 4 * * *   |
| 每周执行     | 0 0 * * 0   |
| 每月执行     | 0 0 1 * *   |
| 每年执行     | 0 0 1 1 *   |

### locale

`locale` 命令显示关于当前语言环境的信息。

查看系统当前语言包。

```sh
locale
```

查看系统拥有的语言包。

```sh
locale -a
```

#### Debian

在 Debian 系统中，*locales* 包含了系统所需的语言环境工具。

```sh
apt install locales
```

正常情况下，系统已经默认安装了 `locales`，可用查询系统是否已安装：

```sh
dpkg -s locales
```

使用 `dpkg-reconfigure` 命令来配置和生成所需的语言环境。

```sh
dpkg-reconfigure locales
```

编辑 */etc/default/locale* 文件，设置系统的默认语言环境。

```sh
LANG=zh_CN.UTF-8
```

重启系统，更改语言环境。

```sh
reboot
```

