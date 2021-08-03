const user= require('../models/user');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');

exports.signup=(req,res, next)=>{
  bcrypt.hash(req.body.password, 5)
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
    next();
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
          'hoc_loco_quaedam_quaestio_subdifficilis_num_quando_amici_novi_digni_amicitia_veteribus_sint_anteponendi_ut_equis_vetulis_teneros_anteponere_solemus_Indigna_homine_dubitatio!_Non_enim_debent_esse_amicitiarum_sicut_aliarum_rerum_satietates_veterrima_quaeque_ut_ea_vina_quae',
          {expiresIn:'24h'}
          )
      });
    })
    .catch(error=>{res.status(500).json({error})});
  })
  .catch(error=>{res.status(500).json({error})}); 
};