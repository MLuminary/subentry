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
      ret += (min1 + min2)
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

branch()
