/**
 * Modules imports
 */
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

/**
 * Imports Routes
 */
import card from './routes/card'
import tag from './routes/tag'

/**
 * Import envoroments
 */
import dotenv from 'dotenv'
dotenv.config({ path: ".env" })

/**
 * server
 */
const app = express()

/**
 * Using 'body-parser' for get params POST
 */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

/*
  -  Access-Control-Allow-Origin permitido para todos os domínios;
  -  Cabeçalhos X-Requested-With e content-type são permitidos;
*/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization')
  next()
})


/**
 * Set routes
 */
app.use('/card',
  card,
  tag
)

export default app