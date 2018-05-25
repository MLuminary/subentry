//dp解决0-1背包问题

var n = 4,
  w = 50,
  m = [30, 20, 10, 20],
  v = [120, 20, 60, 100];

/**
 *
 * @param {商品个数} n
 * @param {容易总容积} w
 * @param {各个商品的重量} m
 * @param {各个商品的价值} v
 */
function packageMaxValue(n, w, m, v) {
  let bagMatrix = [];
  let select = [];
  for (let i = 0; i <= w; i++) {
    bagMatrix[i] = []; //生成二维数组
    for (let j = 0; j < n; j++) {
      //如果背包的容量为 0
      if (i === 0) {
        bagMatrix[i][j] = 0;
        continue;
      }
      //背包的容量小于物品j的重量，那物品j就不存在可以装上
      if (i < m[j]) {
        bagMatrix[i][j] = bagMatrix[i][j - 1] || 0;
      } else {
        bagMatrix[i][j] = Math.max(
          bagMatrix[i - m[j]][j - 1] + v[j] || 0,
          bagMatrix[i][j - 1] || 0
        );
        if (bagMatrix[i][j] === bagMatrix[i - m[j]][j - 1] + v[j]) {
          select.push(j);
        }
      }
    }
  }

  select = [...new Set(select)]
  select.sort((a,b)=>a-b);

  console.log("物品最大价值：", bagMatrix[w][n - 1]);
  console.log("选择的物品: ",select);
}
console.time("动态规划用时")
packageMaxValue(n, w, m, v);
console.timeEnd("动态规划用时")

