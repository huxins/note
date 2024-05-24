# CSharp

## 一、类型

CSharp 是一种强[类型](https://learn.microsoft.com/zh-cn/dotnet/csharp/fundamentals/types/)语言。每个变量和常量都有一个类型，每个求值的表达式也是如此。

### 1.1. 内置类型

CSharp 提供了一组标准的[内置类型](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/builtin-types/built-in-types)。

#### 1.1.1. char

`char` 类型表示 Unicode UTF-16 字符。

```c#
char firstLetter = 'C';
```

#### 1.1.2. integer

所有的整型数值类型均为值类型。

| C#    | Size                  | .NET           |
| ----- | --------------------- | -------------- |
| `int` | Signed 32-bit integer | `System.Int32` |

#### 1.1.3. float

所有的浮点型数值类型均为值类型。

| C#        | Size      | .NET             |
| --------- | --------- | ---------------- |
| `float`   | 4 个字节  | `System.Single`  |
| `double`  | 8 个字节  | `System.Double`  |
| `decimal` | 16 个字节 | `System.Decimal` |

若要创建 `float` 类型，请在数字后面追加字母 `F`。

```c#
Console.WriteLine(0.25F.GetType());
```

若要创建 `double` 类型，只需输入一个十进制数字即可。

```c#
Console.WriteLine(2.625.GetType());
```

若要创建 `decimal` 类型，请在数字后面追加字母 `M`。

```c#
Console.WriteLine(12.39816M.GetType());
```

#### 1.1.4. bool

```c#
Console.WriteLine(true);
Console.WriteLine(false);
```

#### 1.1.5. string

转义字符序列以反斜杠 `\` 开头，后跟要转义的字符。例如，`\n` 序列将添加一个新行，而 `\t` 序列将添加一个制表符。

```c#
Console.WriteLine("Hello\nWorld!");
Console.WriteLine("Hello\tWorld!");
```

逐字字符串将保留所有空格和字符，而无需转义反斜杠。要创建逐字字符串，请在文本字符串的前面使用 `@` 指令。

```c#
Console.WriteLine(@"    c:\source\repos    
        (this is where your code goes)");
```

还可使用 `\u` 转义序列在文本字符串中添加编码字符。

```c#
Console.WriteLine("\u3053\u3093\u306B\u3061\u306F World!");
```

字符串模板可以将多个值合并为单个文本字符串。

```c#
string message = $"{greeting} {firstName}!";
```

