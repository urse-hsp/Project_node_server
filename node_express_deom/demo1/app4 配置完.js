const express = require('express')
const app = express()
const cors = require('cors')
const { json, urlencoded } = require('body-parser') // 解析参数
const mysql = require('mysql')
const router = express.Router()

const option = {
  // 连接数据库的基本配置
  host: 'localhost', //数据库地址
  user: 'root',
  password: '930985128',
  port: '3306',
  database: 'login', // 底层数据库
  connectTimeout: 5000, // 链接超时
  multipleStatements: false, // 是否允许一个query中包含多条sql语句。 true //允许执行多条语句
}

app.use(cors()) // 解决跨域
app.use(json()) // json请求
app.use(urlencoded({ extended: false })) // 表单请求

// const conn = mysql.createConnection(option)
let pool
reconn()

app.listen(80, () => console.log('项目启动'))

app.all('/login', (req, res) => {
  // conn.query就是执行一条sql语句，在回调函数里返回结果。
  // conn.connect() // connect()并不能重连数据库

  pool.query('SELECT * FROM students', (e, r) => res.json(new Result({ data: r })))
  pool.getConnection((err, conn) => {
    // 从连接池中哪一个链接
    conn.query('SELECT * FROM  students', (e, r) => res.json(new Result({ data: r })))
    conn.release()
  })
  // conn.end() // 断开数据库
  // 这样操作只能链接地磁，之后断开。马虎cnnect不能重新链接数据库
})

function Result({ code = 1, msg = '', data = {} }) {
  this.code = code
  this.msg = msg
  this.data = data
}

// 断开数据库重连机制
function reconn() {
  pool = mysql.createPool({
    ...option,
    waitForCnnerCtion: true, //当午链接可用时， 等待(true)还是错 (false)
    connectionLimit: 100, // 链接数限制
    queueLimit: 0, //最大链接等待数 (0为不限制)
  }) // 创建链接池
  pool.on('error', (err) => err.code === 'PROTOCOL_CONNECTION_LOST' && setTimeout(reconn, 2000))
}

module.exports = { pool, Result, router, app }
