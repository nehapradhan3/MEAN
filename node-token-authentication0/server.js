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
var fs = require('fs');
var multer = require('multer');
var upload = multer({dest:'uploads/'});
// =================================================================
// configuration ===================================================
// =================================================================
var port = process.env.PORT || 8082; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));
// app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb' ,extended: true}));


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


// ---------------------------------------------------------
// authentication (no middleware necessary since this isnt authenticated)
// ---------------------------------------------------------
// http://localhost:8080/api/authenticate
apiRoutes.post('/authenticate', function(req, res) {
// console.log("re", req.body.username);
	// find the user
	User.findOne({
		name: req.body.username
	}, function(err, user) {
    console.log("user", user);
		if (err) throw err;

		 if (user) {

			// Make sure the password is correct
		  user.verifyPassword( req.body.password, function(err, isMatch) {
		        if (err) { return res.json({ success: false, message: 'Authentication failed. ' });}

		        // Password did not match
		        if (!isMatch) { return  res.send(401,{ success: false, message: 'Authentication failed. Wrong password.' }); }
		        // console.log("user", user);
		        // Success

										// if user is found and password is right
										// create a token
										var token = jwt.sign(user, app.get('superSecret'), {
											expiresIn: 86400 // expires in 24 hours
										});

									return	res.json({
										  success:true,
											token: token,
											message:'enjoy your token'
										});
		      });
			// check if password matches
			// if (user.password != req.body.password) {
			// 	res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			// } else {

			// }

		}else{
				 res.send(401,{ success: false, message: 'Authentication failed. User not founds.' });

		}

	});
});

// ---------------------------------------------------------
// route middleware to authenticate and check token
// ---------------------------------------------------------
apiRoutes.use(function(req, res, next) {

	// check header or url parameters or post parameters for token
	var token = req.body.token || req.param('token') || req.headers['x-access-token'] || req.headers['authorization'];

	// decode token
	if (token) {

	//  console.log("token",token,  app.get('superSecret') );
		// verifies secret and checks exp
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {
			// console.log("dfdfg", decoded, err);
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });
			} else {
				// if everything is good, save to request for use in other routesr
				next();
			}
		});

	}
	else {

		// if there is no token
		// return an error
		return res.status(403).send({
			success: false,
			message: 'No token provided.'
		});

	}

});

// ---------------------------------------------------------
// authenticated routes
// ---------------------------------------------------------
apiRoutes.post('/username', function(req,res){
	// console.log("req", req);
	var token = req.body.token || req.param('token') || req.headers['x-access-token'] || req.headers['authorization'];
	jwt.verify(token, app.get('superSecret'), function(err, decoded) {
		// console.log("dfdfg", decoded, err);
		if (err) {
			return res.json({ success: false, message: 'Failed to authenticate token.' });
		} else {
				res.send(decoded._doc);
			// if everything is good, save to request for use in other routesr
			// next();
		}
	});
	// Photo.find({}, function(err, photos) {
	// if (err)
	// 	res.send(err);
	//
	// res.send(photos);
	// });

})

apiRoutes.post('/photo/upload', upload.any(), function (req,res,next){

    var body = req.body;
		// console.log("uploads", body);
	if(req.files.length){
		req.files.forEach(function(file){
      // console.log("file", file);
  	    	fs.rename(file.path, './uploads/'+file.originalname, (err) => {
  	    		body.image = file.originalname;
  	    		createCard(body);
  			});
	    });
	}else{
		createCard(body);
	}

	function createCard(body){
    // console.log("body ==>", body);
		var image = new Photo({
      photoId:body.image
    });
		image.save(function(err, img) {
			if (err) {
			}
			res.json(img);
		});
	}
});
apiRoutes.post('/photo/user', function(req,res){
	// console.log("reqss", req.body._id);
	Photo.find({}, function(err, photos) {
		if(err) res.json(err);
		res.json(photos);
	});
	// var photos = [];
	// var photos = [
	// 	{imageName:'machlearn.png', title:'rockstart image', description:'lorem ipsum doels', likes:45},
	// 	{imageName:'ful.jpg', title:'ful image', description:'ful image which i don', likes:4},
	// 	{imageName:'msg3.png', title:'msg3 image', description:'msg3 image which i don', likes:3}
	// ] ;
	 // console.log("userresponse", userresponse);
		// res.json(photos);
	// var token = req.body.token || req.param('token') || req.headers['x-access-token'] || req.headers['authorization'];
	// jwt.verify(token, app.get('superSecret'), function(err, decoded) {
	// 	// console.log("dfdfg", decoded, err);
	// 	if (err) {
	// 		return res.json({ success: false, message: 'Failed to authenticate token.' });
	// 	} else {
	// 			res.send(decoded._doc);
	// 		// if everything is good, save to request for use in other routesr
	// 		// next();
	// 	}
	// });

})


