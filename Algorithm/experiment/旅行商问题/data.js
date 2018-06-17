var arr = []

var hs_random_btn = document.getElementById('hs-random')

hs_random_btn.onclick = function() {
  var n = parseInt(document.getElementById('cityNum').value)
  console.log(n)
  for (var i = 0; i < n; i++) {
    arr[i] = []
    for (var j = i; j < n; j++) {
      arr[i][j] = Math.ceil(Math.random() * 20 + 1)
      if (j === i) arr[i][j] = 0
    }
  }

  for (var j = 0; j < n; j++) {
    for (var i = j + 1; i < n; i++) {
      arr[i][j] = arr[j][i]
    }
  }

  var html = ''
  for(var i=0;i<n;i++) {
    html+='<tr>'
    for(var j=0;j<n;j++) {
      html+=`<td>${arr[i][j]}</td>`
    }
    html+='</td>'
  }

  document.getElementById('hs-random-num').innerHTML = html
}
