# findutils

[`findutils`](https://www.gnu.org/software/findutils/manual/html_node/find_html/index.html) 是一个工具包，包含了一组重要的命令行工具，用于在文件系统中查找文件并对其执行操作。

## 一、find

[`find`](https://www.man7.org/linux/man-pages/man1/find.1.html) 命令可以递归地搜索目录树，根据各种条件（如文件名、大小、类型、修改时间、权限等）找到匹配的文件或目录，并对其执行指定的操作。

- -**type** *c*：文件类型。`f` 为常规文件。
- -**name** *pattern*：文件名。
- -**mtime** *n*：文件的数据上次修改时间小于、大于或正好 *n*\*24 小时前。
- -**exec** *command ;*：执行命令。

查找特定名称的文件。

```sh
find . -name "example.txt"
find / -type f -name unzip
```

查找特定大小的文件（大于 10MB 的文件）。

```sh
find . -size +10M
```

查找最近 7 天内修改的文件。

```sh
find . -mtime -7
```

查找符合条件的文件并删除。

```sh
find . -name "*.tmp" -delete
```

对找到的文件执行操作（例如打印详细信息）。

```sh
find . -type f -name "*.txt" -exec ls -lh {} \;
find . -type f -name "*.txt" -exec ls -lh {} +
```

- 使用 `-exec ... {} \;` 时，命令会对每个文件逐个执行，适合需要逐个处理文件的情况。
- 使用 `-exec ... {} +` 时，命令会批量处理多个文件，适合命令支持批量文件输入的情况，且性能更高。

