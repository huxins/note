# 函数式编程

函数式编程是一种编程范式，它强调将程序构建为函数的组合，主要通过函数来完成计算，而不是通过状态的改变或可变数据。

## 一、惰性函数

惰性函数表示函数执行的分支，只会在函数第一次调用的时候执行，在第一次调用过程中，该函数会被覆盖为另一个按照合适方式执行的函数。

### 普通方法

普通方法有两个问题，一是污染了全局变量，二是每次调用的时候都需要进行一次判断。

```javascript
var t;
function foo() {
  if (t) return t;
  t = new Date()
  return t;
}
```

### 闭包

闭包可以避免污染全局变量，然而还是没有解决调用时都必须进行一次判断的问题。

```javascript
var foo = (function () {
  var t;
  return function () {
    if (t) return t;
    t = new Date();
    return t;
  }
})();
```

### 函数对象

函数也是一种对象，利用这个特性，我们也可以解决这个问题。

```javascript
function foo() {
  if (foo.t) return foo.t;
  foo.t = new Date();
  return foo.t;
}
```

依旧没有解决调用时都必须进行一次判断的问题。

### 惰性函数

惰性函数就是解决每次都要进行判断的这个问题，解决原理很简单，重写函数。

```javascript
var foo = function () {
  var t = new Date();
  foo = function () {
    return t;
  };
  return foo();
};
```

## Reference

- [JavaScript 专题之惰性函数 - *mqyqingfeng/Blog*](https://github.com/mqyqingfeng/Blog/issues/44)

