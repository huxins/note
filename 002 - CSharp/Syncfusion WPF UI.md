# Syncfusion WPF UI

[Syncfusion Essential Studio for WPF](https://help.syncfusion.com/wpf/welcome-to-syncfusion-essential-wpf) 是一个由超过 90 种基本 WPF 控件组成的综合集合，用于更快地构建强大的业务线 Windows 应用程序。

[社区许可证](https://www.syncfusion.com/products/communitylicense)为个人开发人员和小企业提供了对所有 [Syncfusion](https://www.syncfusion.com/) 产品的免费访问。

## 一、主题

[`SfSkinManager`](https://help.syncfusion.com/cr/wpf/Syncfusion.SfSkinManager.SfSkinManager.html) 可帮助应用 Syncfusion 和 Framework 控件的主题。

通过 XAML 代码进行添加：

```xaml
<syncfusion:ChromelessWindow
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:syncfusion="http://schemas.syncfusion.com/wpf"
    xmlns:syncfusionskin="clr-namespace:Syncfusion.SfSkinManager;assembly=Syncfusion.SfSkinManager.WPF"
    syncfusionskin:SfSkinManager.Theme="{syncfusionskin:SkinManagerExtension ThemeName=SystemTheme}" />
```

或者引入具体资源，再通过 [Key](https://help.syncfusion.com/wpf/themes/skin-manager#resource-key-list) 启用：

```xaml
<ResourceDictionary Source="/Syncfusion.Themes.SystemTheme.WPF;component/MSControl/PrimaryButton.xaml" />

<Button
    Width="100"
    Height="23"
    Content="刷新数据"
    Style="{StaticResource WPFPrimaryButtonStyle}" />
```

### SfBusyIndicator

[繁忙指示器](https://help.syncfusion.com/wpf/busy-indicator/overview)控件包含超过 37 个内置动画，可在应用程序中显示。

```xaml
<syncfusion:SfBusyIndicator
    x:Name="busyIndicator"
    Grid.Row="1"
    AnimationType="DoubleCircle"
    Background="Transparent"
    Foreground="Black"
    Header="正在加载..."
    IsBusy="{Binding IsBusy}" />
```

### SfDataGrid

[SfDataGrid](https://help.syncfusion.com/wpf/datagrid/overview) 控件用于在行和列中显示数据的集合。

属性：

- SfDataGrid.**ColumnSizer**

  获取或设置一个[值](https://help.syncfusion.com/cr/wpf/Syncfusion.UI.Xaml.Grid.SfDataGrid.html#Syncfusion_UI_Xaml_Grid_SfDataGrid_ColumnSizer)，该值指示如何确定列宽。

  ```xaml
  <syncfusion:SfDataGrid
      x:Name="dataGrid"
      ColumnSizer="Auto"
      ItemsSource="{Binding SalesOrderReviews}" />
  ```

#### 条件样式

##### 单元格样式

###### 转换器

通过使用[转换器](https://help.syncfusion.com/wpf/datagrid/conditional-styling#conditional-styling-of-cells-using-converter)根据 `cell value` 或 `data object` 更改其属性值，可以有条件地自定义 `GridCell`。

```xaml
<syncfusion:GridPercentColumn.CellStyle>
    <Style TargetType="syncfusion:GridCell">
        <Setter Property="Background" Value="{Binding Path=GrossMargin, Converter={StaticResource ProfitRateColorConverter}}" />
    </Style>
</syncfusion:GridPercentColumn.CellStyle>
```

###### 数据触发器

基于指定条件应用属性值的[触发器](https://help.syncfusion.com/wpf/datagrid/conditional-styling#conditional-styling-of-cells-using-triggers)。

默认只能进行等于比较，无法直接进行大于或小于的比较。

```xaml
<syncfusion:GridPercentColumn.CellStyle>
    <Style TargetType="syncfusion:GridCell">
        <Style.Triggers>
            <DataTrigger Binding="{Binding Path=GrossMargin}" Value="0.5">
                <Setter Property="Background" Value="Bisque" />
            </DataTrigger>
        </Style.Triggers>
    </Style>
</syncfusion:GridPercentColumn.CellStyle>
```

通过 `Converter`，可以实现大于、小于或者其他条件进行判定。

例如，当关联单据为空，就更换背景颜色。

```xaml
<syncfusion:GridCurrencyColumn.CellStyle>
    <Style TargetType="syncfusion:GridCell">
        <Style.Triggers>
            <DataTrigger Binding="{Binding Path=LinkedPurchaseOrders, Converter={StaticResource LinkedPurchaseOrdersConverter}}" Value="">
                <Setter Property="Background" Value="LightPink" />
            </DataTrigger>
        </Style.Triggers>
    </Style>
</syncfusion:GridCurrencyColumn.CellStyle>
```

使用 `MultiDataTrigger` 可以指定多个条件。

```xaml
<syncfusion:GridCurrencyColumn.CellStyle>
    <Style TargetType="syncfusion:GridCell">
        <Style.Triggers>
            <MultiDataTrigger>
                <MultiDataTrigger.Conditions>
                    <Condition Binding="{Binding Path=LinkedPurchaseOrders, Converter={StaticResource LinkedPurchaseOrdersConverter}}" Value="" />
                    <Condition Binding="{Binding Path=PurchaseUnitPrice, Converter={StaticResource GreaterThanConverter}, ConverterParameter=0}" Value="True" />
                </MultiDataTrigger.Conditions>
                <Setter Property="Background" Value="#CCCCCC" />
            </MultiDataTrigger>
        </Style.Triggers>
    </Style>
</syncfusion:GridCurrencyColumn.CellStyle>
```

## 二、Excel library

[Essential XlsIO](https://www.syncfusion.com/document-processing/excel-framework/net) 是一个本地 .NET 类库，可用于使用 C#、VB.NET 和托管 C++ 代码创建和修改 Microsoft Excel 文件。

### 2.1. 导入

#### 从工作表导入数据

从工作表中导入原始数据后，可以按需求对数据进行处理。

```c#
public void Import(string filePath)
{
    using (ExcelEngine excelEngine = new ExcelEngine())
    {
        IApplication application = excelEngine.Excel;
        application.DefaultVersion = ExcelVersion.Excel2016;

        // 加载 Excel 文件
        FileStream fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read);
        IWorkbook workbook = application.Workbooks.Open(fileStream);
        IWorksheet worksheet = workbook.Worksheets[0];

        // 遍历工作表中的行
        for (int row = 14; row <= worksheet.UsedRange.LastRow; row++)
        {
            DateTime date = worksheet[row, 1].DateTime;
            string description = worksheet[row, 2].Text;
            decimal amount = decimal.Parse(worksheet[row, 3].Text);
        }

        // Close the workbook and stream
        workbook.Close();
        fileStream.Close();
    }
}
```

