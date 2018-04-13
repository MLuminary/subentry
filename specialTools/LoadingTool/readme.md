# loadingTool

现在的大部分网页中加载页的存在是必须的，所以加载页也越来越被人们需要.

## 使用

本插件还是需要jquery的支持

加载页大部分就是用来填补加载大量图片的那段空白时间，增加用户体验。

本插件主要是实现加载的两个效果，一个是数字加载，就是从0%-100%，还有一个是进度条加载。

``$(element).loadingTool(loadComplete,ImgList,type)``

获取的jquery的元素调用``loadingTool``这个方法

``loadComplete`` 是一个函数，就是当在加载完毕的时候你想要执行某些操作。

``ImgList`` 你需要预加载的图片的地址的字符串数组

``type`` 不添加参数默认是数字加载，输入``progressbar``可以变成进度条加载。

## 注意

进度条加载需要自己添加的样式较多，为了增加适应性和自定义性，我还是绝定不在插件中添加css了。css也比较简单。在demo.html也有例子

## 效果

![gif2](images/gif2.gif)

![gif1](images/gif1.gif)

示例图片乃我may j lee和三翼校园中的一些图片。


