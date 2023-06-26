var path = require('path')

// 获取数据库模型
databaseModule = require(path.join(process.cwd(), 'modules/database'))

/**
 * 获取一条数据
 * @param  {[type]}   modelName  模型名称
 * @param  {[数组]}   conditions  条件集合
 * @param  {Function} cb         回调函数
 */
module.exports.findOne = function (modelName, conditions, cb) {
  var db = databaseModule.getDatabase()

  var Model = db.models[modelName]

  if (!Model) return cb('模型不存在', null)

  if (!conditions) return cb('条件为空', null)

  Model.one(conditions, function (err, obj) {
    logger.debug(err)
    if (err) {
      return cb('查询失败', null)
    }
    return cb(null, obj)
  })
}
