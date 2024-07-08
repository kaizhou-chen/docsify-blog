# Docsify


## 安装

```bash
npm i docsify-cli -g
```


## 初始化

在存放文档的目录里，执行 init 命令初始化，创建 docs 文件夹

```bash
docsify init ./docs
```

- docs 目录下的文件
  - index.html  入口文件
  - README.md  作为首页渲染


> [!ATTENTION]
>
> 文件夹下所有的目录、文件名都 <span style="color: red; font-weight: bold;">不要包含空格</span>，否则会导致如下的异常情况
>
> 1. 图片不能加载
> 2. 链接不能跳转 *( 如果链接里空格，需要转换成 %20 )*
> 3. 左侧的sidebar不能加载目录



## 本地预览文档

进入docs目录，运行本地服务器 `docsify serve`，然后在浏览器中打开 http://localhost:3000 即可。

> docsify serve


## 侧边栏 sidebar
- _sidebar.md  
