# Pydantic

[Pydantic](https://github.com/pydantic/pydantic) 使用 Python 类型提示进行数据验证。

## 一、模式

Pydantic 提供了[四种方法](https://docs.pydantic.dev/latest/why/#dataclasses-typeddict-more)来创建模式并执行验证和序列化。

- **[继承 `BaseModel` 类](https://docs.pydantic.dev/latest/concepts/models/#basic-model-usage)**
- [**动态模型生成**](https://docs.pydantic.dev/latest/concepts/models/#dynamic-model-creation)
- [**Pydantic 数据类**](https://docs.pydantic.dev/latest/concepts/dataclasses/#dataclass-config)
- **基于 `TypedDict` 的验证**

### BaseModel

在 Pydantic 中定义模式的主要方法之一是通过[模型](https://docs.pydantic.dev/latest/concepts/models/)。模型只是继承自 [BaseModel](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel) 并将字段定义为带注释属性的类。

```python
from pydantic import BaseModel

class User(BaseModel):
    id: int
    name: str
    age: int = 18
```

