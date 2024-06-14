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

