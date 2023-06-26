var path = require('path')
daoModule = require('./DAO')
const { sequelize } = require(path.join(process.cwd(), 'modules/database'))

/**
 * 通过查询条件获取管理员对象
 *
 * @param  {[type]}   conditions 条件
 * @param  {Function} cb         回调函数
 */
module.exports.findOne = function (conditions, cb) {
  daoModule.findOne('ManagerModel', conditions, cb)
}
