/**
 * 权限验证函数
 *
 * @param  {[type]}   rid         角色ID
 * @param  {[type]}   serviceName 服务名
 * @param  {[type]}   actionName  动作名（方法）
 * @param  {Function} cb          回调函数
 */
module.exports.authRight = function (rid, serviceName, actionName, cb) {
  permissionAPIDAO.authRight(rid, serviceName, actionName, function (err, pass) {
    cb(err, pass)
  })
}
