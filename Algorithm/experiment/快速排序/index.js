/**
 *
 * @param {要排序的数组} arr
 */
function quicksort1(arr) {
  if (arr.length <= 1) return arr
  var left = [],
    right = [],
    baseIndex = Math.round(arr.length / 2),
    baseNum = arr.splice(baseIndex, 1)[0] //将基准值提取出来

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] <= baseNum) {
      left.push(arr[i])
    } else if (arr[i] > baseNum) {
      right.push(arr[i])
    }
  }
  return quicksort1(left).concat([baseNum], quicksort1(right))
}

/**
 *
 * @param {要排序的数组} arr
 */
function quicksort(arr) {
  //交换
  function swap(arr, a, b) {
    var temp = arr[a]
    arr[a] = arr[b]
    arr[b] = temp
  }

  //分区
  function partition(arr, left, right) {
    // 刚开始没有基准，默认使用最右边元素
    var base = arr[right]
    /**
     * 存放小于 base 的元素时，是紧挨着上一元素的，否则空隙里存放的可能是大于 base 的元素，
     * 故声明一个 storeIndex 变量，并初始化为 left 来依次紧挨着存放小于 base 的元素。
     */
    var storeIndex = left
    for (var i = left; i < right; i++) {
      if (arr[i] < base) {
        /**
         * 遍历数组，找到小于的 base 的元素，
         * 将循环i次时得到的元素，通过 swap 交换放到storeIndex处，
         * 并对 storeIndex 递增 1，表示下一个可能要交换的位置
         */
        swap(arr, storeIndex, i)
        storeIndex++
      }
    }
    // 最后将基准元素放在 storeIndex 处，左边是比其小的，右边是比其大的
    swap(arr, right, storeIndex)
    return storeIndex
  }

  function sort(arr, left, right) {
    if (left > right) return
    //获取基准值
    var storeIndex = partition(arr, left, right)
    //对左半部分进行排序
    sort(arr, left, storeIndex - 1)
    //对右半部分进行排序
    sort(arr, storeIndex + 1, right)
  }

  sort(arr, 0, arr.length - 1)
  return arr
}

var sortBtn = document.getElementById('sortBtn')
sortBtn.onclick = function() {
  var arr = document
    .getElementById('in')
    .value.split(',')
    .map(function(item) {
      return parseInt(item)
    })

  console.time('quicksort')
  var result = quicksort(arr)
  console.timeEnd('quicksort')

  document.getElementById('out').value = result.toString()
}

var random = document.getElementById('random')

random.onclick = function() {
  var num = []
  for (var i = 0; i < 100; i++) {
    num[i] = Math.floor(Math.random() * 1000)
  }
  document.getElementById('in').value = num;
}

var arr1 = [] //最坏情况
var arr2 = [] //随机数组

for (var i = 0; i < 1000; i++) {
  arr1[i] = i
  arr2[i] = Math.random() * 10000
}
arr1.sort((a, b) => b - a)
console.time('最坏情况')
quicksort(arr1)
console.timeEnd('最坏情况')

console.time('平均情况')
quicksort(arr2)
console.timeEnd('平均情况')

//20,8,61,32,87,10,3,5,8,2

//10,9,8,7,6,5,4,3,2,1
