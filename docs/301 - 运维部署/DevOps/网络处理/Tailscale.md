# Tailscale

## 一、配置

登录后，进入 [Keys](https://login.tailscale.com/admin/settings/keys) 生成一个 Auth key。[身份验证密钥](https://tailscale.com/kb/1085/auth-keys)将在生成时，指定的天数后[自动失效](https://tailscale.com/kb/1085/auth-keys#key-expiry)。

### 出口节点

> - [Exit Nodes | Tailscale Explained](https://youtu.be/Ad7D2pkFNdA)
> - [Advertise a device as an exit node](https://tailscale.com/kb/1103/exit-nodes?tab=linux#advertise-a-device-as-an-exit-node)
> - [关于“出口节点”和“允许局域网访问”的困惑](https://www.reddit.com/r/Tailscale/comments/1gmvrbf/confusion_about_exit_node_and_allow_lan_access/?tl=zh-hans)

`允许局域网访问` 开启后，允许客户端访问当前局域网上的其他设备，而不是让流量都通过出口节点。

### 子网路由

> - [Subnet Routers | Tailscale Explained](https://youtu.be/UmVMaymH1-s)
> - [我不懂 Tailscale 子网路由器是怎么工作的](https://www.reddit.com/r/Tailscale/comments/194zw9x/i_dont_get_how_tailscale_subnet_router_works/?tl=zh-hans)

## Reference

- [Tailscale 局域网互访简易教程](https://forum.naixi.net/thread-4559-1-1.html)

