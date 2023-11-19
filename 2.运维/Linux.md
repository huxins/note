# Linux

## 一、命令

### 1.1. Vim

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

### 1.2. useradd

`useradd` 命令用于建立用户帐号。

```sh
$ useradd username
```

- `-d` *HOME_DIR*：指定用户登录目录。
- `-g` *GROUP*：用户初始登录组的组名或编号。必须存在。
- `-m`：如果用户的主目录不存在，则创建该目录。
- `-s` *SHELL*：用户的登录 Shell 的名称。
- `-r`：创建系统帐户。

可以运行以下命令查看用户及其组的信息。

```sh
$ id username
```

### 1.3. groupadd

`groupadd` 命令用于创建一个新的工作组。

```sh
$ groupadd group_name
```

- `-r`：创建系统组。

### 1.4. usermod

`usermod` 命令用于修改用户帐号。

- `-a`：将用户添加到补充组。仅与 `-G` 选项一起使用。
- `-G` *GROUP1[,GROUP2,...[,GROUPN]]]*：补充组列表。

添加用户到附加组。

```sh
$ usermod -aG additional_group username
```

### 1.5. chown

`chown` 命令用于更改文件所有者和组。

- `-R`：递归操作文件和目录。

更改文件的所有者和组。

```sh
$ chown new_owner:new_group file.txt
```

### 1.6. nohup

运行一个不受挂起影响的命令，并将输出发送到非终端。

```sh
$ nohup command </dev/null >/dev/null 2>&1 &
```

## 二、文件

### 2.1. /etc/passwd

`/etc/passwd` 是一个文本文件，描述系统的用户登录帐户。

```
sshd:x:74:74:Privilege-separated SSH:/var/empty/sshd:/sbin/nologin
```

密码已经用 `x` 替换掉了，基于安全考虑，密码的密文存储在 `/etc/shadow` 中。

### 2.2. /etc/group

`/etc/group` 是一个文本文件，用于定义系统上的组。

```
sshd:x:74:
```

