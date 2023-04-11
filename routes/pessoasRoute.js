const {Router} = require('express')
//Router é uma ferramenta do express

const PessoaController = require('../controllers/PessoaController')

const router = Router()

//rotas para pessoas
router.get('/pessoas', PessoaController.pegaTodasAsPessoas)
router.get('/pessoas/ativas', PessoaController.pegaPessoasAtivas)
router.get('/pessoas/:id', PessoaController.pegaUmaPessoa)
router.post('/pessoas/', PessoaController.criaPessoa)
router.post('/pessoas/:id/restaura', PessoaController.restauraPessoa)
router.put('/pessoas/:id', PessoaController.atualizaPessoa)
router.delete('/pessoas/:id', PessoaController.apagaPessoa)
router.post('/pessoas/:estudanteId/cancela', PessoaController.cancelaPessoa)


module.exports = router;
