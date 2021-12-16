import express from 'express'
import checkToken from '../middlewares/access-token'
import {
    createTag,
    viewTag,
    deleteTag,
    updateTag,
    listTag
} from '../controllers/tag'

const router = express.Router()
// TOKEN DESABILITADO PARA TESTES //
// router.use(checkToken)

router.post('/create-tag', createTag) // CRIAR tag

router.get('/view-tag', viewTag) // LER tag

router.delete('/delete-tag', deleteTag) // REMOVER tag

router.put('/update-tag', updateTag) // ATUALIZAR tag

router.post('/list-tag', listTag) // LISTAR tagS EXISTENTES (FILTRO POR TAG)

export default router