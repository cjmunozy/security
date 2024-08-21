var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
SECRET_KEY = 'byqI7lRE9nRiKWgKNrZoAw=='

// Ruta para obtener y mostrar el JWT token
router.get('/', function(req, res) {
  
  const token = jwt.sign(
    { username: req.cookies['username']},
    SECRET_KEY,
    { expiresIn: '1h' } // El token expira en 1 hora
  );
  
  res.render('token', { 
    username: req.cookies['username'],
    token: token
  });
});

module.exports = router;