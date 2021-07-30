const jwt= require('jsonwebtoken');

module.exports=(req,res,next)=>{

  try{
    const token= req.headers.authorization.split(' ')[1];
    const decodedToken= jwt.verify(token,'hoc loco quaedam quaestio subdifficilis, num quando amici novi, digni amicitia, veteribus sint anteponendi, ut equis vetulis teneros anteponere solemus. Indigna homine dubitatio! Non enim debent esse amicitiarum sicut aliarum rerum satietates; veterrima quaeque, ut ea vina, quae');
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