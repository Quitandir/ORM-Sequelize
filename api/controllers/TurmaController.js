const { where } = require('sequelize');
const database = require('../models');

class TurmaController {
    static async pegaTodasAsTurmas (req, res) {
        try {
            const todasAsTurmas = await database.Turmas.findAll()
            return res.status(200).json(todasAsTurmas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmaTurma (req, res) {
        const {id} = req.params
            //id valor
        try {                                                      //id chave  //id valor 
            const umaTurma = await database.Turmas.findOne( {where: { id: Number(id)}})
            return res.status(200).json(umaTurma)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaTurma (req, res) {
        const novaTurma = req.body
        try {
            const novaTurmaCriada = await database.Turmas.create(novaPessoa)
            return res.status(200).json(novaTurmaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaTurma (req, res) {
        const {id} = req.params
        const novasInfos = req.body

        try {
            await database.Turmas.update(novasInfos, {where: { id: Number(id)}} )
            //método update do Sequelize não precisa criar umas const e recebe dois parâmetros: as infos atualizadas e qual id a ser alterado.
            const turmaAtualizada = await database.Turmas.findOne( {where: { id: Number(id)}})
            return res.status(200).json(turmaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaTurma (req, res) {
        const {id} = req.params
            //id valor
        try {                                                      //id chave  //id valor 
            await database.Turmas.destroy( {where: { id: Number(id)}})
            return res.status(200).json({mensagem: `id ${id} deletado.`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = TurmaController;

//Ao criar a classe Turmas como static, não é necessário instanciar um novo objeto da classe Turmas
//Como o controlador vai buscar no banco e retornar através de uma rota, async/await são necessários

