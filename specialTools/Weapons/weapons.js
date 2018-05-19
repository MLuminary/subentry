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

//下载base64图片
function base64Img2Blob(code) {
  console.log(1);
  var parts = code.split(';base64,');
  var contentType = parts[0].split(':')[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;

  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}
//下载base64图片
function downloadFile(fileName, content) {

  var aLink = document.createElement('a');
  var blob = base64Img2Blob(content); //new Blob([content]);

  var evt = document.createEvent("MouseEvents");
  evt.initEvent("click", false, false);//initEvent 不加后两个参数在FF下会报错
  aLink.download = fileName;
  aLink.href = URL.createObjectURL(blob);

  aLink.dispatchEvent(evt);
}