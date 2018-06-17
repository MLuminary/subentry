# 实验三 旅行商问题

## 一. 实验内容

分别编程实现回溯法和分支限界法求 TSP 问题的最优解，分析比较两种算法的时间复杂度并验证分析结果。

## 二．实验目的

1、掌握回溯法和分支限界法解决问题的一般步骤，学会使用回溯法和分支限界法解决实际问题；
2、理解回溯法和分支限界法的异同及各自的适用范围。

## 三. 算法描述

### 回溯法

> 其实回溯法就是在全排列问题上加以限制

1.  定义 `cl` 为路线长度，`way` 为各个城市相离的距离，`index` 表示全排列开始的位置，`x` 为存储城市编号的数组
2.  `cl` 初始化为 0，`index` 为 1
3.  从 `index` 位置到 `n` 进行遍历，如果 `x[index-1]` 号城市可以到达 `x[index]` 号城市，并且可以得到更短的路径，那就交换 `index` 和此时 `i` 的位置，并且 `cl` + `way[x[index - 1]][x[index]]`
4.  `index` + 1 然后继续向下递归，并把 `index` 和 `i` 的位置复原，把 `cl` 的值也复原
5.  全排列完成后再进行一轮判断即可获取最优值和最优路线

### 分支限界法

> 分支限界法类似于回溯法，但是与其求解目标不同。回溯法求解目标是找出解空间中满足约束条件的所有解，而分支限界法的求解目标则是找出满足约束条件的一个解，或是在满足约束条件的解中找出使某一目标函数值达到极大或极小的解

1.  用贪心算法计算问题的上界。以起始城市作为出发城市，每次从当前出发城市发出的多条边中，选择没有遍历过的最短边连接的城市，作为下一步达到城市
2.  每次从当前出发城市选择两个最短边相加最后除二得到下界
3.  以最短路径长度 `get_lb` 作为评价函数，在问题求解过程中，如果 1 个部分解的评价函数 `get_lb` 下界超出此界限，则该部分解对应了死结点，可剪枝
4.  该部分解的评价函数的下界为(已经经过的路径的总长的 2 倍+从起点到最近未遍历城市的距离+从终点到最近未遍历城市的距离+进入/离开未遍历城市时各未遍历城市带来的最小路径成本)除以 2 并向上取整
5.  将未被剪枝的结果保留，与先前保存的 `bestValue` 做比较，如果更优的话就替换

## 四. 算法实现

### 回溯法

#### 数据结构

`way` 存储城市与城市之间的距离

```js
var arr = [
  [0, 3, 1, 5, 8],
  [3, 0, 6, 7, 9],
  [1, 6, 0, 4, 2],
  [5, 7, 4, 0, 3],
  [8, 9, 2, 3, 0]
]
```

#### 函数说明

`swap` 交换函数

参数：

- arr : 用于交换的数组
- a : 下标 a
- b : 下标 b

```js
function swap(arr, a, b) {
  var temp = arr[a]
  arr[a] = arr[b]
  arr[b] = temp
}
```

`recall` 主函数

参数：

- n : 城市个数
- way: 各个城市相离的距离
- index: 表示 index 位置开始的全排列

```js
function recall(n, way, index) {
  if (index === n) {
    if (way[x[n - 1]][x[0]] !== 0 && cl + way[x[n - 1]][x[0]] < bestValue) {
      for (let j = 0; j < n; j++) {
        bestWay[j] = x[j] + 1
      }
      bestValue = cl + way[x[n - 1]][x[0]]
    }
  } else {
    for (let i = index; i < n; i++) {
      //如果x[index-1]号城市可以到达x[index]号城市，并且可以得到更短的路径
      if (
        way[x[index - 1]][x[index]] !== 0 &&
        cl + way[x[index - 1]][x[index]] < bestValue
      ) {
        swap(x, i, index)
        cl += way[x[index - 1]][x[index]]
        recall(n, way, index + 1)
        cl -= way[x[index - 1]][x[index]]
        swap(x, i, index)
      }
    }
  }
}
```

