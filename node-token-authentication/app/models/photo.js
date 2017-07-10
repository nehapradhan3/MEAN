var Comment = require('./comment');
var User = require('./user');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PhotoSchema = new Schema({
	photoId:String,
  photoName:String,
  title:String,
  user:User,
  ImageName:String,
  likedByUserList:[User],
  likes:{type:Number, default:0},
  commentList:[{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  created:{ type: Date, default: Date.now },
});

// set up a mongoose model
module.exports = mongoose.model('Photo', PhotoSchema);
