# Windows

## 一、网络

### 1.1. TCP/IP

#### 1.1.1. IP Forwarding

```powershell
# 1、IPEnableRouter 用于全局控制整个系统的 IP 转发功能
> Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters" -Name IPEnableRouter -Type DWord -Value 1
# 2、查看单个网络接口的转发功能
> Get-NetIPInterface | Select-Object -Property ifIndex, InterfaceAlias, AddressFamily, ConnectionState, Forwarding | Sort-Object -Property ifIndex | Format-Table
# 3、启用所有网络接口的转发功能
> Set-NetIPInterface -Forwarding Enabled
# 4、启用远程访问服务
> Set-Service RemoteAccess -StartupType Automatic
> Start-Service RemoteAccess
```

#### 1.1.2. Active Probe

系统无法正确判断网络连接状态时，通过调整注册表配置，让系统不去主动探测网络连接状态。

```powershell
> Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Services\NlaSvc\Parameters\Internet" -Name EnableActiveProbing -Type DWord -Value 0
```

## 二、命令

### 2.1. reg

- reg **add**

  将新的子项或项添加到注册表中。

  ```powershell
  > reg add "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters" /v IPEnableRouter /t REG_DWORD /d 1 /f
  ```

### 2.2. route

查看路由表。

```powershell
> route print -4
```

添加路由。

```powershell
> route add 192.168.11.0 mask 255.255.255.0 192.168.10.245 -p
```

删除路由。

```powershell
> route delete 192.168.11.0 mask 255.255.255.0
```

### 2.3. sc

配置服务启动方式。

```powershell
> sc config RemoteAccess start= auto
```

启动服务。

```powershell
> sc start RemoteAccess
```

### 2.4. netsh

- netsh **interface**

  查找网络接口的名称或索引。

  ```powershell
  > netsh interface show interface
  > netsh interface ipv4 show interfaces
  ```

  禁用或启用有线连接。

  ```powershell
  > netsh interface set interface "YourInterfaceName" admin=disable
  > netsh interface set interface "YourInterfaceName" admin=enable
  ```

- netsh **wlan**

  断开与无线网络的连接。

  ```powershell
  > netsh wlan disconnect
  ```

### 2.5. tracert

向目标发送 ICMP 请求，并以递增的 TTL 字段值来确定到达目标的路径。

```powershell
> tracert 1.1.1.1
```

### 2.6. diskpart

`diskpart` 可帮助管理计算机的驱动器（磁盘、分区、卷或虚拟硬盘）。

启动 `diskpart` 命令解释器，请在命令提示符下键入 `diskpart`。

显示计算机上的所有磁盘。

```powershell
> list disk
```

将焦点切换到磁盘。

```powershell
> select disk=<n>
```

从具有焦点的磁盘中删除所有分区或卷格式设置。

```powershell
> clean
```

显示焦点磁盘的分区表。

```powershell
> list partition
```

将焦点切换到分区。

```powershell
> select partition=<n>
```

删除具有焦点的分区。

```powershell
> delete partition
```

## 三、远程桌面服务

### 3.1. Listening Port

远程桌面的侦听端口默认为 3389。可以通过修改注册表来更改。

```powershell
> Set-ItemProperty -Path "HKLM:\System\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp" -Name PortNumber -Type DWord -Value 3389
```

## 四、安全

### 4.1. 帐户锁定策略

可以在组策略编辑器 `gpedit.msc` 的以下位置配置帐户锁定策略：[计算机配置\Windows 设置\安全设置\帐户策略\帐户锁定策略]。

- 帐户锁定阈值

  帐户锁定阈值确定登录尝试次数，失败将导致用户帐户被锁定。可以将登录尝试次数设置为 1 到 999，也可以通过将值设置为 0 来指定永远不会锁定帐户。

### 4.2. 附件管理器

附件管理器在 Windows 中，用以帮助计算机防范不安全的附件，这些附件可能是随电子邮件接收的，也可能是来自 Internet 的不安全文件。

可以在组策略编辑器 `gpedit.msc` 的以下位置配置附件管理器：[用户配置\管理模板\Windows 组件\附件管理器]。

- 文件附件中不保留区域信息

  设置为 `已启用` 可以关闭限制。

也可以通过修改注册表来更改。

```powershell
> Set-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\Attachments" -Name SaveZoneinformation -Type DWord -Value 1
```

### 4.3. 本地账户

系统默认只能使用微软账户进行登录，可以通过一些被锁定的账户名来绕过限制。

```
no@thankyou.com
a@a.com
```

