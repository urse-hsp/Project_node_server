const express = require('express')
const app = express()
const cors = require('cors')
const { json, urlencoded } = require('body-parser') // 解析参数
const mysql = require('mysql')

const option = {
  host: 'localhost',
  user: 'root',
  password: '930985128',
  port: '3306',
  database: 'login', // 底层数据库
  connectTimeout: 5000, // 链接超时
  multipleStatements: false, // 是否允许一个query中包含多条sql语句
}

app.use(cors()) // 解决跨域
app.use(json()) // json请求
app.use(urlencoded({ extended: false })) // 表单请求

const conn = mysql.createConnection(option)

app.listen(80, () => console.log('启动服务'))

let login = true

// app.all方法，这个方法支持所有请求方式，不必每个请求都写好几遍了。
// 方法有三个返回值。第一个是传过来的。第二个是以什么形式返回 json等格式。第三个是继续执行下去

app.all('*', (req, res, next) => {
  if (!login) return res.json('未登录')
  next()
})

// app.post("/", (req, res) => {
//   return res.json("123");
// });

app.post('/test/:data', (req, res) => {
  // 后面的表单参数会放到req.query里，
  // 路径上的参数会放到req.params里，
  // json参数会放到req.body里，
  // 可以任意选择一种参数传递即可，路径以:开头表示此路径作为参数的意思。
  return res.json({ query: req.query, data: req.params, json: req.body })
})
