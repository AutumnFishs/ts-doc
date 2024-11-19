# 关于一些其他的碎片

### TypeScript 的模块解析策略
ts的模块解析策略主要有两种：Node 和 Classic，Classic是早期的模块解析策略，主要用于浏览器环境，而Node是模仿Node.js的模块解析策略是模仿js的模块解析策略，支持`node_modules`目录和`package.json`文件，自动尝试不同的文件扩展名。现在ts项目中默认的就是使用Node的模块解析策略。
- **TypeScript 的 Node 模块解析策略**：
  - 模仿 Node.js 的模块解析机制。
  - 支持 `node_modules` 目录和 `package.json` 文件。
  - 自动尝试不同的文件扩展名。

- **TypeScript 的 Classic 模块解析策略**：
  - 较早的模块解析策略，主要用于浏览器环境。
  - 要求导入路径包含文件扩展名。
  - 不支持 `node_modules` 目录和 `package.json` 文件。

### JavaScript 的模块解析策略
js的模块解析策略现在主要使用两种：ES6 和 CommonJS，ES6是浏览器环境中的标准模块系统，而CommonJS是Node.js默认的模块系统，支持`node_modules`目录和`package.json`文件。
- **ES6 模块解析策略**：
  - package.json 中的`"type": "module"`字段指定了模块类型。
  - 浏览器环境中的标准模块系统。
  - 导入路径必须是完整的 URL 或相对路径，并且通常需要文件扩展名。
  - 使用 `import`、`export` 动态导入模块。

- **CommonJS 模块解析策略**：
  - package.json 中的`"type": "commonjs"`字段指定了模块类型。
  - Node.js 默认的模块系统。
  - 支持 `node_modules` 目录和 `package.json` 文件。
  - 使用 `require()` 动态导入模块。
