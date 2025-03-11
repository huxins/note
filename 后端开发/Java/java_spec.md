# 语言规范

## Classes

### 类声明

#### 内部类和封闭实例

在 Java 中，可以将一个类定义在另一个类里面或者一个方法里面，这样的类称为内部类。广泛意义上的内部类一般包括这四种：成员内部类、局部内部类、匿名内部类和静态内部类。

##### 成员内部类

在一个类中除了可以定义成员变量、成员方法，还可以定义类，这样的类被称作成员内部类。

成员内部类是最普通的内部类，它的定义为位于另一个类的内部，形如下面的形式：

```java
public class Outer {
    class Inner {
        
    }
}
```

类 `Inner` 像是类 `Outer` 的一个成员，`Outer` 称为外部类。

在成员内部类中，可以无条件访问外部类的所有成员属性和成员方法，包括 `private` 成员和 `static`成员；

在外部类中，如果要访问成员内部类的成员，必须先创建一个成员内部类的对象，再通过这个对象来访问。

```java
public class Outer {
    private double radius = 0;
    private static int count = 1;

    private void runOuterMethod() {
        System.out.println("外部类成员方法");
    }

    public void showInner() {
        Inner inner = new Inner();
        System.out.println(inner.number);
        inner.runInnerMethod();
    }

    class Inner {
        private int number = 0;

        private void runInnerMethod() {
            System.out.println("内部类成员方法");
        }

        public void showOuter() {
            System.out.println(radius);
            System.out.println(count);
            runOuterMethod();
        }
    }
}
```

不过要注意的是，当成员内部类拥有和外部类同名的成员变量或者方法时，会发生隐藏现象，即默认情况下访问的是成员内部类的成员。如果要访问外部类的同名成员，需要以下面的形式进行访问：

```java
外部类.this.成员变量
外部类.this.成员方法
```

成员内部类是依附外部类而存在的，也就是说，如果要创建成员内部类的对象，前提是必须存在一个外部类的对象。创建成员内部类对象的一般方式如下：

```java
Outer outer = new Outer();
Outer.Inner inner = outer.new Inner();
```

或者使用单例模式：

```java
Outer outer = new Outer();
Outer.Inner inner = outer.getInnerInstance();
```

内部类可以拥有 `private`、`protected`、`public` 及包访问权限。这一点和外部类有一点不一样，外部类只能被 `public` 和包访问两种权限修饰。我个人是这么理解的，由于成员内部类看起来像是外部类的一个成员，所以可以像类的成员一样拥有多种权限修饰。

