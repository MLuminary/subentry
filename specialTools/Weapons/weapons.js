//返回正确字符串的长度
function codePointLength(text) {
  var result = text.match(/[\s\S]/gu);
  return result ? result.length : 0;
}

//返回正确字符串的长度
function length(str) {
  return [...str].length;
}

//返回指定字符串在字符串中的所有位置
function findStr(strs, str) {
  var arr = [];//存储字符出现的位置
  var startIndex = 0, i = 0, flag = 0;
  while (flag >= 0) {
    arr[i++] = strs.indexOf(str, startIndex)
    flag = arr[i - 1];
    startIndex = arr[i - 1] + 1;
  }
  arr.pop();
  return arr;
}
