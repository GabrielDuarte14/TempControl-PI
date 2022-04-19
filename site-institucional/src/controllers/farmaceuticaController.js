var farmaceuticaModel = require('../models/farmaceuticaModel');
var sensorModel = require('../models/sensorModel');

function cadastrar(request, response) {
  var nome = request.body.nomeServer;
  var cnpj = request.body.cnpjServer;
  var qtdSensor = request.body.qtdSensorServer;
  var email = request.body.emailServer;
  var telefone = request.body.telefoneServer;
  var senha = request.body.senhaServer;

  if (nome == undefined) {
    response.status(400).send("Seu nome está undefined!");
  } else if (cnpj == undefined) {
    response.status(400).send("Seu CNPJ está undefined!");
  } else if (qtdSensor == undefined) {
    response.status(400).send("A quantidade de sensores está undefined!");
  } else if (email == undefined) {
    response.status(400).send("Seu email está undefined!");
  } else if (telefone == undefined) {
    response.status(400).send("Seu telefone está undefined!");
  } else if (senha == undefined) {
    response.status(400).send("Sua senha está undefined!");
  } else if (qtdSensor <= 0) {
    response.status(400).send("A quantidade de sensores deve ser maior que 0");
  } else {
    farmaceuticaModel.cadastrar(nome, cnpj, qtdSensor, email, telefone, senha).then(
      function (resultado) {
        var idFarmaceutica = resultado.insertId;

        for (let index = 1; index <= qtdSensor; index++) {
          sensorModel.inserir(idFarmaceutica, index).catch(function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
            );
            
            response.status(500).json(erro.sqlMessage);
          });
        }

        response.json(resultado);
      }
    ).catch(function (erro) {
      console.log(erro);
      console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
      );
      
      response.status(500).json(erro.sqlMessage);
    });
  }
}

module.exports = {
  cadastrar
}