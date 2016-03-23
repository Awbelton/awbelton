var Portfolio = require('../models/schema').Portfolio;
var mongoose = require('mongoose');

exports.portfolioPost = function(req, res) {
  new Post({
    portTitle: req.body.portTitle,
    portDescription: req.body.portDescription,
    portImage: req.body.portImage,
    date: time
  }).save(function(err, post){
    res.redirect('/');
  });
};
