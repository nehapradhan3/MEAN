// =================================================================
// get the packages we need ========================================
// =================================================================
var express 	= require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var User   = require('./app/models/user'); // get our mongoose model
var Photo   = require('./app/models/photo'); // get our mongoose model
var Comment   = require('./app/models/comment'); // get our mongoose model

// =================================================================
// configuration ===================================================
// =================================================================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// =================================================================
// routes ==========================================================
// =================================================================

// basic route (http://localhost:8080)
app.get('/', function(req, res) {
	res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
var apiRoutes = express.Router();
apiRoutes.post('/setup', function(req, res) {

	// create a sample user
	var userData = new User({
		name: 'sumansk',
		password: 'password',
		admin: true
	});
	userData.save(function(err) {
		if(err){
			if (err.name === 'MongoError' && err.code === 11000) {
					res.json({error: "There was a duplicate key error"});
	    } else {
		      res.json({error: "Application error"});
	     }
		// if (err) res.json({error: "Error fetching "});
			}
		console.log('User saved successfully');
		res.json({ success: true });
	});
});

// ---------------------------------------------------------
// authenticated routes
// ---------------------------------------------------------
apiRoutes.get('/', function(req, res) {
	res.json({ message: 'Welcome to the coolest API on moon!' });
});
apiRoutes.post('/user/register', function(req,res){
	var userData = new User({
		firstName:req.body.firstName,
		password: req.body.password,
		lastName:req.body.lastName,
		name:req.body.userName
	});
	userData.save(function(err) {
		if(err){
			if (err.name === 'MongoError' && err.code === 11000) {
					res.json({error: "There was a duplicate key error"});
			} else {
					res.json({error: "Application error"});
			 }
		// if (err) res.json({error: "Error fetching "});
			}
		console.log('User saved successfully');
		res.json({ success: true });
	});
});
apiRoutes.post('/photo/photoId', function(req,res){
	//  console.log('req', req.body.photoId);
	Comment.find({photoId:req.body.photoId}, function(err, comments){
		if(err) res.json({error:true});
		console.log("comments", comments);
		Photo.findById(req.body.photoId, function(err, photo) {
		if (err)
			res.send(err);
			photo.photoId =  photo.photoId;
			photo.photoName = photo.photoName;
			photo.title = photo.title;
			photo.user  =  photo.user;
			photo.ImageName = photo.ImageName;
			photo.likedByUserList = photo.likedByUserList;
			photo.likes =  photo.likes;
			photo.commentList =  comments || photo.commentList;
			photo.created =  photo.created;
			photo.save(function (err, photoS) {
							if (err) {
									res.status(500).send(err)
							}
							res.send(photoS);
			});
		});
	})


});


// for photos route
apiRoutes.route('/photo/allPhotos')
  .get(function (req, res) {
		Photo.find({}, function(err, photos) {
		if (err)
			res.send(err);

		res.send(photos);
		});
    // var photos = [
    //   {imageName:'machlearn.png', title:'rockstart image', description:'lorem ipsum doels', likes:45},
    //   {imageName:'ful.jpg', title:'ful image', description:'ful image which i don', likes:4},
    //   {imageName:'msg3.png', title:'msg3 image', description:'msg3 image which i don', likes:3}
    // ] ;
    //  // console.log("userresponse", userresponse);
    //   res.json(photos);
  });


	//CORS middleware for expres...
	app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, sid");
	res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
	next();
	});

	//Express Js - static folders - for css, js, images, uploads
	app.use("/uploads", express.static(__dirname + '/uploads'));
app.use('/api', apiRoutes);



// =================================================================
// start the server ================================================
// =================================================================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
