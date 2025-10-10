# vim

[Vim](https://www.vim.org/) 是一款强大的文本编辑器，支持高效的代码编写、文本处理和插件扩展，被广泛应用于程序开发和系统管理。

## 一、版本

Vim 有[多个版本](https://vimdoc.sourceforge.net/htmldoc/various.html#:version)，主要是为了适应不同需求和资源环境。以下是 Vim 各版本：

- **Tiny**（精简版）
- **Normal**（普通版）

在 Debian 中，默认安装的是 Vim 的 [Tiny](https://vimdoc.sourceforge.net/htmldoc/various.html#:version) 版本。

```sh
vi --version
update-alternatives --display vi
```

## 二、模式

Vim 的模式是其核心特性，不同模式下键盘输入有不同的功能。

如果已经启用 [`showmode`](https://vimdoc.sourceforge.net/htmldoc/options.html#'showmode') 选项，那么将在屏幕底部显示相应的模式名称。

```sh
:set showmode
```

### Normal

[**Normal**](https://vimdoc.sourceforge.net/htmldoc/intro.html#Normal) Mode（正常模式）是默认模式，用于执行命令和导航文本。

输入普通字符不会插入文本，而是执行操作命令（如移动光标、复制、删除等）。

**进入方式**：按 `Esc` 或从其他模式切换。

### Insert

[**Insert**](https://vimdoc.sourceforge.net/htmldoc/insert.html#Insert) Mode（插入模式）用于插入文本，输入的字符会直接添加到光标位置。

**进入方式**：

- `i`：进入 *Insert* 模式，从光标前插入。
- `a`：进入 *Insert* 模式，从光标后插入。
- `o`：在当前行下方打开新行并进入 *Insert* 模式。

**退出方式**：按 `Esc` 返回 *Normal* 模式。

### Visual

[**Visual**](https://vimdoc.sourceforge.net/htmldoc/visual.html#Visual) Mode（可视模式）用于选择文本块，可以对选定文本执行操作（如复制、删除、格式化等）。

**子模式**：

- `v`：字符选择模式。
- `V`：行选择模式。
- `Ctrl+v`：块选择模式（列选择）。

**退出方式**：按 `Esc` 返回 *Normal* 模式。

### Command-Line

[**Command-Line**](https://vimdoc.sourceforge.net/htmldoc/cmdline.html#Cmdline) Mode（命令行模式）用于输入 Ex 命令（如保存、退出、查找替换等）。

**进入方式**：按 `:`、`/` 或 `?`。

- `:`：执行命令（如 `:w` 保存、`:q` 退出）。
- `/`：向下搜索文本。
- `?`：向上搜索文本。

执行后自动返回 *Normal* 模式。

### Replace

[**Replace**](https://vimdoc.sourceforge.net/htmldoc/insert.html#Replace) Mode（替换模式）用于覆盖文本，输入字符会替换光标所在字符。

**进入方式**：按 `R`。

**退出方式**：按 `Esc` 返回 *Normal* 模式。

### Select

[**Select**](https://vimdoc.sourceforge.net/htmldoc/visual.html#Select) Mode（选择模式）类似 *Visual* 模式，但操作行为与选择普通文本类似。

**进入方式**：

- 在 *Visual* 模式中按 `Ctrl+g`。
- `gh`：进入字符选择模式。
- `gH`：进入行选择模式。
- `gCTRL+H`：进入块选择模式。

在选择模式下，可以对选中的文本进行快速操作。比如先高亮选中文本，然后用 `Backspace` 来删除这段文本；或者先高亮选中文本，然后用输入的内容来替换这些文本。执行操作之后，Vim 将自动进入插入模式。

### Ex

[**Ex**](https://vimdoc.sourceforge.net/htmldoc/intro.html#Ex) Mode（扩展模式）类似 *Command-Line* 模式，但停留在 *Ex* 环境中，可执行多条命令。

**进入方式**：在 *Command-Line* 模式中输入 `Q`。

**退出方式**：输入 `visual` 返回 *Normal* 模式。

## 三、命令

启动 Vim 后，Vim 处于 *Normal* 模式下。需要进入 *Insert* 模式时，请按下键 `i`，此时，可以输入文本了。需要返回 *Normal* 模式，请按 `ESC` 键。

**Normal** 模式下的命令：

>`i` → 进入 *Insert* 模式。
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

## Reference

- [Vim Reference Guide](https://learnbyexample.github.io/vim_reference/)
- [yyq123/learn-vim](https://github.com/yyq123/learn-vim)

