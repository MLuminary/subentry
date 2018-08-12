var Weapons = new function() {
  var self = this

  // 对象转 seach 格式
  self.param = function(data) {
    let url = ''
    for (var k in data) {
      let value = data[i] !== undefined ? data[k] : ''
      url += `&${k}=${encodeURIComponent(value)}`
    }
    return url ? url.substring(1) : ''
  }

  // 将实体转回为HTML
  self.unescape = function(str) {
    var elem = document.createElement('div')
    elem.innerHTML = str
    return elem.innerText || elem.textContent
  }

  // html 转实体
  self.escape = function(html) {
    var elem = document.createElement('div')
    var txt = document.createTextNode(html)
    elem.appendChild(txt)
    return elem.innerHTML
  }

  // 防抖
  self.debounce = function() {
    // 定时器变量
    var timer
    return function() {
      var content = this,
        args = arguments
      var later = function() {
        // 传递 this 和 参数
        func.apply(content, args)
      }
      // 取消定时器
      clearTimeout(timer)
      timer = setTimeout(later, wait)
    }
  }

  // 节流
  self.throttle = function(func, wait, maxTime) {
    var timer,
      startTime = new Date() // 获取第一次执行的时间

    return function() {
      var content = this,
        args = arguments,
        curTime = new Date() // 获取当前时间

      var later = function() {
        func.apply(content, args)
      }

      clearTimeout(timer)

      if (curTime - startTime >= maxTime) {
        later()
        // 更新开始时间
        startTime = new Date()
      } else {
        timer = setTimeout(later, wait)
      }
    }
  }

  // 获得search中的特定属性
  self.getQueryString = function(name) {
    var after = window.location.hash.split('?')[1]
    if (after) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = after.match(reg)
      if (r != null) {
        return decodeURIComponent(r[2])
      } else {
        return null
      }
    }
  }

  /*时间戳转换*/
  self.JsonDateFormat = function(jsonDate, type) {
    if (jsonDate) {
      var timeStamp
      if (jsonDate.toString().length == 10) {
        timeStamp = jsonDate * 1000
      } else {
        timeStamp = jsonDate
      }
      var time = new Date(timeStamp)
      var y = time.getFullYear()
      var m =
        time.getMonth() + 1 < 10
          ? '0' + (time.getMonth() + 1)
          : time.getMonth() + 1
      var d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
      var h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
      var mm =
        time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
      var s =
        time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()
      if (type == 'date') {
        return y + '-' + m + '-' + d
      }
      if (type == 'datePoint') {
        return y + '.' + m + '.' + d
      }
      if (type == 'time') {
        return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s
      }
      if (type == 'min') {
        return y + '-' + m + '-' + d + ' ' + h + ':' + mm
      }
      if (type == 'hour') {
        return h + ':' + mm + ':' + s
      }
    }
  }

  /*获取今天日期*/
  /**
   *
   * @param {返回的类型} type
   * @param {提前的天数}} diff
   */
  self.JsonDateFormatNow = function(type, diff) {
    var time = new Date()
    var y = time.getFullYear()
    var m =
      time.getMonth() + 1 < 10
        ? '0' + (time.getMonth() + 1)
        : time.getMonth() + 1
    var d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
    var h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
    var mm =
      time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
    var s = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()
    if (diff) {
      time.setHours(0)
      time.setMinutes(0)
      time.setSeconds(0)
      time.setMilliseconds(0)
      var diffDays = 1000 * 60 * 60 * 24 * diff
      var time = new Date(time - diffDays)
      y = time.getFullYear()
      m =
        time.getMonth() + 1 < 10
          ? '0' + (time.getMonth() + 1)
          : time.getMonth() + 1
      d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
      return y + '-' + m + '-' + d
    } else {
      if (type == 'date') {
        return y + '-' + m + '-' + d
      }
      if (type == 'time') {
        return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s
      }
    }
  }
  /*时间转时间戳*/
  self.JsonDateFormatStamp = function(date, type, isSuffix) {
    var stampTime = ''
    if (isSuffix == 'suffix') {
      if (type == 'start') {
        if (date.length == 0) {
          stampTime = date
        } else {
          stampTime = date + ' 00:00:01'
        }
      }
      if (type == 'end') {
        if (date.length == 0) {
          stampTime = date
        } else {
          stampTime = date + ' 23:59:59'
        }
      }
    } else {
      if (date != '') {
        stampTime = date
      } else {
        return date
      }
    }
    if (stampTime.length > 0) {
      var timeStamp = Date.parse(new Date(stampTime))
      timeStamp = timeStamp / 1000
    }

    return timeStamp
  }

  /*金额千分位*/
  self.formatCurrency = function(num) {
    if (num !== null && num !== undefined && num !== '') {
      num = num.toString().replace(/\$|\,/g, '')
      if (isNaN(num)) num = '0'
      sign = num == (num = Math.abs(num))
      num = Math.floor(num * 100 + 0.50000000001)
      cents = num % 100
      num = Math.floor(num / 100).toString()
      if (cents < 10) cents = '0' + cents
      for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num =
          num.substring(0, num.length - (4 * i + 3)) +
          ',' +
          num.substring(num.length - (4 * i + 3))
      return (sign ? '' : '-') + num + '.' + cents
    } else {
      return '0.00'
    }
  }

  /*
   * 精确运算
   */
  //加法
  self.FloatAdd = function(arg1, arg2) {
    var r1, r2, m
    try {
      r1 = arg1.toString().split('.')[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split('.')[1].length
    } catch (e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
  }
  //减法
  self.FloatSub = function(arg1, arg2) {
    var r1, r2, m, n
    try {
      r1 = arg1.toString().split('.')[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split('.')[1].length
    } catch (e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    //动态控制精度长度
    n = r1 >= r2 ? r1 : r2
    return ((arg1 * m - arg2 * m) / m).toFixed(n)
  }
  //乘法
  self.FloatMul = function(arg1, arg2) {
    var m = 0,
      s1 = arg1.toString(),
      s2 = arg2.toString()
    try {
      m += s1.split('.')[1].length
    } catch (e) {}
    try {
      m += s2.split('.')[1].length
    } catch (e) {}
    return (
      (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
      Math.pow(10, m)
    )
  }
  //除法
  self.FloatDiv = function(arg1, arg2) {
    var t1 = 0,
      t2 = 0,
      r1,
      r2
    try {
      t1 = arg1.toString().split('.')[1].length
    } catch (e) {}
    try {
      t2 = arg2.toString().split('.')[1].length
    } catch (e) {}
    with (Math) {
      r1 = Number(arg1.toString().replace('.', ''))

      r2 = Number(arg2.toString().replace('.', ''))
      return (r1 / r2) * pow(10, t2 - t1)
    }
  }
  //只能输入2位小数
  self.NumLimit = function(obj) {
    obj.value = obj.value.replace(/[^\d.]/g, '') //清除"数字"和"."以外的字符
    obj.value = obj.value.replace(/^\./g, '') //验证第一个字符是数字
    obj.value = obj.value.replace(/\.{2,}/g, '.') //只保留第一个, 清除多余的
    obj.value = obj.value
      .replace('.', '$#$')
      .replace(/\./g, '')
      .replace('$#$', '.')
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3') //只能输入两个小数
  }
  //保存缓存
  self.setCookie = function(c_name, value, expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie =
      c_name +
      '=' +
      escape(value) +
      (expiredays == null ? '' : '; expires=' + exdate.toGMTString())
  }
  //读取缓存
  self.getCookie = function(c_name) {
    if (document.cookie.length > 0) {
      c_start = document.cookie.indexOf(c_name + '=')
      if (c_start != -1) {
        c_start = c_start + c_name.length + 1
        c_end = document.cookie.indexOf(';', c_start)
        if (c_end == -1) c_end = document.cookie.length
        return unescape(document.cookie.substring(c_start, c_end))
      }
    }
    return ''
  }
  //清除所有缓存
  self.clearAllCookie = function() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g)
    if (keys) {
      for (var i = keys.length; i--; )
        document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
  }

  //url返回流
  self.download = function(url, fixedName) {
    var xhh = new XMLHttpRequest()
    var page_url = domain + url
    xhh.open('get', page_url)
    xhh.responseType = 'blob'
    xhh.onreadystatechange = function() {
      if (xhh.readyState === 4 && (xhh.status === 200 || xhh.status === 201)) {
        var disposition = xhh.getResponseHeader('Content-Disposition')
        var fileName = disposition.split(',')[0].split('filename=')[1]
        var blob = new Blob([xhh.response])
        var csvUrl = URL.createObjectURL(blob)
        var link = document.createElement('a')
        link.href = csvUrl
        link.download = fixedName ? fixedName : fileName
        link.click()
      }
    }
    xhh.send()
  }

  //base64转Blob
  self.base64Img2Blob = function(code) {
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
  self.downloadFile = function(fileName, content) {
    var aLink = document.createElement('a')
    var blob = self.base64Img2Blob(content) //new Blob([content]);

    var evt = document.createEvent('MouseEvents')
    evt.initEvent('click', false, false) //initEvent 不加后两个参数在FF下会报错
    aLink.download = fileName
    aLink.href = URL.createObjectURL(blob)

    aLink.dispatchEvent(evt)
  }

  //返回指定字符串在字符串中的所有位置
  self.findStr = function(strs, str) {
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
}()
