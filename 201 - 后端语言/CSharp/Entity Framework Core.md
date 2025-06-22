# Entity Framework Core

[Entity Framework Core](https://learn.microsoft.com/zh-cn/ef/core/) 是轻量化、可扩展、开源和跨平台的数据访问技术。

## 一、安装

EF Core 以 [NuGet 包](https://www.nuget.org/packages/Microsoft.EntityFrameworkCore)的形式提供，支持多个[数据库引擎](https://learn.microsoft.com/zh-cn/ef/core/providers/)。

MySQL 使用 [`Pomelo.EntityFrameworkCore.MySql`](https://www.nuget.org/packages/Pomelo.EntityFrameworkCore.MySql)。

```sh
dotnet add package Pomelo.EntityFrameworkCore.MySql --version 8.0.2
```

## 二、模型

EF Core 使用元数据[模型](https://learn.microsoft.com/zh-cn/ef/core/modeling/)来描述如何将应用程序的实体类型映射到基础数据库。

### 实体类型

在上下文中包含一种类型的 `DbSet`，或在 `OnModelCreating` 方法中指定实体类型，意味着它包含在 EF Core 的模型中，我们将此类类型称为[实体](https://learn.microsoft.com/zh-cn/ef/core/modeling/entity-types)。

例如，[`DbContext`](https://learn.microsoft.com/zh-cn/ef/core/dbcontext-configuration/) 的 `DbSet` 属性中公开的类型作为实体包含在模型中。

```c#
public class ApplicationDbContext : DbContext
{
    public DbSet<SalesOrder> SalesOrders { get; set; }
}
```

例如，在 `OnModelCreating` 方法中指定的实体类型包含在模型中。

```c#
public class ApplicationDbContext : DbContext
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<SalesOrder>();
    }
}
```

### 配置模型

可在 `ApplicationDbContext` 中重写 `OnModelCreating` 方法，并使用 [Fluent API](https://learn.microsoft.com/zh-cn/ef/core/modeling/#use-fluent-api-to-configure-a-model) 来配置模型。

```c#
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<SalesOrder>(entity =>
    {
        entity.ToTable("so");

        entity.HasKey(e => e.SalesOrderNumber);

        entity
            .Property(e => e.SalesOrderNumber)
            .HasColumnName("so")
            .HasMaxLength(10);

        entity
            .Property(e => e.OrderDate)
            .HasColumnName("entered");
    });
}
```

为了减小 `OnModelCreating` 方法的大小，可以将实体类型的所有配置提取到实现 `IEntityTypeConfiguration<TEntity>` 的单独类中。

```c#
public class SalesOrderEntityTypeConfiguration : IEntityTypeConfiguration<SalesOrder>
{
    public void Configure(EntityTypeBuilder<SalesOrder> builder)
    {
        builder.ToTable("so");

        builder.HasKey(e => e.SalesOrderNumber);

        builder
            .Property(e => e.SalesOrderNumber)
            .HasColumnName("so")
            .HasMaxLength(10);

        builder
            .Property(e => e.OrderDate)
            .HasColumnName("entered");
    }
}
```

然后，只需从 `OnModelCreating` 调用 `Configure` 方法。

```c#
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    new SalesOrderEntityTypeConfiguration().Configure(modelBuilder.Entity<SalesOrder>());
}
```

### 配置连接

可以按照常规的 .NET 方式构造 [`DbContext`](https://learn.microsoft.com/zh-cn/ef/core/dbcontext-configuration/#simple-dbcontext-initialization-with-new) 实例。

例如，通过重写 `OnConfiguring` 方法来执行配置。

```c#
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    if (optionsBuilder.IsConfigured) return;

    string connectionString = @"server=localhost;
                                port=3307;
                                user id=user;
                                password=****;
                                database=test";

    optionsBuilder.UseMySql(connectionString,
        new MySqlServerVersion(new Version(8, 0, 21)));
}
```

更工程化的方法的通过[依赖关系注入](https://learn.microsoft.com/zh-cn/ef/core/dbcontext-configuration/#dbcontext-in-dependency-injection-for-aspnet-core)。

### 关系导航

[关系](https://learn.microsoft.com/zh-cn/ef/core/modeling/relationships)定义两个实体之间的相关性。

#### 一对多

当单个实体与任意数量的其他实体关联时，将使用[一对多](https://learn.microsoft.com/zh-cn/ef/core/modeling/relationships/one-to-many)关系。

配置实体之间的一对多关系时，可以选择在多端或一端进行配置，但通常只需要在一端进行配置即可。

例如，最简单的一对多关系，就是 `Blog` 和 `Post`。

```c#
public class Blog
{
    public int Id { get; set; }
    public ICollection<Post> Posts { get; } = new List<Post>();
}

public class Post
{
    public int Id { get; set; }
    public int BlogId { get; set; }
    public Blog Blog { get; set; } = null!;
}
```

在 `OnModelCreating` 的 `Entity<Blog>` 中进行配置。

```c#
builder.ToTable("Blog");
builder
    .HasMany(e => e.Posts)
    .WithOne(e => e.Blog)
    .HasForeignKey(e => e.BlogId);
```

在 `OnModelCreating` 的 `Entity<Post>` 中进行配置。

```c#
builder.ToTable("Post");
builder
    .HasOne(e => e.Blog)
    .WithMany(e => e.Posts)
    .HasForeignKey(e => e.BlogId);
```

#### 一对一

当一个实体与最多一个其他实体关联时，将使用[一对一](https://learn.microsoft.com/zh-cn/ef/core/modeling/relationships/one-to-one)关系。

例如，最简单的一对一关系，就是 `Blog` 和 `BlogHeader`。

```c#
public class Blog
{
    public int Id { get; set; }
    public BlogHeader? Header { get; set; }
}

public class BlogHeader
{
    public int Id { get; set; }
    public int BlogId { get; set; }
    public Blog? Blog { get; set; }
}
```

一对多已经明确谁是主体，而对于一对一关系二者为一一对应关系，所以 EF Core 无法判断其主体，必须我们手动去指定。

```c#
builder.ToTable("Blog");
builder
    .HasOne(e => e.Header)
    .WithOne(e => e.Blog)
    .HasForeignKey<BlogHeader>(e => e.BlogId);
```

#### 多对多

当一个实体类型的任意数量的实体与相同或另一个实体类型的任意数量的实体相关联时，将使用[多对多](https://learn.microsoft.com/zh-cn/ef/core/modeling/relationships/many-to-many)关系。

例如，最简单的多对多关系，就是 `Product` 和 `Category`。

```c#
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }

    public IEnumerable<ProductCategory> ProductCategorys { get; set; }
}

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; }

    public IEnumerable<ProductCategory> ProductCategorys { get; set; }
}
```

##### 中间实体

通过 `ProductCategory` 关联表，将其转为一对多的关系。

```c#
public class ProductCategory
{
    public int ProductId { get; set; }
    public Product Product { get; set; }

    public int CategoryId { get; set; }
    public Category Category { get; set; }
}
```

最终我们通过 `ProductCategory` 来进行映射。

```c#
builder.ToTable("ProductCategory");
builder
    .HasOne(e => e.Product)
    .WithMany(e => e.ProductCategorys)
    .HasForeignKey(e => e.ProductId);
builder
    .HasOne(e => e.Category)
    .WithMany(e => e.ProductCategorys)
    .HasForeignKey(e => e.CategoryId);
```

##### 内置支持

EF Core 3.0 及以上版本支持自动管理多对多关系，不需要显式定义中间实体。

内置的多对多关系不支持在中间表中存储额外的数据，因为中间实体被 EF Core 隐藏。

## 三、查询

Entity Framework Core 使用语言集成查询 LINQ 来[查询](https://learn.microsoft.com/zh-cn/ef/core/querying/)数据库中的数据。

### 单表查询

加载所有数据。

```c#
using (var context = new ApplicationDbContext())
{
    var salesOrders = context.SalesOrders.ToList();
}
```

筛选。

```c#
using (var context = new ApplicationDbContext())
{
    var salesOrderItems = context.SalesOrderItems
        .Where(s => s.SalesOrderNumber.Contains("S2401196"))
        .ToList();
}
```

### 关联数据

Entity Framework Core 允许在模型中使用导航属性来[加载关联实体](https://learn.microsoft.com/zh-cn/ef/core/querying/related-data/)。

#### 预先加载

[预先加载](https://learn.microsoft.com/zh-cn/ef/core/querying/related-data/eager)表示从数据库中加载关联数据，作为初始查询的一部分。

可以使用 `Include` 方法来指定要包含在查询结果中的关联数据。

```c#
using (var context = new BloggingContext())
{
    var salesOrderItems = context.SalesOrderItems
        .Include(soi => soi.SalesOrder)
        .ToList();
}
```

使用 `ThenInclude` 方法可以依循关系包含多个层级的关联数据。

```c#
using (var context = new BloggingContext())
{
    var salesOrderItems = context.SalesOrderItems
        .Include(soi => soi.PartSpecification)
        .ThenInclude(ps => ps!.PartTracking)
        .Where(s => s.SalesOrderNumber.Contains("S2401196"))
        .ToList();
}
```

## 四、保存

[保存](https://learn.microsoft.com/zh-cn/ef/core/saving/)数据意味着向数据库添加新实体、删除实体或以某种方式修改现有实体的属性。

### 添加数据

使用 `DbSet<TEntity>.Add` 方法[添加](https://learn.microsoft.com/zh-cn/ef/core/saving/basic#adding-data)实体类的新实例。调用 `DbContext.SaveChanges()` 时，数据将插入到数据库中。

```c#
using (var context = new BloggingContext())
{
    var blog = new Blog { Url = "http://example.com" };
    context.Blogs.Add(blog);
    context.SaveChanges();
}
```

