# Shadow-utils

[`shadow-utils`](https://github.com/shadow-maint/shadow) 包含用于将 UNIX 密码文件转换为影子密码格式的必要程序，以及用于管理用户和组账户的工具。

## 一、用户账户

### 新增用户

[`useradd`](https://manpages.debian.org/bookworm/passwd/useradd.8.en.html) 是一个用于创建新用户的命令。它会在系统中设置用户的账户信息、主目录等，并更新相关配置文件。

通常会影响以下文件：

- `/etc/passwd`：存储用户的基本账户信息。
- `/etc/shadow`：存储用户的密码信息。
- `/etc/group`：配置用户所属的组信息。
- `/etc/default/useradd`：定义 `useradd` 的默认行为。
- `/etc/skel/`：存储新用户主目录的初始文件模板。

**常用选项：**

- -**d** *HOME_DIR*：指定用户的主目录路径。如果未指定，默认在 `/home/用户名` 下创建。
- -**g** *GROUP*：指定用户的主组（必须是已存在的组）。
- -**G** *组列表*：为用户添加附加组（多个组名用逗号分隔）。
- -**m**：创建用户的主目录（如果不存在）。
- -**s** *SHELL*：指定用户的默认登录 Shell（如 `/bin/bash`）。
- -**r**, --**system**：创建系统用户（UID 通常小于 1000）。
- -**c** *注释*：为用户添加注释信息（如用户全名或用途说明）。

可以运行以下命令查看用户及其组的信息。

```sh
id username
```

也可以查看 `/etc/passwd`，是一个文本文件，描述系统的用户登录帐户。其密码已经用 `x` 替换掉了，基于安全考虑，密码的密文存储在 `/etc/shadow` 中。

```
sshd:x:74:74:Privilege-separated SSH:/var/empty/sshd:/sbin/nologin
```

例如，创建一个普通用户。

```sh
useradd -m -s /bin/bash alice
```

例如，指定附加组和注释信息。

```sh
useradd -m -G sudo,kvm -c "Alice Doe" alice
```

例如，创建一个系统用户，并禁用登录功能。

```sh
useradd -r -s /sbin/nologin system_user
```

[`adduser`](https://manpages.debian.org/bookworm/adduser/adduser.8.en.html) 是用于添加新用户的命令，但与 [`useradd`](https://manpages.debian.org/bookworm/passwd/useradd.8.en.html) 不同的是，`adduser` 通常是一个 **高层的、友好的脚本**，它通过调用底层工具（如 `useradd` 和 `usermod`）来完成用户添加的任务。

`adduser` 的主要功能与 `useradd` 类似，但它更加直观且交互式。执行时，`adduser` 通常会引导用户一步步完成新账户的配置。

**常用选项：**

- --**home** *dir*：指定用户主目录的位置。如果目录不存在，则会创建该目录。
- --**shell** *shell*：指定用户默认登录的 Shell。
- --**ingroup** *groupname*：指定用户所属的初始组。
- --**disabled-password**：创建用户时禁用密码。
- --**disabled-login**：创建用户时禁用登录。
- --**no-create-home**：不为用户创建主目录。
- --**system**：创建一个系统用户。
- --**comment** *comment*：为生成的新条目设置注释字段。
- --**group**：配合 `--system` 使用该选项表示新用户应获得一个相同名称的组作为其主要组。如果不与 `--system` 组合，则会创建一个具有给定名称的组。

### 修改用户

[`usermod`](https://manpages.debian.org/bookworm/passwd/usermod.8.en.html) 是一个用于修改现有用户账户信息的命令。

**常用选项：**

- -**l** *NEW_LOGIN*：更改用户的登录名。
- -**g** *主组*：修改用户的主组。
- -**G** *附加组*：设置用户的附加组（覆盖原有附加组）。
- -**a**：仅与 `-G` 选项一起使用，将用户添加到指定附加组（不覆盖原有附加组）。

例如，添加用户到附加组。

```sh
usermod -aG additional_group username
```

例如，使用 `usermod` 命令移除辅助组。

```sh
sudo usermod -G $(id -nG username | tr ' ' '\n' | grep -v group_name | tr '\n' ',' | sed 's/,$//') username
```

## 二、组账户

### 新增组

[`groupadd`](https://manpages.debian.org/bookworm/passwd/groupadd.8.en.html) 是一个用于创建用户组的命令。主要功能是添加新的用户组到系统中，同时在 `/etc/group` 文件中记录新组的信息。

可以通过 `/etc/group` 查看工作组详情，它是一个文本文件，用于定义系统上的组。

```
sshd:x:74:
```

**常用选项：**

- -**r**, --**system**：创建一个系统组（GID 通常小于 1000）。

例如，创建普通用户组。

```sh
groupadd mygroup
```

### 管理组

[`gpasswd`](https://manpages.debian.org/bookworm/passwd/gpasswd.1.en.html) 命令用于管理组的密码以及组成员，通常用来对 `/etc/group` 文件进行管理。

`gpasswd` 修改的主要文件是：

- `/etc/group`：记录组信息，包括组名、组密码（如果设置）、GID 和组成员。
- `/etc/gshadow`：组影子文件，存储组的密码和组管理员信息。

例如，添加用户到组。

```sh
gpasswd -a username groupname
```

例如，从组中删除用户。

```sh
gpasswd -d username groupname
```

