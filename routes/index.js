const bodyParser = require('body-parser')
const pessoas = require('./pessoasRoute')
const niveis = require('./niveisRoute')
const turmas = require('./turmasRoute')
const matriculas = require('./matriculasRoute')

//.use informa que o express vai rodar com outra lib

module.exports = app => {
    app.use(
      bodyParser.json(),
      pessoas,
      niveis,
      turmas,
      matriculas
      )
    }

