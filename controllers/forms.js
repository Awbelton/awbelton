var Post = require('../models/schema').Post;
var Profile = require('../models/schema').Profile;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var mongoose = require('mongoose');
var db = require('../db');

mongoose.connect(db.url);

module.exports = function(app, passport) {
	// LOGIN ================================
	app.get('/login', function(req, res) {
		res.render('pages/login', { message: req.flash('loginMessage')});
	});

	app.post('/login',
	passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));

	// SIGNUP ===============================
	app.get('/signup', function(req, res) {
		res.render('pages/signup', { message: req.flash('signupMessage')});
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup', // redirect here if there is an error
		failureFlash: true // allow flash messages
	}))

	// PROFILE ===============================
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('pages/profile', {
			user : req.user,
			message : ''
		});
	});

	// LOGOUT =================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	// ROUTING MIDDLEWARE - Checking if user is logged in
	function isLoggedIn(req, res, next) {
		if(req.isAuthenticated()) {
			return next();
		};
		res.redirect('/');
	};
};
