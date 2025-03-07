## 当前架构

```text
note/
├── 基础架构 (000)
│   ├── API
│   ├── Protocol
│   ├── Hardware
│   ├── Software
│   ├── Methodology
│   └── Specification
├── 前端开发 (001)
│   ├── HTML
│   ├── CSS
│   ├── JavaScript
│   └── Web
├── 后端开发 (002)
│   ├── Python
│   ├── Java
│   ├── Node.js
│   └── C#
├── 系统与运维 (003)
│   ├── Linux
│   ├── Windows
│   ├── Command
│   └── DevOps
├── 数据库 (004)
│   ├── Database
│   └── SQL
└── 云计算 (005)
    └── Cloud
```

## 演进架构

```text
note/
├── 基础架构 (000)
│   ├── API
│   ├── Protocol
│   ├── Hardware
│   ├── Software
│   ├── Methodology
│   ├── Specification
│   └── ​**Middleware**      # 新增中间件（消息队列/缓存/API网关等）
├── 前端开发 (001)
│   ├── HTML
│   ├── CSS
│   ├── JavaScript
│   ├── Web
│   └── ​**Framework**       # 扩展前端框架（React/Vue等）
├── 后端开发 (002)
│   ├── Python
│   ├── Java
│   ├── Node.js
│   ├── C#
│   ├── ​**Go/Rust**         # 补充多语言支持
│   └── ​**Microservices**   # 新增微服务架构
├── 系统与运维 (003)
│   ├── Linux
│   ├── Windows
│   ├── Command
│   ├── DevOps
│   └── ​**Monitoring**      # 新增监控告警（Prometheus等）
├── 数据库 (004)            # 保持独立分类
│   ├── Database
│   ├── ​**SQL**             # 细化SQL语言
│   └── ​**NoSQL**           # 扩展非关系型数据库
└── 云计算 (005)
    ├── Cloud
    ├── ​**Virtualization**  # 新增虚拟化技术
    └── ​**Cloud Middleware** # 可选：云原生中间件服务
```

