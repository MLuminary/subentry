var http = require('http');
var express = require('express');
var async = require('async');
var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');

var app = express();

http.createServer(app).listen(8080);

app.get('/', function(req, res) {
  var cnodeUrl = 'https://cnodejs.org/';
  var count = 0;

  //返回其json格式
  var fetchUrl = function(url, callback) {
    count++;
    console.log('当前并发数:', count);
    superagent.get(url).end(function(err, res) {
      if (err) return null;
      var $ = cheerio.load(res.text);
      var item = [];
      item.push({
        title: $('.topic_full_title')
          .text()
          .trim(),
        href: url,
        comment1: $('.reply_content')
          .eq(0)
          .text()
          .trim()
      });
      count--;
      console.log('当前并发数:', count);
      callback(null, JSON.stringify(item));
    });
  };

  //先获取所有的url
  superagent.get(cnodeUrl).end(function(err, resp) {
    var topicUrls = []; //要抓取的所有Url
    var $ = cheerio.load(resp.text);

    $('#topic_list .topic_title').each(function(index, element) {
      var $element = $(element);

      var href = url.resolve(cnodeUrl, $element.attr('href'));
      topicUrls.push(href);
    });

    async.mapLimit(
      topicUrls,
      5,
      function(url, callback) {
        fetchUrl(url, callback);
      },
      //result 为前面函数返回的数据的总和
      function(err, result) {
        console.log('final: ');
        console.log(result);
        //不加会乱码
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf8' });
        res.end(JSON.stringify(result));
      }
    );
  });
});
