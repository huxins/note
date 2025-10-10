# WPF

[WPF for .NET](https://learn.microsoft.com/zh-cn/dotnet/desktop/wpf/overview/) 是一个[开放源代码框架](https://github.com/dotnet/wpf)，它从原始 [WPF for .NET Framework](https://learn.microsoft.com/zh-cn/dotnet/desktop/wpf/getting-started/) 源代码派生而来。

[.NET](https://dotnet.microsoft.com/zh-cn/download) 与 [.NET Framework](https://dotnet.microsoft.com/zh-cn/download/dotnet-framework) 上的 WPF 之间具有一些[差异](https://learn.microsoft.com/zh-cn/dotnet/desktop/wpf/migration/differences-from-net-framework)。

## 一、创建应用

- [教程：使用 .NET 创建新的 WPF 应用](https://learn.microsoft.com/zh-cn/dotnet/desktop/wpf/get-started/create-app-visual-studio?view=netdesktop-8.0)
- [指定应用程序图标](https://learn.microsoft.com/zh-cn/visualstudio/ide/how-to-specify-an-application-icon-visual-basic-csharp?view=vs-2022)

## 二、数据绑定

[数据绑定](https://learn.microsoft.com/zh-cn/dotnet/desktop/wpf/data/?view=netdesktop-8.0)为应用呈现数据并与数据交互提供了一种简单而一致的方法。

### 绑定模式

[`Binding`](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.data.binding) 有一个重要的属性 [`Mode`](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.data.binding.mode#system-windows-data-binding-mode)，实现绑定中的[数据流向](https://learn.microsoft.com/zh-cn/dotnet/desktop/wpf/data/#direction-of-the-data-flow)。

#### OneTime

当应用程序启动或 [`DataContext`](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.frameworkelement.datacontext) 更改时，更新绑定目标。此绑定类型实质上是 `OneWay` 绑定的简化形式，在源值不更改的情况下可以提供更好的性能。

#### OneWay

当绑定源更改时，更新绑定目标属性。

这个示例是根据 `ListBox` 中的选中项，去改变 `TextBlock` 的背景色。将 `TextBlock` 的背景色绑定到在 `ListBox` 中选择的颜色。

```xaml
<StackPanel>
    <TextBlock
        Width="300"
        Height="30"
        Text="颜色：" />
    <ListBox
        x:Name="listColor"
        Width="300"
        Height="100">
        <ListBoxItem Content="Blue" />
        <ListBoxItem Content="Red" />
        <ListBoxItem Content="Green" />
        <ListBoxItem Content="Gray" />
        <ListBoxItem Content="Cyan" />
        <ListBoxItem Content="GreenYellow" />
        <ListBoxItem Content="Orange" />
    </ListBox>
    <TextBlock
        Width="300"
        Height="Auto"
        Text="改变背景色：" />
    <TextBlock
        Width="300"
        Height="30"
        Background="{Binding ElementName=listColor, Path=SelectedItem.Content, Mode=OneWay}" />
</StackPanel>
```

#### TwoWay

对源属性或目标属性的更改可自动更新对方。此绑定类型适用于可编辑窗体或其他完全交互式 UI 方案。

这个示例中，对 `TextBox` 使用 `TwoWay` 绑定模式，在 `ListBox` 中选择一种颜色后，该颜色就会显示在 `TextBox` 中，并且其背景色也会随之相应变化。如果在 `TextBox` 中键入了一种颜色，`ListBox` 中刚才选中的颜色名称就会被更新，当鼠标再次点击这条修改后的数据时，新值就会被再次发送到 `TextBox` 上。这意味着 `TextBlock` 也会随之改变。

```xaml
<StackPanel>
    <TextBlock
        Width="300"
        Height="30"
        Text="颜色：" />
    <ListBox
        x:Name="listColor"
        Width="300"
        Height="100">
        <ListBoxItem Content="Blue" />
        <ListBoxItem Content="Red" />
        <ListBoxItem Content="Green" />
        <ListBoxItem Content="Gray" />
        <ListBoxItem Content="Cyan" />
        <ListBoxItem Content="GreenYellow" />
        <ListBoxItem Content="Orange" />
    </ListBox>
    <TextBlock
        Width="300"
        Height="Auto"
        Text="改变背景色：" />
    <TextBlock
        Width="300"
        Height="30"
        Background="{Binding ElementName=listColor, Path=SelectedItem.Content, Mode=OneWay}"
        Text="{Binding ElementName=listColor, Path=SelectedItem.Content, Mode=OneWay}" />
    <TextBox
        Name="txtTwoWay"
        Background="{Binding ElementName=listColor, Path=SelectedItem.Content, Mode=OneWay}"
        Text="{Binding ElementName=listColor, Path=SelectedItem.Content, Mode=TwoWay, UpdateSourceTrigger=PropertyChanged}" />
</StackPanel>
```

### 绑定对象

在数据驱动的应用程序中，更常见的情况是创建从一个对象中提起数据的绑定表达式。绑定的信息必须存储在一个公有属性中。因为 WPF 绑定不能获取私有信息或公有字段。

下面演示如何在 [XAML](https://learn.microsoft.com/zh-cn/dotnet/desktop/wpf/data/binding-declarations-overview#declare-a-binding-in-xaml) 中使用 `DataContext` 属性来绑定一个自定义对象的属性。

第一步，先创建一个视图模型，命名为 `YourViewModel`。

```c#
public class YourViewModel : INotifyPropertyChanged
{
    private string _username;
    public string Username
    {
        get { return _username; }
        set
        {
            if (_username != value)
            {
                _username = value;
                OnPropertyChanged(nameof(Username));
            }
        }
    }

    public event PropertyChangedEventHandler PropertyChanged;
    protected void OnPropertyChanged(string propertyName)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
```

第二步，源数据对象已准备好了，接下来设计 WPF 界面来让控件绑定源对象，具体的 XAML 代码如下所示。

```xaml
<StackPanel Margin="50">
    <StackPanel Margin="10" Orientation="Horizontal">
        <TextBlock Text="姓名：" />
        <TextBlock Width="100" Text="{Binding Path=Username}" />
    </StackPanel>
    <StackPanel Margin="10" Orientation="Horizontal">
        <Button Click="changeName_Click" Content="改变姓名" />
    </StackPanel>
</StackPanel>
```

最后，对应的后台代码逻辑如下所示。

```c#
public partial class MainWindow : Window
{
    private readonly YourViewModel YourVM;
    public MainWindow()
    {
        InitializeComponent();
        YourVM = new YourViewModel() { Username = "SYY"};
        this.DataContext = YourVM;
    }

    private void changeName_Click(object sender, RoutedEventArgs e)
    {
        YourVM.Username = "Learning";
    }
}
```

### 字符串格式化

[StringFormat](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.data.bindingbase.stringformat?view=windowsdesktop-8.0) 获取或设置一个字符串，该字符串指定在绑定值显示为字符串时如何[格式化](https://learn.microsoft.com/zh-cn/dotnet/standard/base-types/formatting-types)绑定。

日期格式：

```xaml
<syncfusion:GridTextColumn
    DisplayBinding="{Binding Path=OrderDate, StringFormat='{}{0:yyyy-MM-dd}'}"
    HeaderText="订单日期"
    MappingName="OrderDate" />
```

定点小数格式：

```xaml
<syncfusion:GridTextColumn
    DisplayBinding="{Binding Path=OrderQuantity, StringFormat='{}{0:F2}'}"
    HeaderText="订单数量"
    MappingName="OrderQuantity" />
```

货币格式：

```xaml
<syncfusion:GridTextColumn
    DisplayBinding="{Binding Path=SalesUnitPrice, StringFormat='{}{0:C2}', ConverterCulture='zh-CN'}"
    HeaderText="销售单价"
    MappingName="SalesUnitPrice" />
```

百分比格式：

```xaml
<syncfusion:GridTextColumn
    DisplayBinding="{Binding Path=GrossMargin, StringFormat='{}{0:P2}'}"
    HeaderText="毛利率"
    MappingName="GrossMargin" />
```

## 三、命令

[命令](https://learn.microsoft.com/zh-cn/dotnet/desktop/wpf/advanced/commanding-overview?view=netframeworkdesktop-4.8)是 WPF 中的一种输入机制。

WPF 命令模型具有四个重要元素，分别为[命令](https://learn.microsoft.com/zh-cn/dotnet/desktop/wpf/advanced/commanding-overview?view=netframeworkdesktop-4.8#commands)、[命令源](https://learn.microsoft.com/zh-cn/dotnet/desktop/wpf/advanced/commanding-overview?view=netframeworkdesktop-4.8#command-sources)、[命令目标](https://learn.microsoft.com/zh-cn/dotnet/desktop/wpf/advanced/commanding-overview?view=netframeworkdesktop-4.8#command-target)和[命令绑定](https://learn.microsoft.com/zh-cn/dotnet/desktop/wpf/advanced/commanding-overview?view=netframeworkdesktop-4.8#commandbinding)。

WPF 命令模型的核心在于 [`ICommand`](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.input.icommand) 接口，该接口定义命令的工作原理。

```c#
public interface ICommand
{
    event EventHandler CanExecuteChanged;
    bool CanExecute(object parameter);
    void Execute(object parameter);
}
```

[`ICommand`](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.input.icommand) 公开了两种方法 [`Execute`](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.input.icommand.execute#system-windows-input-icommand-execute(system-object)) 和 [`CanExecute`](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.input.icommand.canexecute#system-windows-input-icommand-canexecute(system-object))，以及一个事件 [`CanExecuteChanged`](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.input.icommand.canexecutechanged#system-windows-input-icommand-canexecutechanged)。

[`Execute`](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.input.icommand.execute#system-windows-input-icommand-execute(system-object)) 执行与该命令关联的操作。

[`CanExecute`](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.input.icommand.canexecute#system-windows-input-icommand-canexecute(system-object)) 确定是否可以在当前命令目标上执行该命令。例如，文本框中没有选择任何文本，此时 [`Copy`](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.input.applicationcommands.copy#system-windows-input-applicationcommands-copy) 命令是不可用的，[`CanExecute`](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.input.icommand.canexecute#system-windows-input-icommand-canexecute(system-object)) 则返回 `false`。

实际上，`Execute` 和 `CanExecute` 方法并没有包含命令的处理逻辑，而是将触发遍历元素树的事件来查找具有 [`CommandBinding`](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.input.commandbinding) 的对象，真正命令的处理程序包含在 `CommandBinding` 的事件处理程序中。

执行过程如下：

```
1、按钮点击：当用户点击按钮时，按钮的 Command 属性（ApplicationCommands.New）被触发。
2、调用 RoutedCommand.Execute：ApplicationCommands.New.Execute 方法被调用。
3、触发事件：Execute 方法触发 Executed 路由事件。
4、查找 CommandBinding：WPF 在元素树中查找与 ApplicationCommands.New 绑定的 CommandBinding。
5、调用处理程序：找到 CommandBinding 后，调用 Executed 事件处理程序，即 NewCommandExecuted 方法。
6、显示消息：NewCommandExecuted 方法执行，显示消息框。
```

### 内置命令

在 WPF 中，`CommandBinding` 和 `Command` 是实现命令模式的一部分，用于将用户界面操作与命令逻辑分离。这使得代码更模块化和更容易维护。

#### 命令绑定

在 XAML 中创建命令绑定。

```xaml
<Window.CommandBindings>
    <CommandBinding Command="ApplicationCommands.New" Executed="NewCommand" />
</Window.CommandBindings>
```

在 C# 中创建命令绑定。

```c#
public MainWindow()
{
    InitializeComponent();
    CommandBinding bindingNew = new CommandBinding(ApplicationCommands.New);
    bindingNew.Executed += NewCommand;
    this.CommandBindings.Add(bindingNew);
}
```

#### 绑定执行方法

[`ApplicationCommands.New`](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.input.applicationcommands.new#system-windows-input-applicationcommands-new) 是 WPF 提供的一个预定义命令，表示新建操作。`Executed="NewCommand"` 用于指定当命令被执行时应该调用的方法。

```c#
private void NewCommand(object sender, ExecutedRoutedEventArgs e)
{
    MessageBox.Show("New 命令被触发了，命令源是：" + e.Source.ToString());
}
```

#### 命令源

在 XAML 中，设置命令源。

```xaml
<StackPanel>
    <Button
        Margin="5"
        Padding="5"
        Command="ApplicationCommands.New"
        ToolTip="{x:Static ApplicationCommands.New}">
        New
    </Button>
    <Button
        Margin="5"
        Padding="5"
        Command="ApplicationCommands.New"
        Content="{Binding RelativeSource={RelativeSource Self}, Path=Command.Text}" />
</StackPanel>
```

#### 事件调用

除了在 XAML 中设置命令源，还可以绑定事件方法，手动调用命令。

```c#
private void DoCommand_Click(object sender, RoutedEventArgs e)
{
    // 直接调用命令的两种方式
    ApplicationCommands.New.Execute(null, (Button)sender);
    //  this.CommandBindings[0].Command.Execute(null);
}
```

然后在 XAML 中绑定事件方法。

```xaml
<StackPanel>
    <Button
        Margin="5"
        Padding="5"
        Click="DoCommand_Click">
        DoCommand
    </Button>
</StackPanel>
```

### 自定义命令

#### 实现命令

自定义实现一个命令，如 [`RelayCommand`](https://learn.microsoft.com/zh-cn/dotnet/communitytoolkit/mvvm/relaycommand)。

```c#
public class RelayCommand : ICommand
{
    private readonly Action<object> execute;
    private readonly Predicate<object> canExecute;

    public RelayCommand(Action<object> execute, Predicate<object> canExecute = null)
    {
        this.execute = execute ?? throw new ArgumentNullException(nameof(execute));
        this.canExecute = canExecute;
    }

    public bool CanExecute(object parameter)
    {
        return canExecute == null || canExecute(parameter);
    }

    public void Execute(object parameter)
    {
        execute(parameter);
    }

    public event EventHandler CanExecuteChanged
    {
        add { CommandManager.RequerySuggested += value; }
        remove { CommandManager.RequerySuggested -= value; }
    }
}
```

#### 命令绑定

在 `ViewModel` 中实例化命令。

```c#
public class YourViewModel
{
    public ICommand MyCommand { get; }

    public YourViewModel()
    {
        MyCommand = new RelayCommand(ExecuteMyCommand, CanExecuteMyCommand);
    }

    private void ExecuteMyCommand(object parameter)
    {
        // 执行命令的逻辑
    }

    private bool CanExecuteMyCommand(object parameter)
    {
        // 判断命令是否可以执行的逻辑
        return true;
    }
}
```

在 XAML 中绑定命令。

```xaml
<Window
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
    xmlns:local="clr-namespace:DataBinding"
    d:DataContext="{d:DesignInstance local:YourViewModel}">
    <StackPanel>
        <Button
            Margin="5"
            Padding="5"
            Command="{Binding MyCommand}"
            Content="Execute Command" />
    </StackPanel>
</Window>
```

## 四、异常

### 编译错误

- 当前上下文中不存在名称 `InitializeComponent`

  在 VS 中，如果 XAML 的后台代码提示不存在 `InitializeComponent`，尝试将 XAML 的属性从**页**更改为其他，再更改回**页**，会自动选择 `MSBuild:Compile`。

### 运行错误

#### 查看事件日志

Windows 事件查看器是排查应用程序崩溃问题的一个重要工具。

按 `Win + R` 打开运行对话框，输入 `eventvwr` 并按回车。

在事件查看器中，导航到 `Windows Logs > Application`。

查找有关应用程序崩溃的错误日志。它们通常标记为 `Error` 或 `Critical`，并且来源可能是 `.NET Runtime` 或 `Application Error`。

这些日志会包含崩溃的详细信息，如异常类型、错误消息和堆栈跟踪。

## 五、部署

[生成和部署](https://learn.microsoft.com/zh-cn/dotnet/desktop/wpf/app-development/building-and-deploying-wpf-applications?view=netframeworkdesktop-4.8)模型提供在本地和远程生成和部署应用程序的功能。

### Windows Installer

[Windows Installer](https://learn.microsoft.com/zh-cn/dotnet/desktop/wpf/app-development/deploying-a-wpf-application-wpf?view=netframeworkdesktop-4.8#windows-installer) 允许应用程序打包为可轻松分发到客户端并运行的自包含可执行文件。

如果需要比 ClickOnce 提供的更为复杂的桌面应用程序安装，则可以创建 [Windows Installer](https://learn.microsoft.com/zh-cn/visualstudio/deployment/deploying-applications-services-and-components?view=vs-2022#create-an-installer-package-windows-desktop-1) 包或自定义引导程序。

#### Visual Studio Installer

可以使用 [vdproj](https://aka.ms/vdproj-docs) 创建 MSI 或 EXE 安装程序包。

通常使用 Visual Studio [安装程序项目扩展](https://marketplace.visualstudio.com/items?itemName=VisualStudioClient.MicrosoftVisualStudio2022InstallerProjects)将应用程序打包为 MSI。

- **创建安装项目**

  在解决方案上新建项目，选择 `Setup Project` 项目。

  File System 有三个目录：

  - **Application Folder**：安装程序的根目录，编写的程序生成的 dll，安装后就存放在这个目录。
  - **User's Desktop**：用户桌面快捷方式设置。
  - **User's Programs Menu**：用户启动菜单的快捷方式设置。

- **添加项目输出**

  安装项目建好后，需要往里面添加项目输出。

  在弹出的页面中，它会默认选中需要打包的程序集和发布项，点击确定即可。

- **设置项目属性**

  项目属性的设置，是用于生成安装程序的描述信息，主要内容有程序的作者，标题，公司信息，技术支持等等。

  项目属性的设置方式为：

  ```
  1、左键选中安装项目。
  2、点击解决方案栏左下角的属性。
  ```

  ⼀般情况，修改 `Author`、`Description`、`Manufacturer`、`ProductName`、`Title` 属性即可。

