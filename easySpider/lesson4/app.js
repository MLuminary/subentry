var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');

var url = require('url');
var cnodeUrl = 'https://cnodejs.org/';

var ep = new eventproxy();

superagent.get(cnodeUrl).end(function(err, res) {
  if (err) {
    return console.error(err);
  }
  var topicUrls = [];
  var $ = cheerio.load(res.text);
  //获取首页所有的链接
  $('#topic_list .topic_title').each(function(index, element) {
    var $element = $(element);

    var href = url.resolve(cnodeUrl, $element.attr('href'));
    topicUrls.push(href);
  });

  ep.after('topic_html', topicUrls.length, function(topics) {
    //topics为数组，包含了所有请求的信息

    topics = topics.map(function(topicPair) {
      var topicUrl = topicPair[0];
      var topicHtml = topicPair[1];
      var $ = cheerio.load(topicHtml);

      return ({
        title: $('.topic_full_title')
          .text()
          .trim(),
        href: topicUrl,
        comment1: $('.reply_content')
          .eq(0)
          .text()
          .trim()
      });

    });

    console.log(topics);

  });

  topicUrls.forEach(function(topicUrl) {
    superagent.get(topicUrl).end(function(err, res) {
      // console.log('fetch '+ topicUrl + ' success');
      //抓取topicUrl页面的html
      ep.emit('topic_html', [topicUrl, res.text]);

    });
  });
});
