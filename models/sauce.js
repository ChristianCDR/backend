const mongoose= require('mongoose');
const sauceSchema= mongoose.Schema({

  name:{required:true, type: String},
  userId:{type: String, required:true},
  manufacturer:{required:true, type: String},
  description:{required:true, type: String},
  mainPepper:{required:true, type: String},
  imageUrl:{type: String, required:true},
  heat:{required:true, type: Number},
  //likes:{type: Number, required:true},
  //dislikes:{type: Number, required:true},
  //usersLiked:{type: [String], required:true},
  //usersDisliked:{type: [String], required:true},

})

module.exports= mongoose.model('sauce',sauceSchema);