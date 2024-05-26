# System.Windows.Controls

提供一些类以创建称为控件的元素，从而使用户可使用这些元素与应用程序进行交互。

## 一、布局

### 1.1. Grid

定义由列和行组成的灵活的网格区域。

属性：

- **RowDefinitions**

  获取在 `Grid` 的实例上定义的 `RowDefinitionCollection`。

  ```xaml
  <Grid Margin="10">
      <Grid.RowDefinitions>
          <RowDefinition Height="*" />
          <RowDefinition Height="*" />
      </Grid.RowDefinitions>
  </Grid>
  ```

- **ColumnDefinitions**

  获取在 `Grid` 的实例上定义的 `ColumnDefinitionCollection`。

  ```xaml
  <Grid Margin="10">
      <Grid.ColumnDefinitions>
          <ColumnDefinition Width="*" />
          <ColumnDefinition Width="*" />
      </Grid.ColumnDefinitions>
  </Grid>
  ```

