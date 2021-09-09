# Promise

> Promise 对象用于表示一个异步操作的最终完成 (或失败)及其结果值。

## 为什么需要 Promise

promise 的出现还是为了解决回调的问题：

1. 大脑对于事情的计划方式是**线性的、阻塞的、单线程**的语义，但是回调表达异步流程的方式是**非线性的、非顺序的**，这使得正确推导这样的代码难度很大。难于理解的代码是坏代码，会导致坏 bug。我们需要一种更同步、更顺序、更阻塞的的方式来表达异步，就像我们的大脑一样。
2. 最重要的是回调会受到控制反转的影响，因为**回调暗中把控制权交给第三方**（通常是不受你控制的第三方工具！）来调用你代码中的 continuation。这种控制转移导致一系列麻烦的信任问题，例如调 • 调用回调过早；• 调用回调过晚（或不被调用）；• 调用回调次数过少或过多；• 未能传递所需的环境和参数；• 吞掉可能出现的错误和异常

对于第一个问题，Promise 采用链式调用的方法，并且保证顺序是从前到后执行的，非常符合人类大脑的直觉;对于第二个问题，promise 把控制权又交回给了用户手里，并且 promise 决议后就不会再次调用，解决了信任问题，这也是它名字的由来。

## Promise 规范

如果我们要动手实现一个 Promise，那就必须明白 Promise 需要满足的需求。这里是 Promise 的[详细规范](https://github.com/promises-aplus/promises-spec)

我们在此摘抄一下几个关键的部分

1. new Promise 时，需要传递一个 executor 执行器，执行器立刻执行，executor 接受两个参数， 分别是 resolve 和 reject
2. 共有三个状态: pending、fulfilled、rejected。只会存在 pending -> fulfilled 或 pending -> rejected，并且无法再改变。
3. 拥有 then 方法，含有两个参数：onFulfilled 和 onRejected；then 方法可以被同一个 promise 多次调用；then 方法必须返回一个 promise 对象

...

当我们按照规范手写完 Promise 时，需要验证是否正确，则只需要跑一下这个[测试工具](https://github.com/promises-aplus/promises-tests)即可，需要注意的是需要额外添加如下代码

```js
MyPromise.defer = MyPromise.deferred = function () {
  let dfd = {}
  dfd.promise = new MyPromise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

module.exports = MyPromise
```