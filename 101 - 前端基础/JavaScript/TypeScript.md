# TypeScript



## 一、类型

### 基础类型

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

- **object**

  `object` 表示非原始类型，也就是除 `number`，`string`，`boolean`，`symbol`，`null` 或 `undefined` 之外的类型。

  ```typescript
  let obj: object = { name: "John", age: 30 };
  ```

  通常不直接使用 `object` 类型，而是使用具体的对象类型，对对象的属性和方法进行类型检查。

  ```typescript
  let person: { name: string; age: number } = { name: "John", age: 30 };
  ```

### 联合类型

联合类型表示取值可以为多种类型中的一种。

```typescript
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

### 字面量类型

字符串字面量类型：

```typescript
let myFavoriteString: "abc" | "def";
```

### 函数类型

函数声明的类型定义：

```typescript
function sum(x: number, y: number): number {
  return x + y;
}
```

函数表达式的类型定义：

```typescript
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
  return x + y;
};
```

### 数组类型

使用「类型 + 方括号」来表示数组：

```typescript
let fibonacci: number[] = [1, 1, 2, 3, 5];
```

使用数组泛型来表示数组：

```typescript
let fibonacci: Array<number> = [1, 1, 2, 3, 5];
```

### 元组类型

数组合并相同类型的对象，而元组合并不同类型的对象。元组有固定的长度，一旦创建，其长度不能更改。

```typescript
let tom: [string, number] = ['Tom', 25];
```

### 枚举类型

枚举类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。

```typescript
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
```

### 类型别名

类型别名用来给一个类型起个新名字。

```typescript
type Easing = "ease-in" | "ease-out" | "ease-in-out";
let easing: Easing = "ease-in";
```

## 二、项目配置

### tsconfig.json

`tsconfig.json` 是 TypeScript 项目的配置文件，用于配置 TypeScript 编译器的行为以及项目的类型检查选项。

- **include**

  指定需要编译的 TS 文件。这些文件是相对于包含 `tsconfig.json` 文件的目录进行解析的。

  ```json
  {
    "include": ["src/**/*.ts", "src/**/*.vue"]
  }
  ```

- **exclude**

  指定解析 `include` 时应跳过的文件。

  ```json
  {
    "exclude": ["node_modules", "dist"]
  }
  ```

- **compilerOptions**

  此选项构成了 TypeScript 配置的大部分，并且涵盖了语言应该如何工作。

#### 语言与环境

- **target**

  指定 TS 编译为 ES 的版本。默认为 `es3`，可选 `esnext`，表示最新版。

- **lib**

  TypeScript 包含一组内置 JS API 的默认类型定义，以及浏览器环境中（如文档）的类型定义。

#### 模块化

- **module**

  指定使用的模块化规范。可选 `esnext`，表示 ES Modules 最新版。

#### JavaScript 支持

- **allowJs**

  允许在项目中导入 JavaScript 文件，而不仅仅是 `.ts` 和 `.tsx` 文件。

