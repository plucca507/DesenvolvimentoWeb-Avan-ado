const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');


var uploads = multer();

router.get('/', userController.listar);
router.post('/', uploads.single('imagem'), userController.salvar);
// router.get('/:id', userController.buscarPorId);
// router.get('/codigo/:codigo', userController.buscarPorCodigo);
router.get('/:codigo', userController.buscarPorCodigo);
router.get('/nome/:nome', userController.buscarPorNome);
router.get('/sobrenome/:sobrenome', userController.buscarPorSobrenome);
router.get('/cidade/:cidade', userController.buscarPorCidade);
router.get('/estado/:estado', userController.buscarPorEstado);
router.get('/status/:status', userController.buscarPorStatus);
router.put('/:codigo', userController.atualizar);
router.delete('/:codigo', userController.excluir);

module.exports = router;
