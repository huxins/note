# Command

## Cheat sheet

- [agarrharr/awesome-cli-apps](https://github.com/agarrharr/awesome-cli-apps)

## HTTP

- [curl](https://curl.se/docs/manpage.html) - 使用 URL 在服务器之间传输数据。
- [wget](https://www.gnu.org/software/wget/manual/html_node/index.html) - 从网络上非交互式地下载文件。

## Email

- [bsd-mailx](https://packages.debian.org/bookworm/bsd-mailx) - 命令行邮件客户端工具，主要提供用户接口和命令行邮件管理功能。
- [msmtp](https://packages.debian.org/bookworm/msmtp) - 轻量级的 SMTP 客户端，主要用于发送电子邮件。

## 文本编辑

- [vim](https://github.com/vim/vim) - 无处不在的文本编辑器。
- [nano](https://www.nano-editor.org/) - 轻量级的文本编辑器，主要用于在终端中编辑文本文件。
- [grep](https://www.gnu.org/software/grep/manual/html_node/index.html) - 从文件或标准输入中查找匹配特定模式（通常是正则表达式）的行。
- [sed](https://www.gnu.org/software/sed/manual/html_node/index.html) - 流编辑器，用于对文本文件进行解析和编辑操作。
- [awk](https://www.gnu.org/software/gawk/manual/html_node/index.html) - 强大的文本处理工具和编程语言，专门用于处理和分析文本数据。

## 文件管理

- [s5cmd](https://github.com/peak/s5cmd) - 非常快速的 S3 和本地文件系统执行工具。
- [restic](https://github.com/restic/restic) - 快速、高效、安全的备份程序。

## 磁盘管理

- [fdisk](https://man7.org/linux/man-pages/man8/fdisk.8.html) - 用于创建和操作分区表，归属于 [util-linux](https://launchpad.net/ubuntu/plucky/+package/fdisk)。
- [gdisk](https://www.rodsbooks.com/gdisk/) - GPT fdisk 是一组用于 Linux、FreeBSD、macOS 和 Windows 的文本模式分区工具。
- [mkfs](https://man7.org/linux/man-pages/man8/mkfs.8.html) - 构建 Linux 文件系统，归属于 [util-linux](https://packages.debian.org/sid/amd64/util-linux/filelist)。
- [qemu-img](https://www.qemu.org/docs/master/tools/qemu-img.html) - 创建、转换和修改图像。

## 网络管理

- [ufw](https://manpages.ubuntu.com/manpages/noble/en/man8/ufw.8.html) - 简单易用的防火墙管理工具。

## 实用程序

- [Coreutils](https://www.gnu.org/software/coreutils/manual/html_node/index.html)

  包含许多基本的命令行工具，用于文件操作、文本处理和系统管理等任务。

  - `tr`
  - `cat`
  - `echo`
  - `truncate`
  - `stat`
  - `chown`
  - `id`
  - `groups`
  - `nohup`

- [Shadow-utils](https://github.com/shadow-maint/shadow)

  管理 Linux 系统用户和组的工具。

  - `useradd`
  - `groupadd`
  - `usermod`
  - `groupmod`
  - `gpasswd`

- [libc-bin](https://packages.debian.org/sid/libc-bin)
  
  与 GNU C Library（glibc）相关的软件包，它包含了与 C 标准库相关的实用工具和程序。
  
  - `getent` - 从系统的数据库中获取条目。
  - `locale` - 显示或设置与区域和语言相关的环境变量。
  
- [procps](https://gitlab.com/procps-ng/procps)
  
  用于监控和管理系统进程的命令行工具。
  
  - `ps`
  - `kill`
  - `sysctl`
  
- [findutils](https://www.gnu.org/software/findutils/manual/html_node/find_html/index.html)

  在文件系统中查找文件并对其执行操作。

  - `find`

- [debianutils](https://packages.debian.org/sid/debianutils)

  包含了一些由 Debian 项目开发并广泛用于 Debian 系统的实用工具。

  - `savelog`

- [lsb-release](https://wiki.linuxfoundation.org/lsb/start)

  识别正在使用的 Linux 发行版，以及它们对 Linux 标准基础的兼容性。

- [util-linux](https://packages.debian.org/sid/util-linux)
  
  Linux 实用程序的随机集合。
  
  - `lsblk`
  - `fdisk`
  - `mkfs`
  - `mount`

