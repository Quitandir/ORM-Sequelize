const database = require('../models');

class Services {
    constructor(nomeDoModelo) { 
        this.nomeDoModelo = nomeDoModelo
    }
 
    async pegaTodosOsRegistros(where = {}) {
        return database[this.nomeDoModelo].findAll({where: {...where}})
    }

    async pegaUmRegistro(where = {}) {
        return database[this.nomeDoModelo].findOne({ where: { ...where}})
    }

    async apagaUmRegistro(id) {
        return database[this.nomeDoModelo].destroy({ where: { id: id } })
    }

    async criaUmRegistro(novoRegistro) {
        return database[this.nomeDoModelo].create(novoRegistro)
    }

    async restauraRegistro(id) {
        return database[this.nomeDoModelo].restore({ where: { id: id } })
    }

    async atualizaRegistro(dadosAtualizados, id, transacao = {}) {
        return database[this.nomeDoModelo]
        .update(dadosAtualizados, {where: { id: id}}, transacao)
    
    }

    async atualizaRegistros(dadosAtualizados, where, transacao = {}) {
        return database[this.nomeDoModelo]
        .update(dadosAtualizados, {where: {...where}}, transacao)
    
    }

    async encontraEContaRegistros(where = {}, agregadores) {
        return database[this.nomeDoModelo]
        .findAndCountAll({
            where: {
                ...where
            },
            ...agregadores
        })
    }

    
}

module.exports = Services
