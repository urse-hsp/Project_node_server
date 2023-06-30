const path = require('path')
const daoModule = require('./DAO')
const { sequelize } = require(path.join(process.cwd(), 'modules/database'))
const { QueryTypes } = require('sequelize')

const ManagerDAO = (obj, cb) => {
  return daoModule.create('ManagerModel', obj, cb, 'mg_id')
}

/**
 * 创建管理员
 *
 * @param  {[type]}   obj 管理员信息
 * @param  {Function} cb  回调函数
 */
module.exports.create = function (obj, cb) {
  daoModule.create('ManagerModel', obj, cb)
}

/**
 * 获取管理员列表
 *
 * @param  {[type]}   conditions 查询条件
 * @param  {Function} cb         回调函数
 */
// module.exports.list = function (conditions, cb) {
//   daoModule.list('ManagerModel', conditions, function (err, models) {
//     if (err) return cb(err, null)
//     cb(null, models)
//   })
// }

/**
 * 通过查询条件获取管理员对象
 *
 * @param  {[type]}   conditions 条件
 * @param  {Function} cb         回调函数
 */
// module.exports.findOne = function (conditions, cb) {
//   daoModule.findOne('ManagerModel', conditions, cb)
// }

/**
 * 通过关键词查询用户
 *
 * @param  {[type]}   key    关键词
 * @param  {[type]}   current
 * @param  {[type]}   pageSize
 * @param  {Function} cb     回调函数
 */

// 用户表，角色表
module.exports.findByKey = async function (key, current, pageSize, cb) {
  let = sql = 'SELECT * FROM sp_manager as mgr LEFT JOIN sp_role as role ON mgr.role_id = role.role_id'

  if (key) {
    sql += ` WHERE mg_name LIKE '%${key}%'`
  }
  if ((current ?? '') !== '' && (pageSize ?? '') !== '') {
    sql += ` LIMIT ${current},${pageSize}`
  }

  try {
    const data = await sequelize.query(sql, { type: QueryTypes.SELECT })
    cb(null, data)
  } catch (error) {
    cb('查询执行出错')
  }
}

/**
 * 判断是否存在管理员 name
 *
 * @param  {[type]}   username 用户名
 * @param  {Function} cb       回调函数
 *
 */
module.exports.exists = function (username, cb) {
  daoModule.exists('ManagerModel', { mg_name: username }, function (err, isExists) {
    if (err) return cb('查询失败')
    cb(null, isExists)
  })
}

/**
 * 模糊查询用户数量 total
 *
 * @param  {[type]}   key 关键词
 * @param  {Function} cb  回调函数
 */
module.exports.countByKey = async function (key, cb) {
  let sql = 'SELECT count(*) as count FROM sp_manager'
  if (key) {
    sql += ` WHERE mg_name LIKE '%${key}%'`
  }
  try {
    const users = await sequelize.query(sql, { type: QueryTypes.SELECT })
    cb(null, users[0]['count'])
  } catch (error) {
    cb('查询执行出错')
  }
}

/**
 * 通过ID获取管理员对象数据
 *
 * @param  {[type]}   id 管理员主键ID
 * @param  {Function} cb 回调函数
 */
module.exports.show = function (id, cb) {
  daoModule.show('ManagerModel', id, cb, 'mg_id')
}

/**
 * 更新管理员信息
 *
 * @param  {[type]}   obj 管理员对象
 * @param  {Function} cb  回调函数
 */
module.exports.update = function (obj, cb) {
  daoModule.update('ManagerModel', obj.mg_id, obj, cb, 'mg_id')
}

/**
 * 删除管理员对象数据
 *
 * @param  {[type]}   id 主键ID
 * @param  {Function} cb 回调函数
 */
module.exports.destroy = function (id, cb) {
  daoModule.destroy(
    'ManagerModel',
    id,
    function (err) {
      if (err) return cb(err)
      return cb(null)
    },
    'mg_id'
  )
}

/**
 * 创建/修改管理员信息
 *
 * @param  {[type]}   obj 管理员对象
 * @param  {Function} cb  回调函数
 */
module.exports.save = function (obj, cb) {
  console.log(123, obj.mg_id)
  daoModule.show(
    'ManagerModel',
    obj.mg_id,
    function (err, oldObj) {
      // if (err) {
      //   daoModule.create('ManagerModel', obj, cb)
      // } else {
      //   daoModule.update('ManagerModel', obj.mg_id, obj, cb)
      // }
    },
    'mg_id'
  )
  // daoModule.show(obj.mg_id, function (err, oldObj) {
  //   if (err) {
  //     daoModule.create('ManagerModel', obj, cb)
  //   } else {
  //     daoModule.update('ManagerModel', obj.mg_id, obj, cb)
  //   }
  // })
}

/**
 * 获取管理员数量
 *
 * @param  {Function} cb 回调函数
 */
// module.exports.count = function (cb) {
//   daoModule('ManagerModel', cb)
// }
