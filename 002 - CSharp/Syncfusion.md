# Syncfusion

## 一、WPF

[Syncfusion Essential Studio for WPF](https://help.syncfusion.com/wpf/welcome-to-syncfusion-essential-wpf) 是一个由超过 90 种基本 WPF 控件组成的综合集合，用于更快地构建强大的业务线 Windows 应用程序。

### 1.1. SfDataGrid

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

#### 1.1.2. 条件样式

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

