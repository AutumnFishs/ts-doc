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
1. `InstanceType`用于获取构造函数类型的实例类型，例如：
``` ts
class User {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
type InstanceTypeUser = InstanceType<typeof User> // User
```
2. `InstanceType`工具类型的实现：
``` ts
type MyInstanceTypeUser<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: any) => infer R ? R : any;
type InstanceTypeUser = MyInstanceTypeUser<typeof User>; // User
```
## `NoInfer<Type>`
1. `NoInfer`用于防止类型被推断，例如：
``` ts
function Fn<T extends string>(arr: T[],values:NoInfer<T>){}
Fn(['a','b','c'],'a') // ok
Fn(['a','b','c'],'d') // error
```
2. `NoInfer`工具类型的实现：
``` ts
type MyNoInfer<T> =[T][T extends any ? 0 : never]//条件始终为真即得到的类型为[T][0],即T;这里是利用了数组的索引类型阻断类型推断

function Fn<T extends string>(arr: T[],values:MyNoInfer<T>){}
Fn(['a','b','c'],'a') // ok
Fn(['a','b','c'],'d') // error
```
**阻断类型推断的方式有：**
1. 把当前类型作为数组的第一项再获取数组的第一项类型
2. 通过将类型作为函数的参数类型，再通过函数调用获取参数类型
   
## `ThisParameterType<Type>`
1. `ThisParameterType`用于获取函数类型的`this`参数类型，如果没有`this`则推断为`unknown`,例如：
``` ts
const obj = {
  name: "obj",
  fn: function (this: any) {
    console.log(this.name);
    console.log(this);
  },
};
type ThisParameterTypeFn = ThisParameterType<typeof obj.fn> // any
function Fn(this: string, params: string): string {
  return this + params;
}
type ThisParameterTypeFn2 = ThisParameterType<typeof Fn> // string
```
2. `ThisParameterType`工具类型的实现：
``` ts
type MyThisParameterType<T extends Function> = T extends (this: infer U, ...args: any) => any ? U : unknown;
type ThisParameterTypeFn = MyThisParameterType<typeof Fn> // string
```
`(--strict)`严格模式会启用`(--noImplicitThis)`,`this`作为隐式参数类型会被推断为`unknown`

## `OmitThisParameter<Type>`
1. `OmitThisParameter`用于移除函数类型的`this`参数类型，例如：
``` ts 
const obj = {
  name: "obj",
  fn: function (this: any) {
    console.log(this.name);
    console.log(this);
  },
};
type OmitThisParameterFn = OmitThisParameter<typeof obj.fn> // (this: any) => void
function Fn(this: string, params: string): string {
  return this + params;
}
type OmitThisParameterFn2 = OmitThisParameter<typeof Fn> // (params: string) => string
```
2. `OmitThisParameter`工具类型的实现：
``` ts
type MyOmitThisParameter<T> = T extends Function
  ? T extends (this: any, ...args: infer R) => infer S
    ? (...args: R) => S
    : never
  : T;
type OmitThisParameterFn3 = MyOmitThisParameter<typeof obj.fn>; // (this: any) => void
type OmitThisParameterFn4 = MyOmitThisParameter<typeof Fn>; // (params: string) => string
```

## `ThisType<Type>`
1. `ThisType`用于为对象字面量类型添加`this`类型，例如[官网示例](https://ts.nodejs.cn/docs/handbook/utility-types.html#thistypetype):
``` ts
type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>; // Type of 'this' in methods is D & M
};
 
function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  return { ...data, ...methods } as D & M;
}
 
let obj = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx; // Strongly typed this
      this.y += dy; // Strongly typed this
    },
  },
});
```
`ThisType`理解起来比较吃力，可以参考这篇文章[TS-函数ThisType使用场景](https://juejin.cn/post/7107910000210608142?searchId=20241125112304A60CDA9580C0F0144E87)