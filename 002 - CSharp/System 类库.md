# System 类库

## 一、工具

### Random

伪随机数生成器。

实例方法：

- Random.**Next**(*Int32*, *Int32*)

  返回在指定范围内的任意整数。

  ```c#
  Random dice = new Random();
  int roll = dice.Next(1, 7);  // 该随机数大于等于 1，小于 7。
  ```

## 二、类型

### String

将文本表示为 UTF-16 代码单元的序列。

静态方法：

- String.**IsNullOrWhiteSpace**(*String*)

  指示指定的字符串是 `null`、空还是仅由空白字符组成。

