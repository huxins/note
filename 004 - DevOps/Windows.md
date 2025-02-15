# Windows



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

