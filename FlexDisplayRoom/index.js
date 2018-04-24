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

  //项目
  let items = $('.itembox .item');

  //项目的宽度和数量
  let itemNum = parseInt(itemNumBox.text()),
    itemWidth = parseInt(itemWidthNumBox.val());

  //项目增加
  up.click(function() {
    if (itemNum >= 5) {
      dialogShow('不能再加了呦~');
    } else {
      itemNumBox.text(++itemNum);
      let child = `<div class="item">
                    <h3 class="number">${itemNum}</h3>
                    <input type="text" placeholder="order">
                    <input type="text" placeholder="flex-grow">
                    <input type="text" placeholder="flex-shrink">
                    <input type="text" placeholder="flex-basis">
                    <select name="align-self">
                      <option value="flex-start">flex-start</option>
                      <option value="flex-end">flex-end</option>
                      <option value="center">center</option>
                      <option value="space-between">space-around</option>
                      <option value="stretch">stretch</option>
                      <option selected="selected" value="auto">auto</option>
                    </select>
                  </div>`;
      $('.itembox').append(child);
    }
  });
  //项目减少
  down.click(function() {
    if (itemNum <= 1) {
      dialogShow('不能再减了呦~');
    } else {
      itemNumBox.text(--itemNum);
      $('.itembox .item')
        .eq(-1)
        .remove();
    }
  });

  //调节项目宽度
  itemWidthBox.change(function() {
    itemWidthNumBox.text($(this).val());
    itemWidth = $(this).val();
    items.css('width', itemWidth);
  });

  //控制提示框
  function dialogShow(txt) {
    $('.dialog').text(txt);
    $('.dialog').addClass('show');
    setTimeout(function() {
      $('.dialog').removeClass('show');
    }, 2000);
  }

  //控制项目布局
  $('.atrbox').on('click', 'label', function(e) {
    let event = e || window.event;
    let target = event.target || event.srcElement;

    $('.itembox').css($('.item.isClicked').text(), $(target).text());
  });

  //控制项目自身的属性
  $('.itembox').on('input', function(e) {
    let event = e || window.event;
    let target = event.target || event.srcElement;

    if ($(target).is('input') || $(target).is('select')) {
      $(target)
        .parent()
        .css($(target).attr('placeholder') || $(target).attr('name'),$(target).val());
    }
  });
})();
