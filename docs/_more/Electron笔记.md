# Electron 笔记

## 创建新项目

```bash
npm create @quick-start/electron 项目名 -- --template vue-ts
```



## 修改配置文件

### .eslintrc.cjs

关闭不需要的规范

```js
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@electron-toolkit',
    '@electron-toolkit/eslint-config-ts/eslint-recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier'
  ],
  rules: {
    'vue/require-default-prop': 'off',
    'vue/multi-word-component-names': 'off',

    // 关闭 prettier 的代码格规范
    "prettier/prettier": "off",

    // 关闭其他不必要的规则
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "prefer-const": "off"
  }
}
```



### electron.vite.config.ts

配置 alias 别名

```js
import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    plugins: [vue()],
    resolve: {
      // 配置 alias 别名
      alias: {
        '@': resolve('src/renderer/src')
      }
    }
  }
})
```



## 入口说明

### src / main / index.ts

- 在主线程里启动 Express 服务器，提供后端接口【接口要支持跨域访问】

-   是否打开 devtools

### src / renderer / src

页面相关的代码，放在这个目录下

### src / renderer / index.html

在 Content-Security-Policy 里配置 connect-src 和 img-src，才能访问后端接口

假设后端服务的域名是 http://localhost:8090

> img-src 'self' data: blob:  http://localhost:8090;
>
> connect-src 'self' http://localhost:8090



content 的完整配置如下

```html
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Electron + Vue 3</title>
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:  http://localhost:8090; connect-src 'self' http://localhost:8090"
    />
  </head>

  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```



## 打包

**打包失败，可能是因为权限问题**

把 VSCode 的桌面快捷方式，设置为以管理员身份运行，再重新打开 VSCode 打包
