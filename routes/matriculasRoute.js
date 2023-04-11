const {Router} = require('express')
//Router é uma ferramenta do express

const MatriculaController = require('../controllers/MatriculaController')

const router = Router()

//rotas para matriculas
router.get('/matriculas/:estudanteId/:matriculaId', MatriculaController.pegaUmaMatricula)
router.put('/matriculas/:estudanteId/:matriculaId', MatriculaController.atualizaMatricula)
router.delete('/matriculas/:estudanteId/:matriculaId', MatriculaController.apagaMatricula)
router.post('/matriculas/:estudanteId', MatriculaController.criaMatricula)
router.get('/matriculas/:estudanteId', MatriculaController.pegaMatriculas)  
router.get('/matriculas/:turmaId/confirmadas', MatriculaController.pegaMatriculasPorTurma)
router.get('/matriculas/lotada', MatriculaController.pegaTurmasLotadas)
router.post('/matriculas/:estudanteId/:matriculaId/restaura', MatriculaController.restauraMatricula)

module.exports = router;
