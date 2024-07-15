# .NET Standard

## 一、System

### Object

这是所有类的最终基类。

实例方法：

- Object.**GetHashCode**()

  用作默认的哈希函数。

  重写 `GetHashCode()` 的派生类也必须重写 `Equals(Object)`，以确保两个被视为相等的对象具有相同的哈希代码；否则，`Hashtable` 类型可能无法正常工作。

- Object.**Equals**(*Object*)

  确定指定对象是否等于当前对象。

  Object 类中的 `Equals` 方法区分两个对象的做法是[比较地址值](https://github.com/dotnet/runtime/blob/v8.0.6/src/libraries/System.Private.CoreLib/src/System/Object.cs#L50C13-L50C32)。

  假如根据业务需求改写了 `Equals` 方法的实现，那么也应当同时改写 `GetHashCode` 方法的实现。否则 `GetHashCode` 方法依然返回的是依据 `Object` 类中的地址值得到的 `integer` 哈希值。

  例如 String 类中，`Equals` 方法经过[重写](https://github.com/dotnet/runtime/blob/v8.0.6/src/libraries/System.Private.CoreLib/src/System/String.Comparison.cs#L613C13-L622C44)，String 对象在调用 `Equals` 方法比较另一个对象时，除了认定相同地址值的两个对象相等以外，还认定每个字符都相等的两个 String 对象也相等，即使这两个 String 对象的地址值不同。

### Random

伪随机数生成器。

实例方法：

- Random.**Next**(*Int32*, *Int32*)

  返回在指定范围内的任意整数。

  ```c#
  Random dice = new Random();
  int roll = dice.Next(1, 7);  // 该随机数大于等于 1，小于 7。
  ```

### String

将文本表示为 UTF-16 代码单元的序列。

静态方法：

- String.**IsNullOrWhiteSpace**(*String*)

  指示指定的字符串是 `null`、空还是仅由空白字符组成。

## 二、System.Windows.Controls

提供一些类以创建称为控件的元素，从而使用户可使用这些元素与应用程序进行交互。

### Grid

定义由列和行组成的灵活的网格区域。

属性：

- Grid.**RowDefinitions**

  获取在 `Grid` 的实例上定义的 `RowDefinitionCollection`。

  ```xaml
  <Grid Margin="10">
      <Grid.RowDefinitions>
          <RowDefinition Height="*" />
          <RowDefinition Height="*" />
      </Grid.RowDefinitions>
  </Grid>
  ```

- Grid.**ColumnDefinitions**

  获取在 `Grid` 的实例上定义的 `ColumnDefinitionCollection`。

  ```xaml
  <Grid Margin="10">
      <Grid.ColumnDefinitions>
          <ColumnDefinition Width="*" />
          <ColumnDefinition Width="*" />
      </Grid.ColumnDefinitions>
  </Grid>
  ```

### StackPanel

将子元素排列成水平或垂直的一行。

```xaml
<StackPanel Grid.Row="1" Grid.Column="1" Margin="5,0,0,0">
    
</StackPanel>
```

### Control

表示 UI 元素的基类，这些元素使用 `ControlTemplate` 来定义其外观。

属性：

- Control.**Template**

  获取或设置控件模板。

  ```xaml
  <Button Background="Green" Content="Add Name" Foreground="White">
      <Button.Template>
          <ControlTemplate TargetType="Button">
              <Border
                  Background="{TemplateBinding Background}"
                  BorderBrush="Black"
                  BorderThickness="1"
                  CornerRadius="2">
                  <ContentPresenter HorizontalAlignment="Center" VerticalAlignment="Center" />
              </Border>
          </ControlTemplate>
      </Button.Template>
  </Button>
  ```

### ControlTemplate

指定 `Control` 的可在其多个实例之间共享的可视结构和行为方面。

属性：

- ControlTemplate.**Triggers**

  获取根据指定条件应用属性更改或执行操作的 `TriggerBase` 对象的集合。

  ```xaml
  <ControlTemplate.Triggers>
      <Trigger Property="IsMouseOver" Value="True">
          <Setter TargetName="border" Property="Background" Value="Black" />
      </Trigger>
      <Trigger Property="IsPressed" Value="True">
          <Setter TargetName="border" Property="Background" Value="WhiteSmoke" />
      </Trigger>
  </ControlTemplate.Triggers>
  ```

### Label

表示控件的文本标签。

```xaml
<Label Grid.Column="1">Names</Label>
```

### TextBox

表示一个控件，该控件可用于显示或编辑无格式文本。

```xaml
<TextBox x:Name="txtName" />
```

实例属性：

- TextBox.**Text**

  获取或设置文本框的文本内容。

实例方法：

- TextBox.**Clear**()

  清除文本框中的所有内容。

### Button

表示 Windows 按钮控件，该按钮对 `Click` 事件做出反应。

```xaml
<Button x:Name="btnAdd" Margin="0,5,0,0" Click="ButtonAddName_Click">Add Name</Button>
```

### ListBox

列表框控件。

列表框将位于第 `1` 行和第 `0` 列。我们还将此控件命名为 `lstNames`。

```xaml
<ListBox Grid.Row="1" x:Name="lstNames" />
```

实例属性：

- ListBox.**Items**

  获取用于生成 `ItemsControl` 的内容的集合。

### DataGrid

表示用于在可自定义的网格中显示数据的控件。

```xaml
<DataGrid
    x:Name="ReviewDataGrid"
    AutoGenerateColumns="False"
    ClipboardCopyMode="ExcludeHeader"
    IsReadOnly="True"
    ItemsSource="{Binding SalesOrderReviews}"
    SelectionMode="Extended"
    SelectionUnit="CellOrRowHeader">

    <DataGrid.Columns>

        <DataGridTextColumn
            Width="85"
            Binding="{Binding OrderDate, StringFormat={}{0:yyyy-MM-dd}}"
            Header="订单日期" />

        <DataGridTextColumn
            Width="200"
            Binding="{Binding CustomerName}"
            Header="客户名称" />

        <DataGridTextColumn
            Width="85"
            Binding="{Binding SalesOrderNumber}"
            Header="销售单号" />

        <DataGridTextColumn
            Width="40"
            Binding="{Binding SalesItemNumber}"
            Header="项号" />

        <DataGridTextColumn Binding="{Binding PartNumber}" Header="型号" />

        <DataGridTextColumn
            Width="60"
            Binding="{Binding SalesPerson}"
            Header="销售" />

        <DataGridTextColumn
            Width="60"
            Binding="{Binding OrderQuantity, StringFormat={}{0:F2}}"
            Header="订单数量" />

        <DataGridTemplateColumn Width="110" Header="关联采购单">
            <DataGridTemplateColumn.CellTemplate>
                <DataTemplate>
                    <ItemsControl ItemsSource="{Binding LinkedPurchaseOrders}">
                        <ItemsControl.ItemTemplate>
                            <DataTemplate>
                                <TextBlock>
                                    <Run Text="{Binding PurchaseOrderNumber}" />
                                    <Run Text=":" />
                                    <Run Text="{Binding PurchaseItemNumber}" />
                                </TextBlock>
                            </DataTemplate>
                        </ItemsControl.ItemTemplate>
                    </ItemsControl>
                </DataTemplate>
            </DataGridTemplateColumn.CellTemplate>
        </DataGridTemplateColumn>

        <DataGridTextColumn
            Width="60"
            Binding="{Binding SalesUnitPrice, StringFormat={}{0:F2}}"
            Header="销售单价" />

        <DataGridTextColumn
            Width="60"
            Binding="{Binding PurchaseUnitPrice, StringFormat={}{0:F2}}"
            Header="采购单价" />

        <DataGridTextColumn
            Width="60"
            Binding="{Binding SalesSubtotal}"
            Header="销售小计" />

        <DataGridTextColumn
            Width="60"
            Binding="{Binding PurchaseSubtotal}"
            Header="采购小计" />

        <DataGridTextColumn
            Width="60"
            Binding="{Binding GrossMargin, StringFormat={}{0:P2}}"
            Header="毛利率" />

    </DataGrid.Columns>

</DataGrid>
```

## 三、System.Windows

### Application

封装 Windows Presentation Foundation 应用程序。

属性：

- Application.**Resources**

  获取或设置应用程序范围资源的集合。

  ```xaml
  <Application.Resources>
      <ResourceDictionary>
          <ResourceDictionary.MergedDictionaries>
              <ResourceDictionary Source="/WPF_APP;component/Dictionary1.xaml" />
          </ResourceDictionary.MergedDictionaries>
      </ResourceDictionary>
  </Application.Resources>
  ```

### ResourceDictionary

提供一个哈希表实现，其中包含组件所使用的 WPF 资源以及 WPF 应用程序的其他元素。

```xaml
<ResourceDictionary xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
                    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Style TargetType="Button">
        <Setter Property="Background" Value="Red" />
    </Style>
</ResourceDictionary>
```

属性：

- ResourceDictionary.**MergedDictionaries**

  获取 `ResourceDictionary` 字典的集合，这些字典构成了合并字典中的各种资源字典。

  ```xaml
  <ResourceDictionary>
      <ResourceDictionary.MergedDictionaries>
          <ResourceDictionary Source="/WPF_APP;component/Dictionary1.xaml" />
      </ResourceDictionary.MergedDictionaries>
  </ResourceDictionary>
  ```

### FrameworkElement

实例属性：

- FrameworkElement.**Style**

  获取或设置此元素呈现时所使用的样式。

  ```xaml
  <Button x:Name="btnAdd" Style="{StaticResource Primary}" Content="Add Name" />
  ```

- FrameworkElement.**Resources**

  获取或设置本地定义的资源字典。

  ```xaml
  <Window.Resources>
      <Style TargetType="Button">
          <Setter Property="Background" Value="Red" />
      </Style>
  </Window.Resources>
  ```

### Style

在类型的不同实例之间共享属性、资源和事件处理程序。

```xaml
<Style x:Key="Primary" TargetType="Button">
    <Setter Property="Background" Value="Red" />
</Style>
```

实例属性：

- Style.**BasedOn**

  获取或设置一个作为当前样式的基准的已定义样式。

  ```xaml
  <Style x:Key="Primary" TargetType="Button" BasedOn="{StaticResource {x:Type Button}}">
      <Setter Property="FontSize" Value="20" />
  </Style>
  ```

## 四、System.Collections.Generic

包含用于定义泛型集合的接口和类，可允许用户创建强类型集合，以提供比非泛型强类型集合更好的类型安全性和性能。

### List\<T>

表示可通过索引访问的对象的强类型列表。提供用于对列表进行搜索、排序和操作的方法。

实例方法：

- List\<T>.**FindIndex**(*Predicate\<T>*)

  搜索与指定谓词所定义的条件相匹配的元素，并返回整个 List\<T> 中第一个匹配元素的从零开始的索引。

  ```c#
  List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };
  int index = numbers.FindIndex(x => x == 3);
  Console.WriteLine("Index of 3: " + index);
  ```

## 五、System.Linq

### Enumerable

提供一组用于查询实现 `IEnumerable<T>` 的对象的 `static` 方法。

静态方法：

- Enumerable.**Where**\<TSource>(*IEnumerable\<TSource>*, *Func\<TSource, Int32, Boolean>*)

  基于谓词筛选值序列。将在谓词函数的逻辑中使用每个元素的索引。

  例如，根据 PartNumber 的值，将 salesOrderItems 去重。

  ```c#
  var parts = salesOrderItems
      .Where((x, i) => salesOrderItems.FindIndex(z => z.PartNumber == x.PartNumber) == i)
      .ToList();
  ```

