# System 类库

## 一、工具类

### 1.1. Random

伪随机数生成器。

实例方法：

- Random.**Next**(*Int32*, *Int32*)

  返回在指定范围内的任意整数。

  ```c#
  Random dice = new Random();
  int roll = dice.Next(1, 7);  // 该随机数大于等于 1，小于 7。
  ```

