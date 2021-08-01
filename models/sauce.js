const mongoose= require('mongoose');
const sauceSchema= mongoose.Schema({

  name:{required:true, type: String},
  userId:{type: String, required:true},
  manufacturer:{required:true, type: String},
  description:{required:true, type: String},
  mainPepper:{required:true, type: String},
  imageUrl:{type: String, required:true},
  heat:{required:true, type: Number},
  likes:{type: Number, required:true, default: 0},
  dislikes:{type: Number, required:true, default: 0},
  usersLiked:{type: [String], required:true, default: []},
  usersDisliked:{type: [String], required:true, default: []},

})

module.exports= mongoose.model('sauce',sauceSchema);