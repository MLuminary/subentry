
  if(typeof jQuery !== 'function'){
    throw new Error("setCookies.js needs jQuery");
  }
  /**
   * 传入要设置的cookie属性名和值
   */
  var setCookies = function(obj){
    $.each(obj,function(key,val){
      document.cookie = key + "=" + val;
    })
  }
