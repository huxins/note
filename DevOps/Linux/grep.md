# Grep

`grep` (global regular expression print) 在一个或多个输入文件中搜索包含与指定模式匹配的行。

## 语法

调用 `grep` 的完整格式是：

```
grep [OPTION]... PATTERN [input-file]...
```

## 命令行选项

### 输出行前缀控制

- **-n**

在其输入文件中使用从 1 开始的行号为每行输出添加前缀。

### 文件和目录选择

- **-r**

对于每个目录，递归读取并处理该目录中的所有文件。

## 参见

- [Grep - GNU](https://www.gnu.org/software/grep/manual/grep.html)

