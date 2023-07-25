const express = require('express')
const router = express.Router()
const { conn } = require('../../utils/connectMysql')

router.get('/getlist', (req, res, next) => {
  const json = req.query
  const sqlStr2 = 'SELECT * FROM students'
  let basics
  if (json.currentPage === '1') basics = 0
  else basics = json.pageSize * (json.currentPage - 1)

  const sqlStr = `SELECT * FROM students LIMIT ${basics},${json.pageSize}`
  conn.query(sqlStr, (err, results) => {
    if (err) return res.sendResult({}, '失败', false)
    conn.query(sqlStr2, (err, results2) => {
      res.sendResult({ list: results, total: results2.length }, '获取成功')
    })
  })
})

router.post('/setList', (req, res, next) => {
  const json = req.body
  const sqlStr1 = `INSERT into students (name,sex,age,location) values('${json.name}','${json.sex}',${json.age},'${json.location}')`
  const sqlStr2 = `select name from students WHERE name='${json.name}' `
  conn.query(sqlStr2, (err, results) => {
    if (results.length === 0) {
      conn.query(sqlStr1, (err, results) => {
        res.sendResult(results, '添加成功')
      })
    } else {
      res.sendResult(results, '用户名姓名重复', false)
    }
  })
})

router.put('/alterList', (req, res) => {
  const sqlStr = `UPDATE students set name='${req.body.name}',sex='${req.body.sex}',age='${req.body.age}',location='${req.body.location}' where id=${req.body.id}`
  conn.query(sqlStr, (err, results) => {
    if (err) return res.sendResult(req.params, '修改失败', false)
    res.sendResult({}, '修改成功')
  })
})

router.delete('/deleteList', (req, res) => {
  const sqlStr = `delete from students WHERE id = ${req.body.id}`
  conn.query(sqlStr, (err, results) => {
    if (err) return res.sendResult(req.body, '删除失败', 1)
    res.sendResult('', '删除成功')
  })
})

router.post('/test/:data', (req, res) => {
  // 后面的表单参数会放到req.query、 路径上的参数会放到req.params里、 json参数会放到req.body里，
  // http://localhost:8888/test/123?a=b    /text是params
  return res.json({ query: req.query, data: req.params, json: req.body })
})

module.exports = router
