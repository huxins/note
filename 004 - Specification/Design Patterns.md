# 设计模式

## 一、行为模式

### 中介者模式

中介者模式是一种行为设计模式，能减少对象之间混乱无序的依赖关系。该模式会限制对象之间的直接交互，迫使它们通过一个中介者对象进行合作。

#### 使用场景

解耦请求发送者和处理者。

#### 代码示例

如果不使用中介者模式，可以直接在 `MyService` 中调用 `PingHandler` 来处理请求。这样做会使 `MyService` 和 `PingHandler` 之间有直接的依赖关系，减少了系统的灵活性和可扩展性，但在某些简单场景下，这种方式也可以接受。

```c#
using Microsoft.Extensions.DependencyInjection;

var services = new ServiceCollection();

services.AddTransient<MyService>();
services.AddTransient<PingHandler>();

var serviceProvider = services.BuildServiceProvider();
var myService = serviceProvider.GetRequiredService<MyService>();

// 发送 Ping 请求
string message = "Hello, Direct Call!";
string response = await myService.SendPingAsync(message);

Console.WriteLine(response);
Console.ReadLine();

// 定义请求
public class Ping
{
    public string? Message { get; set; }
}

// 定义请求处理程序
public class PingHandler
{
    public Task<string> Handle(Ping request, CancellationToken cancellationToken)
    {
        return Task.FromResult($"Pong: {request.Message}");
    }
}

// 直接调用 PingHandler 处理请求
public class MyService
{
    private readonly PingHandler _pingHandler;

    public MyService(PingHandler pingHandler)
    {
        this._pingHandler = pingHandler;
    }

    public async Task<string> SendPingAsync(string message)
    {
        var response = await this._pingHandler.Handle(new Ping { Message = message }, CancellationToken.None);
        return response;
    }
}
```

中介者模式通过解耦请求发送者和处理者，提供了更大的灵活性和可扩展性。

```c#
using MediatR;
using Microsoft.Extensions.DependencyInjection;

var services = new ServiceCollection();

services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));
services.AddTransient<MyService>();

var serviceProvider = services.BuildServiceProvider();
var myService = serviceProvider.GetRequiredService<MyService>();

// 发送 Ping 请求
string message = "Hello, MediatR!";
string response = await myService.SendPingAsync(message);

Console.WriteLine(response);
Console.ReadLine();

// 定义请求
public class Ping : IRequest<string>
{
    public string? Message { get; set; }
}

// 定义请求处理程序
public class PingHandler : IRequestHandler<Ping, string>
{
    public Task<string> Handle(Ping request, CancellationToken cancellationToken)
    {
        return Task.FromResult($"Pong: {request.Message}");
    }
}

// 使用 MediatR 发送请求
public class MyService
{
    private readonly IMediator _mediator;

    public MyService(IMediator mediator)
    {
        this._mediator = mediator;
    }

    public async Task<string> SendPingAsync(string message)
    {
        var response = await this._mediator.Send(new Ping { Message = message });
        return response;
    }
}
```

### 策略模式

策略模式是一种行为设计模式，它能让你定义一系列算法，并将每种算法分别放入独立的类中，以使算法的对象能够相互替换。

#### 使用场景

当你想使用对象中各种不同的算法变体，并希望能在运行时切换算法时，可使用策略模式。

#### 代码示例

假设我们有一个简单的支付系统，我们可以用不同的支付方式进行支付，如信用卡支付和 PayPal 支付。下面是不使用策略模式的实现。

```c#
PaymentProcessor paymentProcessor = new PaymentProcessor();
paymentProcessor.ProcessPayment("CreditCard");
paymentProcessor.ProcessPayment("PayPal");
Console.ReadLine();

public class PaymentProcessor
{
    public void ProcessPayment(string paymentType)
    {
        if (paymentType == "CreditCard")
        {
            Console.WriteLine("Processing credit card payment...");
            // 信用卡支付的具体实现
        }
        else if (paymentType == "PayPal")
        {
            Console.WriteLine("Processing PayPal payment...");
            // PayPal 支付的具体实现
        }
        else
        {
            Console.WriteLine("Unknown payment type");
        }
    }
}
```

现在，通过策略模式来优化这个支付系统。我们将创建一个接口来表示支付策略，并为每种支付方式创建一个实现该接口的类。

```c#
// 使用信用卡支付
IPaymentStrategy creditCardPayment = new CreditCardPayment();
PaymentProcessor paymentProcessor = new PaymentProcessor(creditCardPayment);
paymentProcessor.ProcessPayment();

// 使用 PayPal 支付
IPaymentStrategy payPalPayment = new PayPalPayment();
paymentProcessor = new PaymentProcessor(payPalPayment);
paymentProcessor.ProcessPayment();

Console.ReadLine();

// 定义支付策略接口
public interface IPaymentStrategy
{
    void ProcessPayment();
}

// 实现信用卡支付策略
public class CreditCardPayment : IPaymentStrategy
{
    public void ProcessPayment()
    {
        Console.WriteLine("Processing credit card payment...");
        // 信用卡支付的具体实现
    }
}

// 实现 PayPal 支付策略
public class PayPalPayment : IPaymentStrategy
{
    public void ProcessPayment()
    {
        Console.WriteLine("Processing PayPal payment...");
        // PayPal 支付的具体实现
    }
}

// 支付处理器类，使用策略模式
public class PaymentProcessor
{
    private readonly IPaymentStrategy _paymentStrategy;

    public PaymentProcessor(IPaymentStrategy paymentStrategy)
    {
        this._paymentStrategy = paymentStrategy;
    }

    public void ProcessPayment()
    {
        this._paymentStrategy.ProcessPayment();
    }
}
```

## 二、创建型模式

### 单例模式

单例模式是一种创建型设计模式，让你能够保证一个类只有一个实例，并提供一个访问该实例的全局节点。

#### 代码示例

确保每种支付策略都只有一个实例，可以使用单例模式来实现。

```c#
// 定义支付策略接口
public interface IPaymentStrategy
{
    void ProcessPayment();
}

// 实现信用卡支付策略
public class CreditCardPayment : IPaymentStrategy
{
    private static readonly CreditCardPayment _instance = new CreditCardPayment();
    private CreditCardPayment() { }

    public static CreditCardPayment Instance => _instance;

    public void ProcessPayment()
    {
        Console.WriteLine("Processing credit card payment...");
        // 信用卡支付的具体实现
    }
}
```

