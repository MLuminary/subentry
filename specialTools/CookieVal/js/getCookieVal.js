
  if(typeof jQuery !== 'function'){
    throw new Error("getCookieVal.js needs jQuery");
  }
  /**
   * 传入要获得的cookie的属性名
   */
  var getCookieVal = function(key){

    var line = document.cookie;
    
    if(line.indexOf(';')>0){
      var Oarr = line.split(';');
      for(var i=0;i<Oarr.length;i++){
        var obj = Oarr[i].split('=');
        var attr = obj[0].trim(),
            val = obj[1];
        if(attr == key){
          return val;
        }
      }
      return null;
    }else{
      var attr = line.split("=")[0].trim();
      var key = line.split("=")[1];
      if(attr == key){
        return val;
      }
    }
  }
