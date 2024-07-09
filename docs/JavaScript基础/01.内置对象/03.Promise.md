### Promise

#### Promise解决了什么问题

Promise是为了统一js中的异步实现方案

Promise无法消除回调，但是通过链式调用，让回调变得可控

```js
// Promise 是一个容器，里面保存着某个未来才会结束的事件的结果（通常是一个异步操作）。
// Promise 对象是一个构造函数

// 1) 创建 new Promise
const promise = new Promise(function(resolve, reject) {
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
})

// 2) promise.then 执行完毕 
//    promise.catch 的作用是，如果resolve的回调抛出异常了，不会报错卡死js，而是进入catch
promise
  .then(function(value) {
  	// success
	})
  .catch(function(reason){
    console.log('rejected');
    console.log(reason);
	});

// 3) Promise.all 并行执行异步操作，且在一个回调中处理所有的返回数据
Promise
.all([runAsync1(), runAsync2(), runAsync3()])
.then(function(results){
    console.log(results);
});
```

对象解构

模板字符串

async / await

