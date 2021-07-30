const express= require('express');
const route = express.Router();
const ctrlSauce= require('../controllers/sauce');
const auth = require('../middleware/auth');

route.post('/',auth, ctrlSauce.createNewSauce);

route.get('/',auth, ctrlSauce.getAllSauces);

route.get('/:id',auth, ctrlSauce.getOneSauce);

route.put('/:id',auth, ctrlSauce.modifySauce);

route.delete('/:id',auth, ctrlSauce.deleteSauce);

module.exports= route;