# PowerShell

[PowerShell](https://github.com/PowerShell/PowerShell) 是微软开发的跨平台任务自动化工具和脚本语言，结合了命令行 Shell 的交互性与脚本语言的灵活性。

## 一、Cmdlet

### 管道操作

- [**Out-File**](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.utility/out-file)

  将管道输出发送到文件。

  - [-Encoding](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.utility/out-file#-encoding)

    指定目标文件的编码类型。

    ```powershell
    pip freeze | Out-File -Encoding ascii requirements.txt
    ```

### 版本信息

通过 [`$PSVersionTable`](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_powershell_editions#edition-in-psversiontable) 变量查询版本信息。

```powershell
$PSVersionTable
```

### 执行策略

PowerShell 执行策略是一项安全功能，用于控制 PowerShell 加载配置文件和运行脚本的条件。

获取当前执行策略。

```powershell
Get-ExecutionPolicy
```

更改执行策略。

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
```

- **RemoteSigned**

  脚本可以运行。

### 注册表操作

- [**Set-ItemProperty**](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.management/set-itemproperty)

  创建和更改注册表值和数据。
  
  ```powershell
  Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters" -Name IPEnableRouter -Value 1
  Get-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters"
  ```

