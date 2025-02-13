# RPM Package Manager

[RPM](https://rpm.org/) 是基于 Red Hat Enterprise Linux 的发行版中流行的[包管理工具](https://www.redhat.com/sysadmin/how-manage-packages)。

使用 RPM，可以安装、卸载和查询单个软件包。不过，它不能像 YUM 那样管理依赖项解析。

RPM 包由文件和元数据的存档组成，元数据包括帮助程序脚本、文件属性和有关包的信息。

## 一、模式

`RPM` 有一些基本模式：

- **query**
- **verify**
- **install**
- **upgrade**
- **erase**
- **show querytags**
- **show configuration**

至少需要选择其中一种模式来执行包管理任务，每种模式都有自己的一组选项。例如，安装模式 `i` 有自己的一组安装选项。

以下是 `RPM` 的常用模式：

- -**i**：安装一个新包。
- -**U**：将当前安装的软件包升级到较新的版本。
- -**e**：卸载一个包。
- -**V**：将包中已安装文件的信息与存储在 `rpm` 数据库中的包元数据中的文件的信息进行比较。
- -**q**：查询一个包。

## 二、选项

### 通用

- -**?**, --**help**：打印帮助信息。
- --**version**：打印版本号。
- -**v**, --**verbose**：打印详细输出。

### 安装和升级

- -**h**, --**hash**：套件安装时列出标记。

安装 `rpm` 包。

```sh
rpm -ivh <package-file>
```

升级 `rpm` 包。

```sh
rpm -Uvh <package-file>
```

### 查询

#### 包选择

- -**a**, --**all**：查询所有已安装的包。
- -**f**, --**file** *FILE*：查询拥有指定文件的包。
- -**p**, --**package** *PACKAGE_FILE*：查询（已卸载的）程序包。

查看所有已安装的软件包。

```sh
rpm -qa
```

查询拥有指定文件的套件。

```sh
rpm -qf /usr/bin/cat
```

#### 包查询

- -**i**, --**info**：显示包信息，包括名称、版本和描述。
- -**l**, --**list**：列出包中的文件。
- -**R**, --**requires**：列出此包所依赖的功能。

查看 `rpm` 包含了哪些文件。

```sh
rpm -qlp https://repo.mysql.com/mysql80-community-release-el7-7.noarch.rpm
```

显示包信息，包括名称、版本和描述。

```sh
rpm -qi lua-5.1.4-15.el7.x86_64
```

列出此包所依赖的功能。

```sh
rpm -qR lua-5.1.4-15.el7.x86_64
```