#### 源程序代码

```js
var arr = []

var hs_random_btn = document.getElementById('hs-random')

// 点击按钮后根据 n 生成随机的 arr
hs_random_btn.onclick = function() {
  var n = parseInt(document.getElementById('cityNum').value)
  console.log(n)
  for (var i = 0; i < n; i++) {
    arr[i] = []
    for (var j = i; j < n; j++) {
      arr[i][j] = Math.ceil(Math.random() * 20 + 1)
      if (j === i) arr[i][j] = 0
    }
  }

  for (var j = 0; j < n; j++) {
    for (var i = j + 1; i < n; i++) {
      arr[i][j] = arr[j][i]
    }
  }

  var html = ''
  for (var i = 0; i < n; i++) {
    html += '<tr>'
    for (var j = 0; j < n; j++) {
      html += `<td>${arr[i][j]}</td>`
    }
    html += '</td>'
  }

  document.getElementById('hs-random-num').innerHTML = html
}

var n = 5 //五个城市
var x = [0, 1, 2, 3, 4] //城市编号数组
var bestValue = Infinity //最优的费用
var bestWay = []
var cl = 0 //路线长度
/**
 *
 * @param {城市个数} n
 * @param {各个城市相离的距离} way
 * @param {表示 index 位置开始的全排列} index
 */
function recall(n, way, index) {
  if (index === n) {
    if (way[x[n - 1]][x[0]] !== 0 && cl + way[x[n - 1]][x[0]] < bestValue) {
      for (let j = 0; j < n; j++) {
        bestWay[j] = x[j] + 1
      }
      bestValue = cl + way[x[n - 1]][x[0]]
    }
  } else {
    for (let i = index; i < n; i++) {
      //如果x[index-1]号城市可以到达x[index]号城市，并且可以得到更短的路径
      if (
        way[x[index - 1]][x[index]] !== 0 &&
        cl + way[x[index - 1]][x[index]] < bestValue
      ) {
        swap(x, i, index)
        cl += way[x[index - 1]][x[index]]
        recall(n, way, index + 1)
        cl -= way[x[index - 1]][x[index]]
        swap(x, i, index)
      }
    }
  }
}
```

### 分支限界法

#### 数据结构

`arr` 存储城市间的距离

```js
var arr = [
  [0, 0, 0, 0, 0, 0],
  [0, Infinity, 3, 1, 5, 8],
  [0, 3, Infinity, 6, 7, 9],
  [0, 1, 6, Infinity, 4, 2],
  [0, 5, 7, 4, Infinity, 3],
  [0, 8, 9, 2, 3, Infinity]
]
```

`Node` 存储相关信息的节点

```js
class Node {
  /**
   *
   * @param {城市是否走过} vis
   * @param {路径的起点} st
   * @param {路径的终点} ed
   * @param {走过的点数} k
   * @param {经过路径的距离} sumv
   * @param {目标函数的值} lb
   */
  constructor(vis = [], st, ed, k, sumv, lb) {
    this.vis = vis
    this.st = st
    this.ed = ed
    this.k = k
    this.sumv = sumv
    this.lb = lb
  }
}
```

`ArrayQueue` js 模拟 c++ 队列

```js
// 用数组模拟队列
function ArrayQueue() {
  var arr = []
  //入队操作
  this.push = function(element) {
    arr.push(element)
    // 每次插入队列自动按从小到大排序
    arr.sort((a, b) => a.lb - b.lb)
  }
  //出队操作
  this.pop = function() {
    return arr.shift()
  }
  //获取队首
  this.top = function() {
    return arr[0]
  }
  //获取队尾
  this.back = function() {
    return arr[arr.length - 1]
  }
  //清空队列
  this.clear = function() {
    arr = []
  }
  //获取队长
  this.size = function() {
    return arr.length
  }
  // 判断是否为空
  this.empty = function() {
    return arr.length === 0 ? true : false
  }
  //展示数据
  this.show = function() {
    return arr
  }
}
```

