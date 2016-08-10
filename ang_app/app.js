var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var session = require('express-session');
var nodeCache = require('node-cache');
var myCache = new nodeCache();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Session generated
app.use(session({
  resave: true,
  rolling: true,
  saveUninitializes: true,
  secret: 'keyboard cat',
  cookie: {
      maxAge : 1000*60*5
  }
}));

app.use(express.static('./'));

//Logging and touching session
app.post('/api/login', function (req, res) {
	if (req.session.uId === undefined) {
			var file = require('./data/users.json');
			var logged = false;
			file.map(function(user) {
				if (user.uLogin === req.body.uLogin && user.uPassword === req.body.uPassword) {
					logged = true;
					req.session.uLogin = req.body.uLogin;
					req.session.uId = user.uId;
					req.session.success = logged;
				}
			});
			res.send({success: req.session.success, uId: req.session.uId, user_name: req.session.uLogin});
	} else {
			req.session.touch(req.session.id, req.session, req.session.uId);
			res.send({success: true, uId: req.session.uId, user_name: req.session.uLogin});
	}
});

//Show password
app.post('/api/forgot-pass', function(req, res) {
	var login = req.body.uLogin;
	var uPassword;
	var file = require('./data/users.json');
	file.map(function(user) {
		if (user.uLogin === login) {
			uPassword = user.uPassword;
		}
	});
	res.send({uPassword: uPassword});
});

//Session kill
app.post('/api/logout', function(req, res) {
	req.session.destroy();
	res.send({success: true, logout: true, uId: undefined});
});

//Get user info
app.get('/get-details/:id', function(req, res){
    if (!myCache.get(req.params.id)) {
        var details = require('./data/details.json');
        details.map(function (user) {
            if (user.id === req.params.id) {
                myCache.set(user.id, user);
            }
        });
    }
    res.send({details: myCache.get(req.params.id)});
});

app.listen(8000);
console.log('Server started!');
