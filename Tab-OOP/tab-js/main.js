(function() {
  var Tab = function(tab, config) {
    let __this = this;

    this.tab = tab;

    this.tabUl = tab.getElementsByTagName('ul')[0];
    this.tabItems = tab.getElementsByTagName('li');
    this.tabIts = tab.getElementsByTagName('a');
    this.conntentItems = this.getClassName('content-item');

    //默认配置参数
    this.config = {
      triggerType: 'mouseover', //用来定义鼠标的触发类型
      effect: 'default', //用来定义内容的切换效果
      invoke: 1, //默认展示第几个tab
      auto: false //用来定义tab是否自动切换，指定的时间为切换时间
    };

    //用户配置
    if (config && config != ' ') {
      this.lowCopy(this.config, config);
    }

    //点击或触摸
    this.addEvent(
      this.config.triggerType === 'click' ? 'click' : 'mouseover',
      this.tabUl,
      function(e) {
        let event = e || window.event;
        let target = event.target || event.srcElement;
        if (target.dataset.index) {
          __this.invoke(target.dataset.index);
        }
      }
    );

    //如果切换效果是 effect 需要添加 transition 属性
    if (this.config.effect === 'fade') {
      for (var item of this.conntentItems) {
        item.style.transition = '.3s';
        item.style.opacity = '0';
      }
    }

    //自动播放
    if (this.config.auto) {
      //定义全局定时器
      this.timer = null;

      this.loop = 0;
      this.autoPlay();

      this.tab.onmouseover = function() {
        window.clearInterval(__this.timer);
      };
      this.tab.onmouseleave = function() {
        __this.autoPlay();
      };
    }

    if (this.config.invoke) {
      //默认显示第几页
      this.invoke(this.config.invoke - 1);
    }
  };

  Tab.prototype = {
    //根据 class 获取 dom 元素
    getClassName(className) {
      let elem = [];
      if (!document.getElementsByClassName) {
        let dom = this.tab.getElementsByTagName('*');
        for (let i = 0, l = dom.length; i < l; i++) {
          if (dom[i].className.indexOf(className) >= 0) {
            elem.push(dom[i]);
          }
        }
      } else {
        elem = this.tab.getElementsByClassName(className);
      }
      return elem;
    },
    //因为没有数组和对象，只写浅拷贝就可以
    lowCopy(target, obj1) {
      for (var name in obj1) {
        target[name] = obj1[name];
      }
    },
    //事件委托
    addEvent(eType, element, callback) {
      if (element.addEventListener) {
        element.addEventListener(eType, callback);
      } else if (element.attachEvent) {
        element.attachEvent('on' + eType, callback);
      } else {
        element['on' + eType] = callback;
      }
    },
    //时间驱动
    invoke(currentIndex) {
      let __this = this;

      //切换标签
      for (let i = 0, l = this.tabItems.length; i < l; i++) {
        this.tabItems[i].className = '';
      }
      this.tabItems[currentIndex].className = 'actived';

      let effect = this.config.effect;
      let conItems = this.conntentItems;

      //切换效果
      if (effect === 'fade') {
        for (let i = 0, l = __this.conntentItems.length; i < l; i++) {
          i != currentIndex
            ? __this.fadeOut(__this.conntentItems[i])
            : __this.fadeIn(__this.conntentItems[i]);
        }
      } else {
        for (let i = 0, l = __this.conntentItems.length; i < l; i++) {
          i != currentIndex
            ? (__this.conntentItems[i].className = 'content-item')
            : (__this.conntentItems[i].className = 'content-item current');
        }
      }

      if (this.config.auto) {
        this.loop = currentIndex;
      }
    },
    //出现
    fadeIn(element) {
      clearTimeout(timer);
      element.style.display = 'block';
      var timer = setTimeout(function() {
        element.style.opacity = '1';
      });
    },
    //隐藏
    fadeOut(element) {
      clearTimeout(timer);
      element.style.opacity = '0';
      var timer = setTimeout(function() {
        element.style.display = 'none';
      }, 300);
    },
    autoPlay() {
      let __this = this;
      let tabLength = this.tabItems.length;
      //全局定时器
      this.timer = window.setInterval(function() {
        __this.loop >= tabLength - 1 ? (__this.loop = 0) : __this.loop++;
        __this.invoke(__this.tabIts[__this.loop].dataset.index);
      }, this.config.auto);
    }
  };

  window.Tab = Tab;
})();
