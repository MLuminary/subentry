var http = require('http');
var express = require('express');
var superagent = require('superagent');
var url = require('url');
var cheerio = require('cheerio');
var async = require('async');

var app = express();

http.createServer(app).listen(8080);

app.get('/', function(req, res) {
  //抓取五页
  var pages = [1,2,3,4,5,6,7,8]
  var baseUrl = 'https://www.imooc.com/course/list';
  var homeUrl = 'https://www.imooc.com/'
  var topicUrls = [];
  var count = 0;

  var fetchUrl = function(page, callback) {
    count++
    console.log("当前并发数", count);

    var params = {
      c: 'fe',
      page: page
    };

    superagent.get(baseUrl).query({ params: JSON.stringify(params) }).end(function(err, content){

      var $ = cheerio.load(content.text);
      var courseCard = $('.course-card-container');
      courseCard.each(function(index, element){
        var $element = $(element);
        var title = $element.find('.course-card-name').text();
        var href = url.resolve(homeUrl, $element.find('.course-card').attr('href')) 

        topicUrls.push({
          title: title,
          href: href
        })
      })
      callback(err, topicUrls)
      // callback(err,topicUrls);
    })
  };

  async.mapLimit(pages, 5, function(page, callback){
    fetchUrl(page, callback);
  },function(err, result){ 
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf8' });
    res.end(JSON.stringify(result))

    // console.log(result);
  })

});
