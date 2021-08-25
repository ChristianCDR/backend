const passwordValidator = require('password-validator');
const passwordSchema = new passwordValidator();
/* Le mot de passe doit contenir au moins: 5 caractères, 1 miniscule, 
1 majuscule, 2 chiffres, pas d'espace, pas de caractères spéciaux */
passwordSchema
.is().min(5)                                   
.is().max( 50)                                  
.has().uppercase()                              
.has().lowercase()                            
.has().digits(2)                               
.has().not().spaces()
.has().not('/','+','=');

module.exports= passwordSchema;
