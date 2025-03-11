# IntelliJ IDEA

[IntelliJ IDEA](https://www.jetbrains.com/zh-cn/idea/) 是面向专业开发者的全能型 IDE，深度支持 Java/Kotlin 开发。

## 一、环境配置

### 基础设置

#### 通知管理

- **路径**：`Settings | Appearance & Behavior | Notifications`
- **关键操作**：
  - **禁用系统托盘图标**：关闭 `Enable system notifications`

### 性能优化

#### JVM 参数配置

- **配置文件路径**
  - Windows：`<IDE_HOME>\bin\idea64.exe.vmoptions`
  - [其他系统配置参考](https://www.jetbrains.com/help/idea/tuning-the-ide.html)

## 二、代码编辑技巧

### 智能导航

#### 文件结构视图

- **快捷键**：`Ctrl + F12`
- **功能入口**：`Navigate > File Structure`
- [文档参考](https://www.jetbrains.com/help/idea/viewing-structure-of-a-source-file.html)

### 代码辅助

#### Inlay Hints

- **配置路径**：`Settings > Editor > Inlay Hints`
- **典型应用**：
  - 实时显示方法引用计数
  - 参数类型提示

## 三、代码分析与检索

### 引用追踪

#### Find Usages

- **操作路径**：右键符号 > `Find Usages` 或 `Alt + F7`
- **范围控制**：
  - 单文件/全局检索
  - 自定义作用域筛选
- [高阶用法](https://www.jetbrains.com/help/idea/find-highlight-usages.html)

## 四、插件生态

### 效率工具

- **Grep Console**
  - **功能**：控制台日志分级染色
  - [项目主页](https://github.com/krasa/GrepConsole)

