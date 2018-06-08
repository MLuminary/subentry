// var n = 4,
//   w = 50,
//   m = [30, 20, 10, 20],
//   v = [120, 20, 60, 100];
;(function() {
  var ylDom = document.getElementById('tx-yl')

  document.getElementById('tx-sub').onclick = function() {
    var n = parseInt(txnDom.value)
    var w = parseInt(txwDom.value)
    var m = txmDom.value.split(',').map(item => parseInt(item))
    var v = txvDom.value.split(',').map(item => parseInt(item))

    console.time('贪心用时')
    var obj = greed(n, w, m, v)
    console.timeEnd('贪心用时')

    document.getElementById('tx-value').innerText = obj.value
    document.getElementById('tx-items').innerText = obj.select
  }

  /**
   *
   * @param {物品个数} n
   * @param {容器所承受总重量} w
   * @param {每个物品的重量} m 数组
   * @param {每个物品的价值} v 数组
   *
   */
  function greed(n, w, m, v) {
    var sortArray = [] //存储所有信息的数组
    var select = [] //选中的物品
    var value = 0 //商品总价值

    for (let i = 0; i < n; i++) {
      sortArray.push({
        weight: m[i], //物品重量
        value: v[i], //物品价值
        ratio: parseInt((v[i] / m[i]).toFixed(2)), //物品价值/重量
        index: i + 1 //物品编号
      })
    }
    //按单位重量价值排序
    sortArray.sort((a, b) => b.ratio - a.ratio)

    for (let i = 0; i < n; i++) {
      if (sortArray[i].weight > w) continue
      value += sortArray[i].value
      w -= sortArray[i].weight
      select.push(sortArray[i].index)
    }

    select.sort((a, b) => a - b)
    return {value, select};
  }

  ylDom.addEventListener('click', function(e) {
    var element = e.target
    var index = element.dataset.index
    if (index) {
      txnDom.value = data[index].n
      txwDom.value = data[index].w
      txmDom.value = data[index].m
      txvDom.value = data[index].v
    }
  })
})()
