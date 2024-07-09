# Node.js 笔记

## 创建项目


### 生成 package.json

```bash
npm init -y
```



### 安装 TypeScript

```bash
npm install typescript @types/express @types/node  --save-dev
```



### 生成 tsconfig.json

```
npx tsc --init
```



### 修改配置

**tsconfig.json**

```js
{
  "compilerOptions": {
    ...
    
    "module": "commonjs", // 打包后的代码，使用CommonJS，可以使用 node 命令执行
    "target": "esnext",   // 开发时，使用ES Module，可以使用 import / export

    "outDir": "./build"
  }
}
```



## 安装 Express

```bash
npm install express
```



## 监听文件变化

安装 nodemon

```bash
npm install nodemon ts-node --save-dev
```



**nodemon.json**

```js
{
  "watch": ["src"],
  "ext": "ts",
  "exec": "concurrently \"npx tsc --watch\" \"npx ts-node src/index.ts\""
}
```



## 打包 esbuild

安装 esbuild

```
npm install esbuild --save-dev
```



**esbuild.js**

```js
const { build } = require('esbuild')
const { dependencies, peerDependencies } = require('./package.json')

const shared = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  platform: 'node',
  external: Object.keys(dependencies).concat(Object.keys(peerDependencies || {})),
}

build({
  ...shared,
  outfile: 'dist/index.js',
})

build({
  ...shared,
  outfile: 'dist/index.esm.js',
  format: 'esm',
})
```



### package.json

```js
{
  "name": "demo",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "dev": "nodemon src/index.ts",		// 监听文件，当文件发生变化，重新执行脚本
    "test": "npx ts-node src/test.ts",	// 执行 ts 脚本
    "build": "node esbuild.js",			// 打包 ts 代码
        
    // 打包 js 代码
    "build-js": "esbuild src/index.js --bundle --minify --outfile=dist/dist.js --platform=node"
  }
}
```



## SQLite

**安装 SQLite**

```
npm install sqlite3
```

- 安装客户端  [SQLiteStudio](https://sqlitestudio.pl/)

- 数据类型

  ```
  TEXT：字符串文本
  REAL：浮点数字
  INTEGER：整数

**新建表**

```sqlite
CREATE TABLE IF NOT EXISTS marketing (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  region TEXT,
  beginDate TEXT,
  endDate TEXT,
  jit INTEGER,
  type TEXT,
  resource INTEGER,
  desc TEXT
)
```

**查看执行计划**

```sqlite
EXPLAIN QUERY PLAN
```

