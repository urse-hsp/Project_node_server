const models = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

// findOrCreate 查找创建

// 获取模型
const getModel = async function (modelName, type, conditions, cb, errMeg = '查询失败') {
  const model = models[modelName]
  if (!model) return cb('模型不存在', null)

  try {
    const res = await model[type](conditions)
    cb(null, res)
  } catch (error) {
    cb(errMeg)
  }
}

/**
 * 创建对象数据
 *
 * @param  {[type]}   modelName 模型名称
 * @param  {[type]}   obj       模型对象
 * @param  {Function} cb        回调函数
 */
module.exports.create = function (modelName, conditions, cb) {
  getModel(modelName, 'create', conditions, cb)
}

/**
 * 获取所有数据/查询所有数据
 *
 * @param  {[type]}   conditions 查询条件
 * 查询条件统一规范
 * conditions
 * @param  {Function} cb         回调函数
 */
module.exports.list = function (modelName, conditions, cb) {
  getModel(modelName, 'findAll', conditions, cb)
}

/**
 * 计数按条件查询
 *
 * @param  {[type]}   modelName  模块名
 * @param  {[type]}   conditions 条件
 * @param  {Function} cb         回调函数
 */
module.exports.findAndCountAll = function (modelName, conditions, current, pageSize, cb) {
  // sql 默认从0开始
  let currentPage = Number(current)
  if (currentPage === 1) {
    currentPage = 0
  }

  // sql 默认从0开始
  const params = {
    ...conditions,
    offset: currentPage,
    limit: Number(pageSize),
  }
  getModel(modelName, 'findAndCountAll', params, async (err, { count, rows }) => {
    if (err) return cb(err)
    cb(null, {
      total: count,
      current: Number(current),
      pageSize: params.limit,
      data: rows,
    })
  })
}

/**
 * 获取一条数据 findOne 方法获得它找到的第一个条目(它可以满足提供的可选查询参数).
 * @param  {[type]}   modelName  模型名称
 * @param  {[数组]}   conditions  条件集合
 * @param  {Function} cb         回调函数
 */
module.exports.findOne = function (modelName, conditions, cb) {
  getModel(modelName, 'findOne', conditions, cb)
}

/**
 * 更新对象数据
 *
 * @param  {[type]}   modelName 模型名称
 * @param  {[type]}   id        数据关键ID
 * @param  {[type]}   updateObj 更新对象数据
 * @param  {Function} cb        回调函数
 */
module.exports.update = async function (modelName, id, updateObj, cb, key) {
  if (key) {
    //  *TOP2* 直接修改，执行一遍sql
    const model = models[modelName]
    if (!model) return cb('模型不存在', null)
    try {
      const res = await model.update(updateObj, { where: { [key]: id } })
      cb(null, res)
    } catch (error) {
      cb('修改失败', null)
    }
  } else {
    // *TOP1* 先查后改，执行两遍sql
    findByPk(modelName, id, async (err, res) => {
      try {
        res.set(updateObj)
        await res.save()
        cb(null, res)
      } catch (error) {
        cb('删除失败')
      }
    })
  }
}

/**
 * 通过主键ID获取对象
 * @param  {[type]}   modelName 模型名称
 * @param  {[type]}   id        主键ID
 * @param  {Function} cb        回调函数
 */
const findByPk = async function (modelName, id, cb) {
  getModel(modelName, 'findByPk', id, cb)
}
module.exports.findByPk = findByPk

/**
 * 通过主键ID删除对象
 *
 * @param  {[type]}   modelName 模型名称
 * @param  {[type]}   id        主键ID
 * @param  {Function} cb        回调函数
 */
module.exports.destroy = function (modelName, id, cb, key) {
  if (key) {
    // *TOP2* 直接删除，执行一遍sql
    getModel(modelName, 'destroy', { where: { [key]: id } }, cb, '删除失败')
  } else {
    // *TOP1* 先查后改，执行两遍sql
    findByPk(modelName, id, async (err, res) => {
      try {
        await res.destroy()
        cb(null)
      } catch (error) {
        cb('删除失败')
      }
    })
  }
}

/**
 * 通过模型名称获取数据库数量 total
 *
 * @param  {[type]}   modelName 模型名称
 * @param  {Function} cb        回调函数
 */
module.exports.count = function (modelName, cb) {
  getModel(modelName, 'count', null, cb)
}

/**
 * 通过条件判断数据是否存在
 *
 * @param  {[type]}   modelName  模块名
 * @param  {[type]}   conditions 条件
 * @param  {Function} cb         回调函数
 */
module.exports.exists = async function (modelName, conditions, cb) {
  findOne(modelName, conditions, cb)
}
