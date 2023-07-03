var path = require('path')
daoModule = require('./DAO')
databaseModule = require(path.join(process.cwd(), 'modules/database'))
const { sequelize } = require(path.join(process.cwd(), 'modules/database'))
const { QueryTypes } = require('sequelize')

/**
 * 获取参数列表数据
 *
 * @param  {[type]}   cat_id 分类ID
 * @param  {[type]}   sel    类型
 * @param  {Function} cb     回调函数
 */
module.exports.list = async function (cat_id, sel, cb) {
  try {
    sql = `SELECT * FROM sp_attribute WHERE cat_id = '${cat_id}' AND attr_sel = '${sel}' AND delete_time is NULL`
    const data = await sequelize.query(sql, { type: QueryTypes.SELECT })
    cb(null, data)
  } catch (error) {
    cb('查询执行出错')
  }
}
