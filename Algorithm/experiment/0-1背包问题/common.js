var dpnDom = document.getElementById('dp-n')
  var dpwDom = document.getElementById('dp-w')
  var dpmDom = document.getElementById('dp-m')
  var dpvDom = document.getElementById('dp-v')

var txnDom = document.getElementById('tx-n')
  var txwDom = document.getElementById('tx-w')
  var txmDom = document.getElementById('tx-m')
  var txvDom = document.getElementById('tx-v')


document.getElementById('random').onclick = function() {
  let n = parseInt(txnDom.value)
  let w = random(100, 200)
  let m = []
  let v = []
  for (let i = 0; i < n; i++) {
    m[i] = random(20, 60)
    v[i] = random(60, 100)
  }
  dpwDom.value = w
  dpmDom.value = m
  dpvDom.value = v

  dpnDom.value = n;
  txwDom.value = w
  txmDom.value = m
  txvDom.value = v
}

function random(start, end) {
  return Math.floor(Math.random() * end + start)
}