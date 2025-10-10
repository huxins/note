# Marshmallow

[Marshmallow](https://github.com/marshmallow-code/marshmallow) 是一个与 ORM、ODM 和框架无关的库，用于将复杂数据类型与 Python 数据类型相互转换。

**安装**：

```sh
pip install -U marshmallow
```

## 一、声明模式

```python
import datetime as dt

# 基本的 User 模型
class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email
        self.created_at = dt.datetime.now()

    def __repr__(self):
        return "<User(name={self.name!r})>".format(self=self)
```

### 类结构

通过定义[类结构](https://marshmallow.readthedocs.io/en/stable/quickstart.html#declaring-schemas)，将属性名称映射至 [`Field`](https://marshmallow.readthedocs.io/en/stable/marshmallow.fields.html#marshmallow.fields.Field) 对象以创建模式。

```python
from marshmallow import Schema, fields

class UserSchema(Schema):
    name = fields.Str()
    email = fields.Email()
    created_at = fields.DateTime()
```

### 字典

可通过 [`from_dict`](https://marshmallow.readthedocs.io/en/stable/top_level.html#marshmallow.Schema.from_dict) 方法，基于字段字典构建模式体系。

```python
from marshmallow import Schema, fields

UserSchema = Schema.from_dict(
    {
        "name": fields.Str(),
        "email": fields.Email(),
        "created_at": fields.DateTime()
    }
)
```

## 二、序列化对象

### 序列化

通过调用 `schema` 的 [`dump`](https://marshmallow.readthedocs.io/en/stable/top_level.html#marshmallow.Schema.dump) 方法执行[对象序列化](https://marshmallow.readthedocs.io/en/stable/quickstart.html#serializing-objects-dumping)，可返回格式化数据。

```python
from pprint import pprint

user = User(name="Monty", email="monty@python.org")

schema = UserSchema()
result = schema.dump(user)
pprint(result)
```

可调用 [`dumps`](https://marshmallow.readthedocs.io/en/stable/top_level.html#marshmallow.Schema.dumps) 方法，将对象序列化为 JSON 格式字符串。

```python
json_result = schema.dumps(user)
pprint(json_result)
```

### 反序列化

[`load`](https://marshmallow.readthedocs.io/en/stable/top_level.html#marshmallow.Schema.load) 方法作为 `dump` 的逆过程，可对输入字典执行校验及[反序列化操作](https://marshmallow.readthedocs.io/en/stable/quickstart.html#deserializing-objects-loading)，并转换为应用层数据结构。

```python
from pprint import pprint

user_data = {
    "created_at": "2014-08-11T05:26:03.869245",
    "email": "ken@yahoo.com",
    "name": "Ken",
}

schema = UserSchema()
result = schema.load(user_data)
pprint(result)
```

若需将数据反序列化为对象，应在 `Schema` 类中定义反序列化方法并使用 [`@post_load`](https://marshmallow.readthedocs.io/en/stable/marshmallow.decorators.html#marshmallow.decorators.post_load) 装饰器进行修饰。

```python
from marshmallow import Schema, fields, post_load

class UserSchema(Schema):
    name = fields.Str()
    email = fields.Email()
    created_at = fields.DateTime()

    @post_load
    def make_user(self, data, **kwargs):
        return User(**data)

user_data = {"name": "Ronnie", "email": "ronnie@stones.com"}
schema = UserSchema()
result = schema.load(user_data)
print(result)
```

### 对象集合

处理可迭代[对象集合](https://marshmallow.readthedocs.io/en/stable/quickstart.html#handling-collections-of-objects)时，应设置 [`many`](https://marshmallow.readthedocs.io/en/stable/marshmallow.schema.html#marshmallow.schema.Schema.Meta.many) 参数为 `True`。

```python
user1 = User(name="Mick", email="mick@stones.com")
user2 = User(name="Keith", email="keith@stones.com")
users = [user1, user2]

schema = UserSchema(many=True)
result = schema.dump(users)
print(result)
```

### 过滤输出

可通过 [`only`](https://marshmallow.readthedocs.io/en/stable/marshmallow.schema.html#marshmallow.schema.Schema) 参数指定所需输出字段，从而避免输出所有声明的字段。

```python
summary_schema = UserSchema(only=("name", "email"))
summary_schema.dump(user)
```

还可以通过传入 [`exclude`](https://marshmallow.readthedocs.io/en/stable/marshmallow.schema.html#marshmallow.schema.Schema) 参数来排除字段。

```python
summary_schema = UserSchema(exclude=("created_at",))
summary_schema.dump(user)
```

或者通过 [`Meta`](https://marshmallow.readthedocs.io/en/stable/top_level.html#marshmallow.Schema.Meta) 进行配置。

```python
class UserSchema(Schema):
    class Meta:
        exclude = ['password']
```

### 未知字段

默认配置下，当检测到数据中存在模式[未定义的字段](https://marshmallow.readthedocs.io/en/stable/quickstart.html#handling-unknown-fields)时，[`load`](https://marshmallow.readthedocs.io/en/stable/top_level.html#marshmallow.Schema.load) 方法将显式抛出 [`ValidationError`](https://marshmallow.readthedocs.io/en/stable/marshmallow.exceptions.html#marshmallow.exceptions.ValidationError) 异常。

可以使用 [`unknown`](https://marshmallow.readthedocs.io/en/stable/top_level.html#marshmallow.Schema.Meta.unknown) 选项修改此行为。

```python
from marshmallow import Schema, fields, post_load, EXCLUDE

class DailyReportSchema(Schema):
    creator = fields.String(data_key='createName', required=True)
    creation_time = fields.DateTime(data_key='createTime', format='%Y-%m-%d %H:%M', required=True)
    work_today = fields.String(data_key='day2', required=True)
    plan_tomorrow = fields.String(data_key='day1', required=True)

    class Meta:
        unknown = EXCLUDE

    @post_load
    def make_daily_report(self, data, **kwargs):
        return DailyReport(**data)
```

### 数据预处理

通过 [`@pre_load`](https://marshmallow.readthedocs.io/en/stable/marshmallow.decorators.html#marshmallow.decorators.pre_load) 装饰器可在 `Schema` 类中定义预处理方法，该方法会在 [`load`](https://marshmallow.readthedocs.io/en/stable/top_level.html#marshmallow.Schema.load) 方法执行验证及反序列化操作前介入，常用于实现数据清洗或格式转换等预处理逻辑。

```python
from marshmallow import Schema, fields, pre_load

class MySchema(Schema):
    name = fields.String()

    @pre_load
    def process_data(self, data, **kwargs):
        data['name'] = data['name'].strip().title()
        return data
```

