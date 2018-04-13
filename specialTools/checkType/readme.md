# checkType

利用`Object.prototype.toString.call(value)`来检查`value`的类型，比`typeof`要严谨很多，可以准确的判断出`value`的类型

## Object.prototype.toString返回类型

数值：返回`[object Number]`。

字符串：返回`[object String]`。

布尔值：返回`[object Boolean]`。

undefined：返回`[object Undefined]`。

null：返回`[object Null]`。

数组：返回`[object Array]`。

arguments 对象：返回`[object Arguments]`。

函数：返回`[object Function]`。

Error 对象：返回`[object Error]`。

Date 对象：返回`[object Date]`。

RegExp 对象：返回`[object RegExp]`。

其他对象：返回`[object Object]`。


## match

JavaScript中`match`函数方法返回的数组有三个属性：`input`、`index`和`lastIndex`。`Input` 属性包含整个的被查找字符串。`Index` 属性包含了在整个被查找字符串中匹配的子字符串的位置。`LastIndex` 属性包含了最后一次匹配中最后一个字符的下一个位置。如果没有设置全局标志 `g`，数组的0元素包含整个匹配，而第 1 到 n 元素包含了匹配中曾出现过的任一个**子匹配(在其中用过圆括号)**。这相当于没有设置全局标志的 `exec` 方法。如果设置了全局标志，元素0到n中包含所有匹配

因此返回一个数组，数组下标1为括号中的内容，也就是我们需要的，然后统一进行一次小写转换，利于我们的判断

## 使用

```js
checkType([])//'array'
...
```