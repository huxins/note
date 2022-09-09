# 安全插件

## 密码验证

### 密码验证插件选项

- validate_password_policy

强制执行的密码安全策略。

修改安全等级：

```sql
SELECT @@validate_password_policy;
SET GLOBAL validate_password_policy = 0;
```

## 参见

- [Security Plugins - MySQL](https://dev.mysql.com/doc/refman/5.7/en/security-plugins.html)

