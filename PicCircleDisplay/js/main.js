//获取到data.js中的data
var data = data;




// 类似jquery的函数
function $(selector) {
    var method = selector.substr(0, 1) == "." ? 'getElementsByClassName' : 'getElementById';
    return document[method](selector.substr(1));
}





//翻转photo
function turn(elem) {

    var cls = elem.className;
    //获取当前正中海报的次序
    var n = elem.getAttribute('id').split('_')[1];

    if (!/photo_center/.test(cls)) {
        return rsort(n);
    }


    if (/photo_front/.test(cls)) {
        cls = cls.replace(/photo_front/, 'photo_back');
       
    } else {
        cls = cls.replace(/photo_back/, 'photo_front');
        
    }

    elem.className = cls;
}

//输出所有海报
function addPhotos() {
    var template = $('.wrap')[0].innerHTML;

    var html = [];

    for (s in data) {
        var _html = template
            .replace('{{index}}', s)
            .replace('{{img}}', data[s].img)
            .replace('{{caption}}', data[s].caption)
            .replace('{{desc}}', data[s].desc);

        html.push(_html);



    }

    //将数组连接成字符串
    $('.wrap')[0].innerHTML = html.join('');
    rsort(random([0, data.length]));


}
//先添加所有元素
addPhotos();

//随机生成一个值
function random(range) {
    var max = Math.max(range[0], range[1]);
    var min = Math.min(range[0], range[1]);

    var diff = max - min;//差值

    var number = Math.ceil(Math.random() * diff + min);//加上min要不然最小可能为0

    return number;
}


//左右分区的取值范围
function range() {
    var range = {x: [], y: [],deg: []};

    var wrap = {
        w: $('.wrap')[0].clientWidth,
        h: $('.wrap')[0].clientHeight
    }
    var photo = {
        w: $('.photo')[0].clientWidth,
        h: $('.photo')[0].clientHeight
    }

    var picNum = data.length-1;

    var deg = 360 / picNum * (Math.PI*2/360);
    //中心圆的半径
    var circleR = wrap.h / 2;
 
    for(let i=0;i<picNum;i++){
        range.x[i] = wrap.w / 2 + circleR*Math.sin(deg*i) - photo.w / 2;
        range.y[i] = wrap.h / 2 - circleR*Math.cos(deg*i) - photo.h / 2;
        range.deg[i] = i*deg/(Math.PI*2/360);
    }


    return range;
}

//排序海报
function rsort(n) {
    var _photos = $('.photo');//不是标准数组，不支持sort等一系列操作数组的函数
    var photos = [];

    //将以前的样式全部清空
    for (var i = 0; i < _photos.length; i++) {


        _photos[i].className = _photos[i].className.replace(/photo_center/, '');
        _photos[i].className = _photos[i].className.replace(/photo_back/, 'photo_front');

        _photos[i].style.left = "";
        _photos[i].style.top = "";

        _photos[i].style.transform = 'rotate(360deg) scale(1.2)';


        photos.push(_photos[i]);//将他化成标准数组

    }


    var photo_center = $('#photo_' + n);
    photo_center.className += ' photo_center ';

    //将在中间的图片从数组中删除，不参与下面的赋值
    photos.splice(n, 1);



    //获取范围
    var rangeNum = range();

    for(let i=0;i<photos.length;i++){
        photos[i].style.left = rangeNum.x[i] + 'px';
        photos[i].style.top = rangeNum.y[i] + 'px';
        photos[i].style['transform'] = 'rotate('+rangeNum.deg[i]+'deg) scale(.8)';
    }



}











