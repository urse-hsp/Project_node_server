const mysql = require('mysql')
const configs = require('../config')

const conn = mysql.createConnection(configs.mysql)

module.exports = { conn }
