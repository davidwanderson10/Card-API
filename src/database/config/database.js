require('dotenv/config')

const config = {
  username: process.env.MARIA_DB_USER,
  password: process.env.MARIA_DB_PASS,
  database: process.env.MARIA_DB_DATABASE,
  host: process.env.MARIA_DB_HOST,
  dialect: 'mariadb',
  logging: false,
  define: {
    timestamps: false
  },
  benchmark: false,
  logging: false,
  dialectOptions: {
    timezone: 'Etc/GMT-3',
  },
}
  
module.exports = config