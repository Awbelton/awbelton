var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./schema').Profile;

// configuration for username/pw

module.exports = function(passport) {
	// startup passport =========================================

	// used to serialize user for the session
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	// deserialize user
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	// local signup
	passport.use('local-signup', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true // allows us to pass back the entire reqest to the callback
	},
		function(req, email, password, done) {
			process.nextTick(function() {
				User.findOne({ 'local.email' : email }, function(err, user) {
					if (err)
						return done(err);
					// check to see if user exists
					if (user) {
						return done(null, false, req.flash('signupMessage', 'That email is already taken.'))
					} else {

						// if there is no user with that username, we create the user
						var newUser = new User();

						// set user's credentials
						newUser.local.email = email;
						newUser.local.password = newUser.generateHash(password);

						// save the user
						newUser.save(function(err) {
							if (err) {
								throw err;
							}
							return done(null, newUser);
						});
					}
				});
			});
		}
	));

	// local login
	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
		function(req, email, password, done) {
			User.findOne({ 'local.email' : email }, function(err, user) {
				if (err) {
					return done(err);
				};
				if (!user) {
					return done(null, false, req.flash('loginMessage', 'No user found.'));
				};
				if (!user.validPassword(password)) {
					return done(null, false, req.flash('loginMessage', 'Oop! Wrong password.'));
				};
				return done(null, user);
			});
		}
	));
};
