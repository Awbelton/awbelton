var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs'); // encrypt user/pws

var Schema = mongoose.Schema;

// SCHEMA for Posts
var PostSchema = new Schema({
	author: String,
	content: String,
	pTitle: String,
	date: Date
});

var Post = mongoose.model('Post', PostSchema);

// SCHEMA for Portfolio
var portfolioSchema = new Schema({
	portTitle: String,
	portDescription: String,
	portImage: String
})

var Portfolio = mongoose.model('Postfolio', portfolioSchema);

// SCHEMA for Profiles / Accounts

var userSchema = new Schema({
	local: {
		email: String,
		password: String,
		personal: {
			fn: String,
			ln: String,
			age: {
				type: Number,
				min: 15,
				max: 85
			},
			loc: String
		}
}
});

// generate hash
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// check if pw is valid
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
};

var Profile = mongoose.model('Profile', userSchema);

module.exports = {
	Post: Post,
	Profile: Profile,
	Portfolio: Portfolio
};