#### 函数说明

`get_up()` 获取上界

返回值：

- up : 上界

```js
function get_up() {
  let used = []
  used[1] = 1 // 表示起点被使用
  let up = get_up_helper(1, 1, 0)
  /**
   *
   * @param {当前位置} v
   * @param {已经过的城市个数} j
   * @param {总路径} len
   */
  function get_up_helper(v, j, len) {
    let minLen = Infinity
    let pos
    // 返回起点
    if (j === n) return len + arr[v][1]

    for (let i = 1; i <= n; i++) {
      // 采用贪心法求权值最小边
      if (used[i] !== 1 && minLen > arr[v][i]) {
        minLen = arr[v][i]
        pos = i
      }
    }
    used[pos] = 1
    return get_up_helper(pos, j + 1, len + minLen)
  }
  return up
}
```

`get_low()` 获取下界

返回值 :

- low : 下界

```js
// 获取下界
function get_low() {
  let low = 0
  for (let i = 1; i <= n; i++) {
    let temp = []
    for (j = 1; j <= n; j++) {
      temp[j] = arr[i][j]
    }

    temp.sort((a, b) => a - b)
    low += temp[0] + temp[1]
  }
  return low / 2
}
```

`get_lb` 部分解目标函数的下界

参数 ：

- p : Node 结构的节点

返回值 ：

- ret : 部分解的下界

```js
// 部分解目标函数的下界
function get_lb(p) {
  let ret = p.sumv * 2
  let min1 = Infinity,
    min2 = Infinity
  // 从起点到最近未遍历城市的距离
  for (let i = 1; i <= n; i++) {
    if (p.vis[i] !== 1 && min1 > arr[p.st][i]) {
      min1 = arr[p.st][i]
    }
  }

  ret += min1
  // 从终点到最近未遍历城市的距离
  for (let i = 1; i <= n; i++) {
    if (p.vis[i] !== 1 && min2 > arr[p.ed][i]) {
      min2 = arr[p.ed][i]
    }
  }
  ret += min2

  // 进入并离开每个未遍历城市的最小成本
  for (let i = 1; i <= n; i++) {
    if (p.vis[i] !== 1) {
      min1 = min2 = Infinity
      for (let j = 1; j <= n; j++) {
        if (min1 > arr[i][j]) {
          min1 = arr[i][j]
        }
      }
      for (let j = 1; j <= n; j++) {
        if (min2 > arr[j][i]) {
          min2 = arr[j][i]
        }
      }
      ret += min1 + min2
    }
  }
  //向上取整
  return Math.ceil(ret / 2)
}
```

`branch` 分支限界法主函数

返回值:

- ret : 最优值

