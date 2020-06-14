/**
 * 将正常dom节点转为Fragment
 * @param {正常dom节点} node
 */
function nodeToFragment(node, vm) {
  var flag = document.createDocumentFragment()
  var child
  //child先赋值为node的第一个子节点，然后判断其是否存在
  while ((child = node.firstChild)) {
    compile(child, vm) //先进行模板编译
    flag.appendChild(child)
  }
  return flag
}

/**
 * 数据初始化绑定
 * @param {*dom节点} node
 * @param {*vue实例} v
 */
function compile(node, vm) {
  //如果节点类型为元素
  if (node.nodeType === 1) {
    var attr = node.attributes
    //解析属性
    for (var i = 0, l = attr.length; i < l; i++) {
      if (attr[i].nodeName == 'v-model') {
        var name = attr[i].nodeValue //获取到其绑定的属性名
        //监听其 input
        node.addEventListener('input', function (e) {
          //动态改变实例中data属性的值
          vm[name] = e.target.value //通过访问器属性
        })
        node.value = vm[name] //通过访问器属性
        node.removeAttribute('v-model')
      }
    }
  }
  //如果节点为文本
  var reg = /\{\{(.*)\}\}/
  if (node.nodeType === 3) {
    if (reg.test(node.nodeValue)) {
      var name = RegExp.$1 //获取正则匹配的第一个字符串
      name = name.trim() //清除空格
      node.nodeValue = vm[name]
    }
  }
  //为每一个与实例 data 相关联的属性添加 Watcher
  new Watcher(vm, node, name)
}

/**
 *
 * @param {*实例对象} vm
 * @param {*dom} node
 * @param {*要监听的属性名称} name
 */
function Watcher(vm, node, name) {
  //将 Watcher 添加到了 Dep 中
  Dep.target = this
  this.name = name
  this.node = node
  this.vm = vm
  this.update()
  //保证 Dep 只有一个值
  Dep.target = null
}

Watcher.prototype = {
  //更新
  update: function () {
    this.get()
    this.node.nodeValue = this.value //将视图更新
  },
  //获取data中的属性值
  get: function () {
    this.value = this.vm[this.name] //触发访问器属性
  },
}

/**
 *
 * @param {*要操作的对象} obj
 * @param {*要操作的属性} key
 * @param {*属性值} val
 */
function defineReactive(obj, key, val) {
  var dep = new Dep()
  //将对象属性劫持，添加访问器属性
  Object.defineProperty(obj, key, {
    get: function () {
      //添加订阅者
      if (Dep.target) dep.addSub(Dep.target)
      return val
    },
    set: function (newVal) {
      if (newVal === val) return
      val = newVal
      //作为发布者发出通知
      dep.notify()
    },
  })
}

/**
 * 保存订阅者的全局对象
 */
function Dep() {
  this.subs = []
}

Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub)
  },
  notify: function () {
    this.subs.forEach(function (sub) {
      sub.update()
    })
  },
}

/**
 *
 * @param {*操作对象} obj
 * @param {*vue实例} vm
 */
function observe(obj, vm) {
  //对obj的属性进行遍历
  Object.keys(obj).forEach(function (key) {
    defineReactive(vm, key, obj[key])
  })
}

/**
 *
 * @param {*属性对象} options
 */
function Vue(options) {
  this.data = options.data
  var data = this.data
  //对Data中属性添加访问器属性
  observe(data, this)

  var id = options.el
  var dom = nodeToFragment(document.getElementById(id), this)
  //编译完成后，将dom返回
  document.getElementById(id).appendChild(dom)
}
