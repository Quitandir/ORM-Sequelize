const { where } = require('sequelize');
const database = require('../models');

class PessoaController {
    static async pegaTodasAsPessoas (req, res) {
        try {
            const todasAsPessoas = await database.Pessoas.findAll()
            return res.status(200).json(todasAsPessoas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmaPessoa (req, res) {
        const {id} = req.params
            //id valor
        try {                                                      //id chave  //id valor 
            const umaPessoa = await database.Pessoas.findOne( {where: { id: Number(id)}})
            return res.status(200).json(umaPessoa)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaPessoa (req, res) {
        const novaPessoa = req.body
        try {
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
            return res.status(200).json(novaPessoaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaPessoa (req, res) {
        const {id} = req.params
        const novasInfos = req.body

        try {
            await database.Pessoas.update(novasInfos, {where: { id: Number(id)}} )
            //método update do Sequelize não precisa criar umas const e recebe dois parâmetros: as infos atualizadas e qual id a ser alterado.
            const pessoaAtualizada = await database.Pessoas.findOne( {where: { id: Number(id)}})
            return res.status(200).json(pessoaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaPessoa (req, res) {
        const {id} = req.params
            //id valor
        try {                                                      //id chave  //id valor 
            await database.Pessoas.destroy( {where: { id: Number(id)}})
            return res.status(200).json({mensagem: `id ${id} deletado.`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    //localhost:3000/pessoas/:estudanteId/matricula/:matriculaId
    static async pegaUmaMatricula (req, res) {
        const {estudanteId, matriculaId} = req.params
            
        try {                                                      //id chave  //id valor 
            const umaMatricula = await database.Matriculas.findOne( {
                where: { 
                    id: Number(matriculaId),                    
                    estudante_id: Number(estudanteId)
                }})
            return res.status(200).json(umaMatricula)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaMatricula (req, res) {
        const { estudanteId} = req.params
        const novaMatricula = {...req.body, estudante_id: Number(estudanteId)}
        try {
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula)
            return res.status(200).json(novaMatriculaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaMatricula (req, res) {

        const {estudanteId, matriculaId} = req.params
        const novasInfos = req.body

        try {
            await database.Matriculas.update(novasInfos, {where: 
                { 
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }} )
            const matriculaAtualizada = await database.Matriculas.findOne( {where: { id: Number(matriculaId)}})
            return res.status(200).json(matriculaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaMatricula (req, res) {
        const {estudanteId, matriculaId} = req.params
            
        try {                                                      
            await database.Matriculas.destroy( {where: { id: Number(matriculaId)}})
            return res.status(200).json({mensagem: `id ${matriculaId} deletado.`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = PessoaController;

//Ao criar a classe Pessoas como static, não é necessário instanciar um novo objeto da classe Pessoas
//Como o controlador vai buscar no banco e retornar através de uma rota, async/await são necessários

