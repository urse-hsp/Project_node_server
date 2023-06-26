const { log } = require('console')
const path = require('path')
const managersDAO = require(path.join(process.cwd(), 'dao/ManagerDAO'))

/**
 * 管理员登录
 * @param  {[type]}   username 用户名
 * @param  {[type]}   password 密码
 * @param  {Function} cb       回调
 */
module.exports.login = function (username, password, cb) {
  logger.debug('login => username:%s,password:%s', username, password)
  logger.debug(username)
  console.log(6)
  // managersDAO.findOne({ mg_name: username }, function (err, manager) {
  //   logger.debug(err)
  //   if (err || !manager) return cb('用户名不存在')
  //   if (manager.role_id < 0) {
  //     return cb('该用户没有权限登录')
  //   }

  //   if (manager.role_id != 0 && manager.mg_state != 1) {
  //     return cb('该用户已经被禁用')
  //   }

  //   if (Password.verify(password, manager.mg_pwd)) {
  //     cb(null, {
  //       id: manager.mg_id,
  //       rid: manager.role_id,
  //       username: manager.mg_name,
  //       mobile: manager.mg_mobile,
  //       email: manager.mg_email,
  //     })
  //   } else {
  //     return cb('密码错误')
  //   }
  // })
}
