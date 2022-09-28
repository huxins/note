# IntelliJ IDEA

## Configuring the IDE

### Advanced configuration

除了 IDE 设置可用的标准选项外，IntelliJ IDEA 还使您能够执行底层平台和 Java 运行时的低级配置。

#### JVM options

IntelliJ IDEA 在 Java 虚拟机 (JVM) 上运行，它具有控制其性能的各种选项。用于运行 IntelliJ IDEA 的默认选项在 IDE 安装目录中指定：

- Windows: <IDE_HOME>\bin\idea64.exe.vmoptions

## Write and edit source code

### Source code navigation

您可以使用不同的操作和弹出窗口快速浏览编辑器中的代码。

#### Source file structure

> **Structure** 弹出窗口：**Navigate** | **File Structure** or `Ctrl+F12`

### Find and replace

#### Search for usages

当您编辑代码时，您可能会遇到要更改或删除的代码元素。在进行更改之前，最好查看代码元素的使用位置以及它如何影响应用程序。通过 **Find Usages** 操作，您可以在整个代码库中搜索代码元素的引用。

您可以管理搜索过程，仅在单个文件中搜索，将搜索扩展到整个项目，或创建特定搜索范围。此外，您可以配置用法突出显示的颜色或完全禁用自动突出显示用法。

##### Search for usages in a project

> 选择您要 *find usages* 的符号，右键单击该符号，然后从其上下文菜单中选择 **Find Usages** or `Alt+F7`。

