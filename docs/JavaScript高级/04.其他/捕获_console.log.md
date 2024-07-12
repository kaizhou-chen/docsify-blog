## 捕获 console.log

```js
const oldLog = console.log;

// 修改 console.log
console.log = function () {
  // 调用默认的打印
  oldLog.apply(console, arguments);
  
  // 捕获打印的内容
  const content = [...arguments];
};
```

