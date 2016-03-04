var express = require('express');
var router = express.Router();

// routing for partials

exports.partials = function(req, res) {
  var filename = req.params.filename;
  if(!filename) return;
  res.render('partials/' + filename);
}

//module.exports = router;
