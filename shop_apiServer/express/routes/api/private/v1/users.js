var express = require('express')
var router = express.Router()
var path = require('path')
const ManagerDAO = require(path.join(process.cwd(), 'dao/ManagerDAO'))

// 查询用户列表
router.get(
  '/',
  // 验证参数
  function (req, res, next) {
    // 参数验证
    if (!req.query.pagenum || req.query.pagenum <= 0) return res.sendResult(null, 400, 'pagenum 参数错误')
    if (!req.query.pagesize || req.query.pagesize <= 0) return res.sendResult(null, 400, 'pagesize 参数错误')
    next()
  },
  // 处理业务逻辑
  function (req, res, next) {
    ManagerDAO.list({ offset: Number(req.query.pagenum), limit: Number(req.query.pagesize) }, function (err, result) {
      if (err) return res.sendResult(null, 400, err)
      res.sendResult(result, 200, '获取管理员列表成功')
    })
  }
)
module.exports = router
