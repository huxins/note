# PowerShell

## 一、Utility

### Out-File

将管道输出发送到文件。

- **-Encoding**

  指定目标文件的编码类型。

  - `ascii`：使用 ASCII（7 位）字符集。
  
    ```sh
    pip freeze | Out-File -Encoding ascii requirements.txt
    ```

## 二、Core

### About

#### 版本

通过 `$PSVersionTable` 变量查询。

```powershell
> $PSVersionTable
```

#### 执行策略

- **RemoteSigned**

  脚本可以运行。

获取当前执行策略。

```powershell
> Get-ExecutionPolicy
```

更改执行策略。

```powershell
> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
```

## 三、Management

### Set-ItemProperty

可以使用 `Set-ItemProperty` 来创建和更改注册表值和数据。

```powershell
> Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters" -Name IPEnableRouter -Value 1
> Get-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters"
```

