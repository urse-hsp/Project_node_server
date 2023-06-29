var express = require('express')
var router = express.Router()
var path = require('path')
const roleServ = require(path.join(process.cwd(), 'services/RoleService'))

// 获取角色列表
router.get(
  '/',
  // 参数验证
  function (req, res, next) {
    next()
  },
  // 处理业务逻辑
  function (req, res, next) {
    roleServ.getAllRoles(function (err, result) {
      if (err) return res.sendResult(null, 401, err)
      res.sendResult(result, 200, '获取成功')
    })
  }
)

module.exports = router
