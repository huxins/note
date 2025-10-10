# 设计模式

在软件工程中，[设计模式](https://zh.wikipedia.org/zh-cn/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F_(%E8%AE%A1%E7%AE%97%E6%9C%BA))是对软件设计中普遍存在的各种问题，所提出的解决方案。

## 一、行为型

[行为型模式](https://zh.wikipedia.org/wiki/%E8%A1%8C%E7%82%BA%E5%9E%8B%E6%A8%A1%E5%BC%8F)为设计模式的一种类型，用来识别对象之间的常用交流模式并加以实现。

### 中介者模式

[中介者模式](https://zh.wikipedia.org/wiki/%E4%B8%AD%E4%BB%8B%E8%80%85%E6%A8%A1%E5%BC%8F)定义了一个中介者对象，该对象封装了系统中对象间的交互方式，能减少对象之间混乱无序的依赖关系。

该模式会限制对象之间的直接交互，迫使它们通过一个中介者对象进行合作。

#### 用户间通信

在没有使用中介者模式的情况下，多个类对象之间需要直接通信。

例如，一个聊天室中有多个用户，用户之间直接发送消息。

```python
class User:
    def __init__(self, name):
        self.name = name

    def send_message(self, message, to_user):
        print(f"{self.name} 发送消息给 {to_user.name}: {message}")

# 创建用户对象
user1 = User("Alice")
user2 = User("Bob")

# 用户直接通信
user1.send_message("Hello, Bob!", user2)
user2.send_message("Hi, Alice!", user1)
```

在这个例子中，用户 `Alice` 和 `Bob` 之间直接通信。

这意味着如果有更多的用户加入，他们之间的依赖性会增加，通信逻辑也会变得复杂。

使用中介者模式，我们会引入一个中介者对象（例如聊天室）来管理用户之间的消息传递，用户只需与中介者通信，而无需关心其他用户的存在。

```python
# 定义中介者
class ChatRoom:
    def show_message(self, user, message):
        print(f"{user.name} 发送消息: {message}")

# 修改后的用户类
class User:
    def __init__(self, name, chat_room):
        self.name = name
        self.chat_room = chat_room

    def send_message(self, message):
        self.chat_room.show_message(self, message)

# 创建中介者对象
chat_room = ChatRoom()

# 创建用户对象
user1 = User("Alice", chat_room)
user2 = User("Bob", chat_room)

# 用户通过中介者通信
user1.send_message("Hello, Bob!")
user2.send_message("Hi, Alice!")
```

#### 请求处理

假设有一个 `Ping` 请求和一个 `PingHandler` 来处理这个请求。

在没有中介者模式的情况下，`Ping` 请求会直接与 `PingHandler` 交互。

```python
class Ping:
    def __init__(self, handler):
        self.handler = handler

    def send_request(self):
        print("Ping: Sending request...")
        self.handler.handle()

class PingHandler:
    def handle(self):
        print("PingHandler: Handling the ping request...")

# 直接创建对象并发送请求
handler = PingHandler()
ping = Ping(handler)
ping.send_request()
```

在这个例子中，`Ping` 请求类直接依赖于 `PingHandler` 类。

如果我们以后想要改变处理逻辑或增加其他处理器，就需要修改 `Ping` 类，这破坏了代码的可扩展性和可维护性。

现在我们引入一个中介者来管理 `Ping` 请求和 `PingHandler` 的交互。

`Ping` 对象与 `PingHandler` 通过 `Mediator` 中介者进行交互，`Ping` 对象只知道 `Mediator`，不需要直接依赖 `PingHandler`。

这样，当需要更改处理逻辑或添加新功能时，只需修改或扩展 `Mediator`，而不需要更改 `Ping` 类本身。

```python
class PingHandler:
    def handle(self):
        print("PingHandler: Handling the ping request...")

class Mediator:
    def __init__(self):
        self.handler = PingHandler()

    def notify(self, sender, event):
        if event == "PingRequest":
            self.handler.handle()

class Ping:
    def __init__(self, mediator):
        self.mediator = mediator

    def send_request(self):
        print("Ping: Sending request...")
        self.mediator.notify(self, "PingRequest")

# 使用中介者进行通信
mediator = Mediator()
ping = Ping(mediator)
ping.send_request()
```

### 策略模式

[策略模式](https://zh.wikipedia.org/wiki/%E7%AD%96%E7%95%A5%E6%A8%A1%E5%BC%8F)是一种行为设计模式，它能让你定义一系列算法，并将每种算法分别放入独立的类中，以使算法的对象能够相互替换。

当你想使用对象中各种不同的算法变体，并希望能在运行时切换算法时，可使用策略模式。

#### 支付方式

假设我们有一个电子商务系统，用户可以使用不同的支付方式完成购买，比如使用 CreditCard 或 PayPal。

最初，我们可能会直接在代码中处理不同的支付方式，但随着支付方式的增加，代码会变得越来越难以维护。

```python
class PaymentProcessor:
    def process_payment(self, payment_type, amount):
        if payment_type == "CreditCard":
            self._process_credit_card_payment(amount)
        elif payment_type == "PayPal":
            self._process_paypal_payment(amount)
        else:
            raise ValueError("Unsupported payment type")

    def _process_credit_card_payment(self, amount):
        print(f"Processing credit card payment of ${amount}")

    def _process_paypal_payment(self, amount):
        print(f"Processing PayPal payment of ${amount}")

# 使用示例
processor = PaymentProcessor()
processor.process_payment("CreditCard", 100)
processor.process_payment("PayPal", 150)
```

我们可以使用策略模式来解耦支付逻辑，使得系统更易扩展。

我们将创建一个接口来表示支付策略，并为每种支付方式创建一个实现该接口的类。

```python
from abc import ABC, abstractmethod

# 定义支付策略接口
class PaymentStrategy(ABC):
    @abstractmethod
    def pay(self, amount):
        pass

# 实现信用卡支付策略
class CreditCardPayment(PaymentStrategy):
    def pay(self, amount):
        print(f"Processing credit card payment of ${amount}")

# 实现 PayPal 支付策略
class PayPalPayment(PaymentStrategy):
    def pay(self, amount):
        print(f"Processing PayPal payment of ${amount}")

# 支付处理类只需要接受一个策略接口
class PaymentProcessor:
    def __init__(self, strategy: PaymentStrategy):
        self.strategy = strategy

    def process_payment(self, amount):
        self.strategy.pay(amount)

# 使用不同的支付策略
credit_card_payment = CreditCardPayment()
paypal_payment = PayPalPayment()

processor = PaymentProcessor(credit_card_payment)
processor.process_payment(100)

processor = PaymentProcessor(paypal_payment)
processor.process_payment(150)
```

## 二、创建型

[创建型模式](https://zh.wikipedia.org/wiki/%E5%89%B5%E5%BB%BA%E5%9E%8B%E6%A8%A1%E5%BC%8F)是处理对象创建的设计模式，试图根据实际情况使用合适的方式创建对象，因为基本的对象创建方式可能会导致设计上的问题，或增加设计的复杂度。

### 单例模式

[单例模式](https://zh.wikipedia.org/wiki/%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F)是一种创建型设计模式，让你能够保证一个类只有一个实例，并提供一个访问该实例的全局节点。

#### 支付策略

确保每种支付策略都只有一个实例，可以使用单例模式来实现。

```c#
public interface IPaymentStrategy
{
    void ProcessPayment();
}

public class CreditCardPayment : IPaymentStrategy
{
    private static readonly CreditCardPayment _instance = new CreditCardPayment();
    private CreditCardPayment() { }

    public static CreditCardPayment Instance => _instance;

    public void ProcessPayment()
    {
        Console.WriteLine("Processing credit card payment...");
    }
}
```

## Reference

- [Refactoring](https://refactoringguru.cn/design-patterns)
- [Patterns.dev](https://www.patterns.dev/)

