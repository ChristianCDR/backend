
exports.emailValidator = (req, res, next) => {
  const validEmail = (email) => {

    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
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