```js
function branch() {
  let up = get_up()
  let low = get_low()

  let start = new Node()
  start.st = 1
  start.ed = 1
  start.k = 1
  for (let i = 1; i <= n; i++) {
    start.vis[i] = 0
  }
  start.vis[1] = 1
  start.sumv = 0
  start.lb = low
  let ret = Infinity
  q.push(start)
  let next = new Node()
  let temp = new Node()
  // 当队列q不为空
  while (!q.empty()) {
    temp = q.top()
    q.pop() // 删除队首元素
    if (temp.k === n - 1) {
      // 如果只剩最后一个点
      let pos = 0

      for (let i = 1; i <= n; i++) {
        // 找到没走过的城市
        if (temp.vis[i] !== 1) {
          pos = i
          break
        }
      }

      if (pos === 0) break

      let ans = temp.sumv + arr[pos][temp.st] + arr[temp.ed][pos]
      let judge = new Node()
      judge = q.top()
      // 如果当前路径和比所有的目标函数值都小则跳出并直接输出最优解
      if (ans <= judge.lb) {
        ret = Math.min(ans, ret)
        break
      } else {
        // 继续求其他可能的路径并更新上界
        up = Math.min(up, ans)
        ret = Math.min(ret, ans)
        continue
      }
    }

    for (let i = 1; i <= n; i++) {
      if (temp.vis[i] !== 1) {
        next.st = temp.st // 起点为当前点的起点
        next.sumv = temp.sumv + arr[temp.ed][i] // 当前路径+此时路径
        next.ed = i // 结束点为当前点
        next.k = temp.k + 1 // 经过点数+1
        for (let j = 1; j <= n; j++) {
          next.vis[j] = temp.vis[j]
        }
        // 经过城市
        next.vis[i] = 1
        // 评价函数计算其下界
        next.lb = get_lb(next)
        // 如果下界大于上界则跳过
        if (next.lb >= up) continue
        q.push(next)
      }
    }
  }
  return ret
}
```

#### 源代码程序

