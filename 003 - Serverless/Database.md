# Database

## 一、阿里云

### RDS MySQL

[RDS MySQL Serverless](https://help.aliyun.com/zh/rds/apsaradb-rds-for-mysql/rds-mysql-serverless) 计算资源的单位是 RCU，1 个 RCU 约等于 2 GB 内存及对应 CPU。当前最小 0.5 RCU、最大 32 RCU，扩缩容的粒度为 0.5 RCU。

RDS MySQL Serverless 存储空间最小 20 GB，最大 32 TB。

存储费用每月最小成本为 12.95 元。

| 收费项   | 标准单价    | 优惠单价    |
| -------- | ----------- | ----------- |
| RCU      | 0.33 RCU/H  | 0.17 RCU/H  |
| 存储空间 | 0.0017 GB/H | 0.0009 GB/H |

可以开启自动启停功能，如果实例在 10 分钟内无连接，实例自动暂停。有任何连接请求时，实例自动启动。启动过程约 6 ~ 40 秒，根据不同的实例库表状态会有浮动。在启动过程中，实例不可用。

RDS 支持外网地址访问，只需要为 RDS 设置外网地址，外部服务器可通过公网 IP 地址访问 RDS。申请外网地址和后续产生的公网流量[暂不收费](https://help.aliyun.com/zh/rds/apsaradb-rds-for-mysql/how-to-access-alibaba-cloud-rds-from-external-servers)。

如果申请了公网地址且白名单全放开，可能会被外部恶意扫描导致不会自动暂停。建议释放公网地址或修改白名单。

连接数可在实例详情页左侧，选择监控与报警，查看会话连接指标。

