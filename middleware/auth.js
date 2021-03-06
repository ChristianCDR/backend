const jwt= require('jsonwebtoken');
require('dotenv').config();

module.exports=(req,res,next)=>{
//Récupérer et décoder et décoder le token
  try{
    const token= req.headers.authorization.split(' ')[1];
    const decodedToken= jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    const userId= decodedToken.userId;
    if(req.body.userId && req.body.userId !==userId){
      throw 'Identifiant utilisateur non valable';
    }
    else{
      next();
    }
  }
  catch(error){
    res.status(401).json({error: error | 'requête non authentifiée'});
  }
}