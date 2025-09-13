# .NET 标准库

[.NET Standard 类库](https://learn.microsoft.com/zh-cn/dotnet/standard/class-libraries#net-standard-class-libraries)是平台特定的库和可移植库概念的替代。

## System

[System](https://learn.microsoft.com/zh-cn/dotnet/api/system) 命名空间包含用于定义常用值和引用数据类型、事件和事件处理程序、接口、属性和处理异常的基本类和基类。

### 基本对象

#### Object

[`Object`](https://learn.microsoft.com/zh-cn/dotnet/api/system.object) 是所有 .NET 类的最终基类。

**实例方法**：

- Object.[**GetHashCode**](https://learn.microsoft.com/zh-cn/dotnet/api/system.object.gethashcode)()

  用作默认的哈希函数。

  重写 [`GetHashCode()`](https://learn.microsoft.com/zh-cn/dotnet/api/system.object.gethashcode) 的派生类也必须重写 [`Equals(Object)`](https://learn.microsoft.com/zh-cn/dotnet/api/system.object.equals)，以确保两个被视为相等的对象具有相同的哈希代码。

  - `Equals(Object)` 方法用于确定两个对象是否相等，基于对象的引用相等性进行比较。
  - `GetHashCode()` 方法返回一个哈希码，用于在哈希表等数据结构中快速查找对象。

  如果两个对象根据 `Equals(Object)` 方法被认为是相等的，那么它们的哈希码也必须相同。这是哈希表工作的基础，否则，`Hashtable` 类型可能无法正常工作。

- Object.[**Equals**(*Object*)](https://learn.microsoft.com/zh-cn/dotnet/api/system.object.equals#system-object-equals(system-object))

  确定指定对象是否等于当前对象。

  `Object` 类中的 `Equals` 方法区分两个对象的做法是[比较地址值](https://github.com/dotnet/runtime/blob/v8.0.6/src/libraries/System.Private.CoreLib/src/System/Object.cs#L50C13-L50C32)。

  重写 `Equals()` 方法的实现，也应当同时改写 `GetHashCode()` 方法的实现。否则 `GetHashCode()` 方法依然返回的是依据 `Object` 类中的地址值得到的哈希值。

  例如，`String` 类中，`Equals()` 方法经过[重写](https://github.com/dotnet/runtime/blob/v8.0.6/src/libraries/System.Private.CoreLib/src/System/String.Comparison.cs#L613C13-L622C44)，`String` 对象在调用 `Equals()` 方法比较另一个对象时，除了认定相同地址值的两个对象相等以外，还认定每个字符都相等的两个 `String` 对象也相等，即使这两个 `String` 对象的地址值不同。同时 [`GetHashCode()`](https://github.com/dotnet/runtime/blob/1d1bf92fcf43aa6981804dc53c5174445069c9e4/src/libraries/System.Private.CoreLib/src/System/String.Comparison.cs#L753C13-L756C167) 方法并不是基于对象的地址引用，而是基于字符串的内容计算的哈希码。
  

#### Random

[`Random`](https://learn.microsoft.com/zh-cn/dotnet/api/system.random) 是伪随机数生成器。

**实例方法**：

- Random.[**Next**(*Int32*, *Int32*)](https://learn.microsoft.com/zh-cn/dotnet/api/system.random.next#system-random-next(system-int32-system-int32))

  返回在指定范围内的任意整数。

  ```c#
  Random dice = new Random();
  int roll = dice.Next(1, 7);  // 该随机数大于等于 1，小于 7。
  ```

#### String

[`String`](https://learn.microsoft.com/zh-cn/dotnet/api/system.string) 将文本表示为 UTF-16 代码单元的序列。

**静态方法**：

- String.[**IsNullOrWhiteSpace**(*String*)](https://learn.microsoft.com/zh-cn/dotnet/api/system.string.isnullorwhitespace#system-string-isnullorwhitespace(system-string))

  指示指定的字符串是 `null`、空还是仅由空白字符组成。

## System.Windows.Controls

[System.Windows.Controls](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls) 命名空间提供一些类以创建称为控件的元素，从而使用户可使用这些元素与应用程序进行交互。

### 布局

#### Grid

[`Grid`](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.grid) 定义由列和行组成的灵活的网格区域。

**属性**：

- Grid.[**RowDefinitions**](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.grid.rowdefinitions#system-windows-controls-grid-rowdefinitions)

  获取在 `Grid` 的实例上定义的 [`RowDefinitionCollection`](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.rowdefinitioncollection)。

  ```xaml
  <Grid Margin="10">
      <Grid.RowDefinitions>
          <RowDefinition Height="*" />
          <RowDefinition Height="*" />
      </Grid.RowDefinitions>
  </Grid>
  ```

- Grid.[**ColumnDefinitions**](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.grid.columndefinitions#system-windows-controls-grid-columndefinitions)

  获取在 `Grid` 的实例上定义的 [`ColumnDefinitionCollection`](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.columndefinitioncollection)。

  ```xaml
  <Grid Margin="10">
      <Grid.ColumnDefinitions>
          <ColumnDefinition Width="*" />
          <ColumnDefinition Width="*" />
      </Grid.ColumnDefinitions>
  </Grid>
  ```

#### StackPanel

[`StackPanel`](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.stackpanel) 将子元素排列成水平或垂直的一行。

```xaml
<StackPanel Grid.Row="1" Grid.Column="1" Margin="5,0,0,0">
    
</StackPanel>
```

### 控件

#### Control

[`Control`](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.control) 表示 UI 元素的基类，这些元素使用 [`ControlTemplate`](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.controltemplate) 来定义其外观。

**属性**：

- Control.[**Template**](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.control.template#system-windows-controls-control-template)

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

#### ControlTemplate

[`ControlTemplate`](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.controltemplate) 指定 `Control` 的可在其多个实例之间共享的可视结构和行为方面。

**属性**：

- ControlTemplate.[**Triggers**](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.controltemplate.triggers#system-windows-controls-controltemplate-triggers)

  获取根据指定条件应用属性更改或执行操作的 [`TriggerBase`](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.triggerbase) 对象的集合。

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

#### Label

[`Label`](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.label) 表示控件的文本标签。

```xaml
<Label Grid.Column="1">Names</Label>
```

#### TextBox

[`TextBox`](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.TextBox) 表示一个控件，该控件可用于显示或编辑无格式文本。

```xaml
<TextBox x:Name="txtName" />
```

**实例属性**：

- TextBox.[**Text**](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.textbox.text#system-windows-controls-textbox-text)

  获取或设置文本框的文本内容。

**实例方法**：

- TextBox.[**Clear**](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.textbox.clear#system-windows-controls-textbox-clear)()

  清除文本框中的所有内容。

#### Button

[`Button`](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.Button) 表示 Windows 按钮控件，该按钮对 [`Click`](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.primitives.buttonbase.click#system-windows-controls-primitives-buttonbase-click) 事件做出反应。

```xaml
<Button x:Name="btnAdd" Margin="0,5,0,0" Click="ButtonAddName_Click">Add Name</Button>
```

#### ListBox

[`ListBox`](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.ListBox) 包含可选项列表。

```xaml
<!-- 列表框将位于第 1 行和第 0 列，并将此控件命名为 lstNames -->
<ListBox Grid.Row="1" x:Name="lstNames" />
```

**实例属性**：

- ListBox.[**Items**](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.itemscontrol.items#system-windows-controls-itemscontrol-items)

  获取用于生成 [`ItemsControl`](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.itemscontrol) 的内容的集合。

#### DataGrid

[`DataGrid`](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.controls.datagrid) 表示用于在可自定义的网格中显示数据的控件。

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

## System.Windows

[System.Windows](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows) 命名空间提供了一些重要的 WPF 基元素类、各种支持 WPF 属性系统和事件逻辑的类以及由 WPF 核心和框架更加广泛使用的其他类型。

### 资源

#### Application

[`Application`](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.application) 封装 WPF 应用程序。

**属性**：

- Application.[**Resources**](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.application.resources#system-windows-application-resources)

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

#### ResourceDictionary

[`ResourceDictionary`](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.ResourceDictionary) 提供一个哈希表实现，其中包含组件所使用的 WPF 资源以及 WPF 应用程序的其他元素。

```xaml
<ResourceDictionary xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
                    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Style TargetType="Button">
        <Setter Property="Background" Value="Red" />
    </Style>
</ResourceDictionary>
```

**属性**：

- ResourceDictionary.[**MergedDictionaries**](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.resourcedictionary.mergeddictionaries#system-windows-resourcedictionary-mergeddictionaries)

  获取 `ResourceDictionary` 字典的集合，这些字典构成了合并字典中的各种资源字典。

  ```xaml
  <ResourceDictionary>
      <ResourceDictionary.MergedDictionaries>
          <ResourceDictionary Source="/WPF_APP;component/Dictionary1.xaml" />
      </ResourceDictionary.MergedDictionaries>
  </ResourceDictionary>
  ```

### 元素

#### FrameworkElement

[`FrameworkElement`](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.frameworkelement) 为 WPF 元素提供一组 WPF 框架级属性、事件和方法。

**实例属性**：

- FrameworkElement.[**Style**](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.frameworkelement.style#system-windows-frameworkelement-style)

  获取或设置此元素呈现时所使用的样式。

  ```xaml
  <Button x:Name="btnAdd" Style="{StaticResource Primary}" Content="Add Name" />
  ```

- FrameworkElement.[**Resources**](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.frameworkelement.resources#system-windows-frameworkelement-resources)

  获取或设置本地定义的资源字典。

  ```xaml
  <Window.Resources>
      <Style TargetType="Button">
          <Setter Property="Background" Value="Red" />
      </Style>
  </Window.Resources>
  ```

#### Style

[`Style`](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.style) 在类型的不同实例之间共享属性、资源和事件处理程序。

```xaml
<Style x:Key="Primary" TargetType="Button">
    <Setter Property="Background" Value="Red" />
</Style>
```

**实例属性**：

- Style.[**BasedOn**](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.style.basedon#system-windows-style-basedon)

  获取或设置一个作为当前样式的基准的已定义样式。

  ```xaml
  <Style x:Key="Primary" TargetType="Button" BasedOn="{StaticResource {x:Type Button}}">
      <Setter Property="FontSize" Value="20" />
  </Style>
  ```

## System.Collections.Generic

[System.Collections.Generic](https://learn.microsoft.com/zh-cn/dotnet/api/System.Collections.Generic) 命名空间包含用于定义泛型集合的接口和类，可允许用户创建强类型集合，以提供比非泛型强类型集合更好的类型安全性和性能。

### 集合

#### List\<T>

[`List<T>`](https://learn.microsoft.com/zh-cn/dotnet/api/system.collections.generic.list-1) 表示可通过索引访问的对象的强类型列表。提供用于对列表进行搜索、排序和操作的方法。

**实例方法**：

- List\<T>.[**FindIndex**(*Predicate\<T>*)](https://learn.microsoft.com/zh-cn/dotnet/api/system.collections.generic.list-1.findindex#definition)

  搜索与指定条件函数所定义的条件相匹配的元素，并返回整个 `List<T>` 中第一个匹配元素的从零开始的索引。

  ```c#
  List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };
  int index = numbers.FindIndex(x => x == 3);
  Console.WriteLine("Index of 3: " + index);
  ```

## System.Linq

[System.Linq](https://learn.microsoft.com/zh-cn/dotnet/api/System.Linq) 命名空间提供支持某些查询的类和接口，这些查询使用语言集成查询 LINQ。

### Enumerable

[`Enumerable`](https://learn.microsoft.com/zh-cn/dotnet/api/system.linq.enumerable) 提供一组用于查询实现 `IEnumerable<T>` 的对象的静态方法。

**静态方法**：

- Enumerable.[**Where**](https://learn.microsoft.com/zh-cn/dotnet/api/system.linq.enumerable.where#definition)\<TSource>(*IEnumerable\<TSource>*, *Func\<TSource, Int32, Boolean>*)

  基于条件函数筛选值序列。将在条件函数的逻辑中使用每个元素的索引。

  例如，根据 `PartNumber` 的值，将 `salesOrderItems` 去重。

  ```c#
  var parts = salesOrderItems
      .Where((x, i) => salesOrderItems.FindIndex(z => z.PartNumber == x.PartNumber) == i)
      .ToList();
  ```

