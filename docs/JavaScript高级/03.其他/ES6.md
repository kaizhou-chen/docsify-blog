## ES6

### 扩展运算符 (...)

```js
/* 浅拷贝 */

// 复制对象
const newObj = { ...obj };

// 复制数组
const newList = [ ...list ];
```

#### 剩余运算符 (...)

获取可迭代对象的剩余属性

```js
// 解构，取出 name 属性，并将其他属性放入 rest 对象
const { name, ...rest } = obj;

// 第一个参数是 title，剩余的参数放在 rest 数组里
function foo(title, ...rest) {}
```



### 可选链操作符 (?.)

```js
// 在引用为空 (null 或者 undefined) 的情况下，不会引起错误
let name = obj.foo?.name;
```



### 空值合并操作符 (??)

```js
// 这是一个逻辑操作符，当左侧为 null 或者 undefined 时，返回右侧的值
let name;
const food = name ?? 'default name';
```



### 数字格式化

```js
const num = 12345.678;

// toFixed() 保留2位小数
let formattedNum = num.toFixed(2);

// Intl.NumberFormat 格式化 API，支持货币格式化、百分比格式化
// 带千分位分隔符，保留2位小数
const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
let formattedNum2 = formatter.format(num);
```

