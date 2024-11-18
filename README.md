# TypeScript 学习大纲
以下是后续 TypeScript 学习的大纲，包括基本介绍、安装使用、tsconfig.json 配置、常用类型、声明文件等内容。

#### 1. 基本介绍 & 安装使用
- **介绍TypeScript**
  - TypeScript 是什么？
  - TypeScript 和 JavaScript 的区别。
- **安装TypeScript**
  - 安装 TypeScript 的方法。
  - 使用 `tsc` 命令编译 TypeScript 文件。
  - 常用的依赖工具（如 ts-node, typescript, @types/node 等）及其用途。

#### 2. tsconfig.json 配置
- **基础配置**
  - tsconfig.json 文件的作用及常见配置选项解释。
- **环境特定配置**
  - tsconfig.node.json 在 Node.js 环境中的配置。
  - tsconfig.app.json 在浏览器环境中使用的配置。
- **框架特定配置**
  - React 和 Vue 框架中常用的 TypeScript 配置。

#### 3. 常用类型
- **基本类型**
  - number, string, boolean, symbol, undefined, null, void, any, unknown, never 类型的定义与使用。
- **对象类型**
  - object, array, tuple, enum, interface, class, function 类型的定义与使用。
- **高级类型**
  - 联合类型（Union Types）、交叉类型（Intersection Types）、类型别名（Type Aliases）、类型断言（Type Assertions）、类型守卫（Type Guards）、类型推断（Type Inference）、泛型（Generics）的概念与应用。
- **特殊类型**
  - 字面量类型（Literal Types）、索引类型（Index Types）、映射类型（Mapped Types）、条件类型（Conditional Types）、模板字面量类型（Template Literal Types）、可辨识联合类型（Discriminated Unions）的概念与应用场景。

#### 4. 声明文件 (.d.ts)
- **声明文件概述**
  - 声明文件的作用及重要性。
  - 如何创建和使用 .d.ts 文件。
- **全局声明**
  - 全局变量、函数、类、对象、枚举、接口、类型别名、类型守卫、类型推断、泛型的声明方式。
- **模块与命名空间**
  - 如何声明模块和命名空间。
  - 类型声明、类型断言、类型守卫、类型推断、泛型在模块和命名空间中的使用。
- **第三方库与自定义库**
  - 如何为第三方库和自定义库创建类型声明。
  - 解决第三方库与自定义库类型声明可能存在的冲突。