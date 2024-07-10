# docsify-blog



为了将前端学习的文档，整理成博客，既方便在本地管理，也方便在线上查看，使用 docsify 创建博客。



## index.html

### 本地资源

- 所有依赖的第三方库，都放在 `assets / lib` 目录下，成为本地资源，无需访问网络。在内网或者没有网络的环境，也可以使用。

- docsify 使用了 Google Fonts，所以也要下载到本地，并修改 docsify 的样式文件

  **vue.min.css**

```css
/* @import url("https://fonts.googleapis.com/css?family=Roboto+Mono|Source+Sans+Pro:300,400,600"); */
  
/* 使用本地 Google Fonts */
@import url("../../../Google Fonts/Source Sans Pro.css");
```

  

### 侧边栏

在不同的目录，使用不同的侧边栏

```
- docs
  - get-start      (首页)
    - _sidebar.md  (首页的侧边栏)
    
  - JavaScript
    - _sidebar.md  (JavaScript目录，及其所有的子目录，都使用这个侧边栏)
  
  - Vue3
    - _sidebar.md  (Vue3目录，及其所有的子目录，都使用这个侧边栏)
```



解决方式

```js
window.$docsify = {
  ...
  
  // 不同的目录，使用不同的侧边栏
  alias: {
    '/docs/JavaScript(.*)/_sidebar.md': '/docs/JavaScript/_sidebar.md',
    '/docs/Vue3(.*)/_sidebar.md': '/docs/Vue3/_sidebar.md'
  }
}
```



### 图片

所有图片都使用相对路径，保证在本地可以正常查看。比如

```markdown
![](../../../assets/images/JavaScript/原型链.png)
```

在页面渲染时，将图片上的相对路径都去掉，保证图片可以正常查看。比如

```html
<img src="assets/images/JavaScript/原型链.png" />
```



解决方式

```js
window.$docsify = {
  ...
  
  // 解决图片加载的问题
  markdown: {
    renderer: {
      image: function(href, title) {
        const mediaPath = 'assets';
        
        const regex = new RegExp('^(.*)' + mediaPath);
        const path = href.replace(regex, mediaPath);
        return `<img src="${path}" data-origin="${path}" alt="${title}">`
      }
    }
  }
}
```



## 生成侧边栏

```bash
npm run test
```



### 批处理文件

为了方便在本地操作，可以创建批处理文件，来启动服务

**startup.bat**

```bash
docsify serve
```



**sidebar.bat**

```bash
node src/dist/dist.js --test

:: 不退出窗口，使用 pause
pause
```



打包脚本文件

```bash
npm install

npm run build
```

