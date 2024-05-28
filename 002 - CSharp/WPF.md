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

