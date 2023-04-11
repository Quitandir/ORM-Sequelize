//const { where } = require('sequelize');
//const database = require('../models');

const Services = require('../services/Services')
const niveisServices = new Services('Niveis')


class NivelController {
    static async pegaTodosOsNiveis (req, res) {
        try {
            const todosOsNiveis = await niveisServices.pegaTodosOsRegistros()
            return res.status(200).json(todosOsNiveis)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmNivel (req, res) {
        const {id} = req.params
            //id valor
        try {                                                      //id chave  //id valor 
            const umNivel = await niveisServices.pegaUmRegistro(Number(id))
            return res.status(200).json(umNivel)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaNivel (req, res) {
        const novoNivel = req.body
        try {
            const novoNivelCriado = await niveisServices.criaUmRegistro(novoNivel)
            return res.status(200).json(novoNivelCriado)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaNivel (req, res) {
        const {id} = req.params
        const novasInfos = req.body

        try {
            await niveisServices.atualizaRegistro(novasInfos, Number(id))
            //método update do Sequelize não precisa criar umas const e recebe dois parâmetros: as infos atualizadas e qual id a ser alterado.
            const nivelAtualizado = await niveisServices.pegaUmRegistro( Number(id) )
            return res.status(200).json(nivelAtualizado)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaNivel (req, res) {
        const {id} = req.params
            //id valor
        try {                                                      //id chave  //id valor 
            await niveisServices.apagaUmRegistro(Number(id))
            return res.status(200).json({mensagem: `id ${id} deletado.`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async restauraNivel(req, res) {
        const { id } = req.params
        try {
          await niveisServices.restauraRegistro(Number(id))
          return res.status(200).json({ mensagem: `id ${id} restaurado`})
        } catch (error) {
          return res.status(500).json(error.message)
        }
      }
}

module.exports = NivelController;

//Ao criar a classe Niveis como static, não é necessário instanciar um novo objeto da classe Niveis
//Como o controlador vai buscar no banco e retornar através de uma rota, async/await são necessários

