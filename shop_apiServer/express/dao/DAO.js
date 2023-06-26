var path = require('path')

// 获取数据库模型
databaseModule = require(path.join(process.cwd(), 'modules/database'))
/**
 * 创建对象数据
 *
 * @param  {[type]}   modelName 模型名称
 * @param  {[type]}   obj       模型对象
 * @param  {Function} cb        回调函数
 */
module.exports.create = function (modelName, obj, cb) {
  var db = databaseModule.getDatabase()
  var Model = db.models[modelName]
  Model.create(obj, cb)
}
