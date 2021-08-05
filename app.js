const express= require('express');
//var cors = require('cors');
const helmet= require('helmet');
const mongoose = require('mongoose');
const routeSauce = require('./routes/sauce');
const routeUser= require('./routes/user');
const path= require ('path');

const connect= process.env.CONNEXION; 
mongoose.connect(connect, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log('Connexion à MongoDB réussie!'))
.catch(()=>console.log('Connexion à MongoDB échouée!'));

const app= express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', routeSauce);
app.use('/api/auth',routeUser);

module.exports=app;



