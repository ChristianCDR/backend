const express= require('express');
const mongoose = require('mongoose');

const connect= 'mongodb+srv://firstUser:A27r6h62vK7aZxT@cluster0.wzxgi.mongodb.net/sopekockodatabase?retryWrites=true&w=majority';
mongoose.connect(connect, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log('Connexion à MongoDB réussie!'))
.catch(()=>console.log('Connexion à MongoDB échouée!'));

const app= express();
module.exports=app;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/api/sauce',(req,res, next)=>{
    console.log(res.status(201).json({message:'route post ok'}));
});

app.use('/api/sauce',(req,res,next)=>{
  const stuff = [
    {
      _id: 'oeihfzeoi',
      title: 'Mon premier objet',
      description: 'Les infos de mon premier objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 4900,
      userId: 'qsomihvqios',
    },
    {
      _id: 'oeihfzeomoihi',
      title: 'Mon deuxième objet',
      description: 'Les infos de mon deuxième objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 2900,
      userId: 'qsomihvqios',
    },
  ];
  res.status(200).json(stuff);
});


