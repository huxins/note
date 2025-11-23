const Web = ["./Web/HAProxy", "./Web/Nginx", "./Web/Tomcat"];

const 存储系统 = ["./存储系统/MinIO"];

const 流水线 = ["./流水线/Gitea"];

const 网络处理 = ["./网络处理/Dnsmasq", "./网络处理/Shadowsocks"];

const 虚拟容器 = ["./虚拟容器/Proxmox VE", "./虚拟容器/Docker"];

const DevOps = [
  {
    title: "Web",
    children: Web,
  },
  {
    title: "存储系统",
    children: 存储系统,
  },
  {
    title: "流水线",
    children: 流水线,
  },
  {
    title: "网络处理",
    children: 网络处理,
  },
  {
    title: "虚拟容器",
    children: 虚拟容器,
  },
];

module.exports = DevOps;
