# PyYAML

## 一、安装

```sh
$ pip install pyyaml
```

## 二、加载 YAML

- **safe_load**

  将 YAML 文档转换为 Python 对象。

  ```python
  import yaml
  
  yaml.safe_load(f.read())
  ```

