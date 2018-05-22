var arr = [1, 5, 6, 9];

function swap(arr, a, b) {
  var temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function make(arr, len, index) {
  if (index === len) {
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
