# CSharp

[C#](https://learn.microsoft.com/zh-cn/dotnet/csharp/tour-of-csharp/overview) 语言是适用于 [.NET](https://learn.microsoft.com/zh-cn/dotnet/) 平台的最流行语言。

## 一、类型

CSharp 是一种强[类型](https://learn.microsoft.com/zh-cn/dotnet/csharp/fundamentals/types/)语言。每个变量和常量都有一个类型，每个求值的表达式也是如此。

### 内置类型

CSharp 提供了一组标准的[内置类型](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/builtin-types/built-in-types)。

- **char**

  [`char`](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/builtin-types/char) 类型表示 Unicode UTF-16 字符。
  
  ```c#
  char firstLetter = 'C';
  ```

- **int**

  [`int`](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/builtin-types/integral-numeric-types) 类型表示整数。所有的整型数值类型均为值类型。
  
  | C#    | Size               | .NET                                                         |
  | ----- | ------------------ | ------------------------------------------------------------ |
  | `int` | 带符号的 32 位整数 | [`System.Int32`](https://learn.microsoft.com/zh-cn/dotnet/api/system.int32) |

- **float**

  [`float`](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/builtin-types/floating-point-numeric-types) 类型表示实数。所有浮点型数值类型均为值类型。
  
  | C#        | Size    | .NET                                                         |
  | --------- | ------- | ------------------------------------------------------------ |
  | `float`   | 4 字节  | [`System.Single`](https://learn.microsoft.com/zh-cn/dotnet/api/system.single) |
  | `double`  | 8 字节  | [`System.Double`](https://learn.microsoft.com/zh-cn/dotnet/api/system.double) |
  | `decimal` | 16 字节 | [`System.Decimal`](https://learn.microsoft.com/zh-cn/dotnet/api/system.decimal) |

  ```c#
  // 创建 float 类型，在数字后面追加字母 F
  Console.WriteLine(0.25F.GetType());
  
  // 创建 double 类型，只需输入一个十进制数字即可
  Console.WriteLine(2.625.GetType());
  
  // 创建 decimal 类型，在数字后面追加字母 M
  Console.WriteLine(12.39816M.GetType());
  ```

- **bool**

  [`bool`](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/builtin-types/bool) 类型关键字是 .NET [`System.Boolean`](https://learn.microsoft.com/zh-cn/dotnet/api/system.boolean) 结构类型的别名，它表示一个布尔值，可为 `true` 或 `false`。
  
  ```c#
  Console.WriteLine(true);
  Console.WriteLine(false);
  ```

- **string**

  [`string`](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/builtin-types/reference-types#the-string-type) 类型表示零个或多个 Unicode 字符的序列。`string` 是 [`System.String`](https://learn.microsoft.com/zh-cn/dotnet/api/system.string) 在 .NET 中的别名。

  字符串文本可包含任何字符文本，包括转义序列。
  
  ```c#
  // 使用 `\n` 表示换行符
  Console.WriteLine("Hello\nWorld!");
  Console.WriteLine("Hello\tWorld!");
  
  // 使用转义序列 `\\` 表示反斜杠
  // 使用 `\u0066` 表示字母 f
  Console.WriteLine("\\\u0066\n F");
  ```

  [逐字字符串](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/tokens/verbatim)将保留所有空格和字符，而无需转义反斜杠。要创建逐字字符串，请在文本字符串的前面使用 `@` 指令。
  
  ```c#
  Console.WriteLine(@"    c:\source\repos    
          (this is where your code goes)");
  ```

  [字符串模板](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/tokens/interpolated)可以将多个值合并为单个文本字符串。
  
  ```c#
  string message = $"{greeting} {firstName}!";
  ```

### 引用类型

C# 中有两种类型：[引用类型](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/keywords/reference-types)和[值类型](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/builtin-types/value-types)。引用类型的变量存储对其数据（对象）的引用，而值类型的变量直接包含其数据。

#### 数组

可以将同一类型的多个变量存储在一个[数组](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/builtin-types/arrays)数据结构中。

```c#
int[] array1 = new int[5];
int[] array2 = [1, 2, 3, 4, 5, 6];
```

## 二、语句

### 选择语句

[`if`](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/statements/selection-statements#the-if-statement)、`if-else` 和 [`switch`](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/statements/selection-statements#the-switch-statement) 语句根据表达式的值从多个可能的语句选择要执行的路径。

```c#
if (total > 14)
{
    Console.WriteLine("You win!");
}
```

`switch` 语句根据与匹配表达式匹配的模式来选择要执行的语句列表。

```c#
switch (fruit)
{
    case "apple":
        Console.WriteLine($"App will display information for apple.");
        break;

    case "banana":
        Console.WriteLine($"App will display information for banana.");
        break;

    default:
        Console.WriteLine($"App will display information for default.");
        break;
}
```

### 迭代语句

[迭代语句](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/statements/iteration-statements)重复执行语句或语句块。

[`for`](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/statements/iteration-statements#the-for-statement) 语句在指定的布尔表达式的计算结果为 `true` 时，会执行一条语句或一个语句块。

```c#
for (int i = 0; i < 3; i++)
{
    Console.Write(i);
}
```

[`foreach`](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/statements/iteration-statements#the-foreach-statement) 语句提供一种简单、明了的方法来循环访问数组的元素。

```c#
string[] names = ["Rowena", "Robin", "Bao"];
foreach (string name in names)
{
    Console.WriteLine(name);
}
```

## 三、LINQ

语言集成查询 [LINQ](https://learn.microsoft.com/zh-cn/dotnet/csharp/linq/) 是一系列直接将查询功能集成到 C# 语言的技术统称，提供[语言级查询](https://learn.microsoft.com/zh-cn/dotnet/standard/linq/#language-level-query-syntax)功能和高阶函数 API。

- [语言级查询](https://learn.microsoft.com/zh-cn/dotnet/standard/linq/#language-level-query-syntax)

  ```c#
  var parts = from x in salesOrderItems
              where salesOrderItems.FindIndex(z => z.PartNumber == x.PartNumber) == salesOrderItems.IndexOf(x)
              select x;
  ```

- `IEnumerable<T>` API

  ```c#
  var parts = salesOrderItems
      .Where((x, i) => salesOrderItems.FindIndex(z => z.PartNumber == x.PartNumber) == i)
      .ToList();
  ```

### 排序

[排序](https://learn.microsoft.com/zh-cn/dotnet/csharp/linq/standard-query-operators/sorting-data)操作基于一个或多个属性对序列的元素进行排序。第一个排序条件对元素执行主要排序。通过指定第二个排序条件，可以对每个主要排序组内的元素进行排序。

```c#
var salesOrderItems = salesOrderItems
    .OrderByDescending(x => x.OrderDate)
    .ThenBy(x => x.SalesOrderNumber)
    .ThenBy(x=> x.SalesItemNumber)
    .ToList();
```

### 分组

[分组](https://learn.microsoft.com/zh-cn/dotnet/csharp/linq/standard-query-operators/grouping-data)是指将数据分到不同的组，使每组中的元素拥有公共的属性。

```c#
var parts = salesOrderItems
    .Where(s => s.Status == "NOT REVIEWED")
    .Where(s => s.OrderItemLinks == null || !s.OrderItemLinks.Any())
    .GroupBy(s => new { s.PartNumber, s.PartType })
    .Select(g => g.First())
    .ToList();
```

## 四、异步

[异步编程](https://learn.microsoft.com/zh-cn/dotnet/csharp/asynchronous-programming/)的核心是 [`Task`](https://learn.microsoft.com/zh-cn/dotnet/api/system.threading.tasks.task) 和 [`Task<T>`](https://learn.microsoft.com/zh-cn/dotnet/api/system.threading.tasks.task-1) 对象，这两个对象对异步操作建模。它们受关键字 `async` 和 `await` 的支持。

### IO 绑定

[IO 绑定](https://learn.microsoft.com/zh-cn/dotnet/csharp/asynchronous-programming/async-scenarios#io-bound-example-download-data-from-a-web-service)主要指的是那些需要等待外部资源的操作，如文件系统、数据库、网络请求等。

```c#
// 异步调用并等待异步方法执行完成
await MyAsyncMethod();
Console.WriteLine("主线程继续执行。");
Console.ReadLine();

static async Task MyAsyncMethod()
{
    // 模拟异步操作，比如网络请求或者文件读取
    await Task.Delay(2000);  // 两秒钟的延迟
    Console.WriteLine("异步方法执行完成。");
}
```

当 `await Task.Delay(2000)` 执行时，它实际上会立即返回一个任务给调用者，并且主线程可以继续处理其他任务或保持响应状态，而不需要等待 2 秒钟。

在等待期间，主线程是空闲的，它可以继续处理其他操作，比如用户输入、UI 更新等。

等待结束后，当 `Task.Delay(2000)` 完成时，控制权返回到 `MyAsyncMethod` 并继续执行后面的代码。

### CPU 绑定

[CPU 绑定](https://learn.microsoft.com/zh-cn/dotnet/csharp/asynchronous-programming/async-scenarios#cpu-bound-example-perform-a-calculation-for-a-game)主要指的是那些需要大量计算的操作，比如复杂的数学计算、数据处理等。

```c#
// 异步调用并等待异步方法执行完成
int result = await CalculateFactorialAsync(10);
Console.WriteLine($"Factorial of 10 is {result}");
Console.ReadLine();

static async Task<int> CalculateFactorialAsync(int number)
{
    // 使用 Task.Run 在后台线程中执行 CPU 绑定操作
    return await Task.Run(() => CalculateFactorial(number));
}

static int CalculateFactorial(int number)
{
    int result = 1;
    for (int i = 1; i <= number; i++)
    {
        result *= i;
    }
    return result;
}
```

### 异常处理

在异步编程中，`async` 方法通常返回 `Task` 或 `Task<T>`，这使得调用方可以等待它们完成并处理可能的异常。

当 `async` 方法返回 `void` 时，异常处理会变得复杂，因为调用方无法直接捕获这些异常。

```c#
// 调用无法捕获异常
try
{
    DoSomethingAsync();
}
catch (Exception ex)
{
    Console.WriteLine("Exception caught: " + ex.Message);
}

async void DoSomethingAsync()
{
    // 可能抛出异常
    await Task.Delay(1000);
    throw new Exception("Something went wrong!");
}
```

推荐的做法：`async Task`。

```c#
// 调用可以捕获异常
try
{
    await DoSomethingAsync();
}
catch (Exception ex)
{
    Console.WriteLine("Exception caught: " + ex.Message);
}

async Task DoSomethingAsync()
{
    // 可能抛出异常
    await Task.Delay(1000);
    throw new Exception("Something went wrong!");
}
```

### 异步机制

[`await`](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/operators/await) 内部维护了一个状态机，当主线程运行到 `await` 时，如果等待的任务尚未完成，方法会返回一个未完成的任务，并释放当前线程。状态机保存当前的执行位置。

当异步操作完成时，状态机会尝试在捕获的同步上下文中恢复执行后续代码。如果没有特定的同步上下文，代码将在线程池线程中继续执行。

