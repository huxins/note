# PowerShell

## 一、Utility

### 1.1. Out-File

将管道输出发送到文件。

- **-Encoding**

  指定目标文件的编码类型。

  - `ascii`：使用 ASCII（7 位）字符集。
  
    ```sh
    $ pip freeze | Out-File -Encoding ascii requirements.txt
    ```

## 二、Core

### 2.1. About

#### 2.1.1. 版本

通过 `$PSVersionTable` 变量查询。

```powershell
> $PSVersionTable
```

#### 2.1.2. 执行策略

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

