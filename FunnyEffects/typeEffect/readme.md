# TypeEffect

实现的大约就是这种效果

![gif1](images/gif1.gif)


```html
<h1>我真的很缺钱，我真的很缺钱，I really need money</h1>
<p>我真的很缺钱，我真的很缺钱，I really need money</p>
```

```js
$('h1').typeEffect(200);
$('p').typeEffect();
```

此小插件需要引用jq,不需要自己设置任何css.直接按下面方法调用。

获取元素后调用``typeEffect``方法就可以了，里面需要传入一个参数，就是每个字出现的时间间隔，也就是字出现的速度。不传入参数的话会默认设置为200ms
