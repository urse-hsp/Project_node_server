var path = require('path')
daoModule = require('./DAO')
const { sequelize } = require(path.join(process.cwd(), 'modules/database'))
const { QueryTypes } = require('sequelize')

/**
 * 获取权限列表
 *
 * @param  {Function} cb 回调函数
 */
module.exports.list = async function (cb) {
  try {
    sql = 'SELECT * FROM sp_permission_api as api LEFT JOIN sp_permission as main ON main.ps_id = api.ps_id WHERE main.ps_id is not null'
    const users = await sequelize.query(sql, { type: QueryTypes.SELECT })
    cb(null, users)
  } catch (error) {
    cb('获取权限列表失败', null)
  }
}

/**
 * 权限验证
 *
 * @param  {[type]}   rid         角色ID
 * @param  {[type]}   serviceName 服务名
 * @param  {[type]}   actionName  动作名
 * @param  {Function} cb          回调函数
 */
module.exports.authRight = function (rid, serviceName, actionName, cb) {
  // 超级管理员
  if (rid == 0) return cb(null, true)

  // 权限验证
  daoModule.findOne('PermissionAPIModel', { ps_api_service: serviceName, ps_api_action: actionName }, function (err, permissionAPI) {
    console.log('rid => %s,serviceName => %s,actionName => %s', rid, serviceName, actionName)
    if (err || !permissionAPI) return cb('无权限访问', false)

    daoModule.findOne('RoleModel', { role_id: rid }, function (err, role) {
      console.log(role)
      if (err || !role) return cb('获取角色信息失败', false)
      ps_ids = role.ps_ids.split(',')
      for (idx in ps_ids) {
        ps_id = ps_ids[idx]
        if (parseInt(permissionAPI.ps_id) == parseInt(ps_id)) {
          return cb(null, true)
        }
      }
      return cb('无权限访问', false)
    })
  })
}
