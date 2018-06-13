var n = 5; //五个城市
var x = [0, 1, 2, 3, 4]; //城市编号数组
var bestValue = Infinity; //最优的费用
var bestWay = [];


function swap(arr, a, b) {
  var temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

// 穷举法

/**
 *
 * @param {城市的个数} n
 * @param {各个城市相离的距离} way 二维数组
 * @param {表示 index 位置开始的全排列} index
 */
function enumerate(n, way, index) {
  if (index === n) {
    var w = 0;
    for (let j = 0; j < n; j++) {
      if (j < n - 1) {
        w += way[x[j]][x[j + 1]];
      } else {
        w += way[x[j]][0]; //回到起点的费用
      }
    }
    //枚举
    console.log(x, w);
    //如果存在更优解
    if (bestValue > w) {
      //替换最优值和最优路径
      bestValue = w;
      for (let j = 0; j < n; j++) {
        bestWay[j] = x[j];
      }
    }
  } else {
    for (let i = index; i < n; ++i) {
      swap(x, index, i);
      enumerate(n, way, index + 1);
      swap(x, index, i);
    }
  }
}
// console.time("枚举耗时")
// enumerate(n, arr, 1);
// console.timeEnd("枚举耗时")
// console.log("最少费用:",bestValue);
// console.log("最优路径:",bestWay);

var cl = 0; //路线长度
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
        bestWay[j] = x[j] + 1;
      }
      bestValue = cl + way[x[n - 1]][x[0]];
    }
  } else {
    for (let i = index; i < n; i++) {
      //如果x[index-1]号城市可以到达x[index]号城市，并且可以得到更短的路径
      if (way[x[index - 1]][x[index]] !== 0 && cl + way[x[index - 1]][x[index]] < bestValue) {
        swap(x, i, index);
        cl += way[x[index - 1]][x[index]];
        recall(n, way, index + 1);
        cl -= way[x[index - 1]][x[index]];
        swap(x, i, index);
      }
    }
  }
}

document.getElementById('hs-calc').onclick = function() {
  console.time('回溯耗时');
  recall(n, arr, 1);
  console.timeEnd('回溯耗时');

  document.getElementById('hs-value').innerText = bestValue
  document.getElementById('hs-items').innerText = bestWay
}



