//const { where } = require('sequelize');
//const database = require('../models');
//const Sequelize = require('sequelize');

const {PessoasServices} = require('../services')
const pessoasServices = new PessoasServices()

class PessoaController {
    static async pegaPessoasAtivas(req, res) {
        try {
            const pessoasAtivas = await pessoasServices.pegaRegistrosAtivos()
            return res.status(200).json(pessoasAtivas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaTodasAsPessoas(req, res) {
        try {
            const todasAsPessoas = await pessoasServices.pegaTodosOsRegistros()
            return res.status(200).json(todasAsPessoas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }


    static async pegaUmaPessoa(req, res) {
        const { id } = req.params
        //id valor
        try {                                                      //id chave  //id valor 
            const umaPessoa = await pessoasServices.pegaUmRegistro(Number(id))
            return res.status(200).json(umaPessoa)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaPessoa(req, res) {
        const novaPessoa = req.body
        try {
            const novaPessoaCriada = await pessoasServices.criaUmRegistro(novaPessoa)
            return res.status(200).json(novaPessoaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaPessoa(req, res) {
        const { id } = req.params
        const novasInfos = req.body

        try {
            await pessoasServices.atualizaRegistro(novasInfos, Number(id) )
            //método update do Sequelize não precisa criar umas const e recebe dois parâmetros: as infos atualizadas e qual id a ser alterado.
            const pessoaAtualizada = await pessoasServices.pegaUmRegistro(Number(id))
            return res.status(200).json(pessoaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaPessoa(req, res) {
        const { id } = req.params
        //id valor
        try {                                                      //id chave  //id valor 
            await pessoasServices.apagaUmRegistro(Number(id))
            return res.status(200).json({ mensagem: `id ${id} deletado.` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async restauraPessoa(req, res) {
        const { id } = req.params
        try {
            await pessoasServices.restauraRegistro(Number(id))
            return res.status(200).json({ mensagem: `id ${id} restaurado.` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    
    static async cancelaPessoa(req, res) {
        const {estudanteId} = req.params

        try {
            await pessoasServices.cancelaPessoaEMatriculas(Number(estudanteId))
            return res.status(200).json({message: `Matriculas referentes ao estudante ${estudanteId} foram canceladas.`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = PessoaController;

//Ao criar a classe Pessoas como static, não é necessário instanciar um novo objeto da classe Pessoas
//Como o controlador vai buscar no banco e retornar através de uma rota, async/await são necessários

