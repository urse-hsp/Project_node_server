const express = require('express')
const router = express.Router()
// 引入jwt token工具
const JwtUtil = require('../../utils/jwt')

const { conn } = require('../../utils/connectMysql')

router.post('/login', (req, res) => {
  const sqlStr = `select username from user where username='${req.body.username}'`
  const sqlStr2 = `select * from user where password ='${req.body.password}'`
  conn.query(sqlStr, (err, results) => {
    if (results.length === 0) {
      return res.sendResult(results, '用户不存在', 401)
    } else {
      conn.query(sqlStr2, (err, results2) => {
        if (results2.length === 0) return res.sendResult(results2, '密码错误', false)
        else {
          let jwt = new JwtUtil(results2.id)
          let token = jwt.generateToken()
          res.sendResult({ ...results2[0], token }, '登录成功')
        }
      })
    }
  })
})

module.exports = router
