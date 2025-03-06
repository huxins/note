# Tomcat

## 一、服务器配置

配置文件位于 Tomcat `conf/server.xml` 文件中。

## 二、Connectors

### HTTP/1.1

#### Attributes

##### Standard Implementation

- **maxHttpHeaderSize**

  提供 `maxHttpRequestHeaderSize` 和 `maxHttpResponseHeaderSize` 的默认值。如果未指定，则此属性设置为 8192 (8 KB)。
  
  ```xml
  <Connector port="8080" maxHttpHeaderSize="65536" protocol="HTTP/1.1" ... />
  ```

## Reference

- [Apache Tomcat 9 配置参考](https://tomcat.apache.org/tomcat-9.0-doc/config/index.html)

