const user= require('../models/user');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');
require('dotenv').config();

exports.signup=(req,res, next)=>{
  bcrypt.hash(req.body.password, 10)
  .then(hash=>{
    const newUser= new user({
      email: req.body.email,
      password: hash
    });
    newUser.save()
    .then(res.status(201).json({message:'Nouvel utilisateur crée!'})) 
    .catch(error=> {res.status(501).json({error})});
  })
  .catch(error=> {res.status(500).json({error})});
};

exports.login=(req,res, next)=>{
  user.findOne({email: req.body.email})
  .then(user=>{
    if(!user){
      return res.status(401).json({message: 'Utilisateur inconnu'});
    }
    bcrypt.compare(req.body.password, user.password)
    .then(validPassword=>{
      if(!validPassword){
        return res.status(401).json({message: 'Mot de passe incorrect !'});
      }
      res.status(200).json({
        userId: user._id,
        token: jwt.sign(
          {userId: user._id},
          process.env.TOKEN_SECRET_KEY,
          {expiresIn:'24h'}
          )
      });
    })
    .catch(error=>{res.status(500).json({error})});
  })
  .catch(error=>{res.status(500).json({error})}); 
};