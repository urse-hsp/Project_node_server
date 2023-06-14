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

module.exports = conn

let sqlConnection = (sql, sqlArr, callback) => {
  let pool = mysql.createPool(config)
  pool.getConnection(function (err, conn) {
    console.log('连接池查询')
    if (err) {
      console.log(err)
    } else {
      conn.query(sql, sqlArr, callback)
      conn.release()
      console.log('连接池断开！')
    }
  })
}

let SySqlConnection = (sql, sqlArr) => {
  return new Promise((resolve, reject) => {
    let pool = mysql.createPool(config)
    pool.getConnection((err, conn) => {
      if (err) {
        reject(err)
      } else {
        conn.query(sql, sqlArr, (err, data) => {
          if (err) {
            reject(err)
          } else {
            resolve(data)
            conn.release()
          }
        })
      }
    })
  }).catch((err) => {
    console.log(err)
  })
}
