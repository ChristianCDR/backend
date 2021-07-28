const mongoose= require('mongoose');
const sauceSchema= mongoose.Schema({

  name:{type: String, required:true},
  userId:{type: String, required:true},
  manufacturer:{type: String, required:true},
  description:{type: String, required:true},
  mainPepper:{type: String, required:true},
  imageUrl:{type: String, required:true},
  heat:{type: number, required:true},
  likes:{type: number, required:true},
  dislikes:{type: number, required:true},
  usersLiked:{type: [String], required:true},
  usersDisliked:{type: [String], required:true},

})

module.exports= mongoose.model('sauce',sauceSchema);