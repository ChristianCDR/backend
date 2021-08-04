const sauce= require ('../models/sauce');
const fs= require('fs');

  exports.createNewSauce=(req,res, next)=>{
    const sauceObject= JSON.parse(req.body.sauce);
    const newSauce= new sauce({
      ...sauceObject,
      imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });   
    newSauce.save()
    .then(()=>{res.status(201).json({message:'Sauce enregistrée!'})})
    .catch((error)=>{res.status(400).json({error})});
  };

  exports.getAllSauces=(req,res,next)=>{
    sauce.find()
    .then(sauces =>{res.status(200).json(sauces)})
    .catch(error=>{res.status(400).json({error})});
  };

  exports.getOneSauce=(req, res, next) => {
    sauce.findOne({ _id: req.params.id })
    .then(thesauce => res.status(200).json(thesauce))
    .catch(error => res.status(404).json({error}));
  };

  exports.modifySauce=(req, res, next) => {
    const sauceObject= req.file ? {
      ...JSON.parse(req.body.sauce),
      imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }:{...req.body};

    sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
    .catch(error => res.status(400).json({ error }));
  };

  exports.deleteSauce=(req, res, next) => {
    sauce.findOne({_id: req.params.id})
    .then((sauce) =>{
      const filename= sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`,()=>{
        sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
        .catch(error => res.status(400).json({ error }));
      })
    })
    .catch(error => res.status(500).json({ error }));  
  };

  exports.likeSauce=(req,res,next)=>{
    
    switch(req.body.like){
      case 1: // User drops a like
        sauce.updateOne(
          {_id: req.params.id},
          { $push:{usersLiked: req.body.userId },
            $inc: { likes: +1 }
          }
        )
          .then(()=>{res.status(201).json({message : sauce.usersLiked})})
          .catch((error)=>{res.status(500).json({error})});
          
        break;
      case 0: //User cancel his like or dislike  
         const userId=req.body.userId;
         const sauceId=req.params.id;
         sauce.findOne({_id: sauceId })
           .then((theSauce) => {
            if (theSauce.usersLiked.includes(userId)) { 
              sauce.updateOne(
                { _id: sauceId }, 
                { $pull: { usersLiked: userId }, 
                  $inc: { likes: -1 }
                }
              )
                .then(() => res.status(200).json({ message: 'Like canceled'}))
                .catch((error) => res.status(400).json({ error }))
            }
            if (theSauce.usersDisliked.includes(userId)) { 
              sauce.updateOne(
                { _id: sauceId }, 
                { $pull: { usersDisliked: userId }, 
                  $inc: { dislikes: -1 } 
                }
              )
                .then(() => res.status(200).json({ message: 'disliked canceled' }))
                .catch((error) => res.status(400).json({ error }))
            }
            res.status(200).json({msg: theSauce});
          })
          .catch((error) => res.status(404).json({ error }));          
        break;
      case -1: //User drops a dislike
            sauce.updateOne(
              {_id: req.params.id},
              { $push:{usersDisliked: req.body.userId},
                $inc:{dislikes: +1}
              }
            )
            .then(()=>{res.status(201).json({message : 'Disliké'})})
            .catch((error)=>{res.status(500).json({error})});

        break;
      default:
        console.error(error);
    }
  }