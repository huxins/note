# OAuth

## 一、客户端注册

### 1.1. Confidential

根据 [OAuth 2.0 规范](https://tools.ietf.org/html/rfc6749#section-2.1)，应用程序可以被分类为 `confidential` 或 `public`。主要区别在于应用程序是否能够安全地保存凭证（例如 `PUBLIC_KEY` and `SECRET_KEY`）。这会影响应用程序可以使用的身份验证类型。

### 1.2. 重定向 URI

有些应用程序可能无法提供一个固定的、可重定向的 URI，或者它们可能是在不支持 HTTP 重定向的环境中运行的。在这种情况下，可以使用 Out-Of-Band 授权流程，并将回调地址设置为 `urn:ietf:wg:oauth:2.0:oob`。

这种情况下，用户通常会在授权成功后得到一个授权码，然后手动将该授权码输入到应用程序中，或者应用程序提供其他途径来获取授权码，从而完成授权过程。

