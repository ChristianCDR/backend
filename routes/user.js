const express= require('express');
const route= express.Router();
const ctrlUser= require('../controllers/user');

route.post('/signup', ctrlUser.signup);
route.post('/login', ctrlUser.login);

module.exports= route;