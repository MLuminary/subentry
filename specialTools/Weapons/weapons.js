//返回正确字符串的长度
function codePointLength(text) {
  var result = text.match(/[\s\S]/gu)
  return result ? result.length : 0
}

//返回正确字符串的长度
function length(str) {
  return [...str].length
}

//返回指定字符串在字符串中的所有位置
function findStr(strs, str) {
  var arr = [] //存储字符出现的位置
  var startIndex = 0,
    i = 0,
    flag = 0
  while (flag >= 0) {
    arr[i++] = strs.indexOf(str, startIndex)
    // 保存位置，如果是 -1 就不不会进入下一个循环
    flag = arr[i - 1]
    startIndex = arr[i - 1] + 1
  }
  // 移除 -1
  arr.pop()
  return arr
}

//base64转Blob
function base64Img2Blob(code) {
  var parts = code.split(';base64,')
  var contentType = parts[0].split(':')[1]
  var raw = window.atob(parts[1])
  var rawLength = raw.length

  var uInt8Array = new Uint8Array(rawLength)

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }

  return new Blob([uInt8Array], { type: contentType })
}
//下载base64图片
function downloadFile(fileName, content) {
  var aLink = document.createElement('a')
  var blob = base64Img2Blob(content) //new Blob([content]);

  var evt = document.createEvent('MouseEvents')
  evt.initEvent('click', false, false) //initEvent 不加后两个参数在FF下会报错
  aLink.download = fileName
  aLink.href = URL.createObjectURL(blob)

  aLink.dispatchEvent(evt)
}

// 将对象数据转为 location.search 的数据格式
function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[i] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}

// html转义
function escapeHtml(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, function(m) {
    return map[m]
  })
}
// 将HTML转义为实体
function escape(html){
  var elem = document.createElement('div')
  var txt = document.createTextNode(html)
  elem.appendChild(txt)
  return elem.innerHTML;
}
// 将实体转回为HTML
function unescape(str) {
  var elem = document.createElement('div')
  elem.innerHTML = str
  return elem.innerText || elem.textContent
}



// 写一个函数对下面的数组从小到大进行排序
// 数组中每一个元素均为版本号
// 版本号比较规则如下
// '4.8' === '4.8.0'
// '4.8' > '4.7.1'
// '4.8' < '4.10'

var versions = ['4.8', '4.7.1', '4.8.0', '4.10', '5', '4.1']

function sortVersions() {
  // code here
  versions.sort((a,b)=>{
    var arr1 = a.split('.')
    var arr2 = b.split('.')
    var minL = Math.min(arr1.length,arr2.length)
    var pos = 0
    var diff = 0
    while(pos !== minL) {
      if(arr1[diff] === arr2[diff]){
        diff++
      }else {
        return arr1[diff] - arr2[diff]
      }
      pos++
    }

  })
  console.log(versions)

}

sortVersions()

// return ['4.1', '4.7.1', '4.8', '4.8.0', '4.10', '5']