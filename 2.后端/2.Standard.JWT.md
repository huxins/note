# JSON Web Token

JSON Web Token 是一种用于在网络应用间传递信息的简洁标准，是目前较为流行的身份验证和授权解决方案之一。它本质上是一段由三部分组成的字符串，分别是 Header、Payload 和 Signature。

## 一、JWT 的使用场景

互联网服务离不开用户认证。一般流程如下所示：

```
1、用户向服务器发送用户名和密码。

2、服务器验证通过后，在当前 session 里面保存相关数据，比如用户角色、登录时间等等。

3、服务器向用户返回一个 session_id，写入用户的 Cookie。

4、用户随后的每一次请求，都会通过 Cookie，将 session_id 传回服务器。

5、服务器收到 session_id，找到前期保存的数据，由此得知用户的身份。
```

这种模式的主要缺点是扩展性不好。单机当然没有问题，如果是服务器集群，或者是跨域的服务导向架构，就要求 session 数据共享，每台服务器都能够读取 session。

一种解决方案是 session 数据持久化，写入数据库或别的持久层。各种服务收到请求后，都向持久层请求数据。这种方案的优点是架构清晰，缺点是工程量比较大。另外，持久层万一挂了，就会单点失败。

另一种方案是服务器索性不保存 session 数据了，所有数据都保存在客户端，每次请求都发回服务器。JWT 就是这种方案的一个代表。

JWT 的主要优势是可以使用非对称加密算法生成签名，从而实现无需在服务端保存会话信息的身份认证和授权。另外，其还可以轻松地在不同的应用程序中传递用户信息，方便了系统的整合和扩展。

然而，由于 JWT 本身存在着一些缺点，例如无法撤回或更新已发布的 token，也无法防止重放攻击，因此在使用时需要权衡其安全性和实际需求。

## 二、JWT 的原理

JWT 的原理是，服务器认证以后，生成一个 JSON 对象，发回给用户，就像下面这样。

```json
{
  "姓名": "张三",
  "角色": "管理员",
  "到期时间": "2018年7月1日0点0分"
}
```

用户与服务端通信的时候，都要发回这个 JSON 对象。服务器完全只靠这个对象认定用户身份。为了防止用户篡改数据，服务器在生成这个对象的时候，会加上签名。

如此，服务器就不保存任何 session 数据了，也就是说，服务器变成无状态了，从而比较容易实现扩展。

## 三、JWT 的数据结构

实际的 JWT 大概就像下面这样。

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.

eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3MTE1OTQ3MiwianRpIjoiN2E3MDc4NzEtYjI1NC00OWJkLWE5MDktYWYyMTk5ZmZmNWYxIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImFkbWluIiwibmJmIjoxNjcxMTU5NDcyLCJleHAiOjE2NzExNjAzNzJ9.

Uejeuj4YJtv6tlsQ86KRh08wBV1-G2EmyLpva24onW4
```

它是一个很长的字符串，中间用 `.` 分隔成三个部分。JWT 内部是没有换行的，这里只是为了便于展示，将它写成了几行。

JWT 的三个部分依次如下。

```
1、Header
2、Payload
3、Signature
```

写成一行，就是下面的样子。

```
Header.Payload.Signature
```

### 3.1. Header

Header 部分是一个 JSON 对象，描述 JWT 的元数据，通常是下面的样子。

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

上面代码中，`alg` 属性表示签名的算法，默认是 HMAC SHA256 (HS256)；`typ` 属性表示这个令牌的类型，JWT 令牌统一写为 `JWT`。

最后，将上面的 JSON 对象使用 Base64URL 算法转成字符串。

### 3.2. Payload

Payload 部分也是一个 JSON 对象，用来存放实际需要传递的数据。JWT 规定了 7 个官方字段，供选用。

```
1、iss (issuer)：签发人
2、exp (expiration time)：过期时间
3、sub (subject)：主题
4、aud (audience)：受众
5、nbf (Not Before)：生效时间
6、iat (Issued At)：签发时间
7、jti (JWT ID)：编号
```

除了官方字段，也可以在这个部分根据需求定义私有字段。

JWT 默认是不加密的，任何人都可以读到，所以不要把秘密信息放在这个部分。

这个 JSON 对象也要使用 Base64URL 算法转成字符串。

### 3.3. Signature

Signature 部分是对前两部分的签名，防止数据篡改。

首先，需要指定一个密钥。这个密钥只有服务器才知道，不能泄露给用户。然后，使用 Header 里面指定的签名算法，按照下面的公式产生签名。

```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

算出签名以后，把 Header、Payload、Signature 三个部分拼成一个字符串，每个部分之间用 `.` 分隔，就可以返回给用户。

## 四、JWT 的使用方式

客户端收到服务器返回的 JWT，可以储存在 Cookie 里面，也可以储存在 localStorage。

此后，客户端每次与服务器通信，都要带上这个 JWT。你可以把它放在 Cookie 里面自动发送，但是这样不能跨域，所以更好的做法是放在 HTTP 请求的头信息 `Authorization` 字段里面。

```
Authorization: Bearer <token>
```

另一种做法是，跨域的时候，JWT 就放在 POST 请求的数据体里面。

