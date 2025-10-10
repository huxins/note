# ufw

[`ufw`](https://manpages.ubuntu.com/manpages/noble/en/man8/ufw.8.html) 是一个简单易用的防火墙管理工具，用于管理 Linux 系统中的 `iptables` 防火墙规则。`ufw` 提供了一种更用户友好的方式来配置防火墙，而无需直接操作复杂的 `iptables` 命令。

`ufw` 的配置文件通常位于：

- **主配置文件**：`/etc/ufw/ufw.conf`
- **默认规则文件**：`/etc/default/ufw`
- **应用配置文件**：`/etc/ufw/applications.d/`

设置默认规则。

```sh
ufw default deny incoming
ufw default allow outgoing
```

允许或拒绝端口和服务。

```sh
ufw allow ssh            # 允许 SSH（22端口）
ufw allow http           # 允许 HTTP（80端口）
ufw allow https          # 允许 HTTPS（443端口）
ufw allow 3000           # 允许 3000 端口
ufw deny 3306            # 拒绝 3306 端口
ufw delete allow 22      # 删除规则（允许 22端口）
```

允许特定 IP 地址访问。

```sh
ufw allow from 192.168.1.100                 # 允许特定 IP 的所有访问
ufw allow from 192.168.1.100 to any port 22  # 允许特定 IP 访问某个端口
```

显示防火墙状态。

```sh
ufw status          # 显示防火墙状态和规则
ufw status verbose  # 显示详细信息
```

启用和禁用防火墙。

```sh
ufw enable     # 启用防火墙
ufw disable    # 禁用防火墙
```

重置所有规则。

```sh
ufw reset      # 重置所有规则（需要重新启用防火墙）
```

