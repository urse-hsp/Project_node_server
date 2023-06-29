const models = require('../models')

// findOrCreate 查找创建
// findAndCountAll 查找分页

/**
 * 创建对象数据
 *
 * @param  {[type]}   modelName 模型名称
 * @param  {[type]}   obj       模型对象
 * @param  {Function} cb        回调函数
 */
module.exports.create = async function (modelName, obj, cb) {
  const Model = models[modelName]
  if (!Model) return cb('模型不存在', null)

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
 * @param  {Function} cb         回调函数
 */
module.exports.list = async function (modelName, conditions, cb) {
  const model = models[modelName]
  if (!model) return cb('模型不存在', null)

  try {
    const res = await model.findAll(conditions)
    cb(null, res)
  } catch (error) {
    cb('查询失败')
  }
}

// 分页
// module.exports.pagination = async function (modelName, conditions, cb) {
//   const model = models[modelName]
//   if (!model) return cb('模型不存在', null)

//   try {
//     // pageSize = 5, current = 1
//     const res = await model.findAll({ offset: 5, limit: 5, ...conditions })
//     cb(null, res)
//   } catch (error) {
//     cb('查询失败')
//   }
// }

// 计数按条件
module.exports.countByConditions = function (modelName, conditions, cb) {
  const model = models[modelName]
  if (!model) return cb('模型不存在', null)

  // var resultCB = function (err, count) {
  //   if (err) {
  //     return cb('查询失败', null)
  //   }
  //   cb(null, count)
  // }
  // if (conditions) {
  //   if (conditions['columns']) {
  //     model = model.count(conditions['columns'], resultCB)
  //   } else {
  //     model = model.count(resultCB)
  //   }
  // } else {
  //   model = model.count(resultCB)
  // }
}

/**
 * 获取一条数据
 * @param  {[type]}   modelName  模型名称
 * @param  {[数组]}   conditions  条件集合
 * @param  {Function} cb         回调函数
 */
module.exports.findOne = async function (modelName, conditions, cb) {
  const model = models[modelName]
  if (!model) return cb('模型不存在', null)
  if (!conditions) return cb('条件为空', null)

  try {
    const res = await model.findOne(conditions)
    cb(null, res)
  } catch (error) {
    cb('查询失败', null)
  }
}

/**
 * 更新对象数据
 *
 * @param  {[type]}   modelName 模型名称
 * @param  {[type]}   id        数据关键ID
 * @param  {[type]}   updateObj 更新对象数据
 * @param  {Function} cb        回调函数
 */
module.exports.update = async function (modelName, id, updateObj, cb, key = 'id') {
  const model = models[modelName]
  if (!model) return cb('模型不存在', null)

  try {
    const res = await model.findOne({ where: { [key]: id } })
    res.set(updateObj)
    await res.save()
    cb(null, res)
  } catch (error) {
    cb('修改失败', null)
  }
}

/**
 * 通过主键ID获取对象
 * @param  {[type]}   modelName 模型名称
 * @param  {[type]}   id        主键ID
 * @param  {Function} cb        回调函数
 */
module.exports.show = async function (modelName, id, cb, key = 'id') {
  const model = models[modelName]
  if (!model) return cb('模型不存在', null)

  try {
    const res = await model.findOne({ where: { [key]: id } })
    cb(null, res)
  } catch (error) {
    cb('查询失败', null)
  }
}

/**
 * 通过主键ID删除对象
 *
 * @param  {[type]}   modelName 模型名称
 * @param  {[type]}   id        主键ID
 * @param  {Function} cb        回调函数
 */
module.exports.destroy = async function (modelName, id, cb, key = 'id') {
  const model = models[modelName]
  if (!model) return cb('模型不存在', null)

  try {
    const res = await model.findOne({ where: { [key]: id } })
    await res.destroy()
    cb(null, res)
  } catch (error) {
    cb('删除失败', null)
  }
}

/**
 * 通过模型名称获取数据库数量 total
 *
 * @param  {[type]}   modelName 模型名称
 * @param  {Function} cb        回调函数
 */
module.exports.count = async function (modelName, cb) {
  const model = models[modelName]
  if (!model) return cb('模型不存在', null)
  try {
    const res = await model.count()
    cb(null, res)
  } catch (error) {
    cb('查询失败', null)
  }
}

/**
 * 通过条件判断数据是否存在
 *
 * @param  {[type]}   modelName  模块名
 * @param  {[type]}   conditions 条件
 * @param  {Function} cb         回调函数
 */
module.exports.exists = async function (modelName, conditions, cb) {
  const model = models[modelName]
  if (!model) return cb('模型不存在', null)

  try {
    const res = await model.findOne({
      where: conditions,
    })
    cb(null, res)
  } catch (error) {
    cb('查询失败', null)
  }
}

// 获取模型
module.exports.getModel = function (modelName) {
  const model = models[modelName]
  if (!model) return cb('模型不存在', null)
  return model
}

/**
 * 分页有关的查询
 *
 * @param  {[type]}   modelName  模块名
 * @param  {[type]}   conditions 条件
 * @param  {Function} cb         回调函数
 */
module.exports.findAndCountAll = async function (modelName) {
  const model = models[modelName]
  if (!model) return cb('模型不存在', null)

  try {
    const { count, rows } = await Model.findAndCountAll({
      where: {
        title: {
          [Op.like]: 'foo%',
        },
      },
      offset: 10,
      limit: 2,
    })
    cb(false, count)
  } catch (error) {
    cb(true)
  }
}
