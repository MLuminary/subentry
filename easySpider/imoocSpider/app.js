var http = require('http');
var express = require('express');
var superagent = require('superagent');
var url = require('url');
var cheerio = require('cheerio');
var async = require('async');

var app = express();

http.createServer(app).listen(8080);

app.get('/', function(req, res) {
  //抓取八页
  var pages = [1, 2, 3, 4, 5, 6, 7, 8];
  var baseUrl = 'https://www.imooc.com/course/list/';
  var homeUrl = 'https://www.imooc.com/';
  var count = 0;

  var fetchUrl = function(page, callback) {
    count++;
    console.log('当前并发数', count);

    var params = {
      c: 'fe',
      page: page
    };

    superagent
      .get(baseUrl)
      .query(params)
      .end(function(err, content) {
        var topicUrls = [];
        var $ = cheerio.load(content.text);
        var courseCard = $('.course-card-container');
        courseCard.each(function(index, element) {
          var $element = $(element);
          var href = url.resolve(
            homeUrl,
            $element.find('.course-card').attr('href')
          );

          topicUrls.push(href);
        });
        callback(err, topicUrls);

        count--;
        console.log('释放并发数后当前并发数', count);
        // callback(err,topicUrls);
      });
  };

  var fetchMsg = function(topicUrl, callback) {
    console.log('开启新一轮抓取')
    superagent
      .get(topicUrl)
      .end(function(err, content){
        var Item = [];
        var $ = cheerio.load(content.text);
        var title = $('.hd .l').text().trim();//课程名字
        var teacher = $('.tit a').text().trim();//老师名字
        var level = $('.meta-value').eq(0).text().trim();//难度
        var time = $('.meta-value').eq(1).text().trim();//时长
        var number = $('.meta-value').eq(2).text().trim();//学习人数
        var grade = $('.meta-value').eq(3).text().trim();//评分

        Item.push({
          title: title,
          teacher: teacher,
          level: level,
          time: time,
          number: number,
          grade: grade,
          href: topicUrl
        })


        callback(null, Item);
      })
  };

  async.mapLimit(
    pages,
    5,
    function(page, callback) {
      fetchUrl(page, callback);
    },
    function(err, result) {
      if (err) console.log(err);

      var topicUrls = result; //获取所有 url ，但是大数组里面有 8 个小数组

      //将大数组合并
      var Urls = [];

      for(let i=0,l=topicUrls.length;i<l;i++){
        Urls = Urls.concat(topicUrls[i]);
      }
      
      async.mapLimit(
        Urls,
        5,
        function(url,callback){
          console.log(url);
          fetchMsg(url, callback);
        },
        function(err, result) {
          res.writeHead(200, {'Content-Type': 'text/plain;charset=utf8'})
          res.end(JSON.stringify(result));
        }
      )
    }
  );
});
