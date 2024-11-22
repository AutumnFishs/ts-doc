# ts 声明文件概述

ts 中的声明文件，主要是用来描述一个库的类型信息，让 ts 能够识别该库中的类型，从而在 ts 中使用该库时能够获得类型提示。一般是以`.d.ts`结尾的文件。

## 声明文件的使用

1. 比如我们在项目里面引入某个库`demo.js`,然后这个` demo`库没有写类型信息，在 ts 项目中使用就会报错，这时候我们就需要在项目中创建一个`demo.d.ts`文件，来描述`demo`库的类型信息
2. 在`demo.d.ts`文件中，我们使用`declare`关键字来声明`demo`库的类型信息，比如：
    ```ts
    declare module demo {
        export function demoFunc(): void;
    }
    ```
    ::: tip
    1. `declare module`用来声明一个已经引入的模块告诉编译器这个模块类型信息，模块名可以是任意字符串，但是一般建议和库的名称保持一致。
    2. `export`用来声明模块中的导出内容，可以是函数、类、接口等。
    :::
3. 然后在 ts 配文件中引入 demo 库，就可以获得类型提示了：
   ```ts
   // tsconfig.json
   {
    ...，
    "include": ["demo.d.ts"]
   }
   ```
4. 现在外部模块一般有自己的声明文件，ts会自动识别；在没有声明文件的情况下，可能需要手动创建，觉得麻烦可以简写，比如：
   ```ts
   declare module "demo";
   ```
   需要注意的是这时候的导出内容类型默认都是`any`,除此之外可以查看有没有类似`@types/node`的类型声明文件。
5. 模块声明通配符：ts中可以使用`*`来表示任意字符串，比如：  
   - 表示引入的模块名是以`.svg`结尾的模块
   ``` ts
   declare module "*.svg";
   ```
   - 表示引入的模块名是以`home`开头的模块
   ```ts
   declare module "home*"
   ```
6. 对比命名空间导出和默认导出：
    - **默认导出**  
        + 导出模块
        ```typescript
        // math.ts
        function add(a: number, b: number): number {
            return a + b;
        }

        function sub(a: number, b: number): number {
            return a - b;
        }

        export { add, sub };

        export default {
            add,
            sub
        };
        ```
        + 使用模块
            1. **导入默认导出的内容**：
                ```typescript
                import math1 from './math';
                console.log(math1.add(1, 2));  // 输出: 3
                console.log(math1.sub(5, 3));  // 输出: 2
                ```

            2. **导入命名导出的内容并重命名**：
                ```typescript
                import { add as mathAdd } from './math';
                console.log(mathAdd(1, 2));  // 输出: 3
                ```

            3. **导入所有命名导出的内容**：
                ```typescript
                import * as math2 from './math';
                console.log(math2.add(1, 2));  // 输出: 3
                console.log(math2.sub(5, 3));  // 输出: 2
                ```

    - **命名空间导出**
        - *命名空间导出方式一*
            ```ts 
            // math.ts
            export namespace MathLib {
                export function add(a: number, b: number): number {
                    return a + b;
                }

                export function sub(a: number, b: number): number {
                    return a - b;
                }
            }
            ```
            使用模块
            ```typescript
            // app.ts
            import { MathLib } from './math';
            console.log(MathLib.add(1, 2));  // 输出: 3
            console.log(MathLib.sub(5, 3));  // 输出: 2
            ```

        - *命名空间导出方式二*
            ```typescript
            // math.ts
            function add(a: number, b: number): number {
                return a + b;
            }

            function sub(a: number, b: number): number {
                return a - b;
            }

            export as namespace MathLib;
            ```
            使用模块
            ```ts
            // app.ts
            // 直接使用命名空间 MathLib
            console.log(MathLib.add(1, 2));  // 输出: 3
            console.log(MathLib.sub(5, 3));  // 输出: 2
            ```

    ::: warning 注意
    1. **export as namespace**：
       - 使用 `export as namespace` 导出的模块内容可以直接在全局使用，无需导入。
       - 这种方式会导致全局变量污染，所以在大型项目中尽量少用，推荐使用 `import` 和 `export` 机制来管理模块的导入和导出。

    2. **默认导出和命名导出**：
       - 模块可以同时具有默认导出和命名导出。
       - 导入时，可以分别使用 `import defaultExport from 'module'` 和 `import { namedExport } from 'module'` 来导入默认导出和命名导出的内容。
       - 使用 `import * as namespace from 'module'` 可以导入模块中的所有命名导出内容，并将其封装在一个命名空间对象中。
    :::

7. reference 引入声明文件,这种方式引入声明文件可以直接在当前文件中引入某个模块的类型声明文件，比如在 `global.d.ts` 中引入 `vite/client`：
   ```ts
   /// <reference types="vite/client" />
   ```
## 声明文件示例

1. image 导入的声明文件(导入文件的类型声明文件)：
   - 创建 `images.d.ts` 文件：
   ```ts
   /**
    * 图片声明导入文件
    */
   declare module "*.svg";
   declare module "*.png";
   declare module "*.jpg";
   declare module "*.jpeg";
   declare module "*.gif";
   declare module "*.bmp";
   declare module "*.tiff";
   ```
   - 在 `tsconfig.json` 中引入该文件：
   ```ts
   {
       ...，
       "include": ["images.d.ts"]
   }
   ```
   然后在 ts 文件中就可以直接使用图片了，比如：

   ```ts
   import logo from "./logo.svg";
   ```
   ts 就会自动识别图片的类型，从而在 ts 文件中能够获得类型提示。
2. 声明文件中对`global`,进行声明扩展,创建 `global.d.ts` 文件：
   ```ts
    declare global {
        interface Window {
            hello: any;
            setHello(val: string): void;
        }
         
        function setHello(val: string): void; // 添加全局函数
    }
    declare var window: Window;
   ```
   然后在 ts 文件中就可以直接使用 `window.hello`、`window.setHello`，ts 就会自动识别类型，从而在 ts 文件中能够获得类型提示。