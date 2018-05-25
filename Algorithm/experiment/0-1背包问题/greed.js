var n = 4,
  w = 50,
  m = [30, 20, 10, 20],
  v = [120, 20, 60, 100];

/**
 *
 * @param {物品个数} n
 * @param {容器所承受总重量} w
 * @param {每个物品的重量} m 数组
 * @param {每个物品的价值} v 数组
 *
 */
function greed(n, w, m, v) {
  var sortArray = []; //存储所有信息的数组
  var select = []; //选中的物品
  var value = 0; //商品总价值

  for (let i = 0; i < n; i++) {
    sortArray.push({
      weight: m[i], //物品重量
      value: v[i],  //物品价值
      ratio: parseInt((v[i] / m[i]).toFixed(2)), //物品价值/重量
      index: i //物品编号
    });
  }
  //按单位重量价值排序
  sortArray.sort((a, b) => b.ratio - a.ratio);

  for(let i = 0; i < n; i++){
    if(sortArray[i].weight > w) continue;
    value+=sortArray[i].value;
    w-=sortArray[i].weight;
    select.push(sortArray[i].index);
  }

  select.sort((a,b)=>a-b);
  console.log("总价值: ",value)
  console.log("选择的商品",select)
}

console.time("贪心用时")
greed(n, w, m, v);
console.timeEnd("贪心用时")
