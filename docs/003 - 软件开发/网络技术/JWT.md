# JWT

[JWT](https://datatracker.ietf.org/doc/html/rfc7519) 是一种用于在网络应用间传递信息的简洁标准，是目前较为流行的身份验证和授权解决方案之一。

## 一、背景

### 传统身份认证

> 集群部署需共享 Session（如数据库持久化），存在单点故障风险

```mermaid
graph LR
A[用户提交用户名和密码] --> B[服务端保存 Session 数据]
B --> C[返回 Session ID 至客户端 Cookie]
C --> D[后续请求需携带 Session ID]
D --> E[服务端通过 Session ID 验证身份]
```

### 无状态身份认证

> 服务端不存储 Session，用户凭证完全由客户端持有

- 跨服务/域名的用户信息传递能力
- 非对称加密支持（如 RSA）
- 天然适配微服务与分布式架构

## 二、核心原理

### 令牌生成与验证

```mermaid
graph LR
A[用户登录] --> B[服务端生成 JWT]
B --> C[返回 JWT 至客户端]
C --> D[客户端携带 JWT 发起请求]
D --> E[服务端验证签名/数据]
E --> F[授权访问资源]
```

### 数字签名

- 服务端使用密钥对 Header 和 Payload 签名
- 客户端篡改数据会导致签名验证失败

### 服务端传输方式

- **HTTP Header（推荐）**

  ```http
  Authorization: Bearer <token>
  ```

- **URL 参数（慎用）**

  ```
  https://api.example.com/data?token=xxx
  ```

## 三、数据结构

### 标准格式

```
Header.Payload.Signature（三段式 Base64URL 编码字符串）

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30
```

### Header

Header 部分是一个 JSON 对象，用于描述 JWT 的元数据。

```json
{
  "alg": "HS256",  // 签名算法（必填）
  "typ": "JWT"     // 令牌类型（固定值）
}
```

### Payload

Payload 部分是一个 JSON 对象，用于存放实际需要传递的数据。

- [**预定义字段**](https://datatracker.ietf.org/doc/html/rfc7519#section-4.1)

  ```
  1、iss (issuer)：签发人
  2、exp (expiration time)：过期时间
  3、sub (subject)：主题
  4、aud (audience)：受众
  5、nbf (Not Before)：生效时间
  6、iat (Issued At)：签发时间
  7、jti (JWT ID)：唯一标识符
  ```
  
  ```json
  {
    "iss": "https://auth.example.com",
    "exp": 1620000000,
    "sub": "user_12345",
    "aud": ["api://myapp", "webapp"],
    "nbf": 1619800000,
    "iat": 1619800000,
    "jti": "a1b2c3d4e5"
  }
  ```
  
- **自定义字段**

  JWT 默认以未加密形式传输，请勿在载荷中存储敏感或机密信息。

  ```json
  {
    "role": "admin",
    "preferred_lang": "zh-CN"
  }
  ```

### Signature

JWT 签名通过加密算法验证数据完整性。

其生成逻辑如下：

- 密钥安全：使用仅服务端持有的私密密钥（Secret Key），禁止客户端暴露

- 算法声明：基于 Header 中声明的签名算法（如 HS256、RS256）

- 签名计算：

  ```python
  signature = HMACSHA256(
    base64UrlEncode(header) + "." + base64UrlEncode(payload),
    secret_key
  )
  ```

## Reference

- [JSON Web Tokens - *JWT Debugger*](https://jwt.io/)
- [什么是单点登录？如何实现？](https://github.com/febobo/web-interview/issues/91)

