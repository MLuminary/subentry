/**
 * 将正常dom节点转为Fragment
 * @param {正常dom节点} node
 */
function nodeToFragment(node, vm) {
  var flag = document.createDocumentFragment();
  var child;
  //child先赋值为node的第一个子节点，然后判断其是否存在
  while ((child = node.firstChild)) {
    compile(child, vm); //先进行模板编译
    flag.appendChild(child);
  }
  return flag;
}

/**
 * 数据初始化绑定
 * @param {*dom节点} node
 * @param {*vue实例} v
 */
function compile(node, vm) {
  //如果节点类型为元素
  if (node.nodeType === 1) {
    var attr = node.attributes;
    //解析属性
    for (var i = 0, l = attr.length; i < l; i++) {
      if (attr[i].nodeName == 'v-model') {
        var name = attr[i].nodeValue; //获取到其绑定的属性名
        //监听其 input 
        node.addEventListener('input', function(e){
          //动态改变实例中data属性的值
          vm[name] = e.target.value; //通过访问器属性
        })
        node.value = vm[name]; //通过访问器属性
        node.removeAttribute('v-model');
      }
    }
  }
  //如果节点为文本
  var reg = /\{\{(.*)\}\}/;
  if (node.nodeType === 3) {
    if (reg.test(node.nodeValue)) {
      var name = RegExp.$1; //获取正则匹配的第一个字符串
      name = name.trim(); //清除空格
      node.nodeValue = vm[name];
    }
  }
}

/**
 * 
 * @param {*要操作的对象} obj 
 * @param {*要操作的属性} key 
 * @param {*属性值} val 
 */
function defineReactive(obj, key, val) {
  //将对象属性劫持，添加访问器属性
  Object.defineProperty(obj, key, {
    get: function(){
      return val;
    },
    set: function(newVal) {
      if(newVal === val) return;
      val = newVal;
      console.log(val);
    }
  })
}

/**
 * 
 * @param {*操作对象} obj 
 * @param {*vue实例} vm 
 */
function observe(obj,vm){
  //对obj的属性进行遍历
  Object.keys(obj).forEach(function(key){
    defineReactive(vm, key, obj[key]);
  })
}


/**
 *
 * @param {*属性对象} options
 */
function Vue(options) {
  this.data = options.data;
  var data = this.data;
  //对Data中属性添加访问器属性
  observe(data, this);

  var id = options.el;
  var dom = nodeToFragment(document.getElementById(id), this);
  //编译完成后，将dom返回
  document.getElementById(id).appendChild(dom);
}
