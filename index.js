//npm: init -y, install express, install bodyParser
//mysql -u root -p no ubunto pra acessar mysql
//npm run start pra rodar o servidor pelo nodemon

const express = require('express')
const routes = require('./routes') //routes chama o index das rotas

const app = express()
const port = 3000

routes(app)

app.listen(port, () => console.log(`O servidor está rodando na porta ${port}.`))

module.exports = app