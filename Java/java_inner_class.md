# 内部类

在 Java 中，可以将一个类定义在另一个类里面或者一个方法里面，这样的类称为内部类。广泛意义上的内部类一般包括这四种：成员内部类、局部内部类、匿名内部类和静态内部类。

## 成员内部类

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
Outter outter = new Outter();
Outter.Inner inner = outter.new Inner();
```

或者使用单例模式：

```java
Outter outter = new Outter();
Outter.Inner inner = outter.getInnerInstance();
```

内部类可以拥有 `private`、`protected`、`public` 及包访问权限。这一点和外部类有一点不一样，外部类只能被 `public` 和包访问两种权限修饰。我个人是这么理解的，由于成员内部类看起来像是外部类的一个成员，所以可以像类的成员一样拥有多种权限修饰。

在 [Java 8](https://docs.oracle.com/javase/tutorial/java/javaOO/nested.html) 中，非静态内部类的对象与其外部类的实例相关联，不能在其中拥有静态成员，除非是常量。这不是一个技术问题，是一个语言设计。参考 [stackoverflow](https://stackoverflow.com/questions/11684844/why-a-non-static-inner-class-cannot-have-static-members-fields-and-methods)。限 [Java 8](https://docs.oracle.com/javase/specs/jls/se8/html/jls-8.html#jls-8.1.3)，在 [Java 16](https://docs.oracle.com/javase/specs/jls/se16/html/jls-8.html#jls-8.1.3) 中发生了变化。

## 局部内部类

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

