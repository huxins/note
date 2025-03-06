# IntelliJ IDEA

[IntelliJ IDEA](https://www.jetbrains.com/zh-cn/idea/) 是一个面向专业开发的 IDE，适用于 Java 和 Kotlin。

## 一、环境配置

### 基础设置

#### 通知管理

- **路径**：Settings | Appearance & Behavior | Notifications
- **禁用系统通知**：隐藏 Windows 系统托盘图标

### 性能调优

#### JVM 参数配置

- **配置文件路径**
  - [**Windows**](https://www.jetbrains.com/help/idea/tuning-the-ide.html#configure-jvm-options)：`<IDE_HOME>\bin\idea64.exe.vmoptions`









## 二、编辑源代码

IDEA 提供了各种[快捷方式和功能](https://www.jetbrains.com/help/idea/working-with-source-code.html)来帮助添加、选择、复制、移动、编辑、折叠、查找引用和保存代码。

### 导航

可以使用不同的[操作和弹出窗口](https://www.jetbrains.com/help/idea/navigating-through-the-source-code.html)快速浏览编辑器中的代码。

#### 文件结构

IDEA 允许在结构工具窗口和结构弹出窗口中查看和导航[文件的结构](https://www.jetbrains.com/help/idea/viewing-structure-of-a-source-file.html)。

- **Structure** 弹出窗口：**Navigate** | **File Structure** 或 `Ctrl + F12`

### 代码引用信息

Inlay hints 提供有关代码的其他信息，如方法引用计数。

```
启用或禁用 Inlay Hints：
Settings | Editor | Inlay Hints
```

## 三、查找和替换

### 代码引用次数

编辑代码时，可能会遇到要更改或删除的代码元素。在进行更改之前，最好查看代码元素的使用位置以及它如何影响应用程序。

通过 [Find Usages](https://www.jetbrains.com/help/idea/find-highlight-usages.html) 操作，可以在整个代码库中搜索代码元素的引用。

可以管理搜索过程，仅在单个文件中搜索，或将搜索扩展到整个项目，或创建特定搜索范围。此外，可以配置 Usages 突出显示的颜色或完全禁用自动突出显示 Usages。

- [项目](https://www.jetbrains.com/help/idea/find-highlight-usages.html#find-usages)：选择要 *find usages* 的符号，右键单击该符号，然后从其上下文菜单中选择 **Find Usages** 或 `Alt + F7`。

## 四、插件

### 控制台

- **Grep Console**

  [krasa/GrepConsole](https://github.com/krasa/GrepConsole) 以不同颜色显示控制台不同级别的日志。