在 [Java 8](https://docs.oracle.com/javase/tutorial/java/javaOO/nested.html) 中，非静态内部类的对象与其外部类的实例相关联，不能在其中拥有静态成员，除非是常量。这不是一个技术问题，是一个语言设计。参考 [stackoverflow](https://stackoverflow.com/questions/11684844/why-a-non-static-inner-class-cannot-have-static-members-fields-and-methods)。限 [Java 8](https://docs.oracle.com/javase/specs/jls/se8/html/jls-8.html#jls-8.1.3)，在 [Java 16](https://docs.oracle.com/javase/specs/jls/se16/html/jls-8.html#jls-8.1.3) 中发生了变化。

##### 局部内部类

局部内部类，也叫做方法内部类，就是定义在某个局部范围中的类，它和局部变量一样，都是在方法中定义的，其有效范围只限于方法内部。

在局部内部类中，局部内部类可以访问外部类的所有成员变量和方法，而局部内部类中的变量和方法却只能在创建该局部内部类的方法中进行访问。

```java
public class Outer {
    private double radius = 0;
    private static int count = 1;

    private void runOuterMethod() {
        System.out.println("外部类成员方法");
    }

    public void showInner() {
        class Inner {
            private int number = 0;

            private void runInnerMethod() {
                System.out.println("内部类成员方法");
            }

            public void showOuter() {
                System.out.println(radius);
                System.out.println(count);
                runOuterMethod();
            }
        }

        Inner inner = new Inner();
        inner.showOuter();
        System.out.println(inner.number);
        inner.runInnerMethod();
    }
}
```

注意，局部内部类就像是方法里面的一个局部变量一样，是不能有 `public`、`protected`、`private` 以及 `static` 修饰符的。

局部内部类若要访问其所在方法内的变量，则该变量必须是 `final` 修饰的。

被内部类访问的局部变量会被拷贝一份到内部类中，即 `Inner` 中存在一个成员变量，用于记录局部变量的值。若局部变量不是 `final` 的，其取值就可以被修改，而 `Inner` 对象中保存的是其原来的值，这就会出现数据不同步的问题。Java 为了避免数据不同步的问题，做出了内部类只可以访问 `final` 的局部变量的限制。

在 [Java 8](https://docs.oracle.com/javase/tutorial/java/javaOO/localclasses.html#accessing-members-of-an-enclosing-class) 中，可以不使用 `final`，如果局部变量被内部类访问，那么该局部变量相当于自动使用了 `final` 修饰。参考 [stackoverflow](https://stackoverflow.com/questions/28408109/java-stopped-erroring-on-non-final-variables-in-inner-classes-java-8)。

```java
public class Outer {
    public void showInner() {
        final int radius = 0;
        class Inner {
            private void runInnerMethod() {
                System.out.println(radius);
            }
        }
    }
}
```

##### 匿名内部类

在 Java 中调用某个方法时，如果该方法的参数是一个接口类型，除了可以传入一个参数接口实现类，还可以使用匿名内部类实现接口来作为该方法的参数。匿名内部类其实就是没有名称的内部类，在调用包含有接口类型参数的方法时，通常为了简化代码，不会创建一个接口的实现类作为方法参数传入，而是直接通过匿名内部类的形式传入一个接口类型参数，在匿名内部类中直接完成方法的实现。

创建匿名内部类的基本语法格式如下：

```java
new 父接口(){
    ...
}
```

匿名内部类是唯一没有构造器的类。正因为其没有构造器，所以匿名内部类的使用范围非常有限，大部分匿名内部类用于接口回调。匿名内部类在编译的时候由系统自动起名为 `Outer$1.class`。一般来说，匿名内部类用于继承其他类或是实现接口，并不需要增加额外的方法，只是对继承方法的实现或是重写。

##### 静态内部类

所谓静态内部类，就是使用 `static` 关键字修饰的成员内部类。静态内部类是不需要依赖于外部类的，这点和类的静态成员属性有点类似，并且它只能访问外部类的静态成员；同时通过外部类访问静态内部类成员时，可以跳过外部类从而直接通过内部类访问静态内部类成员。

```java
Outer.Inner inner = new Outer.Inner();
```

##### 使用场景

###### 静态内部类

一般是当外部类需要使用内部类，而内部类无需外部类资源，并且内部类可以单独创建的时候会考虑采用静态内部类的设计。

在 `Effective Java` 第二章，当面临许多构造函数参数时，请考虑构建器：

```java
public class Outer {
    private String name;
    private int age;

    public static class Builder {
        private String name;
        private int age;

        public Builder(int age) {
            this.age = age;
        }

        public Builder withName(String name) {
            this.name = name;
            return this;
        }

        public Builder withAge(int age) {
            this.age = age;
            return this;
        }

        public Outer build() {
            return new Outer(this);
        }
    }

    private Outer(Builder b) {
        this.age = b.age;
        this.name = b.name;
    }
}
```

静态内部类调用外部类的构造函数，来构造外部类：

```java
Outer outer = new Outer.Builder(2).withName("Yang Liu").build();
```

## 参考文献

- [为什么匿名内部类的参数引用必须是 final - 知乎](https://www.zhihu.com/question/21395848)

## 参见

- [The Java® Language Specification](https://docs.oracle.com/javase/specs/jls/se8/html/index.html)

