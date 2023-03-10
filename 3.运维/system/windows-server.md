# Windows

## 一、Windows Server

### 1.6. Remote

#### 1.6.2. 远程桌面服务

##### 1.6.2.5. 访问远程桌面资源

###### 1.6.2.5.1. 更改计算机上的远程桌面的侦听端口

通过远程桌面客户端连接到计算机时，计算机上的远程桌面功能会通过定义的侦听端口（默认情况下为 3389）“侦听”连接请求。可以通过修改注册表来更改 Windows 计算机上的侦听端口。

```
1、启动注册表编辑器。（在“运行”框中键入 regedit）
2、导航到以下注册表子项：[HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp]
3、查找 PortNumber
4、单击“编辑”“修改”，然后单击“十进制”。
5、键入新端口号，然后单击“确定”。
6、关闭注册表编辑器，然后重新启动计算机。
```

下次使用远程桌面连接连接到此计算机时，必须键入新端口。如果正在使用防火墙，请确保将防火墙配置为允许连接到新端口号。

## 二、排除故障

### 2.1. Windows

#### 2.1.7. 网络

##### 2.1.7.7. TCP/IP 通信

###### 2.1.7.7.1. 任务栏网络状态

系统无法正确判断网络连接状态时，通过调整注册表配置，让系统不去主动探测你的网络连接状态。

```
1、启动注册表编辑器。（在“运行”框中键入 regedit）
2、导航到以下注册表子项：[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\NlaSvc\Parameters\Internet]
3、查找 EnableActiveProbing
4、设置为 0
```

