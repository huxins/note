# Syncfusion

## 一、WPF

[Syncfusion Essential Studio for WPF](https://help.syncfusion.com/wpf/welcome-to-syncfusion-essential-wpf) 是一个由超过 90 种基本 WPF 控件组成的综合集合，用于更快地构建强大的业务线 Windows 应用程序。

### Theme

SfSkinManager 可帮助应用 Syncfusion 和 Framework 控件的主题。

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

[数据触发器](https://help.syncfusion.com/wpf/datagrid/conditional-styling#conditional-styling-of-cells-using-triggers)：默认只能进行等于比较，无法直接进行大于或小于的比较。

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

