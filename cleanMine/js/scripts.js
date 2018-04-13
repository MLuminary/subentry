(function () {

  //去掉默认的contextmenu事件，否则会和默认右键事件同时出现。
  document.oncontextmenu = function (e) {
    e.preventDefault();
  };

  //包裹层
  var container = $('.container'),
    containerWidth = 0,
    containerHeight = 0,
    containerMargin = 2;


  //方格宽高
  var boxWidth = 20,
    boxHeight = 20;

  //方格个数和雷的个数
  var row = 0,
    col = 0,
    mine = 0;

  //代表盒子身份的数组
  var boxArr = [];
  //用于存储周围八个格子中雷的个数
  var MineArr = [];

  $('.type').on('click', function () {
    var btn = $(this);
    row = btn.data('height'),
      col = btn.data('width'),
      mine = btn.data('mine');

    init(mine);
  })
  /**
   * 
   * @param {*雷的个数} mine 
   */
  function init(mine) {
    //创建方格
    createBox();
    //生成炸弹
    createMine(mine);
    //给方格添加点击事件
    createBoxClick();
    //算出每个格子周围九宫格的雷的个数并存入数组
    aroundMine();
  }


  function createBox() {
    container.empty();
    //设置包裹层宽高
    container.css({
      'width': (boxWidth + containerMargin * 2) * col + 'px',
      'height': (boxHeight + containerMargin) * row + 'px'
    })

    var boxs = "";

    for (var i = 0; i < row; i++) {
      for (var j = 0; j < col; j++) {
        boxs += "<div class='box' id=" + i + '_' + j + "></div>"
      }
    }
    container.append(boxs);
  }
  /**
   * 
   * @param {*炸弹个数}  mine
   */
  function createMine(mine) {
    //显示雷数
    $('.mine').text(mine);
    //将数组变为二维数组
    for (var i = 0; i < row; i++) {
      boxArr[i] = [];
      MineArr[i] = [];
    }
    //初始化数组
    for (var i = 0; i < row; i++) {
      for (var j = 0; j < col; j++) {
        boxArr[i][j] == 0;
        MineArr[i][j] == 0;
      }
    }
    //随机添加炸弹
    while (mine-- != 0) {
      var Mrow = Math.floor(Math.random() * row),
        Mcol = Math.floor(Math.random() * col);

      //预防生成的行列相同
      if (boxArr[Mrow][Mcol] == 1) {
        mine++;
        continue;
      }

      //数字1代表有炸弹
      boxArr[Mrow][Mcol] = 1;
    }

  }

  function createBoxClick() {

    //先将container先前的事件清空
    container.off();

    //记录未点击而且未标记为雷的方格
    var sumNormalBox;

    //鼠标按下
    container.on('mousedown', '.box', function (e) {

      sumNormalBox = 0;

      

      var coord = $(e.target).attr('id');
      var x = parseInt(coord.split("_")[0]),
        y = parseInt(coord.split("_")[1]);
      if (e.which == 1) {
        judgeStatus(x, y);
      } else if (e.which == 3) {
        if (!$(e.target).hasClass("isClicked")) {
          $(e.target).toggleClass("isMine");
          //显示雷的数量
          var mineNum = mine - $('.isMine').size() >= 0 ? mine - $('.isMine').size() : 0;
          $('.mine').text(mineNum);
        } else {
          //高亮九宫格处方块
          var around = aroundBox(x, y);

          var sx = around.sx,
            sy = around.sy,
            ex = around.ex,
            ey = around.ey;

          for (var i = sx; i <= ex; i++) {
            for (var j = sy; j <= ey; j++) {
              var id = "#" + i + "_" + j;
              if (!$(id).hasClass("isClicked") && !$(id).hasClass("isMine")) {
                $(id).addClass("mousedown");
              } else if ($(id).hasClass("isMine")) {
                sumNormalBox++;
              }
            }
          }
        }
      }
    })
    //鼠标抬起
    container.on('mouseup', '.box', function (e) {

      
      //获取右键抬起的目标方格的数字
      var num = parseInt($(e.target).text())
      //快捷按键判断是否按中雷
      var MineOpen = false;

      if (e.which == 3) {

        if (num == sumNormalBox) {
          //each不能使用break方法
          $('.mousedown').each(function (i, value) {
            var coord = $(value).attr('id');
            var x = parseInt(coord.split("_")[0]),
              y = parseInt(coord.split("_")[1]);

            if (boxArr[x][y] == 1) {
              MineOpen = true;
              return false;
            } else {
              showNum(x, y);
            }
          })
          if (MineOpen) {
            showMine();
            alert("游戏失败");
          }

        }
        $('.mousedown').removeClass("mousedown");
      }
      gameSuccess();
    })
  }

  //算出每个格子周围九宫格的雷的个数并存入数组
  function aroundMine() {

    for (var x = 0; x < row; x++) {
      for (var y = 0; y < col; y++) {
        var around = aroundBox(x, y);

        var sx = around.sx,
          sy = around.sy,
          ex = around.ex,
          ey = around.ey;

        var countMine = 0; //九宫格雷的数量

        for (var i = sx; i <= ex; i++) {
          for (var j = sy; j <= ey; j++) {
            if (boxArr[i][j] == 1) {
              countMine++;
            }
          }
        }
        MineArr[x][y] = countMine;
      }
    }
  }

  function showMine() {

    for (var i = 0; i < row; i++) {
      for (var j = 0; j < col; j++) {
        if (boxArr[i][j] == 1) {
          var id = "#" + i + "_" + j;
          $(id).css('background-color', '#f00');
        }
      }
    }
  }

  function judgeStatus(x, y) {
    if (boxArr[x][y] == 1) {
      showMine();
      alert("游戏结束!");
    } else {
      showNum(x, y);
    }

  }

  function showNum(x, y) {
    var num = MineArr[x][y];
    var id = "#" + x + "_" + y;
    $(id).css("background-color", "#BFCAE0");
    $(id).addClass("isClicked");
    if (num == 0) {

      var around = aroundBox(x, y);

      var sx = around.sx,
        sy = around.sy,
        ex = around.ex,
        ey = around.ey;

      for (var i = sx; i <= ex; i++) {
        for (var j = sy; j <= ey; j++) {
          var ids = "#" + i + "_" + j;
          if ($(ids).hasClass("isClicked")) {
            continue;
          } else {
            showNum(i, j);
          }
        }
      }
    } else {
      $(id).html(num);
    }
  }

  //返回每个方格周围九宫格的范围
  function aroundBox(x, y) {
    var around = {
      sx: 0,
      sy: 0,
      ex: 0,
      ey: 0
    }
    if (x - 1 < 0) {
      around.sx = 0;
      around.ex = 1;
    } else if (x + 1 >= row) {
      around.sx = row - 2;
      around.ex = row - 1;
    } else {
      around.sx = x - 1;
      around.ex = x + 1;
    }
    if (y - 1 < 0) {
      around.sy = 0;
      around.ey = 1;
    } else if (y + 1 >= col) {
      around.sy = row - 2;
      around.ey = row - 1;
    } else {
      around.sy = y - 1;
      around.ey = y + 1;
    }
    return around;
  }
  //游戏成功
  function gameSuccess() {
    //如果将雷全部扫出,也就是isMine的box数量等于了雷的数量
    if (($('.isClicked').size()) == ((row * col) - mine)) {
      alert("扫雷成功!");
      init(mine);
    }
  }

})()