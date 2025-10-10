# Debian

## 一、网络

### networking.service

`networking.service` 负责管理网络接口的启动、停止和重新加载配置。当系统启动时，`networking.service` 负责根据配置文件启动网络接口。

它会读取 `/etc/network/interfaces` 文件，然后根据这些配置文件来启动和配置网络接口。它是一个 `oneshot` 单元，会在被调用后执行一个任务并退出，不会在后台运行。

默认情况下，所有网络接口都由 NetworkManager 管理，而 `networking.service` 不做任何事情。

在服务器上，通过编辑 `/etc/network/interfaces` 为一个或多个接口分配静态 IP 地址是很常见的，在这种情况下，这些接口不再由 NetworkManager 管理。

