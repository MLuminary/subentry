
var n = 5; //五个城市
var x = [0, 1, 2, 3, 4]; //城市编号数组
var bestValue = Infinity; //最优的费用
var bestWay = [];
var arr = [
  [0, 3, 3, 2, 6],
  [3, 0, 7, 3, 2],
  [3, 7, 0, 2, 5],
  [2, 3, 2, 0, 3],
  [6, 2, 5, 3, 0]
];

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
 * @param {各个城市} x 数组
 * @param {表示 index 位置开始的全排列} index
 */
function enumerate(n, way, index) {
  if (index === n) {
    var w = 0;
    for(let j=0;j<n;j++){
      if(j<n-1){
        w+= way[x[j]][x[j+1]];
      }else{
        w+= way[x[j]][0];//回到起点的费用
      }
    }
    //如果存在更优解 
    if(bestValue > w){
      //替换最优值和最优路径
      bestValue = w;
      for(let j=0;j<n;j++){
        bestWay[j] = x[j];
      }
    }
  } else {
    for (let i = index; i < n; ++i) {
      swap(x, index, i);
      enumerate(n, way, index+1);
      swap(x, index, i);
    }
  }
}

enumerate(n, arr, 1);
console.log("最少费用:",bestValue);
console.log("最优路径:",bestWay);
