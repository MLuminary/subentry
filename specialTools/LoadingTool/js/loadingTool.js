; (function () {
  if (typeof jQuery !== 'function') {
    throw new Error("typeEffect.js needs jQuery");
  }
  /**
   *  loadingComplete 加载完毕要执行的函数
   *  imgList 需要加载的图片库
   */
  jQuery.fn.loadingTool = function (loadComplete, imgList, type) {
    //获取元素
    var element = this;
    var picNum = 0;
   

    function loadNum(picNum) {
      var Img = new Image();
      Img.src = imgList[picNum];
      Img.onload = function () {
        picNum++;
        var progressNum = Math.floor(picNum / imgList.length * 100);
        //如果没有输入progressbar默认为文字样式
        type != 'progressbar' ? element.text(progressNum+"%") : element.css('width', progressNum + '%');

        if(picNum >= imgList.length) {
          //加载完毕
          loadComplete();
        }else {
          loadNum(picNum);
        }
      }
    }

    loadNum(0);
  }
})()

