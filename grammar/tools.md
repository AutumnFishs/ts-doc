# ts工具类型
在ts中除了一些基本的类型，还提供了一些工具类型，这些工具类型可以帮助我们更方便的进行类型转换，下面是一些常用的工具类型：

## `Awaited<type>`
Awaited用于获取Promise对象的返回值类型，例如：
``` ts
type A = Awaited<Promise<string>> // string
type B = Awaited<Promise<Promise<number>>> // number
type C = Awaited<boolean | Promise<number>> // boolean | number
```

Awaited工具类型的实现：
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
