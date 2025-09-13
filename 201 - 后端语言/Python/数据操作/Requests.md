# Requests

[Requests](https://github.com/psf/requests) 是一个简单而优雅的 HTTP 库。

**安装**：

```sh
python -m pip install requests
```

## 发送请求

### POST

[`requests.post`](https://requests.readthedocs.io/en/latest/api/#requests.post) 是发送 HTTP POST 请求的方式。

默认以 `application/x-www-form-urlencoded` 编码方式提交表单数据。

```python
r = requests.post('https://httpbin.org/post', data={'key': 'value'})
print(r.text)
```

