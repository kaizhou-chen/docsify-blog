# CSS 基础

## 布局

### 水平居中

```css
text-align: center; /** 设置父元素的对齐方式 */
margin: 0 auto;		/** 左右外边距设置为 auto，自身要有宽度 */
justify-content: center; /** flex 布局，水平对齐方式 */
```

### 垂直居中

```css
align-items: center;	/** flex 布局，垂直对齐方式 */

/** 绝对定位时，使用 translate */
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
```

### 弹性布局 flex 

```css
/** 容器属性 */
ul {
  display: flex;
  
  flex-direction: row | column; /** 设置主轴方向 */
  flex-wrap: nowrap | wrap;     /** 是否换行 */
  
  justify-content: center | flex-start | flex-end | space-between; /** 水平对齐（主轴） */
  align-items: center | flex-start | flex-end | space-between;     /** 单行时，垂直对齐（交叉轴） */
  
  align-content: center; /** 多行时，垂直对齐（交叉轴） */
}

/** 元素属性 */
ul li {
  flex: 1; 				/** 元素占满剩余空间 */
  margin-left: auto; 	/** 外边距占满剩余空间 */
}
```

### 网格布局 grid

```

```

**盒子模型**

```css
div {
  box-sizing: content-box|border-box;
}

/**
content-box:
padding值和border值不计算到内容（content）的宽度之内
即：一个盒子模型的总宽度=margin+padding+border+width;

border-box:
content的值包含了padding值和border值
即：一个盒子的总宽度=margin+width.
*/
```



## 图片

### 变灰白 grayscale

```css
filter: grayscale(100%);
```

### 等比例缩放 object-fit

```css
object-fit: cover;		/** 高度铺满，宽度等比例缩放，超出容器则裁剪 */

object-fit: contain;	/** 宽度铺满，高度等比例缩放，超出容器则裁剪 */
object-fit: fill;		/** 内容拉伸铺满，不保证原有比例 */
object-fit: none;		/** 图片大小不变，保留中间部分，超出容器则裁剪 */
object-fit: scale-down;	/** 图片本身小于容器，则与 none 效果相同，即图片大小不变
							图片本身大于容器，则与 contain 效果相同
						*/
```

### mix-blend-mode

```css
mix-blend-mode: multiply;	/** 将白色背景的图片，变成透明背景 */

/** 应用在文字上 */
mix-blend-mode: difference;	/** 文字与背景反色 */
mix-blend-mode: screen;		/** 文字镂空 */
```



## 背景

### background-size

与图片的 **object-fit** 相同

### background-blend-mode

与图片的 **mix-blend-mode** 相同



## **CSS 动画**

### 过渡效果 transition

在指定时间内，将元素从一种样式平滑的过渡到另一种样式，类似于简单的动画

```css
transition: 0.4s ease-out;
```

**transition-property**

> 应用过渡属性的名称，可以不写
>
> 初始值为 all，即所有属性都会被应用过渡

**transition-duration**

> 以秒或毫秒为单位指定过渡动画所需的时间
>
> 比如：1s  或者  1000ms

**transition-timing-function**

| 值                       | 描述                                                         |
| ------------------------ | ------------------------------------------------------------ |
| linear                   | 以始终相同的速度完成整个过渡过程，等同于 cubic-bezier(0,0,1,1) |
| ease                     | 以慢速开始，然后变快，然后慢速结束的顺序来完成过渡过程，等同于 cubic-bezier(0.25,0.1,0.25,1) |
| ease-in                  | 以慢速开始过渡的过程，等同于 cubic-bezier(0.42,0,1,1)        |
| ease-out                 | 以慢速结束过渡的过程，等同于 cubic-bezier(0,0,0.58,1)        |
| ease-in-out              | 以慢速开始，并以慢速结束的过渡效果，等同于 cubic-bezier(0.42,0,0.58,1) |
| cubic-bezier(n, n, n, n) | 使用 cubic-bezier() 函数来定义自己的值，每个参数的取值范围在 0 到 1 之间 |



### transform

```css
transform: translate(0, -10px); /** 位移 */
transform: scale(1.5);    /** 缩放 scaleX()、scaleY()、scaleZ() */
transform: rotate(45deg); /** 旋转 rotateX()、rotateY()、rotateZ() */
transform: skew(30deg);   /** 倾斜拉伸 skewX()、skewY() */
```



### 关键帧 @keyframes

@keyframes 定义关键帧

animation 创建动画

```css
@keyframes myfirst {
    from {background: red;}
    to {background: yellow;}
}

@keyframes myfirst {
    0%   {background: red;}
    25%  {background: yellow;}
    50%  {background: blue;}
    100% {background: green;}
}

div {
    animation: myfirst 5s;
}
```



## 其他

### em / rem

相对单位

- **em**  

  a) 按就近原则，找到设置过字体大小的节点，作为相对节点

  b) 乘以相对节点的字体大小

```css
.parent {
 font-size: 16px;	  /** 就近原则，找到相对节点的字体大小 */
 line-height: 1.5em; /** 实际行高为：1.5 * 16px，即：24px */
 
  .child {
    font-size: 2em; /** 实际字体大小为：2 * 16px，即：32px */
  }
}
```

-   **rem**


  a) 以根节点，即 html 节点，作为相对节点

  b) 乘以 html 节点的字体大小

  ```css
/** html 根节点的字体大小 */
html {
  font-size: 16px;
}

.child {
  font-size: 2rem; /** 实际字体大小为：2 * 16px，即：32px */
}
  ```



## LESS

### 循环

```less
/** 
 * 定义数组，用逗号分隔
 * 使用 each 循环
 * @{index} 为下标
 * @value   为值 
 */
@area-list: A, B, C, D, E;
each(@area-list, {
  .item:nth-child(@{index}) {
    grid-area: @value;
  }
})
```

