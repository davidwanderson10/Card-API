import { Op } from 'sequelize'
import {Tag, sequelize} from '../models'
import { requiredAttributes } from '../utils/helpers'

export const createTag = async (req, res) => {
    // FUNÇÃO QUE IDENTIFICA SE OS CAMPOS OBRIGATÓRIOS FORAM PREENCHIDOS //
    const required = await requiredAttributes([
        "name"
    ], req.body)
    if ( required.count ) {
        res.status(200).send({ success: false, message: "O campo 'name' é obrigatório", res: required })
    } else {
        // IDENTIFICA SE JÁ EXISTE ALGUMA TAG COM O MESMO NOME, CASO EXISTA NÃO PERMITE A CRIAÇÃO DUPLICADA //
        const countTags = await Tag.count({
            where: {
                name: {[Op.eq]: req.body.name},
            }
        })

        if(countTags){
            res.status(200).send({ success: false, message: "Este nome já está sendo utilizado para outra TAG", data: req.body})
        } else{
            // CRIAÇÃO DA TAG //
            const tags = req.body.name ? req.body.name : ''
            const query = `
                        INSERT INTO tags (name, createdAt, updatedAt)
                        VALUES ('${tags}', sysdate(), sysdate())
                        `
            const data = await sequelize.query(query, { type: sequelize.QueryTypes.INSERT})
            res.status(200).send({ success: true, message: "Tag criada com sucesso", data: req.body})
        }
    }

}

export const viewTag = async (req, res) => {
    // IDENTIFICA SE O ID É UM NÚMERO INTEIRO //
    let id = parseInt(req.query.id)
    
    if(Number.isInteger(id)){
        const data = await Tag.findByPk(id)

        if (data) {
            res.status(200).send({ success: true, message: "Found", data})
        } else {
            res.status(200).send({ success: false, message: "Not Found", data})
        }
    } else{
        res.status(200).send({ success: false, message: "É necessário informar o 'id' da tag dentro dos parâmetros", data: null})
    }

}

export const deleteTag = async (req, res) => {
    // IDENTIFICA SE O ID É UM NÚMERO INTEIRO //
    let id = parseInt(req.query.id)
    
    if(Number.isInteger(id)){
        const data = await Tag.destroy({ where: { id: id }})

        if (data) {
            res.status(200).send({ success: true, message: "Successfully executed!", data})
        } else {
            res.status(200).send({ success: false, message: "Not completed!", data})
        }
    } else{
        res.status(200).send({ success: false, message: "É necessário informar o 'id' da tag dentro dos parâmetros", data: null})
    }

}

export const updateTag = async (req, res) => {
    // IDENTIFICA SE O ID É UM NÚMERO INTEIRO //
    let id = parseInt(req.query.id)

    if(Number.isInteger(id)){
        // IDENTIFICA SE JÁ EXISTE ALGUMA TAG COM O MESMO NOME, CASO EXISTA NÃO PERMITE A CRIAÇÃO DUPLICADA //
        const countTags = await Tag.count({
            where: {
                name: {[Op.eq]: req.body.name},
                id: {[Op.ne]: req.query.id}
            }
        })

        if(countTags){
            res.status(200).send({ success: false, message: "Este nome já está sendo utilizado para outra TAG", data: req.body})
        } else {
            const data = await Tag.update(req.body, {
                plain: true, where: {id: id}
            })

            if(data[0] === 1){
                res.status(200).send({ success: true, message: "Updated", data: req.body})
            } else {
                res.status(200).send({ success: false, message: "A tag não foi alterada!", data: null})
            }
        }
    } else {
        res.status(200).send({ success: false, message: "Não foi possível alterar a tag, informe o id nos parâmetros", data: null})
    }

}

export const listTag = async (req, res) => {


}