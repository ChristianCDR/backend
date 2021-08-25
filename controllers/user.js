const user= require('../models/user');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');
require('dotenv').config();

//Création de compte
exports.signup=(req,res, next)=>{
  bcrypt.hash(req.body.password, 10)//Hashage du mot de passe
  .then(hash=>{
    const newUser= new user({ 
      email: req.body.email,
      password: hash
    });
    newUser.save() //Enregistrement dans la base de données
    .then(()=>res.status(201).json({message:'Nouvel utilisateur crée!'})) 
    .catch(error=> {res.status(501).json({error})});
  })
  .catch(error=> {res.status(500).json({error})});
};

//Connexion au compte
exports.login=(req,res, next)=>{
  user.findOne({email: req.body.email})//Chercher le mail dans la db
  .then(theUser=>{
    if(!theUser){
      return res.status(401).json({message: 'Utilisateur non trouvé!'});
    }
    //Comparaison du mot de passe de la db avec celui fourni par le user
    bcrypt.compare(req.body.password, theUser.password)
    .then(validPassword=>{
      if(!validPassword){
        return res.status(401).json({message: 'Mot de passe incorrect!'});
      }//Création du token d'authentification
      res.status(200).json({
        userId: theUser._id,
        token: jwt.sign(
          {userId: theUser._id},
          process.env.TOKEN_SECRET_KEY,
          {expiresIn:'24h'}
          )
      });
    })
    .catch(error=>{res.status(500).json({error})});
  })
  .catch(error=>{res.status(500).json({error})}); 
};