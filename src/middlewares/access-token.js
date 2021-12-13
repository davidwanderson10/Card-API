/**
 * Verifica o token de aceso da API
 */

const TOKEN = "GSl6$ciV0iuIZ8yCZzNqJcqscp%%c8l#xo4XdExJse8^gyzQtb5WpDEf%Nuz"

const checkToken = async (req, res, next) => {

    const token = await req.headers['x-access-token']

    if ( !token ) {
        return res.status(401).send({ message: 'No token provided.', data: null })
    } else if ( token !== TOKEN ) {
        return res.status(401).send({ message: 'Invalid token provided.', data: null })
    } else {
        next()
    }

}

export default checkToken