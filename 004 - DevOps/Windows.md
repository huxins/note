# Windows

## 一、网络

### TCP/IP

#### IP Forwarding

`IPEnableRouter` 用于全局控制整个系统的 IP 转发功能。

```powershell
Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters" -Name IPEnableRouter -Type DWord -Value 1
```

查看单个网络接口的转发功能。

```powershell
Get-NetIPInterface | Select-Object -Property ifIndex, InterfaceAlias, AddressFamily, ConnectionState, Forwarding | Sort-Object -Property ifIndex | Format-Table
```

启用所有网络接口的转发功能。

```powershell
Set-NetIPInterface -Forwarding Enabled
```

启用远程访问服务。

```powershell
Set-Service RemoteAccess -StartupType Automatic
Start-Service RemoteAccess
```

#### Active Probe

系统无法正确判断网络连接状态时，通过调整注册表配置，让系统不去主动探测网络连接状态。

```powershell
Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Services\NlaSvc\Parameters\Internet" -Name EnableActiveProbing -Type DWord -Value 0
```

## 二、命令

### reg

- reg **add**

  将新的子项或项添加到注册表中。

  ```powershell
  reg add "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters" /v IPEnableRouter /t REG_DWORD /d 1 /f
  ```

### route

查看路由表。

```powershell
route print -4
```

添加路由。

```powershell
route add 192.168.11.0 mask 255.255.255.0 192.168.10.245 -p
```

删除路由。

```powershell
route delete 192.168.11.0 mask 255.255.255.0
```

### sc

配置服务启动方式。

```powershell
sc config RemoteAccess start= auto
```

启动服务。

```powershell
sc start RemoteAccess
```

### netsh

- netsh **interface**

  查找网络接口的名称或索引。

  ```powershell
  netsh interface show interface
  netsh interface ipv4 show interfaces
  ```

  禁用或启用有线连接。

  ```powershell
  netsh interface set interface "YourInterfaceName" admin=disable
  netsh interface set interface "YourInterfaceName" admin=enable
  ```

- netsh **wlan**

  断开与无线网络的连接。

  ```powershell
  netsh wlan disconnect
  ```

### tracert

向目标发送 ICMP 请求，并以递增的 TTL 字段值来确定到达目标的路径。

```powershell
tracert 1.1.1.1
```

### diskpart

`diskpart` 可帮助管理计算机的驱动器（磁盘、分区、卷或虚拟硬盘）。

启动 `diskpart` 命令解释器，请在命令提示符下键入 `diskpart`。

显示计算机上的所有磁盘。

```powershell
list disk
```

将焦点切换到磁盘。

```powershell
select disk=<n>
```

从具有焦点的磁盘中删除所有分区或卷格式设置。

```powershell
clean
```

显示焦点磁盘的分区表。

```powershell
list partition
```

将焦点切换到分区。

```powershell
select partition=<n>
```

删除具有焦点的分区。

```powershell
delete partition
```

### fsutil

- fsutil **fsinfo**

  列出指定卷的特定于 NTFS 的卷信息。

  ```powershell
  fsutil fsinfo ntfsinfo C:
  ```

## 三、远程桌面服务

### Listening Port

远程桌面的侦听端口默认为 3389。可以通过修改注册表来更改。

```powershell
Set-ItemProperty -Path "HKLM:\System\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp" -Name PortNumber -Type DWord -Value 3389
```

## 四、安全

### 账户

#### 帐户锁定策略

可以在组策略编辑器 `gpedit.msc` 的以下位置配置帐户锁定策略：【计算机配置 \ Windows 设置 \ 安全设置 \ 帐户策略 \ 帐户锁定策略】。

- 帐户锁定阈值

  帐户锁定阈值确定登录尝试次数，失败将导致用户帐户被锁定。可以将登录尝试次数设置为 1 到 999，也可以通过将值设置为 0 来指定永远不会锁定帐户。

#### 本地账户

系统默认只能使用微软账户进行登录，可以通过一些被锁定的账户名来绕过限制。

```
no@thankyou.com
a@a.com
```

