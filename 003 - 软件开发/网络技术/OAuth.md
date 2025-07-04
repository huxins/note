# OAuth

## 一、客户端注册

### 客户端类型

根据 [OAuth 2.0](https://datatracker.ietf.org/doc/html/rfc6749#section-2.1) 规范，客户端可分为两类：

| 类型             | 安全性要求                 | 适用场景             | 认证方式限制         |
| ---------------- | -------------------------- | -------------------- | -------------------- |
| **Confidential** | 需安全存储凭证（如密钥对） | 服务端应用、微服务   | 支持高安全性认证流程 |
| **Public**       | 无法安全存储凭证           | 单页应用、移动端应用 | 仅允许简化模式等流程 |

### 重定向 URI

#### 标准配置要求

- 需预先在授权服务器注册固定 URI
- 用于接收授权码（Authorization Code）或访问令牌（Access Token）

#### OOB 流程（Out-of-Band）

> 客户端无法提供固定 URI（如命令行工具、IoT 设备）
>
> 运行环境不支持 HTTP 重定向（如电视/智能硬件应用）

- 设置回调地址为 `urn:ietf:wg:oauth:2.0:oob`
- 用户完成授权后**手动复制授权码**到客户端
- 客户端通过独立通道提交授权码换取令牌

