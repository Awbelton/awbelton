var Portfolio = require('../models/schema').Portfolio;
var mongoose = require('mongoose');

exports.destroys = function(req, res) {
  var set = 0;
  Portfolio.findById( req.params.id, function (err, port) {
    port.remove( function(err, port) {
      set = 2;
      console.log("Destroyed: " + port + " successfully!");
      res.redirect( '/portfolio');
    });
  });
};


exports.portfolioPost = function(req, res) {
  new Portfolio({
    portTitle: req.body.portTitle,
    portDescription: req.body.portDescription,
    portImage: req.body.portImage
  }).save(function(err, port) {
    res.redirect('/');
  });
};
