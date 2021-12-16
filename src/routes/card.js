import express from 'express'
import checkToken from '../middlewares/access-token'
import {
    createCard,
    viewCard,
    deleteCard,
    updateCard,
    listCard
} from '../controllers/card'

const router = express.Router()
// TOKEN DESABILITADO PARA TESTES //
// router.use(checkToken)

router.post('/create-card', createCard) // CRIAR CARD

router.get('/view-card', viewCard) // LER CARD

router.delete('/delete-card', deleteCard) // REMOVER CARD

router.put('/update-card', updateCard) // ATUALIZAR CARD

router.post('/list-card', listCard) // LISTAR CARDS EXISTENTES (FILTRO POR TAG)

export default router