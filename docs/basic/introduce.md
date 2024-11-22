# Typescript入门介绍
typescript是javascript的一个超集，为javascript添加了可选的静态类型和基于类的面向对象编程。它由微软开发，并得到了广泛的支持和采用。

## 为什么使用typescript
1. 静态类型检查：ts提供了静态类型检查，在编写代码时候，可以提前发现类型错误，避免运行时报错。
2. 面向对象编程：ts支持基于类的面向对象编程，可以更好地组织代码，提高代码的可维护性和可扩展性。
3. 代码提示：ts提供了代码提示和自动补全功能，在编写代码时可以快速了解当前代码片段是用来做啥的，并且可以自动补全代码，提高开发效率。

## 如何使用typescript

1. 全局安装ts:
``` bash
npm install -g typescript
```

2. 编写ts代码：可以使用任何文本编辑器编写ts代码，文件扩展名为`.ts`。
    在`react`开发中需要使用`.jsx`，要支持ts的话，可以使用`.tsx`开发（`tsx`只是在`jsx`上添加了静态类型）

3. 编译ts代码：使用`tsc`命令将ts代码编译为js代码：
``` bash
tsc filename.ts
```

4. 运行js代码：
``` bash
node filename.js
```

5. 每次都要将ts代码编译为js代码再运行，比较麻烦，可以使用`ts-node`来直接运行ts代码；
``` bash
npm install -g ts-node
ts-node filename.ts
```
::: warning
需要注意的是，`ts-node` 只能在项目中运行，单独的文件运行不了，因为`ts-node`会自动查找项目中的`package.json`文件，如果没有的话，会报错。
:::

6. 在练习时可能只是写一些简单的代码片段，这时候没必要创建项目,可以使用`tsx`来直接运行ts代码：
``` bash
npm install -g tsx
tsx filename.ts
```
::: info
一般我们在开发`react`项目中，脚手架中就内置了`tsx`，可以直接使用。
:::

7. 在项目中生成`tsconfig.json`文件：
``` bash
tsc --init
```