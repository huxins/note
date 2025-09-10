# Sublime Text 3

[Sublime Text 3](https://www.sublimetext.com/3) 是一款为代码、标记语言和纯文本而生的文本编辑器。

## 一、环境配置

### Build Systems

Sublime Text 提供 [*build systems*](https://www.sublimetext.com/docs/build_systems.html)，允许用户运行外部程序。

- **Python**

  ```json
  {
      "cmd": ["D:/python.exe", "-u", "$file"],
      "file_regex": "^[ ]*File \"(...*?)\", line ([0-9]*)",
      "selector": "source.python",
      "encoding": "cp936"
  }
  ```

## 二、Packages

[Packages](https://www.sublimetext.com/docs/packages.html) 是 Sublime Text 所使用的资源文件集合。

### Package Control

[Package Control](https://packagecontrol.io/) 让查找、安装和更新包变得非常简单。

- **安装包管理器**

  打开命令面板 `Ctrl + Shift + P`，输入 `Install Package Control`，按回车。

- **安装包**

  Package Control 由命令面板驱动。

  要打开命令面板，请按：

  - Win、Linux：`Ctrl + Shift + P`
  - Mac：`Cmd + Shift + P`

所有 Package Control 命令都以 `Package Control:` 开头，因此首先键入 `Package`，将显示许多命令。

- **Install Package**：显示可安装的所有可用软件包的列表。这将包括默认频道中的所有包，以及您添加的存储库中的任何包。

### Plugins

#### Emmet

[Emmet](https://packagecontrol.io/packages/Emmet) 是许多流行文本编辑器的插件，它极大地改进了 HTML 和 CSS 工作流程。

#### SideBarEnhancements

[SideBarEnhancements](https://packagecontrol.io/packages/SideBarEnhancements) 是侧边栏工具与增强功能，如文件与文件夹管理。

**快捷键绑定**：

```json
[
  {
    "keys": [
      "ctrl+alt+e"
    ],
    "command": "open_dir",
    "args": {
      "dir": "$file_path",
      "file": "$file_name"
    }
  }
]
```

#### SublimeCodeIntel

[SublimeCodeIntel](https://packagecontrol.io/packages/SublimeCodeIntel) 是全功能代码智能和智能自动补全引擎。

> 配置文件位于 `Preferences -> Package Settings -> SublimeCodeIntel -> Settings - User`

- **Python**

  配置 Python 相关环境。

  > `codeintel_scan_extra_dir` 需包含的目录可以通过 `sys.path` 查看。
  
  ```json
  {
      "codeintel_language_settings": {
          "Python": {
              "python": "%LocalAppData%\\Programs\\Python\\Python310\\python.exe",
              "codeintel_scan_extra_dir": [
                  "%LocalAppData%\\Programs\\Python\\Python310",
                  "%LocalAppData%\\Programs\\Python\\Python310\\DLLs",
                  "%LocalAppData%\\Programs\\Python\\Python310\\lib",
                  "%LocalAppData%\\Programs\\Python\\Python310\\lib\\site-packages",
                  "%LocalAppData%\\Programs\\Python\\Python310\\Lib\\idlelib"
              ],
              "codeintel_scan_files_in_project": true,
              "codeintel_selected_catalogs": []
          }
      }
  }
  ```

  **快捷键绑定**：

  > 键盘配置文件位于 `Preferences -> Package Settings -> SublimeCodeIntel -> Key Bindings - User`

  ```json
  [
    {
      "keys": [
        "alt+/"
      ],
      "command": "code_intel_auto_complete"
    },
    {
      "keys": [
        "alt+right"
      ],
      "command": "goto_python_definition"
    },
    {
      "keys": [
        "alt+left"
      ],
      "command": "back_to_python_definition"
    }
  ]
  ```

  > 鼠标配置文件位于 `Preferences -> Package Settings -> SublimeCodeIntel -> Mouse Bindings - User`

  ```json
  [
    {
      "button": "button1",
      "modifiers": [
        "ctrl"
      ],
      "command": "goto_python_definition",
      "press_command": "drag_select"
    }
  ]
  ```