```js
var n = 5 //五个城市

var arr = [
  [0, 0, 0, 0, 0, 0],
  [0, Infinity, 3, 1, 5, 8],
  [0, 3, Infinity, 6, 7, 9],
  [0, 1, 6, Infinity, 4, 2],
  [0, 5, 7, 4, Infinity, 3],
  [0, 8, 9, 2, 3, Infinity]
]

class Node {
  /**
   *
   * @param {城市是否走过} vis
   * @param {路径的起点} st
   * @param {路径的终点} ed
   * @param {走过的点数} k
   * @param {经过路径的距离} sumv
   * @param {目标函数的值} lb
   */
  constructor(vis = [], st, ed, k, sumv, lb) {
    this.vis = vis
    this.st = st
    this.ed = ed
    this.k = k
    this.sumv = sumv
    this.lb = lb
  }
}

// 用数组模拟队列
function ArrayQueue() {
  var arr = []
  //入队操作
  this.push = function(element) {
    arr.push(element)
    // 每次插入队列自动按从小到大排序
    arr.sort((a, b) => a.lb - b.lb)
  }
  //出队操作
  this.pop = function() {
    return arr.shift()
  }
  //获取队首
  this.top = function() {
    return arr[0]
  }
  //获取队尾
  this.back = function() {
    return arr[arr.length - 1]
  }
  //清空队列
  this.clear = function() {
    arr = []
  }
  //获取队长
  this.size = function() {
    return arr.length
  }
  // 判断是否为空
  this.empty = function() {
    return arr.length === 0 ? true : false
  }
  //展示数据
  this.show = function() {
    return arr
  }
}

// 获取上界
function get_up() {
  let used = []
  used[1] = 1 // 表示起点被使用
  let up = get_up_helper(1, 1, 0)
  /**
   *
   * @param {当前位置} v
   * @param {已经过的城市个数} j
   * @param {总路径} len
   */
  function get_up_helper(v, j, len) {
    let minLen = Infinity
    let pos
    // 返回起点
    if (j === n) return len + arr[v][1]

    for (let i = 1; i <= n; i++) {
      // 采用贪心法求权值最小边
      if (used[i] !== 1 && minLen > arr[v][i]) {
        minLen = arr[v][i]
        pos = i
      }
    }
    used[pos] = 1
    return get_up_helper(pos, j + 1, len + minLen)
  }
  return up
}

// 获取下界
function get_low() {
  let low = 0
  for (let i = 1; i <= n; i++) {
    let temp = []
    for (j = 1; j <= n; j++) {
      temp[j] = arr[i][j]
    }

    temp.sort((a, b) => a - b)
    low += temp[0] + temp[1]
  }
  return low / 2
}

// 部分解目标函数的下界
function get_lb(p) {
  let ret = p.sumv * 2
  let min1 = Infinity,
    min2 = Infinity
  // 从起点到最近未遍历城市的距离
  for (let i = 1; i <= n; i++) {
    if (p.vis[i] !== 1 && min1 > arr[p.st][i]) {
      min1 = arr[p.st][i]
    }
  }

  ret += min1
  // 从终点到最近未遍历城市的距离
  for (let i = 1; i <= n; i++) {
    if (p.vis[i] !== 1 && min2 > arr[p.ed][i]) {
      min2 = arr[p.ed][i]
    }
  }
  ret += min2

  // 进入并离开每个未遍历城市的最小成本
  for (let i = 1; i <= n; i++) {
    if (p.vis[i] !== 1) {
      min1 = min2 = Infinity
      for (let j = 1; j <= n; j++) {
        if (min1 > arr[i][j]) {
          min1 = arr[i][j]
        }
      }
      for (let j = 1; j <= n; j++) {
        if (min2 > arr[j][i]) {
          min2 = arr[j][i]
        }
      }
      ret += min1 + min2
    }
  }
  //向上取整
  return Math.ceil(ret / 2)
}

q = new ArrayQueue()

function branch() {
  let up = get_up()
  let low = get_low()

  let start = new Node()
  start.st = 1
  start.ed = 1
  start.k = 1
  for (let i = 1; i <= n; i++) {
    start.vis[i] = 0
  }
  start.vis[1] = 1
  start.sumv = 0
  start.lb = low
  let ret = Infinity
  q.push(start)
  let next = new Node()
  let temp = new Node()
  // 当队列q不为空
  while (!q.empty()) {
    temp = q.top()
    q.pop() // 删除队首元素
    if (temp.k === n - 1) {
      // 如果只剩最后一个点
      let pos = 0

      for (let i = 1; i <= n; i++) {
        // 找到没走过的城市
        if (temp.vis[i] !== 1) {
          pos = i
          break
        }
      }

      if (pos === 0) break

      let ans = temp.sumv + arr[pos][temp.st] + arr[temp.ed][pos]
      let judge = new Node()
      judge = q.top()
      // 如果当前路径和比所有的目标函数值都小则跳出并直接输出最优解
      if (ans <= judge.lb) {
        ret = Math.min(ans, ret)
        break
      } else {
        // 继续求其他可能的路径并更新上界
        up = Math.min(up, ans)
        ret = Math.min(ret, ans)
        continue
      }
    }

    for (let i = 1; i <= n; i++) {
      if (temp.vis[i] !== 1) {
        next.st = temp.st // 起点为当前点的起点
        next.sumv = temp.sumv + arr[temp.ed][i] // 当前路径+此时路径
        next.ed = i // 结束点为当前点
        next.k = temp.k + 1 // 经过点数+1
        for (let j = 1; j <= n; j++) {
          next.vis[j] = temp.vis[j]
        }
        // 经过城市
        next.vis[i] = 1
        // 评价函数计算其下界
        next.lb = get_lb(next)
        // 如果下界大于上界则跳过
        if (next.lb >= up) continue
        q.push(next)
      }
    }
  }
  return ret
}
```

## 五．程序运行结果

![旅行商问题](旅行商问题.png)

## 六．实验结果分析

回溯法的时间复杂度为 O(n!) ，分支限界法的时间复杂度为 O(n²2^n)，分支限界的复杂度和评价函数有很大关系，一个好的评价函数可以让复杂度大大减小。

## 七．结论

从实现步骤上来说，回溯法会求出所有解，分支限界法会从返回满足要求的一个解。所以回溯法会以深度优先遍历 解空间树，而分支限界法会以广度优先遍历解空间树。

回溯法搜索的时间正比于搜索解空间的大小，分支限界法的时间敏感于最优解所在位置，当最优解偏树根，则时间 相对于搜索整个解空间树非常少。

回溯法适合用于解组合数较大的问题。

分支限界法适合用于解离散最优化问题。
