(function() {
  //选项卡功能的实现
  const nav = $('.nav');
  const boxes = $('.box'); //选项卡内容

  nav.on('click', '.item', function(e) {
    let event = e || window.event;
    let target = event.target || event.srcElement;

    if (!$(target).hasClass('isClicked')) {
      $(target)
        .addClass('isClicked')
        .siblings()
        .removeClass('isClicked');
    }

    boxes
      .eq($(target).index())
      .addClass('show')
      .siblings()
      .removeClass('show');
  });

  //控制按钮信息的传递
  let up = $('.item-up'),
    down = $('.item-down');
  (itemNumBox = $('.item-num')),
    (itemWidthNumBox = $('.item-width-num')),
    (itemWidthBox = $('.item-width'));

  //项目的宽度和数量
  let itemNum = parseInt(itemNumBox.text()),
    itemWidth = parseInt(itemWidthNumBox.val());

    
  //项目增加
  up.click(function() {
    if (itemNum >= 5) {
      dialogShow("不能再加了呦~");
    }else{
      itemNumBox.text(++itemNum);
    }
  });
  //项目减少
  down.click(function() {
    if(itemNum <= 1) {
      dialogShow("不能再减了呦~");
    }else{
      itemNumBox.text(--itemNum);
    }
  })

  //调节项目宽度
  itemWidthBox.change(function(){
    itemWidthNumBox.text($(this).val());
    itemWidth = $(this).val();
  })
  //控制提示框
  function dialogShow(txt) {
    $('.dialog').text(txt);
    $('.dialog').addClass('show');
    setTimeout(function(){
      $('.dialog').removeClass('show')
    },2000);
  }
})();
