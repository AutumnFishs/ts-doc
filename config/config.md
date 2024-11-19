# ts配置文件
ts配置文件是`tsconfig.json`，用于配置ts编译器。一般是放在项目的根目录下，像一些脚手架一般会封装好，不需要手动配置。
### 生成配置文件
自己手动搭建项目，或者封装脚手架可以使用`tsc`命令可以生成一个默认的配置文件。
``` bash
tsc --init
```
### 配置项说明
| 配置项 | 说明 | 参数 |
| :--- | :--- |:--- |
| compilerOptions |  |--|

### 示例
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
