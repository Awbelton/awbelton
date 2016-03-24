var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var Post = require('../models/schema').Post;
var Portfolio = require('../models/schema').Portfolio;
var moment = require('moment');

module.exports = function(app) {
  // routing
  app.get('/', function(req, res) {
    var posts = [];
    var time = moment().format("hh:mm A MM/DD/YYYY");

    return Post.find(function (err, post) {
      if (err)
      return console.error(err);

      for(var i = post.length - 1; i >= 0; i--) {
        if(!post[i].pTitle) {
          posts.push({author: post[i].author, pTitle: 'No Title', content: post[i].content, date: time, _id: post[i]._id});
        } else {
        posts.push({author: post[i].author, pTitle: post[i].pTitle, content: post[i].content, date: time, _id: post[i]._id});
        }
      };
      res.render('pages/index', {
        posts: posts,
        message: ''
      });
    });
  });

  app.get('/about', function(req, res) {
    res.render('pages/about', {
      message: ''
    });
  });

  app.get('/contact', function(req, res) {
    res.render('pages/contact', { message: ''});
  });

  app.get('/update-portfolio', function(req, res) {
    var portfolio = [];

    return Portfolio.find(function (err, port) {
      if (err)
      return console.error(err);

      for(var i = port.length - 1; i >= 0; i--) {
        if(!port[i].portTitle) {
          portfolio.push({portTitle: 'No Title', portImage: port[i].portImage, portDescription: port[i].portDescription, _id: port[i]._id});
        } else {
          portfolio.push({portTitle: port[i].portTitle, portImage: port[i].portImage, portDescription: port[i].portDescription, _id: port[i]._id});
        }
      };
      res.render('pages/up', {
        portfolio: portfolio,
        message: ''
      });
    })
  });

  app.get('/portfolio', function(req, res) {
    var portfolio = [];

    return Portfolio.find(function (err, port) {
      if (err)
      return console.error(err);

      for(var i = port.length - 1; i >= 0; i--) {
        if(!port[i].portTitle) {
          portfolio.push({portTitle: 'No Title', portImage: port[i].portImage, portDescription: port[i].portDescription, _id: port[i]._id});
        } else {
          portfolio.push({portTitle: port[i].portTitle, portImage: port[i].portImage, portDescription: port[i].portDescription, _id: port[i]._id});
        }
      };
      res.render('pages/portfolio', {
        portfolio: portfolio,
        message: ''
      });
    })
  });


  app.get('/post', function(req, res) {
    var posts = [];
    var time = moment().format("hh:mm A MM/DD/YYYY");

    return Post.find(function (err, post) {
      if (err)
      return console.error(err);

      for(var i = post.length - 1; i >= 0; i--) {
        if(!post[i].pTitle) {
          posts.push({author: post[i].author, pTitle: 'No Title', content: post[i].content, date: time, _id: post[i]._id});
        } else {
        posts.push({author: post[i].author, pTitle: post[i].pTitle, content: post[i].content, date: time, _id: post[i]._id});
        }
      };
    res.render('pages/post', {
      message: '',
      posts: posts
    });
  });
});

};
