var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Registration' });
});

router.post('/register', passport.authenticate('local')({successRedirect: '/profile', failureRedirect: '/login'}));

router.post('/register', function(req, res, next) {
req.checkBody('username', 'El campo de nombre de usuario no puede estar vacío.').notEmpty();
req.checkBody('username', 'El campo de nombre de usuario debe tener entre 4 y 15 caracteres').len(4,15);
req.checkBody('email', 'El email que ingresaste es invalido, intente otra vez.').isEmail();
req.checkBody('email', 'El campo de email debe tener entre 5 y 30 caracteres.').len(5,30);
req.checkBody('password', 'El campo de contrasñea debe tener entre 8 y 16 caracteres.').len(8,16);
req.checkBody('password', 'Password must include one lowercase character, one uppercase character, a number, and a special character.').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
req.checkBody('repassword', 'Password must be between 8-100 characters long.').len(8, 100);
req.checkBody('repassword', 'Passwords do not match, please try again.').equals(req.body.password);

const errors = req.validationErrors();

if(errors){
  console.log('errors: ${JSON.stringify(errors)}');

  res.render('register',{
    title: 'Registration Error',
    errors: errors
  });
}else{
  const username=req.body.username;
  const email=req.body.email;
  const password= req.body.password;
}
  
  const db = require('../db.js');

  bcrypt.hash(myPlainTextPassword, saltRounds, function(err,hash){
    db.query('INSERT INTO users (username, email, password) VALUES (?,?,?)', [username, email, password], function(
      error,results,fields){
        if(error) throw error;
        res.render('index', { title: 'Registration complete' });
    })

  });

  
});

module.exports = router;