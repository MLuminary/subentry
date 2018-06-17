function rnd(seed) {
  seed = (seed * 9301 + 49297) % 233280 //为何使用这三个数?
  return seed / 233280.0
}

function rand(number) {
  today = new Date()
  seed = today.getTime()
  return Math.ceil(rnd(seed) * number)
}

var calc = document.getElementById('calc')
var value = document.getElementById('value')

calc.onclick = function() {
  var numTop = parseInt(document.getElementById('numTop').value)
  var numBottom = parseInt(document.getElementById('numBottom').value)
  
  var numMid = numTop - numBottom // 间隔的数值
  var num = rand(numMid) + numBottom

  value.innerText = num
}
