import { Op } from 'sequelize'
import {Card, sequelize} from '../models'
import { requiredAttributes } from '../utils/helpers'

export const createCard = async (req, res) => {
    // FUNÇÃO QUE IDENTIFICA SE OS CAMPOS OBRIGATÓRIOS FORAM PREENCHIDOS //
    const required = await requiredAttributes([
        "texto"
    ], req.body)
    if ( required.count ) {
        res.status(200).send({ success: false, message: "O campo 'texto' é obrigatório", res: required })
    } else {
        const tags = req.body.tags ? req.body.tags : ''
        const texto = req.body.texto ? req.body.texto : ''
        
        const query = `
                    INSERT INTO cards (texto, data_criacao, data_modificacao, tags, createdAt, updatedAt)
                    VALUES ('${texto}', sysdate(), sysdate(), '${tags}' , sysdate(), sysdate())
                    `
        const data = await sequelize.query(query, { type: sequelize.QueryTypes.INSERT})

        res.status(200).send({ success: true, message: "Card criado com sucesso", data: req.body})
    }

}

export const viewCard = async (req, res) => {
    // FUNÇÃO QUE IDENTIFICA SE OS CAMPOS OBRIGATÓRIOS FORAM PREENCHIDOS //
    let id = parseInt(req.query.id)
    
    if(Number.isInteger(id) && id === 0){
        const query = `select * from cards`
        const data = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT})

        res.status(200).send({ success: true, message: "Sucess", data: data})
    
    } else if(Number.isInteger(id)) {
        const data = await Card.findByPk(id)

        if (data) {
            res.status(200).send({ success: true, message: "Found", res: { data } })
        } else {
            res.status(200).send({ success: false, message: "Not Found", res: { data } })
        }
    } else {
        res.status(200).send({ success: false, message: "É necessário informar o 'id' do card dentro dos parâmetros", data: null})
    }

}

export const deleteCard = async (req, res) => {
    // FUNÇÃO QUE IDENTIFICA SE OS CAMPOS OBRIGATÓRIOS FORAM PREENCHIDOS //
    let id = parseInt(req.query.id)
    
    if(Number.isInteger(id)){
        const data = await Card.destroy({ where: { id: id }})

        if (data) {
            res.status(200).send({ success: true, message: "Successfully executed!", res: { data } })
        } else {
            res.status(200).send({ success: false, message: "Not completed!", res: { data: null } })
        }
    } else{
        res.status(200).send({ success: false, message: "É necessário informar o 'id' do card dentro dos parâmetros", data: null})
    }

}

export const updateCard = async (req, res) => {
    // IDENTIFICA SE O ID É UM NÚMERO INTEIRO //
    let id = parseInt(req.query.id)

    if(Number.isInteger(id)){
        const card = await Card.update(req.body, {
            returning: true, plain: true, where: {id: id}
        })
        res.status(200).send({ success: true, message: "Updated", })
    } else{
        res.status(200).send({ success: false, message: "Não foi possível alterar o card, informe o id nos parâmetros", data: null})
    }

}

export const listCard = async (req, res) => {


}