apiRoutes.post('/photo/add', upload.any(), function (req,res){
	// req.body.photoId._id
	console.log(JSON.parse(req.body.photoId),'ddg');
	var photoSAvedId = JSON.parse(req.body.photoId);
	// Photo.findOne({
	// 	name: req.body.username
	// }, function(err, user) {
	//
	// }
	// var image = new Photo({
	// 	photoId:body.image
	// });
	// image.save(function(err, img) {
	// 	if (err) {
	// 	}
	// 	res.json(img);
	// });
	if(photoSAvedId._id){
			Photo.findById(photoSAvedId._id, function(err, photo) {
			if (err)res.send(err);

			photo.photoId=photoSAvedId || photo.photoId;
			photo.photoName=req.body.photoName || photo.photoName;
			photo.title=req.body.title || photo.title;
			photo.user=req.body.user || photo.user;
			photo.ImageName=photoSAvedId.photoId || photo.ImageName;
			// Save the supplier and check for errors
			photo.save(function(err, photoS) {
				if (err)
				res.send(err);
				res.json(photoS);
			});
		});
 }else{
	 res.json("photoId must required");
 }
});
apiRoutes.get('/', function(req, res) {
	res.json({ message: 'Welcome to the coolest API on earth!' });
});

apiRoutes.get('/users', function(req, res) {
	User.find({}, function(err, users) {
		res.json(users);
	});
});


apiRoutes.post('/photo/update', function(req,res){
	// console.log("req", req.body._id);
	Photo.findById(req.body._id, function(err, photo) {
	if (err)
		res.send(err);
		photo.photoId = req.body.photoId || photo.photoId;
		photo.photoName = req.body.photoName || photo.photoName;
		photo.title = req.body.title || photo.title;
		photo.user  = req.body.user || photo.user;
		photo.ImageName = req.body.ImageName || photo.ImageName;
		photo.likedByUserList = req.body.likedByUserList || photo.likedByUserList;
		photo.likes = req.body.likes || photo.likes;
		photo.commentList = req.body.commentList || photo.commentList;
		photo.created =  photo.created;
		photo.save(function (err, photoS) {
						if (err) {
								res.status(500).send(err)
						}
						res.send(photoS);
		});
	});
})

apiRoutes.post('/comment/add', function(req,res){
	// console.log("req body", req.body);
	var commentData = new Comment({
		content:req.body.content,
		photo: req.body.photo,
		photoId: req.body.photoId
	});
	commentData.save(function(err, comment) {
		if(err)
		res.send(err);
		res.json(comment);
	});
});

apiRoutes.post('/user/update', function(req,res){
	// console.log("req", req.body._id);
	User.findById(req.body._id, function(err, user) {
	if (err)
		res.send(err);
		user.name = user.name;
		user.userId = user.userId;
		user.firstName = user.firstName;
		user.lastName = user.lastName;
		user.userName = user.userName;
		user.password = user.password;
		user.created = user.created;
		user.photoList = req.body.photoList || user.photoList;
		user.likedPhotoList = req.body.likedPhotoList || user.likedPhotoList;
		user.admin = req.body.admin || user.admin;
		user.commentId = req.body.commentId || user.commentId;
		user.save(function (err, userS) {
            if (err) {
                res.status(500).send(err)
            }
            res.send(userS);
    });

	});

})

apiRoutes.get('/check', function(req, res) {
	res.json(req.decoded);
});

//CORS middleware for expres...
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
next();
});

//Express Js - static folders - for css, js, images, uploads
app.use("/uploads", express.static(__dirname + '/uploads'));

app.options("*",function(req,res,next){
  res.header("Access-Control-Allow-Origin", req.get("Origin")||"*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
   //other headers here
    res.status(200).end();
});

app.use('/api', apiRoutes);



// =================================================================
// start the server ================================================
// =================================================================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
