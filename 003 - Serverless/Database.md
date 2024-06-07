# Database

## 一、阿里云

### RDS MySQL

[RDS MySQL Serverless](https://help.aliyun.com/zh/rds/apsaradb-rds-for-mysql/rds-mysql-serverless) 计算资源的单位是 RCU，1 个 RCU 约等于 2 GB 内存及对应 CPU。

配置最小为 0.5 RCU、最大 32 RCU，扩缩容的粒度为 0.5 RCU。

RDS MySQL Serverless 存储空间最小为 20 GB，最大 32 TB。存储费用每月最小成本为 12.95 元。

计算节点可以开启自动启停功能，如果实例在 10 分钟内无连接，实例自动暂停。有任何连接请求时，实例自动启动。启动过程约 6 ~ 40 秒，根据不同的实例库表状态会有浮动。在启动过程中，实例不可用。

连接数可在实例详情页左侧，选择监控与报警，查看会话连接指标。

RDS 支持外网地址访问，只需要为 RDS 设置外网地址，外部服务器可通过公网 IP 地址访问 RDS。申请外网地址和后续产生的公网流量[暂不收费](https://help.aliyun.com/zh/rds/apsaradb-rds-for-mysql/how-to-access-alibaba-cloud-rds-from-external-servers)。

如果申请了公网地址且白名单全放开，可能会被外部恶意扫描导致不会自动暂停。建议释放公网地址或修改白名单。

[RDS Data API Service](https://help.aliyun.com/zh/rds/apsaradb-rds-for-mysql/introduction-to-data-api-features) 提供了数据库操作接口，用户可以通过 HTTPS 请求或 SDK 的方式与数据库进行交互，从而实现对 RDS Serverless 实例 Web 服务接口的使用。

| 收费项   | 标准单价    | 优惠单价    |
| -------- | ----------- | ----------- |
| RCU      | 0.33 RCU/H  | 0.17 RCU/H  |
| 存储空间 | 0.0017 GB/H | 0.0009 GB/H |

### PolarDB MySQL

[PolarDB MySQL Serverless](https://help.aliyun.com/zh/polardb/polardb-for-mysql/user-guide/overview-27) 基于 PolarDB 共享存储的一写多读架构，提供跟随系统业务负载的动态弹性扩缩容能力。

Serverless 的计算节点包括主节点和只读节点，只读节点个数可以为 0，主节点 PCU 配置最小为 1。

计算节点以 PCU 为计费单位，1 个 PCU 约等于 1 核 2 GB 的资源。

PolarDB MySQL Serverless 存储空间最小为 20 GB。

| 收费项   | 标准单价    | 优惠单价  |
| -------- | ----------- | --------- |
| PCU      | 0.4 PCU/H   | 0.2 PCU/H |
| 存储空间 | 0.0016 GB/H |           |

