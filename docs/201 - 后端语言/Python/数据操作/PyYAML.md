# PyYAML

[PyYAML](https://github.com/yaml/pyyaml) 是 Python 生态中一个功能完备的 YAML 解析与生成框架。

**安装**：

```sh
pip install pyyaml
```

## 加载 YAML

- [**safe_load**](https://pyyaml.org/wiki/PyYAMLDocumentation#loading-yaml)

  将 YAML 文档转换为 Python 对象。

  ```python
  import yaml
  
  yaml.safe_load(f.read())
  ```

