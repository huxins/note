# .NET CLI

[.NET CLI](https://learn.microsoft.com/zh-cn/dotnet/core/tools/) 工具是用于开发、生成、运行和发布 .NET 应用程序的跨平台工具链。

## 一、命令

### dotnet new

[`dotnet new`](https://learn.microsoft.com/zh-cn/dotnet/core/tools/dotnet-new) 命令根据指定的模板，创建新的项目、配置文件或解决方案。

例如，创建命令行应用程序项目。

```sh
dotnet new console -o ./CsharpProjects/TestProject
```

### dotnet build

[`dotnet build`](https://learn.microsoft.com/zh-cn/dotnet/core/tools/dotnet-build) 命令生成项目及其所有依赖项。

### dotnet run

[`dotnet run`](https://learn.microsoft.com/zh-cn/dotnet/core/tools/dotnet-run) 命令无需任何显式编译或启动命令即可运行源代码。

