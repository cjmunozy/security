var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const SECRET_KEY = 'byqI7lRE9nRiKWgKNrZoAw=='; // Asegúrate de usar tu clave secreta real

// Ruta para obtener y mostrar el JWT token
router.get('/', function(req, res) {
  // Obtiene el token de la sesión o del query string
  const token = req.query.token || req.session.token;

  // Verifica si el token está disponible
  if (token) {
    // Decodifica el token para extraer la información
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        // Maneja el error en caso de que el token no sea válido
        res.status(401).json({ message: 'Invalid token' });
      } else {
        // Renderiza la vista 'token.ejs' y pasa el token como parámetro
        res.render('token', { 
          username: req.cookies['username'],
          token: token
        });
      }
    });
  } else {
    // Redirige a /login si no se encuentra un token
    res.redirect('/login');
  }
});

module.exports = router;