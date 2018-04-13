# CookieVal

Cookie的使用有时候是必不可少的，在此把cookie的简单的存取封装一下

## 使用

同时引入getCookieVal.js和setCookies.js,然后在项目中调用``setCookie({})``,参数是一个对象，可以在其中编写要设置的cookie的属性名和值。
然后在需要cookie值的时候调用``getCookieVal(key)``,key就是你想要的值的属性名。

## 注意

协议不要是file