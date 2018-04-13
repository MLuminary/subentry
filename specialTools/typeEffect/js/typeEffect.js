; (function () {
  if (typeof jQuery !== 'function') {
    throw new Error("typeEffect.js needs jQuery");
  }

  /**
   * speed : You want the speed of your text 
   */
  jQuery.fn.typeEffect = function (speed) {
    var element = this;
    var speed = speed || 200;
    var $txt = element.text();
    //Empty element content
    element.html("");
    var span = "<span>|</span>";
    element.append(span);

    var lastSpan = $(element.children("span")[element.children("span").length - 1]);

    var isHide = false;
    setInterval(() => {
      isHide ? lastSpan.show() : lastSpan.hide();
      isHide = !isHide;
    }, 500)
    var i = 0;
    var timer = setInterval(() => {
      if (i < $txt.length) {
        lastSpan.before($txt.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
  }

})()
