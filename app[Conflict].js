var port          = process.env.port || 8080;
var flash         = require('connect-flash');
var express       = require('express');
var app           = express();
var path          = require('path');
var mongoose      = require('mongoose');
var morgan        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db            = require('./db').url;
var session       = require('express-session');
var controllers   = require('./controllers/controllers');
var forms         = require('./controllers/forms');
var routes        = require('./routes');
var posts         = require('./controllers/posts');
var portfolio     = require('./controllers/portfolio');

app.use(session({ secret: 'supersecretkey1234' })); // sessions! required for flash-messages
app.use(passport.initialize()); // passport start
app.use(passport.session());
app.use(flash()); // flash setup
require('./models/auth')(passport);

app.use(morgan('dev')); // logs requests to console
app.use(cookieParser()); // read cookies (needed for authentication);
app.use(bodyParser.json()); // get info from html forms
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/public', express.static(__dirname + '/public')); // linking to another file in the directory

// view engine ***********************************************************
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// controllers ************************************************************
controllers(app);

// form validation ********************************************************
forms(app, passport);
app.get('/destroy/:id', posts.destroy);
app.post('/post', posts.posts);
app.get('/destroys/:id', portfolio.destroys);
app.post('/portpost', portfolio.portfolioPost);

// connecting to server/port **********************************************
app.listen(port);
console.log("Connecting to port: " + port);
