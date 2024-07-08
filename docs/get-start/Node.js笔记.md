## 创建项目 TypeScript


#### 生成 package.json

```bash
npm init -y
```



#### 安装 TypeScript

```bash
npm install typescript @types/express @types/node  --save-dev
```



#### 生成 tsconfig.json

```
npx tsc --init
```



#### 修改配置

添加 outDir

```js
{
  "compilerOptions": {
    ...
    
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



## package.json

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

#### 安装 SQLite

```
npm install sqlite3
```

- 安装客户端  [SQLiteStudio](https://sqlitestudio.pl/)

- 数据类型

  ```
  TEXT：字符串文本
  REAL：浮点数字
  INTEGER：整数

#### 新建表

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

#### 其他

查看执行计划

```sqlite
EXPLAIN QUERY PLAN
```

MySQL 查看执行计划

```
EXPLAIN
```

- id：每个查询都有一个唯一的id，用于标识这个查询；
- select_type：表示查询类型，主要分为简单查询、联合查询、子查询等；
- table：表示查询涉及到的表名；
- partitions：表示涉及到的分区；
- **type**：表示表的访问类型，包括ALL（全表扫描）、index（索引扫描）、range（索引范围扫描）、ref（非唯一索引扫描）、eq_ref（唯一索引扫描）等；
- possible_keys：表示可用的索引；
- **key：MySQL** 选择使用的索引；
- key_len：表示索引字段长度；
- **ref**：表示索引被哪个字段或常量所引用；
- **rows**：表示MySQL根据表统计信息估算出的查询结果集的行数；
- filtered：表示通过条件过滤后的结果集占总结果集的百分比；
- Extra：包含MySQL执行计划中的其他信息，例如是否使用了临时表、是否使用了文件排序等。