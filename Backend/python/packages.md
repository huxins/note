# Packages

## 一、数据序列化

### 1. PyYAML

#### 1.1. 安装

```sh
$ pip install PyYAML
```

#### 1.2. 加载 YAML

- yaml.safe_load

  构建简单的 Python 对象，如整数或列表。
  
  ```python
  import yaml
  
  yaml.safe_load(f.read())
  ```

