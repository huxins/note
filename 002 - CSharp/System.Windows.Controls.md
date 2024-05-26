# System.Windows.Controls

提供一些类以创建称为控件的元素，从而使用户可使用这些元素与应用程序进行交互。

## 一、布局

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

## 二、控件

### 2.1. 表单

#### Label

表示控件的文本标签。

```xaml
<Label Grid.Column="1">Names</Label>
```

#### TextBox

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

#### Button

表示 Windows 按钮控件，该按钮对 `Click` 事件做出反应。

```xaml
<Button x:Name="btnAdd" Margin="0,5,0,0" Click="ButtonAddName_Click">Add Name</Button>
```

### 2.2. 列表

#### ListBox

列表框控件。

列表框将位于第 `1` 行和第 `0` 列。我们还将此控件命名为 `lstNames`。

```xaml
<ListBox Grid.Row="1" x:Name="lstNames" />
```

实例属性：

- ListBox.**Items**

  获取用于生成 `ItemsControl` 的内容的集合。

