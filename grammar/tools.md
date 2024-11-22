# ts工具类型
在ts中除了一些基本的类型，还提供了一些工具类型，这些工具类型可以帮助我们更方便的进行类型转换，下面是一些常用的工具类型：

## `Awaited<type>`
1. `Awaited`用于获取`Promise`对象的返回值类型，例如：
``` ts
type A = Awaited<Promise<string>> // string
type B = Awaited<Promise<Promise<number>>> // number
type C = Awaited<boolean | Promise<number>> // boolean | number
```
2. `Awaited`工具类型的实现：
```ts
type MyAwaited<T> = T extends null | undefined
  ? T // 如果是 null 或 undefined，直接返回
  : T extends object & { then(onfulfilled: infer F, ...args: infer _): any } // 判断是否是对象且具有 then 方法
  ? F extends (value: infer V, ...args: infer _) => any
    ? MyAwaited<V> // 递归调用 MyAwaited，处理多层嵌套的 Promise
    : never // 如果 F 不是预期的函数类型，返回 never
  : T; // 如果 T 不是具有 then 方法的对象，即普通类型 ，直接返回 T

type A = MyAwaited<Promise<string>>;// string
type B = MyAwaited<Promise<Promise<number>>>;// number
type C = MyAwaited<boolean | Promise<number>>; // boolean | number
```
`inter`关键字用于推断出泛型参数的类型，这里用于推断出`.then`方法的第一个回调函数的类型

## `Partial<type>`
1. `Partial`用于将类型中的所有属性变为可选的，例如：
``` ts
interface User {
    name: string;
    age: number;
}
type PartialUser = Partial<User>;//{name?: string | undefined;age?: number | undefined;}
```
2. `Partial`工具类型的实现：
```ts
type MyPartial<T> = {
  [P in keyof T]?: T[P]
}
type PartialUser = MyPartial<User>
```
`[P in keyof T]`遍历类型T的所有属性，`?`表示将属性变为可选的

## `Required<type>`
1. `Required`用于将类型中的所有属性变为必选的，例如：
``` ts
interface User {
  name?: string;
  age?: number;
}
type RequiredUser = RequiredUser<User>//{ name: string; age: number;}
```
2. `Required`工具类型的实现：
``` ts 
type MyRequired<T> = {
  [P in keyof T]-?: T[P]
}
type RequiredUser = MyRequired<User>// {name: string;age: number;}
```
`-?`表示将属性变为必选的

## `Readonly<type>`
1. `Readonly`用于将类型中的所有属性变为只读属性，例如：
``` ts
interface User {
  name: string;
  age: number;
}
type ReadonlyUser = Readonly<User> // {readonly name: string;readonly age: number;}
```
2. `Readonly`工具类型的实现：
``` ts
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]
}
type ReadonlyUser = MyReadonly<User> // {readonly name: string;readonly age: number;}
```

## `Record<keys,type>`
1. `Record`用于创建一个对象类型，其中键名是`keys`类型，键值是`type`类型，例如：
``` ts
type Keys = "a" | "b"
interface User {
  name:string
  age:number
}
type Users = Record<Keys,User>//{a: User;b: User;}
```
2. `Record`工具类型的实现：
``` ts
type MyRecord<K extends keyof any, U> = {
  [P in K]: U;
};
type Users = MyRecord<Keys, User>;// {a: User;b: User;}
```
`K extends keyof any`表示`K`必须是`keyof any`的子类型`(keyof any 实际上等价于 string | number | symbol)`，即`K`必须是字符串字面量类型，`[P in K]`遍历`K`的所有值，`U`表示键值类型

## `Pick<type,keys>`
1. `Pick`用于从`type`类型中选择`keys`指定的属性，例如：
``` ts
type User = {
  name:string
  age:number
  gender:string
}
type PickUser = Pick<User,"name" | "age"> // {name: string;age: number;}
```

2. `Pick`工具类型的实现：
``` ts
type MyPick<T, P extends keyof T> = {
  [K in P]: T[K];
};
type PickUser = MyPick<User,"name" | "age"> // {name: string;age: number;
```

