# Syncfusion

## 一、WPF

[Syncfusion Essential Studio for WPF](https://help.syncfusion.com/wpf/welcome-to-syncfusion-essential-wpf) 是一个由超过 90 种基本 WPF 控件组成的综合集合，用于更快地构建强大的业务线 Windows 应用程序。

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

