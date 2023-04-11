const { where } = require('sequelize');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
//const database = require('../models');

const Services = require('../services/Services')
const turmasServices = new Services('Turmas')


class TurmaController {
    static async pegaTodasAsTurmas (req, res) {
        const { data_inicial, data_final } = req.query 
        const where = {}
        data_inicial || data_final ? where.data_inicio = {} : null
        data_inicial ? where.data_inicio[Op.gte] = data_inicial : null
        data_final ? where.data_inicio[Op.lte] = data_final : null

        try {
            const todasAsTurmas = await turmasServices.pegaTodosOsRegistros(where)
            return res.status(200).json(todasAsTurmas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmaTurma (req, res) {
        const {id} = req.params
            //id valor
        try {                                                      //id chave  //id valor 
            const umaTurma = await turmasServices.pegaUmRegistro(Number(id))
            return res.status(200).json(umaTurma)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaTurma (req, res) {
        const novaTurma = req.body
        try {
            const novaTurmaCriada = await turmasServices.criaUmRegistro(novaTurma)
            return res.status(200).json(novaTurmaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaTurma (req, res) {
        const {id} = req.params
        const novasInfos = req.body

        try {
            await turmasServices.atualizaRegistro(novasInfos, Number(id))
            //método update do Sequelize não precisa criar umas const e recebe dois parâmetros: as infos atualizadas e qual id a ser alterado.
            const turmaAtualizada = await turmasServices.pegaUmRegistro( Number(id))
            return res.status(200).json(turmaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaTurma (req, res) {
        const {id} = req.params
            //id valor
        try {                                                      //id chave  //id valor 
            await turmasServices.apagaUmRegistro(Number(id))
            return res.status(200).json({mensagem: `id ${id} deletado.`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async restauraTurma(req, res) {
        const { id } = req.params
        try {
          await turmasServices.restauraRegistro(Number(id))
          return res.status(200).json({ mensagem: `id ${id} restaurado`})
        } catch (error) {
          return res.status(500).json(error.message)
        }
      }
}

module.exports = TurmaController;

//Ao criar a classe Turmas como static, não é necessário instanciar um novo objeto da classe Turmas
//Como o controlador vai buscar no banco e retornar através de uma rota, async/await são necessários