#### 修改密码

电脑已解锁的状态下，可以通过 `lusrmgr.msc` 重置密码。

#### 免密登录

配置注册表，启用无密码登录。

```powershell
Set-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\PasswordLess\Device" -Name DevicePasswordLessBuildVersion -Type DWord -Value 0
```

通过 `control userpasswords2` 或 `netplwiz` 打开用户账户界面，启用无密码登录。

### 屏幕保护

可以通过 `ms-settings:lockscreen` 快速进入锁屏界面设置。

使用以下命令，可以快速锁屏。

```cmd
%windir%\system32\rundll32.exe user32.dll,LockWorkStation
```

### 附件管理器

附件管理器在 Windows 中，用以帮助计算机防范不安全的附件，这些附件可能是随电子邮件接收的，也可能是来自 Internet 的不安全文件。

可以在组策略编辑器 `gpedit.msc` 的以下位置配置附件管理器：【用户配置 \ 管理模板 \ Windows 组件 \ 附件管理器】。

- 文件附件中不保留区域信息

  设置为 `已启用` 可以关闭限制。

  也可以通过修改注册表来更改。
  
  ```powershell
  Set-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\Attachments" -Name SaveZoneinformation -Type DWord -Value 1
  ```

### SMB

#### 不安全的来宾登录

假设已经配置好 SMB 服务器，却连不上 Samba 服务，可能是 SMB 服务使用了不安全的来宾登录。默认情况下，SMB 客户端将拒绝不安全的来宾登录。

可以在组策略编辑器 `gpedit.msc` 的以下位置启用不安全的来宾登录：【计算机配置 \ 管理模板 \ 网络 \ Lanman 工作站】。

- [在 SMB2 和 SMB3 中启用不安全的来宾登录](https://learn.microsoft.com/zh-cn/windows-server/storage/file-server/enable-insecure-guest-logons-smb2-and-smb3)

#### 协议版本

- [在 Windows 中检测、启用和禁用 SMBv1、SMBv2 和 SMBv3](https://learn.microsoft.com/zh-cn/windows-server/storage/file-server/troubleshoot/detect-enable-and-disable-smbv1-v2-v3)
- [Stop using SMB1](https://techcommunity.microsoft.com/t5/storage-at-microsoft/stop-using-smb1/ba-p/425858)

## 五、系统设置

### 休眠唤醒

[ACPI](https://en.wikipedia.org/wiki/ACPI) 定义了以下几种[休眠状态](https://en.wikipedia.org/wiki/ACPI#Global_states)：

- **S0**：正常工作状态。
- **S1**：CPU 停止执行指令，CPU 和 RAM 的电源保持不变，硬盘停转。唤醒时间 0 秒。
- **S2**：CPU 断电，*Dirty cache* 被刷新到 RAM。
- **S3**：Suspend to RAM，除内存外，其他设备停止工作，即**睡眠**状态。唤醒时间 0.5 秒。
- **S4**：Suspend to Disk，内存中的信息写入硬盘，所有部件停止，即**休眠**状态。唤醒时间 30 秒。
- **S5**：Shutdown，关机状态。

查看系统上可用的睡眠状态。

```cmd
powercfg /A
```

启用或禁用休眠功能。

```cmd
powercfg /H on
powercfg /H off
```

如果长时间睡眠后无法正常唤醒，可以进行以下尝试。

```
1、在【设备管理器】中的【系统设备】里找到【Intel(R) Management Engine Interface】，在其【电源管理】中取消【允许计算机关闭此设备以节约电源】。
2、在【控制面板\硬件和声音\电源选项】【选择电源按钮的功能】【更改当前不可用的设置】，取消【启用快速启动】。
3、将【控制面板\硬件和声音\电源选项】【更改计划设置】【更改高级电源设置】【睡眠】【允许混合睡眠】更改为关闭。
4、禁用休眠功能。
5、运行【rundll32.exe desk.cpl,InstallScreenSaver】，将屏幕保护程序设置为【无】。
6、更新 ACPI 电源驱动程序和芯片组驱动程序。
```

