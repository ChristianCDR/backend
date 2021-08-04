const express= require('express');
const route= express.Router();
const ctrlUser= require('../controllers/user');
const ctrlPass= require('../middleware/passwordValidator');
const ctrlEmail= require('../middleware/emailValidator');

route.post('/signup',ctrlEmail.emailValidator, ctrlPass.passwordValidator, ctrlUser.signup);
route.post('/login', ctrlUser.login); 

module.exports= route;