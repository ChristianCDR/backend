const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp'
};

const storage= multer.diskStorage({
  //Choisir le dossier de stockage
  destination:(req,file,callback)=>{
    callback(null,'images');
  },
  //définir un nouveau nom unique pour notre fichier pour éviter les doublons
  //définir une extension pour le fichier
  filename:(req,file,callback)=>{
    const name= file.originalname.split(' ').join('_').split('.')[0];
    const extension= MIME_TYPES[file.mimetype];
    callback(null, name+ Date.now()+ '.'+ extension);
  }
});

module.exports= multer({storage}).single('image');