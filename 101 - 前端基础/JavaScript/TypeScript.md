# TypeScript

[TypeScript](https://www.typescriptlang.org/) 是具有类型语法的 JavaScript。

## 一、类型系统

[JavaScript](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures) 定义了 8 种内置类型，[TypeScript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#built-in-types) 为内置类型提供了相应的基元类型。

### 基础类型

#### 原始类型

- [**boolean**](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#the-primitives-string-number-and-boolean)

  ```typescript
  let isDone: boolean = false;
  ```

- [**number**](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#the-primitives-string-number-and-boolean)

  ```typescript
  let decLiteral: number = 6;
  let hexLiteral: number = 0xf00d;
  let binaryLiteral: number = 0b1010;
  let octalLiteral: number = 0o744;
  ```

- [**string**](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#the-primitives-string-number-and-boolean)

  ```typescript
  let name: string = "bob";
  ```

- [**void**](https://www.typescriptlang.org/docs/handbook/2/functions.html#void)

  `void` 类型表示没有任何类型，常用于表示函数没有返回值。

  ```typescript
  function warnUser(): void {
    console.log("This is my warning message");
  }
  ```

- [**null/undefined**](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#null-and-undefined)

#### 特殊类型

- [**any**](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#any)

  TypeScript 中的一个逃逸类型，可以绕过类型检查系统，因此不会对值进行任何类型检查。

  ```typescript
  let notSure: any = 4;
  notSure = "maybe a string instead";
  notSure = false;
  ```

- [**unknown**](https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown)

  `unknown` 类型也表示不确定的类型，但与 `any` 不同，它是类型安全的。

  当一个值声明为 `unknown` 类型时，必须在使用它之前先进行类型检查或类型断言，以告诉 TypeScript 它的确切类型。

  ```typescript
  let notSure: unknown = 4;
  notSure = "maybe a string instead";
  notSure = false;
  ```

#### 空类型

- [**never**](https://www.typescriptlang.org/docs/handbook/2/functions.html#never)

  `never` 类型表示永不存在的值的类型，常用于表示会抛出异常的函数的返回值。

  ```typescript
  function error(message: string): never {
    throw new Error(message);
  }
  ```

### 对象类型

#### 基础对象

- [**object**](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#object-types)

  - [Indexable Types](https://www.typescriptlang.org/docs/handbook/interfaces.html#indexable-types)
  - [Index Signatures](https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures)
  
  `object` 表示非原始类型，也就是除 `number`，`string`，`boolean`，`symbol`，`null` 或 `undefined` 之外的类型。
  
  ```typescript
  let obj: object = { name: "John", age: 30 };
  ```
  
  通常不直接使用 `object` 类型，而是使用具体的对象类型，对对象的属性和方法进行类型检查。
  
  ```typescript
  let person: { name: string; age: number } = { name: "John", age: 30 };
  ```

#### 结构化对象

- [**Array**](https://www.typescriptlang.org/docs/handbook/2/objects.html#the-array-type)

  ```typescript
  // 使用「类型 + 方括号」来表示数组
  let fibonacci: number[] = [1, 1, 2, 3, 5];
  
  // 使用数组泛型来表示数组
  let fibonacci: Array<number> = [1, 1, 2, 3, 5];
  ```

- [**Tuple**](https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types)

  `Array` 合并相同类型的对象，而 `Tuple` 合并不同类型的对象。`Tuple` 有固定的长度，一旦创建，其长度不能更改。
  
  ```typescript
  let tom: [string, number] = ['Tom', 25];
  ```

#### 枚举对象

- [**enum**](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#enums)

  枚举类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。
  
  ```typescript
  enum Days { Sun, Mon, Tue, Wed, Thu, Fri, Sat };
  let day: Days = Days.Mon;
  ```
  
### 高级类型

#### 类型组合

- [**Union Types**](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)

  联合类型表示取值可以为多种类型中的一种。
  
  ```typescript
  let myFavoriteNumber: string | number;
  myFavoriteNumber = 'seven';
  myFavoriteNumber = 7;
  ```
  
- **Intersection Types**

  除了[联合](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#unions)之外，TypeScript 还有[交集](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#intersections)。

#### 类型抽象

- [**Type Aliases**](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases)

  类型复用机制。

  ```typescript
  type Point = {
    x: number;
    y: number;
  };
  let pt = { x: 100, y: 100 };
  
  type Easing = "ease-in" | "ease-out" | "ease-in-out";
  let easing: Easing = "ease-in";
  ```

- [**Literal Types**](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types)

  精确值类型约束。

  ```typescript
  let myFavoriteString: "abc" | "def";
  ```

#### 函数类型

- [**函数声明**](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-type-expressions)

  ```typescript
  function sum(x: number, y: number): number {
    return x + y;
  }
  ```

- [**函数表达式**](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-type-expressions)

  ```typescript
  let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
  };
  ```

### 类型操作

#### 类型推断

- [变量初始化推断](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-inference)
- [函数返回值推断](https://www.typescriptlang.org/docs/handbook/2/functions.html#inference)

#### 类型断言

- [**`as` 语法**](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions)
- [**尖括号语法**](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions)

#### 类型导入

- `import type`

  - [Type-Only Imports and Export](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export)
  - [Type-Only Imports and Export](https://devblogs.microsoft.com/typescript/announcing-typescript-3-8-beta/#type-only-imports-exports)
  - [Do I need to use the "import type" feature of TypeScript 3.8 if all of my imports are from my own file?](https://stackoverflow.com/q/61412000)
  - [What's the difference between import type { X } vs. { type X }](https://www.reddit.com/r/typescript/comments/1asfe20/whats_the_difference_between_import_type_x_vs/)

  ```typescript
  import type { UploadProps, UploadFile, UploadFiles } from "element-plus";
  ```

#### 类型推断

- **Promise**

  提取异步函数返回值的类型。

  ```typescript
  // 定义返回对象类型
  interface _InvoiceData {
    date: string;
    number: string;
    height: number;
  }
  
  // 定义函数类型
  type ExtractInvoiceDataFunction = (file: File) => Promise<_InvoiceData>;
  
  // 使用 Awaited 和 ReturnType
  type InvoiceData = Awaited<ReturnType<ExtractInvoiceDataFunction>>;
  
  // 如果 TypeScript 版本较低（<4.5），可自定义条件类型
  type ExtractPromiseType<T> = T extends Promise<infer U> ? U : T;
  type InvoiceData = ExtractPromiseType<ReturnType<ExtractInvoiceDataFunction>>;
  ```

## 二、工程配置

[`tsconfig.json`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) 是 TypeScript 项目的配置文件，用于配置 TypeScript 编译器的行为以及项目的类型检查选项。

### 配置文件结构

```json
{
  "compilerOptions": { ... },
  "include": [ ... ],
  "exclude": [ ... ]
}
```

### 编译选项

#### 核心编译策略

- [**target**](https://www.typescriptlang.org/tsconfig/#target)：指定 TS 编译为 ES 的版本
- [**module**](https://www.typescriptlang.org/tsconfig/#module)：指定使用的模块化规范
- [**strict**](https://www.typescriptlang.org/tsconfig/#strict)：严格模式总开关
- [**allowJs**](https://www.typescriptlang.org/tsconfig/#allowJs)：允许在项目中导入 JavaScript 文件，而不仅仅是 `.ts` 和 `.tsx` 文件
- [**include**](https://www.typescriptlang.org/tsconfig/#include)：指定需要编译的 TS 文件
- [**exclude**](https://www.typescriptlang.org/tsconfig/#exclude)：指定解析 `include` 时应跳过的文件

#### 类型检查策略

- [**noImplicitAny**](https://www.typescriptlang.org/tsconfig/#noImplicitAny)：禁止隐式 `any`
- [**strictNullChecks**](https://www.typescriptlang.org/tsconfig/#strictNullChecks)：空值检查
- [**lib**](https://www.typescriptlang.org/tsconfig/#lib)：TypeScript 包含一组内置 JS API 的默认类型定义，以及浏览器环境中（如文档）的类型定义

#### 模块解析策略

- [**baseUrl**](https://www.typescriptlang.org/tsconfig/#baseUrl)：基准路径
- [**paths**](https://www.typescriptlang.org/tsconfig/#paths)：路径映射
- [**typeRoots**](https://www.typescriptlang.org/tsconfig/#typeRoots)：类型声明位置

#### 产出物控制

- [**sourceMap**](https://www.typescriptlang.org/tsconfig/#sourceMap)：调试映射
- [**outDir**](https://www.typescriptlang.org/tsconfig/#outDir)：输出目录
- [**declaration**](https://www.typescriptlang.org/tsconfig/#declaration)：生成 `.d.ts`

## 三、开发环境

Node.js 默认不支持直接执行 `.ts` 文件，需要配置开发环境进行转译执行。

- [Unknown file extension ".ts" for a TypeScript file - *Stack Overflow*](https://stackoverflow.com/questions/62096269/unknown-file-extension-ts-for-a-typescript-file)

### ts-node

可以使用 `ts-node` 直接运行。

- **安装依赖**：[`ts-node`](https://www.npmjs.com/package/ts-node), [`typescript`](https://www.npmjs.com/package/typescript)

  ```sh
  npm install -g ts-node typescript
  
  # 对于项目级使用，建议本地安装
  npm install --save-dev ts-node typescript
  ```

- **配置编译规则**

  在项目根目录初始化 `tsconfig.json`。

  ```sh
  tsc --init
  ```

- **执行 TypeScript 文件**

  ```sh
  ts-node test.ts
  ```

### tsx

可以使用 [`tsx`](https://www.npmjs.com/package/tsx) 直接运行。

```sh
npm i -D tsx
npx tsx src/index.ts
```

## Reference

- [TypeScript 入门教程 - *xcatliu*](https://ts.xcatliu.com/)
- [TypeScript Deep Dive 中文版 - *jkchao*](https://github.com/jkchao/typescript-book-chinese)
- [TypeScript 使用手册（中文版）翻译 - *zhongsp*](https://github.com/zhongsp/TypeScript)
- [TypeScript 中的问号 ? 与感叹号 ! 是什么意思？](https://github.com/e2tox/blog/issues/9)

