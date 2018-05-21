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
        node.value = vm.data[name];
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
      node.nodeValue = vm.data[name];
    }
  }
}

/**
 *
 * @param {属性} options
 */
function Vue(options) {
  this.data = options.data;
  var id = options.el;
  var dom = nodeToFragment(document.getElementById(id), this);
  //编译完成后，将dom返回
  document.getElementById(id).appendChild(dom);
}
