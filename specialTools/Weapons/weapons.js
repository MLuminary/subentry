//返回正确字符串的长度
function codePointLength(text) {
  var result = text.match(/[\s\S]/gu);
  return result ? result.length : 0;
}

//返回正确字符串的长度
function length(str) {
  return [...str].length;
}
