var http = require('http');
var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');

var app = express();

http.createServer(app).listen(8080);

app.get('/', function(req, res, next) {
  //用superagent去抓取
  superagent.get('https://cnodejs.org/')
    .end(function(err,sres){
      //错误处理
      if(err) {
        return next(err);
      }else{
        //sres.text 里面存着网页的 html 内容
        var $ = cheerio.load(sres.text);
        var items = [];

        $('#topic_list .topic_title').each(function(index,element){
          var $element = $(element);
          items.push({
            title: $element.attr('title'),
            href: $element.attr('href'),
            author: ''
          })
        })

        $('#topic_list .user_avatar img').each(function(index,element){
          var $element = $(element);
          items[index].author = $element.attr('title');
        })

        res.send(items);
      }
    })
});
