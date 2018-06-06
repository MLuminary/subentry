//dp解决0-1背包问题

;(function() {
  var ylDom = document.getElementById('dp-yl')

  document.getElementById('dp-sub').onclick = function() {
    var n = parseInt(dpnDom.value)
    var w = parseInt(dpwDom.value)
    var m = dpmDom.value.split(',').map(item => parseInt(item))
    var v = dpvDom.value.split(',').map(item => parseInt(item))

    console.time('动态规划用时')
    packageMaxValue(n, w, m, v)
    console.timeEnd('动态规划用时')
  }

  /**
   *
   * @param {商品个数} n
   * @param {容器总容积} w
   * @param {各个商品的重量} m
   * @param {各个商品的价值} v
   */
  function packageMaxValue(n, w, m, v) {
    let bagMatrix = []
    let select = []
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
            (bagMatrix[i - m[j]][j - 1] || 0) + v[j] || 0,
            bagMatrix[i][j - 1] || 0
          )
          if (bagMatrix[i][j] === bagMatrix[i - m[j]][j - 1] + v[j]) {
            select.push(j + 1)
          }
        }
      }
    }

    select = [...new Set(select)]
    select.sort((a, b) => a - b)

    document.getElementById('dp-value').innerText = bagMatrix[w][n - 1]
    document.getElementById('dp-items').innerText = select
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
