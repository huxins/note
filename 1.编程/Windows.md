# Windows

## 一、网络

### 1.1. TCP/IP

#### 1.1.1. IP Forwarding

```powershell
# 1、打开 regedit，转到 [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters]。
# 2、修改 [IPEnableRouter] 键，将其数值数据设置为 [1]。
> Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters" -Name IPEnableRouter -Value 1
```

