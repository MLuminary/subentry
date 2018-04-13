function checkType(value){
  var s = Object.prototype.toString.call(value);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
}