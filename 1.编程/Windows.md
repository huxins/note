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
  > netsh interface ipv4 show interfaces
  ```

### 2.5. tracert

向目标发送 ICMP 请求，并以递增的 TTL 字段值来确定到达目标的路径。

```powershell
> tracert 1.1.1.1
```

