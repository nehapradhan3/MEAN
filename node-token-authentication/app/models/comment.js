
var Photo = require('./photo');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CommentSchema = new Schema({
  commentId:Number,
  photo:Photo,
  userName:String,
  content:String,
  photoId:String
});

// set up a mongoose model
module.exports = mongoose.model('Comment', CommentSchema);
