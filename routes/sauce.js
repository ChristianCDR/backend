const express= require('express');
const route = express.Router();
const ctrlSauce= require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

route.post('/',auth,multer, ctrlSauce.createNewSauce);

route.post('/:id/like',auth, ctrlSauce.likeSauce);

route.get('/',auth, ctrlSauce.getAllSauces);

route.get('/:id',auth, ctrlSauce.getOneSauce);

route.put('/:id',auth,multer, ctrlSauce.modifySauce);

route.delete('/:id',auth, ctrlSauce.deleteSauce);

module.exports= route;