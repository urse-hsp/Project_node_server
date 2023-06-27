const models = require('../models')
console.log(models, 3)

/**
 * 创建对象数据
 *
 * @param  {[type]}   modelName 模型名称
 * @param  {[type]}   obj       模型对象
 * @param  {Function} cb        回调函数
 */
module.exports.create = async function (modelName, obj, cb) {
  const Model = models[modelName]
  try {
    const res = await Model.create(obj)
    cb(false, res)
  } catch (error) {
    cb(true)
  }
}

/**
 * 获取所有数据
 * 
 * @param  {[type]}   conditions 查询条件
 * 查询条件统一规范
 * conditions
	{
		"columns" : {
			字段条件
			"字段名" : "条件值"
		},
		"offset" : "偏移",
		"omit" : ["字段"],
		"only" : ["需要字段"],
		"limit" : "",
		"order" :[ 
			"字段" , A | Z,
			...
		]
	}
 * @param  {Function} cb         回调函数
 */
module.exports.list = async function (modelName, conditions, cb) {
  const model = models[modelName]

  if (!model) return cb('模型不存在', null)

  // if (conditions) {
  //   if (conditions['columns']) {
  //     model = model.find(conditions['columns'])
  //   } else {
  //     model = model.find()
  //   }

  //   if (conditions['offset']) {
  //     model = model.offset(parseInt(conditions['offset']))
  //   }

  //   if (conditions['limit']) {
  //     model = model.limit(parseInt(conditions['limit']))
  //   }

  //   if (conditions['only']) {
  //     model = model.only(conditions['only'])
  //   }

  //   if (conditions['omit']) {
  //     model = model.omit(conditions['omit'])
  //   }

  //   if (conditions['order']) {
  //     model = model.order(conditions['order'])
  //   }
  // } else {
  //   model = model.find()
  // }
  try {
    const res = await model.findAll(conditions)
    cb(false, res)
  } catch (error) {
    cb(true)
  }
}

/**
 * 获取一条数据
 * @param  {[type]}   modelName  模型名称
 * @param  {[数组]}   conditions  条件集合
 * @param  {Function} cb         回调函数
 */
module.exports.findOne = function (modelName, conditions, cb) {
  const db = databaseModule.getDatabase()

  const Model = db.models[modelName]

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
