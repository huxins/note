# XAML

XAML 是一种声明性标记语言。应用于 .NET 编程模型时，XAML 可简化为 .NET 应用创建 UI 的过程。

## 一、语法

### 1.1. 特性语法

特性语法是最简化的属性设置语法，对象的属性通常可表示为对象元素的特性。

```xaml
<Button Background="Blue" Foreground="Red" Content="This is a button"/>
```

### 1.2. 属性元素语法

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

### 1.3. 集合语法

如果某个特定属性采用集合类型，则在标记中声明为该属性的值内的子元素的项将成为集合的一部分。

下面的示例演示用于设置 [GradientStops](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.media.gradientbrush.gradientstops?view=windowsdesktop-8.0) 属性的值的集合语法。

```xaml
<LinearGradientBrush>
    <LinearGradientBrush.GradientStops>
        <!-- no explicit new GradientStopCollection, parser knows how to find or create -->
        <GradientStop Offset="0.0" Color="Red" />
        <GradientStop Offset="1.0" Color="Blue" />
    </LinearGradientBrush.GradientStops>
</LinearGradientBrush>
```

