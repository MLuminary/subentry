var pre = [1, 2, 4, 7, 3, 5, 6, 8]
var mid = [4, 7, 2, 1, 5, 3, 8, 6]

var n = 8 // 二叉树节点
var back = [] // 用来存储后序遍历的数值

/**
 *
 * @param {中序遍历数组} mid
 * @param {根节点} h
 */
function getRootInMid(mid, ms, me, h) {
  for (let i = ms; i <= me; ++i) {
    if (h === mid[i]) {
      return i
    }
  }

  return -1
}

/**
 * 
 * @param {前序遍历的结果} pre 
 * @param {前序开头} ps 
 * @param {前序结尾} pe 
 * @param {中序遍历结果} mid 
 * @param {中序开头} ms 
 * @param {中序结尾} me 
 */
function getOrder(pre, ps, pe, mid, ms, me) {
  var currentIndex // 当前根节点位置
  var cl // 左子树数量
  var cr // 右子树数量
  back[--n] = pre[ps] // 从后赋值

  currentIndex = getRootInMid(mid, ms, me, pre[ps])

  if (currentIndex === -1) {
    console.log('no')
    return
  } else {
    cl = currentIndex - ms
    cr = me - currentIndex
    if (cr > 0) {
      // 先遍历右子树
      getOrder(pre, ps + cl + 1, pe, mid, currentIndex + 1, me)
    }
    if (cl > 0) {
      // 遍历左子树
      getOrder(pre, ps + 1, ps + cl, mid, ms, currentIndex - 1)
    }
  }
}

getOrder(pre, 0, n - 1, mid, 0, n - 1)

console.log(back)