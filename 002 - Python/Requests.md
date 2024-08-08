# Requests

[Requests](https://github.com/psf/requests) 是一个简单而优雅的 HTTP 库。

可以通过 `pip` 安装：

```sh
python -m pip install requests
```

## 二、发出请求

### 2.1. POST

这是发出 HTTP POST 请求的方式：

```python
r = requests.post('https://httpbin.org/post', data={'key': 'value'})
```

- requests.**post**(*url*, *data*=*None*, *json*=*None*, ***kwargs*)

