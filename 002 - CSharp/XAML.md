# XAML

[XAML](https://learn.microsoft.com/zh-cn/dotnet/desktop/xaml-services/) 是一种声明性标记语言。应用于 .NET 编程模型时，XAML 可简化为 .NET 应用创建 UI 的过程。

## 一、语法

### 特性语法

[特性语法](https://learn.microsoft.com/zh-cn/dotnet/desktop/wpf/advanced/xaml-syntax-in-detail#attribute-syntax-properties)是最简化的属性设置语法，对象的属性通常可表示为对象元素的特性。

```xaml
<Button Background="Blue" Foreground="Red" Content="This is a button"/>
```

### 属性元素语法

对于对象元素的某些属性，无法使用特性语法，因为无法在特性语法的引号和字符串限制内充分地表达提供属性值所必需的对象或信息。对于这些情况，可以使用另一个语法，即[属性元素语法](https://learn.microsoft.com/zh-cn/dotnet/desktop/wpf/xaml/?view=netdesktop-8.0#property-element-syntax)。

属性元素开始标记的语法为 `<TypeName.PropertyName>`。

```xaml
<Button>
    <Button.Background>
        <SolidColorBrush Color="Blue"/>
    </Button.Background>
    <Button.Foreground>
        <SolidColorBrush Color="Red"/>
    </Button.Foreground>
    <Button.Content>
        This is a button
    </Button.Content>
</Button>
```

### 集合语法

如果某个特定属性采用集合类型，则在标记中声明为该属性的值内的子元素的项将成为集合的一部分。

下面的示例演示用于设置 [GradientStops](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.media.gradientbrush.gradientstops?view=windowsdesktop-8.0) 属性的值的[集合语法](https://learn.microsoft.com/zh-cn/dotnet/desktop/wpf/xaml/#collection-syntax)。

```xaml
<LinearGradientBrush>
    <LinearGradientBrush.GradientStops>
        <!-- no explicit new GradientStopCollection, parser knows how to find or create -->
        <GradientStop Offset="0.0" Color="Red" />
        <GradientStop Offset="1.0" Color="Blue" />
    </LinearGradientBrush.GradientStops>
</LinearGradientBrush>
```

### 附加属性和附加事件

XAML 指定了一种语言功能，该功能允许对任何元素指定某些属性或事件，即使要设置属性或事件的元素的类型定义中不存在该属性或事件也是如此。该功能的属性版本称为[附加属性](https://learn.microsoft.com/zh-cn/dotnet/desktop/wpf/xaml/#attached-properties-and-attached-events)，事件版本称为[附加事件](https://learn.microsoft.com/zh-cn/dotnet/desktop/wpf/xaml/#attached-properties-and-attached-events)。

```xaml
<Label Grid.Column="1">Names</Label>
```

