var express = require('express');
var router = express.Router();

var entregaController = require('../controllers/entregaController');

router.post('/solicitar', function (request, response) {
  entregaController.solicitar(request, response);
});

module.exports = router;