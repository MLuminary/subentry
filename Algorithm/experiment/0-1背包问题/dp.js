//dp解决0-1背包问题

;(function() {
  var ylDom = document.getElementById('dp-yl')

  document.getElementById('dp-sub').onclick = function() {
    var n = parseInt(dpnDom.value)
    var w = parseInt(dpwDom.value)
    var m = dpmDom.value.split(',').map(item => parseInt(item))
    var v = dpvDom.value.split(',').map(item => parseInt(item))

    console.time('动态规划用时')
    var obj = dp(n, w, m, v)
    console.timeEnd('动态规划用时')

    
    document.getElementById('dp-value').innerText = obj.maxValue
    document.getElementById('dp-items').innerText = obj.select
  }

  /**
   *
   * @param {商品个数} n
   * @param {容器总容积} w
   * @param {各个商品的重量} m
   * @param {各个商品的价值} v
   */
  function dp(n, w, m, v) {
    let bagMatrix = []
    let maxValue = 0
    let select = []

    function getMaxValue() {
      for (let i = 0; i <= w; i++) {
        bagMatrix[i] = [] //生成二维数组
        for (let j = 0; j < n; j++) {
          //如果背包的容量为 0
          if (i === 0) {
            bagMatrix[i][j] = 0
            continue
          }
          //背包的容量小于物品j的重量，那物品j就不存在可以装上
          if (i < m[j]) {
            bagMatrix[i][j] = bagMatrix[i][j - 1] || 0
          } else {
            bagMatrix[i][j] = Math.max(
              (bagMatrix[i - m[j]][j - 1] || 0) + v[j],
              bagMatrix[i][j - 1] || 0
            )
          }
        }
      }
      return bagMatrix[w][n - 1]
    }


    function getSelectItem(weight) {
      let select = [] // 选择的物品
      for (let j = n - 1; j >= 0; j--) {
        try {
          if (bagMatrix[weight][j] === (bagMatrix[weight - m[j]][j - 1] || 0) + v[j]) {
            weight -= m[j]
            select.push(j + 1)
          }
        } catch (err) {}
      }
      return select
    }

    maxValue = getMaxValue()
    select = getSelectItem(w)

    select = [...new Set(select)]
    select.sort((a, b) => a - b)

    return {maxValue, select}
  }

  ylDom.addEventListener('click', function(e) {
    var element = e.target
    var index = element.dataset.index
    if (index) {
      dpnDom.value = data[index].n
      dpwDom.value = data[index].w
      dpmDom.value = data[index].m
      dpvDom.value = data[index].v
    }
  })
})()
