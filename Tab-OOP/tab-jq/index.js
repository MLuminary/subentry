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
      auto: false //用来定义tab是否自动切换，指定的时间为切换时间
    };

    //最终配置
    if(config && config != " "){
      $.extend(this.config,config);
    }

    //点击或触摸
    this.tabItems.on(this.config.triggerType === 'click'?'click':'mouseover',function(){
      __this.invoke($(this));
    })

    //自动播放
    if(this.config.auto){
      //定义全局定时器
      this.timer = null;

      //计数器
      this.loop = 0;
      this.autopaly();

      this.tab.hover(()=>{
        window.clearInterval(this.timer)
      },()=>{
        this.autopaly();
      })
    }

    //设置默认显示第几个
    if(this.config.invoke > 1){
      this.invoke(this.tabItems.eq(this.config.invoke - 1));
    }


  };




  Tab.prototype = {

    //事件驱动
    invoke(currentTab){
      let __this = this;
      //索引
      let index = currentTab.index();
      currentTab.addClass("actived").siblings().removeClass("actived");

      let effect = this.config.effect;
      let conItems = this.contentItems;

      //切换效果
      if(effect === "fade"){
        conItems.eq(index).stop(true).fadeIn().addClass("current").siblings().fadeOut().removeClass("current");//取消列队动画，当前动画立即完成
      }else{
        conItems.eq(index).addClass("current").siblings().removeClass("current");
      }

      //如果加入自动播放
      if(this.config.auto){
         this.loop = index;
      }
      
    },
    autopaly(){

      let __this = this;
      let tabLength = this.tabItems.length;
      //全局定时器
      this.timer = window.setInterval(function(){

        __this.loop >= tabLength - 1 ? __this.loop = 0 : __this.loop++;
        
        __this.invoke(__this.tabItems.eq(__this.loop));
        
      },this.config.auto)

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
