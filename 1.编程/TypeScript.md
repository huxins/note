# TypeScript

## 一、类型

### 1.1. 基础类型

- **boolean**

  ```typescript
  let isDone: boolean = false;
  ```

- **number**

  ```typescript
  let decLiteral: number = 6;
  let hexLiteral: number = 0xf00d;
  let binaryLiteral: number = 0b1010;
  let octalLiteral: number = 0o744;
  ```

- **string**

  ```typescript
  let name: string = "bob";
  ```

- **any**

  TypeScript 中的一个逃逸类型，可以绕过类型检查系统，因此不会对值进行任何类型检查。

  ```typescript
  let notSure: any = 4;
  notSure = "maybe a string instead";
  notSure = false;
  ```

- **unknown**

  `unknown` 类型也表示不确定的类型，但与 `any` 不同，它是类型安全的。

  当你将一个值声明为 `unknown` 类型时，必须在使用它之前先进行类型检查或类型断言，以告诉 TypeScript 它的确切类型。

  ```typescript
  let notSure: unknown = 4;
  notSure = "maybe a string instead";
  notSure = false;
  ```

- **void**

  `void` 类型表示没有任何类型。常用于表示函数没有返回值。

  ```typescript
  function warnUser(): void {
    console.log("This is my warning message");
  }
  ```

- **never**

  `never` 类型表示永不存在的值的类型。常用于表示会抛出异常的函数的返回值。

  ```typescript
  function error(message: string): never {
    throw new Error(message);
  }
  ```

### 1.2. 联合类型

联合类型表示取值可以为多种类型中的一种。

```typescript
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

### 1.3. 字面量类型

- **字符串字面量类型**

  ```typescript
  let myFavoriteString: "abc" | "def";
  ```

