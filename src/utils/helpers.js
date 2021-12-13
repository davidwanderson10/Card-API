

/**
 *  Retorna um objeto com os atributos obrigatórios que estão nulos
 */

export const requiredAttributes = async (requiredAttr, body) => {

    let required = await requiredAttr.reduce((acum, item) => {
        acum.required[`${item}_required`] = (
            body[item] === "" ||
            body[item] === null ||
            body[item] === undefined ||
            (Array.isArray(body[item]) && !body[item].length)
        ) ? true : false
        
        if (
            body[item] === "" ||
            body[item] === null ||
            body[item] === undefined ||
            (Array.isArray(body[item]) && !body[item].length)    
        ) {
            acum.count++
        }
        return acum
    }, { count: 0, required: {} })

    return required

}
