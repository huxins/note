# Tomcat

[Apache Tomcat](https://tomcat.apache.org/) 是一款开源的轻量级 Web 服务器和 Servlet 容器，专为运行 Java 相关的 Web 应用（如 Servlet、JSP）而设计。

## 一、服务器配置

配置文件位于 Tomcat [`conf/server.xml`](https://tomcat.apache.org/tomcat-9.0-doc/config/index.html) 文件中。

### HTTP 连接

- [**maxHttpHeaderSize**](https://tomcat.apache.org/tomcat-9.0-doc/config/http.html#Attributes_Standard%20Implementation_maxHttpHeaderSize)

  提供 `maxHttpRequestHeaderSize` 和 `maxHttpResponseHeaderSize` 的默认值。如果未指定，则此属性设置为 8192 (8 KB)。
  
  ```xml
  <Connector port="8080" maxHttpHeaderSize="65536" protocol="HTTP/1.1" ... />
  ```

