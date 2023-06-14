const mysql = require('mysql')

const conn = mysql.createConnection({
  host: 'localhost', // 数据库地址
  user: 'root',
  password: '',
  port: '3306',
  database: 'form', // 底层数据库
  connectTimeout: 5000, // 链接超时
  multipleStatements: false, // 是否允许一个query中包含多条sql语句
})

module.exports = { conn }
