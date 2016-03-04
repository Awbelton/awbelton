var Post = require('../models/schema').Post;
var mongoose = require('mongoose');
var moment = require('moment');

// function for posting new content
exports.destroy = function(req, res) {
  var set = 0;
  Post.findById( req.params.id, function (err, post) {
    post.remove( function(err, post) {
      set = 2;
      console.log("Destroyed: " + post + " successfully!");
      res.redirect( '/post');
    });
  });
};

exports.posts = function(req, res) {
  var time = moment().format("hh:mm A MM/DD/YYYY");
  new Post({
    author: req.body.author,
    content: req.body.content,
    pTitle: req.body.pTitle,
    date: time
  }).save(function(err, post){
    res.redirect('/');
  });
};
