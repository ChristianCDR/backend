//On fait passer le mail au validateur
exports.emailValidator = (req, res, next) => {
  const validEmail = (email) => {
/*Le mail peut contenir:
-1 ou plusieurs lettres de A à Z miniscules, 
-1 ou plusieurs chiffres,
-des points, tirets, underscores,
- 1 @,
-1 point
 */
    let emailRegExp = new RegExp('^[a-z0-9.-_]+[@]{1}[a-z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
    let emailTest = emailRegExp.test(email); 

    if(!emailTest){
      res.status(400).json({ message: 'Adresse mail invalide !' });
    }
    else{
      next();
    }
  }
  validEmail(req.body.email)
};