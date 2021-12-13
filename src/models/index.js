import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import config from '../database/config/database.js'

const db = {}
export const sequelize = new Sequelize(config)

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    
    try {
      const model = sequelize.import(path.join(__dirname, file))
      let model_name = `${model.name.charAt(0).toUpperCase()}${model.name.slice(1)}`
      db[model_name] = model
    } catch(e) {
      const model = require(path.join(__dirname, file))
      let model_name = `${file.charAt(0).toUpperCase()}${file.slice(1).replace('.js','')}`
      db[model_name] = model
    }
    
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db