var arr = [1, 5, 6, 9];

function swap(arr, a, b) {
  var temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

/**
 * 
 * @param {数组} arr 
 * @param {数组长度} len 
 * @param {要进行全排列的开头位置} index 
 */
function make(arr, len, index) {
  if (index === len) {
    // console.log(arr);
    var str = arr.toString();
    str = str.replace(/,/g, '');
    console.log(str);
  } else {
    for (var i = index; i < len; ++i) {
      swap(arr, index, i);
      make(arr, len, index + 1);
      swap(arr, index, i);
    }
  }
}

make(arr, arr.length, 0);
