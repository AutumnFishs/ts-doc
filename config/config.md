# ts配置文件
ts配置文件是`tsconfig.json`，用于配置ts编译器。一般是放在项目的根目录下，像一些脚手架一般会封装好，不需要手动配置。
### 配置说明官网地址
[tsconfig.json配置说明](https://ts.nodejs.cn/tsconfig/#Watch_and_Build_Modes_6250)
### 生成配置文件
自己手动搭建项目，或者封装脚手架可以使用`tsc`命令可以生成一个默认的配置文件。
``` bash
tsc --init
```
### 常用配置项说明
#### compilerOptions常用配置
| 配置项 | 说明 |  参数 |
| :--- | :--- |:--- |
| baseUrl | 指定基本url路径,从tsconfig.json同级目录开始 | string|
| target | 指定编译结果为哪个版本的js，且会修改lib的默认值，默认值是ES5  | string|
| lib | 指定代码运行环境 | string[]|
| allowJs | 允许项目里导入js文件，不局限于ts文件 |boolean|
| skipLibCheck | 跳过第三方库声明文件检查 |boolean|
| esModuleInterop | 允许使用import同时导入commonjs模块和ECMAScript模块 | boolean|
| allowSyntheticDefaultImports | 互约束操作：配置不开启，如果导出内容没有指定默认导出的话需要`import * as xxx from ‘xxx’`，如果开启了，就会自动合成默认导出，可以直接导出`import xxx from ‘xxx’` | boolean|
| strict | 开启严格类型检查，与之相关的配置:`alwaysStrict`，`strictNullChecks`，`strictBindCallApply`，`strictFunctionTypes`，`strictPropertyInitialization`，`noImplicitAny`，`noImplicitThis`，`useUnknownInCatchVariables` |boolean|
| forceConsistentCasingInFileNames | 强制文件名大小写，为了避免有些文件严格区分大小写默认开启 |boolean|
| noFallthroughCasesInSwitch | 禁止`switch`中每个`case`没有`break`语句，避免遗漏`break` | boolean |
| module | 设置模块输出为`es5`等格式，和`package.json`的`type`类似，在`ts`项目中一般会先根据`tsconfig.json`中的`module`模块解析策略转为`js`再通过`package.json`模块解析策略在执行，所以这两者一般要保持一致，默认根据`target`设置 |string|
| moduleResolution | 设置模块解析策略来解析模块路径,默认为`Node`,1.6版本以前为`Classic` |string|
| resolveJsonModule | 支持解析json模块 |boolean|
| isolatedModules | 强制每个模块都是一个独立的模块，即强制文件导入或导出声明，没有则报错 |boolean|
| noEmit | ts运行时会生成编译后的js文件，开启后则不会，一般在框架中生产构建会使用其他工具，所以这个一般都是开启的 | boolean|
| jsx | 对tsx文件的处理，可选值：`react`转`.js`文件、`react-native`转`.js`其中保持`jsx`不变、`react-jsx`转`_jsx`调用对生产构建优化、`react-jsxdev`转`_jsx`调用对开发环境优化、`preserve`保持`.jsx`不变 |string|
| noImplicitAny | 类型无法推断时使用any作为类型，开启后禁止出现any作为推断结果 |boolean|
| paths | 路径映射，一般配置路径别名时配置当前属性，示例：`"paths": {"@/*": ["src/*"]}` | object |
#### 其他常用配置
| 配置项 | 说明 | 参数 |
| :--- | :--- |:--- |
| files | 指定需要编译的具体文件 | string[] |
| include | 配置声明文件以及指定需要编译的文件,比如指定src文件夹、配置image声明文件、env声明文件：`{"include":["src/**/*","image.d.ts","env.d.ts"]}` | string[] |
| exclude | 指定忽略编译的具体文件，写法类似include | string[] |

### 配置文件示例
``` ts
{
  "compilerOptions": {
    "baseUrl": ".",
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": false,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "noImplicitAny": false,
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*","image.d.ts","env.d.ts"]
}
```
