const mongoose=require ('mongoose');
const mongooseUniqueValidator=require ('mongoose-unique-validator');

const userSchema= mongoose.Schema({
  email: {type: String, unique: true},
  password:{type: String}
});
//S'assurer de l'unicité des adresses mails
userSchema.plugin(mongooseUniqueValidator);
module.exports= mongoose.model('user', userSchema);