## `Exclude<type,excluded>`
1. `Exclude`用于从`type`类型中排除`excluded`类型，例如：
``` ts
type T = "a" | "b" | "c"
type ExcludeT = Exclude<T,"a"> // "b" | "c"
```
2. `Exclude`工具类型的实现：
``` ts
type MyExclude<T, U> = T extends U ? never : T;
type ExcludeT = MyExclude<T, "a"> // "b" | "c"
```
`extends`在进行联合类型比较时，会依次比较联合类型的每个成员，比如`"a" | "b" | "c" extends "a"`,它会依次对`"a"`、`"b"`、`"c"`和`"a"`进行比较

## `Omit<type,keys>`
1. `Omit`用于删除`type`类型中的`keys`指定的属性，和`Pick`相反，例如：
``` ts
type User = {
  name:string
  age:number
  gender:string
}
type OmitUser = Omit<User,"gender"> // {name: string;age: number;}
```
2. `Omit`工具类型的实现：
``` ts
type MyOmit<T, K extends keyof any> = {
  [P in Exclude<keyof T, K>]: T[P];
};
type OmitUser = MyOmit<User,"gender"> // {name: string;age: number;}
```

## `Extract<Union1,Union2>`
1. `Extract`用于从`Union1`类型中提取`Union2`类型，例如：
``` ts
type T = "a" | "b" | "c"
type ExtractT = Extract<T,"a" | "b"> // "a" | "b"
type User =
  | { name: string; age: number }
  | { name: string; gender: string }
  | { gender: string };
type ExtractUser = Extract<User, { name: string }>; // {name: string; age: number;} | {name: string; gender: string;}
```
2. `Extract`工具类型的实现：
``` ts
type MyExtract<T, U> = T extends U ? T : never;
type ExtractT = MyExtract<T, "a" | "b"> // "a" | "b"
```

## `NonNullable<type>`
1. `NonNullable`用于从`type`类型中排除`null`和`undefined`类型，例如：
``` ts
type T = string | number | null | undefined
type NonNullableT = NonNullable<T> // string | number
```
2. `NonNullable`工具类型的实现：
``` ts
type MyNonNullable<T> = T extends null | undefined ? never : T;
type NonNullableT = MyNonNullable<T> // string | number
```

## `Parameters<type>`
1. `Parameters`用于获取函数类型的参数类型，并将参数类型转为元组类型，例如：
``` ts
type T = (a: string, b: number) => void
type ParametersT = Parameters<T> // [a: string, b: number]
```
2. `Parameters`工具类型的实现：
``` ts
type MyParameters<T extends Function> = T extends (...args:infer P) => any ? P : never;
type ParametersT = MyParameters<T> // [a: string, b: number]
```
`...args:inter P`表示将函数的参数提取出来赋值给P

## `ConstructorParameters<type>`
1. `ConstructorParameters`用于获取构造函数类型的参数类型，并将参数类型转为元组类型，例如：
``` ts
class User {
  constructor(name: string, age: number) {}
}
type ConstructorParametersUser = ConstructorParameters<typeof User> // [name: string, age: number]
```
2. `ConstructorParameters`工具类型的实现：
``` ts
type MyConstructorParameters<T extends abstract new (...args: any[]) => any> = T extends abstract new (...args: infer P) => any ? P : never;
type ConstructorParametersT = MyConstructorParameters<typeof User> // [name: string, age: number]
```
`typeof` 操作符用于获取一个变量或表达式的类型  

`T extends new (...args: any[]) => any`判断T是否可以赋值给实例化函数类型(不包括抽象类),即是否是一个构造函数  

`abstract`是`class`或者`class方法`的修饰符，表示该类或者方法是抽象类或者抽象方法，不能被实例化或者直接使用，只能继承

## `ReturnType<type>`
1. `ReturnType`用于获取函数类型的返回值类型，例如：
``` ts
function Fn(params:string|number):string|number {
  return params
}
type ReturnTypeFn = ReturnType<typeof Fn> // string | number
```
2. `ReturnType`工具类型的实现：
``` ts
type MyReturnType<T extends Function> = T extends (...args: any) => infer R ? R : any;
type ReturnTypeT = MyReturnType<typeof Fn> // string | number
```

## `InstanceType<type>`

