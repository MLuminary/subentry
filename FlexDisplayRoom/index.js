(function() {
  //选项卡功能的实现
  const nav = $('.nav');
  const boxes = $('.box');//选项卡内容

  nav.on('click', '.item', function(e) {
    let event = e || window.event;
    let target = event.target || event.srcElement;

    if(!$(target).hasClass('isClicked')){
      $(target).addClass('isClicked').siblings().removeClass('isClicked');
    }

    boxes.eq($(target).index()).addClass('show').siblings().removeClass('show');
    
  });
})();
