var n = 5 //五个城市
var x = [0, 1, 2, 3, 4] //城市编号数组
var bestValue = Infinity //最优的费用
var bestWay = []
var arr = [
  [0, 3, 3, 2, 6],
  [3, 0, 7, 3, 2],
  [3, 7, 0, 2, 5],
  [2, 3, 2, 0, 3],
  [6, 2, 5, 3, 0]
]

function swap(arr, a, b) {
  var temp = arr[a]
  arr[a] = arr[b]
  arr[b] = temp
}

class Node {
  /**
   * 
   * @param {*限界值} lb 
   * @param {*起点} start 
   * @param {*终点} end 
   * @param {*走过的路径距离} sumv 
   * @param {*走过的点数} nodeSum 
   * @param {*经过的顶点} path 
   * @param {*本节点} index 
   * @param {*上一个节点的id} front 
   * @param {*自身的id} id 
   */
  constructor(lb, start, end, sumv, nodeSum, path, index, front, id) {
    this.lb = lb 
    this.start = start
    this.end = end
    this.sumv = sumv 
    this.nodeSum = nodeSum 
    this.path = path 
    this.index = index 
    this.front = front 
    this.id = id 
  }
}

