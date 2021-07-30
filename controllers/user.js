const user= require('../models/user');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');

exports.signup=(req,res, next)=>{
  bcrypt.hash(req.body.password, 7)
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
  res.status(200).json({message:'ok'});
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
          'hoc loco quaedam quaestio subdifficilis, num quando amici novi, digni amicitia, veteribus sint anteponendi, ut equis vetulis teneros anteponere solemus. Indigna homine dubitatio! Non enim debent esse amicitiarum sicut aliarum rerum satietates; veterrima quaeque, ut ea vina, quae',
          {expiresIn:'24h'}
          )
      });
    })
    .catch(error=>{res.status(500).json({error})});
  })
  .catch(error=>{res.status(500).json({error})});
};