const jwt= require('jsonwebtoken');

module.exports=(req,res,next)=>{

  try{
    const token= req.headers.authorization.split(' ')[1];
    const decodedToken= jwt.verify(token,'hoc_loco_quaedam_quaestio_subdifficilis_num_quando_amici_novi_digni_amicitia_veteribus_sint_anteponendi_ut_equis_vetulis_teneros_anteponere_solemus_Indigna_homine_dubitatio!_Non_enim_debent_esse_amicitiarum_sicut_aliarum_rerum_satietates_veterrima_quaeque_ut_ea_vina_quae');
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