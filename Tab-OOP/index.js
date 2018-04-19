(function($) {
  var Tab = function(tab,config) {

    let __this = this;
    this.tab = tab;

    this.tabItems = this.tab.find('ul.tab-nav li');
    this.contentItems = this.tab.find('div.content-wrap div.content-item');

    //默认配置参数
    this.config = {
      triggerType: 'mouseover',//用来定义鼠标的触发类型
      effect: 'default',//用来定义内容的切换效果
      invoke: 1,//默认展示第几个tab
      auto: 5000 //用来定义tab是否自动切换，指定的时间为切换时间
    };

    //最终配置
    if(config && config != " "){
      $.extend(this.config,config);
    }

    this.tabItems.on(this.config.triggerType === 'click'?'click':'mouseover',function(){
      __this.invoke($(this));
    })


  };




  Tab.prototype = {
    invoke(currentTab){
      let __this = this;
      //索引
      let index = currentTab.index();
      currentTab.addClass("actived").siblings().removeClass("actived");

      let effect = this.config.effect;
      let conItems = this.contentItems;

      if(effect === "fade"){
        conItems.eq(index).stop(true).fadeIn().addClass("current").siblings().fadeOut().removeClass("current");//取消列队动画，当前动画立即完成
      }else{
        conItems.eq(index).addClass("current").siblings().removeClass("current");
      }
      
    }
  };

  //注册 jQuery

  $.fn.extend({
    
    tab(config){

      new Tab(this,config);
    }

  })

  window.Tab = Tab;
})(jQuery);
