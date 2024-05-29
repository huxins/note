# WPF

## 一、创建应用

- [教程：使用 .NET 创建新的 WPF 应用](https://learn.microsoft.com/zh-cn/dotnet/desktop/wpf/get-started/create-app-visual-studio?view=netdesktop-8.0)

## 二、数据绑定

[数据绑定](https://learn.microsoft.com/zh-cn/dotnet/desktop/wpf/data/?view=netdesktop-8.0)为应用呈现数据并与数据交互提供了一种简单而一致的方法。

### 2.1. 绑定模式

`Binding` 有一个重要的属性 `Mode`，实现绑定中的数据流向。

#### OneTime

当应用程序启动或 `DataContext` 更改时，更新绑定目标。此绑定类型实质上是 `OneWay` 绑定的简化形式，在源值不更改的情况下可以提供更好的性能。

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

### 2.2. 绑定对象

在数据驱动的应用程序中，更常见的情况是创建从一个对象中提起数据的绑定表达式。绑定的信息必须存储在一个公有属性中。因为 WPF 绑定不能获取私有信息或公有字段。

下面演示如何使用 `DataContext` 属性来绑定一个自定义对象的属性。

1. 先创建一个视图模型，命名为 `YourViewModel`。

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

2. 源数据对象以准备好了，接下来设计 WPF 界面来让控件绑定源对象，具体的 XAML 代码如下所示。

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

3. 对应的后台代码逻辑如下所示。

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

## 二、命令

[命令](https://learn.microsoft.com/zh-cn/dotnet/desktop/wpf/advanced/commanding-overview?view=netframeworkdesktop-4.8)是 WPF 中的一种输入机制。

WPF 命令模型具有 4 个重要元素，`命令`、`命令源`、`命令目标`和`命令绑定`。

WPF 命令模型的核心在于 `ICommand` 接口，该接口定义命令的工作原理。

```c#
public interface ICommand
{
    event EventHandler CanExecuteChanged;
    bool CanExecute(object parameter);
    void Execute(object parameter);
}
```

`ICommand` 公开了两种方法 `Execute` 和 `CanExecute`，以及一个事件 `CanExecuteChanged`。

`Execute` 执行与该命令关联的操作。

`CanExecute` 确定是否可以在当前命令目标上执行该命令。例如，文本框中没有选择任何文本，此时 `Copy` 命令是不可用的，`CanExecute` 则返回 `false`。

实际上，`Execute` 和 `CanExecute` 方法并没有包含命令的处理逻辑，而是将触发遍历元素树的事件来查找具有 `CommandBinding` 的对象，真正命令的处理程序包含在 `CommandBinding` 的事件处理程序中。

执行过程如下。

```
1、按钮点击：当用户点击按钮时，按钮的 Command 属性（ApplicationCommands.New）被触发。
2、调用 RoutedCommand.Execute：ApplicationCommands.New.Execute 方法被调用。
3、触发事件：Execute 方法触发 Executed 路由事件。
4、查找 CommandBinding：WPF 在元素树中查找与 ApplicationCommands.New 绑定的 CommandBinding。
5、调用处理程序：找到 CommandBinding 后，调用 Executed 事件处理程序，即 NewCommandExecuted 方法。
6、显示消息：NewCommandExecuted 方法执行，显示消息框。
```

### 2.1. 内置命令

在 WPF 中，`CommandBinding` 和 `Command` 是实现命令模式的一部分，用于将用户界面操作与命令逻辑分离。这使得代码更模块化和更容易维护。

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

`ApplicationCommands.New` 是 WPF 提供的一个预定义命令，表示`新建`操作。`Executed="NewCommand"` 用于指定当命令被执行时应该调用的方法。

```c#
private void NewCommand(object sender, ExecutedRoutedEventArgs e)
{
    MessageBox.Show("New 命令被触发了，命令源是：" + e.Source.ToString());
}
```

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

### 2.2. 自定义命令

